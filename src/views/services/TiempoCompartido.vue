<template>
    <section class="fractional-page">
      <section class="hero">
        <img
          class="hero-bg"
          src="/images/Tiempocompartido/timempocompartido3.jpg"
          :alt="content.heroAlt"
          fetchpriority="high"
          decoding="async"
        />
        <div class="hero-overlay"></div>

        <div class="container hero-content">
          <span class="eyebrow">{{ content.heroEyebrow }}</span>
          <h1>{{ content.heroTitle }}</h1>
          <p>{{ content.heroText }}</p>
          <div class="hero-actions">
            <RouterLink class="btn-primary" :to="toLocalizedRoute('Contact')">{{ content.heroPrimaryCta }}</RouterLink>
            <RouterLink class="btn-ghost" :to="toLocalizedRoute('CoOwnership')">{{ content.heroSecondaryCta }}</RouterLink>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container split-grid">
          <div>
            <span class="eyebrow">{{ content.structureEyebrow }}</span>
            <h2>{{ content.structureTitle }}</h2>
            <p>{{ content.structureText }}</p>
          </div>

          <div class="bullet-grid">
            <article v-for="item in structureItems" :key="item" class="bullet-card">
              {{ item }}
            </article>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="section-heading">
            <span class="eyebrow">{{ content.visualEyebrow }}</span>
            <h2>{{ content.visualTitle }}</h2>
            <p>{{ content.visualText }}</p>
          </div>

          <div class="visual-grid visual-grid-wide">
            <article v-for="item in visuals" :key="item.src" class="visual-card">
              <img :src="item.src" :alt="item.alt" loading="lazy" decoding="async" />
              <div class="visual-card-body">
                <h3>{{ item.title }}</h3>
                <p>{{ item.text }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="section dark-section">
        <div class="container card-grid">
          <article v-for="item in advantages" :key="item.title" class="info-card">
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </article>
        </div>
      </section>

      <section class="section">
        <div class="container split-grid">
          <div>
            <span class="eyebrow">{{ content.fitEyebrow }}</span>
            <h2>{{ content.fitTitle }}</h2>
          </div>

          <div class="card-grid compact">
            <article v-for="item in idealFor" :key="item.title" class="info-card">
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="section final-cta">
        <div class="container cta-shell">
          <h2>{{ content.finalTitle }}</h2>
          <p>{{ content.finalText }}</p>
          <div class="hero-actions">
            <RouterLink class="btn-primary" :to="toLocalizedRoute('Contact')">{{ content.finalPrimaryCta }}</RouterLink>
            <RouterLink class="btn-ghost dark" :to="toLocalizedRoute('AircraftSales')">{{ content.finalSecondaryCta }}</RouterLink>
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
        heroAlt: "Fractional aircraft ownership program",
        heroEyebrow: "Fractional Ownership",
        heroTitle: "Fractional ownership with structured access.",
        heroText: "Fractional ownership is designed for clients who need frequent access to executive aviation with stronger cost discipline and more predictability than occasional charter.",
        heroPrimaryCta: "Request Ownership Analysis",
        heroSecondaryCta: "Compare With Co-Ownership",
        structureEyebrow: "Program Structure",
        structureTitle: "What the program includes.",
        structureText: "Clients acquire a defined share in a professionally managed aircraft program and receive allocated hours, operational support, and a more structured cost model.",
        visualEyebrow: "Program Experience",
        visualTitle: "The unused images fit the access story of fractional ownership.",
        visualText: "One image reinforces the onboard experience and the other the recurring travel rhythm that gives this model its value.",
        fitEyebrow: "Best Fit",
        fitTitle: "Who this model fits.",
        finalTitle: "Compare ownership models with technical guidance.",
        finalText: "We can review your flight volume, budget priorities, and operational goals to recommend the most efficient model.",
        finalPrimaryCta: "Schedule Ownership Review",
        finalSecondaryCta: "Explore Full Ownership Options",
      }
    : {
        heroAlt: "Programa de propiedad fraccional de aeronaves",
        heroEyebrow: "Propiedad fraccional",
        heroTitle: "Propiedad fraccional con acceso estructurado.",
        heroText: "El tiempo compartido esta pensado para clientes que necesitan acceso frecuente a aviacion ejecutiva con mayor disciplina de costos y mas previsibilidad que un charter ocasional.",
        heroPrimaryCta: "Solicitar analisis de propiedad",
        heroSecondaryCta: "Comparar con copropiedad",
        structureEyebrow: "Estructura del programa",
        structureTitle: "Lo que incluye el programa.",
        structureText: "Los clientes adquieren una participacion definida dentro de un programa de aeronave administrado profesionalmente y reciben horas asignadas, soporte operativo y un modelo de costos mas estructurado.",
        visualEyebrow: "Experiencia del programa",
        visualTitle: "Las imagenes libres encajan con la historia de acceso del tiempo compartido.",
        visualText: "Una refuerza la experiencia a bordo y la otra el ritmo de viaje recurrente que le da valor a este modelo.",
        fitEyebrow: "Mejor ajuste",
        fitTitle: "Para quien encaja este modelo.",
        finalTitle: "Compare esquemas de propiedad con criterio tecnico.",
        finalText: "Podemos revisar tu volumen de vuelo, prioridades de presupuesto y objetivos operativos para recomendar el modelo mas eficiente.",
        finalPrimaryCta: "Agendar revision de propiedad",
        finalSecondaryCta: "Explorar opciones de propiedad total",
      }
);

