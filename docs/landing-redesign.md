> Actualización: el contrato público vigente y la integración PHP se describen en [commercial-inquiries.md](commercial-inquiries.md). Las referencias de este documento a validaciones y backend anteriores son históricas.

# Landing Sky Group Aviation

Implementación local en Vue 3. Inicio ES/EN en `/mx` y `/en`. Los cinco accesos llevan en un clic a `/mx/solicitud/{buy|sell|management|maintenance}` (también bajo `/en`) o al cotizador existente `https://redskyg.com/landing/es-mx/reserva`. No se modifica el inventario, las rutas anteriores ni el motor de reservaciones. Las nuevas solicitudes enfocan el primer campo y permiten volver a `#servicios`.

Los formularios existentes de compra y venta se simplificaron, conservando consentimiento, honeypot, validación por campo y eventos de conversión. Compra no exige modelo. Venta no exige año, matrícula, ciudad, precio ni información técnica. El nuevo adaptador `buildInitialInquiryPayload` envía exclusivamente los campos de contacto inicial. Administración y mantenimiento envían `operation: management|maintenance`, `aircraftType`, `service`, `location`, `name`, `email`, `phone`, `privacyAccepted`, `website`, y descripción opcional para mantenimiento. Los errores públicos son genéricos y conservan el borrador.

## Integración pendiente en el hosting

El PHP real y sus credenciales privadas no están en este repositorio. No se ha desplegado ni verificado correo real. **Antes de publicar estos cambios**, integrar `deploy/aircraft-inquiry-validation.php` en el endpoint existente y sustituir sus validaciones obligatorias anteriores por `validateInitialAviationInquiry($input)`. Este módulo acepta las cuatro operaciones y devuelve únicamente sus campos permitidos. No reemplaza PHPMailer ni incluye credenciales. El endpoint debe devolver HTTP 422 con JSON seguro al capturar `InvalidArgumentException`.

Conservar verificaciones de origen, honeypot y frecuencia del endpoint existente. Construir el correo usando solamente los campos devueltos, escapar valores con `htmlspecialchars` si se usa HTML, usar destinatario fijo y correo validado únicamente como Reply-To. Identificar en el asunto las cuatro operaciones. Responder `success: true` solo tras confirmar recepción interna. El módulo de validación por sí solo no implementa envío, control de frecuencia ni comprobación de origen.

El aviso técnico de SMTP pendiente se retiró de la interfaz pública; esto no acredita que el hosting funcione. Para errores se ofrece reintento sin perder datos. Hace falta integrar el módulo y comprobar entrega en el hosting para completar la integración de extremo a extremo.

## Auditoría de integración y correcciones

La implementación inicial dejó `Home.vue` conectado a `/mx` y `/en`, mientras `/compra-venta-aeronaves` y `/en/aircraft-trade` todavía cargaban `SellAircraftLanding.vue`. Se corrigió el registro `aircraftTradePages.trade` para renderizar `Home.vue` en ambas rutas de entrada, sin eliminar las páginas de venta ni el inventario.

También se corrigieron dos errores de los enlaces dinámicos: importar explícitamente `RouterLink` y pasar solamente `to` a ese componente (el atributo `href: undefined` heredado anulaba el enlace). Ahora las cuatro opciones internas son anclas reales y navegan con un clic a `ServiceRequest.vue`; la quinta mantiene el enlace del cotizador existente. Se ajustaron los títulos de servicios solicitados, el contraste de encabezados frente a estilos globales y el enlace del logo para conservar el idioma.

La auditoría de navegador utiliza Chrome local con Playwright ya disponible en el equipo. Evidencia en `artifacts/landing-audit/`: capturas ES/EN de escritorio (1440 px) y móvil (390 y 360 px), formularios, script reproducible `audit.mjs` y resultados `results.json`. Verifica título exacto, cinco enlaces reales, ausencia de formulario inicial, navegación a cuatro formularios, enfoque del primer campo, regreso al selector, cambio ES/EN y ausencia de desbordamiento horizontal o excepciones de navegador. La auditoría no envía solicitudes ni correos reales.

URL local de esta sesión: `http://127.0.0.1:5174/compra-venta-aeronaves`; inglés: `http://127.0.0.1:5174/en/aircraft-trade`. También funcionan `/mx` y `/en` en ese mismo servidor. Rutas públicas previstas al desplegar: `https://redskyg.com/compra-venta-aeronaves` y `https://redskyg.com/en/aircraft-trade`. Estos cambios son locales; no se ha desplegado al hosting. La integración PHP y la entrega real descritas arriba siguen pendientes.

Comprobación adicional: un clic real en «Cotizar un vuelo privado» abrió `https://redskyg.com/landing/es-mx/reserva` en Chrome, con título «Cotiza tu Vuelo Privado | Sky Group Aviation» y formularios de reserva presentes. Evidencia: `flight-quote.json` y `flight-quote.png`. No se enviaron reservas ni se probaron cálculos, tarifas o recepción de solicitudes. El enlace conserva el cotizador existente en español, que incluye su propio selector ES/EN.
