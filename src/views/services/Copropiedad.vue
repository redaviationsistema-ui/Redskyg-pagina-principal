<template>
    <main class="ownership-page">
      <section class="ownership-hero" :style="heroStyle">
        <div class="hero-overlay"></div>
        <div class="container ownership-hero__grid">
          <div class="ownership-hero__content">
            <span class="eyebrow">{{ content.heroEyebrow }}</span>
            <h1>{{ content.heroTitle }}</h1>
            <p>{{ content.heroText }}</p>
            <div class="hero-actions">
              <RouterLink class="btn-primary" :to="toLocalizedRoute('Contact')">{{ content.heroPrimaryCta }}</RouterLink>
              <RouterLink class="btn-ghost" :to="toLocalizedRoute('FractionalOwnership')">{{ content.heroSecondaryCta }}</RouterLink>
            </div>
          </div>

          <aside class="ownership-brief">
            <span class="ownership-brief__number">01</span>
            <span class="ownership-brief__label">{{ content.heroPanelLabel }}</span>
            <h2>{{ content.heroPanelTitle }}</h2>
            <p>{{ content.heroPanelText }}</p>
            <span class="ownership-brief__line"></span>
            <small>{{ content.heroPanelFooter }}</small>
          </aside>
        </div>
      </section>

      <section class="section ownership-intro">
        <div class="container ownership-intro__grid">
          <div class="ownership-intro__copy">
            <span class="eyebrow">{{ content.sectionEyebrow }}</span>
            <h2>{{ content.sectionTitle }}</h2>
            <p>{{ content.sectionText }}</p>
          </div>

          <div class="ownership-pillars" :aria-label="content.sectionTitle">
            <article v-for="(item, index) in features" :key="item.title" class="ownership-pillar">
              <span class="ownership-pillar__index">{{ String(index + 1).padStart(2, '0') }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="ownership-gallery__heading">
            <span class="eyebrow">{{ content.visualEyebrow }}</span>
            <h2>{{ content.visualTitle }}</h2>
            <p>{{ content.visualText }}</p>
          </div>

          <div class="ownership-gallery">
            <article v-for="(item, index) in visuals" :key="item.src" class="ownership-frame" :class="`ownership-frame--${index + 1}`">
              <img :src="item.src" :alt="item.alt" loading="lazy" decoding="async" />
              <div class="ownership-frame__body">
                <span>{{ String(index + 1).padStart(2, '0') }}</span>
                <h3>{{ item.title }}</h3>
                <p>{{ item.text }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="section ownership-comparison-section">
        <div class="container">
          <div class="ownership-comparison__heading">
            <span class="eyebrow">{{ content.comparisonEyebrow }}</span>
            <h2>{{ content.comparisonTitle }}</h2>
          </div>
          <div class="ownership-comparison">
            <article v-for="(item, index) in comparison" :key="item.title" class="ownership-compare">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
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
            <RouterLink class="btn-ghost dark" :to="toLocalizedRoute('FractionalOwnership')">{{ content.finalSecondaryCta }}</RouterLink>
          </div>
        </div>
      </section>
    </main>
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
        heroPanelLabel: "The operating principle",
        heroPanelTitle: "One asset. Clearly shared responsibility.",
        heroPanelText: "A successful structure begins with participants who align on access, cost and decision-making before the aircraft is selected.",
        heroPanelFooter: "Capital / Access / Operations",
        heroPrimaryCta: "Discuss Co-Ownership",
        heroSecondaryCta: "Compare With Fractional Ownership",
        sectionEyebrow: "Ownership Model",
        sectionTitle: "Shared access with aligned operating criteria.",
        sectionText: "Co-ownership can be a strong fit when multiple parties want direct aircraft access while sharing acquisition cost, operating responsibility and long-term asset participation.",
        visualEyebrow: "Ownership Touchpoints",
        visualTitle: "Each image supports a different layer of co-ownership.",
        visualText: "These assets reinforce access, governance, planning, aircraft readiness and onboard decision-making.",
        comparisonEyebrow: "The Decision",
        comparisonTitle: "See where co-ownership sits.",
        finalTitle: "Is co-ownership the right aircraft model?",
        finalText: "We can review travel profile, ownership preferences and governance expectations to determine whether co-ownership is the right model.",
        finalPrimaryCta: "Request Ownership Review",
        finalSecondaryCta: "Compare With Fractional Ownership",
      }
    : {
        heroEyebrow: "Copropiedad de aeronaves",
        heroTitle: "Copropiedad de aeronaves con acceso compartido.",
        heroText: "La copropiedad de aeronaves esta pensada para participantes alineados que desean compartir inversion, costos operativos y acceso a la aeronave dentro de un modelo de propiedad mas directo.",
        heroPanelLabel: "El principio operativo",
        heroPanelTitle: "Un activo. Responsabilidad claramente compartida.",
        heroPanelText: "Una estructura exitosa inicia con participantes que alinean acceso, costo y toma de decisiones antes de seleccionar la aeronave.",
        heroPanelFooter: "Capital / Acceso / Operacion",
        heroPrimaryCta: "Hablar sobre copropiedad",
        heroSecondaryCta: "Comparar con propiedad fraccional",
        sectionEyebrow: "Modelo de propiedad",
        sectionTitle: "Acceso compartido con criterios operativos alineados.",
        sectionText: "La copropiedad puede ser una gran opcion cuando varias partes quieren acceso directo a la aeronave mientras comparten costo de adquisicion, responsabilidad operativa y participacion de largo plazo en el activo.",
        visualEyebrow: "Momentos del modelo",
        visualTitle: "Cada imagen respalda una capa distinta de la copropiedad.",
        visualText: "Estas imagenes refuerzan acceso, gobierno, planeacion, disponibilidad del activo y toma de decisiones a bordo.",
        comparisonEyebrow: "La decision",
        comparisonTitle: "Ubique la copropiedad frente a otras alternativas.",
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
.ownership-page {
  --ownership-ink: #061321;
  --ownership-blue: #0b2942;
  --ownership-gold: #e0ba6c;
  overflow: hidden;
  background:
    radial-gradient(circle at 85% 14%, rgba(35, 102, 135, 0.2), transparent 25rem),
    linear-gradient(180deg, #061321 0%, #081928 54%, #061321 100%);
  color: #f7f4ec;
}

.ownership-hero {
  position: relative;
  min-height: min(860px, 91vh);
  display: flex;
  align-items: end;
  background-size: cover;
  overflow: hidden;
}

.hero-overlay {
  background:
    linear-gradient(90deg, rgba(3, 12, 21, 0.94) 0%, rgba(3, 12, 21, 0.76) 42%, rgba(3, 12, 21, 0.24) 75%, rgba(3, 12, 21, 0.46) 100%),
    linear-gradient(0deg, rgba(3, 12, 21, 0.88) 0%, transparent 42%);
}

.ownership-hero__grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(290px, 0.55fr);
  gap: clamp(2rem, 7vw, 8rem);
  align-items: end;
  padding-top: 11rem;
  padding-bottom: clamp(3.5rem, 7vw, 6.5rem);
}

.ownership-hero__content h1 {
  max-width: 760px;
  margin: 1rem 0 1.35rem;
  font-size: clamp(3rem, 5.6vw, 5.7rem);
  line-height: 0.98;
}

.ownership-hero__content > p {
  max-width: 650px;
  font-size: clamp(1.05rem, 1.4vw, 1.25rem);
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.8);
}

.ownership-brief {
  padding: 2rem;
  border: 1px solid rgba(224, 186, 108, 0.42);
  background: linear-gradient(145deg, rgba(5, 21, 35, 0.86), rgba(13, 43, 64, 0.68));
  box-shadow: 0 22px 70px rgba(0, 0, 0, 0.24);
  backdrop-filter: blur(12px);
}

.ownership-brief__number,
.ownership-pillar__index,
.ownership-frame__body span,
.ownership-compare > span {
  display: block;
  color: var(--ownership-gold);
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  font-weight: 700;
}

.ownership-brief__label {
  display: block;
  margin: 1.6rem 0 0.8rem;
  color: var(--ownership-gold);
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.ownership-brief h2 {
  margin-bottom: 1rem;
  font-size: clamp(1.7rem, 2.4vw, 2.35rem);
  line-height: 1.06;
}

.ownership-brief p,
.ownership-brief small {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
}

.ownership-brief__line {
  display: block;
  width: 100%;
  height: 1px;
  margin: 1.5rem 0 0.8rem;
  background: rgba(224, 186, 108, 0.38);
}

.ownership-intro__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
  gap: clamp(3rem, 8vw, 9rem);
  align-items: center;
}

.ownership-intro__copy h2,
.ownership-gallery__heading h2,
.ownership-comparison__heading h2 {
  margin: 0.95rem 0 1.2rem;
  font-size: clamp(2.2rem, 4vw, 4rem);
  line-height: 1.06;
}

.ownership-intro__copy p,
.ownership-gallery__heading p {
  max-width: 580px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.85;
}

.ownership-pillars {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px;
  background: rgba(224, 186, 108, 0.24);
  border: 1px solid rgba(224, 186, 108, 0.24);
}

.ownership-pillar {
  min-height: 205px;
  padding: 1.65rem;
  background: #0a1d2d;
}

.ownership-pillar:nth-child(4n + 2),
.ownership-pillar:nth-child(4n + 3) {
  background: #0d2639;
}

.ownership-pillar h3 {
  margin: 1.5rem 0 0.7rem;
  font-size: 1.35rem;
  line-height: 1.15;
}

.ownership-pillar p,
.ownership-compare p {
  color: rgba(255, 255, 255, 0.67);
  line-height: 1.65;
}

.ownership-gallery__heading {
  display: grid;
  grid-template-columns: minmax(0, 0.72fr) minmax(0, 1.28fr);
  gap: 2rem;
  align-items: end;
  margin-bottom: 2.8rem;
}

.ownership-gallery__heading p {
  margin-left: auto;
}

.ownership-gallery {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-auto-rows: 180px;
  gap: 0.8rem;
}

.ownership-frame {
  position: relative;
  overflow: hidden;
  background: #0b2132;
}

.ownership-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 600ms ease;
}

