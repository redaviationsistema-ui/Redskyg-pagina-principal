import { buildAircraftInquiryPayload, submitAircraftInquiry, trackAircraftInquiry } from './aircraftInquiry.service.js';
export const trackBuyer = trackAircraftInquiry;
export function submitBuyer(form, options) {
  return submitAircraftInquiry(buildAircraftInquiryPayload(form, 'buy', form.website || ''), options);
}
