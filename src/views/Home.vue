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
            <a
              class="btn-primary"
              :href="whatsappHref"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ pageContent.primaryCta }}
            </a>
            <a class="btn-secondary" href="#home-services-directory">{{ pageContent.secondaryCta }}</a>
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

        </div>

        <div class="hero-visual reveal is-visible" data-reveal="zoom">
          <div class="hero-visual-stage">
            <aside class="hero-aside-panel">
              <span>{{ pageContent.storyVisualLabel }}</span>
              <strong>{{ pageContent.storyVisualTitle }}</strong>
              <p>{{ pageContent.storyVisualText }}</p>
            </aside>

            <div class="hero-signal-card">
              <span class="hero-signal-label">{{ pageContent.heroSignalLabel }}</span>
              <strong>{{ pageContent.heroSignalTitle }}</strong>
              <p>{{ pageContent.heroSignalText }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section story-section">
      <div class="container story-shell">
        <div class="story-copy reveal" data-reveal="up">
          <span class="eyebrow">{{ pageContent.storyEyebrow }}</span>
          <h2>{{ pageContent.storyTitle }}</h2>
          <br />
          <br />
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

          <div class="need-media" :class="item.mediaClass">
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
            :key="testimonial.title"
            class="testimonial-row reveal"
            :style="{ '--reveal-delay': `${index * 80}ms` }"
            data-reveal="up"
          >
            <strong class="testimonial-value">{{ testimonial.value }}</strong>
            <div class="testimonial-copy">
              <strong>{{ testimonial.title }}</strong>
              <p>{{ testimonial.text }}</p>
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
          </div>
        </div>

        <div class="final-media reveal" data-reveal="zoom">
          <img src="/images/Home/home11.jpg" :alt="pageContent.finalTitle" />
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
    ? "https://wa.me/525586186576?text=Hello,%20I%20would%20like%20to%20speak%20with%20the%20SkyGroup%20team%20about%20an%20aviation%20requirement."
    : "https://wa.me/525586186576?text=Hola,%20me%20gustar%C3%ADa%20hablar%20con%20el%20equipo%20de%20Sky%20Group%20sobre%20un%20requerimiento%20aeron%C3%A1utico."
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
    heroEyebrow: "SKY GROUP",
    heroTitle: "Soluciones Integrales para Aviación Ejecutiva.",
    heroLead:
      "Coordinamos vuelos privados, transacciones de aeronaves, componentes aeronáuticos y soporte especializado a través de un único punto de contacto.",
    heroSignalLabel: "Coordinación centralizada",
    heroSignalTitle: "Un solo equipo para cada requerimiento aeronáutico.",
    heroSignalText:
      "Respuesta ágil, seguimiento puntual y manejo confidencial para decisiones operativas, comerciales y técnicas.",
    primaryCta: "Hablar con un asesor",
    secondaryCta: "Explorar servicios",
    trustMetrics: [
      { value: "25+ años", label: "Experiencia en coordinación y servicios aeronáuticos" },
      { value: "50+", label: "Transacciones de aeronaves gestionadas" },
      { value: "24/7", label: "Respuesta para requerimientos prioritarios" },
      { value: "MX · GLOBAL", label: "Cobertura regional para aviación ejecutiva" },
    ],
    storyEyebrow: "POR QUÉ SKY GROUP",
    storyTitle: "Soporte Especializado para Cada Operación.",
    storyLead:
      "Desde la coordinación de vuelos privados hasta transacciones de aeronaves, componentes y soporte aeronáutico especializado, cada requerimiento se gestiona con precisión mediante un punto de contacto dedicado.",
    storyText:
      "Integramos coordinación comercial, técnica y documental para reducir complejidad, mantener visibilidad y facilitar decisiones aeronáuticas de alto valor.",
    storyVisualLabel: "Soporte de aviación ejecutiva",
    storyVisualTitle: "Precisa. Profesionalmente coordinada.",
    storyVisualText:
      "Soporte para ejecutivos, propietarios, operadores y family offices que requieren claridad operativa, confidencialidad y capacidad real de coordinación.",
    storyPoints: [
      { icon: "check", title: "Soluciones integradas", text: "Un solo punto de contacto para vuelos privados, aeronaves, componentes y soporte especializado." },
      { icon: "network", title: "Coordinación aeronáutica", text: "Las áreas comerciales, técnicas y documentales avanzan alineadas de principio a fin." },
      { icon: "concierge", title: "Atención con criterio ejecutivo", text: "Seguimiento directo con un asesor para decisiones sensibles o de alto valor." },
      { icon: "hangar", title: "Capacidad especializada", text: "Servicios orientados a continuidad operacional, trazabilidad y cumplimiento." },
      { icon: "support", title: "Respuesta cuando importa", text: "Gestión precisa para requerimientos urgentes, confidenciales o técnicamente complejos." },
    ],
    solutionsEyebrow: "SOLUCIONES",
    solutionsTitle: "Servicios Aeronáuticos Especializados.",
    solutionsLead: "Capacidades integradas para aviación privada, transacciones de aeronaves, componentes y soporte operacional.",
    solutions: [
      {
        title: "Vuelos privados",
        text: "Vuelos privados coordinados según su itinerario, perfil de misión y requerimientos operacionales.",
        cta: "Explorar vuelos privados ->",
        external: true,
        href: "https://redskyg.com/landing/es-mx/reserva",
        image: "/images/Home/IMG_0894.jpeg",
        visualImage: "/images/Home/IMG_0894.jpeg",
        visualAlt: "Jet ejecutivo de SkyGroup",
      },
      {
        title: "Venta de aeronaves",
        text: "Asesoría especializada para adquisición, comercialización y gestión de transacciones de aeronaves.",
        cta: "Explorar transacciones ->",
        external: true,
        href: "https://redskyg.com/sellyouraircraf/en-us",
        image: "/images/Home/image.png",
        visualImage: "/images/Home/image.png",
        visualAlt: "Venta de aeronaves SkyGroup",
      },
      {
        title: "Partes aeronáuticas",
        text: "Suministro de componentes aeronáuticos con trazabilidad documental, coordinación logística y soporte especializado.",
        cta: "Solicitar componente ->",
        external: true,
        href: "https://redaviationcorp.com/servicios/venta-partes",
        image: "/images/Home/ALmacen 1.jpg",
        visualImage: "/images/Home/ALmacen 1.jpg",
        visualAlt: "Partes aeronáuticas SkyGroup",
      },
      {
        title: "Servicios aeronáuticos",
        text: "Soporte técnico y operativo para inspecciones, mantenimiento, documentación y requerimientos aeronáuticos especializados.",
        cta: "Solicitar soporte ->",
        route: "OperationsManagement",
        image: "/images/Home/IMG_1031.jpeg",
        visualImage: "/images/Home/IMG_1031.jpeg",
        visualAlt: "Servicios aeronáuticos SkyGroup",
      },
    ],
    platformEyebrow: "BENEFICIOS CLAVE",
    platformTitle: "Lo que aporta una coordinación centralizada.",
    platformLead:
      "Menos fragmentación, mejor trazabilidad y mayor control sobre cada requerimiento aeronáutico.",
    platformBenefits: [
      { title: "Un solo punto de contacto", text: "Centralizamos coordinación comercial, técnica y documental en una sola conversación." },
      { title: "Seguimiento con visibilidad", text: "Cada etapa avanza con claridad para reducir vacíos de información y mejorar trazabilidad." },
      { title: "Respuesta más eficiente", text: "Reducimos tiempos de ida y vuelta para acelerar evaluación, aprobación y ejecución." },
      { title: "Confidencialidad y criterio", text: "Cada requerimiento se atiende con discreción, precisión y soporte especializado." },
    ],
    needsEyebrow: "REQUERIMIENTOS FRECUENTES",
    needsTitle: "Cómo podemos apoyarle.",
    needsCards: [
      {
        title: "Coordinar un vuelo privado",
        text: "Comparta ruta, pasajeros y ventana de salida para revisar disponibilidad real y perfil de aeronave adecuado.",
        cta: "Solicitar cotización",
        route: "AirTaxi",
        image: "/images/Home/IMG_1511.jpeg",
      },
      {
        title: "Adquirir o colocar una aeronave",
        text: "Definimos perfil de misión, alcance, configuración y objetivo de compra o venta antes de avanzar al mercado.",
        cta: "Solicitar asesoría",
        route: "AircraftSales",
        image: "/images/Home/IMG_0025.jpg",
      },
      {
        title: "Localizar un componente",
        text: "Localizamos componentes aeronáuticos y validamos disponibilidad, condición y trazabilidad documental.",
        cta: "Solicitar componente",
        route: "ImportExport",
        image: "/images/Home/IMG_1511.png",
        mediaClass: "need-media-components",
      },
      {
        title: "Solicitar soporte aeronáutico",
        text: "Canalizamos soporte técnico, inspecciones, mantenimiento y requerimientos especiales con coordinación clara y seguimiento puntual.",
        cta: "Solicitar soporte",
        route: "OperationsManagement",
        image: "/images/Home/IMG_1138.jpg",
      },
    ],
    mediaEyebrow: "SKYGROUP EN VIDEO",
    mediaTitle: "Perspectiva del sector en contexto.",
    mediaLead: "Contenido visual sobre aeronaves, operaciones y actividad comercial dentro de la aviación ejecutiva.",
    mediaCta: "Ver canal de YouTube",
    testimonialsEyebrow: "RESULTADOS",
    testimonialsTitle: "Indicadores que respaldan la confianza.",
    testimonialsLead: "La confianza se construye con referencias concretas y una ejecución consistente.",
    testimonials: [
      {
        value: "25+",
        title: "Años de trayectoria en aviación",
        text: "Experiencia aplicada en vuelos privados, transacciones de aeronaves y soporte aeronáutico especializado.",
      },
      {
        value: "50+",
        title: "Aeronaves comercializadas",
        text: "Procesos gestionados con enfoque comercial, revisión técnica y coordinación documental.",
      },
      {
        value: "24/7",
        title: "Soporte operativo disponible",
        text: "Atención continua para requerimientos urgentes, sensibles o críticos para la operación.",
      },
    ],
    finalEyebrow: "SIGUIENTE PASO",
    finalTitle: "Su operación, coordinada de principio a fin.",
    finalText:
      "Comparta su requerimiento y coordinaremos la solución adecuada con seguimiento claro, respuesta puntual y respaldo especializado.",
    finalPrimaryCta: "Hablar con un asesor",
    finalSecondaryCta: "Explorar servicios",
    contactTitle: "Un solo punto de contacto para cada requerimiento.",
    contactText: "Comparta su ruta, aeronave, componente o necesidad técnica y coordinaremos la respuesta adecuada para su operación.",
    contactCta: "Hablar con un asesor",
  },
  en: {
    heroAlt: "Executive aircraft parked on an apron at sunset",
    heroEyebrow: "SKY GROUP",
    heroTitle: "Integrated Solutions for Executive Aviation.",
    heroLead:
      "We coordinate private flights, aircraft transactions, component sourcing, and specialized support through a single point of contact.",
    heroSignalLabel: "Centralized Coordination",
    heroSignalTitle: "One team for every aviation requirement.",
    heroSignalText:
      "Responsive support, clear follow-up, and discreet handling for commercial, operational, and technical matters.",
    primaryCta: "Speak with an Advisor",
    secondaryCta: "Explore Services",
    trustMetrics: [
      { value: "25+ Years", label: "Experience in aviation coordination and services" },
      { value: "50+", label: "Aircraft transactions managed" },
      { value: "Priority", label: "Responsive handling for time-sensitive requirements" },
      { value: "MX · GLOBAL", label: "Coverage for executive aviation requirements across key markets" },
    ],
    storyEyebrow: "WHY SKY GROUP",
    storyTitle: "Specialized Support for Every Mission.",
    storyLead:
      "From private flight coordination to aircraft transactions, component sourcing, and specialized aviation support, each requirement is managed through a dedicated point of contact.",
    storyText:
      "We integrate commercial, technical, and documentation coordination to reduce complexity, maintain visibility, and support high-value aviation decisions.",
    storyVisualLabel: "Executive Aviation Support",
    storyVisualTitle: "Precise. Discreet. Professionally coordinated.",
    storyVisualText:
      "Support for executives, operators, aircraft owners and family offices that require operational clarity, discretion and real coordination capability.",
    storyPoints: [
      { icon: "check", title: "Integrated solutions", text: "A single point of contact for flights, aircraft transactions, components, and specialized support." },
      { icon: "network", title: "Aviation coordination", text: "Commercial, technical, and documentation workflows stay aligned from start to finish." },
      { icon: "concierge", title: "Executive-level guidance", text: "Direct follow-up through an advisor for sensitive or high-value decisions." },
      { icon: "hangar", title: "Specialized capability", text: "Services built around operational continuity, traceability and compliance." },
      { icon: "support", title: "Support when it matters", text: "Precise coordination for urgent, confidential or complex requirements." },
    ],
    solutionsEyebrow: "SOLUTIONS",
    solutionsTitle: "Specialized Aviation Services.",
    solutionsLead: "Integrated capabilities for private aviation, aircraft transactions, components and operational support.",
    solutions: [
      {
        title: "Private Charter",
        text: "Private flights coordinated around your itinerary, mission profile and operational requirements.",
        cta: "Explore Charter ->",
        route: "AirTaxi",
        image: "/images/Home/IMG_0894.jpeg",
        visualImage: "/images/Home/IMG_0894.jpeg",
        visualAlt: "SkyGroup executive jet",
      },
      {
        title: "Aircraft Sales",
        text: "Specialized support for aircraft acquisition, sale-side positioning and transaction management.",
        cta: "Explore Aircraft Sales ->",
        route: "AircraftSales",
        image: "/images/Home/image.png",
        visualImage: "/images/Home/image.png",
        visualAlt: "SkyGroup aircraft sales",
      },
      {
        title: "Aircraft Parts",
        text: "Aircraft components sourced with documented traceability, logistics coordination, and specialized support.",
        cta: "Request Components ->",
        route: "ImportExport",
        image: "/images/Home/ALmacen 1.jpg",
        visualImage: "/images/Home/ALmacen 1.jpg",
        visualAlt: "SkyGroup aeronautical parts",
      },
      {
        title: "Aviation Services",
        text: "Technical and operational support for inspections, maintenance, documentation and specialized aviation requirements.",
        cta: "Request Support ->",
        route: "OperationsManagement",
        image: "/images/Home/IMG_1031.jpeg",
        visualImage: "/images/Home/IMG_1031.jpeg",
        visualAlt: "SkyGroup aeronautical services",
      },
    ],
    platformEyebrow: "CORE BENEFITS",
    platformTitle: "What centralized coordination provides.",
    platformLead:
      "Less fragmentation, stronger traceability and greater control over every aviation requirement.",
    platformBenefits: [
      { title: "Single Point of Contact", text: "Commercial, technical, and documentation coordination stays within one conversation." },
      { title: "Follow-up with visibility", text: "Each stage moves with clear status and fewer information gaps." },
      { title: "Faster execution", text: "We reduce back-and-forth so evaluation, approval and action move faster." },
      { title: "Confidentiality and judgment", text: "Every requirement is handled with discretion, precision and specialized support." },
    ],
    needsEyebrow: "COMMON STARTING POINTS",
    needsTitle: "How we can support you.",
    needsCards: [
      {
        title: "Coordinate a private flight",
        text: "Share your route, passenger count, and departure window so we can review current availability and aircraft fit.",
        cta: "Request Flight Options",
        route: "AirTaxi",
        image: "/images/Home/IMG_1511.jpeg",
      },
      {
        title: "Acquire or sell an aircraft",
        text: "We define mission profile, range, configuration, and transaction objectives before taking the next market step.",
        cta: "Request Advisory",
        route: "AircraftSales",
        image: "/images/Home/IMG_0025.jpg",
      },
      {
        title: "Source aircraft components",
        text: "We source aviation components and review availability, condition, and documentation traceability.",
        cta: "Request Components",
        route: "ImportExport",
        image: "/images/Home/IMG_1511.png",
        mediaClass: "need-media-components",
      },
      {
        title: "Request aviation support",
        text: "We coordinate technical support, inspections, maintenance and specialized requirements with clear follow-up.",
        cta: "Request Support",
        route: "OperationsManagement",
        image: "/images/Home/IMG_1138.jpg",
      },
    ],
    mediaEyebrow: "SKYGROUP ON VIDEO",
    mediaTitle: "Executive aviation in context.",
    mediaLead: "Visual content covering aircraft, operations, and market activity across executive aviation.",
    mediaCta: "View YouTube channel",
    testimonialsEyebrow: "RESULTS",
    testimonialsTitle: "Indicators that reinforce confidence.",
    testimonialsLead: "Trust is reinforced through real experience and consistent execution.",
    testimonials: [
      {
        value: "25+",
        title: "Years in aviation coordination",
        text: "Applied across private flights, aircraft transactions and specialized aviation support.",
      },
      {
        value: "50+",
        title: "Aircraft transactions managed",
        text: "Commercial processes supported by technical review and documentation coordination.",
      },
      {
        value: "24/7",
        title: "Operational support",
        text: "Continuous support for urgent, sensitive or operationally critical requirements.",
      },
    ],
    finalEyebrow: "NEXT STEP",
    finalTitle: "Your operation, coordinated from start to finish.",
    finalText:
      "Tell us about your requirement and we will coordinate the right solution with clear follow-up, responsive execution, and specialized support.",
    finalPrimaryCta: "Speak with an Advisor",
    finalSecondaryCta: "Explore Services",
    contactTitle: "One point of contact for every requirement.",
    contactText: "Share your route, aircraft, component, or technical requirement and we will coordinate the right response for your mission.",
    contactCta: "Speak with an Advisor",
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

.final-shell {
  grid-template-columns: minmax(320px, 0.68fr) minmax(620px, 1.32fr);
  gap: 5.5rem;
}

.hero-copy,
.media-lead,
.final-copy {
  max-width: 620px;
}

.final-copy {
  max-width: 540px;
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
  align-items: center;
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

.need-media.need-media-components img {
  object-position: center 32%;
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
  background: url("/images/Home/IMG_0826.jpeg") center/cover no-repeat;
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
.testimonial-copy strong {
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

.testimonials-list {
  gap: 1rem;
}

.testimonial-row {
  grid-template-columns: 150px minmax(0, 1fr);
  gap: 1.25rem;
  padding: 1.4rem 1.5rem;
  border-radius: 24px;
  border: 1px solid rgba(215, 176, 116, 0.14);
  background:
    linear-gradient(180deg, rgba(11, 21, 34, 0.9), rgba(8, 16, 27, 0.92)),
    radial-gradient(circle at top right, rgba(215, 176, 116, 0.08), transparent 28%);
}

.testimonial-value {
  color: #e7c58a;
  font-family: var(--font-heading);
  font-size: clamp(2rem, 4vw, 3.2rem);
  line-height: 0.92;
}

.testimonial-copy {
  display: grid;
  gap: 0.45rem;
}

.testimonial-copy p {
  margin: 0;
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

  .hero-signal-card {
    width: 100%;
  }
}

/* Aviation editorial system: strong direction, clear service paths, quiet confidence. */
.home-page {
  --sky-ink: #04111d;
  --sky-panel: #092236;
  --sky-panel-light: #103550;
  --sky-gold: #deb96a;
  --sky-ivory: #f8f3e9;
  background:
    radial-gradient(circle at 92% 9%, rgba(222, 185, 106, 0.14), transparent 28rem),
    radial-gradient(circle at 8% 42%, rgba(31, 101, 137, 0.15), transparent 34rem),
    var(--sky-ink);
}

.section {
  padding: clamp(5.5rem, 10vw, 9.5rem) 0;
}

.section::before {
  width: min(calc(100% - 3rem), 1400px);
  background: linear-gradient(90deg, transparent, rgba(222, 185, 106, 0.5) 18%, rgba(222, 185, 106, 0.5) 82%, transparent);
}

.eyebrow {
  color: var(--sky-gold);
  letter-spacing: 0.32em;
}

.home-hero {
  min-height: min(980px, 100svh);
  padding: 0;
}

.home-hero .hero-copy {
  animation: homeRise 900ms 120ms both cubic-bezier(0.16, 1, 0.3, 1);
}

.home-hero .hero-visual {
  animation: homeRise 900ms 300ms both cubic-bezier(0.16, 1, 0.3, 1);
}

.home-hero::after {
  content: "";
  position: absolute;
  z-index: 1;
  top: 0;
  right: clamp(2.5rem, 10vw, 11rem);
  width: 1px;
  height: 100%;
  background: linear-gradient(180deg, transparent 12%, rgba(222, 185, 106, 0.65) 42%, rgba(222, 185, 106, 0.2) 80%, transparent);
}

.hero-background {
  object-position: center 48%;
  filter: saturate(0.82) contrast(1.05);
  animation: homeHeroDrift 18s ease-in-out infinite alternate;
}

.hero-background-overlay {
  background:
    linear-gradient(90deg, rgba(2, 11, 19, 0.96) 0%, rgba(2, 11, 19, 0.82) 42%, rgba(2, 11, 19, 0.27) 82%),
    linear-gradient(0deg, rgba(2, 11, 19, 0.9), transparent 44%);
}

.hero-shell {
  min-height: min(980px, 100svh);
  grid-template-columns: minmax(0, 1.15fr) minmax(290px, 0.48fr);
  gap: clamp(2rem, 8vw, 9rem);
  align-items: end;
  padding-top: 10rem;
  padding-bottom: clamp(3.25rem, 7vw, 6rem);
}

.hero-copy {
  padding: 0;
}

.hero-copy h1 {
  max-width: 800px;
  font-size: clamp(3.3rem, 6.3vw, 6.4rem);
  line-height: 0.94;
  letter-spacing: -0.045em;
}

.hero-lead {
  max-width: 48ch;
  font-size: clamp(1.05rem, 1.4vw, 1.22rem);
}

.btn-primary,
.btn-secondary {
  min-height: 56px;
  border-radius: 2px;
}

.btn-primary {
  background: linear-gradient(135deg, #d2a94f, #f0d595);
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.22);
}

.btn-secondary {
  background: rgba(3, 15, 25, 0.62);
  border-color: rgba(248, 243, 233, 0.32);
}

.hero-proof-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;
  max-width: 760px;
  margin-top: 3rem;
  border-top: 1px solid rgba(222, 185, 106, 0.44);
  border-bottom: 1px solid rgba(222, 185, 106, 0.24);
}

.hero-proof-card {
  min-height: 112px;
  padding: 1.2rem 1rem;
  border: 0;
  border-radius: 0;
  background: rgba(4, 17, 29, 0.36);
  box-shadow: none;
  animation: homeFade 700ms both cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-proof-card:nth-child(1) { animation-delay: 420ms; }
.hero-proof-card:nth-child(2) { animation-delay: 500ms; }
.hero-proof-card:nth-child(3) { animation-delay: 580ms; }
.hero-proof-card:nth-child(4) { animation-delay: 660ms; }

.hero-proof-card + .hero-proof-card {
  border-left: 1px solid rgba(222, 185, 106, 0.24);
}

.hero-proof-card strong {
  color: var(--sky-gold);
  font-family: var(--font-heading);
  font-size: 1.45rem;
  font-weight: 500;
}

.hero-visual-stage {
  width: 100%;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: none;
  box-shadow: none;
  backdrop-filter: none;
}

.hero-visual-stage::before,
.hero-visual-stage::after {
  display: none;
}

.hero-aside-panel {
  padding: 1.75rem;
  border-radius: 0;
  border-color: rgba(222, 185, 106, 0.46);
  background: linear-gradient(145deg, rgba(4, 20, 32, 0.94), rgba(13, 47, 68, 0.78));
}

.hero-signal-card {
  width: calc(100% - 1.5rem);
  margin-top: 0;
  padding: 1.3rem 1.4rem;
  border-radius: 0;
  background: #deb96a;
  border: 0;
}

.hero-signal-label,
.hero-signal-card strong,
.hero-signal-card p {
  color: #071725;
}

.story-shell {
  grid-template-columns: minmax(0, 0.78fr) minmax(0, 1.22fr);
  gap: clamp(3rem, 9vw, 10rem);
}

.story-copy h2,
.section-lead h2,
.media-lead h2,
.testimonials-head h2,
.final-copy h2,
.quick-contact-shell h2 {
  font-size: clamp(2.5rem, 4.6vw, 4.85rem);
  line-height: 1.02;
}

.story-image {
  aspect-ratio: 16 / 8;
  border-radius: 0;
  clip-path: polygon(6% 0, 100% 0, 94% 100%, 0 100%);
}

.story-points {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px;
  margin-top: 1.4rem;
  border: 1px solid rgba(222, 185, 106, 0.3);
  background: rgba(222, 185, 106, 0.3);
}

.story-point {
  min-height: 150px;
  padding: 1.25rem;
  border: 0;
  background: #082033;
}

.solutions-section {
  background: linear-gradient(180deg, rgba(9, 36, 55, 0.78), rgba(4, 17, 29, 0.92));
}

.solutions-stream {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px;
  border: 1px solid rgba(222, 185, 106, 0.32);
  background: rgba(222, 185, 106, 0.32);
}

.solution-row,
.solution-row.reverse {
  grid-template-columns: minmax(0, 1fr);
  gap: 1.5rem;
  min-height: 480px;
  padding: 0;
  border: 0;
  background: #071b2b;
}

.solution-row.reverse .solution-copy,
.solution-row.reverse .solution-media {
  order: initial;
}

.solution-copy {
  max-width: none;
  padding: 2rem 2rem 0;
}

.solution-title {
  font-size: clamp(2rem, 3vw, 3.2rem);
}

.solution-media {
  aspect-ratio: 16 / 7;
  margin-top: auto;
  border-radius: 0;
}

.solution-row:hover {
  background: #0b2a40;
}

.solution-row:hover .solution-media img,
.need-row:hover .need-media img,
.final-media:hover img {
  transform: scale(1.055);
}

.solution-media img,
.need-media img,
.final-media img {
  transition: transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
}

.platform-section {
  background: #deb96a;
  color: #061421;
}

.platform-section .eyebrow,
.platform-number {
  color: #745217;
}

.platform-section :is(h2, h3, p) {
  color: #061421;
}

.platform-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  max-width: none;
  border-top: 1px solid rgba(6, 20, 33, 0.35);
}

.platform-item {
  min-height: 175px;
  padding: 1.65rem 1.8rem;
  border-bottom: 1px solid rgba(6, 20, 33, 0.28);
}

.platform-item:nth-child(odd) {
  border-right: 1px solid rgba(6, 20, 33, 0.28);
}

.needs-stream {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}

.need-row,
.need-row.reverse {
  grid-template-columns: 1fr;
  gap: 0;
  padding: 0;
  border: 1px solid rgba(222, 185, 106, 0.25);
  background: #082033;
}

.need-row.reverse .need-copy,
.need-row.reverse .need-media {
  order: initial;
}

.need-copy {
  min-height: 275px;
  padding: 1.55rem;
}

.need-title {
  font-size: clamp(1.6rem, 2.1vw, 2.15rem);
}

.need-media {
  aspect-ratio: 4 / 2.8;
  border-radius: 0;
}

.media-layout,
.testimonials-shell,
.final-shell {
  gap: clamp(3rem, 8vw, 8rem);
}

.media-section {
  background: linear-gradient(180deg, #061421, #0a263a);
}

.media-feature,
.media-mini {
  border-radius: 0;
  border-color: rgba(222, 185, 106, 0.3);
}

.testimonials-list {
  gap: 0;
  border-top: 1px solid rgba(222, 185, 106, 0.35);
}

.testimonial-row {
  border-radius: 0;
  border: 0;
  border-bottom: 1px solid rgba(222, 185, 106, 0.26);
  background: transparent;
}

.final-media {
  border-radius: 0;
  clip-path: polygon(0 0, 100% 0, 93% 100%, 7% 100%);
}

.quick-contact-section {
  padding-top: 0;
  padding-bottom: 4rem;
}

.quick-contact-shell {
  padding: 2.5rem;
  border: 1px solid rgba(222, 185, 106, 0.4);
  background: linear-gradient(110deg, #0d3149, #071b2b);
}

.quick-contact-shell::after {
  content: "";
  width: 12px;
  height: 12px;
  flex: 0 0 12px;
  border: 1px solid var(--sky-gold);
  transform: rotate(45deg);
  box-shadow: 0 0 18px rgba(222, 185, 106, 0.52);
  animation: homeBeacon 2.8s ease-in-out infinite;
}

@keyframes homeRise {
  from {
    opacity: 0;
    transform: translateY(34px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes homeFade {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes homeHeroDrift {
  from { transform: scale(1.035) translate3d(-0.4%, 0, 0); }
  to { transform: scale(1.075) translate3d(0.4%, -0.8%, 0); }
}

@keyframes homeBeacon {
  0%, 100% { opacity: 0.45; box-shadow: 0 0 8px rgba(222, 185, 106, 0.26); }
  50% { opacity: 1; box-shadow: 0 0 24px rgba(222, 185, 106, 0.72); }
}

@media (prefers-reduced-motion: reduce) {
  .home-hero .hero-copy,
  .home-hero .hero-visual,
  .hero-proof-card,
  .quick-contact-shell::after {
    animation: none !important;
  }

  .solution-media img,
  .need-media img,
  .final-media img {
    transition: none !important;
  }
}

@media (max-width: 1180px) {
  .home-hero::after {
    display: none;
  }

  .hero-shell,
  .story-shell {
    grid-template-columns: 1fr;
  }

  .hero-shell {
    min-height: auto;
  }

  .hero-visual {
    max-width: 540px;
  }

  .needs-stream {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .hero-shell {
    padding-top: 8rem;
  }

  .hero-proof-grid,
  .solutions-stream,
  .story-points,
  .platform-list,
  .needs-stream {
    grid-template-columns: 1fr;
  }

  .hero-proof-card + .hero-proof-card,
  .platform-item:nth-child(odd) {
    border-top: 1px solid rgba(222, 185, 106, 0.24);
    border-left: 0;
    border-right: 0;
  }

  .solution-row,
  .solution-row.reverse {
    min-height: auto;
  }

  .platform-item {
    border-right: 0;
  }

  .quick-contact-shell {
    padding: 1.5rem;
  }
}

/* Keep the common starting points as the original alternating consultation flow. */
.needs-stream {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
}

.need-row,
.need-row.reverse {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(380px, 1.1fr);
  gap: 3.5rem;
  align-items: center;
  padding: 5rem 0;
  border: 0;
  border-bottom: 1px solid rgba(212, 175, 95, 0.18);
  background: transparent;
}

.need-row.reverse {
  grid-template-columns: minmax(380px, 1.1fr) minmax(0, 0.9fr);
}

.need-row.reverse .need-copy {
  order: 2;
}

.need-row.reverse .need-media {
  order: 1;
}

.need-copy {
  min-height: 0;
  max-width: 470px;
  padding: 0;
}

.need-title {
  font-size: clamp(2.4rem, 4vw, 4rem);
}

.need-media {
  aspect-ratio: 16 / 10;
  border-radius: 22px;
}

@media (max-width: 920px) {
  .need-row,
  .need-row.reverse {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .need-row.reverse .need-copy,
  .need-row.reverse .need-media {
    order: initial;
  }
}

@media (max-width: 720px) {
  .need-row,
  .need-row.reverse {
    padding: 3rem 0;
  }
}

/* Keep the solutions directory in its original alternating, image-led format. */
.solutions-section {
  background: transparent;
}

.solutions-stream {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  border: 0;
  background: transparent;
}

.solution-row,
.solution-row.reverse {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(380px, 1.1fr);
  gap: 3.5rem;
  align-items: center;
  min-height: 0;
  padding: 5rem 0;
  border: 0;
  border-bottom: 1px solid rgba(212, 175, 95, 0.18);
  background: transparent;
}

.solution-row.reverse {
  grid-template-columns: minmax(380px, 1.1fr) minmax(0, 0.9fr);
}

.solution-row.reverse .solution-copy {
  order: 2;
}

.solution-row.reverse .solution-media {
  order: 1;
}

.solution-copy {
  max-width: 470px;
  padding: 0;
}

.solution-title {
  font-size: clamp(2.4rem, 4vw, 4rem);
}

.solution-media {
  aspect-ratio: 16 / 10;
  margin-top: 0;
  border-radius: 22px;
}

.solution-row:hover {
  background: transparent;
}

@media (max-width: 920px) {
  .solution-row,
  .solution-row.reverse {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .solution-row.reverse .solution-copy,
  .solution-row.reverse .solution-media {
    order: initial;
  }
}

@media (max-width: 720px) {
  .solution-row,
  .solution-row.reverse {
    padding: 3rem 0;
  }
}
</style>
