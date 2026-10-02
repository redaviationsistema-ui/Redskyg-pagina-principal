<template>
  <section class="aircraft-page">
    <section v-if="detailRegistration" class="aircraft-detail">
      <div class="container aircraft-detail__inner reveal">
        <RouterLink class="aircraft-detail__back" :to="toLocalizedRoute('AircraftSales')">
          {{ copy.detailBack }}
        </RouterLink>

        <div v-if="loading" class="catalog-message">
          {{ copy.loading }}
        </div>

        <div v-else-if="loadError" class="catalog-message catalog-message--error">
          {{ copy.loadError }}
        </div>

        <div v-else-if="detailAircraft" class="aircraft-detail__grid">
          <div class="aircraft-detail__media">
            <img v-if="detailImage" :src="detailImage" :alt="detailTitle" />
            <div v-else class="aircraft-detail__no-image">{{ copy.noImage }}</div>
          </div>

          <div class="aircraft-detail__copy">
            <span class="aircraft-eyebrow">{{ copy.detailEyebrow }}</span>
            <h1>{{ detailHeading }}</h1>
            <p>{{ detailDescription }}</p>

            <dl class="aircraft-detail__specs">
              <div v-if="detailAircraft.registration">
                <dt>{{ copy.registration }}</dt>
                <dd>{{ detailAircraft.registration }}</dd>
              </div>
              <div v-if="detailAircraft.brand">
                <dt>{{ locale === 'en' ? 'Manufacturer' : 'Fabricante' }}</dt>
                <dd>{{ detailAircraft.brand }}</dd>
              </div>
              <div v-if="detailAircraft.model">
                <dt>{{ locale === 'en' ? 'Model' : 'Modelo' }}</dt>
                <dd>{{ detailAircraft.model }}</dd>
              </div>
              <div>
                <dt>{{ copy.statusLabel }}</dt>
                <dd>{{ detailAircraft.status === "ready" ? copy.status.ready : copy.status.service }}</dd>
              </div>
              <div>
                <dt>{{ locale === 'en' ? 'Price' : 'Precio' }}</dt>
                <dd>{{ detailAircraft.displayPrice }}</dd>
              </div>
            </dl>

            <div class="aircraft-detail__actions">
              <button class="aircraft-btn aircraft-btn--gold" type="button" @click="openRequest(detailAircraft)">
                {{ copy.cardCta }}
                <span aria-hidden="true">→</span>
              </button>
              <button
                v-if="detailAircraft.images.length"
                class="aircraft-btn aircraft-btn--ghost"
                type="button"
                @click="openGallery(detailAircraft)"
              >
                {{ copy.galleryCta }}
              </button>
            </div>
          </div>
        </div>

        <div v-else class="catalog-message catalog-message--error">
          {{ copy.detailNotFound }}
        </div>
      </div>
    </section>

    <section v-else class="aircraft-hero">
      <div class="aircraft-hero__shade"></div>
      <div class="container aircraft-hero__inner">
        <div class="aircraft-hero__copy reveal">
          <span class="aircraft-eyebrow">{{ copy.heroEyebrow }}</span>
          <h1>{{ copy.heroTitle }}</h1>
          <p>{{ copy.heroText }}</p>
          <a class="aircraft-btn aircraft-btn--gold" href="#aircraft-catalog">
            {{ copy.heroCta }}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>

    <section v-if="!detailRegistration" id="aircraft-catalog" class="aircraft-catalog">
      <div class="container">
        <form class="aircraft-filters reveal" @submit.prevent="filtersOpen = false">
          <div class="aircraft-filters__bar">
            <button class="aircraft-filters__toggle" type="button" @click="filtersOpen = !filtersOpen">
              {{ copy.filters.toggle }}
              <span aria-hidden="true">{{ filtersOpen ? "−" : "+" }}</span>
            </button>
            <strong>{{ resultsLabel }}</strong>
          </div>

          <div class="aircraft-filters__panel" :class="{ 'aircraft-filters__panel--open': filtersOpen }">
            <label>
              <span>{{ copy.filters.brand }}</span>
              <select v-model="brandFilter">
                <option value="all">{{ copy.filters.all }}</option>
                <option v-for="brand in aircraftBrands" :key="brand" :value="brand">{{ brand }}</option>
              </select>
            </label>

            <label>
              <span>{{ copy.filters.type }}</span>
              <select v-model="typeFilter">
                <option value="all">{{ copy.filters.all }}</option>
                <option v-for="type in aircraftTypes" :key="type" :value="type">{{ type }}</option>
              </select>
            </label>

            <label>
              <span>{{ copy.filters.status }}</span>
              <select v-model="statusFilter">
                <option value="all">{{ copy.filters.all }}</option>
                <option value="ready">{{ copy.status.ready }}</option>
                <option value="service">{{ copy.status.service }}</option>
              </select>
            </label>

            <label>
              <span>{{ copy.filters.location }}</span>
              <select v-model="locationFilter">
                <option value="all">{{ copy.filters.all }}</option>
                <option v-for="location in aircraftLocations" :key="location" :value="location">{{ location }}</option>
              </select>
            </label>

            <label class="aircraft-search">
              <span>{{ copy.filters.search }}</span>
              <input v-model.trim="searchTerm" type="search" :placeholder="copy.filters.placeholder" />
            </label>

            <div class="aircraft-filters__actions">
              <button class="aircraft-btn aircraft-btn--gold" type="submit">{{ copy.filters.apply }}</button>
              <button class="aircraft-btn aircraft-btn--ghost" type="button" @click="clearFilters">{{ copy.filters.clear }}</button>
            </div>
          </div>
        </form>

        <div v-if="loading" class="catalog-message reveal">
          {{ copy.loading }}
        </div>

        <div v-else-if="loadError" class="catalog-message catalog-message--error reveal">
          {{ copy.loadError }}
        </div>

        <template v-else>
          <AircraftSection
            v-if="readyAircraft.length"
            :title="copy.readyTitle"
            :text="copy.readyText"
            :aircraft="readyAircraft"
            :count-label="sectionCountLabel(readyAircraft.length)"
          :status-label="copy.status.ready"
          status="ready"
          :button-label="copy.cardCta"
          :gallery-label="copy.galleryCta"
          @request="openRequest"
          @gallery="openGallery"
        />

          <AircraftSection
            v-if="serviceAircraft.length"
            :title="copy.serviceTitle"
            :text="copy.serviceText"
            :aircraft="serviceAircraft"
            :count-label="sectionCountLabel(serviceAircraft.length)"
          :status-label="copy.status.service"
          status="service"
          :button-label="copy.cardCta"
          :gallery-label="copy.galleryCta"
          @request="openRequest"
          @gallery="openGallery"
        />

          <p v-if="!filteredAircraft.length" class="aircraft-empty reveal">{{ copy.empty }}</p>
        </template>
      </div>
    </section>

    <section class="section aircraft-final">
      <div class="container aircraft-final__shell reveal">
        <div>
          <span class="aircraft-eyebrow">{{ copy.finalEyebrow }}</span>
          <h2>{{ copy.finalTitle }}</h2>
          <p>{{ copy.finalText }}</p>
        </div>
        <RouterLink class="aircraft-btn aircraft-btn--gold" :to="toLocalizedRoute('Contact')">
          {{ copy.finalCta }}
          <span aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </section>

    <section class="section aircraft-advisory">
      <div class="container aircraft-advisory__inner reveal">
        <span class="aircraft-eyebrow">{{ copy.advisoryEyebrow }}</span>
        <h2>{{ copy.advisoryTitle }}</h2>
        <p>{{ copy.advisoryText }}</p>
        <div class="aircraft-advisory__actions">
          <RouterLink class="aircraft-btn aircraft-btn--gold" :to="toLocalizedRoute('Contact')">
            {{ copy.advisoryPrimary }}
          </RouterLink>
          <a class="aircraft-btn aircraft-btn--ghost" href="https://wa.me/5217225785991" target="_blank" rel="noopener">
            {{ copy.advisorySecondary }}
          </a>
        </div>
      </div>
    </section>

    <div v-if="galleryOpen && galleryAircraft" class="aircraft-gallery-modal" role="dialog" aria-modal="true" :aria-label="copy.galleryTitle">
      <button class="aircraft-gallery-modal__backdrop" type="button" :aria-label="copy.close" @click="closeGallery"></button>
      <div ref="galleryContentRef" class="aircraft-gallery-modal__content">
        <button class="aircraft-gallery-modal__close" type="button" :aria-label="copy.close" @click="closeGallery">×</button>

        <div class="aircraft-gallery-modal__header">
          <div>
            <span>{{ copy.galleryTitle }}</span>
            <h2>{{ galleryAircraft.name }}</h2>
            <p>{{ copy.registration }}: {{ galleryAircraft.registration }}</p>
          </div>
          <strong>{{ activeImageIndex + 1 }} / {{ galleryAircraft.images.length }}</strong>
        </div>

        <div class="aircraft-gallery-modal__main">
          <button v-if="galleryAircraft.images.length > 1" class="gallery-arrow gallery-arrow--left" type="button" :aria-label="copy.previousImage" @click="previousImage">←</button>
          <img :src="activeGalleryImage?.resolved_url" :alt="galleryAircraft.name" />
          <button v-if="galleryAircraft.images.length > 1" class="gallery-arrow gallery-arrow--right" type="button" :aria-label="copy.nextImage" @click="nextImage">→</button>
        </div>

        <div v-if="galleryAircraft.images.length > 1" class="aircraft-gallery-modal__thumbnails">
          <button
            v-for="(image, index) in galleryAircraft.images"
            :key="image.id"
            type="button"
            class="gallery-thumbnail"
            :class="{ 'gallery-thumbnail--active': index === activeImageIndex }"
            @click="activeImageIndex = index"
          >
            <img :src="image.resolved_url" :alt="`${galleryAircraft.name} ${index + 1}`" />
          </button>
        </div>

        <button class="aircraft-gallery-modal__inquiry" type="button" @click="requestFromGallery">
          {{ copy.cardCta }}
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>

    <div v-if="selectedAircraft" class="request-modal" role="dialog" aria-modal="true" :aria-label="copy.modalTitle">
      <button class="request-modal__backdrop" type="button" :aria-label="copy.close" @click="closeRequest"></button>
      <div ref="requestPanelRef" class="request-modal__panel">
        <button class="request-modal__close" type="button" :aria-label="copy.close" @click="closeRequest">×</button>
        <span class="aircraft-eyebrow">{{ copy.modalTitle }}</span>

        <div class="request-summary">
          <img v-if="selectedAircraft.main_image" :src="selectedAircraft.main_image" :alt="selectedAircraft.name" />
          <div v-else class="request-summary__no-image">
            <span>{{ copy.noImage }}</span>
          </div>
          <div>
            <h3>{{ selectedAircraft.name }}</h3>
            <p>{{ copy.registration }}: {{ selectedAircraft.registration }}</p>
            <p>{{ copy.statusLabel }}: {{ selectedAircraft.status === "ready" ? copy.status.ready : copy.status.service }}</p>
            <strong>{{ selectedAircraft.displayPrice }}</strong>
          </div>
        </div>

        <form class="request-form" @submit.prevent="submitRequest">
          <label>
            <span>{{ copy.form.name }}</span>
            <input v-model="requestForm.name" required type="text" :placeholder="copy.form.namePlaceholder" />
          </label>
          <label>
            <span>{{ copy.form.email }}</span>
            <input v-model="requestForm.email" required type="email" placeholder="" />
          </label>
          <label>
            <span>{{ copy.form.phone }}</span>
            <input v-model="requestForm.phone" required type="tel" placeholder="" />
          </label>
          <label>
            <span>{{ copy.form.message }}</span>
            <textarea v-model="requestForm.message" rows="5" :placeholder="copy.form.messagePlaceholder"></textarea>
          </label>
          <button class="aircraft-btn aircraft-btn--gold request-form__submit" type="submit" :disabled="submitting">
            {{ inquirySuccess ? copy.form.sentButton : submitting ? copy.form.sending : copy.form.submit }}
            <span aria-hidden="true">→</span>
          </button>

          <div v-if="inquirySuccess" class="request-form__success">
            <strong>{{ copy.form.successTitle }}</strong>
            <p>{{ copy.form.successText }}</p>
          </div>
          <p v-if="inquiryError" class="request-form__error">{{ inquiryError }}</p>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, defineComponent, h, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useLocale } from "../i18n";
