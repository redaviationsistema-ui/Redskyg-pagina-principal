<template>
  <div class="home-page">
    <section class="home-hero">
      <img
        class="hero-media"
        src="/images/Home/home2.jpg"
        :alt="pageContent.heroAlt"
        fetchpriority="high"
        decoding="async"
      />

      <div class="hero-overlay"></div>

      <div class="container hero-shell">
        <div class="hero-copy">
          <span class="eyebrow">{{ pageContent.heroEyebrow }}</span>
          <h1>{{ pageContent.heroTitle }}</h1>
          <p class="hero-lead">{{ pageContent.heroLead }}</p>


            <div class="external-actions hero-external-actions">
            <a
              v-for="action in pageContent.externalActions"
              :key="action.label"
              class="external-action"
              :href="action.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ action.label }}
            </a>
          </div>
          <div class="hero-actions">
            <a class="btn-primary" :href="whatsappHref" target="_blank" rel="noopener noreferrer">
              {{ pageContent.primaryCta }}
            </a>
            <a
              class="btn-secondary"
              href="https://redskyg.com/landing/es-mx/fleet"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ pageContent.secondaryCta }}
            </a>
          </div>

        

          <div class="hero-signals">
            <article v-for="signal in pageContent.heroSignals" :key="signal.label">
              <strong>{{ signal.value }}</strong>
              <span>{{ signal.label }}</span>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="section story-section">
      <div class="container story-shell">
        <div class="story-copy">
          <span class="eyebrow">{{ pageContent.storyEyebrow }}</span>
          <h2>{{ pageContent.storyTitle }}</h2>
          <div class="story-points">
            <article v-for="point in pageContent.storyPoints" :key="point">
              <span></span>
              <p>{{ point }}</p>
            </article>
          </div>
        </div>

        <div class="story-visual">
          <img src="/images/Home/home11.png" :alt="pageContent.storyAlt" loading="lazy" decoding="async" />
        </div>
      </div>
    </section>

    <section class="section process-section">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">{{ pageContent.processEyebrow }}</span>
          <h2>{{ pageContent.processTitle }}</h2>
        </div>

        <div class="process-grid">
          <article v-for="step in pageContent.processSteps" :key="step.step" class="process-step">
            <span class="process-index">{{ step.step }}</span>
            <h3>{{ step.title }}</h3>
          </article>
        </div>
      </div>
    </section>

    <section class="section routes-section">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">{{ pageContent.routesEyebrow }}</span>
          <h2>{{ pageContent.routesTitle }}</h2>
          <p>{{ pageContent.routesLead }}</p>
        </div>

        <div class="routes-layout">
          <div class="routes-group">
            <span class="routes-label">{{ pageContent.routesPrimaryLabel }}</span>
            <div class="routes-grid">
              <RouterLink
                v-for="route in featuredRoutes"
                :key="route.slug"
                class="route-card"
                :to="route.to"
              >
                <div class="route-head">
                  <em>{{ route.tag }}</em>
                  <strong>{{ route.status }}</strong>
                </div>
                <h3>{{ route.title }}</h3>
                <p class="route-aircraft">{{ route.aircraft }}</p>
                <div class="route-meta">
                  <span>{{ route.duration }}</span>
                  <span>{{ route.price }}</span>
                </div>
                <b>{{ pageContent.routeCardCta }}</b>
              </RouterLink>
            </div>
          </div>

          <div class="routes-group">
            <span class="routes-label">{{ pageContent.routesCitiesLabel }}</span>
            <div class="routes-grid compact">
              <RouterLink
                v-for="city in featuredCities"
                :key="city.slug"
                class="route-card"
                :to="city.to"
              >
                <div class="route-head">
                  <em>{{ city.tag }}</em>
                  <strong>{{ city.status }}</strong>
                </div>
                <h3>{{ city.title }}</h3>
                <p class="route-aircraft">{{ city.aircraft }}</p>
                <div class="route-meta">
                  <span>{{ city.duration }}</span>
                  <span>{{ city.price }}</span>
                </div>
                <b>{{ pageContent.routeCardCta }}</b>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section benefits-section">
      <div class="container benefits-shell">
        <div class="benefits-copy">
          <span class="eyebrow">{{ pageContent.benefitsEyebrow }}</span>
          <h2>{{ pageContent.benefitsTitle }}</h2>
          <p>{{ pageContent.benefitsLead }}</p>
        </div>

        <div class="benefits-list">
          <article v-for="benefit in pageContent.benefits" :key="benefit" class="benefit-row">
            <span></span>
            <p>{{ benefit }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section availability-section">
      <div class="container availability-shell">
        <div class="availability-visual">
          <img src="/images/Home/home10.png" :alt="pageContent.availabilityAlt" loading="lazy" decoding="async" />
        </div>

        <div class="availability-copy">
          <span class="eyebrow">{{ pageContent.availabilityEyebrow }}</span>
          <h2>{{ pageContent.availabilityTitle }}</h2>
          <p>{{ pageContent.availabilityLead }}</p>

          <div class="availability-status-list">
            <article v-for="item in pageContent.availabilityStatuses" :key="item.label" class="availability-status-card">
              <strong>{{ item.icon }} {{ item.label }}</strong>
              <span>{{ item.text }}</span>
            </article>
          </div>

          <div class="availability-offer">
            <strong>{{ pageContent.availabilityOfferTitle }}</strong>
            <p>{{ pageContent.availabilityOfferText }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section contact-section">
      <div class="container contact-shell">
        <div class="contact-copy">
          <span class="eyebrow">{{ pageContent.contactEyebrow }}</span>
          <h2>{{ pageContent.contactTitle }}</h2>
          <p>{{ pageContent.contactLead }}</p>
        </div>

        <div class="contact-grid">
          <article v-for="channel in pageContent.contactChannels" :key="channel.title" class="contact-card">
            <span>{{ channel.tag }}</span>
            <h3>{{ channel.title }}</h3>
            <p>{{ channel.text }}</p>
            <a :href="channel.href" :target="channel.external ? '_blank' : null" :rel="channel.external ? 'noopener noreferrer' : null">
              {{ channel.label }}
            </a>
          </article>
        </div>

        <div class="social-strip">
          <a
            v-for="social in socialLinks"
            :key="social.label"
            class="social-link"
            :href="social.href"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ social.label }}
          </a>
        </div>

      </div>
    </section>

    <section class="section final-cta">
      <div class="container final-shell">
        <span class="eyebrow">{{ pageContent.finalEyebrow }}</span>
        <h2>{{ pageContent.finalTitle }}</h2>
        <p>{{ pageContent.finalText }}</p>

        <div class="hero-actions final-actions">
          <a class="btn-primary" :href="whatsappHref" target="_blank" rel="noopener noreferrer">
            {{ pageContent.finalPrimaryCta }}
          </a>
          <RouterLink class="btn-secondary" :to="toLocalizedRoute('AirTaxi')">
            {{ pageContent.secondaryCta }}
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { getSeoPageBySlug, getSeoPagePathForLocale, resolveSeoPageForLocale } from "../data/seoPages";
import { localizePath, useLocale } from "../i18n";

