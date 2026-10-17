import { supabase } from '../../../supabase';
const base = '/api/aircraft-seller';
export function trackSeller(event, params = {}) {
  // Respect the site's existing consent/analytics setup; never send contact details.
  if (typeof window.gtag === 'function') window.gtag('event', event, params);
}
export function submitSeller(payload, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', base);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.timeout = 120000;
    xhr.upload.onprogress = (e) => e.lengthComputable && onProgress(Math.round(e.loaded / e.total * 100));
    xhr.onerror = () => reject(new Error('No se pudo conectar. Revisa tu conexión e inténtalo de nuevo.'));
    xhr.ontimeout = () => reject(new Error('La respuesta tardó demasiado. Puedes reintentar la misma solicitud.'));
    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText);
        if (xhr.status < 200 || xhr.status >= 300 || !data.id) throw new Error(data.message || 'No se pudo guardar la solicitud.');
        resolve(data);
      } catch (error) { reject(error); }
    };
    xhr.send(JSON.stringify(payload));
  });
}
export async function sellerAdmin(path = '', options = {}) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Inicia sesión con una cuenta administrativa autorizada.');
  const response = await fetch(`${base}/admin${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'No fue posible completar la operación.');
  return data;
}

export async function listSellerModels() {
  const { data, error } = await supabase.from('aircraft_sales').select('model, manufacturer').eq('is_active', true);
  if (error) return [];
  return data || [];
}
