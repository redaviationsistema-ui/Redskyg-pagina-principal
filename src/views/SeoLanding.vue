<template>
    <section class="seo-hero">
      <div class="container hero-grid">
        <div>
          <nav class="seo-breadcrumbs" aria-label="Breadcrumb">
            <RouterLink :to="toLocalizedRoute('Home')">
              {{ locale.value === "en" ? "Home" : "Inicio" }}
            </RouterLink>
            <span>/</span>
            <RouterLink :to="toLocalizedRoute('Blog')">
              {{ locale.value === "en" ? "Pages" : "Paginas" }}
            </RouterLink>
            <span>/</span>
            <span aria-current="page">{{ page.title }}</span>
          </nav>
          <span class="eyebrow">{{ page.heroKicker }}</span>
          <h1>{{ page.heroTitle }}</h1>
          <p>{{ page.heroIntro }}</p>

          <div class="hero-actions">
            <a
              class="btn-primary"
              :href="page.primaryHref || quickQuoteHref"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ page.primaryCtaLabel || landingLabels.heroPrimary }}
            </a>
            <RouterLink class="btn-secondary" :to="toLocalizedRoute('Contact')">
              {{ page.secondaryCtaLabel || landingLabels.heroSecondary }}
            </RouterLink>
          </div>

          <div v-if="page.heroHighlights?.length" class="hero-trust-strip">
            <span v-for="item in page.heroHighlights" :key="item" class="hero-trust-pill">
              {{ item }}
            </span>
          </div>
        </div>

        <aside class="hero-panel hero-visual">
          <div v-if="page.heroVideo || page.heroImage" class="hero-image-shell">
            <video
              v-if="page.heroVideo"
              class="hero-video"
              :poster="page.heroImage"
              autoplay
              muted
              loop
              playsinline
            >
              <source :src="page.heroVideo" type="video/mp4" />
            </video>
            <img v-else-if="page.heroImage" :src="page.heroImage" :alt="page.heroTitle" class="hero-image" loading="eager" />
            <div class="hero-image-overlay"></div>
          </div>

          <div class="hero-panel-copy">
            <span>{{ content.profileLabel }}</span>
            <ul>
              <li v-for="item in page.audience" :key="item">{{ item }}</li>
            </ul>
          </div>

          <div v-if="page.heroStats?.length" class="hero-stats">
            <article v-for="stat in page.heroStats" :key="stat.label" class="hero-stat">
              <strong>{{ stat.value }}</strong>
              <span>{{ stat.label }}</span>
            </article>
          </div>
        </aside>
      </div>
    </section>

    <section class="section content-section">
      <div class="container content-grid">
        <article
          v-for="(section, index) in page.sections"
          :key="section.title"
          class="content-card"
          :class="{ 'has-image': section.image }"
        >
          <div v-if="section.image" class="content-media">
            <img :src="section.image" :alt="section.title" loading="lazy" decoding="async" />
          </div>

          <div class="content-body">
            <span class="content-kicker">
              {{ String(index + 1).padStart(2, "0") }} · {{ section.kicker || page.heroKicker }}
            </span>
            <h2>{{ section.title }}</h2>
            <p class="content-summary">
              {{ section.summary || section.paragraphs?.[0] || section.text }}
            </p>
            <div v-if="section.highlights?.length" class="content-highlights">
              <span v-for="highlight in section.highlights" :key="highlight" class="highlight-pill">
                {{ highlight }}
              </span>
            </div>
            <div class="content-conversion-row">
              <small>{{ landingLabels.cardMicrocopy }}</small>
              <span class="card-cta">{{ landingLabels.cardCta }}</span>
            </div>
            <details v-if="section.paragraphs?.length > 1" class="content-details">
              <summary>{{ content.expandLabel }}</summary>
              <p v-for="paragraph in section.paragraphs.slice(1)" :key="paragraph">{{ paragraph }}</p>
            </details>
            <RouterLink
              v-if="section.routeName"
              class="section-link"
              :to="toLocalizedRoute(section.routeName)"
            >
              {{ section.linkLabel || content.sectionLinkCta }}
            </RouterLink>
            <a
              v-else-if="section.href"
              class="section-link"
              :href="section.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ section.linkLabel || content.sectionLinkCta }}
            </a>
          </div>
        </article>
      </div>
    </section>

    <section class="section quick-quote-section">
      <div class="container quick-quote-shell">
        <div class="quick-quote-copy">
          <span class="eyebrow">{{ content.quickFormKicker }}</span>
          <h2>{{ content.quickFormTitle }}</h2>
          <strong class="quick-premium-line">{{ landingLabels.quickFormBadge }}</strong>
          <p>{{ content.quickFormText }}</p>
        </div>

        <form class="quick-quote-form" @submit.prevent="openQuickQuote">
          <div class="quick-field">
            <span class="quick-icon" aria-hidden="true">{{ landingLabels.quickIcons.name }}</span>
            <label for="quick-name">{{ content.quickNameLabel }}</label>
            <input id="quick-name" v-model="quickForm.name" type="text" required />
          </div>

          <div class="quick-field">
            <span class="quick-icon" aria-hidden="true">{{ landingLabels.quickIcons.route }}</span>
            <label for="quick-route">{{ content.quickRouteLabel }}</label>
            <input id="quick-route" v-model="quickForm.route" type="text" required />
          </div>

          <div class="quick-field">
            <span class="quick-icon" aria-hidden="true">{{ landingLabels.quickIcons.passengers }}</span>
            <label for="quick-passengers">{{ content.quickPassengersLabel }}</label>
            <input id="quick-passengers" v-model="quickForm.passengers" type="text" required />
          </div>

          <button class="btn-highlight quick-submit" type="submit">
            {{ content.instantQuoteCta }}
          </button>
        </form>
      </div>
    </section>

    <section class="section faq-section">
      <div class="container faq-shell">
        <div>
          <span class="eyebrow">{{ content.faqKicker }}</span>
          <h2>{{ content.faqTitle }}</h2>
        </div>

        <div class="faq-list">
          <details
            v-for="(faq, index) in page.faqs"
            :key="faq.question"
            class="faq-card"
            :open="index === 0"
          >
            <summary>
              <h3>{{ faq.question }}</h3>
              <span class="faq-toggle">{{ landingLabels.faqToggle }}</span>
            </summary>
            <ul class="faq-points">
              <li v-for="point in faqPoints(faq.answer)" :key="point">{{ point }}</li>
            </ul>
          </details>
        </div>
      </div>
    </section>

    <section class="section related-links-section">
      <div class="container related-links-shell">
        <article class="related-links-card">
          <span class="eyebrow">{{ locale.value === "en" ? "Priority pages" : "Paginas prioritarias" }}</span>
          <h2>{{ locale.value === "en" ? "Core internal path" : "Ruta interna principal" }}</h2>
          <div class="related-links-list">
            <RouterLink class="related-link" :to="toLocalizedRoute('Home')">
              {{ locale.value === "en" ? "Home" : "Inicio" }}
            </RouterLink>
            <RouterLink
              v-for="priority in priorityLinks"
              :key="priority.slug"
              class="related-link"
              :to="localizedSeoPath(priority)"
            >
              {{ priority.title }}
            </RouterLink>
            <RouterLink
              v-for="related in cityLinks"
              :key="related.slug"
              class="related-link"
              :to="localizedSeoPath(related)"
            >
              {{ related.title }}
            </RouterLink>
          </div>
        </article>

        <article class="related-links-card">
          <span class="eyebrow">{{ locale.value === "en" ? "Pages to quote" : "Paginas a cotizacion" }}</span>
          <h2>{{ locale.value === "en" ? "Quote and external links" : "Cotizacion y enlaces externos" }}</h2>
          <div class="related-links-list">
            <RouterLink class="related-link" :to="localizedSeoPath(quotePage)">
              {{ quotePage.title }}
            </RouterLink>
            <a
              v-for="link in externalLinks"
              :key="link.href"
              class="related-link is-external"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ link.label }}
            </a>
          </div>
        </article>
      </div>
    </section>

    <section class="section cta-section">
      <div class="container cta-card">
        <div>
          <span class="eyebrow">{{ content.nextStep }}</span>
          <h2>{{ landingLabels.finalTitle }}</h2>
          <p>{{ landingLabels.finalText }}</p>
          <small class="cta-urgency">{{ landingLabels.finalUrgency }}</small>
        </div>

        <div class="cta-actions">
          <a
            class="btn-primary"
            :href="quickQuoteHref"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ landingLabels.finalPrimary }}
          </a>
          <a class="btn-secondary" :href="page.whatsappHref" target="_blank" rel="noopener noreferrer">
            {{ landingLabels.finalSecondary }}
          </a>
        </div>
      </div>
    </section>

    <a
      class="sticky-quote-cta"
      :href="quickQuoteHref"
      target="_blank"
      rel="noopener noreferrer"
    >
      {{ content.instantQuoteCta }}
    </a>