import {
  createAircraftInquiry,
  listPublicAircraft,
  sendAircraftInquiryEmail,
} from "../features/aircraft-sales/services/aircraftSales.service";
import {
  buildAircraftSeo,
  cleanText,
  normalizeRegistration,
} from "../features/aircraft-sales/aircraftSeo";

const { locale, toLocalizedRoute } = useLocale();
const route = useRoute();

const statusFilter = ref("all");
const brandFilter = ref("all");
const typeFilter = ref("all");
const locationFilter = ref("all");
const searchTerm = ref("");
const filtersOpen = ref(false);
const selectedAircraft = ref(null);
const galleryAircraft = ref(null);
const galleryContentRef = ref(null);
const requestPanelRef = ref(null);
const galleryOpen = ref(false);
const activeImageIndex = ref(0);
const aircraft = ref([]);
const loading = ref(true);
const loadError = ref(null);
const submitting = ref(false);
const inquirySuccess = ref("");
const inquiryError = ref("");
const requestForm = reactive({
  name: "",
  email: "",
  phone: "",
  message: "",
});
let inquiryCloseTimer;

const copy = computed(() =>
  locale.value === "en"
    ? {
        heroEyebrow: "Executive Aircraft Sales and Acquisition",
        heroTitle: "Aircraft for Sale",
        heroText: "Explore our portfolio of executive aircraft for sale, available in Mexico and the United States. Private jets, turboprops, and selected aircraft for acquisition.",
        heroCta: "View Available Aircraft",
        filters: {
          toggle: "Filter Aircraft",
          brand: "Brand",
          status: "Status",
          type: "Aircraft Type",
          location: "Location",
          search: "Search",
          all: "All",
          placeholder: "Name, model or registration...",
          apply: "Apply Filters",
          clear: "Clear",
          found: "aircraft found",
          foundSingular: "aircraft found",
        },
        status: { ready: "Ready to Operate", service: "Out of Service" },
        readyTitle: "Ready to Operate",
        readyText: "Aircraft available and in operational condition, ready to integrate into your operation.",
        serviceTitle: "Out of Service",
        serviceText: "Aircraft currently out of service or in maintenance. They may represent acquisition opportunities depending on condition and project.",
        cardCta: "Request Information",
        galleryCta: "View Photos",
        galleryTitle: "Aircraft Gallery",
        photoSingular: "photo",
        photoPlural: "photos",
        nextImage: "Next image",
        previousImage: "Previous image",
        registration: "Registration",
        statusLabel: "Status",
        noImage: "No image available",
        loading: "Loading aircraft...",
        loadError: "The catalog could not be loaded.",
        modalTitle: "Request Information",
        close: "Close",
        detailBack: "Back to aircraft",
        detailEyebrow: "Aircraft for Sale",
        detailNotFound: "This aircraft is not currently available.",
        empty: "No aircraft match the selected filters.",
        finalEyebrow: "Specialized Advisory",
        finalTitle: "Looking for a specific aircraft?",
        finalText: "Our team can help you find the ideal aircraft according to your operational and budget requirements.",
        finalCta: "Speak with an Advisor",
        advisoryEyebrow: "Aircraft Acquisition",
        advisoryTitle: "Integrated aircraft purchase advisory.",
        advisoryText: "We accompany you throughout the acquisition process with a personalized, confidential, and professional approach.",
        advisoryPrimary: "Request Advisory",
        advisorySecondary: "Chat on WhatsApp",
        form: {
          name: "Name *",
          namePlaceholder: "Full name",
          email: "Email *",
          phone: "Phone number *",
          message: "Message",
          messagePlaceholder: "If you have an offer or specific requirement, share it here...",
          submit: "Send Request",
          sentButton: "Request Sent",
          sending: "Sending...",
          successTitle: "Request sent successfully.",
          successText:
            "Your request was registered correctly. An advisor will contact you shortly. Thank you for choosing Sky Group Aviation.",
          invalidEmail: "Enter a valid email address.",
          required: "Name and email are required.",
          registerError: "The request could not be registered. Please try again.",
          mailError: "Your request was registered, but we could not confirm the notification was sent.",
        },
      }
    : {
        heroEyebrow: "Compra y venta de aeronaves ejecutivas",
        heroTitle: "Aeronaves en Venta",
        heroText: "Explore nuestro portafolio de aeronaves ejecutivas en venta, disponibles en México y Estados Unidos. Jets privados, turbohélices y aeronaves seleccionadas para adquisición.",
        heroCta: "Ver aeronaves disponibles",
        filters: {
          toggle: "Filtrar aeronaves",
          brand: "Marca",
          status: "Estado",
          type: "Tipo de aeronave",
          location: "Ubicación",
          search: "Buscar",
          all: "Todos",
          placeholder: "Nombre, modelo o matrícula...",
          apply: "Aplicar filtros",
          clear: "Limpiar",
          found: "aeronaves encontradas",
          foundSingular: "aeronave encontrada",
        },
        status: { ready: "Lista para operar", service: "Fuera de servicio" },
        readyTitle: "Listas para operar",
        readyText: "Aeronaves disponibles y en condición operativa, listas para integrarse a su operación.",
        serviceTitle: "Fuera de servicio",
        serviceText: "Aeronaves que actualmente se encuentran fuera de servicio o en proceso de mantenimiento. Pueden representar oportunidades de adquisición según condición y proyecto.",
        cardCta: "Solicitar información",
        galleryCta: "Ver fotos",
        galleryTitle: "Galería de aeronave",
        photoSingular: "foto",
        photoPlural: "fotos",
        nextImage: "Siguiente imagen",
        previousImage: "Imagen anterior",
        registration: "Matrícula",
        statusLabel: "Estado",
        noImage: "Sin imagen disponible",
        loading: "Cargando aeronaves...",
        loadError: "No fue posible cargar el catálogo.",
        modalTitle: "Solicitar información",
        close: "Cerrar",
        detailBack: "Volver a aeronaves",
        detailEyebrow: "Aeronave en venta",
        detailNotFound: "Esta aeronave no esta disponible actualmente.",
        empty: "No hay aeronaves que coincidan con los filtros seleccionados.",
        finalEyebrow: "Asesoría especializada",
        finalTitle: "¿Busca una aeronave específica?",
        finalText: "Nuestro equipo puede ayudarle a encontrar la aeronave ideal según sus necesidades operativas y presupuestales.",
        finalCta: "Hablar con un asesor",
        advisoryEyebrow: "Adquisición de aeronaves",
        advisoryTitle: "Asesoría integral en la compra de aeronaves.",
        advisoryText: "Le acompañamos durante todo el proceso de adquisición con un enfoque personalizado, confidencial y profesional.",
        advisoryPrimary: "Solicitar asesoría",
        advisorySecondary: "Hablar por WhatsApp",
        form: {
          name: "Nombre *",
          namePlaceholder: "",
          email: "Correo electrónico *",
          phone: "Número telefónico *",
          message: "Mensaje",
          messagePlaceholder: "Si tienes una oferta, hazlo llegar...",
          submit: "Enviar solicitud",
          sentButton: "Solicitud enviada",
          sending: "Enviando...",
          successTitle: "Solicitud enviada correctamente.",
          successText:
            "Tu solicitud fue registrada correctamente. Un asesor se pondrá en contacto con usted a la brevedad. Gracias por elegir Sky Group Aviation.",
          invalidEmail: "Ingresa un correo electrónico válido.",
          required: "Nombre y correo son obligatorios.",
          registerError: "No fue posible registrar la solicitud. Intenta nuevamente.",
          mailError: "La solicitud fue registrada, pero no pudimos confirmar el envío de la notificación.",
        },
      }
);

