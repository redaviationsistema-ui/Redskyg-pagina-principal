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
        <div class="container ownership-layout">
          <div>
            <span class="eyebrow">{{ content.sectionEyebrow }}</span>
            <h2>{{ content.sectionTitle }}</h2>
            <p>{{ content.sectionText }}</p>
          </div>

          <div class="ownership-pillars">
            <article v-for="item in features" :key="item.title" class="ownership-pillar">
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

          <div class="ownership-gallery">
            <article v-for="item in visuals" :key="item.src" class="ownership-frame">
              <img :src="item.src" :alt="item.alt" loading="lazy" decoding="async" />
              <div class="ownership-frame__body">
                <h3>{{ item.title }}</h3>
                <p>{{ item.text }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="section dark-section">
        <div class="container ownership-comparison">
          <article v-for="item in comparison" :key="item.title" class="ownership-compare">
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
            <RouterLink class="btn-ghost dark" :to="toLocalizedRoute('FractionalOwnership')">{{ content.finalSecondaryCta }}</RouterLink>
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
  backgroundImage: 'url("/images/Copropiedad/copropiedad1.jpg")',
  backgroundPosition: "center 34%",
};

const content = computed(() =>
  locale.value === "en"
    ? {
        heroEyebrow: "Co-Ownership",
        heroTitle: "Aircraft co-ownership with shared access.",
        heroText: "Aircraft co-ownership is designed for aligned participants who want to share investment, operating costs and aircraft access through a more direct ownership model.",
        heroPrimaryCta: "Discuss Co-Ownership",
        heroSecondaryCta: "Compare With Fractional Ownership",
        sectionEyebrow: "Ownership Model",
        sectionTitle: "Shared access with aligned operating criteria.",
        sectionText: "Co-ownership can be a strong fit when multiple parties want direct aircraft access while sharing acquisition cost, operating responsibility and long-term asset participation.",
        visualEyebrow: "Ownership Touchpoints",
        visualTitle: "Each image supports a different layer of co-ownership.",
        visualText: "These assets reinforce access, governance, planning, aircraft readiness and onboard decision-making.",
        finalTitle: "Is co-ownership the right aircraft model?",
        finalText: "We can review travel profile, ownership preferences and governance expectations to determine whether co-ownership is the right model.",
        finalPrimaryCta: "Request Ownership Review",
        finalSecondaryCta: "Compare With Fractional Ownership",
      }
    : {
        heroEyebrow: "Copropiedad de aeronaves",
        heroTitle: "Copropiedad de aeronaves con acceso compartido.",
        heroText: "La copropiedad de aeronaves esta pensada para participantes alineados que desean compartir inversion, costos operativos y acceso a la aeronave dentro de un modelo de propiedad mas directo.",
        heroPrimaryCta: "Hablar sobre copropiedad",
        heroSecondaryCta: "Comparar con propiedad fraccional",
        sectionEyebrow: "Modelo de propiedad",
        sectionTitle: "Acceso compartido con criterios operativos alineados.",
        sectionText: "La copropiedad puede ser una gran opcion cuando varias partes quieren acceso directo a la aeronave mientras comparten costo de adquisicion, responsabilidad operativa y participacion de largo plazo en el activo.",
        visualEyebrow: "Momentos del modelo",
        visualTitle: "Cada imagen respalda una capa distinta de la copropiedad.",
        visualText: "Estas imagenes refuerzan acceso, gobierno, planeacion, disponibilidad del activo y toma de decisiones a bordo.",
        finalTitle: "La copropiedad es el modelo correcto?",
        finalText: "Podemos revisar perfil de viaje, preferencias de propiedad y expectativas de gobierno para determinar si la copropiedad es el modelo correcto.",
        finalPrimaryCta: "Solicitar revision de propiedad",
        finalSecondaryCta: "Comparar con propiedad fraccional",
      }
);

const features = computed(() =>
  locale.value === "en"
    ? [
        { title: "Shared acquisition cost", text: "Capital exposure is distributed among participants instead of carried by one owner." },
        { title: "Direct asset participation", text: "The model preserves a closer relationship to the aircraft asset than standard charter usage." },
        { title: "Governance criteria", text: "Clear rules are needed for scheduling, decision-making, use, and exits." },
        { title: "Operational coordination", text: "Professional management helps turn a shared asset into a workable aviation solution." },
      ]
    : [
        { title: "Costo de adquisicion compartido", text: "La exposicion de capital se distribuye entre participantes en lugar de recaer en un solo propietario." },
        { title: "Participacion directa en el activo", text: "El modelo conserva una relacion mas cercana con la aeronave que el uso estandar de charter." },
        { title: "Criterios de gobierno", text: "Se necesitan reglas claras para programacion, toma de decisiones, uso y salidas." },
        { title: "Coordinacion operativa", text: "La gestion profesional ayuda a convertir un activo compartido en una solucion aeronautica funcional." },
      ]
);