const { locale, toLocalizedRoute } = useLocale();

const whatsappHref = computed(() =>
  locale.value === "en"
    ? "https://wa.me/525586186576?text=Hello,%20I%20need%20an%20immediate%20private%20flight%20quote%20with%20real%20availability."
    : "https://wa.me/525586186576?text=Hola,%20necesito%20una%20cotizacion%20inmediata%20con%20disponibilidad%20real."
);

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/red-aviation-corp/" },
  { label: "Instagram", href: "https://www.instagram.com/redaviationcompany/" },
  { label: "TikTok", href: "https://www.tiktok.com/@redaviationcompany" },
  { label: "Facebook", href: "https://www.facebook.com/RedAviationJets" },
];

const featuredRouteConfigs = {
  es: [
    {
      slug: "jet-privado-toluca-cancun",
      tag: "Ruta prioritaria",
      title: "Toluca -> Cancun",
      aircraft: "Light Jet",
      status: "Disponible hoy",
    },
    {
      slug: "jet-privado-cdmx-monterrey",
      tag: "Ruta ejecutiva",
      title: "CDMX -> Monterrey",
      aircraft: "Midsize Jet",
      status: "Disponible hoy",
    },
    {
      slug: "jet-privado-cdmx-cancun",
      tag: "Salida inmediata",
      title: "CDMX -> Cancun",
      aircraft: "Light Jet",
      status: "Alta disponibilidad",
    },
    {
      slug: "jet-privado-cdmx-guadalajara",
      tag: "Ruta corporativa",
      title: "CDMX -> Guadalajara",
      aircraft: "Light Jet",
      status: "Respuesta inmediata",
    },
  ],
  en: [
    {
      slug: "jet-privado-toluca-cancun",
      tag: "Priority route",
      title: "Toluca -> Cancun",
      aircraft: "Light Jet",
      status: "Available today",
    },
    {
      slug: "jet-privado-cdmx-monterrey",
      tag: "Executive route",
      title: "CDMX -> Monterrey",
      aircraft: "Midsize Jet",
      status: "Available today",
    },
    {
      slug: "jet-privado-cdmx-cancun",
      tag: "Immediate departure",
      title: "CDMX -> Cancun",
      aircraft: "Light Jet",
      status: "High availability",
    },
    {
      slug: "jet-privado-cdmx-guadalajara",
      tag: "Corporate route",
      title: "CDMX -> Guadalajara",
      aircraft: "Light Jet",
      status: "Immediate response",
    },
  ],
};

