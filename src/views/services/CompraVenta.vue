<template>
  <section class="sales-page">
    <section class="sales-hero" :style="heroStyle">
      <div class="sales-hero__veil"></div>
      <div class="container sales-hero__grid">
        <div class="sales-copy reveal">
          <span class="sales-eyebrow">{{ content.heroEyebrow }}</span>
          <h1>{{ content.heroTitle }}</h1>
          <p>{{ content.heroText }}</p>

          <div class="sales-actions">
            <RouterLink class="sales-btn sales-btn--primary" :to="toLocalizedRoute('Contact')">
              {{ content.heroPrimaryCta }}
            </RouterLink>
            <RouterLink class="sales-btn sales-btn--ghost" :to="toLocalizedRoute('PrePurchaseInspection')">
              {{ content.heroSecondaryCta }}
            </RouterLink>
          </div>
        </div>

        <div class="sales-aside reveal reveal-delay">
          <div class="sales-panel">
            <span class="sales-panel__label">{{ content.sectionEyebrow }}</span>
            <h2>{{ content.sectionTitle }}</h2>
            <p>{{ content.sectionText }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section sales-rhythm">
      <div class="container">
        <div class="sales-rhythm__intro reveal">
          <span class="sales-eyebrow">{{ content.sectionEyebrow }}</span>
          <p>{{ content.sectionText }}</p>
        </div>

        <div class="sales-lines">
          <article
            v-for="(item, index) in services"
            :key="item.title"
            class="sales-line reveal"
            :style="{ transitionDelay: `${index * 120}ms` }"
          >
            <span class="sales-line__index">{{ String(index + 1).padStart(2, '0') }}</span>
            <div class="sales-line__content">
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section sales-journey">
      <div class="container">
        <div class="sales-journey__layout">
          <figure class="sales-journey__image reveal">
            <img src="/images/Home/IMG_3121.jpg" :alt="locale.value === 'en' ? 'Aircraft transaction process support' : 'Soporte visual del proceso transaccional'" loading="lazy" />
          </figure>

          <div>
            <div class="sales-journey__header reveal">
              <div class="sales-journey__copy">
                <span class="sales-eyebrow">{{ locale.value === "en" ? "Process Flow" : "Flujo del proceso" }}</span>
                <h2>{{ locale.value === "en" ? "A clearer transaction path." : "Una ruta transaccional más clara." }}</h2>
              </div>
            </div>

            <div class="sales-timeline">
              <article
                v-for="(item, index) in steps"
                :key="item.title"
                class="sales-stage reveal"
                :style="{ transitionDelay: `${index * 140}ms` }"
              >
                <span class="sales-stage__count">{{ String(index + 1).padStart(2, '0') }}</span>
                <div>
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.text }}</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section sales-cta">
      <div class="container">
        <div class="sales-cta__shell reveal">
          <div>
            <span class="sales-eyebrow">{{ locale.value === "en" ? "Next Step" : "Siguiente paso" }}</span>
            <h2>{{ content.finalTitle }}</h2>
            <p>{{ content.finalText }}</p>
          </div>

          <div class="sales-actions sales-actions--stack">
            <RouterLink class="sales-btn sales-btn--primary" :to="toLocalizedRoute('Contact')">
              {{ content.finalPrimaryCta }}
            </RouterLink>
            <RouterLink class="sales-btn sales-btn--ghost" :to="toLocalizedRoute('PrePurchaseInspection')">
              {{ content.finalSecondaryCta }}
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { useLocale } from "../../i18n";

const { locale, toLocalizedRoute } = useLocale();

const heroStyle = {
  backgroundImage: 'url("/images/Service/IMG_8868.jpg")',
  backgroundPosition: "center center",
};

const content = computed(() =>
  locale.value === "en"
    ? {
        heroEyebrow: "Aircraft Sales and Acquisition",
        heroTitle: "Aircraft transactions with specialized support.",
        heroText: "If you are evaluating an aircraft opportunity, we support sourcing, valuation, negotiation, and closing with clearer technical, commercial, and documentary coordination.",
        heroPrimaryCta: "Discuss an Aircraft Opportunity",
        heroSecondaryCta: "Review Pre-Purchase Advisory",
        sectionEyebrow: "Transaction Support",
        sectionTitle: "Aircraft transactions backed by technical review.",
        sectionText: "We support aircraft acquisition and sale processes where valuation, technical review, negotiation flow and transaction timing directly affect the outcome.",
        finalTitle: "Aircraft acquisition, sales and evaluation.",
        finalText: "We help define the right commercial and technical next step before the transaction becomes more complex.",
        finalPrimaryCta: "Speak with a Transaction Advisor",
        finalSecondaryCta: "Review Pre-Purchase Advisory",
      }
    : {
        heroEyebrow: "Venta y adquisición de aeronaves",
        heroTitle: "Transacciones de aeronaves con soporte especializado.",
        heroText: "Si está evaluando una oportunidad de aeronave, apoyamos la localización, valuación, negociación y cierre con mejor coordinación técnica, comercial y documental.",
        heroPrimaryCta: "Hablar sobre una oportunidad de aeronave",
        heroSecondaryCta: "Revisar asesoría precompra",
        sectionEyebrow: "Soporte transaccional",
        sectionTitle: "Transacciones con respaldo técnico y comercial.",
        sectionText: "Apoyamos procesos de compra y venta de aeronaves donde la valuación, la revisión técnica, la negociación y los tiempos de cierre cambian el resultado.",
        finalTitle: "Compra, venta y evaluación de aeronaves.",
        finalText: "Ayudamos a definir el siguiente paso comercial y técnico correcto antes de que la transacción se vuelva más compleja.",
        finalPrimaryCta: "Hablar con un asesor de transacciones",
        finalSecondaryCta: "Revisar asesoría precompra",
      }
);

