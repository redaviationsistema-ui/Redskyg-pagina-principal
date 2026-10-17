# Vende tu aeronave — implementación y activación

> Documento histórico. La recepción pública de compra/venta ahora usa exclusivamente PHP por correo. Consulta [la configuración vigente](aircraft-inquiry-php.md); no apliques las instrucciones anteriores de almacenamiento o habilitación a la landing actual.

## Resultado local y auditoría

- Vue 3 / Vite, Vue Router, Supabase JS. Se reutilizan el header, footer, tipografías, sesión Supabase y fotografías existentes para jet y helicóptero. El turbohélice usa una fotografía CC0 del Smithsonian, guardada localmente en `public/images/king-air-smithsonian.jpg` (76 KB). No se añadió ninguna dependencia.
- `aircraft_sales`, `aircraft_sales_images` y el bucket `aircraft-sales` corresponden al catálogo público. `aircraft_sales_inquiries` recibe compradores, según su servicio actual; se conserva intacto.
- No había migraciones, esquema SQL, proveedor de correo del servidor ni código de un Controller administrativo en este checkout. El `.env` disponible contiene claves públicas del frontend; no permite auditar todas las tablas/políticas privadas del proyecto remoto. No se aplicaron cambios remotos.
- Antes de ejecutar la migración, un administrador debe consultar el esquema real para comprobar que no existe otra tabla de propietarios y que los nombres nuevos están libres. Ejecutar en el SQL Editor:

```sql
select table_name,column_name,data_type from information_schema.columns
where table_schema='public' and
(table_name ilike '%aircraft%' or table_name ilike '%seller%' or table_name ilike '%submission%')
order by table_name,ordinal_position;
select schemaname,tablename,policyname,roles,cmd,qual,with_check
from pg_policies where schemaname in ('public','storage');
select id,public,file_size_limit,allowed_mime_types from storage.buckets;
```

La landing está en `/vender-aeronave`; `/mx/vender-aeronave` redirige a ella. Solo hay versión española, por lo que no se declaran alternancias inglesas inexistentes. El panel independiente está en `/controller/solicitudes-venta-aeronaves`. Si el Controller real está en otro repositorio, falta incorporar allí un enlace o consumir estos endpoints con las mismas comprobaciones de permisos; no se simuló una integración con código ausente.

## Archivos creados

- `src/views/SellAircraftLanding.vue`: hero, proceso, categorías y confianza; estilos responsive.
- `src/components/aircraft-sales/SellAircraftForm.vue`: todos los campos, validación, archivos, progreso, estados, privacidad y Turnstile.
- `src/features/aircraft-sales/sellerSchema.js`: validación compartida y límites.
- `src/features/aircraft-sales/services/aircraftSeller.service.js`: envío, eventos y cliente administrativo.
- `src/views/AircraftSellerAdmin.vue`: búsqueda, filtro, paginación, detalle, documentos, estado, asesor, notas, seguimientos y reintento de correos.
- `server/aircraft-seller-api.mjs`: endpoint de propietarios y API administrativa.
- `supabase/migrations/202610160001_aircraft_sale_submissions.sql`: tablas, bucket y funciones transaccionales.
- `tests/aircraft-seller.test.mjs`: pruebas con servicios simulados.

## Archivos modificados

- `src/router/index.js`: rutas independientes y excepción acotada al guard de idioma.
- `src/App.vue`: canonical personalizado, imagen social, noindex y omisión de hreflang en páginas de un solo idioma.
- `src/components/AppHeader.vue`: acceso a la landing en los menús escritorio y móvil.
- `src/layouts/MainLayout.vue`: omite la promoción flotante del cotizador en estas rutas independientes.
- `server/aircraft-runtime-server.mjs`: API, metadatos iniciales de la landing y sitemap dinámico.
- `public/sitemap.xml` y `public/sitemap-backup.xml`: URL de la landing; el sitemap PHP existente utiliza primero el backup.
- `vite.config.js`: proxy de desarrollo exclusivamente para la nueva API.

## Base de datos

Aplicar `supabase/migrations/202610160001_aircraft_sale_submissions.sql` una sola vez después de la auditoría remota. Está dentro de una transacción y no reemplaza tablas existentes.