const featuredCityConfigs = {
  es: [
    {
      slug: "renta-jet-privado-toluca",
      tag: "Base operativa",
      title: "Toluca",
      aircraft: "Light y midsize jets",
      duration: "Slots activos hoy",
      status: "Alta disponibilidad",
    },
    {
      slug: "renta-jet-privado-cdmx",
      tag: "Hub principal",
      title: "CDMX",
      aircraft: "Operacion ejecutiva",
      duration: "Respuesta en minutos",
      status: "Disponible hoy",
    },
    {
      slug: "renta-jet-privado-monterrey",
      tag: "Mercado ejecutivo",
      title: "Monterrey",
      aircraft: "Midsize y super midsize",
      duration: "Salidas corporativas",
      status: "Bajo solicitud",
    },
    {
      slug: "renta-jet-privado-cancun",
      tag: "Destino premium",
      title: "Cancun",
      aircraft: "Light Jet",
      duration: "Ventana activa hoy",
      status: "Limitada",
    },
  ],
  en: [
    {
      slug: "renta-jet-privado-toluca",
      tag: "Operating base",
      title: "Toluca",
      aircraft: "Light and midsize jets",
      duration: "Active slots today",
      status: "High availability",
    },
    {
      slug: "renta-jet-privado-cdmx",
      tag: "Main hub",
      title: "CDMX",
      aircraft: "Executive operation",
      duration: "Response in minutes",
      status: "Available today",
    },
    {
      slug: "renta-jet-privado-monterrey",
      tag: "Executive market",
      title: "Monterrey",
      aircraft: "Midsize and super midsize",
      duration: "Corporate departures",
      status: "On request",
    },
    {
      slug: "renta-jet-privado-cancun",
      tag: "Premium destination",
      title: "Cancun",
      aircraft: "Light Jet",
      duration: "Active window today",
      status: "Limited",
    },
  ],
};

const buildSeoLink = (config) => {
  const page = getSeoPageBySlug(config.slug);

  if (!page) return null;

  const localizedPage = resolveSeoPageForLocale(page, locale.value);

  return {
    slug: config.slug,
    tag: config.tag,
    title: config.title || localizedPage.title,
    aircraft: config.aircraft,
    duration: config.duration,
    price: config.price,
    status: config.status,
    to: localizePath(getSeoPagePathForLocale(page, locale.value), locale.value),
  };
};

const featuredRoutes = computed(() =>
  (featuredRouteConfigs[locale.value] || featuredRouteConfigs.es).map(buildSeoLink).filter(Boolean)
);

const featuredCities = computed(() =>
  (featuredCityConfigs[locale.value] || featuredCityConfigs.es).map(buildSeoLink).filter(Boolean)
);

