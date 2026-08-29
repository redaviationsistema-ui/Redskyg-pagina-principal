<template>
  <section class="about-page">
    <section class="about-hero">
      <div class="hero-overlay"></div>

      <div class="container hero-shell">
        <div class="hero-copy reveal">
          <span class="eyebrow">{{ content.heroEyebrow }}</span>
          <h1>{{ content.heroTitle }}</h1>
          <p>{{ content.heroText }}</p>

          <div class="hero-actions">
            <RouterLink class="btn-primary" :to="toLocalizedRoute('Contact')">{{ content.heroPrimaryCta }}</RouterLink>
            <RouterLink class="btn-ghost" :to="toLocalizedRoute('AirTaxi')">{{ content.heroSecondaryCta }}</RouterLink>
          </div>
        </div>

        <div class="hero-side reveal reveal-delay">
          <div class="hero-side-panel">
            <article v-for="(item, index) in metrics" :key="item.label" class="hero-metric">
              <div class="icon-badge is-metric">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path :d="metricIcons[index % metricIcons.length]" />
                </svg>
              </div>
              <div>
                <strong>{{ item.value }}</strong>
                <span>{{ item.label }}</span>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="section intro-section">
      <div class="container intro-grid">
        <div class="intro-copy reveal">
          <span class="eyebrow">{{ content.introEyebrow }}</span>
          <h2>{{ content.introTitle }}</h2>
        </div>

        <div class="intro-text reveal reveal-delay">
          <p>{{ content.introParagraphs[0] }}</p>
          <p>{{ content.introParagraphs[1] }}</p>
        </div>
      </div>
    </section>

    <section class="section experience-section">
      <img
        src="/images/About/IMG_0910.jpeg"
        :alt="content.experienceAlt"
        class="experience-bg"
        loading="lazy"
        decoding="async"
      />
      <div class="experience-overlay"></div>

      <div class="container experience-shell">
        <div class="experience-copy reveal">
          <span class="eyebrow">{{ content.experienceEyebrow }}</span>
          <h2>{{ content.experienceTitle }}</h2>
          <p>{{ content.experienceText }}</p>
        </div>
      </div>
    </section>

    <section class="section pillars-section">
      <div class="container">
        <div class="pillar-lines">
          <article
            v-for="(pillar, index) in pillars"
            :key="pillar.title"
            class="pillar-line reveal"
            :style="{ transitionDelay: `${index * 120}ms` }"
          >
            <div class="pillar-mark">
              <div class="icon-badge is-pillar">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path :d="pillarIcons[index % pillarIcons.length]" />
                </svg>
              </div>
            </div>
            <div class="pillar-content">
              <h3>{{ pillar.title }}</h3>
              <p>{{ pillar.text }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section capabilities-section">
      <div class="container capabilities-hero reveal">
        <div class="section-head capabilities-head">
          <span class="eyebrow">{{ content.capabilitiesEyebrow }}</span>
          <h2>{{ content.capabilitiesTitle }}</h2>
        </div>

        <div class="capabilities-visual reveal-delay">
          <img
            src="/images/About/about2.jpg"
            :alt="content.capabilitiesAlt"
            class="capabilities-image"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <div class="container capabilities-stream">
        <RouterLink
          v-for="(service, index) in services"
          :key="service.route"
          :to="toLocalizedRoute(service.route)"
          class="capability-row reveal"
          :class="{ reverse: index % 2 === 1 }"
          :style="{ transitionDelay: `${index * 90}ms` }"
        >
          <div class="capability-copy">
            <span class="capability-number">{{ String(index + 1).padStart(2, '0') }}</span>
            <h3>{{ service.title }}</h3>
            <p>{{ service.text }}</p>
            <strong>{{ content.capabilitiesCta }}</strong>
          </div>

          <div class="capability-icon">
            <div class="icon-badge is-capability">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path :d="capabilityIcons[index % capabilityIcons.length]" />
              </svg>
            </div>
          </div>
        </RouterLink>
      </div>
    </section>

    <section class="section strategy-section">
      <div class="container strategy-shell reveal">
        <div class="strategy-copy">
          <span class="eyebrow">{{ content.strategyEyebrow }}</span>
          <h2>{{ content.strategyTitle }}</h2>
          <p>{{ content.strategyText }}</p>
          <div class="strategy-marker">
            <span>{{ content.strategyMarkerEyebrow }}</span>
            <strong>{{ content.strategyMarkerText }}</strong>
          </div>
        </div>

        <div class="strategy-visual">
          <img
            src="/images/About/about3.png"
            :alt="content.strategyImageAlt"
            class="strategy-image"
            loading="lazy"
            decoding="async"
          />
          <div class="strategy-badge">
            <span>{{ content.strategyBadgeEyebrow }}</span>
            <strong>{{ content.strategyBadgeText }}</strong>
          </div>
        </div>
      </div>
    </section>

    <section class="section metrics-section">
      <div class="container metrics-ribbon reveal">
        <article v-for="item in metrics" :key="item.label" class="metric-block">
          <strong>{{ item.value }}</strong>
          <span>{{ item.label }}</span>
        </article>
      </div>
    </section>

    <section class="section journey-section">
      <div class="container">
        <div class="section-head center reveal">
          <span class="eyebrow">{{ content.journeyEyebrow }}</span>
          <h2>{{ content.journeyTitle }}</h2>
          <p class="journey-lead">{{ content.journeyText }}</p>
        </div>

        <div class="journey-actions reveal reveal-delay">
          <RouterLink class="btn-primary" :to="toLocalizedRoute('Contact')">{{ content.journeyPrimaryCta }}</RouterLink>
          <a class="btn-ghost" :href="journeyWhatsappHref" target="_blank" rel="noopener noreferrer">{{ content.journeySecondaryCta }}</a>
        </div>

        <div class="timeline">
          <article
            v-for="(item, index) in timeline"
            :key="item.title"
            class="timeline-row reveal"
            :style="{ transitionDelay: `${index * 110}ms` }"
          >
            <div class="timeline-stage">
              <div class="icon-badge is-timeline">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path :d="timelineIcons[index % timelineIcons.length]" />
                </svg>
              </div>
              <span>{{ item.stage }}</span>
            </div>
            <div class="timeline-copy">
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </div>
          </article>
        </div>

        <p class="journey-footnote reveal">{{ content.journeyFootnote }}</p>
      </div>
    </section>

    <section class="section final-cta">
      <div class="container cta-shell reveal">
        <div>
          <span class="eyebrow">{{ content.finalEyebrow }}</span>
          <h2>{{ content.finalTitle }}</h2>
          <p>{{ content.finalText }}</p>
        </div>

        <div class="hero-actions">
          <RouterLink class="btn-primary" :to="toLocalizedRoute('Contact')">{{ content.finalPrimaryCta }}</RouterLink>
          <RouterLink class="btn-ghost dark" :to="toLocalizedRoute('Pricing')">{{ content.finalSecondaryCta }}</RouterLink>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { useLocale } from "../i18n";

const { locale, toLocalizedRoute } = useLocale();
const metricIcons = [
  "M12 3v18M3 12h18",
  "M4 18h16M7 14l3-3 3 2 4-5",
  "M5 19V8l7-4 7 4v11",
];
const pillarIcons = [
  "M12 3 4 7v5c0 5 3.4 7.9 8 9 4.6-1.1 8-4 8-9V7l-8-4Z",
  "M4 12h6m-3-3 3 3-3 3m6-7h5v8h-5",
  "M6 18V8l6-4 6 4v10M9 12h6M9 15h4",
];
const capabilityIcons = [
  "M3 17l9-11 9 11M6 17h12",
  "M4 18h16M6 18l2-8h8l2 8",
  "M5 12h14M7 8h10M9 16h6",
  "M12 4v16M5 11l7-7 7 7",
  "M4 7h16M6 12h12M8 17h8",
  "M5 19V8l7-4 7 4v11",
];
const timelineIcons = [
  "M5 12h5m-2-2 2 2-2 2m4-6h7m-7 8h7",
  "M12 4v4m0 8v4m8-8h-4M8 12H4",
  "M4 12c2-4.5 5-6.75 8-6.75S18 7.5 20 12c-2 4.5-5 6.75-8 6.75S6 16.5 4 12",
  "M5 12 9 16 19 6",
];

const journeyWhatsappHref = computed(() =>
  locale.value === "en"
    ? "https://wa.me/525586186576?text=Hello,%20I%20need%20immediate%20private%20aviation%20availability.%20Could%20the%20Sky%20Group%20team%20assist%20me%3F"
    : "https://wa.me/525586186576?text=Hola,%20necesito%20disponibilidad%20inmediata%20de%20aviaci%C3%B3n%20privada.%20%C2%BFMe%20puede%20apoyar%20el%20equipo%20de%20Sky%20Group%3F"
);

const content = computed(() =>
  locale.value === "en"
    ? {
        heroEyebrow: "Sky Group",
        heroTitle:
          "Integrated support for executive aviation.",
        heroText:
          "Sky Group coordinates private flights, aircraft transactions, operational support and technical follow-up through a single aviation point of contact.",
        heroPrimaryCta: "Speak with an Advisor",
        heroSecondaryCta: "Explore Private Charter",
        introEyebrow: "Who We Are",
        introTitle:
          "Executive aviation support with commercial, technical and operational judgment.",
        introParagraphs: [
          "We integrate private charter, aircraft sourcing, transaction support and technical coordination under one operating structure. This reduces fragmentation and gives clients a clearer path from inquiry to execution.",
          "Owners, operators and flight departments work with one team that understands mission requirements, aircraft positioning, technical review, documentation flow and commercial timing.",
        ],
        experienceAlt: "Executive aviation environment",
        experienceEyebrow: "How We Work",
        experienceTitle: "Aviation support with execution discipline.",
        experienceText:
          "We align commercial coordination, operational control and regulatory follow-up so each requirement advances with clearer scope, faster response and stronger execution quality.",
        capabilitiesEyebrow: "Core Capabilities",
        capabilitiesTitle: "Capabilities across executive aviation.",
        capabilitiesAlt: "Sky Group core capabilities",
        capabilitiesCta: "Explore service",
        strategyEyebrow: "Strategic View",
        strategyTitle:
          "Each aviation decision affects cost, timing, and asset exposure.",
        strategyText:
          "Private charter, aircraft acquisition, technical review and recurrent flight operations should not be managed in isolation. We align those variables so clients can move with better information, traceability and operational control.",
        strategyMarkerEyebrow: "Working model",
        strategyMarkerText: "Commercial, technical, and operational alignment.",
        strategyImageAlt: "Sky Group strategic view",
        strategyBadgeEyebrow: "Sky Group",
        strategyBadgeText: "Clearer decisions, coordinated execution.",
        journeyEyebrow: "Why Trust Sky Group",
        journeyTitle: "Support built around real aviation priorities.",
        journeyText:
          "We support executive aviation clients who need availability review, transaction guidance, technical follow-up, and a faster path from request to execution.",
        journeyPrimaryCta: "Request Support",
        journeySecondaryCta: "Speak with an Advisor",
        journeyFootnote: "Response in under 15 minutes",
        finalEyebrow: "Next Step",
        finalTitle:
          "Your operation, supported end to end.",
        finalText:
          "Tell us about your requirement and we will coordinate the right commercial, operational or technical response.",
        finalPrimaryCta: "Speak with an Advisor",
        finalSecondaryCta: "View Pricing Guidance",
      }
    : {
        heroEyebrow: "Sky Group",
        heroTitle:
          "Soporte integral para aviación ejecutiva.",
        heroText:
          "Sky Group coordina vuelos privados, transacciones de aeronaves, soporte operativo y seguimiento técnico a través de un solo punto de contacto aeronáutico.",
        heroPrimaryCta: "Hablar con un asesor dedicado",
        heroSecondaryCta: "Explorar charter privado",
        introEyebrow: "Quiénes somos",
        introTitle:
          "Soporte de aviación ejecutiva con criterio comercial, técnico y operativo.",
        introParagraphs: [
          "Integramos vuelos privados, localización de aeronaves, soporte transaccional y coordinación técnica dentro de una misma estructura operativa. Eso reduce fragmentación y ofrece una ruta más clara entre la solicitud y la ejecución.",
          "Propietarios, operadores y departamentos de vuelo trabajan con un equipo que entiende requerimientos de misión, posicionamiento de aeronaves, revisión técnica, flujo documental y tiempos comerciales.",
        ],
        experienceAlt: "Entorno de aviación ejecutiva",
        experienceEyebrow: "Cómo trabajamos",
        experienceTitle: "Soporte aeronáutico con disciplina de ejecución.",
        experienceText:
          "Alineamos coordinación comercial, control operativo y seguimiento regulatorio para que cada requerimiento avance con mejor alcance, respuesta más ágil y mayor calidad de ejecución.",
        capabilitiesEyebrow: "Capacidades clave",
        capabilitiesTitle: "Capacidades para aviación ejecutiva.",
        capabilitiesAlt: "Capacidades clave de Sky Group",
        capabilitiesCta: "Explorar servicio",
        strategyEyebrow: "Vision estrategica",
        strategyTitle:
          "Cada decisión aeronáutica impacta costo, tiempo y exposición del activo.",
        strategyText:
          "Los vuelos privados, la adquisición de aeronaves, la revisión técnica y la operación recurrente no deben gestionarse por separado. Alineamos esas variables para que el cliente avance con mejor información, mayor trazabilidad y mejor control operativo.",
        strategyMarkerEyebrow: "Modelo de trabajo",
        strategyMarkerText: "Alineación comercial, técnica y operativa.",
        strategyImageAlt: "Vision estrategica de Sky Group",
        strategyBadgeEyebrow: "Sky Group",
        strategyBadgeText: "Mejor decisión, ejecución coordinada.",
        journeyEyebrow: "Por qué confiar en Sky Group",
        journeyTitle: "Soporte basado en prioridades reales de aviación.",
        journeyText:
          "Atendemos clientes de aviación ejecutiva que requieren revisión de disponibilidad, guía transaccional, seguimiento técnico y una ruta más ágil entre la solicitud y la ejecución.",
        journeyPrimaryCta: "Solicitar soporte",
        journeySecondaryCta: "Hablar con un asesor",
        journeyFootnote: "Respuesta en menos de 15 minutos",
        finalEyebrow: "Siguiente paso",
        finalTitle:
          "Su operación, respaldada de principio a fin.",
        finalText:
          "Comparta su requerimiento y coordinaremos la respuesta comercial, operativa o técnica adecuada.",
        finalPrimaryCta: "Hablar con un asesor",
        finalSecondaryCta: "Ver guía de precios",
      }
);

const metrics = computed(() =>
  locale.value === "en"
    ? [
        { value: "20+", label: "Years in executive aviation support" },
        { value: "500+", label: "Flights and aviation assignments coordinated" },
        { value: "Multi-Service", label: "Commercial, technical and operational coverage" },
      ]
    : [
        { value: "20+", label: "Años en soporte de aviación ejecutiva" },
        { value: "500+", label: "Vuelos y requerimientos aeronáuticos coordinados" },
        { value: "Multiservicio", label: "Cobertura comercial, técnica y operativa" },
      ]
);

const pillars = computed(() =>
  locale.value === "en"
    ? [
        {
          title: "Operational control",
          text: "Each requirement advances with clearer scope, timing control and traceable follow-up across the operating chain.",
        },
        {
          title: "Single point of contact",
          text: "Clients work with one team across charter, aircraft transactions, technical review, and flight support.",
        },
        {
          title: "Commercial and technical alignment",
          text: "Business objectives stay aligned with aircraft condition, availability, compliance and execution timing.",
        },
      ]
    : [
        {
          title: "Control operativo",
          text: "Cada requerimiento avanza con mejor alcance, control de tiempos y seguimiento trazable a lo largo de la cadena operativa.",
        },
        {
          title: "Punto único de contacto",
          text: "El cliente trabaja con un solo equipo en charter, transacciones de aeronaves, revisión técnica y soporte de vuelo.",
        },
        {
          title: "Alineación comercial y técnica",
          text: "Los objetivos de negocio se alinean con condición de aeronave, disponibilidad, cumplimiento y tiempos de ejecución.",
        },
      ]
);

const services = computed(() =>
  locale.value === "en"
    ? [
        {
          route: "AirTaxi",
          title: "Private Charter",
          text: "Private charter for business travel, urgent missions, and executive itineraries.",
        },
        {
          route: "AircraftSales",
          title: "Aircraft transactions",
          text: "Aircraft acquisition, sourcing, valuation, and sale-side support.",
        },
        {
          route: "OperationsManagement",
          title: "Aircraft Management",
          text: "Flight operations, compliance, maintenance planning, and reporting support.",
        },
        {
          route: "PrePurchaseInspection",
          title: "Pre-purchase advisory",
          text: "Technical review, records analysis, and due diligence before closing.",
        },
        {
          route: "ImportExport",
          title: "Import & Export",
          text: "Cross-border coordination for aircraft, components, traceability, and documentation.",
        },
        {
          route: "Avionics",
          title: "Avionics & Systems",
          text: "Aircraft systems support, modernization planning, and technical follow-up.",
        },
      ]
    : [
        {
          route: "AirTaxi",
          title: "Vuelos privados",
          text: "Vuelos privados para viajes de negocios, misiones urgentes e itinerarios ejecutivos.",
        },
        {
          route: "AircraftSales",
          title: "Transacciones de aeronaves",
          text: "Adquisicion, localizacion, valuacion y soporte en compra y venta de aeronaves.",
        },
        {
          route: "OperationsManagement",
          title: "Administracion operativa",
          text: "Operaciones de vuelo, cumplimiento, planeacion de mantenimiento y reporteo.",
        },
        {
          route: "PrePurchaseInspection",
          title: "Asesoria precompra",
          text: "Revision tecnica, analisis documental y debida diligencia antes del cierre.",
        },
        {
          route: "ImportExport",
          title: "Importacion y exportacion",
          text: "Coordinacion transfronteriza para aeronaves, componentes, trazabilidad y documentacion.",
        },
        {
          route: "Avionics",
          title: "Avionica y sistemas",
          text: "Soporte a sistemas de aeronaves, modernizacion y seguimiento tecnico.",
        },
      ]
);

const timeline = computed(() =>
  locale.value === "en"
    ? [
        {
          stage: "Availability",
          title: "Aircraft availability",
          text: "Availability review based on route, timing, aircraft category, and mission profile.",
        },
        {
          stage: "Coverage",
          title: "Operational coordination",
          text: "Commercial, technical, and operating teams align the next step with clearer accountability.",
        },
        {
          stage: "Response",
          title: "Response time",
          text: "Requests are routed quickly when the client needs a defined answer and execution path.",
        },
        {
          stage: "Execution",
          title: "Decision support",
          text: "The client receives commercial guidance, operational visibility, and the right next recommendation.",
        },
      ]
    : [
        {
          stage: "Disponibilidad",
          title: "Disponibilidad de aeronave",
          text: "Revision de disponibilidad basada en ruta, horario, categoria de aeronave y perfil de mision.",
        },
        {
          stage: "Cobertura",
          title: "Coordinacion operativa",
          text: "Los equipos comercial, tecnico y operativo alinean el siguiente paso con mayor claridad.",
        },
        {
          stage: "Respuesta",
          title: "Tiempo de respuesta",
          text: "Las solicitudes se canalizan con rapidez cuando el cliente necesita una respuesta definida y ejecutable.",
        },
        {
          stage: "Ejecucion",
          title: "Soporte a la decision",
          text: "El cliente recibe guia comercial, visibilidad operativa y la recomendacion correcta para avanzar.",
        },
      ]
);

let revealObserver;

onMounted(() => {
  const reveals = Array.from(document.querySelectorAll(".reveal"));

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver?.unobserve(entry.target);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
  );

  reveals.forEach((element) => revealObserver?.observe(element));
});

