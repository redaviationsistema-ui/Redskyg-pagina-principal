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
            <RouterLink class="btn-ghost" :to="toLocalizedRoute('OperationsManagement')">{{ content.heroSecondaryCta }}</RouterLink>
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
    'linear-gradient(120deg, rgba(5, 15, 30, 0.92), rgba(5, 15, 30, 0.72)), url("/images/Service/Avionica.png")',
};

const content = computed(() =>
  locale.value === "en"
    ? {
        heroEyebrow: "Avionics Support",
        heroTitle: "Avionics, modernization, and aircraft systems coordination with clearer technical direction.",
        heroText: "Sky Group supports avionics decisions for operators and owners who need more reliability, planning, and operational readiness.",
        heroPrimaryCta: "Request Avionics Assessment",
        heroSecondaryCta: "Explore Operations Support",
        sectionEyebrow: "Systems Focus",
        sectionTitle: "Support for avionics decisions that affect safety, compliance, and aircraft usability.",
        sectionText: "From modernization planning to system review and coordination, this service is designed to help owners and operators navigate avionics needs with more clarity and less technical uncertainty.",
        finalTitle: "Need a clearer path for avionics upgrades or technical review?",
        finalText: "We can help frame the scope, identify priorities, and route the project toward the right operational and technical next step.",
        finalPrimaryCta: "Contact Technical Team",
        finalSecondaryCta: "View Pricing Guidance",
      }
    : {
        heroEyebrow: "Vuelos Privados en Mexico",
        heroTitle: "Avionica, modernizacion y coordinacion de sistemas de aeronaves con direccion tecnica mas clara.",
        heroText: "Sky Group acompana decisiones de avionica para operadores y propietarios que necesitan mas confiabilidad, planeacion y preparacion operativa.",
        heroPrimaryCta: "Solicitar evaluacion de avionica",
        heroSecondaryCta: "Explorar soporte operativo",
        sectionEyebrow: "Enfoque en sistemas",
        sectionTitle: "Soporte para decisiones de avionica que afectan seguridad, cumplimiento y usabilidad de la aeronave.",
        sectionText: "Desde planeacion de modernizacion hasta revision de sistemas y coordinacion, este servicio ayuda a propietarios y operadores a navegar necesidades de avionica con mayor claridad y menos incertidumbre tecnica.",
        finalTitle: "Necesitas una ruta mas clara para upgrades de avionica o revision tecnica?",
        finalText: "Podemos ayudarte a definir el alcance, identificar prioridades y canalizar el proyecto hacia el siguiente paso operativo y tecnico correcto.",
        finalPrimaryCta: "Contactar equipo tecnico",
        finalSecondaryCta: "Ver guia de precios",
      }
);

const services = computed(() =>
  locale.value === "en"
    ? [
        { title: "Systems review", text: "Support for understanding current avionics condition and priority areas." },
        { title: "Modernization planning", text: "A clearer way to frame upgrades, sequencing, and operational impact." },
        { title: "Compliance alignment", text: "Attention to system needs that can affect aircraft usability and standards alignment." },
        { title: "Technical coordination", text: "A more structured bridge between operational goals and system-related decisions." },
      ]
    : [
        { title: "Revision de sistemas", text: "Apoyo para entender la condicion actual de la avionica y las areas prioritarias." },
        { title: "Planeacion de modernizacion", text: "Una forma mas clara de estructurar upgrades, secuencia e impacto operativo." },
        { title: "Alineacion de cumplimiento", text: "Atencion a necesidades de sistemas que pueden afectar usabilidad y alineacion con estandares." },
        { title: "Coordinacion tecnica", text: "Un puente mas estructurado entre objetivos operativos y decisiones relacionadas con sistemas." },
      ]
);

const outcomes = computed(() =>
  locale.value === "en"
    ? [
        { title: "Better upgrade clarity", text: "Owners gain a clearer view of what matters now versus later." },
        { title: "Less technical ambiguity", text: "Projects move with better framing and fewer disconnected decisions." },
        { title: "Stronger operational readiness", text: "System planning supports usability, confidence, and more consistent execution." },
      ]
    : [
        { title: "Mayor claridad en upgrades", text: "Los propietarios obtienen una vision mas clara de lo que importa ahora frente a despues." },
        { title: "Menos ambiguedad tecnica", text: "Los proyectos avanzan con mejor encuadre y menos decisiones desconectadas." },
        { title: "Mayor preparacion operativa", text: "La planeacion de sistemas respalda usabilidad, confianza y una ejecucion mas consistente." },
      ]
);
</script>

<style scoped src="../../assets/service-base.css"></style>