const services = computed(() =>
  locale.value === "en"
    ? [
        { title: "Aircraft sourcing", text: "Identify aircraft options that match mission profile, budget, and availability." },
        { title: "Valuation context", text: "Review pricing, market position, and transaction expectations with better reference points." },
        { title: "Negotiation support", text: "Advance through terms, timing, and risk points with stronger structure." },
        { title: "Closing coordination", text: "Keep commercial, legal, and technical workstreams aligned through closing." },
      ]
    : [
        { title: "Localización de aeronaves", text: "Identifique opciones que correspondan al perfil de misión, presupuesto y disponibilidad." },
        { title: "Contexto de valuación", text: "Revise precio, posicionamiento de mercado y expectativas de transacción con mejores referencias." },
        { title: "Soporte de negociación", text: "Avance en términos, tiempos y puntos de riesgo con mayor estructura." },
        { title: "Coordinación de cierre", text: "Mantenga alineados los frentes comerciales, legales y técnicos hasta el cierre." },
      ]
);

const steps = computed(() =>
  locale.value === "en"
    ? [
        { title: "Define the objective", text: "Clarify whether you need acquisition, sale, evaluation, or portfolio review." },
        { title: "Review the aircraft opportunity", text: "Align the commercial and technical picture before going deeper." },
        { title: "Coordinate the next stage", text: "Move toward inspection, negotiation, or closing with a clearer plan." },
      ]
    : [
        { title: "Definir el objetivo", text: "Aclara si necesita adquisición, venta, evaluación o revisión de portafolio." },
        { title: "Revisar la oportunidad de aeronave", text: "Alinea la parte comercial y técnica antes de profundizar." },
        { title: "Coordinar la siguiente etapa", text: "Avanza hacia inspección, negociación o cierre con un plan más claro." },
      ]
);

let observer;