</template>

<script setup>
import { computed, onMounted, onUnmounted, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import { getSeoPageBySlug, getSeoPagePathForLocale, resolveSeoPageForLocale } from "../data/seoPages";
import en from "../locales/en";
import es from "../locales/es";
import { localizePath, useLocale } from "../i18n";

const route = useRoute();
const { locale, toLocalizedRoute } = useLocale();
const faqScriptId = "seo-page-faq-schema";
const messages = { es, en };
const page = computed(() =>
  resolveSeoPageForLocale(getSeoPageBySlug(String(route.name || "")), locale.value)
);
const content = computed(() => messages[locale.value].seoLanding);
const quotePage = computed(() =>
  resolveSeoPageForLocale(getSeoPageBySlug("landing"), locale.value)
);
const priorityLinks = computed(() =>
  ["vuelos-privados-mexico", "landing", "jet-privado-cdmx-guadalajara"]
    .map((slug) => getSeoPageBySlug(slug))
    .map((entry) => (entry ? resolveSeoPageForLocale(entry, locale.value) : entry))
    .filter(Boolean)
    .filter((entry) => entry.slug !== page.value?.slug)
);
const cityLinks = computed(() =>
  ["renta-jet-privado-cdmx", "jet-privado-monterrey", "jet-privado-cancun"]
    .map((slug) => getSeoPageBySlug(slug))
    .map((entry) => (entry ? resolveSeoPageForLocale(entry, locale.value) : entry))
    .filter(Boolean)
);
const externalLinks = computed(() =>
  locale.value === "en"
    ? [
        { label: "Instagram", href: "https://www.instagram.com/redaviationcompany" },
        { label: "TikTok", href: "https://www.tiktok.com/@redaviationcompany" },
        { label: "Main website", href: "https://redskyg.com/" },
        { label: "Quoting website", href: "https://redskyg.com/landing" },
      ]
    : [
        { label: "Instagram", href: "https://www.instagram.com/redaviationcompany" },
        { label: "TikTok", href: "https://www.tiktok.com/@redaviationcompany" },
        { label: "Nuestra web", href: "https://redskyg.com/" },
        { label: "Cotizaciones", href: "https://redskyg.com/landing" },
      ]
);
const quickForm = reactive({
  name: "",
  route: "",
  passengers: "",
});
const defaultFleetHref = "https://redskyg.com/landing/es-mx/reserva";

const landingLabels = computed(() =>
  locale.value === "en"
    ? {
        heroPrimary: "Get Instant Quote",
        heroSecondary: "Speak to Advisor",
        cardMicrocopy: "Response under 15 minutes",
        cardCta: "View availability",
        quickFormBadge: "Immediate availability. No commitment required.",
        quickIcons: {
          name: "01",
          route: "02",
          passengers: "03",
        },
        faqToggle: "Open",
        finalTitle: "Secure your aircraft before availability changes.",
        finalText:
          "Move from browsing into a real quote with faster response, tighter coordination, and live aircraft review.",
        finalUrgency: "Limited aircraft availability daily.",
        finalPrimary: "Get Quote Now",
        finalSecondary: "WhatsApp Instant",
      }
    : {
        heroPrimary: "Cotizar vuelo ahora",
        heroSecondary: "Hablar con asesor",
        cardMicrocopy: "Response under 15 minutes",
        cardCta: "Ver disponibilidad",
        quickFormBadge: "Disponibilidad inmediata. Sin compromiso.",
        quickIcons: {
          name: "01",
          route: "02",
          passengers: "03",
        },
        faqToggle: "Abrir",
        finalTitle: "Asegura tu aeronave antes de que cambie la disponibilidad.",
        finalText:
          "Pasa de explorar a cotizar con una respuesta mas rapida, mejor coordinacion y revision real de aeronave.",
        finalUrgency: "Disponibilidad limitada de aeronaves cada dia.",
        finalPrimary: "Cotizar vuelo ahora",
        finalSecondary: "WhatsApp instantaneo",
      }
);

const localizedSeoPath = (pageEntry) =>
  localizePath(getSeoPagePathForLocale(pageEntry, locale.value), locale.value);

const quickQuoteHref = computed(() => {
  const message =
    locale.value === "en"
      ? `Hello, I would like to quote a private flight now.%0AName: ${quickForm.name || "-"}%0ARoute: ${quickForm.route || "-"}%0APassengers: ${quickForm.passengers || "-"}`
      : `Hola, quiero cotizar un vuelo ahora.%0ANombre: ${quickForm.name || "-"}%0ARuta: ${quickForm.route || "-"}%0APasajeros: ${quickForm.passengers || "-"}`;

  return `https://wa.me/525586186576?text=${message}`;
});

const openQuickQuote = () => {
  window.open(quickQuoteHref.value, "_blank", "noopener,noreferrer");
};

const faqPoints = (answer = "") =>
  String(answer)
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);

