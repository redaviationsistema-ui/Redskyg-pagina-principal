<template>
  <section class="air-taxi-page">
    <section class="air-hero">
      <img
        class="air-hero__bg"
        src="/images/Service/IMG_0882.jpeg"
        :alt="locale.value === 'en' ? 'Private jet ready for executive charter service' : 'Jet privado listo para servicio de charter ejecutivo'"
        fetchpriority="high"
        decoding="async"
      />
      <div class="air-hero__veil"></div>

      <div class="container air-hero__grid">
        <div class="air-hero__copy reveal">
          <span class="air-eyebrow">{{ content.heroEyebrow }}</span>
          <h1>{{ content.heroTitle }}</h1>
          <p>{{ content.heroText }}</p>

        <div class="air-actions">
            <a class="air-btn air-btn--primary" :href="whatsappHref" target="_blank" rel="noopener noreferrer">
              {{ content.heroPrimaryCta }}
            </a>
            <RouterLink class="air-btn air-btn--ghost" :to="toLocalizedRoute('Contact')">
              {{ content.heroSecondaryCta }}
            </RouterLink>
          </div>
        </div>

        <aside class="air-hero__panel reveal reveal-delay">
          <div class="air-hero__summary">
            <article v-for="metric in metrics" :key="metric.label" class="air-metric">
              <strong>{{ metric.value }}</strong>
              <span>{{ metric.label }}</span>
            </article>
          </div>
        </aside>
      </div>
    </section>

    <section class="section air-intro">
      <div class="container">
        <div class="air-section-head reveal">
          <span class="air-eyebrow">{{ content.introEyebrow }}</span>
          <h2>{{ content.introTitle }}</h2>
          <p>{{ content.introText }}</p>
        </div>

        <div class="air-ribbons">
          <article
            v-for="(item, index) in highlights"
            :key="item.title"
            class="air-ribbon reveal"
            :style="{ transitionDelay: `${index * 120}ms` }"
          >
            <span class="air-ribbon__count">{{ String(index + 1).padStart(2, '0') }}</span>
            <div class="air-ribbon__body">
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section air-coverage">
      <div class="container air-coverage__grid">
        <div class="air-coverage__feature reveal">
          <div class="air-coverage__copy">
            <span class="air-eyebrow">{{ content.coverageEyebrow }}</span>
            <h2>{{ content.coverageTitle }}</h2>
            <p>{{ content.coverageText }}</p>

            <nav class="air-links">
              <RouterLink :to="toLocalizedRoute('OperationsManagement')">{{ content.coverageLinks.operations }}</RouterLink>
              <RouterLink :to="toLocalizedRoute('AircraftSales')">{{ content.coverageLinks.aircraft }}</RouterLink>
              <RouterLink :to="toLocalizedRoute('Contact')">{{ content.coverageLinks.contact }}</RouterLink>
            </nav>
          </div>

          <div class="air-coverage__visual">
            <img
              src="/images/Service/IMG_9259.jpg"
              :alt="locale.value === 'en' ? 'Private charter coverage aircraft' : 'Aeronave de cobertura charter privada'"
            />
          </div>
        </div>

        <div class="air-coverage__routes">
          <article
            v-for="(route, index) in routeTypes"
            :key="route.title"
            class="air-route reveal"
            :style="{ transitionDelay: `${index * 140}ms` }"
          >
            <h3>{{ route.title }}</h3>
            <p>{{ route.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section air-process">
      <div class="container">
        <div class="air-section-head reveal">
          <span class="air-eyebrow">{{ content.processEyebrow }}</span>
          <h2>{{ content.processTitle }}</h2>
        </div>

        <div class="air-process__grid">
          <div class="air-timeline">
            <article
              v-for="(step, index) in steps"
              :key="step.number"
              class="air-step reveal"
              :style="{ transitionDelay: `${index * 130}ms` }"
            >
              <span class="air-step__number">{{ step.number }}</span>
              <div>
                <h3>{{ step.title }}</h3>
                <p>{{ step.text }}</p>
              </div>
            </article>
          </div>

          <div class="air-process-visual__frame reveal reveal-delay">
            <img
              src="/images/Service/IMG_7634.jpg"
              :alt="locale.value === 'en' ? 'Private charter service coordination' : 'Coordinacion de servicio charter privado'"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="section air-faq">
      <div class="container">
        <div class="air-section-head reveal">
          <span class="air-eyebrow">{{ content.faqEyebrow }}</span>
          <h2>{{ content.faqTitle }}</h2>
        </div>

        <div class="air-faq-list">
          <article
            v-for="(faq, index) in faqs"
            :key="faq.question"
            class="air-faq-item reveal"
            :style="{ transitionDelay: `${index * 110}ms` }"
          >
            <h3>{{ faq.question }}</h3>
            <p>{{ faq.answer }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section air-cta">
      <div class="container">
        <div class="air-cta__shell reveal">
          <div>
            <span class="air-eyebrow">{{ content.ctaEyebrow }}</span>
            <h2>{{ content.ctaTitle }}</h2>
            <p>{{ content.ctaText }}</p>
          </div>

          <div class="air-actions air-actions--stack">
            <a class="air-btn air-btn--primary" :href="whatsappHref" target="_blank" rel="noopener noreferrer">
              {{ content.ctaPrimary }}
            </a>
            <RouterLink class="air-btn air-btn--ghost" :to="toLocalizedRoute('Pricing')">
              {{ content.ctaSecondary }}
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { useLocale } from "../../i18n";

const { locale, toLocalizedRoute } = useLocale();

const content = computed(() =>
  locale.value === "en"
    ? {
        heroEyebrow: "Private Jet Charter in Mexico",
        heroTitle: "Private aviation, coordinated with precision.",
        heroText: "Sky Group coordinates private flights in Mexico for corporate travel, urgent missions, executive itineraries, and cross-border requirements.",
        heroPrimaryCta: "Request a Quote",
        heroSecondaryCta: "Speak with the Charter Team",
        introEyebrow: "Why This Service",
        introTitle: "Private aviation aligned with the mission.",
        introText: "This service is built for clients who need aircraft availability, route review, and a commercial response aligned with mission requirements.",
        coverageEyebrow: "Charter Coverage",
        coverageTitle: "Private flight coordination across Mexico and beyond.",
        coverageText: "We support departures tied to executive activity in Toluca, Mexico City, Monterrey, Guadalajara, Cancun, Queretaro, and other strategic markets depending on mission profile and aircraft availability.",
        coverageLinks: {
          operations: "Operations Management",
          aircraft: "Aircraft Advisory",
          contact: "Contact Sky Group",
        },
        processEyebrow: "Booking Process",
        processTitle: "From request to confirmed itinerary.",
        faqEyebrow: "Charter FAQ",
        faqTitle: "Common questions before requesting charter.",
        ctaEyebrow: "Immediate Support",
        ctaTitle: "Need a private flight quote?",
        ctaText: "Send your route, travel date, passenger count, and preferred timing. We will review aircraft availability, mission profile, and the right next step.",
        ctaPrimary: "Quote by WhatsApp",
        ctaSecondary: "View Pricing Guidance",
      }
    : {
        heroEyebrow: "Vuelos privados en México",
        heroTitle: "Aviación privada, coordinada con precisión.",
        heroText: "Sky Group coordina vuelos privados en México para viajes corporativos, misiones urgentes, itinerarios ejecutivos y requerimientos de vuelo transfronterizo.",
        heroPrimaryCta: "Solicitar cotización",
        heroSecondaryCta: "Hablar con charter",
        introEyebrow: "Por qué este servicio",
        introTitle: "Vuelos privados coordinados alrededor de su misión.",
        introText: "Este servicio está pensado para clientes que requieren disponibilidad de aeronave, revisión de ruta y respuesta comercial alineada con los requerimientos de misión.",
        coverageEyebrow: "Cobertura de vuelos privados",
        coverageTitle: "Cobertura en México y más allá.",
        coverageText: "Apoyamos salidas vinculadas con actividad ejecutiva en Toluca, Ciudad de México, Monterrey, Guadalajara, Cancún, Querétaro y otras ubicaciones estratégicas según perfil de misión y disponibilidad.",
        coverageLinks: {
          operations: "Administración operativa",
          aircraft: "Asesoría de aeronaves",
          contact: "Contactar a Sky Group",
        },
        processEyebrow: "Proceso de coordinación",
        processTitle: "De la solicitud al itinerario confirmado.",
        faqEyebrow: "Preguntas frecuentes",
        faqTitle: "Preguntas frecuentes antes de coordinar su vuelo.",
        ctaEyebrow: "Atención inmediata",
        ctaTitle: "¿Necesita una cotización de vuelo privado?",
        ctaText: "Comparta ruta, fecha de viaje, número de pasajeros y ventana de horario. Revisaremos disponibilidad de aeronave, perfil de misión y el siguiente paso correcto.",
        ctaPrimary: "Cotizar por WhatsApp",
        ctaSecondary: "Ver guía de precios",
      }
);

const whatsappHref = computed(() =>
  locale.value === "en"
    ? "https://wa.me/525586186576?text=Hello,%20I%20would%20like%20to%20request%20a%20private%20flight%20quote."
    : "https://wa.me/525586186576?text=Hola,%20quiero%20solicitar%20una%20cotizacion%20de%20vuelo%20privado."
);

const metrics = computed(() => [
  { value: "Priority", label: locale.value === "en" ? "Quote review for time-sensitive missions" : "Respuesta para cotizacion y mision" },
  { value: "MX + INTL", label: locale.value === "en" ? "Domestic and international support" : "Cobertura nacional e internacional" },
  { value: locale.value === "en" ? "Direct" : "Directo", label: locale.value === "en" ? "Commercial and operational coordination" : "Coordinacion comercial y operativa" },
]);

const highlights = computed(() =>
  locale.value === "en"
    ? [
        {
          title: "Flexible scheduling",
          text: "Designed for clients who need route flexibility, private terminal access, and lower travel friction.",
        },
        {
          title: "Executive and urgent missions",
          text: "Ideal for business agendas, short-notice movements, and private trips where time control is critical.",
        },
        {
          title: "Commercially focused response",
          text: "The service flow is built to move efficiently from inquiry to a usable quote instead of leaving the traveler without direction.",
        },
      ]
    : [
        {
          title: "Programacion flexible",
          text: "Pensado para clientes que necesitan flexibilidad de ruta, acceso a terminal privada y menos friccion en el viaje.",
        },
        {
          title: "Misiones ejecutivas y urgentes",
          text: "Ideal para agendas de negocio, movimientos de corto aviso y viajes privados donde el control del tiempo es critico.",
        },
        {
          title: "Respuesta con enfoque comercial",
          text: "El flujo de servicio esta construido para avanzar rapido desde la consulta hasta una cotizacion real en lugar de dejar al visitante sin direccion.",
        },
      ]
);

const routeTypes = computed(() =>
  locale.value === "en"
    ? [
        {
          title: "Corporate travel",
          text: "Executive itineraries that prioritize time savings, discretion, and access to strategic airports.",
        },
        {
          title: "Regional and international routes",
          text: "Support for operations across Mexico and cross-border flights depending on permits, aircraft, and mission scope.",
        },
        {
          title: "Recurring charter demand",
          text: "A strong option for clients who require private aviation repeatedly and need a reliable response structure.",
        },
      ]
    : [
        {
          title: "Viaje corporativo",
          text: "Itinerarios ejecutivos que priorizan ahorro de tiempo, discrecion y acceso a aeropuertos estrategicos.",
        },
        {
          title: "Rutas regionales e internacionales",
          text: "Soporte para operaciones en Mexico y vuelos transfronterizos segun permisos, aeronave y alcance de la mision.",
        },
        {
          title: "Demanda recurrente de charter",
          text: "Una gran opcion para clientes que requieren aviacion privada de forma repetida y necesitan una estructura confiable de respuesta.",
        },
      ]
);

const steps = computed(() =>
  locale.value === "en"
    ? [
        {
          number: "01",
          title: "Share the flight requirement",
          text: "Tell us the route, dates, passenger count, baggage needs, and any timing restrictions.",
        },
        {
          number: "02",
          title: "Receive aircraft and quote guidance",
          text: "We align the proposal with the mission profile, aircraft type, schedule expectations, and level of service required.",
        },
        {
          number: "03",
          title: "Confirm and execute",
          text: "Once approved, the charter request moves into coordinated operational execution with our team.",
        },
      ]
    : [
        {
          number: "01",
          title: "Comparte la necesidad de vuelo",
          text: "Cuentanos ruta, fechas, numero de pasajeros, equipaje y cualquier restriccion de horario.",
        },
        {
          number: "02",
          title: "Recibe guia de aeronave y cotizacion",
          text: "Alineamos la propuesta con el perfil de mision, tipo de aeronave, expectativas de horario y nivel de servicio.",
        },
        {
          number: "03",
          title: "Confirma y ejecuta",
          text: "Una vez aprobada, la solicitud de charter pasa a ejecucion operativa coordinada con nuestro equipo.",
        },
      ]
);

const faqs = computed(() =>
  locale.value === "en"
    ? [
        {
          question: "How do I request a private flight quote?",
          answer:
            "Send your departure and arrival airports, date, passenger count, and whether the trip is one-way or round-trip. That gives the team enough context to start the quote properly.",
        },
        {
          question: "Do you handle urgent charter requests?",
          answer:
            "Yes. Urgent requests can be reviewed depending on aircraft availability, airport access, crew timing, and the operational feasibility of the route.",
        },
        {
          question: "Can Sky Group support flights outside Mexico?",
          answer:
            "Yes. International support depends on permits, aircraft profile, operational timing, and destination requirements.",
        },
      ]
    : [
        {
          question: "Como solicito una cotizacion de vuelo privado?",
          answer:
            "Comparte aeropuertos de salida y llegada, fecha, numero de pasajeros y si el viaje es sencillo o redondo. Eso le da al equipo suficiente contexto para iniciar bien la cotizacion.",
        },
        {
          question: "Atienden solicitudes urgentes de charter?",
          answer:
            "Si. Las solicitudes urgentes pueden revisarse segun disponibilidad de aeronave, acceso aeroportuario, tiempos de tripulacion y viabilidad operativa de la ruta.",
        },
        {
          question: "Sky Group puede apoyar vuelos fuera de Mexico?",
          answer:
            "Si. El soporte internacional depende de permisos, perfil de la aeronave, tiempos operativos y requisitos del destino.",
        },
      ]
);

let observer;

onMounted(() => {
  const elements = document.querySelectorAll(".reveal");

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  elements.forEach((element) => observer.observe(element));
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>
.air-taxi-page {
  background:
    radial-gradient(circle at top right, rgba(215, 176, 116, 0.1), transparent 22%),
    linear-gradient(180deg, #07111d 0%, #091625 48%, #07111d 100%);
  color: #f8f2e8;
}

.air-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.air-hero__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.04);
}

.air-hero__veil {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(5, 13, 23, 0.68) 0%, rgba(5, 13, 23, 0.48) 34%, rgba(5, 13, 23, 0.2) 62%, rgba(5, 13, 23, 0.38) 100%),
    linear-gradient(180deg, rgba(5, 13, 23, 0.08), rgba(5, 13, 23, 0.28));
}

.air-hero__grid,
.air-cta__shell {
  position: relative;
  z-index: 1;
}

.air-hero__grid {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
  gap: 3rem;
  align-items: end;
  padding-top: 8.5rem;
  padding-bottom: 5rem;
}

.air-hero__copy h1 {
  max-width: 10ch;
  margin: 1rem 0 1.4rem;
  font-size: clamp(3.4rem, 6.6vw, 6.5rem);
  line-height: 0.92;
  letter-spacing: -0.05em;
}

.air-hero__copy p,
.air-section-head p,
.air-ribbon p,
.air-coverage__copy p,
.air-route p,
.air-step p,
.air-faq-item p,
.air-cta__shell p {
  color: rgba(248, 242, 232, 0.8);
  line-height: 1.8;
}

.air-hero__copy p {
  max-width: 760px;
  font-size: 1.08rem;
}

.air-eyebrow,
.air-ribbon__count,
.air-step__number {
  display: inline-block;
  color: #d7b074;
  letter-spacing: 0.24em;
  font-size: 0.76rem;
  text-transform: uppercase;
}

.air-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.air-actions--stack {
  justify-content: flex-end;
}

.air-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 56px;
  padding: 0 1.6rem;
  border-radius: 999px;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.8rem;
  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease;
}

.air-btn:hover {
  transform: translateY(-3px);
}

.air-btn--primary {
  background: linear-gradient(135deg, #d5af53, #f1d78a);
  color: #08111b;
  font-weight: 700;
  box-shadow: 0 18px 44px rgba(215, 176, 116, 0.22);
}

.air-btn--ghost {
  color: #f8f2e8;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(9, 18, 31, 0.28);
  backdrop-filter: blur(14px);
}

.air-hero__panel {
  display: flex;
  justify-content: flex-end;
}

.air-hero__summary {
  width: min(100%, 360px);
  display: grid;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: 28px;
  background:
    linear-gradient(180deg, rgba(7, 17, 29, 0.86), rgba(7, 17, 29, 0.66)),
    radial-gradient(circle at top right, rgba(215, 176, 116, 0.2), transparent 36%);
  border: 1px solid rgba(215, 176, 116, 0.16);
  box-shadow: 0 26px 70px rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(18px);
}

.air-metric {
  padding: 1rem 1.05rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.air-metric strong {
  display: block;
  margin-bottom: 0.35rem;
  font-size: 1.8rem;
}

.air-metric span {
  color: rgba(248, 242, 232, 0.72);
}

.air-section-head {
  max-width: 780px;
  margin-bottom: 2.4rem;
}

.air-section-head h2,
.air-coverage__copy h2,
.air-cta__shell h2 {
  margin: 1rem 0;
  font-size: clamp(2rem, 3.4vw, 4rem);
  line-height: 0.96;
}

.air-ribbons {
  display: grid;
  border-top: 1px solid rgba(215, 176, 116, 0.18);
}

.air-ribbon {
  display: grid;
  grid-template-columns: 80px minmax(0, 1fr);
  gap: 1.5rem;
  padding: 1.8rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transition: transform 0.45s ease, border-color 0.45s ease, background 0.45s ease;
}

.air-ribbon:hover {
  transform: translateX(10px);
  border-color: rgba(215, 176, 116, 0.32);
  background: linear-gradient(90deg, rgba(215, 176, 116, 0.05), transparent 64%);
}

.air-ribbon__body {
  display: grid;
  grid-template-columns: minmax(240px, 0.7fr) minmax(0, 1fr);
  gap: 2rem;
  align-items: start;
}

.air-ribbon h3,
.air-route h3,
.air-step h3,
.air-faq-item h3 {
  font-size: clamp(1.3rem, 2vw, 2rem);
  line-height: 1.05;
}

.air-coverage {
  position: relative;
}

.air-coverage::before {
  content: "";
  position: absolute;
  inset: 12% 0 10%;
  background:
    radial-gradient(circle at 20% 30%, rgba(215, 176, 116, 0.08), transparent 22%),
    radial-gradient(circle at 80% 68%, rgba(90, 136, 194, 0.14), transparent 26%);
  pointer-events: none;
}

.air-coverage__grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(320px, 0.96fr) minmax(320px, 1.04fr);
  gap: 2.4rem;
  align-items: start;
}

.air-coverage__feature {
  display: grid;
  gap: 1.5rem;
  padding: 1.6rem;
  border-radius: 30px;
  background:
    linear-gradient(180deg, rgba(9, 20, 33, 0.86), rgba(7, 17, 29, 0.76)),
    radial-gradient(circle at top right, rgba(215, 176, 116, 0.12), transparent 34%);
  border: 1px solid rgba(215, 176, 116, 0.14);
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.22);
}

.air-coverage__copy {
  max-width: 38rem;
}

.air-links {
  display: grid;
  gap: 0.8rem;
  margin-top: 1.8rem;
}

.air-links a {
  color: #d7b074;
  text-decoration: none;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.78rem;
}

.air-coverage__visual {
  overflow: hidden;
  border-radius: 26px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.air-coverage__visual img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3.2;
  object-fit: cover;
  object-position: center 54%;
}

.air-coverage__routes {
  display: grid;
  gap: 1.15rem;
}

.air-route,
.air-step,
.air-faq-item {
  position: relative;
  padding: 1.55rem 0 1.55rem 1.6rem;
  border-radius: 0;
  background: transparent;
  border: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: none;
}

.air-route {
  padding: 1.7rem 1.55rem 1.7rem 1.9rem;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background:
    linear-gradient(180deg, rgba(8, 18, 30, 0.52), rgba(8, 18, 30, 0.18)),
    radial-gradient(circle at top right, rgba(215, 176, 116, 0.08), transparent 38%);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.14);
}

.air-route::before,
.air-step::before,
.air-faq-item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 1rem;
  bottom: 1rem;
  width: 2px;
  background: linear-gradient(180deg, rgba(215, 176, 116, 0.95), rgba(215, 176, 116, 0.1));
}