const content = {
  es: {
    heroAlt: "Jet privado sobre pista ejecutiva",
    heroEyebrow: "AVIACION PRIVADA ESTRATEGICA",
    heroTitle: "Vuelos privados con disponibilidad real en minutos",
    heroLead: "Operacion ejecutiva con validacion inmediata de aeronaves y horarios.",
    primaryCta: "Solicitar cotizacion inmediata",
    secondaryCta: "Ver disponibilidad",
    heroSignals: [
      { value: "<15 min", label: "respuesta objetivo para solicitudes activas" },
      { value: "24/7", label: "gestion controlada para salidas sensibles" },
      { value: "Operadores certificados", label: "aeronaves alineadas a ruta y pasajeros" },
    ],
    briefLabel: "DISPONIBILIDAD VERIFICADA",
    briefStatus: "Hoy",
    briefTitle: "Disponibilidad verificada",
    briefRoute: {
      from: "Toluca",
      to: "Monterrey",
    },
    briefAircraft: "Hawker 800XP",
    briefItems: [
      { label: "Salida", value: "Hoy 16:40" },
      { label: "Pasajeros", value: "8 pasajeros" },
      { label: "Tiempo", value: "1h 25m" },
    ],
    briefPriceLabel: "Desde",
    briefPrice: "$135,000 MXN",
    storyEyebrow: "EJECUCION DIRECTA",
    storyTitle: "No somos intermediarios. Ejecutamos decisiones.",
    storyPoints: [
      "Disponibilidad validada en minutos",
      "Acceso a operadores certificados",
      "Respuesta inmediata",
      "Control total del proceso",
    ],
    storyAlt: "Interior premium de jet privado",
    processEyebrow: "COMO FUNCIONA",
    processTitle: "Cuatro pasos para activar tu vuelo.",
    processSteps: [
      { step: "01", title: "Solicitud" },
      { step: "02", title: "Validacion" },
      { step: "03", title: "Confirmacion" },
      { step: "04", title: "Vuelo" },
    ],
    routesEyebrow: "RUTAS ACTIVAS",
    routesTitle: "Rutas diseñadas para convertir.",
    routesLead: "Visualizamos disponibilidad, tipo de aeronave y precio base para acelerar la decision.",
    routesPrimaryLabel: "Rutas principales",
    routesCitiesLabel: "Ciudades clave",
    routeCardCta: "Ver disponibilidad",
    benefitsEyebrow: "CONTROL OPERATIVO",
    benefitsTitle: "Control total en cada fase del vuelo",
    benefitsLead: "Reducimos friccion comercial y operativa para mover la salida con rapidez real.",
    benefits: [
      "Sin intermediarios",
      "Disponibilidad real",
      "Menos tiempo perdido",
      "Ejecucion inmediata",
    ],
    availabilityEyebrow: "ESTADO OPERATIVO",
    availabilityTitle: "La disponibilidad cambia segun la operacion.",
    availabilityLead: "Los slots se actualizan en tiempo real segun operacion.",
    availabilityStatuses: [
      { icon: "🟢", label: "Alta disponibilidad", text: "Ventanas activas para salida ejecutiva inmediata." },
      { icon: "🟡", label: "Limitada", text: "Aeronaves disponibles con revision de horario y ruta." },
      { icon: "🔴", label: "Bajo solicitud", text: "Salida sujeta a validacion puntual de operador." },
    ],
    availabilityOfferTitle: "Actualizacion operativa",
    availabilityOfferText: "Revisamos slots, aeronave y tripulacion antes de liberar la propuesta final.",
    availabilityAlt: "Cabina ejecutiva de aeronave privada",
    contactEyebrow: "LINEA EJECUTIVA",
    contactTitle: "Linea ejecutiva directa",
    contactLead: "Respuesta en minutos y atencion prioritaria para solicitudes activas.",
    contactChannels: [
      {
        tag: "WhatsApp",
        title: "Respuesta en minutos",
        text: "El canal mas rapido para validar disponibilidad real y recibir una cotizacion inmediata.",
        label: "+52 558-618-6576",
        href: "https://wa.me/525586186576",
        external: true,
      },
      {
        tag: "Email",
        title: "Atencion prioritaria",
        text: "Para rutas ejecutivas, seguimiento comercial y confirmacion documental.",
        label: "sales@redskyg.com",
        href: "mailto:sales@redskyg.com",
        external: false,
      },
      {
        tag: "Telefonos",
        title: "Linea ejecutiva directa",
        text: "Toluca, Mexico e internacional para clientes y operadores con respuesta directa.",
        label: "+52 722-112-6671 / +1 305-464-6394",
        href: "tel:+527221126671",
        external: false,
      },
    ],
    externalActions: [
      {
        label: "Genera tu cotizacion",
        href: "https://redskyg.com/landing/",
      },
      {
        label: "Venta ejecutiva",
        href: "https://redskyg.com/sellyouraircraft",
      },
    ],
    finalEyebrow: "ACCION INMEDIATA",
    finalTitle: "Mueve la salida antes de que cambie la disponibilidad.",
    finalText: "Si la ruta es prioritaria, el siguiente paso es bloquear una opcion real y confirmar ventana operativa.",
    finalPrimaryCta: "Bloquear disponibilidad ahora",
  },
  en: {
    heroAlt: "Private jet on an executive runway",
    heroEyebrow: "STRATEGIC PRIVATE AVIATION",
    heroTitle: "Private flights with real availability in minutes",
    heroLead: "Executive operation with immediate aircraft and schedule validation.",
    primaryCta: "Request immediate quote",
    secondaryCta: "View availability",
    heroSignals: [
      { value: "<15 min", label: "target response for active requests" },
      { value: "24/7", label: "controlled management for sensitive departures" },
      { value: "Certified operators", label: "aircraft aligned to route and passengers" },
    ],
    briefLabel: "VERIFIED AVAILABILITY",
    briefStatus: "Today",
    briefTitle: "Verified availability",
    briefRoute: {
      from: "Toluca",
      to: "Monterrey",
    },
    briefAircraft: "Hawker 800XP",
    briefItems: [
      { label: "Departure", value: "Today 16:40" },
      { label: "Passengers", value: "8 passengers" },
      { label: "Flight time", value: "1h 25m" },
    ],
    briefPriceLabel: "From",
    briefPrice: "$135,000 MXN",
    storyEyebrow: "DIRECT EXECUTION",
    storyTitle: "We are not intermediaries. We execute decisions.",
    storyPoints: [
      "Availability validated in minutes",
      "Access to certified operators",
      "Immediate response",
      "Full process control",
    ],
    storyAlt: "Premium private jet interior",
    processEyebrow: "HOW IT WORKS",
    processTitle: "Four steps to activate your flight.",
    processSteps: [
      { step: "01", title: "Request" },
      { step: "02", title: "Validation" },
      { step: "03", title: "Confirmation" },
      { step: "04", title: "Flight" },
    ],
    routesEyebrow: "ACTIVE ROUTES",
    routesTitle: "Routes designed to convert.",
    routesLead: "We surface availability, aircraft type, and base pricing to speed up the decision.",
    routesPrimaryLabel: "Main routes",
    routesCitiesLabel: "Key cities",
    routeCardCta: "View availability",
    benefitsEyebrow: "OPERATIONAL CONTROL",
    benefitsTitle: "Full control in every phase of the flight",
    benefitsLead: "We remove commercial and operational friction to move the departure faster.",
    benefits: [
      "No intermediaries",
      "Real availability",
      "Less wasted time",
      "Immediate execution",
    ],
    availabilityEyebrow: "OPERATING STATUS",
    availabilityTitle: "Availability shifts with live operations.",
    availabilityLead: "Slots update in real time based on active operation.",
    availabilityStatuses: [
      { icon: "🟢", label: "High availability", text: "Active windows for immediate executive departures." },
      { icon: "🟡", label: "Limited", text: "Aircraft available with route and schedule review." },
      { icon: "🔴", label: "On request", text: "Departure subject to direct operator validation." },
    ],
    availabilityOfferTitle: "Operational update",
    availabilityOfferText: "We review slots, aircraft, and crew before releasing the final proposal.",
    availabilityAlt: "Executive cabin of a private aircraft",
    contactEyebrow: "EXECUTIVE LINE",
    contactTitle: "Direct executive line",
    contactLead: "Response in minutes with priority attention for active requests.",
    contactChannels: [
      {
        tag: "WhatsApp",
        title: "Response in minutes",
        text: "The fastest channel to validate real availability and receive an immediate quote.",
        label: "+52 558-618-6576",
        href: "https://wa.me/525586186576",
        external: true,
      },
      {
        tag: "Email",
        title: "Priority attention",
        text: "For executive routes, commercial follow-up, and document confirmation.",
        label: "sales@redskyg.com",
        href: "mailto:sales@redskyg.com",
        external: false,
      },
      {
        tag: "Phones",
        title: "Direct executive line",
        text: "Toluca, Mexico, and international access for clients and operators with direct response.",
        label: "+52 722-112-6671 / +1 305-464-6394",
        href: "tel:+527221126671",
        external: false,
      },
    ],
    externalActions: [
      {
        label: "Generate your quote",
        href: "https://redskyg.com/landing/",
      },
      {
        label: "Executive sales",
        href: "https://redskyg.com/sellyouraircraft",
      },
    ],
    finalEyebrow: "IMMEDIATE ACTION",
    finalTitle: "Move the departure before availability shifts.",
    finalText: "If the route is important, the next step is to lock a real option and confirm the operating window.",
    finalPrimaryCta: "Lock availability now",
  },
};