const mountFaqSchema = () => {
  if (!page.value) return;

  let script = document.getElementById(faqScriptId);

  if (!script) {
    script = document.createElement("script");
    script.id = faqScriptId;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.value.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  });
};

onMounted(() => {
  mountFaqSchema();
});

watch(page, () => {
  mountFaqSchema();
});

onUnmounted(() => {
  const script = document.getElementById(faqScriptId);
  if (script) script.remove();
});
</script>

<style scoped>
.seo-hero {
  padding: 11rem 0 4rem;
  background:
    radial-gradient(circle at top right, rgba(212, 175, 55, 0.15), transparent 22%),
    linear-gradient(180deg, #071321 0%, #0b1b2f 100%);
}

.hero-grid,
.faq-shell,
.cta-card {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;
  align-items: start;
}

.eyebrow {
  display: inline-block;
  color: #d4af37;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  font-size: 0.74rem;
}

.seo-breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  align-items: center;
  margin-bottom: 1.1rem;
  color: rgba(255, 255, 255, 0.66);
  font-size: 0.82rem;
}

.seo-breadcrumbs a {
  color: #8bbcff;
  text-decoration: none;
}

.seo-breadcrumbs span[aria-current="page"] {
  color: white;
}

h1,
h2,
h3 {
  color: white;
}

