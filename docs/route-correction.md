# Separación de la página principal y la landing premium

`src/views/Home.vue` se recuperó únicamente desde la versión de Git anterior al rediseño (`HEAD`, último cambio de esa vista: a4a0fc1). Su contenido coincide byte por byte con esa versión; no se ejecutó reset general ni se descartaron otros cambios locales. Se restauraron también los metadatos SEO originales de la ruta Home y su uso de AppHeader/AppFooter.

Asignaciones:

- `/mx` y `/en`: Home.vue original, idioma determinado por el mercado.
- `/vender-aeronave` y `/en/sell-aircraft`: AircraftTradeLanding.vue, que conserva íntegro el diseño premium previamente alojado en Home.vue.
- `/compra-venta-aeronaves`: redirección a `/vender-aeronave`.
- `/en/aircraft-trade`: redirección a `/en/sell-aircraft`.

Las redirecciones preservan query y hash. Los nombres de rutas heredados siguen registrados. Los formularios permanecen en `/{mx|en}/solicitud/{buy|sell|management|maintenance}`, sin duplicar componentes, validadores o endpoints. Sus enlaces de regreso y confirmación apuntan a la landing premium del idioma correspondiente con `#servicios`. El logo de la cabecera continúa enlazando al inicio corporativo.

Archivos de implementación modificados en esta corrección: Home.vue, nuevo AircraftTradeLanding.vue, router/index.js, layouts/MainLayout.vue, views/ServiceRequest.vue y components/aircraft-sales/CommercialRequestForm.vue. No se modificó PHP, cotizador, tarifas ni inventario.

Servidor local: http://127.0.0.1:5174. Ruta pública prevista de la landing: https://redskyg.com/vender-aeronave. Cambios únicamente locales; no se publicó.

Verificación: build, 58 pruebas Node y 37 comprobaciones PHP aprobadas. Auditoría Chrome en escritorio y móvil, inicio original ES/EN, landing premium ES/EN, redirecciones, formularios y borradores, regreso a servicios, idioma y enlace real al cotizador sin enviar reservas. Capturas reales y resultados en artifacts/route-correction/.
