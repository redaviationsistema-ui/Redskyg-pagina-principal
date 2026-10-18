import contract from '../../../server/php/commercial-contract.json' with { type: 'json' };
export function normalizePhone(value) {
  const raw = String(value ?? '').trim();
  const digits = raw.replace(/[^0-9]/g, '');
  if (raw.startsWith('+')) return digits.startsWith('52') && digits.length === 12 ? digits.slice(2) : digits;
  return digits.slice(0, 10);
}
export function isValidPhone(value) {
  if (typeof value !== 'string') return false;
  const raw = value.trim();
  if (raw.startsWith('+')) {
    if (!/^\+52[0-9 ()-]+$/.test(raw)) return false;
    const digits = raw.replace(/[^0-9]/g, '');
    return digits.startsWith('52') && digits.length === 12;
  }
  return /^[0-9]{10}$/.test(raw);
}
export { contract };
export const operationForMode = Object.fromEntries(Object.entries(contract.operations).map(([key, value]) => [value.mode, key]));
const aircraftTypeLabels = new Map([['jet','Jet privado'],['turboprop','Turbohélice'],['helicopter','Helicóptero'],['other','Otro']]);
const aircraftTypeAliases = new Map([['Avión de pistón','other']]);
export function aircraftTypeOptions(types) {
  return types.map(value => ({ label: aircraftTypeLabels.get(value) || value, value: aircraftTypeAliases.get(value) || value }));
}
export function validateCommercial(input, operation, now = new Date()) {
  const config = contract.operations[operation];
  if (!config) throw new Error('Invalid operation');
  const errors = {}, values = {};
  const fail = (key, code) => { errors[key] ||= code; };
  for (const [key, rule] of Object.entries({ ...contract.common, ...config.fields })) {
    const raw = input[key] ?? '';
    const value = typeof raw === 'string' ? raw.trim() : '';
    values[key] = value;
    if (typeof raw !== 'string') fail(key, 'format');
    if (rule.required && !value) fail(key, key === 'phone' ? 'phoneRequired' : key === 'country' ? 'country' : key === 'service' ? 'service' : key === 'aircraftType' ? 'aircraftType' : 'required');
    if (key !== 'phone' && value && (Array.from(value).length < (rule.min || 0) || Array.from(value).length > (rule.max || 254))) fail(key, 'length');
    if ((key === 'comments' ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/ : /[\u0000-\u001F\u007F]/).test(typeof raw === 'string' ? raw : '')) fail(key, 'format');
  }
  if (!aircraftTypeOptions(config.types).some(option => option.value === values.aircraftType)) fail('aircraftType', 'aircraftType');
  if (values.country && /[\p{Cc}<>]/u.test(values.country)) fail('country', 'format');
  if (values.service && /[<>]/.test(values.service)) fail('service', 'format');
  if (values.name && !/^[\p{L}\p{M} '\u2019.\-]+$/u.test(values.name)) fail('name', 'name');
  if (values.email && !/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+$/.test(values.email)) fail('email', 'email');
  if (values.email && (values.email.split('@')[0].length > 64 || /(^\.|\.$|\.\.)/.test(values.email.split('@')[0]))) fail('email', 'email');
  if (values.phone && !isValidPhone(input.phone)) fail('phone', 'phone');
  else if (values.phone) values.phone = normalizePhone(input.phone);
  if (config.fields.year && values.year && (!/^\d{4}$/.test(values.year) || +values.year < 1903 || +values.year > now.getFullYear())) fail('year', 'year');
  if (input.privacyAccepted !== true) fail('privacyAccepted', 'privacy');
  values.privacyAccepted = input.privacyAccepted === true;
  return { errors, values };
}
