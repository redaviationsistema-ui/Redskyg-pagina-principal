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
            <article v-for="(item, index) in outcomes" :key="item.title" class="comparison-item">
              <div class="comparison-item__top">
                <span class="comparison-item__eyebrow">{{ content.outcomesEyebrow }}</span>
                <span class="comparison-item__index">{{ String(index + 1).padStart(2, "0") }}</span>
              </div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </article>
          </div>

          <figure class="comparison-visual">
            <img src="/images/Service/IMG_3074.jpg" :alt="content.sectionTitle" loading="lazy" />
          </figure>
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
  backgroundImage: 'url("/images/Service/IMG_2932.jpeg")',
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
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

.comparison-item {
  position: relative;
  min-height: 280px;
  align-content: start;
  gap: 1rem;
  padding: 1.8rem;
  border-radius: 32px;
  background:
    radial-gradient(circle at top right, rgba(212, 175, 55, 0.14), transparent 32%),
    linear-gradient(180deg, rgba(22, 40, 66, 0.9), rgba(15, 30, 51, 0.96));
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  overflow: hidden;
}

.comparison-item::after {
  content: "";
  position: absolute;
  inset: auto 1.8rem 0.9rem;
  height: 1px;
  background: linear-gradient(90deg, rgba(212, 175, 55, 0.55), rgba(212, 175, 55, 0));
  opacity: 0.65;
}

.comparison-item__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.comparison-item__index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.75rem;
  min-height: 2.75rem;
  border-radius: 999px;
  background: rgba(212, 175, 55, 0.12);
  border: 1px solid rgba(212, 175, 55, 0.28);
  color: #f1d88a;
  font-size: 0.76rem;
  letter-spacing: 0.18em;
  font-weight: 700;
}

.comparison-item__eyebrow {
  margin: 0;
}

.comparison-item h3 {
  max-width: 12ch;
  margin: 0;
  font-size: clamp(1.9rem, 2.2vw, 2.6rem);
  line-height: 1.05;
  text-wrap: balance;
}

.comparison-item p {
  max-width: 32ch;
  margin: 0;
  font-size: 1rem;
  line-height: 1.7;
}

.comparison-visual {
  margin: 0;
  overflow: hidden;
  border-radius: 32px;
  border: 1px solid rgba(212, 175, 55, 0.12);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.24);
}

.comparison-visual img {
  display: block;
  width: 100%;
  min-height: 320px;
  max-height: 460px;
  object-fit: cover;
  object-position: center;
}

@media (max-width: 992px) {
  .feature-stack {
    grid-template-columns: 1fr;
  }

  .comparison-list {
    grid-template-columns: 1fr;
  }

  .comparison-item {
    border-radius: 28px;
    min-height: auto;
  }
}

@media (max-width: 760px) {
  .comparison-list {
    margin-bottom: 1.5rem;
  }

  .comparison-item {
    padding: 1.4rem;
  }

  .comparison-item__top {
    align-items: flex-start;
  }

  .comparison-item h3,
  .comparison-item p {
    max-width: none;
  }

  .comparison-visual {
    border-radius: 24px;
  }

  .comparison-visual img {
    min-height: 220px;
    max-height: 300px;
  }
}
</style>
