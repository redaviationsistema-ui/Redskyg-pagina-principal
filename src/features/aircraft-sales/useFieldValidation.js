import { reactive, nextTick } from 'vue';
export function useFieldValidation(form, validate) {
  const fieldErrors = reactive({});
  const touched = new Set();
  function update(key) {
    const message = validate(form).errors[key];
    if (message) fieldErrors[key] = message;
    else delete fieldErrors[key];
    // Price and its checkbox are a single validation dependency.
    if (key === 'price_to_be_defined' && touched.has('asking_price')) update('asking_price');
  }
  function onBlur(event) {
    const key = event.target.dataset.field;
    if (key) { touched.add(key); update(key); }
  }
  function onEdit(event) {
    const key = event.target.dataset.field;
    if (key) nextTick(() => { if (key === 'country' && (touched.has('phone') || fieldErrors.phone)) update('phone'); if (touched.has(key) || fieldErrors[key] || key === 'privacy_accepted' || key === 'price_to_be_defined') update(key); });
  }
  function fieldAttrs(key) {
    return { 'data-field': key, 'aria-invalid': fieldErrors[key] ? 'true' : undefined, 'aria-describedby': fieldErrors[key] ? `field-error-${key}` : undefined };
  }
  async function checkFields(event) {
    const errors = validate(form).errors;
    for (const key of Object.keys(fieldErrors)) delete fieldErrors[key];
    Object.assign(fieldErrors, errors);
    Object.keys(errors).forEach(key => touched.add(key));
    if (!Object.keys(errors).length) return true;
    await nextTick();
    const first = [...event.target.querySelectorAll('[data-field]')].find(el => errors[el.dataset.field] && !el.disabled);
    first?.scrollIntoView({ behavior: typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
    first?.focus({ preventScroll: true });
    return false;
  }
  return { fieldErrors, fieldAttrs, onBlur, onEdit, checkFields };
}