onMounted(() => {
  const elements = document.querySelectorAll(".reveal");

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  elements.forEach((element) => observer.observe(element));
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>
.sales-page {
  background:
    radial-gradient(circle at top right, rgba(215, 176, 116, 0.08), transparent 22%),
    linear-gradient(180deg, #06101b 0%, #091726 45%, #07111c 100%);
  color: #f6efe5;
}

.sales-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
}

.sales-hero__veil {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(5, 13, 23, 0.68) 0%, rgba(5, 13, 23, 0.48) 34%, rgba(5, 13, 23, 0.2) 62%, rgba(5, 13, 23, 0.38) 100%),
    linear-gradient(180deg, rgba(5, 13, 23, 0.08), rgba(5, 13, 23, 0.28));
}

.sales-hero__grid,
.sales-cta__shell {
  position: relative;
  z-index: 1;
}

.sales-hero__grid {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
  gap: 3rem;
  align-items: center;
  padding-top: 9rem;
  padding-bottom: 6rem;
}

.sales-copy h1 {
  max-width: 8ch;
  margin: 1rem 0 1.5rem;
  font-size: clamp(3.6rem, 8vw, 7rem);
  line-height: 0.9;
  letter-spacing: -0.05em;
}

.sales-copy p,
.sales-panel p,
.sales-line p,
.sales-stage p,
.sales-rhythm__intro p,
.sales-cta__shell p {
  color: rgba(246, 239, 229, 0.8);
  line-height: 1.8;
}

.sales-copy p {
  max-width: 560px;
  font-size: 1.1rem;
}

.sales-eyebrow,
.sales-panel__label,
.sales-line__index,
.sales-stage__count {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #d7b074;
  font-size: 0.82rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.sales-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.sales-actions--stack {
  justify-content: flex-end;
}

.sales-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 56px;
  padding: 0 1.6rem;
  border-radius: 999px;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.8rem;
  transition: transform 0.35s ease, background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
}

.sales-btn:hover {
  transform: translateY(-3px);
}

.sales-btn--primary {
  background: linear-gradient(135deg, #d3a954, #f0d28a);
  color: #08111b;
  font-weight: 700;
  box-shadow: 0 18px 40px rgba(215, 176, 116, 0.18);
}

.sales-btn--ghost {
  border: 1px solid rgba(215, 176, 116, 0.34);
  color: #f6efe5;
  background: rgba(10, 20, 33, 0.42);
  backdrop-filter: blur(14px);
}

.sales-aside {
  display: flex;
  justify-content: flex-end;
}

.sales-panel {
  max-width: 430px;
  position: relative;
  padding: 1.8rem 0 1.8rem 1.7rem;
  border-radius: 0;
  background: transparent;
  border: 0;
  border-top: 1px solid rgba(215, 176, 116, 0.18);
  box-shadow: none;
  backdrop-filter: none;
}

.sales-panel::before,
.sales-stage::before {
  content: "";
  position: absolute;
  left: 0;
  top: 1rem;
  bottom: 1rem;
  width: 2px;
  background: linear-gradient(180deg, rgba(215, 176, 116, 0.95), rgba(215, 176, 116, 0.1));
}

.sales-panel h2,
.sales-journey__header h2,
.sales-cta__shell h2 {
  margin: 1rem 0;
  font-size: clamp(2rem, 3vw, 3.4rem);
  line-height: 1;
}

.sales-rhythm {
  padding-top: 7rem;
}

.sales-rhythm__intro {
  max-width: 760px;
  margin-bottom: 3rem;
}

.sales-lines {
  display: grid;
  border-top: 1px solid rgba(215, 176, 116, 0.18);
}

.sales-line {
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  gap: 1.5rem;
  padding: 1.8rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transition: transform 0.45s ease, border-color 0.45s ease, background 0.45s ease;
}

.sales-line:hover {
  transform: translateX(10px);
  border-color: rgba(215, 176, 116, 0.32);
  background: linear-gradient(90deg, rgba(215, 176, 116, 0.05), transparent 65%);
}

.sales-line__content {
  display: grid;
  grid-template-columns: minmax(220px, 0.8fr) minmax(0, 1fr);
  gap: 2rem;
  align-items: start;
}

.sales-line h3,
.sales-stage h3 {
  font-size: clamp(1.4rem, 2vw, 2rem);
  line-height: 1.05;
}

.sales-journey {
  position: relative;
}

.sales-journey::before {
  content: "";
  position: absolute;
  inset: 8% 0 12%;
  background:
    radial-gradient(circle at 20% 20%, rgba(215, 176, 116, 0.08), transparent 24%),
    radial-gradient(circle at 80% 60%, rgba(89, 137, 196, 0.14), transparent 24%);
  pointer-events: none;
}

.sales-journey__header {
  position: relative;
  z-index: 1;
  margin-bottom: 2.5rem;
}

.sales-journey__layout {
  display: grid;
  grid-template-columns: minmax(260px, 0.82fr) minmax(0, 1.18fr);
  gap: 2rem;
  align-items: center;
}

.sales-journey__layout > div {
  min-width: 0;
}

.sales-journey__image {
  margin: 0;
  overflow: hidden;
  border-radius: 30px;
  border: 1px solid rgba(215, 176, 116, 0.14);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.2);
  height: 100%;
}

.sales-journey__image img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 100%;
  object-fit: cover;
  object-position: center;
}

.sales-journey__copy {
  max-width: 720px;
}

.sales-timeline {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 1.2rem;
}

.sales-stage {
  position: relative;
  display: grid;
  grid-template-columns: 90px minmax(0, 1fr);
  gap: 1.5rem;
  align-items: start;
  padding: 1.7rem 0 1.7rem 1.7rem;
  border-radius: 0;
  background: transparent;
  border: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: none;
}

.sales-cta__shell {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 2rem;
  align-items: center;
  padding: 2.5rem 2.25rem;
  border-radius: 34px;
  background:
    linear-gradient(115deg, rgba(7, 19, 32, 0.94), rgba(18, 41, 65, 0.84)),
    radial-gradient(circle at top left, rgba(215, 176, 116, 0.12), transparent 28%);
  border: 1px solid rgba(215, 176, 116, 0.16);
  overflow: hidden;
}

.reveal {
  opacity: 0;
  transform: translateY(48px);
  transition: opacity 0.75s ease, transform 0.75s ease;
}

.reveal-delay {
  transition-delay: 160ms;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1100px) {
  .sales-hero__grid,
  .sales-cta__shell,
  .sales-line__content,
  .sales-journey__layout {
    grid-template-columns: 1fr;
  }

  .sales-aside,
  .sales-actions--stack {
    justify-content: flex-start;
  }

  .sales-copy h1 {
    max-width: 10ch;
  }

  .sales-journey__image img {
    aspect-ratio: 16 / 10;
    height: auto;
  }
}

@media (max-width: 768px) {
  .sales-hero {
    min-height: auto;
  }

  .sales-hero__grid {
    padding-top: 8rem;
    padding-bottom: 4rem;
  }

  .sales-line,
  .sales-stage {
    grid-template-columns: 1fr;
  }

  .sales-copy h1 {
    font-size: clamp(2.9rem, 16vw, 4.6rem);
  }
}

@media (max-width: 640px) {
  .sales-actions {
    flex-direction: column;
  }

  .sales-btn {
    width: 100%;
  }

  .sales-panel,
  .sales-stage,
  .sales-cta__shell {
    padding: 1.5rem;
  }

  .sales-panel,
  .sales-stage {
    padding-left: 1.2rem;
  }
}
</style>
