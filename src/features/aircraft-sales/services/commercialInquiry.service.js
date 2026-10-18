import { submitAircraftInquiry } from './aircraftInquiry.service.js';
export function commercialInquiryErrorKey(error) {
  if (['delivery_unknown', 'in_progress'].includes(error?.code)) return 'uncertain';
  if (error?.code === 'rate_limit') return 'rateLimit';
  if (error?.status === 422) return 'validationFailed';
  if (error?.status === 502) return 'badGateway';
  if (error?.status === 503) return 'serviceUnavailable';
  return 'retry';
}

export async function submitCommercialInquiry(payload, options) {
  const result = await submitAircraftInquiry(payload, options);
  // Delivery is confirmed by the PHP response itself. Optional diagnostics,
  // email acknowledgments, folio formatting, or echoed IDs must not override it.
  if (result.success !== true || result.received !== true || result.delivery !== 'sent') {
    const error = new Error('Unconfirmed receipt');
    error.code = 'unconfirmed_receipt';
    throw error;
  }
  return { ...result };
}
