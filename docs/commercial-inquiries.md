> **Contrato actualizado:** consultar [vue-php-integration.md](vue-php-integration.md). Compra/venta ahora usan buy/sell; el receptor local incorpora folio, PDF interno y acuse independiente. Las descripciones anteriores del correo y las operaciones en este documento son históricas.

# Solicitudes comerciales — contrato vigente

Este documento sustituye las instrucciones anteriores para los cuatro formularios públicos. No modifica el inventario ni el cotizador. La implementación anterior no incluía el PHP real del hosting; se agregó un receptor completo en **la misma ruta** `/aircraft-inquiry.php`. No está publicado ni verificado contra el SMTP de producción.

## Arquitectura y alcance

- `Home.vue`: dos secciones, cinco paneles fotográficos con composición panorámica 7+5 / 12 / 6+6, animaciones y selección recordada. ES/EN y rutas existentes conservadas.
- `ServiceRequest.vue`: formulario dedicado y centrado; encabezados contextuales, regreso y entrada de 300 ms.
- `CommercialRequestForm.vue`: una implementación reutilizada por BuyAircraftForm, SellAircraftForm y AviationServiceForm. No pregunta nuevamente qué categoría de servicio desea el usuario. Administración y técnico sí piden el alcance específico de la atención.
- `commercialSchema.js` y `server/php/CommercialInquiry.php`: validación a partir del mismo `server/php/commercial-contract.json`. La validación antigua de los flujos administrativos conserva su contrato y sus pruebas, pero ya no valida estos formularios públicos.
- `commercialDrafts.js`: borradores en memoria durante la sesión de la aplicación, separados por servicio. Se conservan al volver y al cambiar idioma; no se usa localStorage, sessionStorage ni cookies. Recargar/cerrar la pestaña elimina estos borradores. Durante un envío, el estado compartido evita enviar de nuevo incluso al cambiar de ruta.

No se agregaron secciones comerciales, servicios, formularios de vuelo, rutas de inventario ni endpoints alternativos. `/mx` y `/en` ya apuntaban a Home; no se sustituyeron otras vistas.

## Campos y validación

Operaciones permitidas: `buying`, `selling`, `aircraft_management`, `technical_service`. Todos los formularios exigen tipo, nombre de 2–100 caracteres, email de hasta 254, teléfono válido y país del catálogo, además de consentimiento estricto. País de ubicación es texto libre obligatorio de 2–80 caracteres, recortado al enviar, con letras Unicode y puntuación geográfica. El teléfono de estos cuatro formularios está destinado exclusivamente a números nacionales mexicanos: diez dígitos ASCII, sin prefijos. La ubicación de la aeronave no determina la nacionalidad del número de contacto. La interfaz elimina caracteres no numéricos y limita a diez dígitos conservando el cursor; el backend rechaza cualquier valor que no contenga exactamente diez dígitos. No se afirma titularidad ni actividad de la línea.

Compra: modelo opcional de hasta 120 caracteres. Venta: fabricante de 2–80 y modelo de 2–100; año opcional entre 1903 y el año actual. Administración/técnico: modelo opcional de hasta 120 y servicio requerido de texto libre obligatorio de 3–120 caracteres, sin controles ni etiquetas HTML. Comentarios de hasta 1000 para las cuatro operaciones. No se solicitan ni envían matrículas, números de serie, horas, ciclos, precios ni documentos.

El campo de servicio requerido describe la necesidad del usuario; no constituye una oferta ni una autorización para realizar trabajos. El identificador principal permanece fijo en operation y no se toma de ese texto libre. El formulario técnico mantiene su aclaración de alcance.

Validación al blur, corrección de errores al editar, foco en el primer campo inválido, aria-invalid/aria-describedby y mensajes ES/EN. Los errores no eliminan los datos. Se muestran estados validando/enviando/éxito/error y spinner; el botón bloquea doble envío. El éxito exige respuesta confirmada con el mismo requestId.