const pageContent = computed(() => content[locale.value] ?? content.es);
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap");

.home-page {
  color: #f7f1e3;
  background:
    radial-gradient(circle at top, rgba(193, 154, 72, 0.08), transparent 30%),
    linear-gradient(180deg, #07121e 0%, #091726 42%, #091726 100%);
}

.home-page :is(h1, h2, h3) {
  font-family: "Cormorant Garamond", Georgia, serif;
  font-weight: 600;
  color: #f8f3ea;
  letter-spacing: 0.01em;
}

.home-page :is(p, li, span, strong, a, em, b) {
  font-family: "Manrope", "Segoe UI", sans-serif;
}

.home-hero {
  position: relative;
  min-height: 100svh;
  overflow: hidden;
  display: flex;
  align-items: stretch;
}

.hero-media {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.05);
  filter: saturate(0.76) brightness(0.34) contrast(1.06);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(3, 6, 10, 0.94) 0%, rgba(3, 6, 10, 0.8) 42%, rgba(3, 6, 10, 0.64) 100%),
    radial-gradient(circle at 78% 20%, rgba(193, 154, 72, 0.14), transparent 24%);
}

.hero-shell {
  position: relative;
  z-index: 1;
  width: 100%;
  padding-top: 8.5rem;
  padding-bottom: 5.5rem;
  display: flex;
  align-items: end;
}