onBeforeUnmount(() => {
  revealObserver?.disconnect();
});
</script>

<style scoped>
.about-page {
  background:
    radial-gradient(circle at top right, rgba(215, 176, 116, 0.08), transparent 24%),
    linear-gradient(180deg, #071320 0%, #0b1220 100%);
  color: white;
}

.about-hero {
  position: relative;
  min-height: 92vh;
  display: flex;
  align-items: center;
  background: url("/images/About/IMG_1510.jpeg") center/cover no-repeat;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(5, 13, 23, 0.68) 0%, rgba(5, 13, 23, 0.48) 34%, rgba(5, 13, 23, 0.2) 62%, rgba(5, 13, 23, 0.38) 100%),
    linear-gradient(180deg, rgba(5, 13, 23, 0.08), rgba(5, 13, 23, 0.28));
}

.hero-shell,
.intro-grid,
.experience-shell,
.strategy-shell,
.cta-shell {
  position: relative;
  z-index: 1;
}

.hero-shell {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 2.5rem;
  align-items: end;
  padding-top: 8rem;
  padding-bottom: 4rem;
}

.eyebrow {
  display: inline-block;
  color: #d8b26e;
  letter-spacing: 0.24em;
  font-size: 0.76rem;
  text-transform: uppercase;
}

