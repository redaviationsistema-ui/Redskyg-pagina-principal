<template>
    <section class="pricing-page">
      <section class="pricing-hero">
        <div class="hero-overlay"></div>
        <div class="container hero-content">
          <span class="eyebrow">Vuelos Privados en Mexico</span>
          <h1>Precios para vuelos privados en Mexico y private jet charter in Mexico segun ruta, aeronave y operacion.</h1>
          <p>
            Sky Group no maneja tarifas planas porque la categoria de aeronave, la ruta, los aeropuertos, el posicionamiento de tripulacion y los requerimientos tecnicos cambian el costo final de cada operacion.
          </p>
          <div class="hero-actions">
            <a class="btn-primary" :href="whatsappHref" target="_blank" rel="noopener noreferrer">{{ locale.value === "en" ? "Request a Quote" : "Solicitar cotizacion" }}</a>
            <RouterLink class="btn-ghost" :to="toLocalizedRoute('Contact')">{{ locale.value === "en" ? "Speak With Operations" : "Hablar con operaciones" }}</RouterLink>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container intro-grid">
          <div>
            <span class="eyebrow">{{ locale.value === "en" ? "How Pricing Works" : "Como funciona el precio" }}</span>
            <h2>{{ locale.value === "en" ? "What impacts the final proposal." : "Que impacta la propuesta final." }}</h2>
          </div>

          <div class="factors-grid">
            <article v-for="factor in factors" :key="factor.title" class="factor-card">
              <h3>{{ factor.title }}</h3>
              <p>{{ factor.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="section dark-section">
        <div class="container service-grid">
          <article v-for="item in servicePricing" :key="item.title" class="service-card">
            <span>{{ item.tag }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </article>
        </div>
      </section>

      <section class="section">
        <div class="container quote-shell">
          <div>
            <span class="eyebrow">{{ locale.value === "en" ? "Faster Quotes" : "Cotizaciones mas rapidas" }}</span>
            <h2>{{ locale.value === "en" ? "Send the right details and we can respond faster." : "Comparte los datos correctos y respondemos mas rapido." }}</h2>
            <p>{{ locale.value === "en" ? "For charter requests, share route, dates, passenger count, and any schedule flexibility. For aircraft transactions or management support, include the aircraft model, current location, and your objective." : "Para solicitudes de charter, comparte ruta, fechas, numero de pasajeros y cualquier flexibilidad de horario. Para transacciones o administracion de aeronaves, incluye modelo, ubicacion actual y objetivo." }}</p>
          </div>

          <div class="quote-list">
            <article v-for="item in quoteChecklist" :key="item" class="quote-item">
              {{ item }}
            </article>
          </div>
        </div>
      </section>

      <section class="section final-cta">
        <div class="container cta-shell">
          <h2>{{ locale.value === "en" ? "Need a charter, aircraft advisory, or technical scope priced correctly?" : "Necesitas cotizar bien un charter, una asesoria aeronautica o un alcance tecnico?" }}</h2>
          <p>{{ locale.value === "en" ? "We can review the mission and route it to the right team so the quote reflects the real operational requirements from the start." : "Podemos revisar la operacion y dirigirla al equipo correcto para que la propuesta refleje los requerimientos reales desde el inicio." }}</p>
          <div class="hero-actions">
            <a class="btn-primary" :href="whatsappHref" target="_blank" rel="noopener noreferrer">{{ locale.value === "en" ? "Get Pricing Support" : "Recibir apoyo de precios" }}</a>
            <RouterLink class="btn-ghost dark" :to="toLocalizedRoute('AirTaxi')">{{ locale.value === "en" ? "Explore Charter Services" : "Explorar servicios de charter" }}</RouterLink>
          </div>
        </div>
      </section>
    </section>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useLocale } from "../i18n";

const { locale, toLocalizedRoute } = useLocale();

const whatsappHref =
  locale.value === "en"
    ? "https://wa.me/525586186576?text=Hello,%20I%20would%20like%20pricing%20information%20for%20a%20private%20flight%20or%20aviation%20service."
    : "https://wa.me/525586186576?text=Hola,%20quiero%20informacion%20de%20precios%20para%20un%20vuelo%20privado%20o%20servicio%20aeronautico.";

const factors = [
  {
    title: locale.value === "en" ? "Aircraft category" : "Categoria de aeronave",
    text: locale.value === "en" ? "Light jets, midsize aircraft, heavy jets, helicopters, and specialized aircraft each carry different fixed and variable cost structures." : "Jets ligeros, midsize, heavy jets, helicopteros y aeronaves especializadas tienen estructuras de costo distintas.",
  },
  {
    title: locale.value === "en" ? "Route and airport profile" : "Ruta y perfil de aeropuertos",
    text: locale.value === "en" ? "Flight time, repositioning, permits, airport fees, and access to private terminals all affect the final quote." : "Tiempo de vuelo, posicionamiento, permisos, tarifas aeroportuarias y acceso a terminales privadas afectan la cotizacion final.",
  },
  {
    title: locale.value === "en" ? "Availability and timing" : "Disponibilidad y tiempos",
    text: locale.value === "en" ? "Short-notice requests, peak travel windows, and overnight crew requirements can shift pricing materially." : "Solicitudes urgentes, ventanas de alta demanda y requerimientos de pernocta de tripulacion pueden mover el precio.",
  },
  {
    title: locale.value === "en" ? "Operational scope" : "Alcance operativo",
    text: locale.value === "en" ? "Advisory, management, technical support, import-export coordination, and acquisitions are scoped according to complexity and timeline." : "Asesoria, administracion, soporte tecnico, importacion-exportacion y adquisiciones se cotizan segun complejidad y calendario.",
  },
];

const servicePricing = [
  {
    tag: locale.value === "en" ? "Charter" : "Charter",
    title: locale.value === "en" ? "Private flight pricing" : "Precio de vuelo privado",
    text: locale.value === "en" ? "Quoted based on route, aircraft category, positioning, crew logistics, passenger needs, and mission timing." : "Se cotiza segun ruta, categoria de aeronave, posicionamiento, logistica de tripulacion, necesidades de pasajeros y tiempo de operacion.",
  },
  {
    tag: locale.value === "en" ? "Management" : "Gestion",
    title: locale.value === "en" ? "Aircraft administration programs" : "Programas de administracion de aeronaves",
    text: locale.value === "en" ? "Structured according to the aircraft profile, operational oversight required, compliance load, and reporting scope." : "Se estructuran de acuerdo con el perfil de la aeronave, el nivel de supervision requerido, cumplimiento y reporteo.",
  },
  {
    tag: locale.value === "en" ? "Transactions" : "Transacciones",
    title: locale.value === "en" ? "Aircraft acquisition and sales advisory" : "Asesoria para compra y venta de aeronaves",
    text: locale.value === "en" ? "Advisory fees depend on sourcing requirements, due diligence complexity, valuation work, and transaction support." : "Los honorarios dependen del sourcing, la debida diligencia, la valuacion y el soporte transaccional.",
  },
  {
    tag: locale.value === "en" ? "Technical" : "Tecnico",
    title: locale.value === "en" ? "Avionics, engines, and import-export support" : "Avionica, motores e importacion-exportacion",
    text: locale.value === "en" ? "Technical and logistics pricing is built around certification review, parts scope, transport, and regulatory coordination." : "El precio tecnico y logistico se construye alrededor de certificaciones, alcance de partes, transporte y coordinacion regulatoria.",
  },
];

const quoteChecklist = [
  locale.value === "en" ? "Departure and destination airports" : "Aeropuerto de salida y destino",
  locale.value === "en" ? "Preferred dates and time windows" : "Fechas preferidas y ventanas de horario",
  locale.value === "en" ? "Passenger count and baggage profile" : "Numero de pasajeros y equipaje",
  locale.value === "en" ? "Aircraft model or service type when available" : "Modelo de aeronave o tipo de servicio si ya se conoce",
  locale.value === "en" ? "Whether the request is urgent, recurring, or one-time" : "Si la solicitud es urgente, recurrente o unica",
];
</script>

<style scoped>
.pricing-page {
  background: linear-gradient(180deg, #071320 0%, #0b1220 100%);
  color: white;
}

.pricing-hero {
  position: relative;
  padding: 11rem 0 5rem;
  background:
    linear-gradient(120deg, rgba(5, 15, 30, 0.94), rgba(5, 15, 30, 0.72)),
    url("/images/Home/home2.jpg") center/cover no-repeat;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at right center, rgba(123, 183, 255, 0.14), transparent 28%);
}

.hero-content,
.intro-grid,
.quote-shell,
.cta-shell {
  position: relative;
  z-index: 1;
}

.eyebrow {
  display: inline-block;
  color: #7bb7ff;
  letter-spacing: 0.24em;
  font-size: 0.76rem;
  text-transform: uppercase;
}

.hero-content h1,
.intro-grid h2,
.quote-shell h2,
.cta-shell h2 {
  font-size: clamp(2.2rem, 4vw, 4rem);
  margin: 1rem 0 1.2rem;
}

.hero-content p,
.factor-card p,
.service-card p,
.quote-shell p,
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
  background: linear-gradient(135deg, #d4af37, #f3d67a);
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

.intro-grid,
.quote-shell {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 2rem;
  align-items: start;
}

.factors-grid,
.service-grid {
  display: grid;
  gap: 1rem;
}

.factors-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.factor-card,
.service-card,
.quote-item,
.cta-shell {
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  padding: 1.5rem;
}

.service-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.service-card span {
  color: #d4af37;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.service-card h3,
.factor-card h3 {
  margin: 0.8rem 0;
}

.quote-list {
  display: grid;
  gap: 0.8rem;
}

.quote-item {
  color: rgba(255, 255, 255, 0.86);
}

.cta-shell {
  text-align: center;
  background:
    radial-gradient(circle at top left, rgba(212, 175, 55, 0.14), transparent 24%),
    linear-gradient(135deg, rgba(10, 24, 42, 0.98), rgba(18, 43, 70, 0.95));
}

@media (max-width: 1100px) {
  .service-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .intro-grid,
  .quote-shell,
  .factors-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .service-grid,
  .hero-actions {
    grid-template-columns: 1fr;
  }

  .hero-actions {
    flex-direction: column;
  }

  .btn-primary,
  .btn-ghost {
    width: 100%;
  }
}
</style>
