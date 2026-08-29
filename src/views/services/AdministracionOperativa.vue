<template>
    <section class="service-page">
      <section class="hero" :style="heroStyle">
        <div class="hero-overlay"></div>
        <div class="container hero-content">
          <span class="eyebrow">{{ content.heroEyebrow }}</span>
          <h1>{{ content.heroTitle }}</h1>
          <p>{{ content.heroText }}</p>
          <div class="hero-actions">
            <RouterLink class="btn-primary" :to="toLocalizedRoute('Contact')">{{ content.heroPrimaryCta }}</RouterLink>
            <RouterLink class="btn-ghost" :to="toLocalizedRoute('AirTaxi')">{{ content.heroSecondaryCta }}</RouterLink>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container split-grid split-grid-narrow">
          <div>
            <span class="eyebrow">{{ content.sectionEyebrow }}</span>
            <h2>{{ content.sectionTitle }}</h2>
            <p>{{ content.sectionText }}</p>
          </div>

          <div class="timeline-list">
            <article v-for="(item, index) in services" :key="item.title" class="timeline-item">
              <span class="timeline-item__index">{{ String(index + 1).padStart(2, "0") }}</span>
              <div>
                <h3>{{ item.title }}</h3>
                <p>{{ item.text }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="section dark-section">
        <div class="container">
          <div class="stat-band">
            <article v-for="item in outcomes" :key="item.title" class="stat-band__item">
              <span class="stat-band__label">{{ item.title }}</span>
              <p class="stat-band__value">{{ item.text }}</p>
            </article>
          </div>

          <figure class="outcomes-visual">
            <img src="/images/Service/admin2.jpg" :alt="content.heroTitle" loading="lazy" />
          </figure>
        </div>
      </section>

    </section>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { useLocale } from "../../i18n";

const { locale, toLocalizedRoute } = useLocale();

const heroStyle = {
  backgroundImage: 'url("/images/Service/admin.jpg")',
  backgroundPosition: "center 34%",
};

const content = computed(() =>
  locale.value === "en"
    ? {
        heroEyebrow: "Aircraft Management",
        heroTitle: "Aircraft management with operational control.",
        heroText: "We help owners and operators keep flight operations, maintenance planning, compliance and reporting under control.",
        heroPrimaryCta: "Request Dedicated Support",
        heroSecondaryCta: "Explore Charter",
        sectionEyebrow: "Management Scope",
        sectionTitle: "Operational oversight with clearer visibility.",
        sectionText: "We align flight operations, regulatory follow-up, maintenance planning and reporting so the aircraft can be managed with clearer control, stronger traceability and fewer loose ends.",
      }
    : {
        heroEyebrow: "Servicios aeronauticos",
        heroTitle: "Administracion de aeronaves con control operativo.",
        heroText: "Apoyamos a propietarios y operadores para mantener bajo control operaciones de vuelo, planeacion de mantenimiento, cumplimiento y reporteo.",
        heroPrimaryCta: "Solicitar soporte dedicado",
        heroSecondaryCta: "Explorar charter",
        sectionEyebrow: "Alcance de gestion",
        sectionTitle: "Supervision operativa con visibilidad real.",
        sectionText: "Alineamos operaciones de vuelo, seguimiento regulatorio, planeacion de mantenimiento y reporteo para administrar la aeronave con mas control, mayor trazabilidad y menos frentes sueltos.",
      }
);

const services = computed(() =>
  locale.value === "en"
    ? [
        { title: "Regulatory compliance", text: "Keep certifications, documentation, and operating requirements in order." },
        { title: "Crew and scheduling", text: "Coordinate pilots, readiness, and recurring flight planning with fewer loose ends." },
        { title: "Maintenance planning", text: "Reduce risk and protect aircraft availability with structured technical follow-up." },
        { title: "Budget and reporting", text: "Review operating expenses and management priorities with greater visibility." },
      ]
    : [
        { title: "Cumplimiento regulatorio", text: "Mantenga en orden certificaciones, documentacion y requerimientos operativos." },
        { title: "Tripulacion y programacion", text: "Coordine pilotos, disponibilidad y planeacion recurrente con menos frentes sueltos." },
        { title: "Planeacion de mantenimiento", text: "Reducimos riesgo y protegemos la disponibilidad de la aeronave con seguimiento tecnico estructurado." },
        { title: "Presupuesto y reporteo", text: "Revise con mayor claridad los gastos operativos y las prioridades de gestion." },
      ]
);

const outcomes = computed(() =>
  locale.value === "en"
    ? [
        { title: "Less operational complexity", text: "You can make decisions with more clarity instead of reacting to scattered issues." },
        { title: "Better cost awareness", text: "Planning and reporting help reduce surprises and keep spending under control." },
        { title: "Stronger execution quality", text: "Commercial, operational, and technical priorities move in a more coordinated way." },
      ]
    : [
        { title: "Menos complejidad operativa", text: "Tomas decisiones con mas claridad en lugar de reaccionar a problemas dispersos." },
        { title: "Mejor control de costos", text: "La planeacion y el reporteo te ayudan a reducir sorpresas y controlar mejor el gasto operativo." },
        { title: "Mayor calidad de ejecucion", text: "Las prioridades comerciales, operativas y tecnicas avanzan de forma mas coordinada." },
      ]
);
</script>

<style scoped src="../../assets/service-base.css"></style>
<style scoped>
.timeline-list {
  gap: 1.2rem;
}

.timeline-item {
  grid-template-columns: 72px minmax(0, 1fr);
  padding: 1.4rem;
  border-radius: 28px;
  background:
    linear-gradient(135deg, rgba(10, 24, 42, 0.96), rgba(10, 24, 42, 0.72)),
    radial-gradient(circle at top right, rgba(212, 175, 55, 0.14), transparent 32%);
  border-color: rgba(212, 175, 55, 0.12);
}

.timeline-item__index {
  min-width: 3.4rem;
  min-height: 3.4rem;
  background: rgba(255, 255, 255, 0.04);
}

.stat-band {
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.stat-band__item {
  padding: 1.7rem;
  border-radius: 28px;
}

.stat-band__value {
  font-size: 1.2rem;
  line-height: 1.7;
}

.outcomes-visual {
  margin: 0;
  overflow: hidden;
  border-radius: 30px;
  border: 1px solid rgba(212, 175, 55, 0.12);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.24);
}

.outcomes-visual img {
  display: block;
  width: 100%;
  min-height: 320px;
  max-height: 460px;
  object-fit: cover;
  object-position: center;
}

@media (max-width: 760px) {
  .stat-band {
    margin-bottom: 1.5rem;
  }

  .outcomes-visual {
    border-radius: 24px;
  }

  .outcomes-visual img {
    min-height: 220px;
    max-height: 300px;
  }
}
</style>
