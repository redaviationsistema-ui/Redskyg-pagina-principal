# Landing compartida de compra y venta

> Documento histórico. La recepción pública de compra/venta ahora usa exclusivamente PHP por correo. Consulta [la configuración vigente](aircraft-inquiry-php.md); no apliques las instrucciones anteriores de almacenamiento o habilitación a la landing actual.

## Rutas y presentación

`/compra-venta-aeronaves` inicia en compra y `/vender-aeronave` inicia en venta. Ambas usan `SellAircraftLanding.vue`, con títulos y canonical propios. La selección es estado local de Vue; no modifica la ruta ni recarga la página. `KeepAlive` conserva los dos formularios durante las alternancias, incluida su validación independiente y los datos introducidos. No se conserva un borrador después de recargar o abandonar la página.

El panel común muestra el encabezado, el selector accesible por teclado y los campos de la modalidad activa. No hay archivos adjuntos en ninguno de los formularios. La foto tiene una altura acotada de 700 px en escritorio, 620 px en tablet y 450 px en móvil, con `object-fit: cover`; no existe imagen repetida ni extensión de cielo. En escritorio hay beneficios comerciales sobre fondo marino debajo. En móvil se presentan en formato compacto antes del panel.

El adjunto de esta solicitud contenía solamente el documento escrito, sin las dos imágenes de referencia. La revisión visual se hizo contra sus especificaciones; no se afirma comparación con una imagen que no se recibió.

## Auditoría y estado del backend

Se mantiene el resultado de la auditoría anterior:

- El catálogo público usa el SDK de Supabase y consultas por aeronave. Su servicio de correo llama a `https://redskyg.com/aircraft_sales.php`.
- El formulario de contacto llama a `https://redskyg.com/send-contact.php`.
- Los scripts PHP de envío y su implementación de almacenamiento/correo no están en este repositorio. No hay aplicación Laravel en este checkout.
- El flujo de propietarios añadido anteriormente llama a `/api/aircraft-seller`, en el runtime Node. Con la configuración local disponible no está habilitado; no se probó almacenamiento real ni se cambió su infraestructura.
- No se identificó un endpoint existente para compra general. No se reutilizó la consulta por una aeronave publicada ni se envió el nuevo formulario a un endpoint de contacto suponiendo que guardaba datos.

**La recepción de solicitudes de compra queda sin habilitar hasta conectar y comprobar el backend real.** El formulario informa este estado y proporciona `ventas@redskyg.com`. No se muestra éxito por completar campos ni por recibir una respuesta de correo sin persistencia confirmada.

No se crearon tablas, migraciones, bases de datos, servicios remotos, conexiones Supabase nuevas ni dependencias. El backend, la autenticación y el panel de vendedores se conservaron.

## Cómo conectar el backend existente, después de revisarlo

Antes de configurar una URL, revisar el código de los PHP existentes o su repositorio y acordar el endpoint real que registre solicitudes, valide campos en servidor y aplique controles antispam. También deberá registrar el tipo de operación y, si su proveedor de correo está configurado, notificar a `ventas@redskyg.com`. No introducir una base de datos distinta sin autorización.

El cliente de compra tiene un adaptador sin URL por defecto. Solo después de esa revisión y de verificar almacenamiento real, se puede configurar en la compilación:

```dotenv
VITE_AIRCRAFT_PURCHASE_ENDPOINT=URL_O_RUTA_REAL_DEL_BACKEND_REVISADO
# Opcional, conversión de compra independiente de la de vendedores:
VITE_AIRCRAFT_PURCHASE_ADS_SEND_TO=AW-ID/ETIQUETA_DE_COMPRA
```

Estas variables son públicas. No colocar contraseñas ni claves administrativas en ellas. No se necesita `SUPABASE_SERVICE_ROLE_KEY` para este adaptador y no se solicitó.

