<template>
    <section class="about-page">
      <section class="about-hero">
        <div class="hero-overlay"></div>

        <div class="container hero-shell">
          <div class="hero-copy">
            <span class="eyebrow">{{ content.heroEyebrow }}</span>
            <h1>{{ content.heroTitle }}</h1>
            <p>{{ content.heroText }}</p>

            <div class="hero-actions">
              <RouterLink class="btn-primary" :to="toLocalizedRoute('Contact')">{{ content.heroPrimaryCta }}</RouterLink>
              <RouterLink class="btn-ghost" :to="toLocalizedRoute('AirTaxi')">{{ content.heroSecondaryCta }}</RouterLink>
            </div>
          </div>

          <div class="hero-metrics">
            <article v-for="(item, index) in metrics" :key="item.label">
              <div class="icon-badge is-metric">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path :d="metricIcons[index % metricIcons.length]" />
                </svg>
              </div>
              <strong>{{ item.value }}</strong>
              <span>{{ item.label }}</span>
            </article>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container intro-grid">
          <div>
            <span class="eyebrow">{{ content.introEyebrow }}</span>
            <h2>{{ content.introTitle }}</h2>
          </div>

          <div class="intro-copy">
            <p>{{ content.introParagraphs[0] }}</p>
            <p>{{ content.introParagraphs[1] }}</p>
          </div>
        </div>
      </section>

      <section class="section experience-section">
        <img
          src="/images/About/About10.png"
          :alt="content.experienceAlt"
          class="experience-bg"
          loading="lazy"
          decoding="async"
        />
        <div class="experience-overlay"></div>

        <div class="container experience-shell">
          <span class="eyebrow">{{ content.experienceEyebrow }}</span>
          <h2>{{ content.experienceTitle }}</h2>
          <p>{{ content.experienceText }}</p>
        </div>
      </section>

      <section class="section dark-section">
        <div class="container pillars-grid">
          <article v-for="(pillar, index) in pillars" :key="pillar.title" class="pillar-card">
            <div class="icon-badge is-pillar">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path :d="pillarIcons[index % pillarIcons.length]" />
              </svg>
            </div>
            <h3>{{ pillar.title }}</h3>
            <p>{{ pillar.text }}</p>
          </article>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="section-head">
            <span class="eyebrow">{{ content.capabilitiesEyebrow }}</span>
            <h2>{{ content.capabilitiesTitle }}</h2>
          </div>

          <div class="capabilities-grid">
            <RouterLink
              v-for="(service, index) in services"
              :key="service.route"
              :to="toLocalizedRoute(service.route)"
              class="capability-card"
            >
              <div class="icon-badge is-capability">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path :d="capabilityIcons[index % capabilityIcons.length]" />
                </svg>
              </div>
              <h3>{{ service.title }}</h3>
              <p>{{ service.text }}</p>
              <strong>{{ content.capabilitiesCta }}</strong>
            </RouterLink>
          </div>
        </div>
      </section>

      <section class="section strategy-section">
        <div class="container strategy-shell">
          <span class="eyebrow">{{ content.strategyEyebrow }}</span>
          <h2>{{ content.strategyTitle }}</h2>
          <p>{{ content.strategyText }}</p>
        </div>
      </section>

      <section class="section metrics-section">
        <div class="container metrics-grid">
          <article v-for="item in metrics" :key="item.label" class="metric-card">
            <strong>{{ item.value }}</strong>
            <span>{{ item.label }}</span>
          </article>
        </div>
      </section>

      <section class="section journey-section">
        <div class="container">
          <div class="section-head center">
            <span class="eyebrow">{{ content.journeyEyebrow }}</span>
            <h2>{{ content.journeyTitle }}</h2>
            <p class="journey-lead">{{ content.journeyText }}</p>
          </div>

          <div class="journey-actions">
            <RouterLink class="btn-primary" :to="toLocalizedRoute('Contact')">{{ content.journeyPrimaryCta }}</RouterLink>
            <a class="btn-ghost" :href="journeyWhatsappHref" target="_blank" rel="noopener noreferrer">{{ content.journeySecondaryCta }}</a>
          </div>

          <div class="timeline">
            <article v-for="(item, index) in timeline" :key="item.title" class="timeline-card">
              <div class="icon-badge is-timeline">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path :d="timelineIcons[index % timelineIcons.length]" />
                </svg>
              </div>
              <span>{{ item.stage }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </article>
          </div>

          <p class="journey-footnote">{{ content.journeyFootnote }}</p>
        </div>
      </section>

      <section class="section final-cta">
        <div class="container cta-shell">
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
import { computed } from "vue";
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
    ? "https://wa.me/525586186576?text=Hello,%20I%20need%20immediate%20private%20aviation%20availability.%20Could%20an%20advisor%20help%20me%3F"
    : "https://wa.me/525586186576?text=Hola,%20necesito%20disponibilidad%20inmediata%20de%20aviacion%20privada.%20Me%20puede%20apoyar%20un%20asesor%3F"
);