.hero-copy h1,
.intro-grid h2,
.section-head h2,
.strategy-shell h2,
.cta-shell h2,
.experience-copy h2 {
  font-size: clamp(2.4rem, 4.5vw, 4.5rem);
  margin: 1rem 0 1.2rem;
}

.hero-copy p,
.intro-text p,
.experience-copy p,
.pillar-content p,
.capability-copy p,
.strategy-shell p,
.timeline-copy p,
.cta-shell p {
  color: rgba(255, 255, 255, 0.76);
  line-height: 1.8;
}

.hero-actions,
.journey-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-actions {
  margin-top: 2rem;
}

.btn-primary,
.btn-ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 54px;
  padding: 0 1.5rem;
  border-radius: 999px;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.8rem;
  transition: transform 0.28s ease, border-color 0.28s ease, background 0.28s ease, box-shadow 0.28s ease;
}

.btn-primary:hover,
.btn-ghost:hover,
.capability-row:hover {
  transform: translateY(-4px);
}

.btn-primary {
  background: linear-gradient(135deg, #d4af37, #f1d88a);
  color: #071320;
  font-weight: 700;
}

.btn-ghost {
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: white;
  background: rgba(9, 20, 33, 0.28);
}

.btn-ghost.dark {
  border-color: rgba(255, 255, 255, 0.12);
}

.hero-side-panel {
  display: grid;
  gap: 1rem;
  padding: 1.35rem;
  border-radius: 28px;
  background:
    linear-gradient(180deg, rgba(8, 18, 31, 0.86), rgba(8, 18, 31, 0.68)),
    radial-gradient(circle at top right, rgba(215, 176, 116, 0.16), transparent 34%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
}

.hero-metric {
  display: grid;
  grid-template-columns: 52px 1fr;
  gap: 1rem;
  align-items: center;
  padding: 0.5rem 0;
}

.icon-badge {
  width: 52px;
  height: 52px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.capability-card .icon-badge {
  margin-bottom: 0;
}

.icon-badge svg {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.is-metric,
.is-pillar,
.is-capability,
.is-timeline {
  color: #d8b26e;
}

.hero-metric strong,
.metric-block strong {
  display: block;
  font-size: 1.4rem;
}

.hero-metric span,
.metric-block span {
  color: rgba(255, 255, 255, 0.72);
}

.intro-grid {
  display: grid;
  grid-template-columns: 0.92fr 1.08fr;
  gap: 2rem;
  align-items: start;
}

.intro-text {
  display: grid;
  gap: 1rem;
}

.experience-section {
  position: relative;
  overflow: hidden;
}

.experience-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.experience-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(5, 13, 23, 0.68) 0%, rgba(5, 13, 23, 0.48) 34%, rgba(5, 13, 23, 0.2) 62%, rgba(5, 13, 23, 0.38) 100%),
    linear-gradient(180deg, rgba(5, 13, 23, 0.08), rgba(5, 13, 23, 0.28));
}

.experience-shell {
  min-height: 440px;
  display: flex;
  align-items: center;
}

.experience-copy {
  max-width: 900px;
}

.pillars-section {
  padding-top: 5rem;
}

.pillar-lines {
  display: grid;
  border-top: 1px solid rgba(215, 176, 116, 0.18);
}

.pillar-line {
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  gap: 1.5rem;
  align-items: start;
  padding: 1.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.pillar-content {
  display: grid;
  grid-template-columns: minmax(260px, 0.72fr) minmax(0, 1fr);
  gap: 2rem;
}

.pillar-content h3,
.capability-copy h3,
.timeline-copy h3 {
  font-size: clamp(1.35rem, 2.1vw, 2rem);
  line-height: 1.05;
}

.section-head {
  max-width: 780px;
  margin-bottom: 2rem;
}

.capabilities-head {
  max-width: 680px;
}

.capabilities-head h2 {
  font-size: clamp(2rem, 3.7vw, 4rem);
  white-space: normal;
  text-wrap: balance;
}

.capabilities-section {
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(7, 19, 32, 0.94), rgba(11, 18, 32, 0.98));
}

.capabilities-section::before,
.capabilities-section::after {
  content: "";
  position: absolute;
  inset: 0;
}

.capabilities-section::before {
  background: url("/images/About/about2.jpg") center/cover no-repeat;
  filter: brightness(0.72) saturate(1);
  transform: scale(1.02);
}

.capabilities-section::after {
  background:
    linear-gradient(180deg, rgba(4, 9, 18, 0.56), rgba(7, 13, 24, 0.68)),
    linear-gradient(90deg, rgba(3, 7, 15, 0.34), rgba(3, 7, 15, 0.12) 45%, rgba(3, 7, 15, 0.38));
}

.capabilities-section .container {
  position: relative;
  z-index: 1;
}

.capabilities-hero {
  display: grid;
  grid-template-columns: minmax(280px, 0.72fr) minmax(420px, 1.28fr);
  gap: 2rem;
  align-items: center;
  margin-bottom: 2.5rem;
}

.capabilities-stream {
  display: grid;
  gap: 0;
  border-top: 1px solid rgba(215, 176, 116, 0.18);
}

.capabilities-visual {
  justify-self: end;
  width: min(100%, 1120px);
}

.capabilities-image {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 6.2;
  max-height: 400px;
  object-fit: cover;
  object-position: center 56%;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.24);
}

.capability-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 120px;
  gap: 2rem;
  align-items: center;
  padding: 2rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  color: white;
  text-decoration: none;
  transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
}

