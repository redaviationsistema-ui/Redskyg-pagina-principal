<template>
  <div class="home-page">
    <section class="home-hero">
      <img
        class="hero-background"
        src="/images/Home/home1.jpg"
        :alt="pageContent.heroAlt"
        fetchpriority="high"
        decoding="async"
      />
      <div class="hero-background-overlay"></div>

      <div class="container hero-shell">
        <div class="hero-copy reveal is-visible" data-reveal="up">
          <span class="eyebrow">{{ pageContent.heroEyebrow }}</span>
          <h1>{{ pageContent.heroTitle }}</h1>
          <p class="hero-lead">{{ pageContent.heroLead }}</p>

          <div class="hero-actions">
            <a class="btn-primary" href="#home-services-directory">{{ pageContent.primaryCta }}</a>
            <a
              class="btn-secondary"
              :href="whatsappHref"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ pageContent.secondaryCta }}
            </a>
          </div>

          <div class="hero-proof-grid" aria-label="SkyGroup trust metrics">
            <article
              v-for="metric in pageContent.trustMetrics"
              :key="metric.label"
              class="hero-proof-card"
            >
              <strong>{{ metric.value }}</strong>
              <span>{{ metric.label }}</span>
            </article>
          </div>

          <div class="hero-pills" aria-label="SkyGroup focus areas">
            <span v-for="pill in pageContent.heroPills" :key="pill">{{ pill }}</span>
          </div>
        </div>

        <div class="hero-visual reveal is-visible" data-reveal="zoom">
          <div class="hero-visual-stage">
            <aside class="hero-aside-panel">
              <span>{{ pageContent.storyVisualLabel }}</span>
              <strong>{{ pageContent.storyVisualTitle }}</strong>
              <p>{{ pageContent.storyVisualText }}</p>
            </aside>

            <div class="hero-service-ribbon" aria-label="SkyGroup service areas">
              <span v-for="pill in pageContent.heroPills" :key="`${pill}-visual`">{{ pill }}</span>
            </div>

            <div class="hero-signal-card">
              <span class="hero-signal-label">{{ pageContent.heroSignalLabel }}</span>
              <strong>{{ pageContent.heroSignalTitle }}</strong>
              <p>{{ pageContent.heroSignalText }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="trust-ribbon-section">
      <div class="container">
        <div class="trust-ribbon reveal" data-reveal="up">
          <article v-for="metric in pageContent.trustMetrics" :key="metric.label" class="trust-item">
            <strong>{{ metric.value }}</strong>
            <span>{{ metric.label }}</span>
          </article>
        </div>
      </div>
    </section>

    <section class="section story-section">
      <div class="container story-shell">
        <div class="story-copy reveal" data-reveal="up">
          <span class="eyebrow">{{ pageContent.storyEyebrow }}</span>
          <h2>{{ pageContent.storyTitle }}</h2>
          <p>{{ pageContent.storyLead }}</p>
          <p>{{ pageContent.storyText }}</p>
        </div>

        <div class="story-visual reveal" data-reveal="zoom">
          <div class="story-image"></div>
          <div class="story-points">
            <article v-for="item in pageContent.storyPoints" :key="item.title" class="story-point">
              <svg class="inline-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path :d="icons[item.icon]" />
              </svg>
              <div>
                <strong>{{ item.title }}</strong>
                <span>{{ item.text }}</span>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section id="home-services-directory" class="section solutions-section">
      <div class="container section-lead reveal" data-reveal="up">
        <span class="eyebrow">{{ pageContent.solutionsEyebrow }}</span>
        <h2>{{ pageContent.solutionsTitle }}</h2>
        <p>{{ pageContent.solutionsLead }}</p>
      </div>

      <div class="container solutions-stream">
        <component
          :is="service.external ? 'a' : RouterLink"
          v-for="(service, index) in pageContent.solutions"
          :key="service.title"
          class="solution-row reveal"
          :class="{ reverse: index % 2 === 1 }"
          :style="{ '--reveal-delay': `${index * 90}ms` }"
          data-reveal="up"
          v-bind="serviceLinkProps(service)"
        >
          <div class="solution-copy">
            <span class="solution-number">{{ String(index + 1).padStart(2, "0") }}</span>
            <h3 class="solution-title">{{ service.title }}</h3>
            <p>{{ service.text }}</p>
            <strong class="solution-link">{{ service.cta }}</strong>
          </div>

          <div class="solution-media">
            <img :src="service.visualImage || service.image" :alt="service.visualAlt || service.title" />
          </div>
        </component>
      </div>
    </section>

    <section class="section platform-section">
      <div class="container section-lead section-lead-centered reveal" data-reveal="up">
        <span class="eyebrow">{{ pageContent.platformEyebrow }}</span>
        <h2>{{ pageContent.platformTitle }}</h2>
        <p>{{ pageContent.platformLead }}</p>
      </div>

      <div class="container platform-list">
        <article
          v-for="(item, index) in pageContent.platformBenefits"
          :key="item.title"
          class="platform-item reveal"
          :style="{ '--reveal-delay': `${index * 70}ms` }"
          data-reveal="up"
        >
          <span class="platform-number">{{ String(index + 1).padStart(2, "0") }}</span>
          <div class="platform-copy">
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </div>
        </article>
      </div>
    </section>

    <section class="section needs-section">
      <div class="container section-lead reveal" data-reveal="up">
        <span class="eyebrow">{{ pageContent.needsEyebrow }}</span>
        <h2>{{ pageContent.needsTitle }}</h2>
      </div>

      <div class="container needs-stream">
        <component
          :is="item.external ? 'a' : RouterLink"
          v-for="(item, index) in pageContent.needsCards"
          :key="item.title"
          class="need-row reveal"
          :class="{ reverse: index % 2 === 1 }"
          :style="{ '--reveal-delay': `${index * 90}ms` }"
          data-reveal="up"
          v-bind="serviceLinkProps(item)"
        >
          <div class="need-copy">
            <span class="need-number">{{ String(index + 1).padStart(2, "0") }}</span>
            <h3 class="need-title">{{ item.title }}</h3>
            <p>{{ item.text }}</p>
            <span class="need-link">{{ item.cta }}</span>
          </div>

          <div class="need-media">
            <img :src="item.image" :alt="item.title" />
          </div>
        </component>
      </div>
    </section>

    <section class="section media-section">
      <div class="container media-layout">
        <div class="media-lead reveal" data-reveal="up">
          <span class="eyebrow">{{ pageContent.mediaEyebrow }}</span>
          <h2>{{ pageContent.mediaTitle }}</h2>
          <p>{{ pageContent.mediaLead }}</p>
          <a
            class="btn-secondary media-channel-link"
            :href="youtubeChannelUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ pageContent.mediaCta }}
          </a>
        </div>

        <div class="media-grid">
          <article class="media-feature reveal" data-reveal="zoom">
            <div class="media-frame media-frame-feature">
              <iframe
                :src="youtubeVideos[0].embedUrl"
                :title="youtubeVideos[0].title"
                loading="lazy"
                referrerpolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
            <div class="media-copy">
              <span>{{ youtubeVideos[0].kicker }}</span>
              <h3>{{ youtubeVideos[0].title }}</h3>
            </div>
          </article>

          <article
            v-for="(video, index) in youtubeVideos.slice(1)"
            :key="video.id"
            class="media-mini reveal"
            :style="{ '--reveal-delay': `${index * 90}ms` }"
            data-reveal="zoom"
          >
            <div class="media-frame">
              <iframe
                :src="video.embedUrl"
                :title="video.title"
                loading="lazy"
                referrerpolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
            <div class="media-copy">
              <span>{{ video.kicker }}</span>
              <h3>{{ video.title }}</h3>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section testimonials-section">
      <div class="container testimonials-shell">
        <div class="testimonials-head reveal" data-reveal="up">
          <span class="eyebrow">{{ pageContent.testimonialsEyebrow }}</span>
          <h2>{{ pageContent.testimonialsTitle }}</h2>
          <p>{{ pageContent.testimonialsLead }}</p>
        </div>

        <div class="testimonials-list">
          <article
            v-for="(testimonial, index) in pageContent.testimonials"
            :key="testimonial.name"
            class="testimonial-row reveal"
            :style="{ '--reveal-delay': `${index * 80}ms` }"
            data-reveal="up"
          >
            <p>{{ testimonial.quote }}</p>
            <div class="testimonial-meta">
              <strong>{{ testimonial.name }}</strong>
              <span>{{ testimonial.role }}</span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section final-cta">
      <div class="container final-shell">
        <div class="final-copy reveal" data-reveal="up">
          <span class="eyebrow">{{ pageContent.finalEyebrow }}</span>
          <h2>{{ pageContent.finalTitle }}</h2>
          <p>{{ pageContent.finalText }}</p>

          <div class="hero-actions final-actions">
            <a
              class="btn-primary"
              :href="whatsappHref"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ pageContent.finalPrimaryCta }}
            </a>
            <a class="btn-secondary" href="#home-services-directory">
              {{ pageContent.finalSecondaryCta }}
            </a>
          </div>
        </div>

        <div class="final-media reveal" data-reveal="zoom">
          <img src="/images/Home/home10.png" :alt="pageContent.finalTitle" />
        </div>
      </div>
    </section>

    <section class="section quick-contact-section">
      <div class="container quick-contact-shell reveal" data-reveal="up">
        <div>
          <h2>{{ pageContent.contactTitle }}</h2>
          <p>{{ pageContent.contactText }}</p>
        </div>
        <a
          class="btn-secondary"
          :href="whatsappHref"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ pageContent.contactCta }}
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { useLocale } from "../i18n";