const content = computed(() =>
  locale.value === "en"
    ? {
        heroEyebrow: "Private Jet Charter in Mexico",
        heroTitle:
          "Sky Group brings together private jet charter in Mexico with premium operational and aviation support.",
        heroText:
          "Sky Group is an aviation group focused on executive charter, operations, aircraft transactions, and technical coordination for clients who need clearer and more specialized support.",
        heroPrimaryCta: "Talk to Sky Group",
        heroSecondaryCta: "Explore private jet charter",
        introEyebrow: "Who We Are",
        introTitle:
          "An aviation platform built to connect commercial, operational, and technical execution.",
        introParagraphs: [
          "Sky Group operates with a structure designed to reduce friction for clients who need more than one isolated aviation service. Instead of treating charter, aircraft advisory, technical support, and operations as separate silos, we align them under one coordinated approach.",
          "That makes the experience clearer for owners, executives, operators, and buyers who need responsive guidance, stronger oversight, and a team that understands both the strategic and operational side of aviation.",
        ],
        experienceAlt: "Executive aviation environment",
        experienceEyebrow: "How We Work",
        experienceTitle: "Experience matters, but so does structure.",
        experienceText:
          "We approach aviation with a combination of commercial awareness, operational discipline, regulatory attention, and premium client handling. The goal is not only to move aircraft or coordinate flights, but to protect time, reduce complexity, and support better decisions.",
        capabilitiesEyebrow: "Core Capabilities",
        capabilitiesTitle: "Services that support the full aviation lifecycle.",
        capabilitiesCta: "Explore service",
        strategyEyebrow: "Strategic View",
        strategyTitle:
          "Aviation is not just transportation. It is a business tool, an asset, and an operational system.",
        strategyText:
          "Every charter request, ownership structure, transaction, maintenance decision, or technical review affects cost, timing, risk, and long-term value. Sky Group is built around that broader reality, which is why our role goes beyond execution into informed guidance.",
        journeyEyebrow: "Why Trust Sky Group",
        journeyTitle: "Strategic private aviation across Mexico, LATAM & international routes.",
        journeyText:
          "Need immediate availability? We focus on operational coverage, faster response, concierge coordination, and clearer execution for high-value private aviation clients.",
        journeyPrimaryCta: "Get Instant Quote",
        journeySecondaryCta: "Speak to Advisor",
        journeyFootnote: "Response in under 15 minutes",
        finalEyebrow: "Next Step",
        finalTitle:
          "Work with a team that can connect charter, aircraft advisory, and operational execution.",
        finalText:
          "If you are planning a flight, evaluating an aircraft, structuring ownership, or looking for technical and operational support, we can help define the right next move.",
        finalPrimaryCta: "Contact Sky Group",
        finalSecondaryCta: "View Pricing Guidance",
      }
    : {
        heroEyebrow: "Vuelos Privados en Mexico",
        heroTitle:
          "Sky Group integra vuelos privados en Mexico, private jet charter in Mexico y soporte aeronautico premium.",
        heroText:
          "Sky Group es un grupo aeronautico enfocado en charter ejecutivo, operaciones, transacciones de aeronaves y coordinacion tecnica para clientes que buscan una atencion mas clara y especializada.",
        heroPrimaryCta: "Hablar con Sky Group",
        heroSecondaryCta: "Explorar private jet charter",
        introEyebrow: "Quienes somos",
        introTitle:
          "Una plataforma aeronautica creada para conectar ejecucion comercial, operativa y tecnica.",
        introParagraphs: [
          "Sky Group opera con una estructura pensada para reducir friccion a clientes que necesitan mas de un servicio aeronautico. En lugar de tratar charter, asesoria de aeronaves, soporte tecnico y operaciones como silos separados, los alineamos bajo un mismo enfoque coordinado.",
          "Eso vuelve la experiencia mas clara para propietarios, ejecutivos, operadores y compradores que necesitan respuesta, supervision y un equipo que entienda tanto la parte estrategica como la operativa de la aviacion.",
        ],
        experienceAlt: "Entorno de aviacion ejecutiva",
        experienceEyebrow: "Como trabajamos",
        experienceTitle: "La experiencia importa, pero la estructura tambien.",
        experienceText:
          "Abordamos la aviacion con una mezcla de criterio comercial, disciplina operativa, atencion regulatoria y trato premium al cliente. El objetivo no es solo mover aeronaves o coordinar vuelos, sino proteger tiempo, reducir complejidad y apoyar mejores decisiones.",
        capabilitiesEyebrow: "Capacidades clave",
        capabilitiesTitle: "Servicios que respaldan todo el ciclo de la aviacion.",
        capabilitiesCta: "Explorar servicio",
        strategyEyebrow: "Vision estrategica",
        strategyTitle:
          "La aviacion no es solo transporte. Es una herramienta de negocio, un activo y un sistema operativo.",
        strategyText:
          "Cada solicitud de charter, estructura de propiedad, transaccion, decision de mantenimiento o revision tecnica afecta costo, tiempo, riesgo y valor de largo plazo. Sky Group esta construido alrededor de esa realidad, por eso nuestro rol va mas alla de ejecutar y se convierte en una guia informada.",
        journeyEyebrow: "Por que confiar en Sky Group",
        journeyTitle: "Aviacion privada estrategica a traves de Mexico, LATAM y rutas internacionales.",
        journeyText:
          "Necesitas disponibilidad inmediata? Nuestro enfoque esta en cobertura operativa, respuesta mas rapida, concierge service y ejecucion mas clara para clientes de aviacion ejecutiva.",
        journeyPrimaryCta: "Cotizar vuelo ahora",
        journeySecondaryCta: "Hablar con asesor",
        journeyFootnote: "Response in under 15 minutes",
        finalEyebrow: "Siguiente paso",
        finalTitle:
          "Trabaja con un equipo que conecta charter, asesoria de aeronaves y ejecucion operativa.",
        finalText:
          "Si estas planeando un vuelo, evaluando una aeronave, estructurando propiedad o buscando soporte tecnico y operativo, podemos ayudarte a definir el siguiente movimiento correcto.",
        finalPrimaryCta: "Contactar a Sky Group",
        finalSecondaryCta: "Ver guia de precios",
      }
);