.ownership-frame::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(2, 12, 21, 0.95), transparent 68%);
}

.ownership-frame:hover img {
  transform: scale(1.045);
}

.ownership-frame__body {
  position: absolute;
  z-index: 1;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1.35rem;
}

.ownership-frame__body h3 {
  margin: 0.55rem 0 0.4rem;
  font-size: clamp(1.15rem, 1.8vw, 1.6rem);
}

.ownership-frame__body p {
  max-width: 520px;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.9rem;
  line-height: 1.5;
}

.ownership-frame--1 {
  grid-column: span 2;
  grid-row: span 2;
}

.ownership-frame--2,
.ownership-frame--3 {
  grid-column: span 2;
}

.ownership-frame--4,
.ownership-frame--5,
.ownership-frame--6 {
  grid-column: span 1;
}

.ownership-comparison-section {
  background: #dcb968;
  color: var(--ownership-ink);
}

.ownership-comparison-section .eyebrow,
.ownership-compare > span {
  color: #755415;
}

.ownership-comparison__heading {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 2rem;
  margin-bottom: 3.2rem;
}

.ownership-comparison__heading h2,
.ownership-compare h3 {
  color: var(--ownership-ink);
}

.ownership-comparison {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0;
  border-top: 1px solid rgba(6, 19, 33, 0.32);
}

