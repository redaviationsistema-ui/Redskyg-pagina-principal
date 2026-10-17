> Actualización: este flujo ahora es **sin PDF**. Consultar [local-503-diagnosis.md](local-503-diagnosis.md) para los códigos 503/502 y la configuración SMTP local vigente. Las referencias a Dompdf/PDF siguientes son históricas.

# Integración vigente Vue 3 + PHP — Sky Group LLC

## Resultado y auditoría

Se reutilizan los formularios y el endpoint **`/aircraft-inquiry.php`**, con guion; no se crea un endpoint con guion bajo. Vite sirve Vue y **no ejecuta PHP**. El frontend usa el receptor existente de cPanel; durante desarrollo Vite proxya esa ruta a `https://redskyg.com` por defecto. El PHP instalado en cPanel no está versionado en este repositorio.

El directorio `server/php` conserva una implementación local previa y su contrato. No se debe asumir que esa copia coincide con el PHP de cPanel. El lanzador local de PHP se retiró; la ruta de desarrollo actual usa el proxy de Vite.

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

Ejecuta `npm run dev -- --host 127.0.0.1 --port 5174 --strictPort`. Vite dirige `/aircraft-inquiry.php` al receptor de cPanel por defecto. No hay un servidor PHP local gestionado por el proyecto ni un proceso asociado al puerto 8085. `SKY_PHP_DEV_TARGET` solo sirve para apuntar manualmente a un endpoint de pruebas que se haya iniciado por separado; no se configura en el ejemplo de entorno.

No incluyas credenciales SMTP en variables `VITE_`. Las variables PHP del ejemplo describen la configuración privada del receptor; el frontend no las lee.

## Rutas locales

- Inicio original: http://127.0.0.1:5174/mx y http://127.0.0.1:5174/en.
- Landing premium: http://127.0.0.1:5174/vender-aeronave.
- Compra: http://127.0.0.1:5174/mx/solicitud/buy.
- Venta: http://127.0.0.1:5174/mx/solicitud/sell.
- Administración: http://127.0.0.1:5174/mx/solicitud/management.
- Técnico: http://127.0.0.1:5174/mx/solicitud/maintenance.
- Formularios ingleses: sustituir `/mx/` por `/en/`; landing inglesa `/en/sell-aircraft`.

## Validación y límites de lo comprobado

Los resultados de integración local que siguen son históricos: pertenecen al backend local anterior y no verifican el PHP actual de cPanel. El servidor local y las pruebas dedicadas de transporte SMTP se retiraron.

- Build y pruebas existentes, más contrato JS/PHP y SMTP TLS **local aislado**.
- La prueba SMTP ejecuta el PHP real por HTTP, genera el PDF con Dompdf y envía el comercial y acuse a un servidor TLS de pruebas que solo captura mensajes localmente. Comprueba PDF válido, folio, rechazo comercial, reintento, fallo del acuse y ausencia de reenvío duplicado.
- Navegador (histórico): `artifacts/php-integration/verify.mjs` probó Vite → PHP local (405 GET y 503 POST sin SMTP), además de respuestas simuladas en formularios e idiomas. No verifica el receptor actual de cPanel.
- No se hicieron cambios en el cotizador ni se enviaron reservas.

## Pendientes antes de producción

Comparar con el archivo PHP real del hosting, configurar PHPMailer y Dompdf privados con versiones bloqueadas por Composer, directorio 0700 fuera de public_html, secreto estable, TLS, From y destinatario fijo. Revisar límites de ejecución PHP/SMTP y almacenamiento compartido si hay múltiples servidores. Coordinar el contrato frontend/backend y la versión de privacidad. Probar recepción comercial/PDF y acuse en una bandeja autorizada, además de sus fallos, antes de afirmar funcionamiento en producción.

El frontend usa timeout de 60 segundos; cada envío SMTP tiene timeout de 20 y límite de 25. El hosting debe permitir completar o reconciliar ambos envíos. Un resultado ambiguo exige revisión, no borrar marcadores ni generar reintentos a ciegas.

**Todo permanece en local. No se publicó. No está acreditada la recepción de correo en producción.**

Resultado de esta sesión: `npm run build` correcto, 58 pruebas Node aprobadas, 37 comprobaciones PHP aprobadas y 16 escenarios Chrome ES/EN escritorio/móvil aprobados, con respuestas de entrega simuladas en navegador y transporte real exclusivamente hacia SMTP TLS local de pruebas. `git diff --check` sin errores. `Home.vue` continúa idéntico a la versión original de Git.