.hero-copy {
  max-width: 760px;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.2rem;
  color: #d7b074;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.26em;
  text-transform: uppercase;
}

.eyebrow::before {
  content: "";
  width: 52px;
  height: 1px;
  background: linear-gradient(90deg, rgba(215, 176, 116, 0.18), rgba(215, 176, 116, 0.92));
}

.hero-copy h1 {
  margin: 0;
  max-width: 9ch;
  font-size: clamp(3.4rem, 7vw, 6.2rem);
  line-height: 0.92;
}

.hero-lead,
.story-points p,
.benefits-copy p,
.benefit-row p,
.availability-copy p,
.availability-status-card span,
.contact-copy p,
.contact-card p,
.final-shell p {
  color: rgba(248, 243, 234, 0.78);
  line-height: 1.8;
}

.hero-lead {
  max-width: 620px;
  margin: 1.5rem 0 0;
  font-size: 1.06rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary,
.brief-cta {
  min-height: 56px;
  padding: 0.95rem 1.45rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.78rem;
  font-weight: 700;
  transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
}

.btn-primary,
.brief-cta,
.route-card b {
  color: #0a0b0d;
  background: linear-gradient(135deg, #d7b074, #f4d79f);
  box-shadow: 0 18px 40px rgba(164, 120, 51, 0.25);
}

.btn-secondary {
  color: #f8f3ea;
  border: 1px solid rgba(248, 243, 234, 0.24);
  background: rgba(255, 255, 255, 0.03);
}

.btn-primary:hover,
.btn-secondary:hover,
.brief-cta:hover,
.route-card:hover b,
.social-link:hover {
  transform: translateY(-2px);
}

.btn-secondary:hover {
  border-color: rgba(215, 176, 116, 0.55);
  background: rgba(215, 176, 116, 0.07);
}

.hero-signals {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 2.7rem;
}

.hero-signals article {
  padding-top: 1rem;
  border-top: 1px solid rgba(248, 243, 234, 0.16);
}

.hero-signals strong {
  display: block;
  color: #f8f3ea;
  font-size: 1.08rem;
  font-weight: 700;
}

.hero-signals span {
  display: block;
  margin-top: 0.55rem;
  color: rgba(248, 243, 234, 0.66);
  font-size: 0.86rem;
  line-height: 1.6;
}

.hero-brief,
.process-step,
.availability-offer,
.final-shell,
.contact-card,
.availability-status-card,
.route-card {
  border: 1px solid rgba(248, 243, 234, 0.1);
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(16px);
}

.hero-brief {
  padding: 2rem;
  border-radius: 28px;
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.34);
}

.brief-topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.brief-label,
.process-index {
  color: #d7b074;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.brief-status {
  color: #9ce3b4;
  font-size: 0.82rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.hero-brief h2 {
  margin: 0.9rem 0 1.5rem;
  font-size: clamp(1.8rem, 3.4vw, 2.6rem);
  line-height: 0.95;
}

.brief-route {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 1rem 0;
  border-top: 1px solid rgba(248, 243, 234, 0.12);
  border-bottom: 1px solid rgba(248, 243, 234, 0.12);
  color: #f8f3ea;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.78rem;
}

.brief-route i {
  position: relative;
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(215, 176, 116, 0.28), rgba(215, 176, 116, 0.92));
}

.brief-route i::after {
  content: "";
  position: absolute;
  right: 0;
  top: 50%;
  width: 9px;
  height: 9px;
  border-top: 1px solid #d7b074;
  border-right: 1px solid #d7b074;
  transform: translateY(-50%) rotate(45deg);
}

.brief-aircraft {
  margin-top: 1rem;
  color: #f3d39b;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.brief-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1.4rem;
}

.brief-grid article {
  padding: 1rem;
  border-radius: 18px;
  background: rgba(6, 14, 24, 0.55);
}

.brief-grid span,
.brief-pricing span {
  display: block;
  color: rgba(248, 243, 234, 0.58);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.brief-grid strong,
.brief-pricing strong {
  display: block;
  margin-top: 0.45rem;
  color: #f8f3ea;
  font-size: 1rem;
}

.brief-pricing {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.6rem;
}

.brief-pricing strong {
  font-size: 1.5rem;
  color: #f3d39b;
}

.section {
  position: relative;
  padding: 4.5rem 0;
}

.section-head {
  max-width: 760px;
  margin-bottom: 2rem;
}

.section-head h2,
.story-copy h2,
.benefits-copy h2,
.availability-copy h2,
.contact-copy h2,
.final-shell h2 {
  margin: 0;
  font-size: clamp(2.4rem, 4vw, 4rem);
  line-height: 0.96;
}

.section-head p {
  margin-top: 1rem;
  color: rgba(248, 243, 234, 0.74);
  line-height: 1.75;
}

.story-section {
  border-top: 1px solid rgba(248, 243, 234, 0.07);
}

.story-shell,
.benefits-shell,
.availability-shell {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 3rem;
  align-items: center;
}

.story-points,
.benefits-list {
  display: grid;
  gap: 1rem;
  margin-top: 1.8rem;
}

.story-points article,
.benefit-row {
  display: grid;
  grid-template-columns: 14px 1fr;
  gap: 1rem;
  align-items: start;
  padding: 1.1rem 1.2rem;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(248, 243, 234, 0.08);
}

.story-points span,
.benefit-row span {
  width: 14px;
  height: 14px;
  margin-top: 0.4rem;
  border-radius: 999px;
  background: radial-gradient(circle, #f4d79f 0%, #d7b074 62%, rgba(215, 176, 116, 0.32) 100%);
  box-shadow: 0 0 18px rgba(215, 176, 116, 0.46);
}

.story-points p,
.benefit-row p {
  margin: 0;
}

.story-visual,
.availability-visual {
  min-height: 500px;
  overflow: hidden;
  border-radius: 34px;
  background: #111318;
  box-shadow: 0 28px 70px rgba(0, 0, 0, 0.22);
}

.story-visual img,
.availability-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.84) brightness(0.76);
}

.process-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.2rem;
}