.ownership-compare {
  min-height: 230px;
  padding: 1.7rem 2rem 1.7rem 0;
  border-bottom: 1px solid rgba(6, 19, 33, 0.32);
}

.ownership-compare + .ownership-compare {
  padding-left: 2rem;
  border-left: 1px solid rgba(6, 19, 33, 0.32);
}

.ownership-compare h3 {
  margin: 1.55rem 0 0.8rem;
  font-size: 1.5rem;
  line-height: 1.1;
}

.ownership-compare p {
  color: rgba(6, 19, 33, 0.77);
}

@media (max-width: 992px) {
  .ownership-hero {
    min-height: auto;
  }

  .ownership-hero__grid,
  .ownership-intro__grid,
  .ownership-gallery__heading,
  .ownership-pillars,
  .ownership-comparison {
    grid-template-columns: 1fr;
  }

  .ownership-hero__grid {
    padding-top: 10rem;
  }

  .ownership-brief {
    max-width: 540px;
  }

  .ownership-gallery__heading p {
    margin-left: 0;
  }

  .ownership-frame--1,
  .ownership-frame--2,
  .ownership-frame--3 {
    grid-column: span 2;
  }

  .ownership-frame--4,
  .ownership-frame--5,
  .ownership-frame--6 {
    grid-column: span 1;
  }

  .ownership-compare,
  .ownership-compare + .ownership-compare {
    min-height: auto;
    padding: 1.5rem 0;
    border-left: 0;
  }
}

@media (max-width: 640px) {
  .ownership-hero__grid {
    padding-top: 8rem;
  }

  .ownership-brief {
    padding: 1.45rem;
  }

  .ownership-gallery {
    grid-template-columns: 1fr;
    grid-auto-rows: 310px;
  }

  .ownership-frame--1,
  .ownership-frame--2,
  .ownership-frame--3,
  .ownership-frame--4,
  .ownership-frame--5,
  .ownership-frame--6 {
    grid-column: span 1;
    grid-row: span 1;
  }

  .ownership-frame__body p {
    display: none;
  }
}
</style>
