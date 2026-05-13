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
            <RouterLink class="btn-ghost" :to="toLocalizedRoute('ImportExport')">{{ content.heroSecondaryCta }}</RouterLink>
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
    'linear-gradient(120deg, rgba(5, 15, 30, 0.92), rgba(5, 15, 30, 0.72)), url("/images/Service/TallerMotores2.png")',
};

const content = computed(() =>
  locale.value === "en"
    ? {
        heroEyebrow: "Engine Shop Support",
        heroTitle: "Technical and logistics support for high-value aircraft engine programs.",
        heroText: "Sky Group structures engine support around logistics, documentation, timing, and protection of critical aviation assets.",
        heroPrimaryCta: "Request Engine Consultation",
        heroSecondaryCta: "Explore Import and Export",
        sectionEyebrow: "Engine Coordination",
        sectionTitle: "Built for engine movements and technical support that require tighter execution.",
        sectionText: "This service supports clients dealing with engine logistics, documentation, technical handling, and coordination across multiple stakeholders and jurisdictions.",
        finalTitle: "Need support for engine logistics or technical coordination?",
        finalText: "We can help define the documentation, process flow, and next operational steps for high-value engine work.",
        finalPrimaryCta: "Talk to Technical Team",
        finalSecondaryCta: "View Pricing Guidance",
      }
    : {
        heroEyebrow: "Vuelos Privados en Mexico",
        heroTitle: "Soporte tecnico y logistico para programas de motores aeronauticos de alto valor.",
        heroText: "Sky Group estructura el soporte de motores alrededor de logistica, documentacion, tiempos y proteccion de activos aeronauticos criticos.",
        heroPrimaryCta: "Solicitar asesoria de motores",
        heroSecondaryCta: "Explorar importacion y exportacion",
        sectionEyebrow: "Coordinacion de motores",
        sectionTitle: "Pensado para movimientos de motores y soporte tecnico que requieren una ejecucion mas precisa.",
        sectionText: "Este servicio apoya a clientes que trabajan con logistica de motores, documentacion, manejo tecnico y coordinacion entre multiples participantes y jurisdicciones.",
        finalTitle: "Necesitas soporte para logistica de motores o coordinacion tecnica?",
        finalText: "Podemos ayudarte a definir documentacion, flujo de proceso y siguientes pasos operativos para trabajos de motores de alto valor.",
        finalPrimaryCta: "Hablar con equipo tecnico",
        finalSecondaryCta: "Ver guia de precios",
      }
);

const services = computed(() =>
  locale.value === "en"
    ? [
        { title: "Engine logistics planning", text: "Support for movement timing, process structure, and handling requirements." },
        { title: "Documentation support", text: "Coordination of the paperwork needed to move and trace engine assets correctly." },
        { title: "Stakeholder coordination", text: "A clearer workflow between technical, commercial, and logistics participants." },
        { title: "Asset protection focus", text: "Greater attention to traceability and execution quality for high-value engine work." },
      ]
    : [
        { title: "Planeacion logistica de motores", text: "Apoyo para tiempos de movimiento, estructura del proceso y requerimientos de manejo." },
        { title: "Soporte documental", text: "Coordinacion del papeleo necesario para mover y trazar correctamente los activos de motor." },
        { title: "Coordinacion de participantes", text: "Un flujo mas claro entre actores tecnicos, comerciales y logisticos." },
        { title: "Enfoque en proteccion del activo", text: "Mayor atencion a trazabilidad y calidad de ejecucion para trabajos de motores de alto valor." },
      ]
);

const outcomes = computed(() =>
  locale.value === "en"
    ? [
        { title: "Better process visibility", text: "Clients gain a clearer operational picture instead of fragmented updates." },
        { title: "Less avoidable friction", text: "Stronger coordination helps reduce preventable delays and handoff issues." },
        { title: "More confidence in execution", text: "High-value engine movements require control, not improvisation." },
      ]
    : [
        { title: "Mejor visibilidad del proceso", text: "Los clientes obtienen una fotografia operativa mas clara en lugar de actualizaciones fragmentadas." },
        { title: "Menos friccion evitable", text: "Una coordinacion mas fuerte ayuda a reducir retrasos prevenibles y problemas en relevos." },
        { title: "Mas confianza en la ejecucion", text: "Los movimientos de motores de alto valor requieren control, no improvisacion." },
      ]
);
</script>

<style scoped src="../../assets/service-base.css"></style>
