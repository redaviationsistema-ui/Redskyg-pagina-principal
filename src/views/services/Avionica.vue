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
            <RouterLink class="btn-ghost dark" :to="toLocalizedRoute('EngineShop')">{{ content.finalSecondaryCta }}</RouterLink>
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
  backgroundImage: 'url("/images/Service/Avionica.png")',
  backgroundPosition: "center 34%",
};

const content = computed(() =>
  locale.value === "en"
    ? {
        heroEyebrow: "Avionics Support",
        heroTitle: "Avionics and aircraft systems support.",
        heroText: "Sky Group supports avionics decisions for operators and owners who need greater reliability, planning and operational readiness.",
        heroPrimaryCta: "Request Avionics Assessment",
        heroSecondaryCta: "Explore Operations Support",
        sectionEyebrow: "Systems Focus",
        sectionTitle: "Technical support for avionics decisions.",
        sectionText: "From modernization planning to systems review and technical coordination, this service helps owners and operators move with clearer priorities, better traceability and less uncertainty.",
        outcomesEyebrow: "Operational Readiness",
        finalTitle: "Need support for avionics modernization?",
        finalText: "We can define scope, identify priorities and route the project toward the right technical and operational next step.",
        finalPrimaryCta: "Contact Technical Team",
        finalSecondaryCta: "Explore Engine Services",
      }
    : {
        heroEyebrow: "Avionica y sistemas",
        heroTitle: "Avionica y sistemas con soporte tecnico.",
        heroText: "Sky Group acompana decisiones de avionica para operadores y propietarios que necesitan mayor confiabilidad, planeacion y preparacion operativa.",
        heroPrimaryCta: "Solicitar evaluacion de avionica",
        heroSecondaryCta: "Explorar soporte operativo",
        sectionEyebrow: "Enfoque en sistemas",
        sectionTitle: "Soporte tecnico para decisiones de avionica.",
        sectionText: "Desde la planeacion de modernizacion hasta la revision de sistemas y la coordinacion tecnica, este servicio ayuda a propietarios y operadores a avanzar con prioridades mas claras, mejor trazabilidad y menor incertidumbre.",
        outcomesEyebrow: "Preparacion operativa",
        finalTitle: "Necesita soporte para modernizacion de avionica?",
        finalText: "Podemos definir el alcance, identificar prioridades y canalizar el proyecto hacia el siguiente paso tecnico y operativo correcto.",
        finalPrimaryCta: "Contactar equipo tecnico",
        finalSecondaryCta: "Explorar servicios de motores",
      }
);

const services = computed(() =>
  locale.value === "en"
    ? [
        { title: "Systems review", text: "Support in understanding the current avionics condition, limitations, and priority areas." },
        { title: "Modernization planning", text: "Define scope, sequencing, and operational impact before committing to upgrades." },
        { title: "Compliance alignment", text: "Review system requirements that may affect aircraft usability and regulatory alignment." },
        { title: "Technical coordination", text: "Connect operational requirements with system decisions, vendors, and next actions." },
      ]
    : [
        { title: "Revision de sistemas", text: "Apoyo para entender la condicion actual de la avionica, sus limitaciones y las areas prioritarias." },
        { title: "Planeacion de modernizacion", text: "Defina alcance, secuencia e impacto operativo antes de comprometer una actualizacion." },
        { title: "Alineacion de cumplimiento", text: "Revise necesidades de sistemas que puedan afectar usabilidad y alineacion con estandares." },
        { title: "Coordinacion tecnica", text: "Conecte requerimientos operativos con decisiones de sistemas, proveedores y siguientes acciones." },
      ]
);

const outcomes = computed(() =>
  locale.value === "en"
    ? [
        { title: "Better upgrade clarity", text: "Owners gain a clearer view of what matters now versus later." },
        { title: "Less technical ambiguity", text: "Projects move with clearer framing and fewer disconnected decisions." },
        { title: "Stronger operational readiness", text: "System planning supports usability, confidence, and more consistent execution." },
      ]
    : [
        { title: "Mayor claridad de modernizacion", text: "Los propietarios obtienen una vision mas clara de lo que importa ahora frente a despues." },
        { title: "Menos ambiguedad tecnica", text: "Los proyectos avanzan con mejor encuadre y menos decisiones desconectadas." },
        { title: "Mayor preparacion operativa", text: "La planeacion de sistemas respalda usabilidad, confianza y una ejecucion mas consistente." },
      ]
);
</script>

<style scoped src="../../assets/service-base.css"></style>
<style scoped>
.feature-stack {
  gap: 1.1rem;
}

.feature-row {
  grid-template-columns: 88px minmax(0, 1fr);
  padding: 1.45rem 1.5rem;
  border-radius: 18px 36px 18px 36px;
  background:
    linear-gradient(135deg, rgba(8, 19, 34, 0.96), rgba(18, 43, 70, 0.62)),
    radial-gradient(circle at right center, rgba(123, 183, 255, 0.16), transparent 28%);
}

.feature-row__index {
  background: rgba(123, 183, 255, 0.12);
  border-color: rgba(123, 183, 255, 0.28);
  color: #c8e2ff;
}

.comparison-list {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.1rem;
}

.comparison-item {
  padding: 1.6rem;
  min-height: 100%;
  border-radius: 30px 14px 30px 14px;
  background:
    linear-gradient(180deg, rgba(8, 19, 34, 0.92), rgba(8, 19, 34, 0.76)),
    radial-gradient(circle at bottom right, rgba(123, 183, 255, 0.12), transparent 28%);
}
</style>
