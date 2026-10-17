# Landing de aeronaves — recepción exclusivamente por correo PHP

Esta es la configuración vigente de los formularios públicos. Sustituye las propuestas anteriores de almacenamiento para la landing. No se necesita Supabase, Firebase, base de datos, clave administrativa ni el servidor Node para recibir estas solicitudes.

## Auditoría y cambios

Se reutilizan `SellAircraftLanding.vue`, las rutas ES/EN de compra/venta, `AircraftTradeForm.vue` y los dos formularios existentes. Se conservan los campos, validaciones, privacidad, estado en memoria, selector, diseño responsive y eventos previos. Ningún dato personal se guarda en LocalStorage.

Ambos formularios envían ahora un POST JSON mediante `src/features/aircraft-sales/services/aircraftInquiry.service.js` a `/aircraft-inquiry.php`, configurable con `VITE_AIRCRAFT_INQUIRY_URL`. El servicio exige HTTP 2xx y `success === true`. No exige `persisted` ni un identificador de base de datos: la recepción es por correo. No hay `no-cors`, claves SMTP ni información personal en consola.

Se retiró del formulario de venta la dependencia del servicio Supabase, el catálogo de autocompletado remoto y el requisito Turnstile que pertenecían al endpoint Node anterior. El campo modelo conserva la captura manual y los campos visuales siguen siendo los mismos. Las consultas al catálogo público, el panel anterior y sus servicios se mantienen intactos para no afectar otros usos; la landing pública ya no los llama. No se aplicaron ni crearon migraciones.

La validación antispam, frecuencia, aceptación de privacidad, correo, límites y escapado HTML deben seguir ejecutándose en PHP. Se conserva el honeypot `website` en el JSON; es necesario comprobar que PHP lo valide. No se afirma que la validación cliente sustituya la del servidor. No se modificaron reglas CORS del hosting.

## Contrato de campos

Compra: `operation: "buy"`, `aircraftType`, `model`, `year`, `registration`, `budget`, `usage`, `country`, `company`, `comments`, `name`, `email`, `phone`, `privacyAccepted`, `website`.

El campo visible de compra es una sola entrada «Fabricante y modelo». Se envía íntegro en `model`: no se intenta dividir «Airbus Helicopters H145» o inventar un fabricante. No se manda `manufacturer` porque no existe una captura separada. El PHP deberá aceptar esta entrada combinada para compras. Si su contrato requiere fabricante separado incluso en compra, hay que revisar su código antes de modificar el formulario. El presupuesto es la descripción real de la opción seleccionada; año vacío es `null` y matrícula desconocida queda vacía. No se envían ejemplos ni campos técnicos de venta.

Venta: `operation: "sell"`, `aircraftType`, `manufacturer`, `model`, `year`, `registration`, `serialNumber`, `totalHours`, `totalCycles`, `country`, `city`, `askingPrice`, `currency`, `aircraftStatus`, `company`, `relationship`, `preferredContact`, `comments`, `name`, `email`, `phone`, `privacyAccepted`, `website`.

Se conservan validaciones y normalización. Cuando «Precio por definir» está marcado, `askingPrice` es `null`, aunque haya un precio escrito antes. No se envían archivos, tokens Supabase, documentos ni datos administrativos.

## Éxito, errores y analítica

Solo después de la respuesta HTTP satisfactoria con `success: true` se presenta la confirmación accesible ES/EN indicada por el usuario. No se afirma que un correo al cliente haya sido enviado, ni que se haya guardado un registro en una base de datos. Una confirmación al cliente pendiente no invalida una recepción interna confirmada por PHP.

Los formularios bloquean envíos simultáneos y quedan en confirmación después de éxito. Los errores conservan campos y permiten reintento. Se manejan errores de red, timeout, JSON inválido, HTTP 400/405/413/422/429/500 y otras respuestas no satisfactorias. Los mensajes públicos son controlados: no se muestran mensajes técnicos arbitrarios del PHP ni diagnósticos SMTP. Se traducen al idioma activo.

Eventos nuevos tras éxito: `aircraft_purchase_submit_success` y `aircraft_sale_submit_success`. Se conservan `buyer_form_success` / `seller_form_success` y las conversiones Ads existentes. Cada uno se emite una vez por formulario confirmado. Si PHP no devuelve un ID, se usa un UUID local de la instancia solo para `transaction_id` de Ads; no se presenta como identificador de un registro guardado. No se incluye nombre, correo, teléfono ni comentarios en analítica. Si GA4 importa también eventos existentes como conversiones, revisar su configuración para no contar la misma recepción por dos eventos diferentes.