.process-grid::before {
  content: "";
  position: absolute;
  top: 26px;
  left: 5%;
  right: 5%;
  height: 1px;
  background: linear-gradient(90deg, rgba(215, 176, 116, 0.16), rgba(215, 176, 116, 0.92), rgba(215, 176, 116, 0.16));
}

.process-step {
  position: relative;
  min-height: 150px;
  padding: 1.6rem;
  border-radius: 24px;
}

.process-step::before {
  content: "";
  position: absolute;
  top: 21px;
  left: 1.6rem;
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: #d7b074;
  box-shadow: 0 0 18px rgba(215, 176, 116, 0.48);
}

.process-step h3 {
  margin: 2rem 0 0;
  font-size: 1.65rem;
  line-height: 1;
}

.routes-layout {
  display: grid;
  gap: 2.4rem;
}

.routes-group {
  display: grid;
  gap: 1rem;
}

.routes-label {
  color: #d7b074;
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.routes-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}

.route-card {
  min-height: 235px;
  padding: 1.35rem;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-decoration: none;
  background:
    radial-gradient(circle at top right, rgba(215, 176, 116, 0.06), transparent 34%),
    rgba(9, 23, 38, 0.94);
  overflow: hidden;
  transition: transform 0.28s ease, border-color 0.28s ease, background 0.28s ease, box-shadow 0.28s ease;
}

.route-card:hover,
.contact-card:hover {
  transform: translateY(-4px);
  border-color: rgba(215, 176, 116, 0.4);
  box-shadow: 0 0 0 1px rgba(215, 176, 116, 0.18), 0 22px 56px rgba(4, 10, 18, 0.34), 0 0 28px rgba(215, 176, 116, 0.14);
}

.route-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
}

.route-card em,
.route-card b {
  font-style: normal;
}

.route-card em {
  color: #d7b074;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.route-head strong {
  color: #9ce3b4;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.route-card h3 {
  margin: 0;
  color: #f8f3ea;
  font-size: 1.5rem;
  line-height: 1.06;
}

