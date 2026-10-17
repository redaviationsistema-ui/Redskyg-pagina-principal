import { buildInitialInquiryPayload, submitAircraftInquiry, trackAircraftInquiry } from './aircraftInquiry.service.js';
export const trackBuyer = trackAircraftInquiry;
export function submitBuyer(form, options) {
  return submitAircraftInquiry(buildInitialInquiryPayload(form, 'buy', form.website || ''), options);
}
