<template>
  <div class="guide-page">
    <section class="guide-hero">
      <div class="hero-backdrop">
        <img src="/images/Home/home11.png" :alt="content.heroAlt" loading="eager" decoding="async" />
      </div>
      <div class="hero-routes" aria-hidden="true">
        <span class="route-line route-line-one"></span>
        <span class="route-line route-line-two"></span>
        <span class="route-node route-node-one"></span>
        <span class="route-node route-node-two"></span>
      </div>

      <div class="container hero-shell">
        <div class="hero-copy fade-up">
          <span class="eyebrow">{{ content.tag }}</span>
          <h1>{{ content.title }}</h1>
          <p>{{ content.text }}</p>

          <div class="hero-actions">
            <RouterLink class="btn btn-primary" :to="sellAircraftPath">
              {{ content.primaryCta }}
            </RouterLink>
            <RouterLink class="btn btn-ghost" :to="charterPath">
              {{ content.secondaryCta }}
            </RouterLink>
          </div>

          <div class="hero-cta-strip">
            <RouterLink v-for="action in quickActions" :key="action.label" :to="action.to" class="hero-chip">
              {{ action.label }}
            </RouterLink>
          </div>
        </div>

        <aside class="hero-panel fade-up">
          <span class="panel-label">{{ content.panelLabel }}</span>
          <div class="hero-stats">
            <article v-for="(stat, index) in heroStats" :key="stat.label" class="hero-stat">
              <div class="blog-icon-badge is-stat">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path :d="heroIcons[index % heroIcons.length]" />
                </svg>
              </div>
              <strong>{{ stat.value }}</strong>
              <span>{{ stat.label }}</span>
            </article>
          </div>
        </aside>
      </div>
    </section>

    <section class="section trust-section">
      <div class="container trust-grid fade-up">
        <article v-for="(item, index) in trustSignals" :key="item.title" class="trust-card">
          <div class="blog-icon-badge is-strip">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path :d="stripIcons[index % stripIcons.length]" />
            </svg>
          </div>
          <h2>{{ item.title }}</h2>
          <p>{{ item.text }}</p>
        </article>
      </div>
    </section>

    <section class="section what-we-do-section">
      <div class="container">
        <div class="section-banner fade-up">
          <div>
            <span class="eyebrow">{{ content.whatWeDoEyebrow }}</span>
            <h2>{{ content.whatWeDoTitle }}</h2>
          </div>
          <p>{{ content.whatWeDoText }}</p>
        </div>

        <div class="what-we-do-grid">
          <article v-for="(item, index) in whatWeDo" :key="item.title" class="what-we-do-card fade-up" :style="{ animationDelay: `${index * 80}ms` }">
            <div class="blog-icon-badge is-featured">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path :d="heroIcons[index % heroIcons.length]" />
              </svg>
            </div>
            <span class="card-tag">{{ item.kicker }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
            <RouterLink :to="item.to" class="card-action">{{ item.cta }}</RouterLink>
          </article>
        </div>
      </div>
    </section>

    <section class="section process-section">
      <div class="container">
        <div class="section-banner fade-up">
          <div>
            <span class="eyebrow">{{ content.processEyebrow }}</span>
            <h2>{{ content.processTitle }}</h2>
          </div>
          <p>{{ content.processText }}</p>
        </div>

        <div class="process-grid-business">
          <article v-for="(item, index) in businessSteps" :key="item.step" class="process-business-card fade-up" :style="{ animationDelay: `${index * 70}ms` }">
            <span class="process-step">{{ item.step }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section main-pages-section">
      <div class="container">
        <div class="main-pages-shell fade-up">
          <div class="main-pages-intro">
            <span class="eyebrow">{{ content.mainPagesEyebrow }}</span>
            <h2>{{ content.mainPagesTitle }}</h2>
            <p>{{ content.mainPagesText }}</p>
          </div>

          <div class="main-pages-grid">
            <RouterLink
              v-for="(page, pageIndex) in capabilityPages"
              :key="page.slug"
              :to="localizePath(page.path, locale)"
              class="main-page-card fade-up"
              :style="{ animationDelay: `${pageIndex * 80}ms` }"
            >
              <div class="main-page-media">
                <img :src="resolveCardImage(pageIndex, pageIndex)" :alt="page.title" loading="lazy" decoding="async" />
                <div class="card-shade"></div>
                <span class="main-page-index">{{ String(pageIndex + 1).padStart(2, "0") }}</span>
              </div>

              <div class="main-page-body">
                <span class="card-tag">{{ content.mainPagesTitle }}</span>
                <h3>{{ page.title }}</h3>
                <p>{{ page.description }}</p>
                <div class="main-page-footer">
                  <strong>{{ content.goToPage }}</strong>
                  <span>{{ content.mainPagesCta }}</span>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="section featured-section">
      <div class="container featured-layout fade-up">
        <div class="featured-visual">
          <img src="/images/blog/About.png" :alt="content.featuredAlt" loading="lazy" decoding="async" />
          <div class="featured-overlay">
            <span>{{ content.featuredCategory }}</span>
            <h2>{{ content.marketplaceTitle }}</h2>
          </div>
        </div>

        <div class="featured-copy">
          <div class="blog-icon-badge is-featured">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path :d="featuredIcon" />
            </svg>
          </div>
          <span class="eyebrow">{{ content.marketplaceEyebrow }}</span>
          <h2>{{ content.marketplaceTitle }}</h2>
          <p>{{ content.marketplaceText }}</p>
          <div class="featured-pills">
            <span v-for="item in marketplacePills" :key="item">{{ item }}</span>
          </div>
          <a class="btn btn-primary" :href="marketplaceLink" target="_blank" rel="noopener noreferrer">
            {{ content.marketplaceCta }}
          </a>
        </div>
      </div>
    </section>

    <section class="section confidence-section">
      <div class="container confidence-shell fade-up">
        <div class="section-banner">
          <div>
            <span class="eyebrow">{{ content.confidenceEyebrow }}</span>
            <h2>{{ content.confidenceTitle }}</h2>
          </div>
          <p>{{ content.confidenceText }}</p>
        </div>

        <div class="confidence-grid">
          <article v-for="item in confidenceItems" :key="item.title" class="confidence-card">
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </article>
        </div>

        <div class="final-actions">
          <RouterLink class="btn btn-primary" :to="sellAircraftPath">
            {{ content.primaryCta }}
          </RouterLink>
          <RouterLink class="btn btn-ghost" :to="charterPath">
            {{ content.secondaryCta }}
          </RouterLink>
          <RouterLink class="btn btn-ghost" :to="quotePagePath">
            {{ content.quoteCta }}
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import {
  getSeoPagePathForLocale,
  seoPages,
  seoPageGroups,
  resolveSeoPageForLocale,
} from "../data/seoPages";
import { useLocale, localizePath } from "../i18n";

const { locale } = useLocale();
const heroIcons = [
  "M4 18h16M7 14l3-3 3 2 4-5",
  "M3 17l9-11 9 11M6 17h12",
  "M5 12h14M7 8h10M9 16h6",
];
const stripIcons = [
  "M4 12h6m-3-3 3 3-3 3m5-8h7m-7 10h7",
  "M4 18h16M6 18l2-8h8l2 8",
  "M5 12 9 16 19 6",
];
const quickIcons = [
  "M12 21s6-4.35 6-10a6 6 0 1 0-12 0c0 5.65 6 10 6 10Zm0-7.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  "M12 3v10m0 0 4-4m-4 4-4-4M5 14v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3",
];
const featuredIcon = "M12 3 14.8 8.7 21 9.6l-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9L12 3Z";
const groupIcons = {
  "Paginas por Rutas": "M3 17l9-11 9 11M6 17h12",
  "Paginas por Ciudad": "M12 21s6-4.35 6-10a6 6 0 1 0-12 0c0 5.65 6 10 6 10Z",
  "Paginas Informativas": "M5 6h14M5 12h14M5 18h10",
  "Paginas de Intencion de Compra": "M4 12h10m0 0-3-3m3 3-3 3m5-8h4v16h-4",
  "Blog SEO": "M6 5h9l3 3v11H6zM15 5v3h3",
};
const quickLinkIcons = {
  instagram: "M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm8 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM12 7.5A4.5 4.5 0 1 0 12 16.5 4.5 4.5 0 0 0 12 7.5Z",
  tiktok: "M14 4c.7 1.6 1.8 2.7 3.5 3.1V10a6 6 0 0 1-3.5-1.2v5.3a4.6 4.6 0 1 1-4.6-4.6c.3 0 .6 0 .9.1v2.6a2.1 2.1 0 1 0 1.2 1.9V4H14Z",
  web: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm6.8 8h-3.1a14.5 14.5 0 0 0-1.1-4A7 7 0 0 1 18.8 11ZM12 5c.8 0 2 2 2.5 6h-5C10 7 11.2 5 12 5ZM9.4 7A14.5 14.5 0 0 0 8.3 11H5.2A7 7 0 0 1 9.4 7ZM5.2 13h3.1a14.5 14.5 0 0 0 1.1 4A7 7 0 0 1 5.2 13Zm6.8 6c-.8 0-2-2-2.5-6h5c-.5 4-1.7 6-2.5 6Zm2.6-2a14.5 14.5 0 0 0 1.1-4h3.1a7 7 0 0 1-4.2 4Z",
  quote: "M12 3v10m0 0 4-4m-4 4-4-4M5 14v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3",
  city: "M12 21s6-4.35 6-10a6 6 0 1 0-12 0c0 5.65 6 10 6 10Zm0-7.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
};

const categoryMap = {
  "Paginas Principales": { es: "Paginas Principales", en: "Main Pages" },
  "Paginas por Rutas": { es: "Paginas por Rutas", en: "Route Pages" },
  "Paginas por Ciudad": { es: "Paginas por Ciudad", en: "City Pages" },
  "Paginas Informativas": { es: "Paginas Informativas", en: "Informational Pages" },
  "Paginas de Intencion de Compra": { es: "Paginas de Intencion de Compra", en: "Purchase Intent Pages" },
  "Blog SEO": { es: "Guia de contenido", en: "Content Guide" },
};

const groupDescriptions = {
  "Paginas Principales": {
    es: "Urls centrales para capturar demanda amplia, marca y terminos comerciales fuertes.",
    en: "Core URLs built to capture broad demand, brand authority, and strong commercial search terms.",
  },
  "Paginas por Rutas": {
    es: "Paginas enfocadas en corredores con intencion alta y decisiones mas cercanas a la cotizacion.",
    en: "Pages focused on high-intent corridors and route decisions that sit closer to quoting.",
  },
  "Paginas por Ciudad": {
    es: "Cobertura local para plazas clave donde la aviacion privada ya tiene peso comercial real.",
    en: "Local coverage for key markets where private aviation already has real commercial value.",
  },
  "Paginas Informativas": {
    es: "Contenido para resolver dudas, calentar trafico y preparar mejor la conversion.",
    en: "Content built to answer questions, warm up traffic, and improve conversion readiness.",
  },
  "Paginas de Intencion de Compra": {
    es: "Paginas orientadas a usuarios que ya quieren avanzar rapido hacia una propuesta.",
    en: "Pages designed for visitors who already want to move quickly toward a proposal.",
  },
  "Blog SEO": {
    es: "Temas de apoyo para enlazado interno, autoridad topical y busquedas de investigacion.",
    en: "Support topics for internal linking, topical authority, and research-stage searches.",
  },
};

const heroStats = computed(() =>
  locale.value === "en"
    ? [
        { value: "Owners", label: "Aircraft sales and qualified buyer positioning" },
        { value: "Operators", label: "Flight demand, coordination, and network access" },
        { value: "Buyers", label: "Private aviation access across MX, LATAM, and beyond" },
      ]
    : [
        { value: "Propietarios", label: "Venta de aeronaves y posicionamiento ante compradores calificados" },
        { value: "Operadores", label: "Demanda de vuelo, coordinacion y acceso a red" },
        { value: "Compradores", label: "Acceso a aviacion privada en MX, LATAM y mercado global" },
      ]
);

const trustSignals = computed(() =>
  locale.value === "en"
    ? [
        { title: "Mexico / LATAM", text: "Commercial reach built for regional and cross-border private aviation demand." },
        { title: "Operator-facing", text: "A stronger path for owners, operators, buyers, and charter clients." },
        { title: "Action-led", text: "Each section is designed to move the visitor into listing, quoting, or closing." },
      ]
    : [
        { title: "Mexico / LATAM", text: "Alcance comercial construido para demanda regional y transfronteriza de aviacion privada." },
        { title: "Enfoque operador", text: "Una ruta mas clara para propietarios, operadores, compradores y clientes charter." },
        { title: "Orientado a accion", text: "Cada seccion esta pensada para mover al visitante a listar, cotizar o cerrar." },
      ]
);

const content = computed(() =>
  locale.value === "en"
    ? {
        tag: "Aviation Business Platform",
        title: "Sell, Operate and Access Private Aviation with Precision",
        text:
          "Sky Group connects aircraft owners, operators and buyers across Mexico, LATAM and global markets.",
        heroAlt: "Private aviation business platform with executive aircraft visual",
        panelLabel: "Who we serve",
        primaryCta: "Sell Your Aircraft",
        secondaryCta: "Request a Flight",
        quoteCta: "Get valuation",
        goToPage: "Open capability",
        whatWeDoEyebrow: "What We Do",
        whatWeDoTitle: "Three clear commercial paths.",
        whatWeDoText: "Focus the visitor on the transaction, flight, or platform capability they actually need.",
        processEyebrow: "How It Works",
        processTitle: "A simple operating flow from demand to execution.",
        processText: "The page is structured to move users through one business path instead of overwhelming them with a catalog.",
        mainPagesEyebrow: "Platform Capabilities",
        mainPagesTitle: "Core capabilities for owners, operators, and buyers.",
        mainPagesText: "These pages work as the commercial infrastructure behind sales, flight demand, and quoting.",
        mainPagesCta: "Commercial entry points",
        featuredCategory: "Marketplace vision",
        featuredAlt: "Aviation marketplace concept for Sky Group",
        marketplaceEyebrow: "Aviation Marketplace",
        marketplaceTitle: "The next layer is marketplace infrastructure.",
        marketplaceText:
          "Sky Group is moving toward a stronger aviation marketplace model where owners, operators, and buyers can connect through one controlled environment.",
        marketplaceCta: "Join as operator",
        confidenceEyebrow: "Why It Converts Better",
        confidenceTitle: "Built to feel like a business platform, not a blog index.",
        confidenceText:
          "The goal is to create confidence, clarity, and premium positioning before the client reaches sales or operations.",
      }
    : {
        tag: "Plataforma de negocio aeronautico",
        title: "Vende, opera y accede a la aviacion privada con precision",
        text:
          "Sky Group conecta propietarios de aeronaves, operadores y compradores a traves de Mexico, LATAM y mercados globales.",
        heroAlt: "Plataforma aeronautica con visual de aeronave ejecutiva",
        panelLabel: "A quien servimos",
        primaryCta: "Vende tu aeronave",
        secondaryCta: "Solicitar vuelo",
        quoteCta: "Solicitar valuacion",
        goToPage: "Abrir capacidad",
        whatWeDoEyebrow: "Que hacemos",
        whatWeDoTitle: "Tres rutas comerciales claras.",
        whatWeDoText: "Enfoca al visitante en la transaccion, vuelo o capacidad de plataforma que realmente necesita.",
        processEyebrow: "Como funciona",
        processTitle: "Un flujo simple desde la demanda hasta la ejecucion.",
        processText: "La pagina esta estructurada para mover al usuario por una ruta de negocio en lugar de saturarlo con un catalogo.",
        mainPagesEyebrow: "Capacidades de la plataforma",
        mainPagesTitle: "Capacidades centrales para propietarios, operadores y compradores.",
        mainPagesText: "Estas paginas funcionan como la infraestructura comercial detras de ventas, demanda de vuelo y cotizacion.",
        mainPagesCta: "Entradas comerciales",
        featuredCategory: "Vision de marketplace",
        featuredAlt: "Concepto de marketplace aeronautico para Sky Group",
        marketplaceEyebrow: "Marketplace aeronautico",
        marketplaceTitle: "La siguiente capa es infraestructura de marketplace.",
        marketplaceText:
          "Sky Group puede evolucionar hacia un modelo de marketplace aeronautico donde propietarios, operadores y compradores se conecten dentro de un entorno mas controlado.",
        marketplaceCta: "Unirme como operador",
        confidenceEyebrow: "Por que convierte mejor",
        confidenceTitle: "Pensada para sentirse como plataforma de negocio, no como indice de blog.",
        confidenceText:
          "El objetivo es construir confianza, claridad y posicionamiento premium antes de que el cliente llegue a ventas u operaciones.",
      }
);

const sellAircraftPage = computed(() =>
  resolveSeoPageForLocale(seoPages.find((page) => page.slug === "sell-your-aircraft"), locale.value)
);
const charterPage = computed(() =>
  resolveSeoPageForLocale(seoPages.find((page) => page.slug === "private-jet-charter"), locale.value)
);
const sellAircraftPath = computed(() =>
  localizePath(getSeoPagePathForLocale(sellAircraftPage.value, locale.value), locale.value)
);
const charterPath = computed(() =>
  localizePath(getSeoPagePathForLocale(charterPage.value, locale.value), locale.value)
);
const quotePage = computed(() =>
  resolveSeoPageForLocale(seoPages.find((page) => page.slug === "landing"), locale.value)
);
const quotePagePath = computed(() =>
  localizePath(getSeoPagePathForLocale(quotePage.value, locale.value), locale.value)
);
const quickActions = computed(() => [
  { label: locale.value === "en" ? "List your aircraft" : "Publica tu aeronave", to: sellAircraftPath.value },
  { label: locale.value === "en" ? "Get valuation" : "Solicita valuacion", to: quotePagePath.value },
  { label: locale.value === "en" ? "Book flight" : "Reserva vuelo", to: charterPath.value },
  { label: locale.value === "en" ? "Join as operator" : "Unete como operador", to: quotePagePath.value },
]);
const whatWeDo = computed(() =>
  locale.value === "en"
    ? [
        { kicker: "Aircraft Sales", title: "Sell aircraft with stronger market positioning", text: "Connect listings with qualified buyers and a clearer transaction path.", cta: "List your aircraft", to: sellAircraftPath.value },
        { kicker: "Private Flights", title: "Request flights with faster coordination", text: "Move into verified availability, route review, and direct operational support.", cta: "Request a flight", to: charterPath.value },
        { kicker: "Aviation Marketplace", title: "Prepare for a marketplace-driven model", text: "Build the bridge between owners, operators, and buyers in one premium environment.", cta: "Join as operator", to: quotePagePath.value },
      ]
    : [
        { kicker: "Venta de aeronaves", title: "Vende aeronaves con mejor posicionamiento de mercado", text: "Conecta listados con compradores calificados y un proceso transaccional mas claro.", cta: "Publica tu aeronave", to: sellAircraftPath.value },
        { kicker: "Vuelos privados", title: "Solicita vuelos con coordinacion mas rapida", text: "Entra a disponibilidad verificada, revision de ruta y soporte operativo directo.", cta: "Solicitar vuelo", to: charterPath.value },
        { kicker: "Marketplace aeronautico", title: "Prepara el camino hacia un modelo marketplace", text: "Construye el puente entre propietarios, operadores y compradores dentro de un entorno premium.", cta: "Unete como operador", to: quotePagePath.value },
      ]
);
const businessSteps = computed(() =>
  locale.value === "en"
    ? [
        { step: "01", title: "Capture intent", text: "The visitor lands on the business path that matches sales, charter, or platform demand." },
        { step: "02", title: "Qualify the request", text: "Aircraft, route, timing, or sales goals are framed before the conversation advances." },
        { step: "03", title: "Connect operations", text: "Sky Group coordinates the right commercial or operational next step with less friction." },
        { step: "04", title: "Move to close", text: "The page supports valuation, booking, listing, or operator onboarding with visible calls to action." },
      ]
    : [
        { step: "01", title: "Captura intencion", text: "El visitante cae en la ruta de negocio correcta para ventas, charter o demanda de plataforma." },
        { step: "02", title: "Califica la solicitud", text: "Aeronave, ruta, tiempo u objetivo de venta se encuadran antes de avanzar la conversacion." },
        { step: "03", title: "Conecta operaciones", text: "Sky Group coordina el siguiente paso comercial u operativo correcto con menos friccion." },
        { step: "04", title: "Avanza al cierre", text: "La pagina apoya valuacion, reserva, listado o onboarding de operadores con CTAs visibles." },
      ]
);
const capabilityPages = computed(() =>
  ["sell-your-aircraft", "private-jet-charter", "landing"]
    .map((slug) => seoPages.find((page) => page.slug === slug))
    .map((page) => (page ? resolveSeoPageForLocale(page, locale.value) : page))
    .filter(Boolean)
);
const marketplacePills = computed(() =>
  locale.value === "en"
    ? ["Operator onboarding", "Aircraft listings", "Buyer flow", "Route demand"]
    : ["Alta de operadores", "Publicacion de aeronaves", "Flujo de compradores", "Demanda por rutas"]
);
const confidenceItems = computed(() =>
  locale.value === "en"
    ? [
        { title: "Clearer commercial hierarchy", text: "The page now explains what Sky Group does before asking the visitor to browse links." },
        { title: "Stronger conversion visibility", text: "Listing, valuation, flight request, and operator actions stay visible across the whole experience." },
        { title: "More premium perception", text: "The layout feels closer to a controlled aviation platform than a content archive." },
      ]
    : [
        { title: "Jerarquia comercial mas clara", text: "La pagina ahora explica que hace Sky Group antes de pedirle al visitante que navegue enlaces." },
        { title: "Conversion mas visible", text: "Listado, valuacion, solicitud de vuelo y accion para operadores se mantienen presentes en toda la experiencia." },
        { title: "Percepcion mas premium", text: "El layout se siente mas cercano a una plataforma aeronautica controlada que a un archivo de contenido." },
      ]
);
const marketplaceLink = "https://redskyg.com/";

const cardImages = [
  "/images/blog/Blog1.png",
  "/images/blog/Blog2.png",
  "/images/blog/Blog3.png",
  "/images/blog/About.png",
  "/images/Home/home10.png",
  "/images/Home/home11.png",
];

const resolveCardImage = (groupIndex, pageIndex) =>
  cardImages[(groupIndex + pageIndex) % cardImages.length];

const groupIcon = (title) => groupIcons[title] || "M4 18h16M7 14l3-3 3 2 4-5";
const quickLinkIcon = (label = "") => {
  const normalized = String(label).toLowerCase();
  if (normalized.includes("instagram")) return quickLinkIcons.instagram;
  if (normalized.includes("tiktok")) return quickLinkIcons.tiktok;
  if (normalized.includes("web")) return quickLinkIcons.web;
  if (normalized.includes("cotiz") || normalized.includes("quote")) return quickLinkIcons.quote;
  return quickLinkIcons.city;
};

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
});
</script>