const normalizeStatus = (status) => {
  const value = String(status || "").toLowerCase();
  if (["service", "out_of_service", "fuera_de_servicio", "fuera de servicio"].includes(value)) return "service";
  return "ready";
};

const aircraftSlug = normalizeRegistration;

const normalizeAircraft = (items) =>
  items.map((item) => {
    const registration = cleanText(item.registration || item.tail_number);
    const model = cleanText(item.model);
    const manufacturer = cleanText(item.manufacturer);

    return {
      ...item,
      id: item.id,
      name: cleanText(item.name) || model || (locale.value === "en" ? "Aircraft" : "Aeronave"),
      registration,
      slug: aircraftSlug(registration || item.slug),
      brand: manufacturer || "Sky Group",
      model,
      type: cleanText(item.type || item.aircraft_type) || model || manufacturer || "Sin clasificar",
      location: item.location || item.base_location || (locale.value === "en" ? "Mexico / United States" : "México / Estados Unidos"),
      status: normalizeStatus(item.status),
      main_image: item.main_image || null,
      images: Array.isArray(item.images) ? item.images.filter((image) => image.resolved_url) : [],
      price: item.price ?? null,
      currency: item.currency || "USD",
      displayPrice: item.price_label || "Consultar",
      priceValue: Number(item.price_value || item.price || 0),
    };
  });

