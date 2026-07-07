<template>
    <section class="air-taxi-page">
      <section class="hero">
        <img
          class="hero-bg"
          src="/images/Service/TaxiAereo.png"
          :alt="locale === 'en' ? 'Private jet ready for executive charter service' : 'Jet privado listo para servicio de charter ejecutivo'"
          fetchpriority="high"
          decoding="async"
        />
        <div class="hero-overlay"></div>

        <div class="container hero-content">
          <span class="eyebrow">{{ content.heroEyebrow }}</span>
          <h1>{{ content.heroTitle }}</h1>
          <p>{{ content.heroText }}</p>

          <div class="hero-actions">
            <a class="btn-primary" :href="whatsappHref" target="_blank" rel="noopener noreferrer">
              {{ locale === "en" ? "Request Flight Quote" : "Solicitar cotizacion de vuelo" }}
            </a>
            <RouterLink class="btn-ghost" :to="toLocalizedRoute('Contact')">
              {{ locale === "en" ? "Talk to Charter Desk" : "Hablar con charter" }}
            </RouterLink>
          </div>

          <div class="hero-metrics">
            <article v-for="metric in metrics" :key="metric.label">
              <strong>{{ metric.value }}</strong>
              <span>{{ metric.label }}</span>
            </article>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="section-head">
            <span class="eyebrow">{{ locale === "en" ? "Why This Service" : "Por que este servicio" }}</span>
            <h2>{{ locale === "en" ? "Built for clients who need private aviation to move fast and perform well." : "Pensado para clientes que necesitan aviacion privada agil y efectiva." }}</h2>
            <p>{{ locale === "en" ? "This page now speaks more directly to users searching for executive charter, private jet rental, urgent private flights, and premium business travel solutions." : "Esta pagina habla de forma mas directa a usuarios que buscan charter ejecutivo, renta de jet privado, vuelos urgentes y soluciones premium de viaje de negocios." }}</p>
          </div>

          <div class="feature-grid">
            <article v-for="item in highlights" :key="item.title" class="feature-card">
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="section dark-section">
        <div class="container split-grid">
          <div class="coverage-copy">
            <span class="eyebrow">{{ locale === "en" ? "Charter Coverage" : "Cobertura charter" }}</span>
            <h2>{{ locale === "en" ? "Private flights from key business corridors in Mexico and beyond." : "Vuelos privados desde corredores clave de negocio en Mexico y mas alla." }}</h2>
            <p>{{ locale === "en" ? "We support departures tied to executive activity in Toluca, Mexico City, Monterrey, Guadalajara, Cancun, Queretaro, and other strategic locations depending on mission profile and aircraft availability." : "Apoyamos salidas vinculadas con actividad ejecutiva en Toluca, Ciudad de Mexico, Monterrey, Guadalajara, Cancun, Queretaro y otras ubicaciones estrategicas segun perfil de mision y disponibilidad." }}</p>

            <div class="coverage-links">
              <RouterLink :to="toLocalizedRoute('OperationsManagement')">{{ locale === "en" ? "Operations Management" : "Administracion operativa" }}</RouterLink>
              <RouterLink :to="toLocalizedRoute('AircraftSales')">{{ locale === "en" ? "Aircraft Advisory" : "Asesoria de aeronaves" }}</RouterLink>
              <RouterLink :to="toLocalizedRoute('Contact')">{{ locale === "en" ? "Contact Sky Group" : "Contactar a Sky Group" }}</RouterLink>
            </div>
          </div>

          <div class="route-grid">
            <article v-for="route in routeTypes" :key="route.title" class="route-card">
              <h3>{{ route.title }}</h3>
              <p>{{ route.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="section-head">
            <span class="eyebrow">{{ locale === "en" ? "Booking Process" : "Proceso de reserva" }}</span>
            <h2>{{ locale === "en" ? "A clearer path from inquiry to confirmed itinerary." : "Un camino mas claro desde la consulta hasta el itinerario confirmado." }}</h2>
          </div>

          <div class="process-grid">
            <article v-for="step in steps" :key="step.number" class="process-card">
              <span>{{ step.number }}</span>
              <h3>{{ step.title }}</h3>
              <p>{{ step.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="section faq-section">
        <div class="container">
          <div class="section-head">
            <span class="eyebrow">{{ locale === "en" ? "Charter FAQ" : "Preguntas frecuentes" }}</span>
            <h2>{{ locale === "en" ? "Questions clients ask before requesting a private flight." : "Dudas comunes antes de solicitar un vuelo privado." }}</h2>
          </div>

          <div class="faq-grid">
            <article v-for="faq in faqs" :key="faq.question" class="faq-card">
              <h3>{{ faq.question }}</h3>
              <p>{{ faq.answer }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="section final-cta">
        <div class="container cta-shell">
          <h2>{{ locale === "en" ? "Need a fast quote for a private flight?" : "Necesitas una cotizacion rapida para un vuelo privado?" }}</h2>
          <p>{{ locale === "en" ? "Send your route, travel date, passenger count, and schedule window. We will help define the right aircraft, mission profile, and next operational step." : "Comparte tu ruta, fecha de viaje, numero de pasajeros y ventana de horario. Te ayudamos a definir la aeronave correcta y el siguiente paso operativo." }}</p>

          <div class="hero-actions">
            <a class="btn-primary" :href="whatsappHref" target="_blank" rel="noopener noreferrer">
              {{ locale === "en" ? "Quote by WhatsApp" : "Cotizar por WhatsApp" }}
            </a>
            <RouterLink class="btn-ghost dark" :to="toLocalizedRoute('Pricing')">
              {{ locale === "en" ? "View Pricing Guidance" : "Ver guia de precios" }}
            </RouterLink>
          </div>
        </div>
      </section>
    </section>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { useLocale } from "../../i18n";

const { locale, toLocalizedRoute } = useLocale();

const content = computed(() =>
  locale.value === "en"
    ? {
        heroEyebrow: "Private Jet Charter in Mexico",
        heroTitle: "Private jet charter in Mexico with fast quoting, flexible routes, and direct operational support.",
        heroText: "Sky Group coordinates private jet charter in Mexico for corporate travel, urgent missions, executive agendas, and premium mobility inside and outside the country.",
      }
    : {
        heroEyebrow: "Vuelos privados en Mexico",
        heroTitle: "Vuelos privados en Mexico con cotizacion rapida, rutas flexibles y soporte operativo directo.",
        heroText: "Sky Group coordina private jet charter in Mexico para viajes corporativos, misiones urgentes, agendas ejecutivas y movilidad premium dentro y fuera del pais.",
      }
);

const whatsappHref = computed(() =>
  locale.value === "en"
    ? "https://wa.me/525586186576?text=Hello,%20I%20would%20like%20to%20request%20a%20private%20flight%20quote."
    : "https://wa.me/525586186576?text=Hola,%20quiero%20solicitar%20una%20cotizacion%20de%20vuelo%20privado."
);

const metrics = computed(() =>
  locale.value === "en"
    ? [
        { value: "24/7", label: "Quote and mission response" },
        { value: "MX + INTL", label: "Domestic and international support" },
        { value: "Direct", label: "Commercial and operational coordination" },
      ]
    : [
        { value: "24/7", label: "Respuesta para cotizacion y mision" },
        { value: "MX + INTL", label: "Cobertura nacional e internacional" },
        { value: "Directo", label: "Coordinacion comercial y operativa" },
      ]
);

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
          text: "The experience is built to move quickly from inquiry to a real quote instead of leaving the visitor without direction.",
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
          text: "La experiencia esta construida para avanzar rapido desde la consulta hasta una cotizacion real en lugar de dejar al visitante sin direccion.",
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
          text: "We align the proposal with mission profile, aircraft type, schedule expectations, and service level.",
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
</script>

<style scoped>
.air-taxi-page {
  background: linear-gradient(180deg, #071320 0%, #0b1220 100%);
  color: white;
}

.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(120deg, rgba(5, 15, 30, 0.94), rgba(5, 15, 30, 0.7)),
    radial-gradient(circle at right center, rgba(123, 183, 255, 0.14), transparent 28%);
}

.hero-content {
  position: relative;
  z-index: 1;
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

.hero-content h1,
.section-head h2,
.split-grid h2,
.cta-shell h2 {
  max-width: 860px;
  font-size: clamp(2.4rem, 4.6vw, 4.6rem);
  margin: 1rem 0 1.2rem;
}

.hero-content p,
.section-head p,
.feature-card p,
.route-card p,
.process-card p,
.faq-card p,
.cta-shell p,
.coverage-copy p {
  color: rgba(255, 255, 255, 0.76);
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.hero-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  max-width: 820px;
  margin-top: 2rem;
}

.hero-metrics article,
.feature-card,
.route-card,
.process-card,
.faq-card,
.cta-shell {
  padding: 1.6rem;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.hero-metrics strong {
  display: block;
  font-size: 1.4rem;
}

.hero-metrics span {
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.92rem;
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

.section-head {
  max-width: 780px;
  margin-bottom: 2rem;
}

.feature-grid,
.process-grid,
.faq-grid {
  display: grid;
  gap: 1rem;
}

.feature-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.feature-card h3,
.route-card h3,
.process-card h3,
.faq-card h3 {
  margin-bottom: 0.8rem;
  font-size: 1.2rem;
}

.split-grid {
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 2rem;
  align-items: start;
}

.route-grid,
.coverage-links {
  display: grid;
  gap: 1rem;
}

.coverage-links {
  margin-top: 1.5rem;
}

.coverage-links a {
  color: #7bb7ff;
  text-decoration: none;
}

.process-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.process-card span {
  color: #d4af37;
  font-size: 0.74rem;
  letter-spacing: 0.18em;
}

.faq-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.cta-shell {
  text-align: center;
  background:
    radial-gradient(circle at top left, rgba(212, 175, 55, 0.14), transparent 24%),
    linear-gradient(135deg, rgba(9, 21, 37, 0.98), rgba(18, 43, 70, 0.94));
}

@media (max-width: 992px) {
  .hero-metrics,
  .feature-grid,
  .split-grid,
  .process-grid,
  .faq-grid {
    grid-template-columns: 1fr;
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
}
</style>