Crea `aircraft_sale_submissions`, `aircraft_sale_submission_files`, `aircraft_sale_submission_followups`, `aircraft_seller_email_outbox` y `aircraft_seller_admins`. Todas tienen RLS y ningún acceso directo para `anon`/`authenticated`. Solo el servidor usa `service_role`, después de validar entradas o autorizar al administrador. El bucket `aircraft-seller-private` es privado, limita MIME/tamaño y tiene una política restrictiva que impide accesos de clientes incluso si hubiera políticas amplias para otros buckets. La autorización de administradores se mantiene en una tabla privada, nunca en metadatos editables del usuario.

Registrar administradores/asesores con usuarios YA existentes en Supabase Auth, por SQL como administrador:

```sql
insert into public.aircraft_seller_admins(user_id,display_name)
values ('UUID-REAL-DE-AUTH-USERS','Nombre del asesor');
```

El panel consume la sesión Supabase existente. Sin sesión devuelve 401; sin pertenencia a la tabla devuelve 403. No se cambió el sistema de autenticación. No existe un login de Controller en este repositorio: para despliegues con autenticación en otro origen hay que proporcionar una sesión válida del mismo proyecto en este origen mediante el flujo administrativo existente.

`register_aircraft_seller` guarda solicitud, metadatos de archivos y dos trabajos de correo en una transacción, aplica el límite de 3 solicitudes/IP/hora y resuelve reintentos por UUID y hash de contenido. `update_aircraft_seller` guarda cambios y seguimiento de forma transaccional. Ninguna función escribe en el inventario público.

## Configuración

Servidor (variables privadas, **sin prefijo VITE**):

```dotenv
SUPABASE_URL=https://PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=CONFIGURAR_EN_EL_SERVIDOR
TURNSTILE_SECRET_KEY=CONFIGURAR_EN_EL_SERVIDOR
SELLER_IP_HASH_SECRET=SECRETO_ALEATORIO_LARGO_Y_ESTABLE
RESEND_API_KEY=CONFIGURAR_EN_EL_SERVIDOR
SELLER_EMAIL_FROM=Sky Group Aviation <direccion@dominio-verificado>
SELLER_ALLOWED_ORIGINS=https://redskyg.com
SELLER_TRUST_PROXY=false
```

Frontend (variables públicas de compilación, además de las existentes):

```dotenv
VITE_SELLER_TURNSTILE_SITE_KEY=CLAVE_PUBLICA_DEL_WIDGET
VITE_SELLER_GOOGLE_ADS_SEND_TO=AW-ID/ETIQUETA_DE_CONVERSION
```

Resend es el adaptador de correo implementado; se necesita verificar el dominio remitente. El correo interno va a `ventas@redskyg.com` y el propietario recibe la confirmación solicitada. El estado `sent` significa aceptación confirmada por el proveedor con identificador real, no certifica entrega en bandeja de entrada. Si falta configuración de correo, permanece `pending`; si el proveedor falla, queda `failed`, sin perder el registro. El panel permite reintentar los pendientes/fallidos y omite los ya enviados. Las claves de idempotencia de Resend protegen reintentos durante 24 horas; si hubo una respuesta ambigua y pasan más de 24 horas, comprobar el proveedor antes de reintentar para evitar duplicados. No hay worker automático de reintentos: el mecanismo disponible es administrativo.

Sin claves privadas o configuración antispam, el servidor responde 503. Sin sitekey pública, el formulario muestra el contacto de ventas y no permite enviar. La configuración no se sustituye por un éxito ficticio.

El widget debe autorizar `redskyg.com` y el servidor verifica `hostname` y `action=aircraft_seller`. Para desarrollo, agregar `http://localhost:5173` a `SELLER_ALLOWED_ORIGINS` y autorizar localhost en el widget de pruebas correspondiente. No desplegar claves de prueba en producción.

`SELLER_TRUST_PROXY=true` solo si el proxy sobrescribe `X-Forwarded-For` con una IP fiable. Por defecto se utiliza la conexión directa; detrás de un proxy sin configurar todos los visitantes compartirían su límite. Hay además un límite por proceso de 8 intentos por IP/minuto. El hash HMAC evita persistir la IP sin procesar.

## Despliegue y desarrollo

Se implementó en el repositorio existente para su hosting actual; no se creó otro Site ni se publicó una copia en un hosting ajeno.

