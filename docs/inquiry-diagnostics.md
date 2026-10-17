# Diagnóstico de solicitudes en desarrollo

Los logs usan `[SKY GROUP][AIRCRAFT INQUIRY]` y están habilitados únicamente con `import.meta.env.DEV === true`. No se habilitan mediante parámetros URL ni datos del formulario. No se imprime payload ni respuestas PHP completas sin filtrar.

## Archivos

- `src/features/aircraft-sales/services/aircraftInquiry.service.js`: inicio y fin, endpoint resuelto, POST, operación permitida, HTTP, duración, JSON/HTML, Retry-After, red y bloqueo de solicitudes simultáneas.
- `src/features/aircraft-sales/services/inquiryDiagnostics.js`: catálogo de campos/códigos seguros y clasificación de causa basada en evidencia.
- `src/components/aircraft-sales/CommercialRequestForm.vue`: aviso si un intento se bloquea por envío en curso o recepción ya confirmada. ServiceRequest.vue reutiliza este componente y no necesita duplicar los logs.

## Uso en Chrome

Con Vite en desarrollo, abrir DevTools → Console y filtrar por `[SKY GROUP][AIRCRAFT INQUIRY]`. Enviar una sola solicitud y revisar:

1. **Inicio de solicitud**: URL resuelta y método POST. Query, fragmento y credenciales de la URL se omiten si existen para no exponer tokens. La ruta real del endpoint configurado se conserva.
2. **Respuesta HTTP**: status, tiempo hasta respuesta, tipo de contenido normalizado y Retry-After para 429.
3. **Respuesta PHP (campos seguros)**: copia filtrada de success/received/stored, estados de correo, código PHP y errores de validación permitidos. Un message solo se imprime si coincide con el catálogo seguro existente; cualquier texto desconocido se marca como oculto. Nunca se imprime raw HTML, IDs, correo, nombre, teléfono, comentarios, tokens, contraseña ni objetos de error arbitrarios.
4. **Fin de solicitud**: tiempo total, incluido el procesamiento del cuerpo. No hay reintentos automáticos.

### Interpretación

- **503 + configuration**: PHP indicó un problema de configuración privada o directorio de estado. Revisar bootstrap, variables SMTP/secret/origins, permisos y logs privados.
- **503 + storage**: PHP indicó almacenamiento de control no disponible.
- **503 + delivery_failed**: el correo comercial fue rechazado o no llegó a iniciarse; revisar PHPMailer/SMTP en servidor. Este código también puede englobar preparación de PDF u otros requisitos previos del emisor; la consola no identifica por sí sola el fallo interno exacto.
- **503 + unavailable**: receptor/arranque/dependencias no disponibles; consultar el log PHP.
- **503 sin código reconocido o con HTML**: puede ser servidor o proxy; no se atribuye automáticamente a PHP ni a SMTP.
- **429 + rate_limit**: PHP confirmó su límite de frecuencia. Retry-After indica la espera si el emisor lo envía. Si falta se muestra «No informado», sin inventar segundos. Este cambio no modifica límites ni añade headers al PHP.
- **429 sin rate_limit**: límite HTTP cuyo emisor exacto no puede determinarse.
- **422**: revisar los campos y códigos de validación permitidos.
- **Error sin respuesta HTTP**: red, timeout, CORS o proxy; el navegador no aporta evidencia suficiente para elegir una causa concreta.

Durante desarrollo, Vite proxya `/aircraft-inquiry.php` al receptor de cPanel por defecto; Vite no ejecuta PHP. Para revisar causas internas, consultar el log privado de PHP/cPanel sin compartir secretos. Los logs no declaran éxito de correo por recibir HTTP 200: el formulario mantiene su comprobación del contrato confirmado.

## Verificación

Build correcto y 63 pruebas automatizadas aprobadas, incluyendo filtrado de secretos, logs desactivados, clasificación, URL segura, Retry-After y bloqueo de solicitudes concurrentes con liberación tras error. Chrome comprobó los logs DEV mediante fixtures inyectados de 503/429/422/HTML/red/concurrencia: no se envió POST a producción. Evidencia en `artifacts/inquiry-diagnostics/browser-logs.json`.

No se alteraron diseño, reglas de validación, cotizador, antispam ni rate limiting. No se publicó.
