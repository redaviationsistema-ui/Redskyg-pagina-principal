> Actualización: el contrato público vigente y la integración PHP se describen en [commercial-inquiries.md](commercial-inquiries.md). Las referencias de este documento a validaciones y backend anteriores son históricas.

# Rediseño visual premium

Se conservan las dos secciones de Home.vue, los cinco servicios, sus textos y sus destinos. Las rutas `/compra-venta-aeronaves`, `/en/aircraft-trade`, `/mx` y `/en` continúan usando la misma vista. No se modificaron ServiceRequest.vue, router, formularios, backend, inventario, cotizador ni sus tarifas durante este cambio visual.

Archivos de interfaz: `src/views/Home.vue`, `src/components/LocaleSwitcher.vue`, `src/components/aircraft-sales/AircraftTradeFooter.vue`, `src/App.vue`. En App.vue se conserva la instancia de Home al cambiar ES/EN en `/mx` y `/en`, para evitar reiniciar las animaciones. En las rutas de compra/venta ya se conservaba esa instancia.

Hero: imagen WebP responsive, degradados, entrada de imagen de escala 1.04 a 1, título desde 25px, descripción y CTA escalonados. Parallax de hasta 22px actualizado con requestAnimationFrame solo al desplazar. El CTA desplaza suavemente al selector; con movimiento reducido el desplazamiento es inmediato.

Tarjetas: fotografía, overlay, icono y número, flecha circular. 3+2 en escritorio, dos columnas en tablet y una en móvil. IntersectionObserver revela cada tarjeta una sola vez con 550ms y 70ms de escalonamiento. Hover: elevación de 5px, zoom de 1.04, borde, sombra y flecha. La iluminación sigue el cursor con variables CSS y actualización agrupada por frame; queda desactivada para punteros táctiles y movimiento reducido. Se limpian observer, listeners, temporizadores y frames al desmontar.

Se mantiene el foco visible y la activación por teclado. El selector ES/EN tiene indicador deslizante y el footer mantiene sus enlaces legales con subrayado animado. No se agregaron dependencias.

## Imágenes

Las imágenes se derivan de archivos existentes del proyecto, sin incorporar fotografías de terceros nuevas ni presentarlas como inventario disponible. Nuevos archivos en `public/images/landing/`:

- `hero.webp`, `hero-mobile.webp`, `sell.webp`: `public/images/Home/home1.jpg`.
- `buy.webp`: `public/images/Home/IMG_2992.jpg`.
- `flight.webp`: `public/images/Home/home2.jpg`.
- `management.webp`: `public/images/Service/admin2.jpg`.
- `maintenance.webp`: `public/images/Home/motor2.jpg`.

Las tarjetas cargan sus imágenes con lazy loading; el hero usa fetchpriority high y una variante de 800px para pantallas pequeñas. Se mantienen dimensiones y proporciones para evitar saltos de layout. No se midieron puntuaciones de Core Web Vitals en producción.

## Verificación y entrega

Servidor local: `http://127.0.0.1:5174/compra-venta-aeronaves`. Inglés: `http://127.0.0.1:5174/en/aircraft-trade`.

Las capturas reales de Chrome y el resultado detallado se encuentran en `artifacts/landing-premium/`. Script reproducible local: `verify.mjs`, usando la instalación de Playwright ya disponible y Chrome del equipo. La prueba cubre ES/EN en 1440, 768, 390 y 360px, enlaces, formularios, animaciones de entrada, scroll, hover, iluminación, teclado y movimiento reducido. No envía solicitudes, correos ni reservaciones.

Los cambios son locales y no están publicados. Continúa pendiente la integración PHP y la prueba real de recepción de correo documentada en `landing-redesign.md`; este cambio visual no acredita entrega de correo ni modifica su comportamiento.
