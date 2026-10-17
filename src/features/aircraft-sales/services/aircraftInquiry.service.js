import { buyerBudgets } from '../buyerSchema.js';
import { createInquiryDiagnostics, diagnosticEndpoint, safeInquiryResponse, classifyInquiryFailure, safeRetryAfter } from './inquiryDiagnostics.js';
let requestInProgress = false;
export function reportBlockedInquiryAttempt() {
  createInquiryDiagnostics(import.meta.env?.DEV === true).warn('Intento duplicado bloqueado por el formulario', { automaticRetries: 0 });
}

export const aircraftInquiryUrl = import.meta.env?.VITE_AIRCRAFT_INQUIRY_URL || '/aircraft-inquiry.php';
const aircraftTypeValues = new Map([['Jet privado','jet'],['Turbohélice','turboprop'],['Helicóptero','helicopter'],['Otro','other']]);
// Enable only after an authorized delivery check on the hosting succeeds.
export const aircraftInquiryVerified = import.meta.env?.VITE_AIRCRAFT_INQUIRY_VERIFIED === 'true';
const failure = 'No fue posible enviar tu solicitud. Inténtalo de nuevo o contacta a nuestro equipo.';
const statusMessages = {
  400: 'Revisa los datos de tu solicitud antes de enviarla.',
  403: 'No se autorizó el envío de la solicitud.',
  502: 'El servidor de solicitudes recibió una respuesta no válida. Inténtalo más tarde.',
  503: 'El servicio de solicitudes está temporalmente no disponible. Inténtalo más tarde.',
  405: 'El servicio de solicitudes no está disponible en este momento.',
  413: 'La solicitud excede el tamaño permitido. Reduce los comentarios e inténtalo de nuevo.',
  422: 'El servidor no aceptó los datos de la solicitud. Contacta a nuestro equipo para recibir asistencia.',
  429: 'Demasiados intentos. Inténtalo más tarde.',
};

export function toPhpString(value) {
  return value === null || value === undefined ? '' : String(value).trim();
}

export function buildAircraftInquiryPayload(form, operation, website = '') {
  const rawAircraftType = form.aircraft_type ?? form.aircraftType;
  const aircraftType = aircraftTypeValues.get(rawAircraftType) || rawAircraftType;
  const common = {
    operation, aircraftType, country: form.country,
    company: form.company, name: form.contact_name, email: form.email,
    phone: form.phone, privacyAccepted: form.privacy_accepted === true, website,
  };
  let payload;
  if (operation === 'buy') {
    const budget = buyerBudgets.find(([key]) => key === form.budget_range);
    payload = {
      ...common, manufacturer: form.manufacturer,
      // Preserve the combined field without guessing a manufacturer.
      model: form.manufacturer_model, year: form.approximate_year,
      registration: form.registration, budget: budget?.[1],
      usage: form.primary_use, comments: form.comments,
    };
  } else if (operation === 'sell') {
    payload = {
      ...common, manufacturer: form.manufacturer, model: form.model,
      year: form.manufacturing_year, registration: form.registration,
      serialNumber: form.serial_number, totalHours: form.total_time,
      totalCycles: form.total_cycles, city: form.city,
      askingPrice: form.price_to_be_defined === true ? '' : form.asking_price,
      priceToBeDefined: form.price_to_be_defined === true,
      currency: form.currency, aircraftStatus: form.aircraft_status,
      relationship: form.relationship_to_aircraft,
      preferredContact: form.preferred_contact_method, comments: form.aircraft_notes,
    };
  } else {
    throw new Error('Tipo de operación inválido.');
  }
  // Only the explicit PHP payload is serialized; the reactive draft and validators
  // keep their original types. Consent and price flags remain strict booleans.
  return Object.fromEntries(Object.entries(payload).map(([key, value]) =>
    [key, ['privacyAccepted', 'priceToBeDefined'].includes(key) ? value : toPhpString(value)]));
}

// Initial contact sends only information actually requested in the public form.
export function buildInitialInquiryPayload(form, operation, website = '') {
  const payload = buildAircraftInquiryPayload(form, operation, website);
  const fields = ['operation', 'aircraftType', 'country', 'name', 'email', 'phone', 'privacyAccepted', 'website', 'comments', 'model'];
  if (operation === 'sell') fields.push('manufacturer', 'year');
  return Object.fromEntries(fields.map(key => [key, payload[key]]));
}

const phpFields = new Set(['operation', 'aircraftType', 'manufacturer', 'model', 'year', 'registration', 'budget', 'usage', 'country', 'company', 'comments', 'name', 'email', 'phone', 'serialNumber', 'totalHours', 'totalCycles', 'city', 'askingPrice', 'currency', 'priceToBeDefined', 'aircraftStatus', 'relationship', 'preferredContact', 'privacyAccepted']);
const safeValidationMessages = new Map([
  ['Debes aceptar el aviso de privacidad', 'You must accept the privacy notice'],
  ['Nombre, correo válido y teléfono son obligatorios', 'Name, a valid email address and phone number are required'],
]);
function safePhpValidation(message) {
  if (typeof message !== 'string') return '';
  // Exact grammar only: never echo arbitrary text, captured values or diagnostics.
  if (safeValidationMessages.has(message)) return message;
  const match = /^(Campo obligatorio|Valor inválido): ([A-Za-z]+)$/.exec(message);
  return match && phpFields.has(match[2]) ? message : '';
}