.seo-hero h1 {
  margin: 1rem 0 1.2rem;
  font-size: clamp(2.6rem, 4vw, 4.3rem);
  line-height: 1.02;
}

.seo-hero p,
.content-card p,
.faq-card p,
.cta-card p {
  color: rgba(255, 255, 255, 0.76);
  line-height: 1.8;
}

.hero-actions,
.cta-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.hero-trust-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 1rem;
}

.hero-trust-pill {
  display: inline-flex;
  align-items: center;
  min-height: 38px;
  padding: 0.55rem 0.9rem;
  border-radius: 999px;
  border: 1px solid rgba(123, 183, 255, 0.22);
  background: rgba(123, 183, 255, 0.08);
  color: white;
  font-size: 0.8rem;
  line-height: 1.3;
}

.btn-primary,
.btn-secondary,
.btn-highlight,
.btn-fleet {
  min-height: 54px;
  padding: 0.95rem 1.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.78rem;
}

.btn-primary {
  background: linear-gradient(135deg, #d4af37, #f2d57a);
  color: #08121f;
  font-weight: 800;
}

.btn-highlight {
  background: linear-gradient(135deg, #d4af37, #f2d57a);
  color: #08121f;
  font-weight: 700;
}

.btn-fleet {
  background: linear-gradient(135deg, #2b8cff, #78b5ff);
  color: white;
  font-weight: 700;
}

.btn-secondary {
  border: 1px solid rgba(255, 255, 255, 0.24);
  color: white;
  background: rgba(255, 255, 255, 0.03);
}

.btn-primary,
.btn-secondary {
  transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease, background 220ms ease;
}

.btn-primary:hover,
.btn-secondary:hover {
  transform: translateY(-3px);
}

.btn-primary:hover {
  box-shadow: 0 18px 44px rgba(212, 175, 55, 0.2);
}

.btn-secondary:hover {
  border-color: rgba(123, 183, 255, 0.34);
  background: rgba(123, 183, 255, 0.08);
}

.hero-panel,
.content-card,
.faq-card,
.cta-card {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(14px);
  border-radius: 28px;
}

.hero-panel {
  padding: 1.6rem;
}

.hero-visual {
  overflow: hidden;
}

.hero-image-shell {
  position: relative;
  min-height: 260px;
  border-radius: 22px;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  min-height: 260px;
  object-fit: cover;
  display: block;
}

.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.04);
  filter: saturate(0.92) contrast(1.04);
}

.hero-image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(7, 19, 33, 0.28), rgba(7, 19, 33, 0.78));
}

