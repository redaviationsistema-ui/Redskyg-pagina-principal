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
            <RouterLink class="btn-ghost" :to="toLocalizedRoute('AircraftSales')">{{ content.heroSecondaryCta }}</RouterLink>
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
            <article v-for="(item, index) in checks" :key="item.title" class="feature-row">
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
          <div class="comparison-list">
            <article v-for="item in outcomes" :key="item.title" class="comparison-item">
              <span class="comparison-item__eyebrow">{{ content.outcomesEyebrow }}</span>
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

const heroStyle = {
  backgroundImage: 'url("/images/Service/AsesoriaPrecompra.png")',
  backgroundPosition: "center 40%",
};

const content = computed(() =>
  locale.value === "en"
    ? {
        heroEyebrow: "Pre-Purchase Advisory",
        heroTitle: "Pre-purchase advisory with technical review.",
        heroText: "Sky Group helps reduce acquisition risk through a structured review of the aircraft, its records, operating condition, and transaction context.",
        heroPrimaryCta: "Start Evaluation",
        heroSecondaryCta: "Explore Aircraft Advisory",
        sectionEyebrow: "Due Diligence",
        sectionTitle: "Technical due diligence before closing.",
        sectionText: "This service is built for buyers who need more than a quick inspection. It combines technical review, maintenance record analysis, valuation context, and risk identification so the acquisition decision is made with more clarity.",
        outcomesEyebrow: "Decision Impact",
        finalTitle: "Need pre-purchase review for an aircraft?",
        finalText: "We can help identify technical issues, documentation gaps, and broader transaction risks before they become expensive problems.",
        finalPrimaryCta: "Request Review",
        finalSecondaryCta: "Explore Aircraft Advisory",
      }
    : {
        heroEyebrow: "Asesoria precompra",
        heroTitle: "Asesoria precompra con criterio tecnico.",
        heroText: "Sky Group ayuda a reducir riesgos de adquisicion mediante una revision estructurada de la aeronave, sus registros, condicion operativa y contexto de la transaccion.",
        heroPrimaryCta: "Iniciar evaluacion",
        heroSecondaryCta: "Explorar asesoria de aeronaves",
        sectionEyebrow: "Debida diligencia",
        sectionTitle: "Debida diligencia tecnica antes de cerrar.",
        sectionText: "Este servicio esta pensado para compradores que necesitan mas que una inspeccion rapida. Combina revision tecnica, analisis de historiales de mantenimiento, contexto de valuacion e identificacion de riesgos para decidir con mayor claridad.",
        outcomesEyebrow: "Impacto en decision",
        finalTitle: "Necesita revision precompra para una aeronave?",
        finalText: "Podemos ayudarte a identificar problemas tecnicos, vacios documentales y riesgos transaccionales antes de que se conviertan en problemas costosos.",
        finalPrimaryCta: "Solicitar revision",
        finalSecondaryCta: "Explorar asesoria de aeronaves",
      }
);

const checks = computed(() =>
  locale.value === "en"
    ? [
        { title: "Aircraft condition review", text: "A clearer view of current technical status and operating concerns." },
        { title: "Maintenance record analysis", text: "Review of history, documentation quality, and maintenance continuity." },
        { title: "Valuation context", text: "Support to understand whether condition and pricing are aligned." },
        { title: "Transaction risk identification", text: "Early visibility into issues that could affect cost, timing, or decision quality." },
      ]
    : [
        { title: "Revision de condicion de aeronave", text: "Una vision mas clara del estado tecnico actual y de preocupaciones operativas." },
        { title: "Analisis de historiales de mantenimiento", text: "Revision del historial, calidad documental y continuidad de mantenimiento." },
        { title: "Contexto de valuacion", text: "Apoyo para entender si la condicion y el precio estan alineados." },
        { title: "Identificacion de riesgos transaccionales", text: "Visibilidad temprana de temas que pueden afectar costo, tiempos o calidad de decision." },
      ]
);

const outcomes = computed(() =>
  locale.value === "en"
    ? [
        { title: "Better buying clarity", text: "The buyer moves forward with more confidence and fewer assumptions." },
        { title: "Reduced technical surprises", text: "Problems are surfaced earlier, when they are still manageable." },
        { title: "Stronger negotiation position", text: "A better technical and commercial picture supports more informed negotiation." },
      ]
    : [
        { title: "Mayor claridad de compra", text: "El comprador avanza con mas confianza y menos supuestos." },
        { title: "Menos sorpresas tecnicas", text: "Los problemas aparecen antes, cuando todavia son manejables." },
        { title: "Mejor posicion de negociacion", text: "Una mejor fotografia tecnica y comercial respalda una negociacion mas informada." },
      ]
);
</script>

<style scoped src="../../assets/service-base.css"></style>
<style scoped>
.feature-stack {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.feature-row {
  grid-template-columns: 1fr;
  padding: 1.5rem;
  border-radius: 26px;
  background:
    linear-gradient(180deg, rgba(12, 24, 39, 0.92), rgba(12, 24, 39, 0.76)),
    radial-gradient(circle at top left, rgba(212, 175, 55, 0.12), transparent 28%);
}

.feature-row__index {
  margin-bottom: 0.4rem;
}

.comparison-list {
  gap: 1rem;
}

.comparison-item {
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 1.5rem;
  align-items: center;
  padding: 1.6rem 1.75rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.03);
}

.comparison-item__eyebrow {
  margin-bottom: 0.6rem;
}

@media (max-width: 992px) {
  .feature-stack,
  .comparison-item {
    grid-template-columns: 1fr;
  }

  .comparison-item {
    border-radius: 28px;
  }
}
</style>