const structureItems = computed(() =>
  locale.value === "en"
    ? [
        "Defined equity share in the aircraft or fleet structure",
        "Allocated annual flight hours",
        "Management and operational support",
        "Predictable monthly and hourly cost components",
        "Access to a structured private aviation framework",
      ]
    : [
        "Participacion definida en la aeronave o estructura de flota",
        "Horas anuales de vuelo asignadas",
        "Gestion y soporte operativo",
        "Componentes mensuales y por hora mas predecibles",
        "Acceso a una estructura organizada de aviacion privada",
      ]
);

const advantages = computed(() =>
  locale.value === "en"
    ? [
        {
          title: "Capital efficiency",
          text: "Lower capital exposure than full ownership while preserving more control than simple on-demand charter usage.",
        },
        {
          title: "Predictable access",
          text: "A defined ownership structure helps align availability, scheduling expectations, and long-term planning.",
        },
        {
          title: "Professional management",
          text: "Operations, compliance, maintenance, and administrative coordination are typically handled through a structured program.",
        },
        {
          title: "Strategic flexibility",
          text: "Fractional ownership can be a stronger fit for clients with recurring travel needs who are not yet ready for full ownership.",
        },
      ]
    : [
        {
          title: "Eficiencia de capital",
          text: "Menor exposicion de capital que la propiedad total mientras conserva mas control que el charter bajo demanda.",
        },
        {
          title: "Acceso predecible",
          text: "Una estructura de propiedad definida ayuda a alinear disponibilidad, expectativas de programacion y planeacion de largo plazo.",
        },
        {
          title: "Gestion profesional",
          text: "Operaciones, cumplimiento, mantenimiento y coordinacion administrativa suelen manejarse a traves de un programa estructurado.",
        },
        {
          title: "Flexibilidad estrategica",
          text: "La propiedad fraccional puede ser una mejor opcion para clientes con necesidades recurrentes de viaje que aun no desean propiedad total.",
        },
      ]
);

const idealFor = computed(() =>
  locale.value === "en"
    ? [
        {
          title: "Frequent executive travelers",
          text: "Clients who fly regularly and want more consistency than repeated spot charter requests.",
        },
        {
          title: "Companies with recurring regional mobility",
          text: "Organizations that benefit from a repeatable aviation model without assuming full ownership burden.",
        },
        {
          title: "Owners evaluating step-up options",
          text: "A good midpoint for clients comparing charter usage against direct aircraft acquisition.",
        },
      ]
    : [
        {
          title: "Viajeros ejecutivos frecuentes",
          text: "Clientes que vuelan con regularidad y quieren mas consistencia que solicitudes aisladas de charter.",
        },
        {
          title: "Empresas con movilidad regional recurrente",
          text: "Organizaciones que se benefician de un modelo aeronautico repetible sin asumir la carga de una propiedad total.",
        },
        {
          title: "Propietarios evaluando opciones intermedias",
          text: "Un buen punto medio para clientes que comparan uso de charter frente a adquisicion directa de aeronave.",
        },
      ]
);