const loadAircraft = async () => {
  loading.value = true;
  loadError.value = null;

  try {
    aircraft.value = normalizeAircraft(await listPublicAircraft());
    console.log("AIRCRAFT PUBLIC:", aircraft.value);
  } catch (error) {
    console.error(error);
    loadError.value = error;
    aircraft.value = [];
  } finally {
    loading.value = false;
    await nextTick();
    observeRevealElements();
  }
};

const aircraftTypes = computed(() => [...new Set(aircraft.value.map((item) => item.type).filter(Boolean))]);
const aircraftBrands = computed(() => [...new Set(aircraft.value.map((item) => item.brand).filter(Boolean))]);
const aircraftLocations = computed(() => [...new Set(aircraft.value.map((item) => item.location).filter(Boolean))]);

const filteredAircraft = computed(() => {
  const term = searchTerm.value.toLowerCase();
  const result = aircraft.value.filter((item) => {
    const matchesStatus = statusFilter.value === "all" || item.status === statusFilter.value;
    const matchesType = typeFilter.value === "all" || item.type === typeFilter.value;
    const matchesBrand = brandFilter.value === "all" || item.brand === brandFilter.value;
    const matchesLocation = locationFilter.value === "all" || item.location === locationFilter.value;
    const searchable = `${item.name} ${item.registration} ${item.type} ${item.brand} ${item.location}`.toLowerCase();
    return matchesStatus && matchesType && matchesBrand && matchesLocation && searchable.includes(term);
  });

  return [...result].sort((a, b) => a.id - b.id);
});

const readyAircraft = computed(() => filteredAircraft.value.filter((item) => item.status === "ready"));
const serviceAircraft = computed(() => filteredAircraft.value.filter((item) => item.status === "service"));
const activeGalleryImage = computed(() => galleryAircraft.value?.images?.[activeImageIndex.value] || null);
const detailRegistration = computed(() => aircraftSlug(route.params.registration));
const detailAircraft = computed(() =>
  aircraft.value.find((item) => item.slug === detailRegistration.value || aircraftSlug(item.registration) === detailRegistration.value)
);
const detailName = computed(() => {
  const item = detailAircraft.value;
  if (!item) return locale.value === "en" ? "Aircraft" : "Aeronave";

  const registration = cleanText(item.registration);
  const model = cleanText(item.model);
  const genericAircraft = locale.value === "en" ? "Aircraft" : "Aeronave";

  if (registration && model) return `${registration} - ${model}`;
  if (registration) return `${registration} - ${genericAircraft}`;
  return model || genericAircraft;
});
const detailTitle = computed(() => `${detailName.value} ${locale.value === "en" ? "for Sale" : "en Venta"}`);
const detailHeading = computed(() => detailTitle.value);
const detailDescription = computed(() => {
  const item = detailAircraft.value;
  if (!item) return "";
  return cleanText(item.description) || buildAircraftSeo(item, locale.value).description;
});
const detailImage = computed(() => detailAircraft.value?.main_image || detailAircraft.value?.images?.[0]?.resolved_url || "");
const resultsLabel = computed(() => {
  const total = filteredAircraft.value.length;
  return `${total} ${total === 1 ? copy.value.filters.foundSingular : copy.value.filters.found}`;
});

const clearFilters = () => {
  brandFilter.value = "all";
  typeFilter.value = "all";
  statusFilter.value = "all";
  locationFilter.value = "all";
  searchTerm.value = "";
};

const sectionCountLabel = (count) => `${count} ${count === 1 ? copy.value.filters.foundSingular : copy.value.filters.found}`;
const aircraftDetailPath = (item) => {
  const slug = aircraftSlug(item.registration || item.slug);
  return slug ? `/${route.params.market || "mx"}/aircraft-sales/${slug}` : toLocalizedRoute("AircraftSales");
};

const applyAircraftSeo = () => {
  if (!detailRegistration.value || !detailAircraft.value) return;

  const baseUrl = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/+$/, "");
  const seo = buildAircraftSeo(detailAircraft.value, locale.value, baseUrl);
  const canonicalUrl = seo.canonical;
  const title = seo.title;
  const description = seo.description;
  const imageUrl = detailImage.value || `${baseUrl}/images/Home/home10.png`;

  document.title = title;
  document.querySelector("meta[name='description']")?.setAttribute("content", description);
  document.querySelector("meta[property='og:title']")?.setAttribute("content", title);
  document.querySelector("meta[property='og:description']")?.setAttribute("content", detailDescription.value || description);
  document.querySelector("meta[property='og:url']")?.setAttribute("content", canonicalUrl);
  document.querySelector("meta[property='og:image']")?.setAttribute("content", imageUrl);
  document.querySelector("meta[name='twitter:title']")?.setAttribute("content", title);
  document.querySelector("meta[name='twitter:description']")?.setAttribute("content", description);
  document.querySelector("meta[name='twitter:image']")?.setAttribute("content", imageUrl);
  document.querySelector("link[rel='canonical']")?.setAttribute("href", canonicalUrl);
  document.querySelector("link[rel='alternate'][hreflang='es-MX']")?.setAttribute("href", seo.spanishUrl);
  document.querySelector("link[rel='alternate'][hreflang='en-US']")?.setAttribute("href", seo.englishUrl);
  document.querySelector("link[rel='alternate'][hreflang='x-default']")?.setAttribute("href", seo.spanishUrl);
};