const { locale, toLocalizedRoute } = useLocale();

const whatsappHref = computed(() =>
  locale.value === "en"
    ? "https://wa.me/525586186576?text=Hello,%20I%20would%20like%20to%20speak%20with%20a%20SkyGroup%20advisor."
    : "https://wa.me/525586186576?text=Hola,%20me%20gustaria%20hablar%20con%20un%20asesor%20de%20SkyGroup."
);

const youtubeChannelUrl = "https://www.youtube.com/@redaviationcompany";

const icons = {
  flight: "M3 12h18M15.5 6.5 20 3l1 1-3.5 5.5 2.5 7.5-1 1-4.5-5L9 20l-2 1 1-6-5-4.5 1-1 7.5 2.5L15.5 6.5Z",
  aircraft: "M4 18h16M7 15l5-9 5 9M9 11h6",
  parts: "M6.5 6.5h4v4h-4ZM13.5 6.5h4v4h-4ZM6.5 13.5h4v4h-4ZM13.5 13.5h4v4h-4Z",
  services: "M12 3 4 7v6c0 5 3.4 7.7 8 8 4.6-.3 8-3 8-8V7l-8-4Zm0 4.2 4 1.9V13c0 2.8-1.7 4.4-4 4.8-2.3-.4-4-2-4-4.8V9.1l4-1.9Z",
  network: "M12 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM5 15a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm14 0a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM7.2 16.2l2.9-3.1m6.7 3.1-2.9-3.1m-3.8-.2H7.5m9 0h-2.6",
  support: "M12 3a7 7 0 0 0-7 7v2.2A2.8 2.8 0 0 0 3 15v1a3 3 0 0 0 3 3h2v-7H6v-2a6 6 0 1 1 12 0v2h-2v7h1a4 4 0 0 0 4-4v-1a2.8 2.8 0 0 0-2-2.8V10a7 7 0 0 0-7-7Z",
  globe: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 0c2.3 2.3 3.5 5.6 3.5 9S14.3 18.7 12 21c-2.3-2.3-3.5-5.6-3.5-9S9.7 5.3 12 3Zm-8.5 9h17M5.2 7h13.6M5.2 17h13.6",
  concierge: "M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-7 16a7 7 0 0 1 14 0M19 8l1.5 1.5L23 7",
  check: "m5 12 4 4L19 6",
  hangar: "M4 20V9l8-6 8 6v11h-4v-6H8v6H4Z",
};