.air-timeline {
  display: grid;
  gap: 1rem;
}

.air-process__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(320px, 0.72fr);
  gap: 2.5rem;
  align-items: start;
}

.air-step {
  display: grid;
  grid-template-columns: 90px minmax(0, 1fr);
  gap: 1.4rem;
  align-items: start;
}

.air-faq-list {
  display: grid;
  gap: 1rem;
}

.air-process-visual__frame {
  overflow: hidden;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 26px 80px rgba(0, 0, 0, 0.24);
}

.air-process-visual__frame img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 7;
  object-fit: cover;
  object-position: center;
}

.air-cta__shell {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 2rem;
  align-items: center;
  padding: 2.6rem 2.3rem;
  border-radius: 34px;
  background:
    linear-gradient(115deg, rgba(7, 19, 32, 0.86), rgba(18, 41, 65, 0.78)),
    radial-gradient(circle at top left, rgba(215, 176, 116, 0.16), transparent 28%),
    url("/images/About/marco.jpg") center/cover no-repeat;
  border: 1px solid rgba(215, 176, 116, 0.16);
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
  .air-hero__grid,
  .air-coverage__grid,
  .air-process__grid,
  .air-cta__shell,
  .air-ribbon__body {
    grid-template-columns: 1fr;
  }

  .air-coverage__copy {
    max-width: none;
  }

  .air-coverage__visual img {
    aspect-ratio: 16 / 10;
  }

  .air-hero__panel,
  .air-actions--stack {
    justify-content: flex-start;
  }

  .air-hero__copy h1 {
    max-width: 11ch;
  }
}

@media (max-width: 768px) {
  .air-hero {
    min-height: auto;
  }

  .air-hero__grid {
    padding-top: 8rem;
    padding-bottom: 4rem;
  }

  .air-ribbon,
  .air-step {
    grid-template-columns: 1fr;
  }

  .air-hero__copy h1 {
    font-size: clamp(2.8rem, 15vw, 4.8rem);
  }
}

@media (max-width: 640px) {
  .air-actions {
    flex-direction: column;
  }

  .air-btn {
    width: 100%;
  }

  .air-hero__summary,
  .air-route,
  .air-step,
  .air-faq-item,
  .air-cta__shell {
    padding: 1.4rem;
  }

  .air-route,
  .air-step,
  .air-faq-item {
    padding-left: 1.2rem;
  }
}
</style>