const AircraftSection = defineComponent({
  props: {
    title: { type: String, required: true },
    text: { type: String, required: true },
    aircraft: { type: Array, required: true },
    statusLabel: { type: String, required: true },
    countLabel: { type: String, required: true },
    status: { type: String, required: true },
    buttonLabel: { type: String, required: true },
    galleryLabel: { type: String, required: true },
  },
  emits: ["request", "gallery"],
  setup(props, { emit }) {
    return () =>
      h("section", { class: "aircraft-group" }, [
        h("div", { class: "aircraft-group__head" }, [
          h("div", { class: "aircraft-group__title" }, [
            h("h2", props.title),
            h("strong", props.countLabel),
          ]),
          h("div", { class: "aircraft-rule" }),
          h("p", props.text),
        ]),
        h(
          "div",
          { class: "aircraft-grid" },
          props.aircraft.map((item) =>
            h("article", { key: item.id, class: "aircraft-card" }, [
              item.main_image
                ? h("button", { class: "aircraft-card__media", type: "button", onClick: () => emit("gallery", item) }, [
                    h("img", { src: item.main_image, alt: item.name, loading: "lazy", decoding: "async" }),
                    item.images.length
                      ? h(
                          "span",
                          { class: "aircraft-card__photos" },
                          `${item.images.length} ${
                            item.images.length === 1 ? copy.value.photoSingular : copy.value.photoPlural
                          }`
                        )
                      : null,
                    h("span", { class: ["aircraft-status", `aircraft-status--${props.status}`] }, [
                      h("i", { "aria-hidden": "true" }),
                      props.statusLabel,
                    ]),
                  ])
                : h("div", { class: "aircraft-card__no-image" }, [
                    h("span", copy.value.noImage),
                    h("strong", { class: ["aircraft-status", `aircraft-status--${props.status}`] }, [
                      h("i", { "aria-hidden": "true" }),
                      props.statusLabel,
                    ]),
                  ]),
              h("div", { class: "aircraft-card__body" }, [
                h(RouterLink, { class: "aircraft-card__title-link", to: aircraftDetailPath(item) }, () =>
                  h("h3", item.name)
                ),
                h("p", [h("span", `${locale.value === "en" ? "Registration" : "Matrícula"}: `), item.registration]),
                h("div", { class: "aircraft-price" }, [
                  h("span", locale.value === "en" ? "Price" : "Precio"),
                  h("strong", item.displayPrice),
                ]),
                item.images.length
                  ? h(
                      "button",
                      { class: "aircraft-card__gallery", type: "button", onClick: () => emit("gallery", item) },
                      props.galleryLabel
                    )
                  : null,
                h(
                  "button",
                  { class: "aircraft-card__cta", type: "button", onClick: () => emit("request", item) },
                  [props.buttonLabel, h("span", { "aria-hidden": "true" }, "→")]
                ),
              ]),
            ])
          )
        ),
      ]);
  },
});

const openGallery = async (item) => {
  if (!item.images.length) return;

  galleryAircraft.value = item;
  activeImageIndex.value = 0;
  galleryOpen.value = true;
  document.body.style.overflow = "hidden";
  await nextTick();
  if (galleryContentRef.value) galleryContentRef.value.scrollTop = 0;
};

const closeGallery = () => {
  galleryOpen.value = false;
  galleryAircraft.value = null;
  activeImageIndex.value = 0;
  if (!selectedAircraft.value) document.body.style.overflow = "";
};

const nextImage = () => {
  if (!galleryAircraft.value?.images?.length) return;

  activeImageIndex.value = (activeImageIndex.value + 1) % galleryAircraft.value.images.length;
};

const previousImage = () => {
  if (!galleryAircraft.value?.images?.length) return;

  activeImageIndex.value =
    (activeImageIndex.value - 1 + galleryAircraft.value.images.length) % galleryAircraft.value.images.length;
};

const requestFromGallery = () => {
  const item = galleryAircraft.value;
  closeGallery();
  if (item) openRequest(item);
};

const openRequest = async (item) => {
  selectedAircraft.value = item;
  inquirySuccess.value = "";
  inquiryError.value = "";
  requestForm.message = "";
  document.body.style.overflow = "hidden";
  await nextTick();
  if (requestPanelRef.value) requestPanelRef.value.scrollTop = 0;
};

const closeRequest = () => {
  if (inquiryCloseTimer) {
    clearTimeout(inquiryCloseTimer);
    inquiryCloseTimer = null;
  }
  selectedAircraft.value = null;
  inquirySuccess.value = "";
  inquiryError.value = "";
  document.body.style.overflow = "";
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const submitRequest = async () => {
  if (!selectedAircraft.value || submitting.value) return;

  const cleanForm = {
    name: requestForm.name.trim(),
    email: requestForm.email.trim(),
    phone: requestForm.phone.trim(),
    message: requestForm.message.trim(),
  };

  inquirySuccess.value = "";
  inquiryError.value = "";

  if (!cleanForm.name || !cleanForm.email) {
    inquiryError.value = copy.value.form.required;
    return;
  }

  if (!isValidEmail(cleanForm.email)) {
    inquiryError.value = copy.value.form.invalidEmail;
    return;
  }

  submitting.value = true;

  try {
    const inquiry = await createAircraftInquiry({
      aircraft_sale_id: selectedAircraft.value.id,
      name: cleanForm.name,
      email: cleanForm.email,
      phone: cleanForm.phone,
      message: cleanForm.message,
    });

    let mailResponse = null;

    try {
      mailResponse = await sendAircraftInquiryEmail({
        inquiry_id: inquiry.id,
        aircraft_id: selectedAircraft.value.id,
        aircraft_name: selectedAircraft.value.name,
        registration: selectedAircraft.value.registration,
        price: selectedAircraft.value.price,
        currency: selectedAircraft.value.currency,
        aircraft_status: selectedAircraft.value.status,
        name: cleanForm.name,
        email: cleanForm.email,
        phone: cleanForm.phone,
        message: cleanForm.message,
      });
    } catch (mailError) {
      console.error("Solicitud guardada, pero correo falló:", mailError);
      inquiryError.value = copy.value.form.mailError;
      return;
    }

    if (mailResponse?.success === true) {
      inquirySuccess.value = copy.value.form.successText;
      requestForm.name = "";
      requestForm.email = "";
      requestForm.phone = "";
      requestForm.message = "";

      if (inquiryCloseTimer) clearTimeout(inquiryCloseTimer);
      inquiryCloseTimer = setTimeout(() => {
        closeRequest();
      }, 3500);
    }
  } catch (error) {
    console.error(error);
    inquiryError.value = copy.value.form.registerError;
  } finally {
    submitting.value = false;
  }
};

let observer;

const observeRevealElements = () => {
  if (!observer) return;

  document.querySelectorAll(".reveal:not(.is-visible)").forEach((element) => observer.observe(element));
};

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  observeRevealElements();
  loadAircraft();
});

