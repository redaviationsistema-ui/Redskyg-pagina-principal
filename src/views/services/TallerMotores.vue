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
        <div class="container engine-overview">
          <div>
            <span class="eyebrow">{{ content.sectionEyebrow }}</span>
            <h2>{{ content.sectionTitle }}</h2>
            <p>{{ content.sectionText }}</p>
          </div>

          <div class="engine-checks">
            <article v-for="item in services" :key="item.title" class="engine-check">
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="section-heading">
            <span class="eyebrow">{{ content.visualEyebrow }}</span>
            <h2>{{ content.visualTitle }}</h2>
            <p>{{ content.visualText }}</p>
          </div>

          <div class="engine-visuals">
            <article v-for="item in visuals" :key="item.src" class="engine-visual">
              <img :src="item.src" :alt="item.alt" loading="lazy" decoding="async" />
              <div class="engine-visual__body">
                <h3>{{ item.title }}</h3>
                <p>{{ item.text }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="section dark-section">
        <div class="container engine-outcomes">
          <article v-for="item in outcomes" :key="item.title" class="engine-outcome">
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
  backgroundImage: 'url("/images/Home/servicios1.jpg")',
  backgroundPosition: "center 38%",
};

const content = computed(() =>
  locale.value === "en"
    ? {
        heroEyebrow: "Engine Shop Support",
        heroTitle: "Engine logistics and technical support.",
        heroText: "Sky Group structures engine support around logistics, documentation, traceability, timing, and the protection of critical aviation assets.",
        heroPrimaryCta: "Request Engine Consultation",
        heroSecondaryCta: "Explore Import and Export",
        sectionEyebrow: "Engine Coordination",
        sectionTitle: "Engine coordination with tighter execution.",
        sectionText: "This service supports clients managing engine logistics, documentation, technical handling, and coordination across multiple stakeholders and jurisdictions.",
        visualEyebrow: "Engine Workflow",
        visualTitle: "Support across the engine workstream.",
        visualText: "These visuals reinforce the main workstreams behind engine support: technical intervention, movement control and aircraft asset protection.",
        finalTitle: "Need support for an engine program?",
        finalText: "We can help define the documentation, process flow and next operational steps for high-value engine work.",
        finalPrimaryCta: "Talk to Technical Team",
        finalSecondaryCta: "Explore Avionics Support",
      }
    : {
        heroEyebrow: "Soporte de motores",
        heroTitle: "Logistica y soporte tecnico para motores.",
        heroText: "Sky Group estructura el soporte de motores alrededor de logistica, documentacion, trazabilidad, tiempos y proteccion de activos aeronauticos criticos.",
        heroPrimaryCta: "Solicitar asesoria de motores",
        heroSecondaryCta: "Explorar importacion y exportacion",
        sectionEyebrow: "Coordinacion de motores",
        sectionTitle: "Coordinacion de motores con mayor precision.",
        sectionText: "Este servicio apoya a clientes que trabajan con logistica de motores, documentacion, manejo tecnico y coordinacion entre multiples participantes y jurisdicciones.",
        visualEyebrow: "Flujo del programa",
        visualTitle: "Soporte para cada frente del programa de motores.",
        visualText: "Estas imagenes refuerzan los frentes principales del soporte de motores: intervencion tecnica, control logistico y proteccion del activo aeronautico.",
        finalTitle: "Necesita soporte para un programa de motores?",
        finalText: "Podemos ayudarle a definir documentacion, flujo de proceso y siguientes pasos operativos para trabajos de motores de alto valor.",
        finalPrimaryCta: "Hablar con equipo tecnico",
        finalSecondaryCta: "Explorar soporte de avionica",
      }
);

const services = computed(() =>
  locale.value === "en"
    ? [
        { title: "Engine logistics planning", text: "Support for movement timing, process structure, and handling requirements." },
        { title: "Documentation support", text: "Coordination of the paperwork needed to move and track engine assets correctly." },
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

const visuals = computed(() =>
  locale.value === "en"
    ? [
        {
          src: "/images/Home/motor2.jpg",
          alt: "Engine logistics visual with global routing",
          title: "Logistics and traceability",
          text: "Well suited to the import, routing, and documentation side of engine support, where timing and visibility matter.",
        },
        {
          src: "/images/Tiempocompartido/motor.jpg",
          alt: "Aircraft protected inside hangar during technical supervision",
          title: "Operational protection",
          text: "Useful for communicating supervision, custody, and secure execution around high-value aviation assets.",
        },
      ]
    : [
        {
          src: "/images/Home/motor2.jpg",
          alt: "Visual de logistica de motores con trazabilidad global",
          title: "Logistica y trazabilidad",
          text: "Funciona para reforzar la parte de importacion, traslado y documentacion del soporte de motores, donde el control del proceso es clave.",
        },
        {
          src: "/images/Tiempocompartido/motor.jpg",
          alt: "Aeronave protegida en hangar durante supervision tecnica",
          title: "Proteccion operativa",
          text: "Aporta contexto visual para supervision, custodia y ejecucion segura alrededor de activos aeronauticos de alto valor.",
        },
      ]
);
</script>

<style scoped src="../../assets/service-base.css"></style>
<style scoped>
.engine-overview {
  display: grid;
  grid-template-columns: 0.86fr 1.14fr;
  gap: 2rem;
}

.engine-checks {
  display: grid;
  gap: 0.9rem;
}

.engine-check {
  padding: 1.35rem 1.45rem;
  border-left: 3px solid rgba(212, 175, 55, 0.7);
  background: rgba(255, 255, 255, 0.035);
}

.engine-visuals {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.engine-visual img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 28px;
  display: block;
}

.engine-visual__body {
  padding-top: 0.9rem;
}

.engine-outcomes {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.engine-outcome {
  padding: 1.8rem;
  border-radius: 22px;
  background:
    linear-gradient(180deg, rgba(8, 19, 34, 0.94), rgba(8, 19, 34, 0.72)),
    radial-gradient(circle at top left, rgba(212, 175, 55, 0.12), transparent 28%);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

@media (max-width: 992px) {
  .engine-overview,
  .engine-visuals,
  .engine-outcomes {
    grid-template-columns: 1fr;
  }
}
</style>