const metrics = computed(() =>
  locale.value === "en"
    ? [
        { value: "20+", label: "Years linked to aviation experience" },
        { value: "500+", label: "Flights and aviation operations supported" },
        { value: "Multi-Service", label: "Commercial, technical, and operational scope" },
      ]
    : [
        { value: "20+", label: "Anos vinculados a experiencia aeronautica" },
        { value: "500+", label: "Vuelos y operaciones aeronauticas atendidas" },
        { value: "Multiservicio", label: "Alcance comercial, tecnico y operativo" },
      ]
);

const pillars = computed(() =>
  locale.value === "en"
    ? [
        {
          title: "Operational precision",
          text: "Aviation decisions are supported by structure, timing control, and attention to compliance and execution quality.",
        },
        {
          title: "Client-centered coordination",
          text: "We simplify complex aviation needs by guiding clients clearly across services, teams, and next steps.",
        },
        {
          title: "Technical and commercial balance",
          text: "Our work connects business goals with the realities of aircraft operations, maintenance, and asset value.",
        },
      ]
    : [
        {
          title: "Precision operativa",
          text: "Las decisiones aeronauticas se sostienen con estructura, control de tiempos y atencion al cumplimiento y la calidad de ejecucion.",
        },
        {
          title: "Coordinacion centrada en el cliente",
          text: "Simplificamos necesidades aeronauticas complejas guiando al cliente con claridad entre servicios, equipos y siguientes pasos.",
        },
        {
          title: "Balance tecnico y comercial",
          text: "Nuestro trabajo conecta objetivos de negocio con la realidad de las operaciones, el mantenimiento y el valor de la aeronave.",
        },
      ]
);