const visuals = computed(() =>
  locale.value === "en"
    ? [
        {
          src: "/images/Tiempocompartido/tiempoCompartido.jpeg",
          alt: "Private aircraft cabin interior prepared for passengers",
          title: "Onboard comfort",
          text: "Supports the promise of a more refined and predictable travel experience for recurring private flyers.",
        },
        {
          src: "/images/Tiempocompartido/tiempocompartido1.jpeg",
          alt: "Aircraft wing during sunset flight",
          title: "Recurring access",
          text: "Connects well with the idea of scheduled, repeatable use instead of occasional charter demand.",
        },
      ]
    : [
        {
          src: "/images/Tiempocompartido/tiempoCompartido.jpeg",
          alt: "Interior de aeronave privada preparado para pasajeros",
          title: "Confort a bordo",
          text: "Refuerza la promesa de una experiencia de viaje mas refinada y predecible para usuarios recurrentes de aviacion privada.",
        },
        {
          src: "/images/Tiempocompartido/tiempocompartido1.jpeg",
          alt: "Ala de aeronave durante un vuelo al atardecer",
          title: "Acceso recurrente",
          text: "Conecta bien con la idea de uso programado y repetible, no con demanda ocasional de charter.",
        },
      ]
);
</script>

<style scoped>
.fractional-page {
  background: linear-gradient(180deg, #071320 0%, #0b1220 100%);
  color: white;
}

.hero {
  position: relative;
  min-height: 95vh;
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
    linear-gradient(90deg, rgba(5, 13, 23, 0.68) 0%, rgba(5, 13, 23, 0.48) 34%, rgba(5, 13, 23, 0.2) 62%, rgba(5, 13, 23, 0.38) 100%),
    linear-gradient(180deg, rgba(5, 13, 23, 0.08), rgba(5, 13, 23, 0.28));
}

.hero-content {
  position: relative;
  z-index: 1;
  padding-top: 8rem;
  padding-bottom: 4rem;
}

.section-heading {
  max-width: 760px;
  margin-bottom: 2rem;
}

.eyebrow {
  display: inline-block;
  color: #d8b26e;
  letter-spacing: 0.24em;
  font-size: 0.76rem;
  text-transform: uppercase;
}

.hero-content h1,
.split-grid h2,
.cta-shell h2 {
  max-width: 850px;
  font-size: clamp(2.4rem, 4.5vw, 4.4rem);
  margin: 1rem 0 1.2rem;
}

.hero-content p,
.split-grid p,
.info-card p,
.cta-shell p,
.section-heading p,
.visual-card p {
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

.split-grid {
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 2rem;
  align-items: start;
}

.bullet-grid,
.card-grid {
  display: grid;
  gap: 1rem;
}

.bullet-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.bullet-card,
.info-card,
.cta-shell {
  padding: 1.5rem;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.bullet-card {
  border-radius: 18px 36px 18px 36px;
  text-align: center;
}

.visual-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.visual-grid.visual-grid-wide {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.visual-card {
  display: grid;
  gap: 0.9rem;
  overflow: hidden;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1rem;
}

.visual-card img {
  aspect-ratio: 16 / 10;
}

.visual-card-body {
  padding: 0.2rem 0.3rem 0.5rem;
}

.visual-card h3 {
  margin-bottom: 0.65rem;
}

.card-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.card-grid.compact {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.info-card h3 {
  margin-bottom: 0.8rem;
}

.dark-section .info-card {
  min-height: 100%;
  border-radius: 32px;
  background:
    linear-gradient(180deg, rgba(8, 19, 34, 0.92), rgba(8, 19, 34, 0.74)),
    radial-gradient(circle at bottom right, rgba(212, 175, 55, 0.12), transparent 28%);
}

.split-grid .card-grid.compact .info-card {
  border-radius: 999px;
  text-align: center;
}

.cta-shell {
  text-align: center;
  background:
    radial-gradient(circle at top left, rgba(212, 175, 55, 0.14), transparent 24%),
    linear-gradient(135deg, rgba(10, 24, 42, 0.98), rgba(18, 43, 70, 0.94));
}

@media (max-width: 1100px) {
  .split-grid,
  .card-grid,
  .card-grid.compact,
  .bullet-grid,
  .visual-grid,
  .visual-grid.visual-grid-wide {
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
