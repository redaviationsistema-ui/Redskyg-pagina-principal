import { validateFields, assertFields } from './fieldValidation.js';
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
export function sellerFieldValidation(input, now = new Date()) {
  return validateFields(input, 'sell', { aircraft_type: aircraftTypes, aircraft_status: aircraftStatuses, relationship_to_aircraft: relationships, preferred_contact_method: contactMethods, currency: ['USD', 'MXN'] }, now);
}
export function validateSeller(input, now = new Date()) {
  const result = assertFields(sellerFieldValidation(input, now));
  return { ...result, registration: (result.registration || '').toUpperCase() };
}
