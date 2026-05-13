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
            <RouterLink class="btn-ghost" :to="toLocalizedRoute('FractionalOwnership')">{{ content.heroSecondaryCta }}</RouterLink>
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
            <article v-for="item in features" :key="item.title" class="info-card">
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="section dark-section">
        <div class="container process-grid">
          <article v-for="item in comparison" :key="item.title" class="info-card">
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
    'linear-gradient(120deg, rgba(5, 15, 30, 0.92), rgba(5, 15, 30, 0.72)), url("/images/Copropiedad/copropiedad1.jpg")',
};

const content = computed(() =>
  locale.value === "en"
    ? {
        heroEyebrow: "Co-Ownership",
        heroTitle: "Aircraft co-ownership for clients who want private access with more control than occasional charter.",
        heroText: "Aircraft co-ownership is designed for aligned participants who want to share investment, operating costs, and aircraft access through a more direct model.",
        heroPrimaryCta: "Discuss Co-Ownership",
        heroSecondaryCta: "Compare With Fractional Ownership",
        sectionEyebrow: "Structure",
        sectionTitle: "Built for participants with aligned travel patterns and operational expectations.",
        sectionText: "Co-ownership can be a strong fit when multiple parties want direct aircraft access while sharing acquisition cost, operating responsibility, and long-term asset participation.",
        finalTitle: "Need help deciding whether co-ownership fits your aviation goals?",
        finalText: "We can review travel profile, ownership preferences, and governance expectations to determine whether co-ownership is the right model.",
        finalPrimaryCta: "Request Ownership Review",
        finalSecondaryCta: "View Pricing Guidance",
      }
    : {
        heroEyebrow: "Vuelos Privados en Mexico",
        heroTitle: "Copropiedad de aeronaves para clientes que buscan acceso privado con mas control que un charter aislado.",
        heroText: "La copropiedad de aeronaves esta pensada para participantes alineados que desean compartir inversion, costos operativos y acceso a la aeronave en un modelo mas directo.",
        heroPrimaryCta: "Hablar sobre copropiedad",
        heroSecondaryCta: "Comparar con propiedad fraccional",
        sectionEyebrow: "Estructura",
        sectionTitle: "Pensado para participantes con patrones de viaje y expectativas operativas alineadas.",
        sectionText: "La copropiedad puede ser una gran opcion cuando varias partes quieren acceso directo a la aeronave mientras comparten costo de adquisicion, responsabilidad operativa y participacion de largo plazo en el activo.",
        finalTitle: "Necesitas ayuda para decidir si la copropiedad encaja con tus objetivos aeronauticos?",
        finalText: "Podemos revisar perfil de viaje, preferencias de propiedad y expectativas de gobierno para determinar si la copropiedad es el modelo correcto.",
        finalPrimaryCta: "Solicitar revision de propiedad",
        finalSecondaryCta: "Ver guia de precios",
      }
);

const features = computed(() =>
  locale.value === "en"
    ? [
        { title: "Shared acquisition cost", text: "Capital exposure is distributed among participants instead of carried by one owner." },
        { title: "Direct asset participation", text: "The model preserves a closer relationship to the aircraft asset than standard charter usage." },
        { title: "Governance structure", text: "Clear rules are needed for scheduling, decision-making, use, and exits." },
        { title: "Operational coordination", text: "Professional management helps turn a shared asset into a workable aviation solution." },
      ]
    : [
        { title: "Costo de adquisicion compartido", text: "La exposicion de capital se distribuye entre participantes en lugar de recaer en un solo propietario." },
        { title: "Participacion directa en el activo", text: "El modelo conserva una relacion mas cercana con la aeronave que el uso estandar de charter." },
        { title: "Estructura de gobierno", text: "Se necesitan reglas claras para programacion, toma de decisiones, uso y salidas." },
        { title: "Coordinacion operativa", text: "La gestion profesional ayuda a convertir un activo compartido en una solucion aeronautica funcional." },
      ]
);

const comparison = computed(() =>
  locale.value === "en"
    ? [
        { title: "Compared with charter", text: "Co-ownership offers deeper control and asset participation, but with more structural commitment." },
        { title: "Compared with fractional ownership", text: "It can offer more direct ownership dynamics, though usually with tighter participant alignment needs." },
        { title: "Compared with full ownership", text: "It reduces capital concentration while still preserving meaningful access and asset involvement." },
      ]
    : [
        { title: "Comparado con charter", text: "La copropiedad ofrece mayor control y participacion en el activo, pero con mas compromiso estructural." },
        { title: "Comparado con propiedad fraccional", text: "Puede ofrecer dinamicas de propiedad mas directas, aunque normalmente requiere una alineacion mas estrecha entre participantes." },
        { title: "Comparado con propiedad total", text: "Reduce la concentracion de capital mientras conserva acceso significativo y participacion en el activo." },
      ]
);
</script>

<style scoped src="../../assets/service-base.css"></style>
