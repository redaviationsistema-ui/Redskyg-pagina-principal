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
            <RouterLink class="btn-ghost" :to="toLocalizedRoute('EngineShop')">{{ content.heroSecondaryCta }}</RouterLink>
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

          <div class="feature-stack">
            <article v-for="(item, index) in services" :key="item.title" class="feature-row">
              <span class="feature-row__index">{{ String(index + 1).padStart(2, "0") }}</span>
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
          <div class="timeline-list">
            <article v-for="(item, index) in outcomes" :key="item.title" class="timeline-item">
              <span class="timeline-item__index">{{ String(index + 1).padStart(2, "0") }}</span>
              <div>
                <h3>{{ item.title }}</h3>
                <p>{{ item.text }}</p>
              </div>
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
            <RouterLink class="btn-ghost dark" :to="toLocalizedRoute('Avionics')">{{ content.finalSecondaryCta }}</RouterLink>
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
  backgroundImage: 'url("/images/Service/ImportExport.png")',
  backgroundPosition: "center 38%",
};

const content = computed(() =>
  locale.value === "en"
    ? {
        heroEyebrow: "Aviation Import and Export",
        heroTitle: "Import and export support for aviation assets.",
        heroText: "Sky Group coordinates import and export processes that require tighter control over timing, documentation, logistics, and regulatory flow.",
        heroPrimaryCta: "Start Import or Export Process",
        heroSecondaryCta: "Explore Engine Services",
        sectionEyebrow: "International Coordination",
        sectionTitle: "Cross-border coordination with tighter control.",
        sectionText: "Whether the scope involves engines, avionics, or aircraft-related assets, this service helps align customs documentation, transport flow, and compliance requirements into one process.",
        finalTitle: "Need coordination for aviation import or export?",
        finalText: "We can review the shipment scope, jurisdictional requirements, and documentation needs to define the right operational path.",
        finalPrimaryCta: "Request Coordination",
        finalSecondaryCta: "Explore Avionics Support",
      }
    : {
        heroEyebrow: "Importacion y exportacion",
        heroTitle: "Importacion y exportacion para activos aeronauticos.",
        heroText: "Sky Group coordina procesos de importacion y exportacion que requieren mayor control sobre tiempos, documentacion, logistica y flujo regulatorio.",
        heroPrimaryCta: "Iniciar proceso de importacion o exportacion",
        heroSecondaryCta: "Explorar servicios de motores",
        sectionEyebrow: "Coordinacion internacional",
        sectionTitle: "Coordinacion transfronteriza con mayor control.",
        sectionText: "Ya sea que el alcance involucre motores, avionica o activos relacionados con aeronaves, este servicio ayuda a alinear documentacion aduanal, flujo de transporte y requisitos de cumplimiento en un solo proceso.",
        finalTitle: "Necesita coordinacion para importacion o exportacion?",
        finalText: "Podemos revisar el alcance del embarque, los requerimientos jurisdiccionales y las necesidades documentales para definir la ruta operativa correcta.",
        finalPrimaryCta: "Solicitar coordinacion",
        finalSecondaryCta: "Explorar soporte de avionica",
      }
);

const services = computed(() =>
  locale.value === "en"
    ? [
        { title: "Documentation control", text: "Support for filings, declarations, and movement-related paperwork." },
        { title: "Regulatory coordination", text: "Alignment with process requirements across jurisdictions and authorities." },
        { title: "Logistics flow", text: "More structured oversight of transport timing and handling of high-value assets." },
        { title: "Asset protection", text: "A process designed to reduce friction and improve traceability across the move." },
      ]
    : [
        { title: "Control documental", text: "Apoyo para tramites, declaraciones y papeleria vinculada al movimiento." },
        { title: "Coordinacion regulatoria", text: "Alineacion con requisitos de proceso entre jurisdicciones y autoridades." },
        { title: "Flujo logistico", text: "Supervision mas estructurada del transporte y manejo de activos de alto valor." },
        { title: "Proteccion del activo", text: "Un proceso disenado para reducir friccion y mejorar trazabilidad a lo largo del movimiento." },
      ]
);

const outcomes = computed(() =>
  locale.value === "en"
    ? [
        { title: "Clearer shipment path", text: "The process becomes easier to follow for clients and stakeholders." },
        { title: "Reduced administrative risk", text: "Better preparation helps lower the chance of documentation-related delays." },
        { title: "Stronger control over timing", text: "Coordination improves predictability in complex cross-border situations." },
      ]
    : [
        { title: "Ruta de embarque mas clara", text: "El proceso se vuelve mas facil de seguir para clientes y participantes." },
        { title: "Menor riesgo administrativo", text: "Una mejor preparacion ayuda a bajar la probabilidad de retrasos por documentacion." },
        { title: "Mayor control sobre tiempos", text: "La coordinacion mejora la previsibilidad en situaciones transfronterizas complejas." },
      ]
);
</script>

<style scoped src="../../assets/service-base.css"></style>
<style scoped>
.feature-stack {
  gap: 0.9rem;
}

.feature-row {
  grid-template-columns: 74px minmax(0, 1fr);
  padding: 1.3rem 1.4rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.035);
}

.timeline-list {
  gap: 1.4rem;
}

.timeline-item {
  grid-template-columns: 120px minmax(0, 1fr);
  padding: 1.6rem 1.7rem;
  border-radius: 30px;
  background:
    linear-gradient(180deg, rgba(8, 18, 31, 0.94), rgba(8, 18, 31, 0.72)),
    radial-gradient(circle at top right, rgba(212, 175, 55, 0.12), transparent 28%);
}

.timeline-item__index {
  align-self: start;
}

@media (max-width: 992px) {
  .timeline-item {
    grid-template-columns: 1fr;
  }
}
</style>
