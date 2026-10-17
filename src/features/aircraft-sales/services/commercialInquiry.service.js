import { submitAircraftInquiry } from './aircraftInquiry.service.js';
export async function submitCommercialInquiry(payload, options) {
  const result = await submitAircraftInquiry(payload, options);
  if (result.received !== true || result.requestId !== payload.requestId || !['sent', 'pending'].includes(result.delivery) || (result.delivery === 'pending' && result.stored !== true)) throw new Error('Unconfirmed receipt');
  const receipt = { ...result };
  if (receipt.clientConfirmation !== undefined && !['sent','failed','unknown','not_configured'].includes(receipt.clientConfirmation)) throw new Error('Unconfirmed client email state');
  if (receipt.folio !== undefined && (typeof receipt.folio !== 'string' || !/^SKY-[A-F0-9]{32}$/.test(receipt.folio))) throw new Error('Invalid receipt reference');
  return receipt;
}
