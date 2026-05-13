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
        <div class="container split-grid">
          <div>
            <span class="eyebrow">{{ content.sectionEyebrow }}</span>
            <h2>{{ content.sectionTitle }}</h2>
            <p>{{ content.sectionText }}</p>
          </div>

          <div class="card-grid compact">
            <article v-for="item in services" :key="item.title" class="info-card">
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="section dark-section">
        <div class="container process-grid">
          <article v-for="item in outcomes" :key="item.title" class="info-card">
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </article>
        </div>
      </section>

      <section class="section final-cta">
        <div class="container cta-shell">
          <h2>{{ content.finalTitle }}</h2>
          <p>{{ content.finalText }}</p>
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
import { useLocale } from "../../i18n";

const { locale, toLocalizedRoute } = useLocale();

const heroStyle = {
  backgroundImage:
    'linear-gradient(120deg, rgba(5, 15, 30, 0.92), rgba(5, 15, 30, 0.72)), url("/images/Service/AdministracionOperativa.png")',
};

const content = computed(() =>
  locale.value === "en"
    ? {
        heroEyebrow: "Aircraft Management",
        heroTitle: "Aircraft operations management with stronger control, compliance, and cost visibility.",
        heroText: "Sky Group supports owners and operators who need a more structured management model for executive aviation and private flight operations.",
        heroPrimaryCta: "Request Consultation",
        heroSecondaryCta: "Explore Charter",
        sectionEyebrow: "Management Scope",
        sectionTitle: "Built for aircraft owners who need less friction and more oversight.",
        sectionText: "This service is designed to connect operations, regulatory control, maintenance planning, and reporting into one management structure so owners can focus on business priorities instead of day-to-day aircraft complexity.",
        finalTitle: "Need structured oversight for an aircraft you already own?",
        finalText: "We can review the operating profile, compliance scope, and technical needs to define the right management model.",
        finalPrimaryCta: "Talk to Operations",
        finalSecondaryCta: "View Pricing Guidance",
      }
    : {
        heroEyebrow: "Vuelos Privados en Mexico",
        heroTitle: "Administracion operativa de aeronaves con mayor control, cumplimiento y visibilidad de costos.",
        heroText: "Sky Group apoya a propietarios y operadores que necesitan una gestion mas estructurada para respaldar operaciones de aviacion ejecutiva y vuelos privados en Mexico.",
        heroPrimaryCta: "Solicitar asesoria",
        heroSecondaryCta: "Explorar charter",
        sectionEyebrow: "Alcance de gestion",
        sectionTitle: "Pensado para propietarios que necesitan menos friccion y mayor supervision.",
        sectionText: "Este servicio conecta operaciones, control regulatorio, planeacion de mantenimiento y reporteo dentro de una sola estructura de gestion para que el propietario pueda enfocarse en prioridades de negocio y no en la complejidad diaria de la aeronave.",
        finalTitle: "Necesitas supervision estructurada para una aeronave que ya posees?",
        finalText: "Podemos revisar el perfil operativo, el alcance de cumplimiento y las necesidades tecnicas para definir el modelo de gestion correcto.",
        finalPrimaryCta: "Hablar con operaciones",
        finalSecondaryCta: "Ver guia de precios",
      }
);

const services = computed(() =>
  locale.value === "en"
    ? [
        { title: "Regulatory compliance", text: "Oversight of certifications, documentation, and operating requirements." },
        { title: "Crew and scheduling", text: "Support for pilot coordination, readiness, and recurring flight planning." },
        { title: "Maintenance planning", text: "Structured technical oversight to reduce risk and improve aircraft availability." },
        { title: "Budget and reporting", text: "Clearer visibility into operating expenses, management priorities, and control." },
      ]
    : [
        { title: "Cumplimiento regulatorio", text: "Supervision de certificaciones, documentacion y requerimientos operativos." },
        { title: "Tripulacion y programacion", text: "Apoyo para coordinacion de pilotos, disponibilidad y planeacion recurrente de vuelos." },
        { title: "Planeacion de mantenimiento", text: "Supervision tecnica estructurada para reducir riesgo y mejorar disponibilidad de la aeronave." },
        { title: "Presupuesto y reporteo", text: "Mayor visibilidad sobre gastos operativos, prioridades de gestion y control." },
      ]
);

const outcomes = computed(() =>
  locale.value === "en"
    ? [
        { title: "Less operational complexity", text: "Owners gain a clearer decision framework instead of managing scattered issues reactively." },
        { title: "Better cost awareness", text: "Planning and reporting help reduce surprises and improve control over operating spend." },
        { title: "Stronger execution quality", text: "Commercial, operational, and technical priorities are handled in a more coordinated way." },
      ]
    : [
        { title: "Menos complejidad operativa", text: "Los propietarios ganan un marco de decision mas claro en lugar de administrar problemas dispersos de forma reactiva." },
        { title: "Mejor conciencia de costos", text: "La planeacion y el reporteo ayudan a reducir sorpresas y mejorar el control del gasto operativo." },
        { title: "Mayor calidad de ejecucion", text: "Las prioridades comerciales, operativas y tecnicas se atienden de una forma mas coordinada." },
      ]
);
</script>

<style scoped src="../../assets/service-base.css"></style>