**Contrato propuesto para el adaptador, no un contrato de un servidor ya existente:** POST JSON con `operation_type: "purchase"`, `request_id` UUID, `aircraft_type`, `manufacturer_model`, `approximate_year` (opcional), `registration` (opcional), `budget_range`, `budget_min`, `budget_max`, `currency: "USD"`, `primary_use`, `contact_name`, `company`, `email`, `phone`, `country`, `comments`, `privacy_accepted: true` y `website` (honeypot). Los límites de presupuesto provienen de las opciones seleccionadas, no de texto libre. El servidor debe validar nuevamente todo, registrar la fecha de consentimiento y gestionar los reintentos de forma idempotente.

El adaptador exige HTTP 2xx y `{ "success": true, "persisted": true, "id": "IDENTIFICADOR_REAL_GUARDADO" }`. Una respuesta `{ "success": true }` de un servicio que solo envía correo se rechaza como confirmación de almacenamiento. Si el backend real tiene otro contrato, adaptar el cliente después de comprobar ese contrato; no cambiar el servidor para devolver indicadores de persistencia ficticios.

Los eventos `buyer_landing_view`, `buyer_form_start`, `buyer_form_submit` y `buyer_form_success` son independientes de los eventos existentes de vendedores. El éxito y la conversión de compra requieren la respuesta confirmada anterior y utilizan el identificador como `transaction_id`. No se envían datos de contacto a analítica.

## Archivos de esta implementación

Creados:

- `src/components/aircraft-sales/AircraftTradeForm.vue`: panel y selector; conservación de instancias.
- `src/components/aircraft-sales/BuyAircraftForm.vue`: formulario independiente de compra.
- `src/components/aircraft-sales/aircraftIntakeForm.css`: estilos encapsulados compartidos por ambos formularios.
- `src/features/aircraft-sales/buyerSchema.js`: validación exclusiva de compradores y rangos de presupuesto.
- `src/features/aircraft-sales/services/aircraftBuyer.service.js`: adaptador pendiente de endpoint real y eventos de compra.
- `tests/aircraft-buyer.test.mjs`: pruebas de validación, falta de backend y rechazo de confirmaciones insuficientes.
- `artifacts/aircraft-trade/`: capturas reales de Chrome y mediciones.

Modificados:

- `src/views/SellAircraftLanding.vue`: hero y procesos dinámicos; fotografía acotada y contenido común.
- `src/components/aircraft-sales/SellAircraftForm.vue`: opción de presentación embebida y extracción de estilos comunes. Conserva lógica de envío, campos, validaciones y conversiones.
- `src/router/index.js`: nueva ruta general y modalidad inicial de la ruta específica.
- `server/aircraft-runtime-server.mjs`: únicamente metadatos HTML de ambas rutas y sitemap; sin cambios de persistencia ni API.
- `public/sitemap.xml` y `public/sitemap-backup.xml`: URL general adicional.

## Verificación

`npm run build`: correcta.

`node --test tests/*.test.mjs`: 18 pruebas aprobadas, incluidas las 11 existentes de vendedores. `node --check server/aircraft-runtime-server.mjs` y `git diff --check`: sin errores.

Chrome real con perfil temporal: 22 comprobaciones aprobadas. Rutas iniciales, cambio de formulario sin navegación, conservación de ambos borradores, teclado/foco, contenido dinámico, privacidad/campos obligatorios independientes, ausencia de adjuntos, rechazo de envío de compra sin backend, continuidad del envío de vendedor con una respuesta simulada, fotografías cargadas y sin desbordamiento horizontal en 320/390/900/1440 px. Sin excepciones de la aplicación en consola.

Capturas completas de compra y venta en escritorio y móvil, más tablet, en `artifacts/aircraft-trade/`. `verification.json` contiene las mediciones. Las llamadas comerciales, Supabase, analítica y Turnstile se interceptaron durante las pruebas. No se generaron registros reales ni se enviaron correos. No se ejecutó una prueba real del nuevo backend porque no está disponible.
