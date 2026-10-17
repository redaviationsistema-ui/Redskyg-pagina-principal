import { createHash, createHmac, randomUUID } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';
import { validateSeller, validateFiles, allowedFiles, submissionStatuses } from '../src/features/aircraft-sales/sellerSchema.js';
const bucket = 'aircraft-seller-private';
const table = 'aircraft_sale_submissions';
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
class HttpError extends Error { constructor(status, message) { super(message); this.status = status; } }
const checked = ({ data, error }) => { if (error) throw error; return data; };
const hash = value => createHash('sha256').update(value).digest('hex');
export function decodeSellerFiles(input) {
  if (!Array.isArray(input) || input.length > 6) throw new HttpError(400, 'Lista de archivos inválida.');
  const files = input.map(file => {
    if (!file || typeof file.name !== 'string' || file.name.length > 180 || /[\x00-\x1f/\\]/.test(file.name) || typeof file.data !== 'string' || !/^[A-Za-z0-9+/]*={0,2}$/.test(file.data)) throw new HttpError(400, 'Archivo inválido.');
    const bytes = Buffer.from(file.data, 'base64');
    const ext = file.name.split('.').pop().toLowerCase();
    const valid = ext === 'pdf' ? bytes.subarray(0,5).toString() === '%PDF-' : ['jpg','jpeg'].includes(ext) ? bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255 : ext === 'png' ? bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])) : ext === 'webp' ? bytes.subarray(0,4).toString() === 'RIFF' && bytes.subarray(8,12).toString() === 'WEBP' : false;
    if (!valid || file.type !== allowedFiles[ext]) throw new HttpError(400, 'El contenido del archivo no corresponde al tipo permitido.');
    return { name: file.name, type: file.type, bytes, size: bytes.length, ext };
  });
  validateFiles(files);
  return files;
}
async function readJson(req, max = 29 * 1024 * 1024) {
  if (!req.headers['content-type']?.startsWith('application/json')) throw new HttpError(415, 'Se requiere JSON.');
  let size = 0; const chunks = [];
  for await (const chunk of req) { size += chunk.length; if (size > max) throw new HttpError(413, 'La solicitud excede el tamaño permitido.'); chunks.push(chunk); }
  try { const data = JSON.parse(Buffer.concat(chunks).toString()); if (!data || Array.isArray(data) || typeof data !== 'object') throw Error(); return data; } catch { throw new HttpError(400, 'JSON inválido.'); }
}
const reply = (res, status, data) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }); res.end(JSON.stringify(data)); };
export function createSellerApi(env = process.env, dependencies = {}) {
  const fetch = dependencies.fetch || globalThis.fetch;
  const db = dependencies.db || (env.SUPABASE_SERVICE_ROLE_KEY && (env.SUPABASE_URL || env.VITE_SUPABASE_URL) ? createClient(env.SUPABASE_URL || env.VITE_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } }) : null);
  const origins = (env.SELLER_ALLOWED_ORIGINS || env.SITE_URL || 'https://redskyg.com').split(',').map(x => x.trim());
  const bursts = new Map();
  async function authorize(req) {
    const token = req.headers.authorization?.match(/^Bearer (.+)$/)?.[1];
    if (!token) throw new HttpError(401, 'Inicia sesión con una cuenta autorizada.');
    const { data, error } = await db.auth.getUser(token);
    if (error || !data.user) throw new HttpError(401, 'Sesión inválida.');
    const admin = checked(await db.from('aircraft_seller_admins').select('user_id').eq('user_id', data.user.id).maybeSingle());
    if (!admin) throw new HttpError(403, 'No tienes acceso a las solicitudes.');
    return data.user.id;
  }
  async function notify(record) {
    const jobs = checked(await db.from('aircraft_seller_email_outbox').select('*').eq('submission_id', record.id));
    for (const job of jobs) {
      if (job.status === 'sent' || !env.RESEND_API_KEY || !env.SELLER_EMAIL_FROM) continue;
      const owner = job.kind === 'owner';
      const aircraft = `${record.manufacturer} ${record.model} · ${record.registration}`;
      const text = owner ? `Estimado/a ${record.contact_name}:\n\nGracias por considerar a Sky Group Aviation para la comercialización de su aeronave.\n\nHemos recibido correctamente su solicitud correspondiente a la aeronave ${aircraft}.\n\nNuestro equipo comercial revisará la información proporcionada y uno de nuestros asesores se pondrá en contacto con usted a la brevedad.\n\nAtentamente,\n\nSky Group Aviation` : `Nueva solicitud para vender aeronave\n\nPropietario: ${record.contact_name}\nCorreo: ${record.email}\nTeléfono: ${record.phone}\nAeronave: ${aircraft}\nAño: ${record.manufacturing_year}\nUbicación: ${record.city}, ${record.country}\nPrecio: ${record.price_to_be_defined || record.asking_price == null ? 'Por definir' : `${record.currency} ${record.asking_price}`}\nEstado: ${record.submission_status}\nIdentificador: ${record.id}`;
      try {
        const response = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `seller-${record.id}-${job.kind}` }, body: JSON.stringify({ from: env.SELLER_EMAIL_FROM, to: [owner ? record.email : 'ventas@redskyg.com'], subject: owner ? 'Hemos recibido tu solicitud | Sky Group Aviation' : `Solicitud de venta | ${aircraft}`, text }), signal: AbortSignal.timeout(12000) });
        const result = await response.json();
        if (!response.ok || !result.id) throw Error('Email provider rejected request');
        checked(await db.from('aircraft_seller_email_outbox').update({ status: 'sent', provider_id: result.id, sent_at: new Date().toISOString() }).eq('submission_id', record.id).eq('kind', job.kind));
      } catch {
        await db.from('aircraft_seller_email_outbox').update({ status: 'failed' }).eq('submission_id', record.id).eq('kind', job.kind).neq('status', 'sent');
      }
    }
    const ownerJob = checked(await db.from('aircraft_seller_email_outbox').select('status').eq('submission_id', record.id).eq('kind','owner').single());
    return ownerJob.status;
  }
  return async function handle(req, res, url) {
    if (!url.pathname.startsWith('/api/aircraft-seller')) return false;
    try {
      if (!db) throw new HttpError(503, 'El servicio está pendiente de habilitación. Contacta a ventas@redskyg.com.');
      if (req.headers.origin && !origins.includes(req.headers.origin)) throw new HttpError(403, 'Origen no permitido.');
      const suffix = url.pathname.slice('/api/aircraft-seller'.length);
      if (suffix.startsWith('/admin')) {
        const author = await authorize(req);
        if (suffix === '/admin' && req.method === 'GET') {
          const status = url.searchParams.get('status');
          const search = (url.searchParams.get('q') || '').trim().slice(0,100);
          const page = Math.max(0, Math.min(10000, Math.trunc(Number(url.searchParams.get('page'))) || 0));
          let query = db.from(table).select('*', { count: 'exact' }).order('created_at', { ascending: false }).range(page * 30, page * 30 + 29);
          if (status) { if (!submissionStatuses.includes(status)) throw new HttpError(400, 'Estado inválido.'); query = query.eq('submission_status',status); }
          if (search) { const safe = search.replace(/[^\p{L}\p{N}@ .-]/gu,'').replace(/[.]/g,' '); query = query.or(['contact_name','registration','model','email','city','country','manufacturer'].map(key => `${key}.ilike.%${safe}%`).join(',')); }
          const response = await query;
          const rows = checked(response);
          const advisors = checked(await db.from('aircraft_seller_admins').select('*'));
          reply(res,200,{ rows, count: response.count, advisors }); return true;
        }
        const match = suffix.match(/^\/admin\/([a-f0-9-]+)(?:\/(files|retry-email))?$/i);
        if (!match || !uuid.test(match[1])) throw new HttpError(404,'Ruta no encontrada.');
        const id = match[1];
        if (match[2] === 'retry-email' && req.method === 'POST') {
          const record = checked(await db.from(table).select('*').eq('id',id).single());
          reply(res,200,{ email_status: await notify(record) }); return true;
        }
        if (match[2] === 'files' && req.method === 'GET') {
          const file = checked(await db.from('aircraft_sale_submission_files').select('*').eq('submission_id',id).eq('id',url.searchParams.get('file')).single());
          const signed = checked(await db.storage.from(bucket).createSignedUrl(file.storage_path,60,{ download: file.original_name }));
          reply(res,200,{ url: signed.signedUrl }); return true;
        }
        if (!match[2] && req.method === 'GET') {
          const record = checked(await db.from(table).select('*').eq('id',id).single());
          const files = checked(await db.from('aircraft_sale_submission_files').select('*').eq('submission_id',id));
          const followups = checked(await db.from('aircraft_sale_submission_followups').select('*').eq('submission_id',id).order('created_at',{ascending:false}));
          const emails = checked(await db.from('aircraft_seller_email_outbox').select('*').eq('submission_id',id));
          reply(res,200,{ record,files,followups,emails }); return true;
        }
        if (!match[2] && req.method === 'PATCH') {
          const data = await readJson(req,32000);
          if (!submissionStatuses.includes(data.submission_status) || typeof data.admin_notes !== 'string' || data.admin_notes.length > 12000 || typeof data.followup !== 'string' || data.followup.length > 4000 || (data.assigned_advisor !== null && !uuid.test(data.assigned_advisor))) throw new HttpError(400,'Revisa el estado, asesor o notas.');
          checked(await db.rpc('update_aircraft_seller',{ p_id:id,p_patch:{ submission_status:data.submission_status,admin_notes:data.admin_notes,assigned_advisor:data.assigned_advisor },p_author:author,p_followup:data.followup.trim() }));
          reply(res,200,{ success:true }); return true;
        }
        throw new HttpError(405,'Método no permitido.');
      }
      if (suffix !== '' || req.method !== 'POST') throw new HttpError(405,'Método no permitido.');
      if (!env.TURNSTILE_SECRET_KEY || !env.SELLER_IP_HASH_SECRET) throw new HttpError(503,'El servicio está pendiente de habilitación.');
      // Only trust forwarded IPs behind an explicitly configured, sanitizing proxy.
      const ip = env.SELLER_TRUST_PROXY === 'true' ? String(req.headers['x-forwarded-for'] || req.socket.remoteAddress).split(',')[0].trim() : req.socket.remoteAddress;
      const ipHash = createHmac('sha256',env.SELLER_IP_HASH_SECRET).update(String(ip)).digest('hex');
      const minute = Math.floor(Date.now()/60000);
      if (bursts.size > 10000) for (const [key,value] of bursts) if (value.minute !== minute) bursts.delete(key);
      const burst = bursts.get(ipHash);
      const attempts = burst?.minute === minute ? burst.count + 1 : 1;
      bursts.set(ipHash,{ minute,count:attempts });
      if (attempts > 8) throw new HttpError(429,'Demasiados intentos. Inténtalo más tarde.');
      const data = await readJson(req);
      if (data.website || !uuid.test(data.request_id)) throw new HttpError(400,'Solicitud inválida.');
      let payload, files;
      try { payload = validateSeller(data); files = decodeSellerFiles(data.files || []); } catch (error) { throw new HttpError(400,error.message); }
      const requestHash = hash(JSON.stringify({ payload, files: files.map(f => ({name:f.name,hash:hash(f.bytes)})) }));
      const existing = checked(await db.from(table).select('id,request_hash').eq('id',data.request_id).maybeSingle());
      if (existing) {
        if (existing.request_hash !== requestHash) throw new HttpError(409,'La solicitud cambió. Recarga la página para enviar una nueva.');
        // Do not re-send mail via unauthenticated retries.
        reply(res,200,{ id:existing.id,email_status:'pending' }); return true;
      }
      if (typeof data.turnstile_token !== 'string' || data.turnstile_token.length > 2048) throw new HttpError(400,'Completa la verificación de seguridad.');
      const verification = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{ method:'POST',body:new URLSearchParams({ secret:env.TURNSTILE_SECRET_KEY,response:data.turnstile_token,remoteip:String(ip) }),signal:AbortSignal.timeout(10000) });
      const captcha = await verification.json();
      if (!verification.ok || !captcha.success || captcha.action !== 'aircraft_seller' || !origins.some(origin => new URL(origin).hostname === captcha.hostname)) throw new HttpError(400,'Verificación de seguridad inválida o expirada.');
      const uploaded = [];
      const batch = randomUUID();
      try {
        for (const file of files) {
          const path = `${data.request_id}/${batch}/${randomUUID()}.${file.ext}`;
          checked(await db.storage.from(bucket).upload(path,file.bytes,{ contentType:file.type,upsert:false }));
          uploaded.push({ original_name:file.name,storage_path:path,content_type:file.type,size_bytes:file.size });
        }
        const saved = await db.rpc('register_aircraft_seller',{ p_submission:{ ...payload,id:data.request_id,request_hash:requestHash,ip_hash:ipHash,privacy_accepted_at:new Date().toISOString() },p_files:uploaded });
        if (saved.error) {
          // A lost response may mean the transaction committed; retain referenced objects.
          const after = await db.from(table).select('id,request_hash').eq('id',data.request_id).maybeSingle();
          if (after.error) throw new HttpError(503,'No se pudo confirmar el envío. Reintenta la misma solicitud.');
          if (!after.data || after.data.request_hash !== requestHash) {
            if (saved.error.message.includes('RATE_LIMIT')) throw new HttpError(429,'Has alcanzado el límite de solicitudes. Inténtalo en una hora.');
            throw saved.error;
          }
        }
      } catch (error) {
        // Before committing, unreferenced uploads can be removed safely.
        const stored = await db.from(table).select('id').eq('id',data.request_id).maybeSingle();
        if (!stored.error && !stored.data && uploaded.length) await db.storage.from(bucket).remove(uploaded.map(f=>f.storage_path));
        throw error;
      }
      // Remove files from a concurrent duplicate that were not linked by the transaction.
      try {
        const linked = checked(await db.from('aircraft_sale_submission_files').select('storage_path').eq('submission_id',data.request_id));
        const paths = new Set(linked.map(file => file.storage_path));
        const unlinked = uploaded.map(file => file.storage_path).filter(path => !paths.has(path));
        if (unlinked.length) await db.storage.from(bucket).remove(unlinked);
      } catch { /* retain objects if linkage cannot be verified */ }
      // Persistence succeeds independently of notification delivery.
      let emailStatus = 'pending';
      try { emailStatus = await notify({ ...payload,id:data.request_id,submission_status:'new' }); } catch { /* durable outbox remains available */ }
      reply(res,201,{ id:data.request_id,email_status:emailStatus });
    } catch (error) {
      if (!error.status) console.error('Seller API operation failed:', error.code || error.name);
      reply(res,error.status || 500,{ message:error.status ? error.message : 'No fue posible completar la operación. Inténtalo de nuevo.' });
    }
    return true;
  };
}
