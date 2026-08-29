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
          <div class="outcomes-layout">
            <figure class="outcomes-image">
              <img src="/images/Home/IMG_3040.jpg" :alt="content.sectionTitle" loading="lazy" />
            </figure>

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
        </div>
      </section>

      <section class="section final-cta">
        <div class="container cta-shell">
          <div class="cta-layout">
            <div class="cta-copy">
              <h2>{{ content.finalTitle }}</h2>
              <p>{{ content.finalText }}</p>
              <div class="hero-actions">
                <RouterLink class="btn-primary" :to="toLocalizedRoute('Contact')">{{ content.finalPrimaryCta }}</RouterLink>
                <RouterLink class="btn-ghost dark" :to="toLocalizedRoute('Avionics')">{{ content.finalSecondaryCta }}</RouterLink>
              </div>
            </div>

            <figure class="cta-image">
              <img src="/images/Home/IMG_3084.jpg" :alt="content.finalTitle" loading="lazy" />
            </figure>
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
  backgroundImage: 'url("/images/Home/IMG_2992.jpg")',
  backgroundPosition: "center 42%",
};

const content = computed(() =>
  locale.value === "en"
    ? {
        heroEyebrow: "Aviation Import and Export",
        heroTitle: "Import and export support for aviation assets.",
        heroText: "Sky Group coordinates aviation import and export processes where timing, documentation, logistics and traceability require closer control.",
        heroPrimaryCta: "Start Import or Export Process",
        heroSecondaryCta: "Explore Engine Services",
        sectionEyebrow: "International Coordination",
        sectionTitle: "Cross-border coordination with tighter control.",
        sectionText: "Whether the scope involves engines, avionics, components or aircraft-related assets, this service aligns customs documentation, logistics flow and compliance requirements within one process.",
        finalTitle: "Need coordination for aviation import or export?",
        finalText: "We can review shipment scope, jurisdictional requirements and documentation needs to define the right operating path.",
        finalPrimaryCta: "Request Coordination",
        finalSecondaryCta: "Explore Avionics Support",
      }
    : {
        heroEyebrow: "Importacion y exportacion",
        heroTitle: "Importacion y exportacion para activos aeronauticos.",
        heroText: "Sky Group coordina procesos de importacion y exportacion aeronautica donde los tiempos, la documentacion, la logistica y la trazabilidad requieren mayor control.",
        heroPrimaryCta: "Iniciar proceso de importacion o exportacion",
        heroSecondaryCta: "Explorar servicios de motores",
        sectionEyebrow: "Coordinacion internacional",
        sectionTitle: "Coordinacion transfronteriza con mayor control.",
        sectionText: "Ya sea para motores, avionica, componentes o activos relacionados con aeronaves, este servicio alinea documentacion aduanal, flujo logistico y requisitos de cumplimiento dentro de un solo proceso.",
        finalTitle: "Necesita coordinacion para importacion o exportacion?",
        finalText: "Podemos revisar el alcance del embarque, los requerimientos jurisdiccionales y las necesidades documentales para definir la ruta operativa adecuada.",
        finalPrimaryCta: "Solicitar coordinacion",
        finalSecondaryCta: "Explorar soporte de avionica",
      }
);

const services = computed(() =>
  locale.value === "en"
    ? [
        { title: "Documentation control", text: "Support for filings, declarations, and movement-related paperwork." },
        { title: "Regulatory coordination", text: "Alignment with process requirements across jurisdictions and authorities." },
        { title: "Logistics flow", text: "Structured oversight of transport timing and the handling of high-value assets." },
        { title: "Asset protection", text: "A process designed to reduce friction and improve traceability throughout the move." },
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
        { title: "Reduced administrative risk", text: "Better preparation helps lower the risk of documentation-related delays." },
        { title: "Stronger control over timing", text: "Coordination improves predictability in complex cross-border movements." },
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

.outcomes-layout {
  display: grid;
  grid-template-columns: minmax(280px, 0.82fr) minmax(0, 1.18fr);
  gap: 1.5rem;
  align-items: start;
}

.outcomes-image {
  margin: 0;
  overflow: hidden;
  border-radius: 32px;
  border: 1px solid rgba(212, 175, 55, 0.12);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.24);
  position: sticky;
  top: 120px;
}

.outcomes-image img {
  display: block;
  width: 100%;
  min-height: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  object-position: center;
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

.cta-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
  gap: 2rem;
  align-items: center;
}

.cta-copy {
  min-width: 0;
}

.cta-image {
  margin: 0;
  overflow: hidden;
  border-radius: 30px;
  border: 1px solid rgba(212, 175, 55, 0.12);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.2);
}

.cta-image img {
  display: block;
  width: 100%;
  aspect-ratio: 5 / 4;
  object-fit: cover;
  object-position: center;
}

@media (max-width: 992px) {
  .outcomes-layout,
  .timeline-item {
    grid-template-columns: 1fr;
  }

  .outcomes-image {
    position: static;
  }

  .outcomes-image img {
    aspect-ratio: 16 / 10;
  }

  .cta-layout {
    grid-template-columns: 1fr;
  }
}
</style>