<style scoped>
.guide-page {
  position: relative;
  overflow: hidden;
}

.guide-page::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image:
    radial-gradient(circle at 20% 20%, rgba(123, 183, 255, 0.08), transparent 24%),
    radial-gradient(circle at 80% 12%, rgba(212, 175, 55, 0.06), transparent 20%);
  z-index: 0;
}

.guide-hero,
.main-pages-section,
.featured-section,
.guide-section,
.flight-strip,
.quick-links-section {
  position: relative;
  z-index: 1;
}

.guide-hero {
  padding: 132px 0 72px;
}

.hero-backdrop {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.hero-backdrop img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: none;
  transform: scale(1.06);
}

.hero-backdrop::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(5, 13, 23, 0.68) 0%, rgba(5, 13, 23, 0.48) 34%, rgba(5, 13, 23, 0.2) 62%, rgba(5, 13, 23, 0.38) 100%),
    linear-gradient(180deg, rgba(5, 13, 23, 0.08), rgba(5, 13, 23, 0.28));
}

.hero-shell {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 1.5rem;
  align-items: end;
}

.hero-copy,
.hero-panel,
.featured-copy,
.section-banner,
.strip-card,
.guide-card {
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(8, 17, 31, 0.62);
  backdrop-filter: blur(16px);
  border-radius: 28px;
}

