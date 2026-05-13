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
  backgroundImage:
    'linear-gradient(120deg, rgba(5, 15, 30, 0.92), rgba(5, 15, 30, 0.72)), url("/images/Service/ImportExport.png")',
};

const content = computed(() =>
  locale.value === "en"
    ? {
        heroEyebrow: "Aviation Import and Export",
        heroTitle: "Aviation import and export support for aircraft, components, and specialized documentation.",
        heroText: "Sky Group coordinates import and export processes that require tighter control over timing, documentation, logistics, and regulatory flow.",
        heroPrimaryCta: "Start Import or Export Process",
        heroSecondaryCta: "Explore Engine Services",
        sectionEyebrow: "International Coordination",
        sectionTitle: "Built for aviation movements that cannot afford documentation or logistics gaps.",
        sectionText: "Whether the scope involves engines, avionics, or aircraft-related assets, this service helps align customs documentation, transport flow, and compliance requirements into one process.",
        finalTitle: "Need a more reliable import or export process for aviation assets?",
        finalText: "We can review the shipment scope, jurisdictional requirements, and documentation needs to define the right operational path.",
        finalPrimaryCta: "Request Coordination",
        finalSecondaryCta: "Explore Avionics Support",
      }
    : {
        heroEyebrow: "Vuelos Privados en Mexico",
        heroTitle: "Importacion y exportacion aeronautica para aeronaves, componentes y documentacion especializada.",
        heroText: "Sky Group coordina procesos de importacion y exportacion que requieren mayor control sobre tiempos, documentacion, logistica y flujo regulatorio.",
        heroPrimaryCta: "Iniciar proceso de importacion o exportacion",
        heroSecondaryCta: "Explorar servicios de motores",
        sectionEyebrow: "Coordinacion internacional",
        sectionTitle: "Pensado para movimientos aeronauticos que no pueden permitirse vacios documentales o logisticos.",
        sectionText: "Ya sea que el alcance involucre motores, avionica o activos relacionados con aeronaves, este servicio ayuda a alinear documentacion aduanal, flujo de transporte y requisitos de cumplimiento en un solo proceso.",
        finalTitle: "Necesitas un proceso de importacion o exportacion mas confiable para activos aeronauticos?",
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