const services = computed(() =>
  locale.value === "en"
    ? [
        {
          route: "AirTaxi",
          title: "Executive air charter",
          text: "Private flights designed for business mobility, urgent missions, and premium travel coordination.",
        },
        {
          route: "AircraftSales",
          title: "Aircraft acquisition and sales",
          text: "Advisory support for sourcing, valuation, negotiation, and transaction oversight.",
        },
        {
          route: "OperationsManagement",
          title: "Operational management",
          text: "Structured oversight for compliance, crew coordination, maintenance planning, and control.",
        },
        {
          route: "PrePurchaseInspection",
          title: "Pre-purchase advisory",
          text: "Technical review and due diligence support before major aircraft decisions.",
        },
        {
          route: "ImportExport",
          title: "Import and export support",
          text: "Cross-border coordination for aircraft, components, documentation, and regulatory flow.",
        },
        {
          route: "Avionics",
          title: "Avionics and technical support",
          text: "Support for aircraft systems, modernization, and operational readiness.",
        },
      ]
    : [
        {
          route: "AirTaxi",
          title: "Charter aereo ejecutivo",
          text: "Vuelos privados pensados para movilidad de negocios, misiones urgentes y coordinacion premium de viaje.",
        },
        {
          route: "AircraftSales",
          title: "Compra y venta de aeronaves",
          text: "Soporte de asesoria para sourcing, valuacion, negociacion y supervision transaccional.",
        },
        {
          route: "OperationsManagement",
          title: "Gestion operativa",
          text: "Supervision estructurada para cumplimiento, coordinacion de tripulacion, planeacion de mantenimiento y control.",
        },
        {
          route: "PrePurchaseInspection",
          title: "Asesoria precompra",
          text: "Revision tecnica y soporte de debida diligencia antes de decisiones importantes sobre aeronaves.",
        },
        {
          route: "ImportExport",
          title: "Soporte de importacion y exportacion",
          text: "Coordinacion transfronteriza para aeronaves, componentes, documentacion y flujo regulatorio.",
        },
        {
          route: "Avionics",
          title: "Avionica y soporte tecnico",
          text: "Soporte para sistemas de aeronaves, modernizacion y alistamiento operativo.",
        },
      ]
);