.hero-panel-copy {
  padding-top: 1.25rem;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.hero-stat {
  padding: 0.9rem;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition:
    transform 220ms ease,
    border-color 220ms ease,
    box-shadow 220ms ease,
    background 220ms ease;
}

.hero-stat:hover {
  transform: translateY(-4px);
  border-color: rgba(123, 183, 255, 0.3);
  box-shadow: 0 18px 40px rgba(5, 14, 26, 0.28);
  background: rgba(123, 183, 255, 0.08);
}

.hero-stat strong,
.content-kicker {
  display: block;
  color: #d4af37;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-size: 0.72rem;
}

.hero-stat strong {
  font-size: 1rem;
  color: white;
  letter-spacing: 0.04em;
  margin-bottom: 0.35rem;
}

.hero-stat span {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.78rem;
  line-height: 1.5;
}

.content-card {
  overflow: hidden;
  padding: 0;
  transition:
    transform 240ms ease,
    border-color 240ms ease,
    box-shadow 240ms ease,
    background 240ms ease;
}

.content-card:hover,
.faq-card:hover,
.related-links-card:hover {
  transform: translateY(-8px) scale(1.01);
  border-color: rgba(123, 183, 255, 0.22);
  box-shadow: 0 26px 60px rgba(3, 10, 20, 0.34);
  background: rgba(255, 255, 255, 0.06);
}

.content-media {
  position: relative;
  min-height: 220px;
}

.content-media img {
  width: 100%;
  height: 100%;
  min-height: 220px;
  object-fit: cover;
  display: block;
}

.content-body {
  padding: 1.7rem;
}

.content-summary {
  color: rgba(255, 255, 255, 0.86);
}

.content-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 1rem;
}

.content-conversion-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.15rem;
}

