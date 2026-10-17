import { validateFields, assertFields } from './fieldValidation.js';
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
export function buyerFieldValidation(input, now = new Date()) {
  return validateFields(input, 'buy', { aircraft_type: buyerAircraftTypes, primary_use: primaryUses, budget_range: buyerBudgets.map(([key]) => key) }, now);
}
export function validateBuyer(input, now = new Date()) {
  const result = assertFields(buyerFieldValidation(input, now));
  const budget = buyerBudgets.find(([key]) => key === result.budget_range);
  return { ...result, operation_type: 'purchase', currency: 'USD', budget_min: budget?.[2] ?? null, budget_max: budget?.[3] ?? null, registration: (result.registration || '').toUpperCase() };
}