```sh
npm run build
npm start
# En otra terminal para desarrollo con HMR:
npm run dev
```

Vite reenvía `/api/aircraft-seller` al runtime Node de `127.0.0.1:4173`. En producción, servir con este runtime o configurar el proxy para enviar únicamente esa API al proceso Node y hacer fallback SPA para las rutas nuevas. Un despliegue solo de `dist/` en PHP/estático **no ejecuta la nueva API**: requiere el proceso Node o portar el módulo al backend real. Mantener los destinos actuales del cotizador y del catálogo.

Permitir cuerpos JSON de hasta 29 MiB, configurar timeout del proxy de al menos 120 s y usar HTTPS. Se aceptan como máximo 6 archivos, 5 MiB cada uno, 20 MiB combinados; el transporte JSON usa base64. Hay validación de extensión, MIME, firma binaria, cantidad y tamaño en servidor. Se rechazan archivos SVG/HTML/ofimática ejecutable. Los archivos se descargan con enlaces privados de 60 segundos y disposición attachment, después de comprobar sesión y pertenencia administrativa. No se proporcionan URLs públicas ni se publican fotografías automáticamente. Las firmas binarias no son un escáner antivirus.

Storage y Postgres no comparten una transacción: ante fallos conocidos se eliminan subidas no vinculadas; si el resultado es ambiguo se conservan hasta comprobarlo. Una caída abrupta del proceso puede dejar objetos huérfanos privados. Revisar periódicamente los objetos con más de 24 horas que no aparezcan en `aircraft_sale_submission_files` y eliminarlos usando la API Storage (nunca borrando filas de `storage.objects` manualmente). Establecer la retención comercial de solicitudes y hashes IP según las políticas de la empresa.

## SEO y medición

Título, descripción, canonical y Open Graph se sirven en el HTML inicial mediante Node y se sincronizan al navegar. El sitemap incluye la ruta. Solo existe contenido español. El panel lleva noindex tanto en runtime como en navegación SPA.

Se usa `gtag` ya instalado por el sitio, sin duplicar la etiqueta ni enviar nombres, teléfonos o correos. Eventos: `seller_landing_view`, `seller_form_start` (una vez por formulario), `seller_form_submit` (intento validado), `seller_form_success` (respuesta con UUID persistido). La conversión Ads usa `VITE_SELLER_GOOGLE_ADS_SEND_TO` y el UUID como `transaction_id`; nunca se dispara por un error de guardado. Confirmar el ID/label de Ads y el consentimiento de medición en el entorno real.

## Validación

```sh
node --test tests/aircraft-seller.test.mjs
npm run build
node --check server/aircraft-seller-api.mjs
node --check server/aircraft-runtime-server.mjs
```

Pruebas locales: datos obligatorios, valores numéricos, privacidad, listas permitidas, normalización, archivos falsificados/límites, servicio sin configurar, métodos públicos, origen, honeypot, captcha, guardado/vínculos, aceptación y rechazo de correo, fallo de DB y limpieza, reintento sin duplicados/conflicto, acceso administrativo y límite de intentos.

Estas pruebas usan dobles de Supabase/Cloudflare/Resend; no prueban permisos SQL ni envían correos reales. Antes de activar: aplicar y comprobar migración/RLS en staging; probar acceso anon y usuario no autorizado a registros y bucket; verificar enlaces privados y caducidad con un administrador; enviar una solicitud con documentos y confirmar ambos correos; simular fallo de proveedor; probar dos envíos concurrentes y el límite de 3/hora; revisar escritorio/tablet/móvil y GA4/Ads con las claves reales. No se afirma una auditoría visual de navegador cuando no hay herramienta de navegador disponible.

Referencias de contratos consultados: [Supabase Storage privado](https://supabase.com/docs/guides/storage/buckets/fundamentals), [validación Turnstile en servidor](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/), [idempotencia Resend](https://resend.com/changelog/idempotency-keys).

Fotografía King Air: [Smithsonian, colección NASM A20000795000, CC0](https://www.si.edu/object/beechcraft-king-air-65-90%3Anasm_A20000795000). Archivo de imagen: `https://ids.si.edu/ids/deliveryService?id=NASM-2006-21933-000002&max=900`. Uso ilustrativo de la categoría, no representa una aeronave del inventario.