.content-conversion-row small,
.cta-urgency {
  color: #8fcaff;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.card-cta {
  min-height: 42px;
  padding: 0.75rem 0.95rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #08121f;
  background: linear-gradient(135deg, #d4af37, #f2d57a);
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  box-shadow: 0 12px 28px rgba(212, 175, 55, 0.15);
}

.highlight-pill {
  display: inline-flex;
  align-items: center;
  min-height: 36px;
  padding: 0.55rem 0.85rem;
  border-radius: 999px;
  background: rgba(123, 183, 255, 0.09);
  border: 1px solid rgba(123, 183, 255, 0.2);
  color: white;
  font-size: 0.8rem;
  line-height: 1.3;
}

.content-details {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.content-details summary {
  cursor: pointer;
  color: #7bb7ff;
  font-weight: 600;
  list-style: none;
}

.content-details summary::-webkit-details-marker {
  display: none;
}

.content-details[open] summary {
  margin-bottom: 0.85rem;
}

.content-details p + p {
  margin-top: 0.9rem;
}

.section-link {
  display: inline-flex;
  margin-top: 1.25rem;
  color: #7bb7ff;
  text-decoration: none;
  font-weight: 600;
}

.hero-panel span {
  display: block;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-size: 0.72rem;
  margin-bottom: 1rem;
}

.hero-panel ul {
  margin: 0;
  padding-left: 1.2rem;
  color: white;
  display: grid;
  gap: 0.75rem;
}

.content-section,
.cta-section,
.quick-quote-section,
.related-links-section {
  background: linear-gradient(180deg, #0a1829 0%, #08121f 100%);
}

.faq-section {
  background: linear-gradient(180deg, #08121f 0%, #0a1829 100%);
}

.content-grid,
.faq-list,
.related-links-shell,
.related-links-list {
  display: grid;
  gap: 1rem;
}

.content-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.content-card,
.faq-card {
  padding: 1.5rem;
}

.content-card {
  padding: 0;
}

.cta-card {
  padding: 2rem;
}

.related-links-shell {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.related-links-card {
  padding: 1.7rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(14px);
  border-radius: 28px;
}

.related-links-card h2 {
  margin: 0.85rem 0 1rem;
}

.related-links-list {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.related-link {
  display: inline-flex;
  align-items: center;
  min-height: 48px;
  padding: 0.85rem 1rem;
  border-radius: 16px;
  text-decoration: none;
  color: white;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition:
    transform 220ms ease,
    border-color 220ms ease,
    background 220ms ease;
}

.related-link:hover {
  transform: translateY(-3px);
  border-color: rgba(123, 183, 255, 0.24);
  background: rgba(123, 183, 255, 0.08);
}

.related-link.is-external {
  color: #7bb7ff;
}

.quick-quote-shell {
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 1.25rem;
  align-items: start;
  padding: 2rem;
  border: 1px solid rgba(212, 175, 55, 0.14);
  background:
    radial-gradient(circle at top right, rgba(212, 175, 55, 0.1), transparent 28%),
    rgba(255, 255, 255, 0.05);
  border-radius: 28px;
  backdrop-filter: blur(14px);
  box-shadow: 0 28px 64px rgba(3, 10, 20, 0.28);
}

.quick-quote-copy h2 {
  margin: 0.75rem 0 1rem;
}

.quick-premium-line {
  display: inline-flex;
  margin-bottom: 0.9rem;
  color: #f2d57a;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 0.82rem;
}

.quick-quote-form {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.9rem;
}

.quick-field {
  position: relative;
  display: grid;
  gap: 0.45rem;
}

.quick-icon {
  position: absolute;
  top: -10px;
  right: 12px;
  min-width: 34px;
  min-height: 34px;
  padding: 0.35rem 0.5rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #08121f;
  background: linear-gradient(135deg, #d4af37, #f2d57a);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.quick-field label {
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.quick-field input {
  min-height: 52px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  padding: 0.85rem 1rem;
}

.quick-submit {
  align-self: end;
}

.faq-list {
  gap: 0.9rem;
}

.faq-card {
  padding: 0;
  overflow: hidden;
}

.faq-card summary {
  list-style: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.35rem 1.5rem;
}

.faq-card summary::-webkit-details-marker {
  display: none;
}

.faq-card h3 {
  margin: 0;
  font-size: 1.05rem;
}

.faq-toggle {
  color: #d4af37;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.faq-points {
  margin: 0;
  padding: 0 1.5rem 1.4rem 2.6rem;
  color: rgba(255, 255, 255, 0.76);
  display: grid;
  gap: 0.7rem;
}

.faq-points li {
  line-height: 1.7;
}

.sticky-quote-cta {
  position: fixed;
  right: 24px;
  bottom: 108px;
  z-index: 30;
  min-height: 52px;
  padding: 0.95rem 1.15rem;
  border-radius: 999px;
  background: linear-gradient(135deg, #d4af37, #f2d57a);
  color: #08121f;
  text-decoration: none;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.28);
}

@media (max-width: 992px) {
  .hero-grid,
  .faq-shell,
  .cta-card,
  .content-grid,
  .quick-quote-shell,
  .quick-quote-form,
  .related-links-shell,
  .related-links-list {
    grid-template-columns: 1fr;
  }

  .hero-stats {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .hero-actions,
  .cta-actions {
    flex-direction: column;
  }

  .content-conversion-row,
  .faq-card summary {
    align-items: flex-start;
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary,
  .btn-highlight,
  .btn-fleet {
    width: 100%;
  }

  .sticky-quote-cta {
    left: 16px;
    right: 16px;
    bottom: 92px;
    justify-content: center;
    text-align: center;
  }
}
</style>
