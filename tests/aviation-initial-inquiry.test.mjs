import test from 'node:test';
import assert from 'node:assert/strict';
import { validateBuyer } from '../src/features/aircraft-sales/buyerSchema.js';
import { validateSeller } from '../src/features/aircraft-sales/sellerSchema.js';
import { buildInitialInquiryPayload } from '../src/features/aircraft-sales/services/aircraftInquiry.service.js';
const contact = { aircraft_type: 'Jet privado', contact_name: 'María Pérez', email: 'test@example.com', phone: '7221234567', country: 'México', privacy_accepted: true };
test('initial purchase accepts only requested fields and optional model', () => {
  const value = validateBuyer(contact);
  assert.equal(value.manufacturer_model, undefined);
  const payload = buildInitialInquiryPayload(value, 'buy');
  assert.equal(payload.model, '');
  assert.deepEqual(Object.keys(payload).sort(), ['operation','aircraftType','country','name','email','phone','privacyAccepted','website','comments','model'].sort());
  assert.equal(payload.privacyAccepted, true);
});
test('initial sale accepts no year or technical and financial information', () => {
  const value = validateSeller({ ...contact, manufacturer: 'Cessna', model: 'Citation XLS+' });
  const payload = buildInitialInquiryPayload(value, 'sell');
  assert.equal(payload.year, '');
  assert.equal(payload.manufacturer, 'Cessna');
  assert.equal(payload.registration, undefined);
  assert.equal(payload.askingPrice, undefined);
  assert.equal(payload.serialNumber, undefined);
  assert.equal(payload.relationship, undefined);
  assert.equal(payload.privacyAccepted, true);
});
test('initial inquiries preserve consent requirement and honeypot', () => {
  assert.throws(() => validateBuyer({ ...contact, privacy_accepted: false }));
  assert.throws(() => validateSeller({ ...contact, manufacturer: '', model: 'Citation' }));
  assert.equal(buildInitialInquiryPayload(validateBuyer(contact), 'buy', 'spam').website, 'spam');
});