watch([detailAircraft, detailRegistration, locale], () => {
  applyAircraftSeo();
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
  if (inquiryCloseTimer) clearTimeout(inquiryCloseTimer);
  document.body.style.overflow = "";
});
</script>

<style>
.aircraft-page {
  display: block;
  width: 100%;
  min-width: 0;
  height: auto;
  min-height: 0;
  overflow: visible;
  background:
    radial-gradient(circle at 82% 16%, rgba(217, 174, 82, 0.1), transparent 28%),
    linear-gradient(180deg, #061522 0%, #071827 46%, #06111d 100%);
  color: #ffffff;
}

.aircraft-detail {
  min-height: 100vh;
  padding: 150px 0 90px;
  background:
    linear-gradient(90deg, rgba(6, 17, 29, 0.74), rgba(6, 17, 29, 0.34)),
    url("/images/About/aircraftsales.png") center/cover;
}

.aircraft-detail__inner {
  display: grid;
  gap: 28px;
}

.aircraft-detail__back,
.aircraft-card__title-link {
  color: inherit;
  text-decoration: none;
}

.aircraft-detail__back {
  width: fit-content;
  color: #d9ae52;
  font-weight: 700;
}

.aircraft-detail__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
  gap: clamp(28px, 5vw, 70px);
  align-items: center;
}

.aircraft-detail__media {
  min-height: 360px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
}

.aircraft-detail__media img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 360px;
  object-fit: cover;
}

.aircraft-detail__no-image {
  display: grid;
  min-height: 360px;
  place-items: center;
  color: rgba(255, 255, 255, 0.78);
}

.aircraft-detail__copy h1 {
  margin: 10px 0 16px;
  font-size: clamp(2.2rem, 5vw, 4.8rem);
  line-height: 0.96;
}

.aircraft-detail__copy p {
  max-width: 680px;
  color: rgba(255, 255, 255, 0.82);
  font-size: 1.05rem;
  line-height: 1.75;
}

.aircraft-detail__specs {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin: 28px 0;
}

.aircraft-detail__specs div {
  padding: 15px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
}

.aircraft-detail__specs dt {
  color: rgba(255, 255, 255, 0.62);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.aircraft-detail__specs dd {
  margin: 7px 0 0;
  color: #fff;
  font-weight: 800;
}

.aircraft-detail__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.aircraft-card__title-link h3 {
  transition: color 0.2s ease;
}

.aircraft-card__title-link:hover h3 {
  color: #d9ae52;
}

.layout-wrapper > .footer {
  position: relative;
  display: block;
  width: 100%;
  min-width: 0;
}

.aircraft-hero {
  position: relative;
  min-height: 620px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background-image: url("/images/About/aircraftsales.png");
  background-position: center;
  background-size: cover;
}

.aircraft-hero__shade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(3, 11, 20, 0.68), rgba(5, 14, 24, 0.34) 48%, rgba(5, 14, 24, 0.1)),
    linear-gradient(180deg, rgba(5, 14, 24, 0.02), rgba(6, 21, 34, 0.72) 100%);
}

.aircraft-hero__inner {
  position: relative;
  z-index: 1;
  width: 100%;
  padding-top: 9rem;
  padding-bottom: 6rem;
}

.aircraft-hero__copy {
  max-width: 690px;
}

.aircraft-eyebrow,
.aircraft-filters label span,
.aircraft-price span {
  display: block;
  color: #d9ae52;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.aircraft-hero h1,
.aircraft-final h2 {
  margin: 1rem 0 1.3rem;
  max-width: 9ch;
  font-size: clamp(4rem, 7vw, 6.8rem);
  line-height: 0.9;
}

.aircraft-hero p,
.aircraft-final p,
.aircraft-group__head p {
  max-width: 620px;
  color: #aeb8c3;
  font-size: 1.02rem;
  line-height: 1.8;
}

.aircraft-btn,
.aircraft-card__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  min-height: 48px;
  border: 0;
  border-radius: 6px;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
}