.hero-copy {
  padding: 2.4rem;
}

.eyebrow,
.card-tag,
.panel-label {
  display: inline-block;
  color: #d8b26e;
  text-transform: uppercase;
  letter-spacing: 0.26em;
  font-size: 0.72rem;
}

.hero-copy h1,
.featured-copy h2,
.section-banner h2,
.guide-card h3,
.strip-card h2 {
  color: white;
}

.hero-copy h1 {
  margin: 1rem 0 1.1rem;
  font-size: clamp(2.8rem, 5vw, 4.8rem);
  line-height: 0.98;
  max-width: 10ch;
}

.hero-copy p,
.featured-copy p,
.section-banner p,
.guide-card p,
.strip-card p {
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.75;
}

.hero-actions {
  display: flex;
  gap: 0.9rem;
  flex-wrap: wrap;
  margin-top: 1.8rem;
}

.btn {
  min-height: 52px;
  padding: 0.95rem 1.45rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.76rem;
}

.btn-primary {
  background: linear-gradient(135deg, #0078ff, #7bb7ff);
  color: white;
}

.btn-ghost {
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.hero-panel {
  padding: 2rem;
}

.hero-stats {
  display: grid;
  gap: 0.85rem;
  margin-top: 1rem;
}

.hero-stat {
  position: relative;
  padding: 1rem 1.05rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.04);
}

.hero-stat strong {
  display: block;
  color: white;
  font-size: 1.1rem;
  margin-bottom: 0.28rem;
}

.hero-stat span {
  color: rgba(255, 255, 255, 0.68);
  font-size: 0.84rem;
}

.blog-icon-badge {
  width: 48px;
  height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
  margin-bottom: 0.9rem;
  animation: blogIconFloat 4s ease-in-out infinite;
}

.blog-icon-badge svg {
  width: 22px;
  height: 22px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.is-stat {
  color: #8bbcff;
}

.is-strip {
  color: #d4af37;
}

.is-quick {
  color: #7be0d6;
}

.is-featured {
  color: #ffd27a;
}

.is-group {
  color: #9db6ff;
}

.flight-strip {
  padding-bottom: 1rem;
}

.main-pages-section {
  padding: 1rem 0 1.5rem;
}

.main-pages-shell {
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background:
    radial-gradient(circle at top right, rgba(123, 183, 255, 0.14), transparent 24%),
    linear-gradient(180deg, rgba(10, 20, 36, 0.92), rgba(8, 17, 31, 0.9));
  backdrop-filter: blur(18px);
  border-radius: 32px;
}

.main-pages-intro {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.35rem;
}

.main-pages-intro h2 {
  margin: 0.8rem 0 0;
  font-size: clamp(2rem, 3.5vw, 3.2rem);
  color: white;
}

.main-pages-intro p {
  color: rgba(255, 255, 255, 0.76);
  line-height: 1.75;
}

.main-pages-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.1rem;
}

.main-page-card {
  overflow: hidden;
  text-decoration: none;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(5, 13, 25, 0.82);
  transition: transform 0.32s ease, border-color 0.32s ease, box-shadow 0.32s ease;
}

.main-page-card:hover {
  transform: translateY(-10px);
  border-color: rgba(139, 188, 255, 0.4);
  box-shadow: 0 22px 44px rgba(0, 0, 0, 0.28);
}

.main-page-media {
  position: relative;
  min-height: 220px;
}

.main-page-media img {
  width: 100%;
  height: 100%;
  min-height: 220px;
  object-fit: cover;
  display: block;
  transition: transform 0.45s ease;
}

.main-page-card:hover .main-page-media img {
  transform: scale(1.06);
}

.main-page-index {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 46px;
  min-height: 46px;
  border-radius: 999px;
  background: rgba(6, 17, 32, 0.74);
  color: white;
  letter-spacing: 0.16em;
  font-size: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.main-page-body {
  padding: 1.4rem;
}

.main-page-body h3 {
  margin: 0.7rem 0 0.85rem;
  font-size: 1.9rem;
  line-height: 1.06;
  color: white;
}

.main-page-body p {
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.75;
}

.main-page-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: 1.25rem;
  color: rgba(255, 255, 255, 0.52);
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.main-page-footer strong {
  color: #8bbcff;
}

.strip-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.strip-card {
  padding: 1.35rem;
}

.strip-card span {
  display: inline-flex;
  min-width: 42px;
  min-height: 42px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: rgba(216, 178, 110, 0.12);
  color: #d8b26e;
  font-weight: 700;
  margin-bottom: 1rem;
}

.featured-section {
  padding: 1.5rem 0 2.5rem;
}

.quick-links-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 1rem;
}

.quick-links-card {
  position: relative;
  padding: 1.6rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(8, 17, 31, 0.62);
  backdrop-filter: blur(16px);
  border-radius: 28px;
}

.quick-links-card h2 {
  margin: 0.9rem 0 1rem;
}

.priority-card {
  background:
    radial-gradient(circle at top right, rgba(212, 175, 55, 0.12), transparent 28%),
    rgba(8, 17, 31, 0.62);
}

.priority-copy {
  color: rgba(255, 255, 255, 0.74);
  line-height: 1.7;
  margin-bottom: 1rem;
}

.priority-links-list {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.priority-link {
  border-color: rgba(212, 175, 55, 0.16);
}

.quick-links-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.85rem;
}

.quick-link {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  min-height: 48px;
  padding: 0.85rem 1rem;
  border-radius: 16px;
  text-decoration: none;
  color: white;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.quick-link.is-external {
  color: #d8b26e;
}

.quick-link-icon {
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: currentColor;
  flex: 0 0 auto;
}

.quick-link-icon svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.hero-routes {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.route-line,
.route-node {
  position: absolute;
}

.route-line {
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(123, 183, 255, 0), rgba(123, 183, 255, 0.75), rgba(123, 183, 255, 0));
  opacity: 0.72;
}

.route-line::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  width: 10px;
  height: 10px;
  transform: translateY(-50%);
  border-radius: 50%;
  background: #9ed0ff;
  box-shadow: 0 0 0 7px rgba(123, 183, 255, 0.12);
  animation: routePulse 3s ease-in-out infinite;
}

.route-line-one {
  width: min(24vw, 340px);
  top: 25%;
  right: 10%;
  transform: rotate(-12deg);
}

.route-line-two {
  width: min(18vw, 240px);
  bottom: 18%;
  right: 20%;
  transform: rotate(8deg);
}

.route-line-two::after {
  animation-direction: reverse;
}

.route-node {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #c8a96a;
  box-shadow: 0 0 0 10px rgba(200, 169, 106, 0.08);
}

.route-node-one {
  top: 21%;
  right: 8%;
}

.route-node-two {
  bottom: 14%;
  right: 16%;
}

.hero-cta-strip,
.final-actions,
.featured-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.hero-cta-strip {
  margin-top: 1rem;
}

.hero-chip {
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  padding: 0.6rem 0.9rem;
  border-radius: 999px;
  text-decoration: none;
  color: #e2f0ff;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 0.76rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.trust-section,
.what-we-do-section,
.process-section,
.confidence-section {
  padding: 1rem 0 1.5rem;
}

.trust-grid,
.what-we-do-grid,
.process-grid-business,
.confidence-grid {
  display: grid;
  gap: 1rem;
}

.trust-grid,
.what-we-do-grid,
.confidence-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.process-grid-business {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.trust-card,
.what-we-do-card,
.process-business-card,
.confidence-card {
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(8, 17, 31, 0.62);
  backdrop-filter: blur(16px);
  border-radius: 28px;
  padding: 1.5rem;
  transition: transform 0.32s ease, border-color 0.32s ease, box-shadow 0.32s ease;
}

.trust-card:hover,
.what-we-do-card:hover,
.process-business-card:hover,
.confidence-card:hover {
  transform: translateY(-10px);
  border-color: rgba(216, 178, 110, 0.34);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
}

.trust-card h2,
.what-we-do-card h3,
.process-business-card h3,
.confidence-card h3 {
  color: white;
}

.card-action {
  display: inline-flex;
  margin-top: 1rem;
  color: #d8b26e;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.78rem;
  font-weight: 700;
}

.process-step {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  min-height: 48px;
  border-radius: 999px;
  margin-bottom: 1rem;
  color: #c8a96a;
  border: 1px solid rgba(200, 169, 106, 0.22);
  background: rgba(200, 169, 106, 0.08);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-size: 0.76rem;
}

.confidence-shell {
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background:
    radial-gradient(circle at top right, rgba(216, 178, 110, 0.12), transparent 24%),
    linear-gradient(180deg, rgba(10, 20, 36, 0.92), rgba(8, 17, 31, 0.9));
  backdrop-filter: blur(18px);
  border-radius: 32px;
}

.featured-layout {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 1.25rem;
  align-items: stretch;
}

.featured-visual {
  position: relative;
  min-height: 380px;
  border-radius: 30px;
  overflow: hidden;
}

.featured-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.featured-overlay {
  position: absolute;
  inset: auto 0 0 0;
  padding: 1.6rem;
  background: linear-gradient(180deg, transparent, rgba(5, 13, 23, 0.52));
}

.featured-overlay span {
  color: #d8b26e;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.72rem;
}

.featured-overlay h2 {
  margin: 0.6rem 0 0;
  font-size: clamp(2rem, 3vw, 3rem);
}

.featured-copy {
  padding: 2rem;
}

.featured-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin: 1.2rem 0 1.5rem;
}

.featured-pills span {
  display: inline-flex;
  min-height: 36px;
  align-items: center;
  padding: 0.55rem 0.85rem;
  border-radius: 999px;
  background: rgba(216, 178, 110, 0.08);
  color: white;
  font-size: 0.8rem;
}

.guide-section {
  padding: 1rem 0 2rem;
  scroll-margin-top: 120px;
}

.section-banner {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 1rem;
  align-items: center;
  padding: 1.4rem 1.6rem;
  margin-bottom: 1.25rem;
}

.guide-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.1rem;
}

.guide-card {
  position: relative;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.32s ease, border-color 0.32s ease, box-shadow 0.32s ease;
}

.guide-card:hover {
  transform: translateY(-10px);
  border-color: rgba(216, 178, 110, 0.34);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
}

.hero-stat:hover .blog-icon-badge,
.strip-card:hover .blog-icon-badge,
.quick-links-card:hover .blog-icon-badge,
.featured-copy:hover .blog-icon-badge,
.section-banner:hover .blog-icon-badge {
  transform: translateY(-4px) scale(1.05);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);
}