.route-aircraft {
  margin: 0;
  color: rgba(248, 243, 234, 0.72);
  font-size: 0.96rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.route-meta {
  display: grid;
  gap: 0.55rem;
  margin-top: auto;
}

.route-meta span {
  color: #f8f3ea;
  font-size: 0.92rem;
}

.route-meta span:last-child {
  color: #f3d39b;
  font-size: 1.04rem;
  font-weight: 700;
}

.route-card b {
  min-height: 44px;
  padding: 0.8rem 1rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.availability-copy {
  max-width: 580px;
}

.availability-status-list {
  display: grid;
  gap: 1rem;
  margin-top: 1.8rem;
}

.availability-status-card {
  padding: 1.2rem 1.3rem;
  border-radius: 22px;
}

.availability-status-card strong {
  display: block;
  color: #f8f3ea;
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.availability-status-card span {
  display: block;
  margin-top: 0.6rem;
}

.availability-offer {
  margin-top: 1.4rem;
  padding: 1.5rem;
  border-radius: 24px;
}

.availability-offer strong {
  display: block;
  margin-bottom: 0.8rem;
  color: #f8f3ea;
  font-size: 0.92rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.availability-offer p {
  margin: 0;
}

.contact-shell {
  padding: 2.4rem;
  border-radius: 34px;
  border: 1px solid rgba(248, 243, 234, 0.08);
  background:
    radial-gradient(circle at top right, rgba(215, 176, 116, 0.05), transparent 28%),
    rgba(9, 23, 38, 0.94);
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.contact-card {
  padding: 1.5rem;
  border-radius: 24px;
  transition: transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease;
}

.contact-card span {
  color: #d7b074;
  font-size: 0.74rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.contact-card h3 {
  margin: 0.85rem 0 0.7rem;
  font-size: 1.6rem;
  line-height: 1;
}

.contact-card a {
  display: inline-block;
  margin-top: 1rem;
  color: #f3d39b;
  text-decoration: none;
  font-weight: 700;
}

.social-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  margin-top: 1.5rem;
}

.external-actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1.25rem;
}

.hero-external-actions {
  max-width: 100%;
  margin-top: 1rem;
}

.external-action {
  min-height: 58px;
  padding: 1rem 1.2rem;
  border-radius: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #0a0b0d;
  text-decoration: none;
  background: linear-gradient(135deg, #d7b074, #f4d79f);
  box-shadow: 0 18px 40px rgba(164, 120, 51, 0.18);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.76rem;
  font-weight: 800;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.external-action:hover {
  transform: translateY(-2px);
  box-shadow: 0 22px 48px rgba(164, 120, 51, 0.24);
}

.social-link {
  min-height: 46px;
  padding: 0.8rem 1rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #f8f3ea;
  text-decoration: none;
  border: 1px solid rgba(248, 243, 234, 0.12);
  background: rgba(9, 23, 38, 0.88);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.75rem;
  transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
}

.social-link:hover {
  border-color: rgba(215, 176, 116, 0.48);
  background: rgba(215, 176, 116, 0.08);
}

.final-cta {
  padding-top: 1rem;
}

.final-shell {
  padding: 3rem;
  border-radius: 36px;
  text-align: center;
  background:
    radial-gradient(circle at top, rgba(215, 176, 116, 0.12), transparent 35%),
    rgba(255, 255, 255, 0.035);
}

.final-shell h2 {
  max-width: 12ch;
  margin: 0 auto;
}

.final-shell p {
  max-width: 760px;
  margin: 1rem auto 0;
}

.final-actions {
  justify-content: center;
}

@media (max-width: 1100px) {
  .hero-shell,
  .story-shell,
  .benefits-shell,
  .availability-shell {
    grid-template-columns: 1fr;
  }

  .routes-grid,
  .contact-grid,
  .process-grid {
    grid-template-columns: 1fr 1fr;
  }

  .hero-copy h1 {
    max-width: 10ch;
  }
}

@media (max-width: 900px) {
  .hero-signals,
  .brief-grid,
  .routes-grid,
  .contact-grid,
  .process-grid,
  .external-actions {
    grid-template-columns: 1fr;
  }

  .process-grid::before {
    display: none;
  }

  .home-hero {
    min-height: auto;
  }

  .hero-shell {
    padding-top: 7.5rem;
  }

  .story-visual,
  .availability-visual {
    min-height: 360px;
  }

  .brief-pricing {
    flex-direction: column;
    align-items: flex-start;
  }

  .final-shell {
    text-align: left;
  }

  .final-shell h2,
  .final-shell p {
    margin-left: 0;
    margin-right: 0;
  }

  .final-actions {
    justify-content: flex-start;
  }
}

@media (max-width: 640px) {
  .section {
    padding: 3.5rem 0;
  }

  .container {
    padding: 0 1.25rem;
  }

  .hero-actions,
  .final-actions {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary,
  .brief-cta {
    width: 100%;
  }

  .hero-brief,
  .process-step,
  .contact-shell,
  .contact-card,
  .availability-offer,
  .availability-status-card,
  .final-shell,
  .route-card {
    padding: 1.35rem;
  }

  .story-visual,
  .availability-visual {
    min-height: 280px;
    border-radius: 24px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .btn-primary,
  .btn-secondary,
  .brief-cta,
  .route-card,
  .contact-card,
  .social-link {
    transition: none;
  }
}
</style>
