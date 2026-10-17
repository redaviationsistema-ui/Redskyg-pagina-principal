const prefix = '[SKY GROUP][AIRCRAFT INQUIRY]';
const backendCodes = new Set(['unavailable','configuration','storage','delivery_failed','delivery_unknown','in_progress','rate_limit','validation','invalid_request_id','invalid_json','method_not_allowed','body_too_large','content_type','origin','spam','request_conflict']);
const fieldNames = new Set(['aircraftType','manufacturer','model','year','country','service','name','email','phone','comments','privacyAccepted']);
const validationCodes = new Set(['required','aircraftType','country','service','name','email','phone','phoneRequired','privacy','length','format','year']);
export function diagnosticEndpoint(endpoint) {
  try {
    const url = new URL(endpoint, globalThis.location?.origin || 'http://localhost');
    return url.origin + url.pathname; // Never print URL credentials, query values or fragments.
  } catch { return '[URL inválida u oculta]'; }
}
export function safeInquiryResponse(result, safeMessage) {
  if (!result || typeof result !== 'object' || Array.isArray(result)) return { shape: 'JSON no compatible' };
  const safe = {};
  for (const key of ['success','received','stored','confirmationSent','pdfAttached']) if (typeof result[key] === 'boolean') safe[key] = result[key];
  if (backendCodes.has(result.code)) safe.code = result.code;
  if (['sent','failed','pending'].includes(result.delivery)) safe.delivery = result.delivery;
  if (['sent','failed','unknown','not_configured'].includes(result.clientConfirmation)) safe.clientConfirmation = result.clientConfirmation;
  if (typeof result.message === 'string') safe.message = safeMessage || '[Mensaje PHP oculto: no pertenece al catálogo seguro]';
  if (result.errors && typeof result.errors === 'object') safe.errors = Object.fromEntries(Object.entries(result.errors).filter(([field,code]) => fieldNames.has(field) && validationCodes.has(code)));
  return safe; // Deliberately excludes identifiers, echoed inputs and unknown fields.
}
export function classifyInquiryFailure(status, result, format = 'json') {
  if (format !== 'json') return 'Respuesta no JSON: servidor/proxy; origen exacto indeterminado';
  if (status === 429) return result?.code === 'rate_limit' ? 'PHP: límite de frecuencia confirmado' : 'Límite HTTP 429; emisor indeterminado';
  if (status === 422) return 'Validación HTTP 422';
  if (status === 503) {
    return ({configuration:'PHP: configuración privada incompleta o no válida',storage:'PHP: almacenamiento de control no disponible',delivery_failed:'PHP: envío comercial rechazado o no iniciado',unavailable:'Receptor no disponible: revisar bootstrap/dependencias y logs PHP'})[result?.code] || 'HTTP 503: PHP/servidor/proxy no determinado por la respuesta';
  }
  return status >= 400 ? 'Error HTTP: revisar respuesta segura y logs del servidor' : 'Respuesta HTTP recibida; validar contrato de recepción';
}
export function createInquiryDiagnostics(enabled, logger = console) {
  const started = performance.now();
  const emit = (level, event, details) => { if (enabled) logger[level](prefix + ' ' + event, details); };
  return {
    log: (event, details) => emit('log',event,details),
    warn: (event, details) => emit('warn',event,details),
    error: (event, details) => emit('error',event,details),
    elapsed: () => Math.round(performance.now()-started),
  };
}
export function safeRetryAfter(value) {
  if (!value) return 'No informado';
  if (/^\d{1,9}$/.test(value)) return value;
  if (/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), \d{2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4} \d{2}:\d{2}:\d{2} GMT$/.test(value)) return value;
  return '[Encabezado no válido u oculto]';
}