const timeline = computed(() =>
  locale.value === "en"
    ? [
        {
          stage: "Availability",
          title: "Aircraft availability",
          text: "Real charter review built around route, timing, aircraft category, and mission urgency.",
        },
        {
          stage: "Coverage",
          title: "Operational coverage",
          text: "Support across Mexico, LATAM, and international routes with stronger execution visibility.",
        },
        {
          stage: "Response",
          title: "Response time",
          text: "Commercial follow-up designed to move quickly when the client needs a serious answer fast.",
        },
        {
          stage: "Concierge",
          title: "Concierge service",
          text: "A clearer premium path for charter, advisory, and high-touch operational coordination.",
        },
      ]
    : [
        {
          stage: "Disponibilidad",
          title: "Aircraft availability",
          text: "Revision real de charter basada en ruta, horario, categoria de aeronave y urgencia de la mision.",
        },
        {
          stage: "Cobertura",
          title: "Operational coverage",
          text: "Soporte a traves de Mexico, LATAM y rutas internacionales con mayor claridad de ejecucion.",
        },
        {
          stage: "Respuesta",
          title: "Response time",
          text: "Seguimiento comercial pensado para moverse rapido cuando el cliente necesita una respuesta seria.",
        },
        {
          stage: "Concierge",
          title: "Concierge service",
          text: "Un camino premium mas claro para charter, asesoria y coordinacion operativa de alto contacto.",
        },
      ]
);
</script>