const youtubeVideoConfigs = {
  es: [
    { id: "tAagngypnVY", kicker: "Vista destacada", title: "SkyGroup en video" },
    { id: "Q01qXMo-8UE", kicker: "Contenido reciente", title: "Operaciones, aeronaves y presencia de marca" },
  ],
  en: [
    { id: "tAagngypnVY", kicker: "Featured video", title: "SkyGroup on video" },
    { id: "Q01qXMo-8UE", kicker: "Recent content", title: "Operations, aircraft, and brand presence" },
  ],
};

const content = {
  es: {
    heroAlt: "Aeronave ejecutiva en plataforma al atardecer",
    heroEyebrow: "AVIACION PRIVADA · SOLUCIONES AERONAUTICAS",
    heroTitle: "Soluciones para aviacion privada.",
    heroLead:
      "Coordinamos operaciones de vuelo, disponibilidad de aeronaves, suministro de componentes y soporte aeronautico especializado para clientes, operadores y empresas del sector.",
    heroSignalLabel: "Estructura operativa",
    heroSignalTitle: "Una estructura operativa para respaldar cada mision.",
    heroSignalText:
      "Desde la planificacion del vuelo hasta la gestion de aeronaves, componentes y servicios tecnicos, conectamos cada requerimiento con la solucion aeronautica adecuada.",
    primaryCta: "Explorar servicios",
    secondaryCta: "Hablar con un asesor",
    heroPills: ["Vuelos privados", "Venta de aeronaves", "Partes aeronauticas", "Servicios especializados"],
    trustMetrics: [
      { value: "+15 anos", label: "Experiencia" },
      { value: "52", label: "Aeronaves verificadas" },
      { value: "24/7", label: "Atencion especializada" },
      { value: "Mexico · USA · Caribe", label: "Cobertura" },
    ],
    storyEyebrow: "ECOSISTEMA AERONAUTICO",
    storyTitle: "Ecosistema aeronautico integrado.",
    storyLead:
      "SkyGroup integra diferentes areas de la aviacion dentro de una misma estructura operativa: vuelos privados, comercializacion de aeronaves, suministro de partes y soporte tecnico aeronautico.",
    storyText:
      "Cada division trabaja bajo un mismo enfoque: disponibilidad, trazabilidad, coordinacion y continuidad operacional.",
    storyVisualLabel: "Operacion coordinada",
    storyVisualTitle: "Una estructura pensada para atender decisiones de alto valor.",
    storyVisualText:
      "Desde una solicitud comercial hasta una necesidad tecnica, el objetivo es resolver con una experiencia mas simple, directa y especializada.",
    storyPoints: [
      { icon: "hangar", title: "Entorno aeronautico", text: "Aeronaves, operacion y soporte en la misma conversacion." },
      { icon: "network", title: "Conexion sectorial", text: "Clientes, operadores y proveedores alineados por solucion." },
      { icon: "support", title: "Atencion guiada", text: "Cada caso avanza con seguimiento y criterio especializado." },
    ],
    solutionsEyebrow: "SOLUCIONES",
    solutionsTitle: "Capacidades integradas para la aviacion.",
    solutionsLead: "Soluciones comerciales, operacionales y tecnicas para diferentes necesidades del sector aeronautico.",
    solutions: [
      {
        title: "Vuelos privados",
        text: "Coordinamos vuelos charter de acuerdo con los requerimientos de cada mision, considerando ruta, capacidad, autonomia, configuracion de cabina y disponibilidad operacional de la aeronave.",
        cta: "Cotizar operacion ->",
        external: true,
        href: "https://redskyg.com/landing/es-mx/reserva",
        image: "/images/Home/IMG_0894.jpeg",
        visualImage: "/images/Home/IMG_0894.jpeg",
        visualAlt: "Jet ejecutivo de SkyGroup",
      },
      {
        title: "Venta y adquisicion de aeronaves",
        text: "Apoyamos procesos de adquisicion y venta de aeronaves mediante identificacion de unidades, analisis de mercado y coordinacion documental y tecnica durante la operacion.",
        cta: "Ver aeronaves ->",
        external: true,
        href: "https://redskyg.com/sellyouraircraf/en-us",
        image: "/images/Home/image.png",
        visualImage: "/images/Home/image.png",
        visualAlt: "Venta de aeronaves SkyGroup",
      },
      {
        title: "Partes y componentes aeronauticos",
        text: "Localizamos y suministramos componentes, rotables y material aeronautico para requerimientos programados y situaciones criticas de mantenimiento.",
        cta: "Solicitar componente ->",
        external: true,
        href: "https://redaviationcorp.com/servicios/venta-partes",
        image: "/images/Home/IMG_0672.jpeg",
        visualImage: "/images/Home/IMG_0672.jpeg",
        visualAlt: "Partes aeronauticas SkyGroup",
      },
      {
        title: "Servicios aeronauticos",
        text: "Coordinamos soluciones especializadas para requerimientos de mantenimiento, inspeccion, soporte tecnico y continuidad operacional de aeronaves.",
        cta: "Solicitar soporte ->",
        route: "OperationsManagement",
        image: "/images/Home/IMG_1031.jpeg",
        visualImage: "/images/Home/IMG_1031.jpeg",
        visualAlt: "Servicios aeronauticos SkyGroup",
      },
    ],
    platformEyebrow: "UN SOLO ECOSISTEMA",
    platformTitle: "Una estructura. Multiples capacidades.",
    platformLead:
      "Conectamos operadores, proveedores, aeronaves y especialistas para responder a diferentes requerimientos dentro de una misma operacion.",
    platformBenefits: [
      { title: "Gestion centralizada", text: "Cada requerimiento se canaliza desde un mismo punto de contacto." },
      { title: "Red aeronautica", text: "Conexion con operadores, proveedores y especialistas del sector." },
      { title: "Seguimiento especializado", text: "Visibilidad y continuidad durante cada proceso." },
    ],
    needsEyebrow: "¿QUE NECESITAS?",
    needsTitle: "Soluciones por requerimiento operativo.",
    needsCards: [
      {
        title: "Coordinar un vuelo privado",
        text: "Defina origen, destino, pasajeros y fechas de operacion. Nuestro equipo identificara aeronaves compatibles con el perfil de mision y disponibilidad requerida.",
        cta: "Cotizar operacion",
        route: "AirTaxi",
        image: "/images/Service/TaxiAereo.png",
      },
      {
        title: "Buscar una aeronave",
        text: "Comparta los requerimientos de mision, categoria, alcance, capacidad o modelo requerido para iniciar la busqueda de unidades disponibles.",
        cta: "Iniciar busqueda",
        route: "AircraftSales",
        image: "/images/Service/CompraVenta.png",
      },
      {
        title: "Localizar un componente",
        text: "Envienos el Part Number (P/N), descripcion, condicion requerida, cantidad y certificacion necesaria. Nuestro equipo verificara disponibilidad y opciones de suministro.",
        cta: "Solicitar componente",
        route: "ImportExport",
        image: "/images/Service/ImportExport.png",
      },
      {
        title: "Solicitar soporte aeronautico",
        text: "Coordinamos requerimientos relacionados con mantenimiento, inspeccion, soporte en tierra, asistencia tecnica y servicios especializados para aeronaves.",
        cta: "Solicitar soporte",
        route: "OperationsManagement",
        image: "/images/Service/AdministracionOperativa.png",
      },
    ],
    mediaEyebrow: "SKYGROUP EN OPERACION",
    mediaTitle: "Infraestructura comercial y operativa para la aviacion.",
    mediaLead: "La tecnologia facilita la conexion. Nuestro valor esta en la capacidad de coordinar aeronaves, operadores, componentes y servicios especializados.",
    mediaCta: "Ver canal de YouTube",
    testimonialsEyebrow: "EXPERIENCIA",
    testimonialsTitle: "Experiencia aplicada a cada operacion.",
    testimonialsLead: "Cada requerimiento aeronautico implica variables tecnicas, comerciales y operacionales. Nuestro equipo coordina estos elementos para proporcionar soluciones viables y eficientes.",
    testimonials: [
      {
        quote: "La respuesta fue inmediata y la propuesta llego con claridad operativa desde el primer contacto.",
        name: "Direccion Ejecutiva",
        role: "Industria financiera",
      },
      {
        quote: "Necesitabamos una salida sensible de ultima hora y el seguimiento fue impecable.",
        name: "Oficina Familiar",
        role: "Cliente recurrente",
      },
      {
        quote: "Se sintio como un servicio premium real: menos vueltas, mas precision y mejor trato.",
        name: "Asistente de Presidencia",
        role: "Grupo corporativo",
      },
    ],
    finalEyebrow: "SKYGROUP",
    finalTitle: "Cual es su requerimiento?",
    finalText:
      "Seleccione el area correspondiente y nuestro equipo analizara las variables tecnicas y comerciales necesarias para coordinar la solucion.",
    finalPrimaryCta: "Hablar con un asesor",
    finalSecondaryCta: "Explorar servicios",
    contactTitle: "Capacidad operativa respaldada por conocimiento aeronautico.",
    contactText: "Comparta su requerimiento y nuestro equipo lo canalizara con el area adecuada para dar continuidad tecnica, comercial u operacional.",
    contactCta: "Contactar por WhatsApp",
  },
  en: {
    heroAlt: "Executive aircraft parked on an apron at sunset",
    heroEyebrow: "PRIVATE AVIATION · AERONAUTICAL SOLUTIONS",
    heroTitle: "Solutions for private aviation.",
    heroLead:
      "We coordinate flight operations, aircraft availability, component supply and specialized aviation support for clients, operators and aviation companies.",
    heroSignalLabel: "Operational structure",
    heroSignalTitle: "An operational structure built to support every mission.",
    heroSignalText:
      "From flight planning to aircraft, component and technical service requirements, we connect each mission with the appropriate aviation solution.",
    primaryCta: "Explore services",
    secondaryCta: "Speak with an advisor",
    heroPills: ["Private flights", "Aircraft sales", "Aeronautical parts", "Specialized services"],
    trustMetrics: [
      { value: "15+ years", label: "Experience" },
      { value: "52", label: "Verified aircraft" },
      { value: "24/7", label: "Specialized support" },
      { value: "Mexico · USA · Caribbean", label: "Coverage" },
    ],
    storyEyebrow: "AVIATION ECOSYSTEM",
    storyTitle: "Integrated aviation ecosystem.",
    storyLead:
      "SkyGroup integrates multiple areas of aviation within a single operational structure: private charter, aircraft sales, parts supply and specialized aviation support.",
    storyText:
      "Every division operates around the same principles: availability, traceability, coordination and operational continuity.",
    storyVisualLabel: "Coordinated operation",
    storyVisualTitle: "A structure built to support high-value aviation decisions.",
    storyVisualText:
      "From a commercial inquiry to a technical requirement, the goal is to solve with a simpler, more direct, and specialized experience.",
    storyPoints: [
      { icon: "hangar", title: "Aeronautical environment", text: "Aircraft, operations, and support in one conversation." },
      { icon: "network", title: "Industry connection", text: "Clients, operators, and providers aligned by solution." },
      { icon: "support", title: "Guided support", text: "Each case advances with specialized follow-up." },
    ],
    solutionsEyebrow: "SOLUTIONS",
    solutionsTitle: "Integrated capabilities across aviation.",
    solutionsLead: "Commercial, operational and technical solutions for different aviation requirements.",
    solutions: [
      {
        title: "Private Charter",
        text: "We coordinate charter flights according to each mission profile, considering routing, passenger capacity, range, cabin configuration and aircraft operational availability.",
        cta: "Request a Quote ->",
        route: "AirTaxi",
        image: "/images/Home/IMG_0894.jpeg",
        visualImage: "/images/Home/IMG_0894.jpeg",
        visualAlt: "SkyGroup executive jet",
      },
      {
        title: "Aircraft Sales & Acquisitions",
        text: "We support aircraft acquisition and sales processes through aircraft sourcing, market analysis and coordination of technical and transactional requirements.",
        cta: "View Aircraft ->",
        route: "AircraftSales",
        image: "/images/Home/image.png",
        visualImage: "/images/Home/image.png",
        visualAlt: "SkyGroup aircraft sales",
      },
      {
        title: "Aircraft Parts & Components",
        text: "We source aircraft components, rotables and aviation material for scheduled maintenance requirements and time-critical operational needs.",
        cta: "Request a Part ->",
        route: "ImportExport",
        image: "/images/Home/IMG_0672.jpeg",
        visualImage: "/images/Home/IMG_0672.jpeg",
        visualAlt: "SkyGroup aeronautical parts",
      },
      {
        title: "Aviation Services",
        text: "We coordinate specialized solutions for aircraft maintenance, inspection, technical requirements and operational continuity.",
        cta: "Request Support ->",
        route: "OperationsManagement",
        image: "/images/Home/IMG_1031.jpeg",
        visualImage: "/images/Home/IMG_1031.jpeg",
        visualAlt: "SkyGroup aeronautical services",
      },
    ],
    platformEyebrow: "ONE ECOSYSTEM",
    platformTitle: "One structure. Multiple capabilities.",
    platformLead:
      "We connect operators, suppliers, aircraft and aviation specialists to support multiple requirements within a single operation.",
    platformBenefits: [
      { title: "Centralized Management", text: "Each requirement is routed through a single point of contact." },
      { title: "Aviation network", text: "Connections with operators, suppliers and industry specialists." },
      { title: "Specialized Support", text: "Visibility and continuity throughout every process." },
    ],
    needsEyebrow: "WHAT DO YOU NEED?",
    needsTitle: "Solutions by operational need.",
    needsCards: [
      {
        title: "Coordinate a private flight",
        text: "Define origin, destination, passengers and operating dates. Our team will identify aircraft compatible with the mission profile and required availability.",
        cta: "Request Flight Options",
        route: "AirTaxi",
        image: "/images/Service/TaxiAereo.png",
      },
      {
        title: "Source an aircraft",
        text: "Provide your mission requirements, aircraft category, range, capacity or preferred model to begin identifying available aircraft.",
        cta: "Start Aircraft Sourcing",
        route: "AircraftSales",
        image: "/images/Service/CompraVenta.png",
      },
      {
        title: "Source an aircraft part",
        text: "Provide the Part Number (P/N), description, required condition, quantity and certification requirements. Our team will verify availability and sourcing options.",
        cta: "Request Component",
        route: "ImportExport",
        image: "/images/Service/ImportExport.png",
      },
      {
        title: "Request aviation support",
        text: "We coordinate requirements involving maintenance, inspections, ground support, technical assistance and specialized aircraft services.",
        cta: "Request Support",
        route: "OperationsManagement",
        image: "/images/Service/AdministracionOperativa.png",
      },
    ],
    mediaEyebrow: "SKYGROUP IN OPERATION",
    mediaTitle: "Commercial and operational infrastructure for aviation.",
    mediaLead: "Technology enables the connection. Our value lies in coordinating aircraft, operators, components and specialized aviation services.",
    mediaCta: "View YouTube channel",
    testimonialsEyebrow: "EXPERIENCE",
    testimonialsTitle: "Experience applied to every operation.",
    testimonialsLead: "Every aviation requirement involves technical, commercial and operational variables. Our team coordinates these elements to deliver viable and efficient solutions.",
    testimonials: [
      {
        quote: "The response was immediate and the proposal arrived with operational clarity from the first touchpoint.",
        name: "Executive Office",
        role: "Financial industry",
      },
      {
        quote: "We needed a sensitive last-minute departure and the follow-up was excellent.",
        name: "Family Office",
        role: "Repeat client",
      },
      {
        quote: "It felt like a real premium service: fewer loops, more precision, and better treatment.",
        name: "Chief of Staff",
        role: "Corporate group",
      },
    ],
    finalEyebrow: "SKYGROUP",
    finalTitle: "What is your requirement?",
    finalText:
      "Select the appropriate area and our team will evaluate the technical and commercial variables required to coordinate the solution.",
    finalPrimaryCta: "Speak with an advisor",
    finalSecondaryCta: "Explore services",
    contactTitle: "Operational capability backed by aviation expertise.",
    contactText: "Share your requirement and our team will route it to the right area for technical, commercial or operational continuity.",
    contactCta: "Contact on WhatsApp",
  },
};

