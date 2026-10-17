export const aircraftTypes = ['Jet privado', 'Turbohélice', 'Helicóptero', 'Avión de pistón', 'Otro'];
export const manufacturers = ['Cessna', 'Beechcraft', 'Bombardier', 'Gulfstream', 'Dassault', 'Embraer', 'Hawker', 'Learjet', 'Bell', 'Airbus Helicopters', 'Leonardo', 'Otro'];
export const aircraftStatuses = ['Operativa', 'En mantenimiento', 'Fuera de servicio', 'Otro'];
export const relationships = ['Propietario', 'Representante autorizado', 'Broker', 'Otro'];
export const contactMethods = ['Correo electrónico', 'WhatsApp', 'Llamada'];
export const submissionStatuses = ['new', 'reviewing', 'contacted', 'documents_pending', 'accepted', 'rejected', 'closed'];
export const fileLimit = 6;
export const fileSizeLimit = 5 * 1024 * 1024;
export const totalSizeLimit = 20 * 1024 * 1024;
export const allowedFiles = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', pdf: 'application/pdf' };
export function validateFiles(files) {
  if (files.length > fileLimit) throw new Error('Puedes adjuntar hasta 6 archivos.');
  if (files.reduce((sum, f) => sum + f.size, 0) > totalSizeLimit) throw new Error('Los archivos no deben superar 20 MB en total.');
  for (const file of files) {
    const ext = file.name.split('.').pop().toLowerCase();
    if (!allowedFiles[ext] || file.type !== allowedFiles[ext]) throw new Error('Solo se permiten fotografías JPG, PNG, WebP y documentos PDF.');
    if (!file.size || file.size > fileSizeLimit) throw new Error('Cada archivo debe pesar entre 1 byte y 5 MB.');
  }
}
export function validateSeller(input, now = new Date()) {
  const out = {};
  const required = ['aircraft_type', 'manufacturer', 'model', 'registration', 'country', 'city', 'contact_name', 'email', 'phone', 'aircraft_status', 'relationship_to_aircraft', 'preferred_contact_method'];
  const optional = ['serial_number', 'aircraft_notes', 'company'];
  for (const key of [...required, ...optional]) {
    if (input[key] != null && typeof input[key] !== 'string') throw new Error('Formato de datos inválido.');
    out[key] = (input[key] || '').trim();
    if (required.includes(key) && !out[key]) throw new Error('Completa los campos obligatorios.');
    if (out[key].length > (key === 'aircraft_notes' ? 4000 : 160)) throw new Error('Uno de los campos excede la longitud permitida.');
  }
  for (const [key, options] of Object.entries({ aircraft_type: aircraftTypes, manufacturer: manufacturers, aircraft_status: aircraftStatuses, relationship_to_aircraft: relationships, preferred_contact_method: contactMethods })) {
    if (!options.includes(out[key])) throw new Error('Selecciona una opción válida.');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(out.email)) throw new Error('Ingresa un correo electrónico válido.');
  if (!/^\+[1-9][\d ()-]{6,23}$/.test(out.phone) || out.phone.replace(/\D/g, '').length > 15) throw new Error('Incluye el código internacional del teléfono, por ejemplo +52.');
  if (!/^[A-Za-z0-9 -]{2,20}$/.test(out.registration)) throw new Error('Revisa la matrícula de la aeronave.');
  out.registration = out.registration.toUpperCase();
  for (const key of ['manufacturing_year', 'total_time', 'total_cycles', 'asking_price']) {
    const value = input[key];
    if (value != null && !['number', 'string'].includes(typeof value)) throw new Error('Formato numérico inválido.');
    out[key] = value === '' || value == null ? null : Number(value);
    if (out[key] !== null && (!Number.isFinite(out[key]) || out[key] < 0 || out[key] > 1e12)) throw new Error('Revisa los valores numéricos.');
  }
  if (!Number.isInteger(out.manufacturing_year) || out.manufacturing_year < 1903 || out.manufacturing_year > now.getFullYear() + 1) throw new Error('Ingresa un año de fabricación válido.');
  if (out.total_cycles !== null && !Number.isInteger(out.total_cycles)) throw new Error('Los ciclos deben ser un número entero.');
  if (!['USD', 'MXN'].includes(input.currency)) throw new Error('Moneda inválida.');
  out.currency = input.currency;
  if (typeof input.price_to_be_defined !== 'boolean') throw new Error('Indica si el precio está por definir.');
  out.price_to_be_defined = input.price_to_be_defined;
  if (out.price_to_be_defined) out.asking_price = null;
  if (input.privacy_accepted !== true) throw new Error('Debes aceptar el aviso de privacidad.');
  return out;
}
