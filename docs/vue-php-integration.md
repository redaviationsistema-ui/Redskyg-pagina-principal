> Actualización: este flujo ahora es **sin PDF**. Consultar [local-503-diagnosis.md](local-503-diagnosis.md) para los códigos 503/502 y la configuración SMTP local vigente. Las referencias a Dompdf/PDF siguientes son históricas.

# Integración vigente Vue 3 + PHP — Sky Group LLC

## Resultado y auditoría

Se reutilizan los formularios y el endpoint **`/aircraft-inquiry.php`**, con guion; no se crea un endpoint con guion bajo. Vite sirve Vue y **no ejecuta PHP**. La configuración anterior enviaba POST al hosting real y se sustituyó por proxy a PHP local. No se probó ni modificó el hosting de producción.

La copia de receptor disponible en este repositorio no tenía Dompdf, PDF interno, folio ni confirmación al cliente. Se implementaron sobre esa copia, sin sustituir un archivo remoto desconocido. Antes de publicar hay que comparar el receptor local con el PHP real del hosting y conservar sus convenciones o integraciones adicionales.

No se modificaron Home.vue, AircraftTradeLanding.vue, el diseño, el router, el inventario ni el cotizador en este ajuste.

## Contrato

- Compra: `operation: "buy"`.
- Venta: `operation: "sell"`.
- Administración: `operation: "aircraft_management"`.
- Técnico: `operation: "technical_service"`.

Contrato de campos compartido: `server/php/commercial-contract.json`. Compra envía aircraftType, model opcional, country libre (2–80), name (2–100), email (hasta 254), phone nacional mexicano de diez dígitos, comments opcionales (hasta 1000), privacyAccepted booleano. Venta añade manufacturer, model requerido y year opcional. No se exigen ni envían matrícula, ciudad, serie, horas, ciclos, precio o documentos.

Los cuatro formularios también envían requestId (UUID), privacyVersion, locale y honeypot website. Se mantienen obligatorios para el receptor local, de modo que idempotencia y versión de consentimiento no dependan de valores inventados en el servidor. Si el hosting usa otro recibo JSON, debe adaptarse tras inspeccionar su contrato; no se acepta `success:true` aislado como prueba de recepción del nuevo receptor.

Teléfono se normaliza en input, paste y antes de validar el envío; el estado nunca conserva letras ni más de diez dígitos. PHP valida estrictamente sin normalizar entradas adulteradas. Los mensajes se muestran al blur o después de un intento de envío, con foco al primer campo inválido. Borradores y resultados se conservan en memoria al cambiar idioma o volver al selector; se eliminan al recargar/cerrar la pestaña.

## Flujo de recepción

1. Validación estricta POST/JSON, tamaño, campos, consentimiento, honeypot, origen y frecuencia.
2. Bloqueo por UUID y huella HMAC. Un duplicado confirmado devuelve el mismo recibo sin enviar otro mensaje.
3. Folio estable `SKY-` seguido del UUID sin guiones en mayúsculas.
4. Dompdf genera PDF interno en memoria con los campos escapados; recursos remotos, PHP y JavaScript desactivados. No se crea enlace público al PDF.
5. PHPMailer envía correo comercial con PDF al destinatario interno fijo de entorno. El contacto solo se usa como Reply-To en ese mensaje.
6. Se marca recepción confirmada **antes** de intentar el acuse al cliente. Ese acuse se envía solamente a su email validado, sin PDF interno, en ES/EN.
7. Si el acuse falla, el frontend informa recepción confirmada y fallo de confirmación; no vuelve a enviar el correo comercial. Un reintento con el mismo UUID devuelve ese estado.

El receptor no persiste el contenido completo del lead (`stored:false`): la recepción se respalda en el correo comercial aceptado por SMTP. Sí conserva marcadores mínimos privados de idempotencia, operación, fecha, folio, consentimiento y estado del acuse. Un fallo del correo comercial devuelve error recuperable; una aceptación ambigua posterior a DATA queda bloqueada para revisión antes de volver a enviar. Una caída después del correo comercial y antes de registrar el acuse devuelve estado `unknown` en el reintento, nunca un acuse ficticio. No se garantiza entrega en la bandeja final por el mero hecho de que SMTP acepte un mensaje.