## Desarrollo y producción

Copiar las variables públicas de `docs/aircraft-inquiry.env.example` según el entorno. El valor recomendado de URL es relativo, tanto en producción como para desarrollo con proxy. Una URL absoluta salta el proxy y necesita la política CORS real del hosting; no se añade `Access-Control-Allow-Origin: *`.

`vite.config.js` incorpora un proxy HTTPS exclusivamente para el pathname `/aircraft-inquiry.php`. El resto de proxies existentes no se cambia. Vite aplica el proxy solo al servidor de desarrollo, no a `dist/`. Al subir `dist/` al hosting, el navegador llama al PHP de ese mismo dominio. Conservar `public_html/aircraft-inquiry.php` y `public_html/phpmailer/`; no copiar secretos a `public/` del proyecto.

`VITE_AIRCRAFT_INQUIRY_VERIFIED=false` mantiene un aviso de servicio de correo pendiente de verificación, sin bloquear el botón. Se puede completar y enviar; solo una respuesta PHP confirmada muestra éxito. El aviso debe retirarse configurando `true` y recompilando **después** de una prueba real de entrega autorizada. No se retiró como si SMTP ya estuviera funcionando.

## Comprobación real del endpoint

El 16 de octubre de 2026 se consultó `https://redskyg.com/aircraft-inquiry.php` con GET, sin cuerpo, datos personales ni envío comercial. Resultado:

```text
HTTP/1.1 500 Internal Server Error
Server: Apache
Content-Length: 0
Content-Type: text/html; charset=UTF-8
```

La URL responde, pero no entrega JSON ni un rechazo controlado de método. Esto no prueba el funcionamiento del POST ni permite identificar la causa. No se envió un POST real y no se verificó entrega SMTP.

El archivo PHP y la configuración privada de cPanel no están disponibles en este repositorio; por ello no se comprobó `SMTP_PASSWORD`, PHPMailer ni la seguridad del PHP. Revisar en el hosting:

- Logs de errores PHP/cPanel correspondientes a la consulta; comprobar sintaxis y versión de PHP.
- Rutas reales `__DIR__ . '/phpmailer/PHPMailer.php'`, `SMTP.php`, `Exception.php` y sus namespaces, respetando la implementación existente.
- Configuración privada SMTP: cuenta `sales@redskyg.com`, contraseña disponible en servidor mediante `SMTP_PASSWORD` o el mecanismo privado existente, host/puerto/TLS correctos.
- Destinatario interno `redaviationsistema@gmail.com`; usar cuenta SMTP como From y correo del usuario validado solo como Reply-To.
- Respuestas JSON controladas, incluyendo método no permitido, errores de validación y fallos SMTP, sin credenciales o stack traces.
- Validaciones, límites, antispam y frecuencia en PHP; `success:true` únicamente después de confirmar el envío interno. La confirmación al cliente debe informar su resultado real por separado.

Corregir el HTTP 500 y verificar un POST con destinatario de pruebas o autorización expresa para correo real. No hace falta una contraseña SMTP en Vue para efectuar estos cambios.

## Pruebas y archivos

Creados: `aircraftInquiry.service.js`, `tests/aircraft-inquiry.test.mjs`, esta guía y `docs/aircraft-inquiry.env.example`.

Actualizados: `BuyAircraftForm.vue`, `SellAircraftForm.vue`, `SellAircraftLanding.vue` (solo import de analítica para evitar dependencia Supabase), `aircraftBuyer.service.js` (adaptador PHP), `src/locales/aircraftTrade.js` (confirmaciones/errores ES/EN), `vite.config.js` (proxy) y `tests/aircraft-buyer.test.mjs` (el contrato ya no exige persistencia).

`node --test tests/*.test.mjs`: 28 pruebas aprobadas, incluidas las existentes de vendedores. Se comprueban los mapeos, campos obligatorios, privacidad, formatos, éxito de correo sin ID, confirmación pendiente, HTTP de error, JSON inválido, red/timeout, error SMTP sin revelar detalles y payload real sin campos inventados.

La verificación Chrome usa interceptación del endpoint para éxito, fallo SMTP y error de red. No se envían correos comerciales. Evidencia en `artifacts/aircraft-php-inquiry/verification.json` y capturas locales. Se comprueban doble clic, espera sin éxito prematuro, reintento con datos conservados, ES/EN, payload de cada modalidad, eventos solo tras éxito y ausencia de llamadas Supabase/Turnstile en la landing.
