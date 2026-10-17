// Shared deterministic validation; input values remain untouched while typing.
export function validateFields(input, operation, options, now = new Date()) {
  const errors = {}, values = {};
  const required = operation === 'buy'
    ? ['aircraft_type', 'contact_name', 'email', 'phone', 'country']
    : ['aircraft_type', 'manufacturer', 'model', 'country', 'contact_name', 'email', 'phone'];
  const fail = (key, message) => { errors[key] ||= message; };
  const allowed = [...required, 'manufacturer_model', 'budget_range', 'primary_use', 'manufacturing_year', 'city', 'aircraft_status', 'relationship_to_aircraft', 'preferred_contact_method', 'currency', 'registration', 'company', 'comments', 'approximate_year', 'serial_number', 'aircraft_notes', 'total_time', 'total_cycles', 'asking_price', 'price_to_be_defined', 'privacy_accepted'];
  const numeric = ['manufacturing_year', 'approximate_year', 'total_time', 'total_cycles', 'asking_price'];
  for (const key of new Set(allowed)) {
    const raw = input[key];
    if (raw != null && !['string', 'number', 'boolean'].includes(typeof raw)) fail(key, 'Revisa el formato de este campo');
    values[key] = typeof raw === 'string' ? raw.trim() : raw;
    if (!numeric.includes(key) && !['privacy_accepted', 'price_to_be_defined'].includes(key) && raw != null && typeof raw !== 'string') {
      fail(key, 'Revisa el formato de este campo'); values[key] = '';
    }
    if (typeof raw === 'string' && raw.length > (['comments', 'aircraft_notes'].includes(key) ? 4000 : key === 'registration' ? 20 : 160)) fail(key, key === 'registration' ? 'Revisa la matrícula ingresada' : 'Este campo excede la longitud permitida');
    if (typeof raw === 'string' && /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(raw)) fail(key, 'Revisa los caracteres ingresados');
  }
  for (const key of required) if (values[key] == null || values[key] === '') fail(key, 'Este campo es obligatorio');
  for (const [key, choices] of Object.entries(options)) if (values[key] && !choices.includes(values[key])) fail(key, 'Selecciona una opción válida');
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) fail('email', 'Ingresa un correo electrónico válido');
  if (values.phone) {
    const digits = values.phone.replace(/\D/g, '');
    if (!/^[\d ()-]+$/.test(values.phone) || digits.length !== 10) fail('phone', 'Ingresa un teléfono de 10 dígitos');
    else values.phone = digits;
  }
  if (values.registration && !/^[A-Za-z0-9-]{2,20}$/.test(values.registration)) fail('registration', 'Revisa la matrícula ingresada');
  if (values.serial_number && !/^[\p{L}\p{N}\s/().+_-]+$/u.test(values.serial_number)) fail('serial_number', 'Revisa el número de serie ingresado');
  if (values.contact_name && !/^[\p{L}\p{M} '\u2019.\-]+$/u.test(values.contact_name)) fail('contact_name', 'Revisa el nombre ingresado');
  if (values.country && !/^[\p{L}\p{M} '\u2019.\-]+$/u.test(values.country)) fail('country', 'Revisa el país ingresado');
  const yearKey = operation === 'buy' ? 'approximate_year' : 'manufacturing_year';
  const year = values[yearKey];
  if (year != null && year !== '' && (!/^\d{4}$/.test(String(year)) || Number(year) < 1903 || Number(year) > now.getFullYear() + 1)) fail(yearKey, 'Ingresa un año de fabricación válido');
  values[yearKey] = year == null || year === '' ? null : Number(year);
  if (operation === 'sell') {
    for (const key of ['total_time', 'total_cycles', 'asking_price']) {
      if (key === 'asking_price' && input.price_to_be_defined === true) { values[key] = null; continue; }
      const raw = values[key];
      if (raw == null || raw === '') {
        values[key] = null;
        if (key === 'asking_price' && input.price_to_be_defined === false) fail(key, 'Ingresa un precio positivo o selecciona precio por definir');
        continue;
      }
      // Decimal dot or comma; no ambiguous thousands separators or exponent coercion.
      const normalized = String(raw).replace(',', '.');
      const valid = (key === 'total_cycles' ? /^\d+$/ : /^\d+(?:\.\d+)?$/).test(normalized);
      const number = Number(normalized);
      if (!valid || !Number.isFinite(number) || number > 1e12 || (key === 'asking_price' && number <= 0)) fail(key, key === 'total_cycles' ? 'Ingresa un número entero de ciclos' : key === 'total_time' ? 'Ingresa las horas de vuelo utilizando números' : 'Ingresa un precio positivo o selecciona precio por definir');
      values[key] = number;
    }
  }
  if (operation === 'sell' && input.price_to_be_defined != null && typeof input.price_to_be_defined !== 'boolean') fail('price_to_be_defined', 'Selecciona una opción válida');
  if (input.privacy_accepted !== true) fail('privacy_accepted', 'Debes aceptar el aviso de privacidad');
  return { errors, values };
}
export function assertFields(result) {
  if (Object.keys(result.errors).length) {
    const error = new Error(Object.values(result.errors)[0]);
    error.fields = result.errors;
    throw error;
  }
  return result.values;
}