.card-media {
  position: relative;
  min-height: 190px;
}

.card-media img {
  width: 100%;
  height: 100%;
  min-height: 190px;
  object-fit: cover;
  display: block;
  transform: scale(1.02);
  transition: transform 0.45s ease;
}

.guide-card:hover .card-media img {
  transform: scale(1.08);
}

.card-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(8, 17, 31, 0.08), rgba(8, 17, 31, 0.78));
}

.card-body {
  padding: 1.35rem;
}

.card-body h3 {
  margin: 0.7rem 0 0.8rem;
  font-size: 1.45rem;
  line-height: 1.1;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.2rem;
}

.card-footer strong {
  color: #d8b26e;
}

.card-index {
  color: rgba(255, 255, 255, 0.42);
  font-size: 0.85rem;
  letter-spacing: 0.16em;
}

.fade-up {
  opacity: 0;
  transform: translateY(26px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.fade-up.show {
  opacity: 1;
  transform: translateY(0);
}

@keyframes routePulse {
  0% {
    left: 0%;
    opacity: 0.3;
  }
  20% {
    opacity: 1;
  }
  100% {
    left: calc(100% - 10px);
    opacity: 0.3;
  }
}

@keyframes blogIconFloat {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-6px);
  }
}

@media (max-width: 992px) {
  .hero-shell,
  .main-pages-intro,
  .main-pages-grid,
  .featured-layout,
  .section-banner,
  .trust-grid,
  .what-we-do-grid,
  .process-grid-business,
  .confidence-grid {
    grid-template-columns: 1fr;
  }

  .hero-copy h1 {
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  .guide-hero {
    padding-top: 118px;
  }

  .hero-actions,
  .hero-cta-strip,
  .final-actions {
    flex-direction: column;
  }

  .btn,
  .hero-chip {
    width: 100%;
  }
}
</style>