.aircraft-btn--gold {
  margin-top: 2.1rem;
  padding: 0.95rem 1.35rem;
  background: linear-gradient(135deg, #d9ae52, #f0c86e);
  color: #061522;
}

.aircraft-btn--ghost {
  padding: 0.9rem 1.2rem;
  border: 1px solid rgba(217, 174, 82, 0.55);
  background: transparent;
  color: #ffffff;
}

.aircraft-btn:hover,
.aircraft-card__cta:hover {
  transform: translateY(-2px);
}

.aircraft-catalog {
  width: 100%;
  height: auto;
  min-height: auto;
  padding: 70px 0 100px;
}

.aircraft-filters {
  margin-bottom: 3.75rem;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  background: rgba(8, 27, 42, 0.84);
  box-shadow: 0 22px 70px rgba(0, 0, 0, 0.26);
}

.aircraft-filters__bar {
  display: none;
}

.aircraft-filters__panel {
  display: grid;
  grid-template-columns: 0.9fr 1fr 1fr 1fr 1.35fr;
  gap: 0.85rem;
  align-items: end;
}

.aircraft-filters label {
  min-width: 0;
}

.aircraft-filters select,
.aircraft-filters input,
.request-form input,
.request-form textarea {
  width: 100%;
  margin-top: 0.6rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  background: rgba(6, 21, 34, 0.58);
  color: #ffffff;
  font: inherit;
  outline: none;
  transition: border-color 0.25s ease, background 0.25s ease;
}

.aircraft-filters select,
.aircraft-filters input {
  height: 48px;
  padding: 0 0.85rem;
}

.aircraft-filters__actions {
  display: none;
}

.aircraft-filters input::placeholder,
.request-form input::placeholder,
.request-form textarea::placeholder {
  color: rgba(174, 184, 195, 0.72);
}

.aircraft-filters select:focus,
.aircraft-filters input:focus,
.request-form input:focus,
.request-form textarea:focus {
  border-color: rgba(217, 174, 82, 0.82);
  background: rgba(6, 21, 34, 0.9);
}

.aircraft-group {
  width: 100%;
  height: auto;
  min-height: auto;
  margin: 0;
}

.catalog-message {
  padding: 2.25rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  background: rgba(12, 33, 52, 0.72);
  color: #aeb8c3;
  text-align: center;
}

.catalog-message--error {
  border-color: rgba(214, 106, 119, 0.42);
  color: #fff0f2;
}

.aircraft-group + .aircraft-group {
  margin-top: 5.5rem;
}

.aircraft-group__head {
  margin-bottom: 2rem;
}

.aircraft-group__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.aircraft-group h2 {
  font-size: clamp(2rem, 4vw, 3.2rem);
}

.aircraft-group__title strong {
  color: #d9ae52;
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.aircraft-rule {
  width: 112px;
  height: 1px;
  margin: 1rem 0 1.1rem;
  background: linear-gradient(90deg, #d9ae52, transparent);
}

.aircraft-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px;
  width: 100%;
  margin-top: 32px;
}

.aircraft-card {
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  background: rgba(8, 27, 42, 0.86);
  box-shadow: 0 22px 56px rgba(0, 0, 0, 0.22);
}

.aircraft-card__media {
  position: relative;
  width: 100%;
  height: 260px;
  display: block;
  padding: 0;
  border: 0;
  overflow: hidden;
  background: #10283e;
  cursor: pointer;
}

.aircraft-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.aircraft-card:hover .aircraft-card__media img {
  transform: scale(1.04);
}

.aircraft-card__photos {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.42rem 0.62rem;
  border: 1px solid rgba(217, 174, 82, 0.52);
  border-radius: 6px;
  background: rgba(5, 20, 32, 0.82);
  color: #f0c86e;
  font-size: 0.66rem;
  font-weight: 800;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.aircraft-card__no-image {
  position: relative;
  width: 100%;
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: #0b1c2a;
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.aircraft-status {
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.48rem 0.68rem;
  border-radius: 6px;
  font-size: 0.67rem;
  font-weight: 800;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.aircraft-status i {
  width: 7px;
  height: 7px;
  border-radius: 999px;
}

.aircraft-status--ready {
  background: rgba(21, 73, 47, 0.88);
  color: #e9fff1;
}

.aircraft-status--ready i {
  background: #6bd98e;
}

.aircraft-status--service {
  background: rgba(92, 28, 39, 0.9);
  color: #fff0f2;
}

.aircraft-status--service i {
  background: #d66a77;
}

.aircraft-card__body {
  padding: 1.35rem;
}

.aircraft-card h3 {
  margin-bottom: 1rem;
  font-size: 1.45rem;
  line-height: 1.15;
}

.aircraft-card p {
  color: #aeb8c3;
  line-height: 1.6;
}

.aircraft-card p span {
  color: #ffffff;
}

.aircraft-price {
  margin: 1.35rem 0;
}

.aircraft-price strong {
  display: block;
  margin-top: 0.35rem;
  color: #f0c86e;
  font-size: 1.5rem;
}

.aircraft-card__cta {
  width: 100%;
  border: 1px solid rgba(217, 174, 82, 0.7);
  background: transparent;
  color: #ffffff;
}

.aircraft-card__gallery {
  width: 100%;
  min-height: 42px;
  margin-bottom: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.04);
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  transition: border-color 0.25s ease, background 0.25s ease;
}

.aircraft-card__cta:hover,
.aircraft-card__gallery:hover {
  background: rgba(217, 174, 82, 0.12);
}

.aircraft-empty {
  color: #aeb8c3;
  text-align: center;
}

.aircraft-final__shell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  background: linear-gradient(135deg, #0c2134, #071827);
}

.aircraft-final h2 {
  max-width: 11ch;
  font-size: clamp(2.6rem, 5vw, 5rem);
}

.aircraft-advisory {
  padding-top: 0;
}

.aircraft-advisory__inner {
  max-width: 860px;
}

.aircraft-advisory h2 {
  max-width: 720px;
  margin: 1rem 0 1.1rem;
  font-size: clamp(2.4rem, 5vw, 4.5rem);
  line-height: 1;
}

.aircraft-advisory p {
  max-width: 680px;
  color: #aeb8c3;
  font-size: 1rem;
  line-height: 1.8;
}

.aircraft-advisory__actions {
  display: flex;
  gap: 0.9rem;
  flex-wrap: wrap;
  margin-top: 1.8rem;
}

.aircraft-gallery-modal {
  position: fixed;
  inset: 0;
  z-index: 10020;
  display: grid;
  place-items: center;
  padding: 1.8rem;
}

.aircraft-gallery-modal__backdrop {
  position: absolute;
  inset: 0;
  border: 0;
  background: rgba(0, 9, 18, 0.92);
  backdrop-filter: blur(8px);
  cursor: pointer;
}

.aircraft-gallery-modal__content {
  position: relative;
  width: min(100%, 1200px);
  max-height: calc(100vh - 3.6rem);
  overflow: auto;
  padding: 1.9rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  background: #071827;
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.55);
}

.aircraft-gallery-modal__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 6px;
  background: transparent;
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
}

.aircraft-gallery-modal__header {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 1.5rem;
  padding-right: 3rem;
}

.aircraft-gallery-modal__header span,
.aircraft-gallery-modal__header strong {
  color: #d9ae52;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.aircraft-gallery-modal__header h2 {
  margin: 0.4rem 0;
  font-size: clamp(2rem, 4vw, 3.2rem);
}

.aircraft-gallery-modal__header p {
  color: #aeb8c3;
}

.aircraft-gallery-modal__main {
  position: relative;
  width: 100%;
  height: min(62vh, 600px);
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 10px;
  background: #020b13;
}

.aircraft-gallery-modal__main img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.gallery-arrow {
  position: absolute;
  top: 50%;
  z-index: 2;
  width: 48px;
  height: 48px;
  transform: translateY(-50%);
  border: 1px solid #d9ae52;
  border-radius: 999px;
  background: rgba(5, 20, 32, 0.82);
  color: #ffffff;
  font-size: 1.2rem;
  cursor: pointer;
}

.gallery-arrow--left {
  left: 1.2rem;
}

.gallery-arrow--right {
  right: 1.2rem;
}

.aircraft-gallery-modal__thumbnails {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;
}

.gallery-thumbnail {
  height: 78px;
  padding: 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 6px;
  background: #0b1c2a;
  cursor: pointer;
}

.gallery-thumbnail--active {
  border-color: #d9ae52;
}

.gallery-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.aircraft-gallery-modal__inquiry {
  width: 100%;
  min-height: 48px;
  margin-top: 1rem;
  border: 0;
  border-radius: 6px;
  background: linear-gradient(135deg, #d9ae52, #f0c86e);
  color: #061522;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
}

.request-modal {
  position: fixed;
  inset: 0;
  z-index: 10020;
  display: grid;
  place-items: center;
  padding: 1.25rem;
}

.request-modal__backdrop {
  position: absolute;
  inset: 0;
  border: 0;
  background: rgba(1, 7, 13, 0.76);
  cursor: pointer;
}

.request-modal__panel {
  position: relative;
  width: min(100%, 720px);
  max-height: calc(100vh - 2.5rem);
  overflow: auto;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  background: #071827;
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.45);
}

.request-modal__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 38px;
  height: 38px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 6px;
  background: transparent;
  color: #ffffff;
  font-size: 1.4rem;
  cursor: pointer;
}

.request-summary {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 1.2rem;
  align-items: center;
  margin: 1.2rem 0 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.request-summary img {
  width: 150px;
  aspect-ratio: 1.28;
  object-fit: cover;
  border-radius: 6px;
}

.request-summary__no-image {
  width: 150px;
  aspect-ratio: 1.28;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: #0b1c2a;
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-align: center;
  text-transform: uppercase;
}

.request-summary h3 {
  font-size: 1.7rem;
}

.request-summary p {
  margin: 0.35rem 0;
  color: #aeb8c3;
}

.request-summary strong {
  color: #f0c86e;
}

.request-form {
  display: grid;
  gap: 1rem;
}

.request-form label span {
  display: block;
  color: #ffffff;
  font-size: 0.88rem;
  margin-bottom: 0.35rem;
}

.request-form input,
.request-form textarea {
  margin-top: 0;
  padding: 0.85rem;
  resize: vertical;
}

.request-form__submit {
  width: 100%;
  margin-top: 0.3rem;
}

.request-form__submit:disabled {
  cursor: wait;
  opacity: 0.72;
  transform: none;
}

.request-form__success,
.request-form__error {
  margin: 0;
  padding: 0.85rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  line-height: 1.5;
}

.request-form__success {
  border: 1px solid rgba(107, 217, 142, 0.28);
  background: rgba(21, 73, 47, 0.28);
  color: #e9fff1;
}

.request-form__error {
  border: 1px solid rgba(214, 106, 119, 0.36);
  background: rgba(92, 28, 39, 0.28);
  color: #fff0f2;
}

.reveal {
  opacity: 0;
  transform: translateY(26px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 980px) {
  .aircraft-filters__panel,
  .aircraft-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .aircraft-search,
  .aircraft-filters__actions {
    grid-column: 1 / -1;
  }

  .aircraft-filters__actions {
    display: flex;
    gap: 0.75rem;
  }

  .aircraft-final__shell {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (max-width: 640px) {
  .aircraft-hero {
    min-height: 520px;
    background-position: 58% center;
  }

  .aircraft-hero__shade {
    background:
      linear-gradient(90deg, rgba(3, 11, 20, 0.92), rgba(5, 14, 24, 0.78)),
      linear-gradient(180deg, rgba(5, 14, 24, 0.1), #061522 100%);
  }

  .aircraft-hero__inner {
    padding-top: 7rem;
    padding-bottom: 4rem;
  }

  .aircraft-hero h1 {
    font-size: clamp(2.65rem, 13vw, 3.25rem);
  }

  .aircraft-hero p {
    font-size: 0.96rem;
    line-height: 1.65;
  }

  .aircraft-btn--gold {
    width: 100%;
    max-width: 100%;
  }

  .aircraft-filters__bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .aircraft-filters__bar strong {
    color: #d9ae52;
    font-size: 0.74rem;
    letter-spacing: 0.1em;
    text-align: right;
    text-transform: uppercase;
  }

  .aircraft-filters__toggle {
    min-height: 46px;
    border: 1px solid rgba(217, 174, 82, 0.56);
    border-radius: 6px;
    background: transparent;
    color: #ffffff;
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    padding: 0 0.85rem;
    text-transform: uppercase;
  }

  .aircraft-filters__toggle span {
    display: inline-block;
    margin-left: 0.65rem;
    color: #d9ae52;
  }

  .aircraft-filters__panel {
    display: none;
    margin-top: 1rem;
  }

  .aircraft-filters__panel--open {
    display: grid;
  }

  .aircraft-filters__panel,
  .aircraft-grid,
  .request-summary {
    grid-template-columns: 1fr;
  }

  .aircraft-catalog,
  .aircraft-group,
  .aircraft-grid,
  .aircraft-card {
    height: auto;
    min-height: 0;
    overflow: visible;
  }

  .aircraft-grid {
    display: grid;
    width: 100%;
    gap: 24px;
  }

  .aircraft-card {
    position: relative;
    width: 100%;
    opacity: 1;
    visibility: visible;
    transform: none;
  }

  .aircraft-filters__actions {
    flex-direction: column;
  }

  .aircraft-filters__actions .aircraft-btn {
    width: 100%;
    margin-top: 0;
  }

  .aircraft-card__media,
  .aircraft-card__no-image {
    height: clamp(220px, 64vw, 260px);
  }

  .aircraft-card__gallery,
  .aircraft-card__cta {
    min-height: 48px;
  }

  .aircraft-final__shell,
  .request-modal__panel {
    padding: 1.35rem;
  }

  .request-modal__panel {
    max-height: calc(100dvh - 2.5rem);
  }

  .aircraft-final__shell .aircraft-btn,
  .aircraft-advisory__actions .aircraft-btn {
    width: 100%;
    margin-top: 0;
  }

  .aircraft-advisory__actions {
    flex-direction: column;
  }

  .request-summary img {
    width: 100%;
  }

  .request-summary__no-image {
    width: 100%;
  }

  .aircraft-gallery-modal {
    padding: 1rem;
  }

  .aircraft-gallery-modal__content {
    max-height: calc(100dvh - 2rem);
    padding: 1.25rem;
  }

  .aircraft-gallery-modal__header {
    flex-direction: column;
    padding-right: 2.5rem;
  }

  .aircraft-gallery-modal__main {
    min-height: 240px;
    height: 48vh;
  }
}
</style>