const pageContent = computed(() => content[locale.value] ?? content.es);

const youtubeVideos = computed(() =>
  (youtubeVideoConfigs[locale.value] ?? youtubeVideoConfigs.es).map((video) => ({
    ...video,
    embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`,
  }))
);

let revealObserver;

onMounted(() => {
  const reveals = Array.from(document.querySelectorAll(".reveal:not(.is-visible)"));

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver?.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  reveals.forEach((element) => revealObserver?.observe(element));
});

onBeforeUnmount(() => {
  revealObserver?.disconnect();
});

const serviceLinkProps = (item) => {
  if (item.external) {
    return {
      href: item.href,
      target: "_blank",
      rel: "noopener noreferrer",
    };
  }

  return {
    to: toLocalizedRoute(item.route),
  };
};
</script>

<style scoped>
.home-page {
  color: #f4efe6;
  background:
    radial-gradient(circle at top right, rgba(193, 148, 78, 0.12), transparent 24%),
    radial-gradient(circle at left center, rgba(32, 66, 102, 0.16), transparent 30%),
    linear-gradient(180deg, #05111b 0%, #081522 44%, #0a1828 100%);
}

.home-page :is(h1, h2, h3) {
  font-family: var(--font-heading);
  color: #f7f1e8;
}

.home-page :is(p, span, strong, a) {
  font-family: var(--font-body);
}

.section {
  position: relative;
  padding: 110px 0;
}

.section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  width: min(calc(100% - 2.4rem), 1320px);
  height: 1px;
  transform: translateX(-50%);
  background: linear-gradient(90deg, transparent, rgba(215, 176, 116, 0.22), transparent);
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  margin-bottom: 1rem;
  color: #d7b074;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.28em;
  text-transform: uppercase;
}

.home-hero {
  position: relative;
  padding: 7rem 0 5rem;
  min-height: 92vh;
  overflow: hidden;
  isolation: isolate;
}

.hero-background {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 42%;
  transform: scale(1.015);
  animation: heroFloat 7s ease-in-out infinite;
}

.hero-background-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(5, 13, 23, 0.68) 0%, rgba(5, 13, 23, 0.48) 34%, rgba(5, 13, 23, 0.2) 62%, rgba(5, 13, 23, 0.38) 100%),
    linear-gradient(180deg, rgba(5, 13, 23, 0.08), rgba(5, 13, 23, 0.28));
}

.hero-background-overlay::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(5, 13, 23, 0.18) 100%);
}

.hero-shell,
.story-shell,
.media-layout,
.testimonials-shell,
.final-shell {
  display: grid;
  grid-template-columns: minmax(320px, 0.76fr) minmax(560px, 1.24fr);
  gap: 4rem;
  align-items: center;
}

.hero-shell {
  position: relative;
  z-index: 1;
  min-height: calc(92vh - 7.5rem);
  grid-template-columns: minmax(320px, 0.92fr) minmax(360px, 0.88fr);
  gap: 3rem;
}

.hero-copy,
.media-lead,
.final-copy {
  max-width: 620px;
}

.hero-copy {
  position: relative;
  z-index: 2;
  padding: 1.8rem 0;
}

.hero-copy h1,
.section-lead h2,
.story-copy h2,
.media-lead h2,
.testimonials-head h2,
.final-copy h2,
.quick-contact-shell h2 {
  font-size: clamp(2.6rem, 5vw, 5.5rem);
  line-height: 0.96;
  letter-spacing: -0.04em;
  text-wrap: balance;
}

.hero-lead,
.section-lead p,
.story-copy p,
.story-point span,
.solution-copy p,
.platform-copy p,
.need-copy p,
.media-lead p,
.media-copy span,
.testimonials-head p,
.testimonial-row p,
.final-copy p,
.quick-contact-shell p,
.hero-aside-panel p {
  color: rgba(241, 235, 226, 0.78);
  line-height: 1.8;
}

.hero-lead {
  margin-top: 1.4rem;
  max-width: 37ch;
  font-size: 1.08rem;
  text-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  padding: 0.95rem 1.6rem;
  border-radius: 999px;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.76rem;
  font-weight: 700;
  transition:
    transform 0.28s ease,
    box-shadow 0.28s ease,
    border-color 0.28s ease,
    background 0.28s ease;
}

.btn-primary {
  color: #09111b;
  background: linear-gradient(135deg, #c79b57, #ebca91);
  box-shadow: 0 18px 45px rgba(199, 155, 87, 0.22);
}

.btn-secondary {
  color: #f6efe4;
  background: rgba(9, 20, 33, 0.46);
  border: 1px solid rgba(214, 177, 117, 0.34);
}

.btn-primary:hover,
.btn-secondary:hover,
.solution-row:hover,
.need-row:hover {
  transform: translateY(-4px);
}

.reveal {
  opacity: 0;
  transition:
    opacity 0.8s ease,
    transform 0.8s ease,
    filter 0.8s ease;
  transition-delay: var(--reveal-delay, 0ms);
  will-change: opacity, transform, filter;
}

.reveal[data-reveal="up"] {
  transform: translateY(42px);
}

.reveal[data-reveal="zoom"] {
  transform: translateY(24px) scale(0.96);
  filter: saturate(0.82);
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: saturate(1);
}

.hero-copy.reveal,
.hero-visual.reveal {
  animation: none;
}

.hero-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1.5rem;
}

.hero-pills span {
  padding: 0.72rem 0.95rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(8, 18, 30, 0.5);
  color: rgba(248, 242, 233, 0.88);
  font-size: 0.82rem;
  backdrop-filter: blur(10px);
}

.hero-proof-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem;
  margin-top: 2.1rem;
  max-width: 560px;
}

.hero-proof-card {
  padding: 1rem 1.05rem;
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(9, 20, 33, 0.58), rgba(9, 20, 33, 0.3));
  border: 1px solid rgba(215, 176, 116, 0.14);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(10px);
}

.hero-proof-card strong {
  display: block;
  color: #f7f1e8;
  font-size: 1.15rem;
  font-weight: 700;
}

.hero-proof-card span {
  display: block;
  margin-top: 0.35rem;
  color: rgba(241, 235, 226, 0.68);
  font-size: 0.84rem;
  line-height: 1.45;
}

.hero-visual {
  position: relative;
  min-width: 0;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.hero-visual-stage {
  position: relative;
  width: min(100%, 520px);
  padding: 2rem;
  border-radius: 34px;
  background:
    linear-gradient(180deg, rgba(8, 18, 30, 0.34), rgba(8, 18, 30, 0.12)),
    radial-gradient(circle at top right, rgba(215, 176, 116, 0.16), transparent 28%);
  border: 1px solid rgba(215, 176, 116, 0.16);
  backdrop-filter: blur(10px);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.24);
}

.hero-visual-stage::before,
.hero-visual-stage::after {
  content: "";
  position: absolute;
  border-radius: 999px;
  pointer-events: none;
}

.hero-visual-stage::before {
  top: -34px;
  right: 26px;
  width: 148px;
  height: 148px;
  border: 1px solid rgba(215, 176, 116, 0.24);
  opacity: 0.55;
}

.hero-visual-stage::after {
  bottom: 88px;
  left: -26px;
  width: 82px;
  height: 82px;
  background: radial-gradient(circle, rgba(215, 176, 116, 0.16), transparent 68%);
}

.solution-media img,
.need-media img,
.final-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hero-aside-panel {
  position: relative;
  z-index: 2;
  max-width: none;
  padding: 1.8rem 1.8rem 2rem;
  border-radius: 28px;
  background:
    linear-gradient(180deg, rgba(8, 18, 30, 0.84), rgba(8, 18, 30, 0.94)),
    radial-gradient(circle at top right, rgba(215, 176, 116, 0.14), transparent 34%);
  border: 1px solid rgba(215, 176, 116, 0.22);
  backdrop-filter: blur(18px);
  animation: panelDrift 6s ease-in-out infinite;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.32);
}

.hero-aside-panel::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, rgba(215, 176, 116, 0.24), rgba(255, 255, 255, 0.04));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.hero-aside-panel span,
.media-copy span {
  color: #d7b074;
  font-size: 0.8rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.hero-aside-panel strong {
  display: block;
  margin-top: 0.75rem;
  font-family: var(--font-heading);
  font-size: clamp(1.9rem, 3vw, 2.6rem);
  line-height: 1.12;
  max-width: 12ch;
}

.hero-aside-panel p {
  margin-top: 0.95rem;
  max-width: 32ch;
}

.hero-service-ribbon {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

.hero-service-ribbon span {
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  padding: 0.65rem 0.9rem;
  border-radius: 999px;
  background: rgba(247, 241, 232, 0.08);
  border: 1px solid rgba(247, 241, 232, 0.08);
  color: rgba(247, 241, 232, 0.88);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-signal-card {
  margin-top: 1.1rem;
  margin-left: auto;
  width: min(100%, 300px);
  padding: 1.1rem 1.15rem 1.2rem;
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(199, 155, 87, 0.18), rgba(199, 155, 87, 0.06));
  border: 1px solid rgba(215, 176, 116, 0.22);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18);
}

.hero-signal-label {
  color: rgba(247, 241, 232, 0.72);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.hero-signal-card strong {
  display: block;
  margin-top: 0.5rem;
  color: #f7f1e8;
  font-family: var(--font-heading);
  font-size: 1.3rem;
  line-height: 1.18;
}

.hero-signal-card p {
  margin-top: 0.55rem;
  color: rgba(241, 235, 226, 0.72);
  line-height: 1.65;
  font-size: 0.92rem;
}

.trust-ribbon-section {
  padding: 0 0 1rem;
}

.trust-ribbon {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid rgba(215, 176, 116, 0.24);
  border-bottom: 1px solid rgba(215, 176, 116, 0.16);
}

.trust-item {
  position: relative;
  padding: 1.5rem 1rem;
  text-align: center;
}

.trust-item:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 0;
  width: 1px;
  height: 42px;
  transform: translateY(-50%);
  background: rgba(215, 176, 116, 0.18);
}

.trust-item strong {
  display: block;
  color: #f8f1e4;
  font-size: 1.7rem;
  font-weight: 700;
}

.trust-item span {
  color: rgba(241, 235, 226, 0.68);
  font-size: 0.88rem;
}

.story-visual,
.story-points,
.solutions-stream,
.needs-stream,
.platform-list,
.testimonials-list {
  display: grid;
}

.story-visual {
  gap: 1.4rem;
}

.story-image {
  aspect-ratio: 16 / 10;
  border-radius: 24px;
  background: url("/images/About/About10.png") center/cover no-repeat;
}

.story-point,
.platform-item,
.testimonial-row {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  align-items: start;
  padding: 1.2rem 0;
  border-bottom: 1px solid rgba(212, 175, 95, 0.14);
}

.story-point > div {
  display: grid;
  gap: 0.45rem;
}

.inline-icon {
  width: 18px;
  height: 18px;
  margin-top: 0.25rem;
  color: #d7b074;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.story-point strong,
.platform-copy h3,
.media-copy h3,
.testimonial-meta strong {
  display: block;
  color: #f8f2e8;
}

.section-lead {
  max-width: 760px;
  margin-bottom: 2.4rem;
}

.section-lead-centered {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.solution-row,
.need-row {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(380px, 1.1fr);
  gap: 3.5rem;
  align-items: center;
  padding: 5rem 0;
  border-bottom: 1px solid rgba(212, 175, 95, 0.18);
  text-decoration: none;
}

.solution-row.reverse,
.need-row.reverse {
  grid-template-columns: minmax(380px, 1.1fr) minmax(0, 0.9fr);
}

.solution-row.reverse .solution-copy,
.need-row.reverse .need-copy {
  order: 2;
}

.solution-row.reverse .solution-media,
.need-row.reverse .need-media {
  order: 1;
}

.solution-copy,
.need-copy {
  max-width: 470px;
}

.solution-number,
.need-number,
.platform-number {
  color: #d7ad62;
  letter-spacing: 0.18em;
  font-size: 0.82rem;
  font-weight: 600;
  text-transform: uppercase;
}

.solution-title,
.need-title {
  margin-top: 0.95rem;
  font-size: clamp(2.4rem, 4vw, 4rem);
  line-height: 0.98;
  letter-spacing: -0.03em;
}

.solution-copy p,
.need-copy p {
  max-width: 32ch;
  margin-top: 1rem;
}

.solution-link,
.need-link {
  display: inline-block;
  margin-top: 1.35rem;
  color: #e7c58a;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.solution-media,
.need-media,
.final-media {
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: 22px;
}

.platform-list {
  max-width: 900px;
  margin: 0 auto;
}

.platform-item {
  grid-template-columns: 72px 1fr;
}

.platform-copy h3 {
  font-size: 1.45rem;
  line-height: 1.12;
}

.platform-copy p {
  margin-top: 0.45rem;
}

.media-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(260px, 0.85fr);
  gap: 1rem;
}

.media-feature,
.media-mini {
  overflow: hidden;
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(11, 21, 34, 0.94), rgba(8, 16, 27, 0.94));
  border: 1px solid rgba(215, 176, 116, 0.14);
}

.media-frame {
  aspect-ratio: 16 / 9;
  background: #02070c;
}

.media-frame-feature {
  aspect-ratio: 16 / 10;
}

.media-frame iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

.media-copy {
  padding: 1.15rem 1.2rem 1.35rem;
}

.media-copy h3 {
  margin-top: 0.5rem;
  font-size: 1.2rem;
}

.media-channel-link {
  margin-top: 1.8rem;
}

.testimonial-row {
  grid-template-columns: minmax(0, 1fr) 220px;
}

.testimonial-meta {
  text-align: right;
}

.testimonial-meta strong {
  display: block;
}

.testimonial-meta span {
  color: rgba(241, 235, 226, 0.66);
}

.final-copy p {
  max-width: 40ch;
  margin-top: 1rem;
}

.quick-contact-section {
  padding-top: 0;
}

.quick-contact-shell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 2rem 0 0;
  border-top: 1px solid rgba(212, 175, 95, 0.18);
}

@keyframes heroFloat {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

@keyframes panelDrift {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, -6px, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal,
  .hero-background,
  .hero-aside-panel,
  .btn-primary,
  .btn-secondary,
  .solution-row,
  .need-row {
    animation: none !important;
    transition: none !important;
    transform: none !important;
    opacity: 1 !important;
    filter: none !important;
  }
}

@media (max-width: 1180px) {
  .hero-shell,
  .story-shell,
  .media-layout,
  .testimonials-shell,
  .final-shell {
    grid-template-columns: 1fr;
  }

  .hero-copy,
  .media-lead,
  .final-copy {
    max-width: none;
  }

  .hero-shell {
    gap: 2rem;
  }
}

@media (max-width: 920px) {
  .trust-ribbon,
  .media-grid {
    grid-template-columns: 1fr;
  }

  .trust-item:not(:last-child)::after {
    display: none;
  }

  .solution-row,
  .solution-row.reverse,
  .need-row,
  .need-row.reverse,
  .testimonial-row {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .solution-row.reverse .solution-copy,
  .solution-row.reverse .solution-media,
  .need-row.reverse .need-copy,
  .need-row.reverse .need-media {
    order: initial;
  }

  .testimonial-meta {
    text-align: left;
  }

  .hero-proof-grid {
    grid-template-columns: 1fr 1fr;
  }

  .hero-visual {
    justify-content: stretch;
  }

  .hero-visual-stage {
    width: 100%;
  }
}

@media (max-width: 720px) {
  .section {
    padding: 88px 0;
  }

  .container {
    padding: 0 1.2rem;
  }

  .home-hero {
    padding-top: 6rem;
    min-height: auto;
  }

  .hero-shell {
    min-height: auto;
    gap: 1.5rem;
  }

  .hero-actions,
  .quick-contact-shell {
    flex-direction: column;
    align-items: stretch;
  }

  .hero-proof-grid {
    grid-template-columns: 1fr;
  }

  .hero-visual-stage {
    padding: 1.1rem;
    border-radius: 24px;
  }

  .hero-visual-stage::before {
    top: -22px;
    right: 16px;
    width: 110px;
    height: 110px;
  }

  .btn-primary,
  .btn-secondary,
  .media-channel-link {
    width: 100%;
  }

  .solution-row,
  .need-row {
    padding: 3rem 0;
  }

  .hero-aside-panel {
    position: static;
    max-width: none;
    padding: 1.35rem 1.2rem 1.45rem;
  }

  .hero-aside-panel strong {
    max-width: none;
  }

  .hero-service-ribbon span {
    width: 100%;
    justify-content: center;
    text-align: center;
  }

  .hero-signal-card {
    width: 100%;
  }
}
</style>