const comparison = computed(() =>
  locale.value === "en"
    ? [
        { title: "Compared with charter", text: "Co-ownership offers deeper control and asset participation, but with more ongoing commitment." },
        { title: "Compared with fractional ownership", text: "It can offer more direct ownership dynamics, though usually with tighter participant alignment needs." },
        { title: "Compared with full ownership", text: "It reduces capital concentration while still preserving meaningful access and asset involvement." },
      ]
    : [
        { title: "Comparado con charter", text: "La copropiedad ofrece mayor control y participacion en el activo, pero con mayor compromiso recurrente." },
        { title: "Comparado con propiedad fraccional", text: "Puede ofrecer dinamicas de propiedad mas directas, aunque normalmente requiere una alineacion mas estrecha entre participantes." },
        { title: "Comparado con propiedad total", text: "Reduce la concentracion de capital mientras conserva acceso significativo y participacion en el activo." },
      ]
);

const visuals = computed(() =>
  locale.value === "en"
    ? [
        {
          src: "/images/Copropiedad/copropiedad2.webp",
          alt: "Private jet on ramp with passengers and crew",
          title: "Shared aircraft access",
          text: "Useful when the message is about coordinated access to the aircraft instead of one-off charter service.",
        },
        {
          src: "/images/Copropiedad/copropiedad3.webp",
          alt: "Executives walking toward a private jet in a hangar",
          title: "Recurring executive mobility",
          text: "Supports the idea of repeat use among aligned participants with defined scheduling expectations.",
        },
        {
          src: "/images/Copropiedad/copropiedad4.jpg",
          alt: "Business meeting inside a private aircraft cabin",
          title: "Governance and decision-making",
          text: "Fits the governance side of co-ownership, where participants evaluate costs, use, and operating criteria together.",
        },
        {
          src: "/images/Copropiedad/copropiedad6.jpg",
          alt: "Private jet positioned inside a modern hangar",
          title: "Asset readiness",
          text: "Helps communicate the operational side of maintaining an aircraft ready for multiple owners.",
        },
        {
          src: "/images/Copropiedad/copropiedad6.png",
          alt: "Interior of a private aircraft prepared for passengers",
          title: "Cabin access",
          text: "Reinforces the direct cabin access that comes with recurring use of the aircraft.",
        },
        {
          src: "/images/Copropiedad/coporpriedad2.png",
          alt: "Aircraft wing at sunset during flight",
          title: "Long-term participation",
          text: "Works well for the idea of sustained use and participation in the asset over time.",
        },
      ]
    : [
        {
          src: "/images/Copropiedad/copropiedad2.webp",
          alt: "Jet privado en plataforma con pasajeros y tripulacion",
          title: "Acceso compartido a la aeronave",
          text: "Sirve cuando el mensaje es acceso coordinado a la aeronave y no un servicio aislado de charter.",
        },
        {
          src: "/images/Copropiedad/copropiedad3.webp",
          alt: "Ejecutivos caminando hacia un jet privado desde un hangar",
          title: "Movilidad ejecutiva recurrente",
          text: "Refuerza la idea de uso repetido entre participantes alineados con expectativas claras de programacion.",
        },
        {
          src: "/images/Copropiedad/copropiedad4.jpg",
          alt: "Reunion de negocios dentro de la cabina de una aeronave privada",
          title: "Gobierno y toma de decisiones",
          text: "Encaja con la parte de gobierno de la copropiedad, donde se evalua en conjunto costo, uso y criterios operativos.",
        },
        {
          src: "/images/Copropiedad/copropiedad6.jpg",
          alt: "Jet privado listo dentro de un hangar moderno",
          title: "Disponibilidad del activo",
          text: "Ayuda a comunicar la parte operativa de mantener una aeronave lista para varios propietarios.",
        },
        {
          src: "/images/Copropiedad/copropiedad6.png",
          alt: "Interior de aeronave privada preparado para pasajeros",
          title: "Acceso a cabina",
          text: "Refuerza el acceso recurrente a la aeronave como parte del esquema de uso compartido.",
        },
        {
          src: "/images/Copropiedad/coporpriedad2.png",
          alt: "Ala de aeronave al atardecer durante el vuelo",
          title: "Participacion de largo plazo",
          text: "Funciona para la idea de uso sostenido y participacion prolongada en el activo.",
        },
      ]
);
</script>

<style scoped src="../../assets/service-base.css"></style>
<style scoped>
.ownership-layout {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 2rem;
}

.ownership-pillars {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.ownership-pillar {
  padding: 1.6rem;
  border-radius: 28px;
  background:
    linear-gradient(160deg, rgba(11, 24, 40, 0.94), rgba(11, 24, 40, 0.72)),
    radial-gradient(circle at top left, rgba(212, 175, 55, 0.12), transparent 28%);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.ownership-gallery {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.ownership-frame {
  overflow: hidden;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.ownership-frame img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  display: block;
}

.ownership-frame__body {
  padding: 1.15rem 1.2rem 1.3rem;
}

.ownership-comparison {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.ownership-compare {
  padding: 1.8rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

@media (max-width: 992px) {
  .ownership-layout,
  .ownership-pillars,
  .ownership-gallery,
  .ownership-comparison {
    grid-template-columns: 1fr;
  }

  .ownership-compare {
    border-radius: 28px;
  }
}
</style>
