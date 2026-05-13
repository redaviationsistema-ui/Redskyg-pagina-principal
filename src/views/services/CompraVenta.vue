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
            <RouterLink class="btn-ghost" :to="toLocalizedRoute('PrePurchaseInspection')">{{ content.heroSecondaryCta }}</RouterLink>
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
          <article v-for="item in steps" :key="item.title" class="info-card">
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
    'linear-gradient(120deg, rgba(5, 15, 30, 0.92), rgba(5, 15, 30, 0.72)), url("/images/CompraVenta/Compraventa1.png")',
};

const content = computed(() =>
  locale.value === "en"
    ? {
        heroEyebrow: "Aircraft Sales and Acquisition",
        heroTitle: "Aircraft acquisition, valuation, and transactions within an integrated executive aviation strategy.",
        heroText: "Sky Group supports aircraft buying and selling processes with a clearer structure for sourcing, evaluation, negotiation, and closing.",
        heroPrimaryCta: "Discuss an Aircraft Opportunity",
        heroSecondaryCta: "Review Pre-Purchase Advisory",
        sectionEyebrow: "Transaction Support",
        sectionTitle: "Built for clients who need more than brokerage language.",
        sectionText: "This service is designed for acquisition and sale processes where valuation context, technical review, negotiation flow, and execution quality all affect the final outcome.",
        finalTitle: "Looking to buy, sell, or evaluate an aircraft opportunity?",
        finalText: "We can help define the right commercial and technical next step before the transaction becomes more complex.",
        finalPrimaryCta: "Contact an Aviation Advisor",
        finalSecondaryCta: "View Pricing Guidance",
      }
    : {
        heroEyebrow: "Vuelos Privados en Mexico",
        heroTitle: "Compra, valuacion y transaccion de aeronaves dentro de una estrategia integral de aviacion ejecutiva.",
        heroText: "Sky Group acompana procesos de compra y venta de aeronaves con una estructura mas clara de busqueda, evaluacion, negociacion y cierre.",
        heroPrimaryCta: "Hablar sobre una oportunidad de aeronave",
        heroSecondaryCta: "Revisar asesoria precompra",
        sectionEyebrow: "Soporte transaccional",
        sectionTitle: "Pensado para clientes que necesitan mas que un discurso de brokerage.",
        sectionText: "Este servicio esta disenado para procesos de compra y venta donde el contexto de valuacion, la revision tecnica, el flujo de negociacion y la calidad de ejecucion impactan el resultado final.",
        finalTitle: "Buscas comprar, vender o evaluar una oportunidad de aeronave?",
        finalText: "Podemos ayudarte a definir el siguiente paso comercial y tecnico correcto antes de que la transaccion se vuelva mas compleja.",
        finalPrimaryCta: "Contactar a un asesor aeronautico",
        finalSecondaryCta: "Ver guia de precios",
      }
);

const services = computed(() =>
  locale.value === "en"
    ? [
        { title: "Aircraft sourcing", text: "Support in identifying aircraft opportunities aligned with the mission profile and objective." },
        { title: "Valuation context", text: "A more informed view of pricing, positioning, and transaction expectations." },
        { title: "Negotiation support", text: "Stronger structure around terms, timing, and decision flow." },
        { title: "Closing coordination", text: "Better alignment between commercial steps, technical review, and transaction execution." },
      ]
    : [
        { title: "Sourcing de aeronaves", text: "Apoyo para identificar oportunidades de aeronaves alineadas con el perfil de mision y el objetivo." },
        { title: "Contexto de valuacion", text: "Una vision mas informada de precio, posicionamiento y expectativas transaccionales." },
        { title: "Soporte de negociacion", text: "Mayor estructura alrededor de terminos, tiempos y flujo de decision." },
        { title: "Coordinacion de cierre", text: "Mejor alineacion entre pasos comerciales, revision tecnica y ejecucion de la transaccion." },
      ]
);

const steps = computed(() =>
  locale.value === "en"
    ? [
        { title: "Define the objective", text: "Clarify whether the need is acquisition, sale, evaluation, or portfolio review." },
        { title: "Review the aircraft opportunity", text: "Align the commercial and technical picture before moving deeper into the process." },
        { title: "Coordinate the next stage", text: "Move toward inspection, negotiation, or closing with a more structured plan." },
      ]
    : [
        { title: "Definir el objetivo", text: "Aclara si la necesidad es adquisicion, venta, evaluacion o revision de portafolio." },
        { title: "Revisar la oportunidad de aeronave", text: "Alinea la fotografia comercial y tecnica antes de profundizar en el proceso." },
        { title: "Coordinar la siguiente etapa", text: "Avanza hacia inspeccion, negociacion o cierre con un plan mas estructurado." },
      ]
);
</script>

<style scoped src="../../assets/service-base.css"></style>
