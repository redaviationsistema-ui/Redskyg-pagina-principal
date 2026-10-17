import { buyerBudgets } from '../buyerSchema.js';

export const aircraftInquiryUrl = import.meta.env?.VITE_AIRCRAFT_INQUIRY_URL || '/aircraft-inquiry.php';
// Enable only after an authorized delivery check on the hosting succeeds.
export const aircraftInquiryVerified = import.meta.env?.VITE_AIRCRAFT_INQUIRY_VERIFIED === 'true';
const failure = 'No fue posible enviar tu solicitud. Inténtalo de nuevo o contacta a nuestro equipo.';
const statusMessages = {
  400: 'Revisa los datos de tu solicitud antes de enviarla.',
  405: 'El servicio de solicitudes no está disponible en este momento.',
  413: 'La solicitud excede el tamaño permitido. Reduce los comentarios e inténtalo de nuevo.',
  422: 'Revisa los campos obligatorios y la aceptación del aviso de privacidad.',
  429: 'Demasiados intentos. Inténtalo más tarde.',
};

export function buildAircraftInquiryPayload(form, operation, website = '') {
  const common = {
    operation, aircraftType: form.aircraft_type, country: form.country,
    company: form.company, name: form.contact_name, email: form.email,
    phone: form.phone, privacyAccepted: form.privacy_accepted,
    // Preserve the existing honeypot; backend enforcement is still required.
    website,
  };
  if (operation === 'buy') {
    const budget = buyerBudgets.find(([key]) => key === form.budget_range);
    return {
      ...common,
      // The UI captures a single free-text manufacturer/model field. Preserve it
      // intact; do not guess a manufacturer or split multiword model names.
      model: form.manufacturer_model,
      year: form.approximate_year === '' ? null : form.approximate_year,
      registration: form.registration, budget: budget?.[1] || '',
      usage: form.primary_use, comments: form.comments,
    };
  }
  if (operation === 'sell') {
    return {
      ...common, manufacturer: form.manufacturer, model: form.model,
      year: form.manufacturing_year, registration: form.registration,
      serialNumber: form.serial_number, totalHours: form.total_time,
      totalCycles: form.total_cycles, city: form.city,
      askingPrice: form.price_to_be_defined ? null : form.asking_price,
      currency: form.currency, aircraftStatus: form.aircraft_status,
      relationship: form.relationship_to_aircraft,
      preferredContact: form.preferred_contact_method, comments: form.aircraft_notes,
    };
  }
  throw new Error('Tipo de operación inválido.');
}

export async function submitAircraftInquiry(payload, { endpoint = aircraftInquiryUrl, fetchImpl = globalThis.fetch } = {}) {
  let response;
  try {
    response = await fetchImpl(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload), signal: AbortSignal.timeout(60000),
    });
  } catch {
    throw new Error('No se pudo conectar. Revisa tu conexión e inténtalo de nuevo.');
  }
  let result;
  try { result = await response.json(); } catch {
    throw new Error(response.ok ? 'El servidor devolvió una respuesta inválida.' : statusMessages[response.status] || failure);
  }
  if (!response.ok || !result || typeof result !== 'object' || Array.isArray(result) || result.success !== true) {
    // Do not expose PHP/SMTP diagnostics, paths, credentials or arbitrary server messages.
    throw new Error(statusMessages[response.status] || failure);
  }
  return result;
}

export function trackAircraftInquiry(event, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') window.gtag('event', event, params);
}