## Receptor y correo

`public/aircraft-inquiry.php` carga el código privado mediante `SKY_INQUIRY_BOOTSTRAP` o `../server/php/bootstrap.php`. Requiere PHP 8.1+, mbstring, OpenSSL, Composer con PHPMailer y libphonenumber-for-php. Las versiones están fijadas en `server/php/composer.lock`. Ninguna credencial se incluye en el frontend.

El receptor permite POST JSON, limita el cuerpo a 16 KiB, valida por operación, comprueba origen/referer cuando llegan y rechaza Sec-Fetch-Site cross-site. La protección no depende solo de Origin: también exige Content-Type JSON sin CORS abierto, honeypot, catálogo, límites y control por IP (cinco intentos válidos por 15 minutos). No confía en X-Forwarded-For; si el hosting usa un proxy, configurar correctamente REMOTE_ADDR en el servidor, sin aceptar encabezados arbitrarios.

PHPMailer usa SMTP autenticado con TLS/SSL y validación normal del certificado. Destinatario y From son fijos desde entorno; el correo validado del interesado solo es Reply-To. Plantilla HTML con valores escapados y alternativa de texto. El asunto identifica cada operación. No se envía confirmación automática al cliente ni se afirma que se haya enviado una.

Respuesta de correo confirmado: `success:true, received:true, stored:false, delivery:"sent", requestId`. El endpoint es de recepción por correo y **no guarda el contenido completo de las solicitudes**. Si SMTP rechaza antes de aceptar el mensaje, devuelve error recuperable; conserva el borrador y permite reintentar. Si el envío resulta ambiguo después de DATA o se interrumpe el proceso, el mismo ID queda bloqueado para revisión, evitando reenviarlo a ciegas. El frontend también distingue una futura recepción persistida con email pendiente (`stored:true, delivery:"pending"`); este endpoint no utiliza ese estado ni afirma persistencia de un lead.

## Idempotencia y datos mínimos

El UUID de solicitud se conserva en reintentos del mismo contenido. Los cambios de contenido generan un nuevo UUID. El backend bloquea por archivo, compara la huella HMAC y devuelve el recibo previo sin reenviar si ya hubo éxito. La misma ID con otro contenido produce conflicto. No existe una garantía de entrega exactamente una vez ante todas las fallas de red: los resultados ambiguos requieren revisión.

El directorio de estado debe estar fuera del document root, con permisos 0700; sus archivos usan 0600. Guarda solo HMAC de IP para límites, HMAC del contenido, estado de envío, operación, fecha UTC y versión/aceptación de privacidad. No guarda nombre, email, teléfono ni comentarios. El consentimiento viaja también en el correo con fecha y versión. Los logs registran únicamente categoría de fallo e ID, nunca cuerpo, correo ni credenciales.

Configurar una política operativa de retención para los marcadores y el correo según el tratamiento de datos existente. No purgar estados ambiguos sin revisarlos: eliminarlos habilitaría un reenvío. Los marcadores enviados deben conservarse al menos durante la ventana de reintento adoptada por el equipo. El control por archivos requiere disco compartido si hubiera varios servidores; para varios nodos sin disco compartido debe sustituirse por almacenamiento central antes de desplegar.

## Instalación en hosting, todavía pendiente

