export const buyerAircraftTypes = ['Jet privado', 'Turbohélice', 'Helicóptero', 'Otro'];
export const primaryUses = ['Personal', 'Corporativo', 'Charter', 'Otro'];
export const buyerBudgets = [
  ['under_1m', 'Menos de USD $1,000,000', null, 1000000],
  ['1m_3m', 'USD $1,000,000 a $3,000,000', 1000000, 3000000],
  ['3m_5m', 'USD $3,000,000 a $5,000,000', 3000000, 5000000],
  ['5m_10m', 'USD $5,000,000 a $10,000,000', 5000000, 10000000],
  ['over_10m', 'Más de USD $10,000,000', 10000000, null],
  ['undefined', 'Por definir', null, null],
];
export function validateBuyer(input, now = new Date()) {
  const result = { operation_type: 'purchase', currency: 'USD' };
  for (const key of ['aircraft_type', 'manufacturer_model', 'registration', 'primary_use', 'contact_name', 'company', 'email', 'phone', 'country', 'comments']) {
    if (typeof input[key] !== 'string') throw new Error('Revisa el formato de los campos.');
    result[key] = input[key].trim();
    if (!['registration', 'company', 'comments'].includes(key) && !result[key]) throw new Error('Completa los campos obligatorios de compra.');
    if (result[key].length > (key === 'comments' ? 4000 : 160)) throw new Error('Uno de los campos excede la longitud permitida.');
  }
  if (!buyerAircraftTypes.includes(result.aircraft_type) || !primaryUses.includes(result.primary_use)) throw new Error('Selecciona un tipo de aeronave y un uso válidos.');
  const budget = buyerBudgets.find(([key]) => key === input.budget_range);
  if (!budget) throw new Error('Selecciona tu presupuesto aproximado.');
  Object.assign(result, { budget_range: budget[0], budget_min: budget[2], budget_max: budget[3] });
  const year = input.approximate_year;
  result.approximate_year = year === '' || year == null ? null : Number(year);
  if (result.approximate_year !== null && (!['number', 'string'].includes(typeof year) || !Number.isInteger(result.approximate_year) || result.approximate_year < 1903 || result.approximate_year > now.getFullYear() + 1)) throw new Error('Revisa el año aproximado.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result.email)) throw new Error('Ingresa un correo electrónico válido.');
  if (!/^\+[1-9][\d ()-]{6,23}$/.test(result.phone) || result.phone.replace(/\D/g, '').length > 15) throw new Error('Incluye el código internacional del teléfono, por ejemplo +52.');
  if (result.registration && !/^[A-Za-z0-9 -]{2,20}$/.test(result.registration)) throw new Error('Revisa la matrícula de interés.');
  result.registration = result.registration.toUpperCase();
  if (input.privacy_accepted !== true) throw new Error('Debes aceptar el aviso de privacidad.');
  result.privacy_accepted = true;
  return result;
}
