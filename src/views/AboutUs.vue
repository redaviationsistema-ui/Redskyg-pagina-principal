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
        src="/images/About/About10.png"
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
      <div class="container section-head reveal">
        <span class="eyebrow">{{ content.capabilitiesEyebrow }}</span>
        <h2>{{ content.capabilitiesTitle }}</h2>
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
        <span class="eyebrow">{{ content.strategyEyebrow }}</span>
        <h2>{{ content.strategyTitle }}</h2>
        <p>{{ content.strategyText }}</p>
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
    ? "https://wa.me/525586186576?text=Hello,%20I%20need%20immediate%20private%20aviation%20availability.%20Could%20an%20advisor%20help%20me%3F"
    : "https://wa.me/525586186576?text=Hola,%20necesito%20disponibilidad%20inmediata%20de%20aviacion%20privada.%20Me%20puede%20apoyar%20un%20asesor%3F"
);

const content = computed(() =>
  locale.value === "en"
    ? {
        heroEyebrow: "Sky Group",
        heroTitle:
          "Strategic support for private aviation.",
        heroText:
          "Sky Group is an aviation group focused on executive charter, operations, aircraft transactions, and technical coordination for clients who need clearer and more specialized support.",
        heroPrimaryCta: "Talk to Sky Group",
        heroSecondaryCta: "Explore Private Charter",
        introEyebrow: "Who We Are",
        introTitle:
          "Commercial, operational, technical execution.",
        introParagraphs: [
          "Sky Group operates with a structure designed to reduce friction for clients who need more than one isolated aviation service. Instead of treating charter, aircraft advisory, technical support, and operations as separate silos, we align them under one coordinated approach.",
          "That makes the experience clearer for owners, executives, operators, and buyers who need responsive guidance, stronger oversight, and a team that understands both the strategic and operational side of aviation.",
        ],
        experienceAlt: "Executive aviation environment",
        experienceEyebrow: "How We Work",
        experienceTitle: "Experience with operational structure.",
        experienceText:
          "We approach aviation with a combination of commercial awareness, operational discipline, regulatory attention, and premium client handling. The goal is not only to move aircraft or coordinate flights, but to protect time, reduce complexity, and support better decisions.",
        capabilitiesEyebrow: "Core Capabilities",
        capabilitiesTitle: "Capabilities across the aviation cycle.",
        capabilitiesCta: "Explore service",
        strategyEyebrow: "Strategic View",
        strategyTitle:
          "Aviation is a business asset and an operational system.",
        strategyText:
          "Every charter request, ownership structure, transaction, maintenance decision, or technical review affects cost, timing, risk, and long-term value. Sky Group is built around that broader reality, which is why our role goes beyond execution into informed guidance.",
        journeyEyebrow: "Why Trust Sky Group",
        journeyTitle: "Strategic coverage for private aviation.",
        journeyText:
          "Need immediate availability? We focus on operational coverage, faster response, concierge coordination, and clearer execution for high-value private aviation clients.",
        journeyPrimaryCta: "Get Instant Quote",
        journeySecondaryCta: "Speak to Advisor",
        journeyFootnote: "Response in under 15 minutes",
        finalEyebrow: "Next Step",
        finalTitle:
          "Charter, aircraft, operations connected.",
        finalText:
          "If you are planning a flight, evaluating an aircraft, structuring ownership, or looking for technical and operational support, we can help define the right next move.",
        finalPrimaryCta: "Contact Sky Group",
        finalSecondaryCta: "View Pricing Guidance",
      }
    : {
        heroEyebrow: "Sky Group",
        heroTitle:
          "Soporte estrategico para aviacion privada.",
        heroText:
          "Sky Group es un grupo aeronautico enfocado en charter ejecutivo, operaciones, transacciones de aeronaves y coordinacion tecnica para clientes que buscan una atencion mas clara y especializada.",
        heroPrimaryCta: "Hablar con Sky Group",
        heroSecondaryCta: "Explorar charter privado",
        introEyebrow: "Quienes somos",
        introTitle:
          "Ejecucion comercial, operativa y tecnica conectada.",
        introParagraphs: [
          "Sky Group opera con una estructura pensada para reducir friccion a clientes que necesitan mas de un servicio aeronautico. En lugar de tratar charter, asesoria de aeronaves, soporte tecnico y operaciones como silos separados, los alineamos bajo un mismo enfoque coordinado.",
          "Eso vuelve la experiencia mas clara para propietarios, ejecutivos, operadores y compradores que necesitan respuesta, supervision y un equipo que entienda tanto la parte estrategica como la operativa de la aviacion.",
        ],
        experienceAlt: "Entorno de aviacion ejecutiva",
        experienceEyebrow: "Como trabajamos",
        experienceTitle: "Experiencia con estructura operativa.",
        experienceText:
          "Abordamos la aviacion con una mezcla de criterio comercial, disciplina operativa, atencion regulatoria y trato premium al cliente. El objetivo no es solo mover aeronaves o coordinar vuelos, sino proteger tiempo, reducir complejidad y apoyar mejores decisiones.",
        capabilitiesEyebrow: "Capacidades clave",
        capabilitiesTitle: "Capacidades para todo el ciclo de aviacion.",
        capabilitiesCta: "Explorar servicio",
        strategyEyebrow: "Vision estrategica",
        strategyTitle:
          "La aviacion es un activo y un sistema operativo.",
        strategyText:
          "Cada solicitud de charter, estructura de propiedad, transaccion, decision de mantenimiento o revision tecnica afecta costo, tiempo, riesgo y valor de largo plazo. Sky Group esta construido alrededor de esa realidad, por eso nuestro rol va mas alla de ejecutar y se convierte en una guia informada.",
        journeyEyebrow: "Por que confiar en Sky Group",
        journeyTitle: "Cobertura estrategica para aviacion privada.",
        journeyText:
          "Necesitas disponibilidad inmediata? Nuestro enfoque esta en cobertura operativa, respuesta mas rapida, coordinacion premium y ejecucion mas clara para clientes de aviacion ejecutiva.",
        journeyPrimaryCta: "Cotizar vuelo ahora",
        journeySecondaryCta: "Hablar con asesor",
        journeyFootnote: "Respuesta en menos de 15 minutos",
        finalEyebrow: "Siguiente paso",
        finalTitle:
          "Charter, aeronaves y operaciones conectadas.",
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
          title: "Private Charter",
          text: "Private flights designed for business mobility, urgent missions, and premium travel coordination.",
        },
        {
          route: "AircraftSales",
          title: "Aircraft acquisition and sales",
          text: "Advisory support for sourcing, valuation, negotiation, and transaction oversight.",
        },
        {
          route: "OperationsManagement",
          title: "Aircraft Management",
          text: "Structured oversight for compliance, crew coordination, maintenance planning, and control.",
        },
        {
          route: "PrePurchaseInspection",
          title: "Pre-purchase advisory",
          text: "Technical review and due diligence support before major aircraft decisions.",
        },
        {
          route: "ImportExport",
          title: "Import & Export",
          text: "Cross-border coordination for aircraft, components, documentation, and regulatory flow.",
        },
        {
          route: "Avionics",
          title: "Avionics & Systems",
          text: "Support for aircraft systems, modernization, and operational readiness.",
        },
      ]
    : [
        {
          route: "AirTaxi",
          title: "Vuelos privados",
          text: "Vuelos privados pensados para movilidad de negocios, misiones urgentes y coordinacion premium de viaje.",
        },
        {
          route: "AircraftSales",
          title: "Venta y adquisicion de aeronaves",
          text: "Soporte de asesoria para busqueda, valuacion, negociacion y supervision transaccional.",
        },
        {
          route: "OperationsManagement",
          title: "Administracion operativa",
          text: "Supervision estructurada para cumplimiento, coordinacion de tripulacion, planeacion de mantenimiento y control.",
        },
        {
          route: "PrePurchaseInspection",
          title: "Asesoria precompra",
          text: "Revision tecnica y soporte de debida diligencia antes de decisiones importantes sobre aeronaves.",
        },
        {
          route: "ImportExport",
          title: "Importacion y exportacion",
          text: "Coordinacion transfronteriza para aeronaves, componentes, documentacion y flujo regulatorio.",
        },
        {
          route: "Avionics",
          title: "Avionica y sistemas",
          text: "Soporte para sistemas de aeronaves, modernizacion y alistamiento operativo.",
        },
      ]
);

const timeline = computed(() =>
  locale.value === "en"
    ? [
        {
          stage: "Availability",
          title: "Disponibilidad de aeronave",
          text: "Real charter review built around route, timing, aircraft category, and mission urgency.",
        },
        {
          stage: "Coverage",
          title: "Cobertura operativa",
          text: "Support across Mexico, LATAM, and international routes with stronger execution visibility.",
        },
        {
          stage: "Response",
          title: "Tiempo de respuesta",
          text: "Commercial follow-up designed to move quickly when the client needs a serious answer fast.",
        },
        {
          stage: "Concierge",
          title: "Coordinacion premium",
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
  background: url("/images/About/About.png") center/cover no-repeat;
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

.capabilities-stream {
  display: grid;
  gap: 0;
  border-top: 1px solid rgba(215, 176, 116, 0.18);
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

.strategy-section {
  text-align: center;
}

.strategy-shell {
  max-width: 980px;
  margin: 0 auto;
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
    radial-gradient(circle at top left, rgba(212, 175, 55, 0.14), transparent 24%),
    linear-gradient(135deg, rgba(9, 21, 37, 0.98), rgba(18, 43, 70, 0.94));
  border: 1px solid rgba(255, 255, 255, 0.08);
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
  .cta-shell {
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