1. Verificar y respaldar el PHP y PHPMailer actualmente instalados; no se inspeccionaron ni modificaron desde esta sesión.
2. Ejecutar `composer install --no-dev --working-dir=server/php` en un entorno compatible. Colocar ese directorio completo (incluidos contrato y vendor) fuera de public_html.
3. Colocar el receptor en public_html/aircraft-inquiry.php y configurar SKY_INQUIRY_BOOTSTRAP con la ruta privada.
4. Crear el directorio privado de estado con 0700. Establecer las variables de `commercial-inquiry.env.example` mediante el entorno PHP real del hosting, sin versiones VITE_ ni secretos en Git. Verificar cuenta From y destinatario interno con el responsable del hosting.
5. Publicar el frontend compilado solo cuando el receptor acepte el nuevo contrato. Revisar que los archivos PHP sean ejecutados por PHP y nunca servidos como código estático. Mantener las reescrituras SPA excluyendo archivos existentes como aircraft-inquiry.php.
6. Probar entrega en una bandeja de pruebas apropiada, rechazo SMTP, reintento, duplicados, CORS/origen, JSON, límites y tiempos. Después realizar la verificación de recepción autorizada en el destino real.

No se publicó automáticamente. El proxy de Vite sigue apuntando al hosting existente; las pruebas de navegador interceptan el endpoint para no enviar solicitudes comerciales reales. La prueba SMTP local usa un receptor TLS efímero que captura mensajes de prueba sin reenviarlos a internet.

## Comprobaciones

- `npm run build`.
- `node --test tests/*.test.mjs`: pruebas anteriores más contrato JS/PHP y flujo HTTP/PHPMailer real hacia un SMTP TLS **simulado local**.
- `php tests/commercial-backend.php`: método, tamaño, tipos, validación, orígenes, antispam, rate limit, idempotencia, rechazo, reintento, ambigüedad y escape HTML.
- Navegador: capturas reales y resultados en `artifacts/commercial-inquiries/`, con respuestas de éxito/error **simuladas**, sin enviar correo al hosting.

No se declaró recepción real en producción ni se midieron Core Web Vitals de producción.

Referencias técnicas: [libphonenumber-js](https://github.com/catamphetamine/libphonenumber-js), [libphonenumber para PHP](https://github.com/giggsey/libphonenumber-for-php), [PHPMailer](https://github.com/PHPMailer/PHPMailer).

### Resultado final de la sesión

Compilación de producción correcta; 56 pruebas Node aprobadas y 37 comprobaciones PHP aprobadas. La prueba HTTP/PHPMailer entregó mensajes únicamente al receptor SMTP TLS local de pruebas, comprobando también rechazo y reintento. Chrome verificó diez combinaciones de idioma/tamaño (1440, 1280, 768, 390, 320), cuarenta recorridos hacia formularios, conservación de borradores y selección, consentimiento, errores recuperables, doble clic, ES/EN y movimiento reducido. Capturas y resultados JSON en `artifacts/commercial-inquiries/`.

Una consulta GET sin datos al hosting el 17 de octubre de 2026 devolvió HTTP 405 y Content-Type application/json. Esto verifica el rechazo del método, no el contrato POST, la versión desplegada del receptor ni la entrega SMTP. No se enviaron solicitudes comerciales al hosting.

Composer audit no reportó avisos para las dependencias PHP instaladas. npm audit reportó 15 vulnerabilidades en dependencias existentes del proyecto (1 baja, 2 moderadas y 12 altas); libphonenumber-js no figura entre las dependencias afectadas. Se conserva el reporte en `artifacts/commercial-inquiries/npm-audit.json`. Su actualización requiere una revisión separada de compatibilidad antes de producción; no se aplicó una actualización masiva ajena al alcance.

Estado: implementación y verificación local completadas. No publicado ni declarado listo para producción; pendientes la revisión del receptor real del hosting, configuración privada, compatibilidad del nuevo contrato y recepción autorizada en el destino real.


### Corrección de campos nacionales

Implementada normalización de teléfono al escribir y pegar, con manejo del cursor, maxlength 10, inputmode numeric y validación estricta en estado Vue y PHP. País y servicio requerido son inputs de texto con límites 80 y 120. Mensajes específicos de teléfono vacío/longitud y traducciones ES/EN. Las reglas anteriores de teléfono internacional y catálogo ya no aplican a estos cuatro formularios; no se modificaron los campos del cotizador. Evidencia en artifacts/field-corrections/.
