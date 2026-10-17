# Registro histórico: configuración SMTP del servidor PHP local

Este documento registra una configuración y pruebas anteriores del backend local. El lanzador `server/php/dev-server.mjs` y el comando `npm run dev:php` se retiraron; las referencias a `.env.php.local`, PID y puerto 8085 no describen el flujo vigente Vue → PHP de cPanel.

Se verificaron los archivos reales: .env.php.local, dev-server.mjs, bootstrap.php, CommercialInquiry.php, public/aircraft-inquiry.php, package.json y vite.config.js. No se modificó Vue, formularios, validaciones, diseño ni rutas.

## Valores configurados

- SMTP_HOST: mail.redskyg.com.
- SMTP_PORT: 465.
- SMTP_ENCRYPTION: ssl (TLS implícito, equivalente a SSL/TLS del panel de correo).
- SMTP_USERNAME: sales@redskyg.com.
- SMTP_FROM: sales@redskyg.com.
- SKY_INQUIRY_RECIPIENT: sales@redskyg.com, conforme a la instrucción actual.
- SMTP_PASSWORD: vacío, pendiente del administrador. No se introdujo un marcador como contraseña.

Sky Group LLC es el nombre visible del remitente y está definido en PHPMailer; no es una octava variable de este contrato. La existencia y autorización de la cuenta no se han acreditado mediante autenticación: requiere la contraseña vigente y una prueba autorizada.

El host de referencia respondió en 465 con certificado TLS válido y saludo SMTP 220 (TLSv1.2). Fue únicamente conexión/handshake y lectura del saludo, sin AUTH, MAIL FROM, RCPT TO ni DATA; no se enviaron correos reales.

## Archivo y carga

.env.php.local queda fuera de public/, excluido de Git y con permisos 0600. El lanzador npm run dev:php carga ese archivo antes de construir el entorno del hijo PHP; las variables ya presentes en el entorno tienen prioridad. No hubo que cambiar el mecanismo de carga. Se agregó rechazo seguro de marcadores conocidos de configuración en CommercialInquiry.php, sin imprimir valores.

Se identificó y detuvo exclusivamente el padre node server/php/dev-server.mjs del servidor PHP de este proyecto. Se reinició con npm run dev:php; el nuevo hijo PHP PID observado fue 59874. La presencia de seis variables y la ausencia de SMTP_PASSWORD se comprobó en el entorno real del hijo sin imprimir secretos. No se detuvo Vite ni otros servicios. El único mensaje de variable pendiente al arrancar fue SMTP_PASSWORD.

El destino Vite permanece en 127.0.0.1:8085. POST controlado a través de http://localhost:5173/aircraft-inquiry.php devolvió 503 configuration, received:false. Es el resultado correcto mientras falta la contraseña; no se ha declarado resuelto el envío real.

## Pruebas

Sintaxis PHP, build y pruebas completas ejecutadas. Test nuevo tests/php-env-loading.test.mjs: crea configuración privada temporal de pruebas, inicia el lanzador real, verifica que PHP carga los siete campos y recibe 502 delivery_failed por un puerto SMTP local sin servicio, no 503 de configuración. No hace conexiones SMTP remotas.

El test commercial-smtp.test.mjs verifica PHPMailer con receptor TLS local: 200 cuando acepta el correo, 502 cuando rechaza y 503 sin configuración, además de duplicados, folio y acuse al cliente. No usa PDF ni Dompdf. No envía correo a internet.

## Pendiente único de credenciales

Completar SMTP_PASSWORD en .env.php.local con la contraseña SMTP vigente de sales@redskyg.com, sin compartirla en chat, después reiniciar npm run dev:php. Antes de una prueba real se requiere autorización expresa. No es posible confirmar credenciales correctas ni eliminar legítimamente el 503 actual sin ese valor; tampoco es correcto sustituirlo por un 200 simulado.

Cambios de esta sesión: .env.php.local (privado), server/php/CommercialInquiry.php (rechazo de marcadores), tests/php-env-loading.test.mjs y este reporte. No se publicó.
