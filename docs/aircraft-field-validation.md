# Validaciones de compra y venta

Los formularios validan todos los campos antes del POST, con mensajes individuales ES/EN, borde discreto, `aria-invalid` y `aria-describedby`. Se valida al salir de un campo y al enviar. Los errores ya visibles se recalculan al editar, sin borrar ni filtrar la captura. El primer campo inválido en orden visual recibe scroll suave y foco. No se depende de las alertas nativas del navegador.

Fabricante ahora es una entrada de texto, sin restringirlo al catálogo previo. Modelos aceptan números y símbolos como `Citation XLS+`, `SA226-T(B)` y diagonales. Matrículas internacionales admiten letras, números y guiones, entre 2 y 20 caracteres. Series admiten letras, números, espacios, guiones, diagonales y símbolos habituales. Nombre y país aceptan letras Unicode, acentos, espacios, apóstrofes y guiones; ciudad, empresa y comentarios conservan texto comercial libre con límites de longitud. El teléfono requiere exactamente 10 dígitos, sin prefijo internacional; admite espacios, paréntesis y guiones y se normaliza a los 10 dígitos para el envío. No se limita el país a México.

Años: cuatro dígitos entre 1903 y el año actual más uno; el de compra sigue siendo opcional. Horas: decimales no negativos. Ciclos: enteros no negativos. Horas y ciclos siguen siendo opcionales. Precio: positivo cuando se desmarca «Precio por definir»; si está marcado se envía `null`, ignorando valores anteriores. Los controles numéricos son texto con teclado decimal/numeric. Se acepta punto o coma decimal y se normaliza únicamente para el payload, sin separadores de miles ambiguos, exponentes o hexadecimal. No se cambian los valores escritos. Límites numéricos: 1e12. Los campos de texto conservan límites de 160 caracteres, matrícula 20 y comentarios 4000. Se rechazan caracteres de control. No se devuelven campos administrativos ajenos al formulario.

Privacidad usa el booleano reactivo existente; marcarla elimina inmediatamente el error y el JSON lleva `privacyAccepted: true`. Los campos opcionales vacíos no bloquean compra. Los selectores conservan sus valores actuales. No se modifican header, hero, modalidades, distribución, footer, endpoint ni PHPMailer.

## Coordinación con PHP pendiente

El PHP del hosting no está en este repositorio: **no se pudo comprobar su contrato real ni modificar sus validaciones**. Se conserva el contrato JSON existente de `aircraftInquiry.service.js`, `operation: buy/sell`, `privacyAccepted` y `/aircraft-inquiry.php`. Compra mantiene fabricante/modelo combinados en `model`, sin inventar un fabricante separado. Las pruebas verifican exactamente ese mapeo, no la compatibilidad del PHP privado.

Antes de considerar resuelto un HTTP 422 del servidor, revisar su código con estas reglas:

- Fabricante libre, modelos con símbolos, serie alfanumérica y matrículas internacionales.
- Año, matrícula, empresa y comentarios opcionales en compra según el formulario; presupuesto «Por definir» válido.
- Horas/ciclos opcionales, horas decimales; precio `null` cuando está por definir.
- Teléfono de exactamente 10 dígitos, sin exigir prefijo internacional; Vue envía solo los dígitos.
- `privacyAccepted` debe leerse como booleano JSON, sin compararlo únicamente con cadenas `"true"`, `"1"` o un nombre anterior.
- Mantener validaciones independientes en servidor, antispam, límites, escapes HTML al generar correos, consultas parametrizadas donde proceda y protección de cabeceras de correo.
- Si se devuelven errores por campo, acordar sus claves antes de añadir su mapeo en Vue. No inferir que HTTP 422 significa que falta privacidad cuando Vue ya la validó.

El mensaje general anterior de HTTP 422 se sustituyó por un aviso de rechazo del servidor sin atribuir falsamente el problema a privacidad. Los errores locales sí se muestran en el campo correspondiente. El fallo HTTP 500 previamente comprobado en hosting es independiente de estos cambios; no se afirma haberlo reparado.

## Verificación

`node --test tests/*.test.mjs`: 36 pruebas, incluidos todos los ejemplos solicitados y casos inválidos, normalización, obligatoriedad, privacidad, rechazo de campos administrativos, foco y actualización reactiva. Los servicios PHP se prueban con fetch simulado; no se envían solicitudes comerciales reales. La prueba anterior que exigía fabricante de catálogo se actualizó para validar un selector real; fabricante ahora admite texto.

`npm run build`: compilación de producción. Prueba adicional en Chrome con endpoint interceptado: `artifacts/aircraft-php-inquiry/field-validation.json`.