.capability-row.reverse {
  grid-template-columns: 120px minmax(0, 1fr);
}

.capability-row.reverse .capability-copy {
  order: 2;
}

.capability-row.reverse .capability-icon {
  order: 1;
}

.capability-row:hover {
  border-color: rgba(216, 178, 110, 0.34);
  background: linear-gradient(90deg, rgba(216, 178, 110, 0.05), transparent 70%);
}

.capability-copy {
  display: grid;
  gap: 0.9rem;
}

.capability-number,
.timeline-stage span {
  color: #d8b26e;
  font-size: 0.76rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.capability-copy strong {
  color: #d8b26e;
}

.capability-icon {
  display: flex;
  justify-content: center;
}

.strategy-shell {
  display: grid;
  grid-template-columns: minmax(320px, 0.95fr) minmax(340px, 1.05fr);
  gap: 2.5rem;
  align-items: center;
}

.strategy-copy {
  max-width: 620px;
}

.strategy-copy p {
  max-width: 52ch;
}

.strategy-marker {
  display: inline-grid;
  gap: 0.45rem;
  margin-top: 2rem;
  padding: 1rem 1.1rem;
  border-radius: 20px;
  background:
    radial-gradient(circle at top left, rgba(216, 178, 110, 0.12), transparent 46%),
    linear-gradient(180deg, rgba(10, 23, 38, 0.92), rgba(7, 17, 30, 0.96));
  border: 1px solid rgba(216, 178, 110, 0.18);
}

.strategy-marker span,
.strategy-badge span {
  color: #d8b26e;
  font-size: 0.74rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.strategy-marker strong,
.strategy-badge strong {
  color: #f8f4ec;
  font-size: 1rem;
  line-height: 1.35;
}

.strategy-visual {
  position: relative;
}

.strategy-image {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 4.6;
  object-fit: cover;
  object-position: center;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.28);
}

.strategy-badge {
  position: absolute;
  left: 1.25rem;
  right: 1.25rem;
  bottom: 1.25rem;
  display: grid;
  gap: 0.45rem;
  padding: 1rem 1.1rem;
  border-radius: 22px;
  background:
    linear-gradient(180deg, rgba(7, 18, 31, 0.76), rgba(7, 18, 31, 0.92)),
    radial-gradient(circle at top right, rgba(216, 178, 110, 0.12), transparent 36%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
}

.metrics-ribbon {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  padding: 1.2rem 0;
  border-top: 1px solid rgba(215, 176, 116, 0.18);
  border-bottom: 1px solid rgba(215, 176, 116, 0.18);
}

.metric-block {
  padding: 1rem 1.25rem;
  text-align: center;
  padding: 1.8rem 1.5rem;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.metric-card:last-child {
  border-right: 0;
}

.journey-section {
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(7, 19, 32, 0.96), rgba(11, 18, 32, 0.99));
}

.journey-section::before,
.journey-section::after {
  content: "";
  position: absolute;
  inset: 0;
}

.journey-section::before {
  background: url("/images/About/About2.png") center/cover no-repeat;
  filter: brightness(0.66) saturate(0.92) contrast(1.06);
  transform: scale(1.03);
}

.journey-section::after {
  background:
    linear-gradient(180deg, rgba(4, 9, 18, 0.68), rgba(7, 13, 24, 0.82)),
    radial-gradient(circle at 50% 32%, rgba(18, 30, 52, 0.18), transparent 38%),
    linear-gradient(90deg, rgba(3, 7, 15, 0.4), rgba(3, 7, 15, 0.12) 45%, rgba(3, 7, 15, 0.42));
}

.journey-section .container {
  position: relative;
  z-index: 1;
}

.center {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

.journey-lead,
.journey-footnote {
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.journey-lead {
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.8;
}

.journey-actions {
  justify-content: center;
  margin: 2rem 0 2.5rem;
}

.timeline {
  display: grid;
  gap: 1rem;
}

.timeline-row {
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  gap: 2rem;
  align-items: start;
  padding: 1.8rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.timeline-stage {
  display: grid;
  gap: 0.8rem;
}

.timeline-copy {
  max-width: 820px;
}

.journey-footnote {
  margin-top: 1.5rem;
  color: #d8b26e;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 0.78rem;
}

.cta-shell {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  align-items: center;
  padding: 2rem;
  border-radius: 28px;
  background:
    linear-gradient(135deg, rgba(9, 21, 37, 0.72), rgba(18, 43, 70, 0.66)),
    radial-gradient(circle at top left, rgba(212, 175, 55, 0.18), transparent 26%),
    url("/images/About/marco.jpg") center 42% / cover no-repeat;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.2);
}

.reveal {
  opacity: 0;
  transform: translateY(48px);
  transition: opacity 0.75s ease, transform 0.75s ease;
}

.reveal-delay {
  transition-delay: 160ms;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1100px) {
  .hero-shell,
  .intro-grid,
  .pillar-content,
  .metrics-ribbon,
  .timeline-row,
  .cta-shell,
  .capabilities-hero,
  .strategy-shell {
    grid-template-columns: 1fr;
  }

  .capability-row,
  .capability-row.reverse {
    grid-template-columns: 1fr;
  }

  .capability-row.reverse .capability-copy,
  .capability-row.reverse .capability-icon {
    order: initial;
  }

  .strategy-copy {
    max-width: none;
  }

  .capabilities-visual {
    justify-self: stretch;
    width: 100%;
  }

  .capabilities-image {
    aspect-ratio: 16 / 9;
    max-height: none;
  }

  .strategy-image {
    aspect-ratio: 16 / 10;
  }
}

@media (max-width: 640px) {
  .hero-actions,
  .journey-actions {
    flex-direction: column;
  }

  .btn-primary,
  .btn-ghost {
    width: 100%;
  }

  .hero-shell {
    padding-top: 7.5rem;
  }

  .pillar-line,
  .timeline-row,
  .hero-metric {
    grid-template-columns: 1fr;
  }
}
</style>