Respuesta confirmada: `success:true, received:true, stored:false, delivery:"sent", requestId, folio, clientConfirmation:"sent"|"failed"|"unknown"|"not_configured"`. Los errores 422 solo muestran campos/códigos permitidos, nunca diagnósticos internos arbitrarios. 500/502/503 conservan el borrador y permiten reintentar el mismo UUID. Folio y estado se validan también en el adaptador JS.

## Desarrollo local

1. `composer install --working-dir=server/php`.
2. `npm run dev:php` inicia PHP en **127.0.0.1:8085**. No usa credenciales ni destinatarios de producción por defecto; crea estado privado temporal y falla con 503 cuando SMTP no está configurado.
3. `npm run dev -- --host 127.0.0.1 --port 5174 --strictPort` inicia Vue. Vite dirige exclusivamente `/aircraft-inquiry.php` al PHP local.
4. `SKY_PHP_DEV_TARGET` puede señalar otro puerto local; rechaza destinos remotos. No se falsifica Origin como dominio de producción.

La configuración SMTP debe cargarse en el entorno del proceso PHP, no con variables VITE_. El lanzador no lee secretos desde el frontend ni imprime sus valores. Conservar los archivos de estado privados y el secreto al reiniciar durante una sesión de pruebas si se necesita mantener la idempotencia entre reinicios. Las variables de `docs/commercial-inquiry.env.example` documentan la configuración del hosting.

## Rutas locales

- Inicio original: http://127.0.0.1:5174/mx y http://127.0.0.1:5174/en.
- Landing premium: http://127.0.0.1:5174/vender-aeronave.
- Compra: http://127.0.0.1:5174/mx/solicitud/buy.
- Venta: http://127.0.0.1:5174/mx/solicitud/sell.
- Administración: http://127.0.0.1:5174/mx/solicitud/management.
- Técnico: http://127.0.0.1:5174/mx/solicitud/maintenance.
- Formularios ingleses: sustituir `/mx/` por `/en/`; landing inglesa `/en/sell-aircraft`.

## Validación y límites de lo comprobado

- Build y pruebas existentes, más contrato JS/PHP y SMTP TLS **local aislado**.
- La prueba SMTP ejecuta el PHP real por HTTP, genera el PDF con Dompdf y envía el comercial y acuse a un servidor TLS de pruebas que solo captura mensajes localmente. Comprueba PDF válido, folio, rechazo comercial, reintento, fallo del acuse y ausencia de reenvío duplicado.
- Navegador: `artifacts/php-integration/verify.mjs` prueba Vite → PHP local real (405 GET y 503 POST cuando no hay SMTP), además de respuestas simuladas 422/500/502/503 y éxitos con acuse fallido en cuatro formularios, dos idiomas y dos tamaños. No envía al hosting.
- No se hicieron cambios en el cotizador ni se enviaron reservas.

## Pendientes antes de producción

Comparar con el archivo PHP real del hosting, configurar PHPMailer y Dompdf privados con versiones bloqueadas por Composer, directorio 0700 fuera de public_html, secreto estable, TLS, From y destinatario fijo. Revisar límites de ejecución PHP/SMTP y almacenamiento compartido si hay múltiples servidores. Coordinar el contrato frontend/backend y la versión de privacidad. Probar recepción comercial/PDF y acuse en una bandeja autorizada, además de sus fallos, antes de afirmar funcionamiento en producción.

El frontend usa timeout de 60 segundos; cada envío SMTP tiene timeout de 20 y límite de 25. El hosting debe permitir completar o reconciliar ambos envíos. Un resultado ambiguo exige revisión, no borrar marcadores ni generar reintentos a ciegas.

**Todo permanece en local. No se publicó. No está acreditada la recepción de correo en producción.**

Resultado de esta sesión: `npm run build` correcto, 58 pruebas Node aprobadas, 37 comprobaciones PHP aprobadas y 16 escenarios Chrome ES/EN escritorio/móvil aprobados, con respuestas de entrega simuladas en navegador y transporte real exclusivamente hacia SMTP TLS local de pruebas. `git diff --check` sin errores. `Home.vue` continúa idéntico a la versión original de Git.