<style scoped>
.about-page {
  background: linear-gradient(180deg, #071320 0%, #0b1220 100%);
  color: white;
}

.about-hero {
  position: relative;
  min-height: 92vh;
  display: flex;
  align-items: center;
  background: url("/images/About/About.png") center/cover no-repeat;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(120deg, rgba(5, 10, 20, 0.9), rgba(5, 10, 20, 0.66)),
    radial-gradient(circle at right center, rgba(123, 183, 255, 0.14), transparent 28%);
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
  grid-template-columns: 1fr 360px;
  gap: 2rem;
  align-items: end;
  padding-top: 8rem;
  padding-bottom: 4rem;
}

.eyebrow {
  display: inline-block;
  color: #7bb7ff;
  letter-spacing: 0.24em;
  font-size: 0.76rem;
  text-transform: uppercase;
}

.hero-copy h1,
.intro-grid h2,
.section-head h2,
.strategy-shell h2,
.cta-shell h2 {
  font-size: clamp(2.4rem, 4.5vw, 4.5rem);
  margin: 1rem 0 1.2rem;
}

.hero-copy p,
.intro-copy p,
.experience-shell p,
.pillar-card p,
.capability-card p,
.strategy-shell p,
.timeline-card p,
.cta-shell p {
  color: rgba(255, 255, 255, 0.76);
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
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
}

.btn-primary {
  background: linear-gradient(135deg, #d4af37, #f1d88a);
  color: #071320;
  font-weight: 700;
}

.btn-ghost {
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: white;
}

.btn-ghost.dark {
  border-color: rgba(255, 255, 255, 0.12);
}

.hero-metrics,
.pillars-grid,
.capabilities-grid,
.timeline,
.metrics-grid {
  display: grid;
  gap: 0;
}

.hero-metrics article,
.pillar-card,
.capability-card,
.metric-card,
.timeline-card {
  position: relative;
  padding: 1.5rem 0;
  background: transparent;
  border-radius: 0;
}

.hero-metrics {
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.hero-metrics article {
  padding: 1.2rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.hero-metrics article:last-child {
  border-bottom: 0;
}

.icon-badge {
  width: 52px;
  height: 52px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
  animation: iconFloat 4.2s ease-in-out infinite;
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

.is-metric {
  color: #d4af37;
}

.is-pillar {
  color: #8bbcff;
}

.is-capability {
  color: #7be0d6;
}

.is-timeline {
  color: #f1d88a;
}

.hero-metrics strong,
.metric-card strong {
  display: block;
  font-size: 1.5rem;
}

.hero-metrics span,
.metric-card span {
  color: rgba(255, 255, 255, 0.72);
}

.intro-grid {
  display: grid;
  grid-template-columns: 0.92fr 1.08fr;
  gap: 2rem;
  align-items: start;
}

.intro-copy {
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
  background: linear-gradient(120deg, rgba(8, 15, 28, 0.9), rgba(15, 23, 42, 0.82));
}

.experience-shell {
  max-width: 900px;
}

.experience-shell h2 {
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  margin: 1rem 0;
}

.pillars-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.pillar-card {
  padding-right: 1.8rem;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.pillar-card + .pillar-card {
  padding-left: 1.8rem;
}

.pillar-card:last-child {
  border-right: 0;
}

.pillar-card h3,
.capability-card h3,
.timeline-card h3 {
  margin-bottom: 0.8rem;
}

.section-head {
  max-width: 780px;
  margin-bottom: 2rem;
}

.capabilities-grid {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.capability-card {
  display: grid;
  grid-template-columns: 76px minmax(160px, 0.7fr) minmax(0, 1fr) auto;
  gap: 1.2rem;
  align-items: center;
  padding: 1.25rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  text-decoration: none;
  color: white;
  transition: transform 0.25s ease, background 0.25s ease;
}

.capability-card h3,
.capability-card p {
  margin: 0;
}

.capability-card:last-child {
  border-bottom: 0;
}

.capability-card:hover {
  transform: translateX(8px);
  background: rgba(255, 255, 255, 0.025);
}

.capability-card:hover .icon-badge,
.pillar-card:hover .icon-badge,
.timeline-card:hover .icon-badge,
.hero-metrics article:hover .icon-badge {
  transform: translateY(-4px) scale(1.04);
  border-color: rgba(255, 255, 255, 0.22);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);
}

.capability-card strong {
  display: inline-block;
  color: #7bb7ff;
  text-align: right;
}

.strategy-section {
  text-align: center;
}

.strategy-shell {
  max-width: 980px;
  margin: 0 auto;
}

.metrics-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.metric-card {
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
  filter: brightness(0.52) saturate(0.82) contrast(1.05);
  transform: scale(1.03);
}

.journey-section::after {
  background:
    linear-gradient(180deg, rgba(4, 9, 18, 0.82), rgba(7, 13, 24, 0.92)),
    radial-gradient(circle at 50% 32%, rgba(18, 30, 52, 0.16), transparent 34%),
    linear-gradient(90deg, rgba(3, 7, 15, 0.52), rgba(3, 7, 15, 0.18) 45%, rgba(3, 7, 15, 0.56));
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

.timeline {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.timeline-card {
  padding-right: 1.4rem;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.timeline-card + .timeline-card {
  padding-left: 1.4rem;
}

.timeline-card:last-child {
  border-right: 0;
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
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 2rem 0;
}

.timeline-card span {
  display: inline-block;
  margin-bottom: 0.8rem;
  color: #d4af37;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.journey-footnote {
  margin-top: 1.5rem;
  color: #8fcaff;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 0.78rem;
}

.cta-shell {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  align-items: center;
  padding: 2.5rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  background: transparent;
}

@keyframes iconFloat {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-6px);
  }
}

@media (max-width: 1100px) {
  .hero-shell,
  .intro-grid,
  .pillars-grid,
  .capabilities-grid,
  .metrics-grid,
  .timeline,
  .cta-shell {
    grid-template-columns: 1fr;
  }

  .pillar-card,
  .pillar-card + .pillar-card,
  .timeline-card,
  .timeline-card + .timeline-card,
  .metric-card {
    padding-left: 0;
    padding-right: 0;
    border-right: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .pillar-card:last-child,
  .timeline-card:last-child,
  .metric-card:last-child {
    border-bottom: 0;
  }

  .capability-card {
    grid-template-columns: 64px minmax(0, 1fr);
  }

  .capability-card p,
  .capability-card strong {
    grid-column: 2;
  }

  .capability-card strong {
    text-align: left;
  }
}

@media (max-width: 640px) {
  .hero-actions {
    flex-direction: column;
  }

  .btn-primary,
  .btn-ghost {
    width: 100%;
  }

  .capability-card {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .capability-card p,
  .capability-card strong {
    grid-column: auto;
  }

  .hero-metrics article,
  .pillar-card,
  .capability-card,
  .metric-card,
  .timeline-card {
    padding: 1.2rem 0;
  }
}
</style>
