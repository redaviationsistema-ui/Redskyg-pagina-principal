# Diagnóstico del PHP local y corrección de errores

## Proceso inspeccionado

`lsof` identificó PHP PID 57725 en 127.0.0.1:8085. `ps` mostró:

`php -S 127.0.0.1:8085 -t /Users/redaviation/Documents/SKYGRUP/PAGINAS/WebPrincipal/Redskyg-pagina-principal/public`

CWD: `/Users/redaviation/Documents/SKYGRUP/PAGINAS/WebPrincipal/Redskyg-pagina-principal`. No usa router PHP adicional. El archivo servido es `/Users/redaviation/Documents/SKYGRUP/PAGINAS/WebPrincipal/Redskyg-pagina-principal/public/aircraft-inquiry.php`, que carga `server/php/bootstrap.php` y `CommercialInquiry.php`.

Vite apunta por defecto a `http://127.0.0.1:8085`. No se modificó hacia producción. El proceso no se reinició ni se limpiaron límites activos. PHP 8.5.5; PHPMailer disponible y mbstring activa. El código local es un receptor SMTP real, no un simulador de éxito.

## Causa del fallo original

El guard de `CommercialInquiry::smtpSender` encontraba configuración SMTP ausente antes de crear PHPMailer o abrir una conexión. Lanzaba DeliveryFailure, y el manejador la devolvía genéricamente como `503 delivery_failed`. No hay evidencia de fallo de autenticación: no se alcanzaba la autenticación SMTP. La ausencia de variables se comprobó sin imprimir sus valores; no se encontraron asignaciones SMTP en `.env`.

Los logs del proceso confirmaron repetidos delivery_failure, seguidos de rate_limit (429). El último POST de comprobación al proceso habitual respondió 429; se conservó el límite. El nuevo comportamiento de 503 se verificó con HTTP real en un proceso PHP aislado sin configuración SMTP, no con éxito simulado.

## Correcciones

- `CommercialInquiry.php`: configuración ausente/inválida y PHPMailer ausente => 503; rechazo o fallo de entrega conocido => 502. Resultado ambiguo => 409 conservando revisión/idempotencia.
- Logs privados diferenciados: smtp_configuration_missing (solo nombres de claves), smtp_configuration_invalid, phpmailer_missing, smtp_connection, smtp_authentication, smtp_delivery, confirmation_failure. Sin secretos, ErrorInfo completo, datos de contacto ni respuestas SMTP arbitrarias.
- `bootstrap.php` y `public/aircraft-inquiry.php`: diferencian dependencias/PHPMailer/bootstrap ausentes en logs seguros.
- Se retiraron generación y adjunto de PDF, método Dompdf y dependencia Composer. Este flujo funciona sin documentos. Se mantienen folio, correo comercial y acuse independiente al cliente.
- `dev-server.mjs`: puede cargar `.env.php.local` privado antes de iniciar PHP, o una ruta local mediante SKY_PHP_ENV_FILE. Informa solo los nombres de variables SMTP faltantes. Las variables del entorno tienen prioridad.
- `.env.php.local.example`: plantilla sin credenciales; `.env.php.local` está ignorado por Git.

Los errores reales no se convierten en éxitos. No se alteraron diseño, formularios, teléfonos, países, rutas, validaciones, cotizador ni inventario. No se desactivó antispam.

## Activación pendiente

Copiar `.env.php.local.example` a `.env.php.local` y completar host, usuario, contraseña, puerto, cifrado, From y destinatario **de pruebas**. No escribir secretos en VITE_, repositorio ni chat. Después reiniciar únicamente el servidor PHP de este proyecto con `npm run dev:php`, una vez configurado. No se reinició automáticamente ni se crearon credenciales ficticias.

Antes de un envío a una bandeja real hace falta autorización y configuración válida. No se declaró resuelto el envío real: actualmente falta SMTP privado. El archivo no existe con credenciales aportadas por esta sesión.

## Pruebas

Build correcto, 63 pruebas Node y 39 comprobaciones PHP. El test HTTP/SMTP utiliza PHPMailer real con un servidor TLS local aislado sin reenviar a internet: confirma 200, folio, ausencia de PDF, acuse al cliente, 502 de entrega rechazada y reintento sin duplicados. Otro proceso HTTP sin SMTP confirma 503 configuration y cero mensajes adicionales. Pruebas PHP cubren también 400 JSON inválido, 422, 413, 405 y 429. Sintaxis PHP y git diff --check correctos.

Todo permanece local. No se publicó ni se enviaron correos reales.