// Add translations for newly accepted server messages without changing the
// existing ES/EN catalog or exposing arbitrary backend content through i18n.
export function localizedInquiryError(message, locale) {
  const messages = new Map([
    [statusMessages[403], 'The request was not authorized.'],
    [statusMessages[502], 'The request server received an invalid response. Please try again later.'],
    [statusMessages[503], 'The request service is temporarily unavailable. Please try again later.'],
    ['El servidor devolvió HTML en lugar de JSON.', 'The server returned HTML instead of JSON.'],
    ...safeValidationMessages,
  ]);
  if (messages.has(message)) return locale === 'en' ? messages.get(message) : message;
  if (safePhpValidation(message)) {
    if (locale !== 'en') return message;
    return message.replace('Campo obligatorio:', 'Required field:').replace('Valor inválido:', 'Invalid value:');
  }
  return '';
}

export async function submitAircraftInquiry(payload, { endpoint = aircraftInquiryUrl, fetchImpl = globalThis.fetch } = {}) {
  const debug = createInquiryDiagnostics(import.meta.env?.DEV === true);
  if (requestInProgress) {
    debug.warn('Envío simultáneo bloqueado', { method: 'POST', endpoint: diagnosticEndpoint(endpoint) });
    const error = new Error('Ya existe una solicitud en proceso.');
    error.code = 'in_progress';
    throw error;
  }
  requestInProgress = true;
  debug.log('Inicio de solicitud', { endpoint: diagnosticEndpoint(endpoint), method: 'POST', startedAt: new Date().toISOString(), operation: ['buy','sell','aircraft_management','technical_service'].includes(payload?.operation) ? payload.operation : '[Operación no reconocida]' });
  try {
  let response;
  try {
    response = await fetchImpl(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload), signal: AbortSignal.timeout(60000),
    });
  } catch {
    debug.error('Fallo de transporte', { origin: 'Red, timeout o proxy: no hay respuesta HTTP disponible; no permite atribuir el fallo a PHP', elapsedMs: debug.elapsed() });
    throw new Error('No se pudo conectar. Revisa tu conexión e inténtalo de nuevo.');
  }
  const contentType = response.headers?.get?.('content-type') || '';
  const html = contentType.toLowerCase().includes('text/html');
  const json = contentType.toLowerCase().includes('json');
  debug.log('Respuesta HTTP', { status: response.status, elapsedMs: debug.elapsed(), contentType: html ? 'text/html' : json ? 'application/json' : '[No informado u otro tipo]', retryAfter: response.status === 429 ? safeRetryAfter(response.headers?.get?.('retry-after')) : undefined });
  if (html) {
    debug.error('HTML recibido en lugar de JSON', { status: response.status, origin: classifyInquiryFailure(response.status, null, 'html') });
    throw new Error('El servidor devolvió HTML en lugar de JSON.');
  }
  let result;
  try { result = await response.json(); } catch {
    debug.error('JSON inválido o cuerpo vacío', { status: response.status, origin: classifyInquiryFailure(response.status, null, 'invalid') });
    throw new Error(statusMessages[response.status] && response.status !== 422 ? statusMessages[response.status] : 'El servidor devolvió una respuesta inválida.');
  }
  debug.log('Respuesta PHP (campos seguros)', safeInquiryResponse(result, safePhpValidation(result?.message) || (Object.values(statusMessages).includes(result?.message) ? result.message : '')));
  if (!response.ok || result?.success !== true) {
    debug[response.status === 429 ? 'warn' : 'error']('Solicitud rechazada', { status: response.status, origin: classifyInquiryFailure(response.status, result) });
  }
  if (!response.ok || !result || typeof result !== 'object' || Array.isArray(result) || result.success !== true) {
    const validation = response.status === 422 ? safePhpValidation(result?.message) : '';
    const error = new Error(validation || statusMessages[response.status] || failure);
    const codes = new Set(['required','aircraftType','country','service','name','email','phone','phoneRequired','privacy','length','format','year']);
    const fields = new Set(['aircraftType','manufacturer','model','year','country','service','name','email','phone','comments','privacyAccepted']);
    if (response.status === 422 && result?.errors && typeof result.errors === 'object') {
      error.fields = Object.fromEntries(Object.entries(result.errors).filter(([key, code]) => fields.has(key) && codes.has(code)));
    }
    if (['delivery_unknown', 'in_progress', 'rate_limit'].includes(result?.code)) error.code = result.code;
    throw error;
  }
  debug.log('Respuesta satisfactoria del endpoint', { status: response.status, note: 'El formulario aún comprueba el contrato de recepción; no implica entrega final de correo.' });
  return result;
  } finally {
    requestInProgress = false;
    debug.log('Fin de solicitud', { elapsedMs: debug.elapsed(), automaticRetries: 0 });
  }
}

export function trackAircraftInquiry(event, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') window.gtag('event', event, params);
}
