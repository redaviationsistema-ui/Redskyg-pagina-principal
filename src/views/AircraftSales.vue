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

        <div class="request-summary">
          <div class="request-summary__copy">
            <span class="aircraft-eyebrow">{{ copy.modalTitle }}</span>
            <h3>{{ selectedAircraft.name }}</h3>
            <dl>
              <div>
                <dt>{{ copy.registration }}</dt>
                <dd>{{ selectedAircraft.registration }}</dd>
              </div>
              <div>
                <dt>{{ copy.statusLabel }}</dt>
                <dd><i aria-hidden="true"></i>{{ selectedAircraft.status === "ready" ? copy.status.ready : copy.status.service }}</dd>
              </div>
              <div>
                <dt>{{ locale === 'en' ? 'Price' : 'Precio' }}</dt>
                <dd class="request-summary__price">{{ selectedAircraft.displayPrice }}</dd>
              </div>
            </dl>
          </div>
          <div class="request-summary__media">
            <img v-if="selectedAircraft.main_image" :src="selectedAircraft.main_image" :alt="selectedAircraft.name" />
            <div v-else class="request-summary__no-image">
              <span>{{ copy.noImage }}</span>
            </div>
          </div>
        </div>

        <form class="request-form" @submit.prevent="submitRequest">
          <div class="request-form__grid request-form__grid--primary">
            <label class="request-field">
              <span>{{ copy.form.name }}</span>
              <input
                v-model="requestForm.name"
                type="text"
                :placeholder="copy.form.namePlaceholder"
                autocomplete="name"
                :aria-invalid="Boolean(fieldErrors.name)"
                @blur="touchField('name')"
              />
              <small v-if="fieldErrors.name" class="request-field__message request-field__message--error">
                {{ fieldErrors.name }}
              </small>
            </label>
            <label class="request-field">
              <span>{{ copy.form.email }}</span>
              <div class="request-input-wrap" :class="{ 'request-input-wrap--verified': isCurrentEmailVerified }">
                <input
                  v-model="requestForm.email"
                  type="email"
                  placeholder=""
                  autocomplete="email"
                  inputmode="email"
                  :aria-invalid="Boolean(fieldErrors.email)"
                  @blur="touchField('email')"
                />
                <strong v-if="isCurrentEmailVerified" aria-hidden="true">✓</strong>
              </div>
              <small v-if="fieldErrors.email" class="request-field__message request-field__message--error">
                {{ fieldErrors.email }}
              </small>
              <small v-else-if="!isCurrentEmailVerified && showEmailValid" class="request-field__message request-field__message--success">
                {{ copy.form.validEmail }}
              </small>
            </label>
          </div>

          <section
            v-if="showEmailVerification || isCurrentEmailVerified"
            class="verification-card"
            :class="{
              'verification-card--error': emailVerificationError,
              'verification-card--expired': isEmailCodeExpired,
              'verification-card--success': isCurrentEmailVerified,
            }"
          >
            <template v-if="isCurrentEmailVerified">
              <div class="verification-card__icon verification-card__icon--success" aria-hidden="true">✓</div>
              <div class="verification-card__body">
                <h4>{{ copy.form.emailVerified }}</h4>
                <p>{{ copy.form.emailVerifiedText }}</p>
              </div>
            </template>
            <template v-else>
              <div class="verification-card__icon" aria-hidden="true">{{ emailVerificationError ? "!" : "✉" }}</div>
              <div class="verification-card__body">
                <div class="verification-card__head" :class="{ 'verification-card__head--expired': isEmailCodeExpired }">
                  <div>
                    <h4>{{ copy.form.emailVerificationTitle }}</h4>
                    <p v-if="emailCodeSent && !isEmailCodeExpired">{{ copy.form.enterCodeSentTo }} <strong>{{ maskedEmail }}</strong></p>
                    <p v-else>{{ copy.form.emailVerificationText }}</p>
                    <small v-if="isEmailCodeExpired" class="verification-card__expired-message">
                      <span aria-hidden="true">⚠</span>
                      {{ copy.form.codeExpired }}
                    </small>
                  </div>
                  <button
                    class="verification-link verification-link--button"
                    type="button"
                    :disabled="emailVerificationLoading || emailCooldown > 0"
                    :aria-label="isEmailCodeExpired ? copy.form.resendCode : copy.form.verifyEmail"
                    @click="sendEmailVerificationCode"
                  >
                    {{ emailVerificationLoading ? copy.form.sendingCode : emailCooldown > 0 ? `${copy.form.resendCodeIn} ${emailCooldown} s` : emailCodeRequested ? `↻ ${copy.form.resendCode}` : copy.form.verifyEmail }}
                  </button>
                </div>

                <div v-if="emailCodeSent" class="otp-entry" @paste.prevent="handleOtpPaste">
                  <input
                    v-for="index in 8"
                    :key="index"
                    :ref="(element) => setOtpInputRef(element, index - 1)"
                    class="otp-entry__box"
                    :class="{ 'otp-entry__box--error': emailVerificationError }"
                    type="text"
                    inputmode="numeric"
                    autocomplete="one-time-code"
                    maxlength="1"
                    :value="otpDigits[index - 1]"
                    :aria-label="`${copy.form.verificationCode} ${index}`"
                    @input="handleOtpInput($event, index - 1)"
                    @keydown="handleOtpKeydown($event, index - 1)"
                  />
                </div>

                <small v-if="emailVerificationError && !isEmailCodeExpired" class="request-field__message request-field__message--error">
                  {{ emailVerificationError }}
                </small>

                <div v-if="emailCodeSent" class="verification-card__actions">
                  <button
                    class="verification-button"
                    type="button"
                    :disabled="emailVerificationLoading || emailVerificationCode.trim().length < 8"
                    @click="confirmEmailVerificationCode"
                  >
                    {{ emailVerificationLoading ? copy.form.validatingCode : copy.form.confirmCode }}
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </template>
          </section>

          <div class="request-form__grid request-form__grid--secondary">
            <label class="request-field">
              <span>{{ copy.form.phone }}</span>
              <input
                v-model="requestForm.phone"
                type="tel"
                placeholder=""
                inputmode="tel"
                autocomplete="tel"
                :aria-invalid="Boolean(fieldErrors.phone)"
                @blur="touchField('phone')"
              />
              <small v-if="fieldErrors.phone" class="request-field__message request-field__message--error">
                {{ fieldErrors.phone }}
              </small>
              <small v-else-if="showPhoneValid" class="request-field__message request-field__message--success">
                {{ copy.form.validPhone }}
              </small>
            </label>
            <label class="request-field">
              <span>{{ copy.form.message }}</span>
              <textarea
                v-model="requestForm.message"
                rows="4"
                maxlength="1200"
                :placeholder="copy.form.messagePlaceholder"
              ></textarea>
            </label>
          </div>

          <div v-if="inquirySuccess" class="request-form__success">
            <strong>✓ {{ copy.form.successTitle }}</strong>
            <p>{{ successMessage }}</p>
          </div>
          <p v-if="inquiryError" class="request-form__error">{{ inquiryError }}</p>

          <div class="request-form__footer">
            <p class="request-form__privacy">
              <span aria-hidden="true">⌕</span>
              <small>{{ copy.form.privacyText }}</small>
            </p>
            <div class="request-form__actions">
              <button class="aircraft-btn aircraft-btn--ghost request-form__cancel" type="button" @click="closeRequest">
                {{ copy.form.cancel }}
              </button>
              <button class="aircraft-btn aircraft-btn--gold request-form__submit" type="submit" :disabled="submitting">
                {{ inquirySuccess ? copy.form.sentButton : submitting ? copy.form.sending : copy.form.submit }}
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
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
  sendAircraftPdf,
  sendAircraftEmailOtp,
  verifyAircraftEmailOtp,
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
const otpInputRefs = ref([]);
const galleryOpen = ref(false);
const activeImageIndex = ref(0);
const aircraft = ref([]);
const loading = ref(true);
const loadError = ref(null);
const submitting = ref(false);
const inquirySuccess = ref("");
const inquiryError = ref("");
const emailVerified = ref(false);
const emailCodeRequested = ref(false);
const emailCodeSent = ref(false);
const emailVerificationCode = ref("");
const emailVerificationLoading = ref(false);
const emailVerificationError = ref("");
const verifiedEmail = ref("");
const emailCooldown = ref(0);
const requestForm = reactive({
  name: "",
  email: "",
  phone: "",
  message: "",
});
const touchedFields = reactive({
  name: false,
  email: false,
  phone: false,
});
let inquiryCloseTimer;
let emailCooldownTimer;

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
          messagePlaceholder: "Tell us about your interest in this aircraft...",
          submit: "Send Request",
          sentButton: "Request Sent",
          sending: "Sending...",
          successTitle: "Request sent",
          successText:
            "Thank you for your interest.\n\nWe have sent the aircraft information to:\n\n{email}\n\nThe document link will be available for 24 hours.\n\nOne of our advisors will contact you.\n\nThank you for choosing Sky Group Aviation.",
          invalidEmail: "Enter a valid email address.",
          invalidName: "Enter a valid name.",
          invalidPhone: "Enter a valid phone number.",
          nameRequired: "Name is required.",
          emailRequired: "Email is required.",
          phoneRequired: "Phone number is required.",
          validEmail: "Valid email",
          validPhone: "Valid number",
          verifyEmail: "Verify Email",
          emailVerified: "Email verified",
          sendingCode: "Sending code...",
          resendCode: "Resend Code",
          resendCodeIn: "Resend code in",
          codeSentTo: "Code sent to:",
          enterCodeSentTo: "Enter the code sent to",
          verificationCode: "Verification code",
          codePlaceholder: "_ _ _ _ _ _",
          confirmCode: "Confirm Code",
          validatingCode: "Validating...",
          emailVerificationTitle: "Email verification",
          emailVerificationText: "Request a verification code to confirm access to this email.",
          emailVerifiedText: "Your email has been verified successfully.",
          privacyText: "Your information is protected. It will only be used to provide information about this aircraft.",
          cancel: "Cancel",
          verifyEmailBeforeSubmit: "Verify your email address before continuing.",
          emailChanged: "The email was modified. Verify it again.",
          emailCodeError: "The verification code is not correct.",
          emailCodeRetry: "The code entered was not valid. Request a new code to try again.",
          codeExpired: "The code has expired. Request a new one.",
          emailOtpSendError: "We could not send the code to the email address.",
          required: "Name, email, and phone number are required.",
          registerError: "The request could not be registered. Please try again.",
          missingPdf:
            "Your request was registered successfully.\n\nThe commercial document is currently not available for automatic delivery.\n\nOne of our advisors will contact you.",
          pdfSendError:
            "Your request was registered successfully, but the document could not be sent automatically.\n\nOne of our advisors will follow up on your request.",
          mailError: "We could not send your request. Please try again.",
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
          messagePlaceholder: "Cuéntanos sobre tu interés en esta aeronave...",
          submit: "Enviar solicitud",
          sentButton: "Solicitud enviada",
          sending: "Enviando...",
          successTitle: "Solicitud enviada",
          successText:
            "Gracias por tu interés.\n\nHemos enviado la información de la aeronave al correo:\n\n{email}\n\nEl enlace para consultar el documento estará disponible durante 24 horas.\n\nUno de nuestros asesores se pondrá en contacto contigo.\n\nGracias por elegir Sky Group Aviation.",
          invalidEmail: "Ingresa un correo electrónico válido.",
          invalidName: "Ingresa un nombre válido.",
          invalidPhone: "Ingresa un número telefónico válido.",
          nameRequired: "El nombre es obligatorio.",
          emailRequired: "El correo electrónico es obligatorio.",
          phoneRequired: "El número telefónico es obligatorio.",
          validEmail: "Correo válido",
          validPhone: "Número válido",
          verifyEmail: "Verificar correo",
          emailVerified: "Correo verificado",
          sendingCode: "Enviando código...",
          resendCode: "Reenviar código",
          resendCodeIn: "Reenviar código en",
          codeSentTo: "Código enviado a:",
          enterCodeSentTo: "Ingresa el código enviado a",
          verificationCode: "Código de verificación",
          codePlaceholder: "_ _ _ _ _ _ _ _",
          confirmCode: "Confirmar código",
          validatingCode: "Validando...",
          emailVerificationTitle: "Verificación de correo",
          emailVerificationText: "Solicita un código de verificación para confirmar el acceso a este correo.",
          emailVerifiedText: "Tu correo ha sido verificado correctamente.",
          privacyText: "Tu información está protegida. Solo será utilizada para brindarte información sobre esta aeronave.",
          cancel: "Cancelar",
          verifyEmailBeforeSubmit: "Verifica tu correo electrónico antes de continuar.",
          emailChanged: "El correo fue modificado. Verifícalo nuevamente.",
          emailCodeError: "El código de verificación no es correcto.",
          emailCodeRetry: "El código ingresado no fue válido. Solicita un nuevo código para intentarlo nuevamente.",
          codeExpired: "El código ha expirado. Solicita uno nuevo.",
          emailOtpSendError: "No fue posible enviar el código al correo.",
          required: "Nombre, correo y teléfono son obligatorios.",
          registerError: "No fue posible registrar la solicitud. Intenta nuevamente.",
          missingPdf:
            "Tu solicitud fue registrada correctamente.\n\nActualmente el documento comercial no está disponible para envío automático.\n\nUno de nuestros asesores se pondrá en contacto contigo.",
          pdfSendError:
            "Tu solicitud fue registrada correctamente, pero no fue posible enviar el documento automáticamente.\n\nUno de nuestros asesores dará seguimiento a tu solicitud.",
          mailError: "No fue posible enviar tu solicitud. Inténtalo nuevamente.",
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
const normalizedForm = computed(() => ({
  name: requestForm.name.trim(),
  email: requestForm.email.trim().toLowerCase(),
  phone: requestForm.phone.trim().replace(/\s+/g, " "),
  message: requestForm.message.trim(),
}));
const isValidEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
const isValidPhone = (phone) => {
  const value = phone.trim();
  const digits = value.replace(/\D/g, "");
  return /^\+?[0-9][0-9\s().-]*$/.test(value) && digits.length >= 10 && digits.length <= 15;
};
const validationMessages = computed(() => {
  const form = normalizedForm.value;
  const errors = {};

  if (!form.name) errors.name = copy.value.form.nameRequired;
  else if (form.name.length < 2) errors.name = copy.value.form.invalidName;

  if (!form.email) errors.email = copy.value.form.emailRequired;
  else if (!isValidEmail(form.email)) errors.email = copy.value.form.invalidEmail;

  if (!form.phone) errors.phone = copy.value.form.phoneRequired;
  else if (!isValidPhone(form.phone)) errors.phone = copy.value.form.invalidPhone;

  return errors;
});
const fieldErrors = computed(() =>
  Object.fromEntries(
    Object.entries(validationMessages.value).filter(([field]) => touchedFields[field])
  )
);
const showEmailValid = computed(() => touchedFields.email && normalizedForm.value.email && !validationMessages.value.email);
const showPhoneValid = computed(() => touchedFields.phone && normalizedForm.value.phone && !validationMessages.value.phone);
const isCurrentEmailVerified = computed(() => emailVerified.value && normalizedForm.value.email === verifiedEmail.value);
const showEmailVerification = computed(() => touchedFields.email && normalizedForm.value.email && !validationMessages.value.email && !isCurrentEmailVerified.value);
const isEmailCodeExpired = computed(() => emailVerificationError.value === copy.value.form.codeExpired);
const maskedEmail = computed(() => {
  const [user, domain] = normalizedForm.value.email.split("@");
  if (!user || !domain) return "";
  return `${user.slice(0, 1)}***@${domain}`;
});
const otpDigits = computed(() => emailVerificationCode.value.padEnd(8, " ").slice(0, 8).split("").map((digit) => digit.trim()));
const resultsLabel = computed(() => {
  const total = filteredAircraft.value.length;
  return `${total} ${total === 1 ? copy.value.filters.foundSingular : copy.value.filters.found}`;
});
const successMessage = computed(() => inquirySuccess.value.replace("{email}", verifiedEmail.value));

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

const resetRequestValidation = () => {
  touchedFields.name = false;
  touchedFields.email = false;
  touchedFields.phone = false;
};

const stopCooldowns = () => {
  if (emailCooldownTimer) {
    clearInterval(emailCooldownTimer);
    emailCooldownTimer = null;
  }
  emailCooldown.value = 0;
};

const stopEmailCooldown = () => {
  if (emailCooldownTimer) {
    clearInterval(emailCooldownTimer);
    emailCooldownTimer = null;
  }
  emailCooldown.value = 0;
};

const startCooldown = (target) => {
  const isEmail = target === "email";
  const cooldownRef = emailCooldown;
  const timer = emailCooldownTimer;

  if (timer) clearInterval(timer);
  cooldownRef.value = 45;

  const interval = setInterval(() => {
    cooldownRef.value = Math.max(0, cooldownRef.value - 1);
    if (cooldownRef.value === 0) {
      clearInterval(interval);
      emailCooldownTimer = null;
    }
  }, 1000);

  if (isEmail) emailCooldownTimer = interval;
};

const resetEmailVerification = () => {
  emailVerified.value = false;
  emailCodeRequested.value = false;
  emailCodeSent.value = false;
  emailVerificationCode.value = "";
  emailVerificationError.value = "";
  verifiedEmail.value = "";
  stopEmailCooldown();
};

const resetOtpVerification = () => {
  resetEmailVerification();
  emailVerificationLoading.value = false;
};

const resetRequestForm = () => {
  requestForm.name = "";
  requestForm.email = "";
  requestForm.phone = "";
  requestForm.message = "";
  resetRequestValidation();
  resetOtpVerification();
};

const touchField = (field) => {
  if (field in touchedFields) touchedFields[field] = true;
};

const touchRequiredFields = () => {
  touchedFields.name = true;
  touchedFields.email = true;
  touchedFields.phone = true;
};

const otpErrorMessage = (error, fallback) => {
  const message = String(error?.message || "").toLowerCase();
  if (message.includes("expired")) return copy.value.form.codeExpired;
  if (message.includes("token") || message.includes("otp") || message.includes("invalid")) return fallback;
  return fallback;
};

const focusOtpBox = async (index) => {
  await nextTick();
  otpInputRefs.value[index]?.focus();
};

const setOtpInputRef = (element, index) => {
  if (element) otpInputRefs.value[index] = element;
};

const setOtpCode = (value) => {
  emailVerificationCode.value = String(value).replace(/\D/g, "").slice(0, 8);
};

const handleOtpInput = (event, index) => {
  const digit = event.target.value.replace(/\D/g, "").slice(-1);
  const digits = otpDigits.value;
  digits[index] = digit;
  setOtpCode(digits.join(""));
  if (emailVerificationError.value && emailVerificationError.value !== copy.value.form.codeExpired) {
    emailVerificationError.value = "";
  }

  if (digit && index < 7) focusOtpBox(index + 1);
};

const handleOtpKeydown = (event, index) => {
  if (event.key !== "Backspace") return;

  if (otpDigits.value[index]) return;
  if (index > 0) focusOtpBox(index - 1);
};

const handleOtpPaste = (event) => {
  const text = event.clipboardData?.getData("text") || "";
  setOtpCode(text);
  const nextIndex = Math.min(emailVerificationCode.value.length, 7);
  focusOtpBox(nextIndex);
};

const sendEmailVerificationCode = async () => {
  touchField("email");
  emailVerificationError.value = "";

  if (validationMessages.value.email || emailVerificationLoading.value || emailCooldown.value > 0) return;

  emailVerificationLoading.value = true;

  try {
    await sendAircraftEmailOtp(normalizedForm.value.email);
    emailCodeRequested.value = true;
    emailCodeSent.value = true;
    emailVerificationCode.value = "";
    startCooldown("email");
  } catch (error) {
    console.error("Error enviando OTP de correo:", error);
    emailVerificationError.value = copy.value.form.emailOtpSendError;
  } finally {
    emailVerificationLoading.value = false;
  }
};

const confirmEmailVerificationCode = async () => {
  touchField("email");
  emailVerificationError.value = "";

  if (validationMessages.value.email || emailVerificationLoading.value) return;

  emailVerificationLoading.value = true;

  try {
    await verifyAircraftEmailOtp(normalizedForm.value.email, emailVerificationCode.value.trim());
    verifiedEmail.value = normalizedForm.value.email;
    emailVerified.value = true;
    emailCodeRequested.value = false;
    emailCodeSent.value = false;
    emailVerificationCode.value = "";
    stopEmailCooldown();
  } catch (error) {
    console.error("Error verificando OTP de correo:", error);
    const message = otpErrorMessage(error, copy.value.form.emailCodeError);
    emailVerificationError.value = message;
    if (message === copy.value.form.codeExpired) {
      emailCodeSent.value = false;
      emailVerificationCode.value = "";
      stopEmailCooldown();
    }
  } finally {
    emailVerificationLoading.value = false;
  }
};

const openRequest = async (item) => {
  selectedAircraft.value = item;
  inquirySuccess.value = "";
  inquiryError.value = "";
  resetRequestForm();
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
  submitting.value = false;
  resetRequestForm();
  document.body.style.overflow = "";
};

const submitRequest = async () => {
  if (!selectedAircraft.value || submitting.value) return;

  touchRequiredFields();

  inquirySuccess.value = "";
  inquiryError.value = "";

  if (Object.keys(validationMessages.value).length) {
    return;
  }

  const cleanForm = normalizedForm.value;

  if (!emailVerified.value) {
    emailVerificationError.value = copy.value.form.verifyEmailBeforeSubmit;
    return;
  }

  if (cleanForm.email !== verifiedEmail.value) {
    resetEmailVerification();
    emailVerificationError.value = copy.value.form.emailChanged;
    return;
  }

  if (!selectedAircraft.value.id) {
    inquiryError.value = copy.value.form.registerError;
    return;
  }

  submitting.value = true;
  const aircraftForRequest = selectedAircraft.value;

  try {
    const inquiry = await createAircraftInquiry({
      aircraft_sale_id: aircraftForRequest.id,
      name: cleanForm.name,
      email: verifiedEmail.value,
      phone: cleanForm.phone,
      message: cleanForm.message,
      status: "new",
      email_verified: true,
      verified_email: verifiedEmail.value,
      pdf_sent: false,
      pdf_sent_at: null,
      email_status: "pending",
    });

    if (!inquiry?.id) {
      console.error("La solicitud fue creada sin inquiry.id:", inquiry);
      inquiryError.value = copy.value.form.registerError;
      return;
    }

    const [internalEmailResult, pdfResult] = await Promise.allSettled([
      sendAircraftInquiryEmail({
        inquiry_id: inquiry.id,
        aircraft_id: aircraftForRequest.id,
        aircraft_name: aircraftForRequest.name,
        registration: aircraftForRequest.registration,
        price: aircraftForRequest.price,
        currency: aircraftForRequest.currency,
        aircraft_status: aircraftForRequest.status,
        name: cleanForm.name,
        email: verifiedEmail.value,
        verified_email: verifiedEmail.value,
        email_verified: true,
        phone: cleanForm.phone,
        message: cleanForm.message,
        status: "new",
      }),
      sendAircraftPdf(inquiry.id),
    ]);

    if (internalEmailResult.status === "rejected") {
      console.error("Solicitud guardada, pero falló correo interno:", internalEmailResult.reason);
    }

    if (pdfResult.status === "rejected" || !pdfResult.value?.success) {
      const pdfError =
        pdfResult.status === "rejected"
          ? pdfResult.reason
          : new Error(pdfResult.value?.message || pdfResult.value?.error || "PDF delivery failed");
      console.error("Solicitud guardada, pero falló envío PDF:", pdfError);
      const pdfMessage = String(pdfError?.message || "").toLowerCase();
      inquirySuccess.value = pdfMessage.includes("pdf") || pdfMessage.includes("documento")
        ? copy.value.form.missingPdf
        : copy.value.form.pdfSendError;
      return;
    }

    inquirySuccess.value = copy.value.form.successText;

    if (inquiryCloseTimer) clearTimeout(inquiryCloseTimer);
    inquiryCloseTimer = setTimeout(() => {
      closeRequest();
    }, 3500);
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

watch(
  () => normalizedForm.value.email,
  (email) => {
    if (!verifiedEmail.value) return;
    if (email !== verifiedEmail.value) resetEmailVerification();
  }
);

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
  if (inquiryCloseTimer) clearTimeout(inquiryCloseTimer);
  stopCooldowns();
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
  width: min(100%, 1180px);
  max-height: calc(100vh - 2.5rem);
  overflow: auto;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  background:
    radial-gradient(circle at 74% 0%, rgba(216, 167, 66, 0.1), transparent 28%),
    linear-gradient(180deg, #081f30 0%, #061826 100%);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.38);
}

.request-modal__close {
  position: absolute;
  top: 1.1rem;
  right: 1.1rem;
  z-index: 3;
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
  grid-template-columns: minmax(0, 0.58fr) minmax(320px, 0.42fr);
  gap: 0;
  align-items: stretch;
  min-height: 285px;
  margin: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.request-summary__copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(1.6rem, 4vw, 3rem);
}

.request-summary__copy h3 {
  max-width: 12ch;
  margin: 0.85rem 0 1.4rem;
  color: #f7f7f5;
  font-family: var(--font-heading);
  font-size: clamp(2.3rem, 5vw, 4.4rem);
  line-height: 0.92;
}

.request-summary__copy dl {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin: 0;
}

.request-summary__copy dt {
  color: #9ba8b6;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.request-summary__copy dd {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin: 0.4rem 0 0;
  color: #f7f7f5;
  font-size: 0.95rem;
  font-weight: 800;
}

.request-summary__copy dd i {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #35c985;
}

.request-summary__price {
  color: #e1b75a !important;
}

.request-summary__media {
  position: relative;
  min-height: 285px;
  overflow: hidden;
  background: #081f30;
}

.request-summary__media::before {
  position: absolute;
  inset: 0;
  z-index: 1;
  content: "";
  background: linear-gradient(90deg, #061826 0%, rgba(6, 24, 38, 0.72) 26%, rgba(6, 24, 38, 0.08) 100%);
  pointer-events: none;
}

.request-summary__media img {
  width: 100%;
  height: 100%;
  min-height: 285px;
  object-fit: cover;
  display: block;
}

.request-summary__no-image {
  width: 100%;
  height: 100%;
  min-height: 285px;
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

.request-form {
  display: grid;
  gap: 1.25rem;
  padding: clamp(1.35rem, 3vw, 2.2rem) clamp(1.35rem, 4vw, 3rem) clamp(1.5rem, 4vw, 2.6rem);
}

.request-form__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  align-items: start;
}

.request-form label span {
  display: block;
  color: #ffffff;
  font-size: 0.88rem;
  margin-bottom: 0.35rem;
}

.request-field {
  display: block;
}

.request-input-wrap {
  position: relative;
}

.request-input-wrap input {
  padding-right: 2.4rem;
}

.request-input-wrap strong {
  position: absolute;
  top: 50%;
  right: 0.95rem;
  transform: translateY(-50%);
  color: #35c985;
  font-size: 1rem;
}

.request-form input,
.request-form textarea {
  margin-top: 0;
  padding: 0 0.95rem;
  min-height: 54px;
  border-radius: 10px;
  background: rgba(7, 27, 42, 0.92);
  border-color: rgba(255, 255, 255, 0.16);
  color: #f7f7f5;
  resize: vertical;
}

.request-form textarea {
  min-height: 104px;
  padding-top: 0.9rem;
}

.request-form input[aria-invalid="true"] {
  border-color: rgba(214, 106, 119, 0.78);
}

.request-field__message {
  display: block;
  margin-top: 0.45rem;
  font-size: 0.78rem;
  font-weight: 700;
  line-height: 1.35;
}

.request-field__message--error {
  color: #ffb4bf;
}

.request-field__message--success {
  color: #35c985;
}

.verification-block {
  display: grid;
  gap: 0.55rem;
  margin-top: 0.65rem;
}

.verification-button {
  width: fit-content;
  min-height: 52px;
  padding: 0.75rem 1rem;
  border: 0;
  border-radius: 8px;
  background: linear-gradient(135deg, #d8a742, #e1b75a);
  color: #061826;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
}

.verification-button:disabled {
  cursor: wait;
  opacity: 0.66;
}

.verification-card {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 1rem;
  padding: 1.15rem;
  border: 1px solid rgba(216, 167, 66, 0.55);
  border-radius: 12px;
  background: rgba(8, 31, 48, 0.72);
}

.verification-card--error {
  border-color: rgba(239, 98, 98, 0.65);
}

.verification-card--expired {
  gap: 1.25rem;
  padding: 28px 32px;
  border-color: rgba(239, 98, 98, 0.65);
  border-radius: 16px;
  background: #071b2a;
}

.verification-card--success {
  border-color: rgba(53, 201, 133, 0.65);
  background: rgba(53, 201, 133, 0.08);
}

.verification-card__icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  border: 1px solid rgba(216, 167, 66, 0.55);
  color: #e1b75a;
  font-weight: 900;
}

.verification-card--error .verification-card__icon {
  border-color: rgba(239, 98, 98, 0.65);
  color: #ef6262;
}

.verification-card--expired .verification-card__icon {
  width: 46px;
  height: 46px;
  border-color: rgba(239, 98, 98, 0.78);
  color: #ef6262;
  font-size: 1.1rem;
}

.verification-card__icon--success {
  border-color: rgba(53, 201, 133, 0.65);
  color: #35c985;
}

.verification-card__body {
  display: grid;
  gap: 0.9rem;
}

.verification-card__head {
  display: flex;
  justify-content: space-between;
  gap: 1.25rem;
  align-items: center;
}

.verification-card__head--expired {
  min-height: 78px;
  gap: 2rem;
}

.verification-card h4 {
  margin: 0;
  color: #f7f7f5;
  font-size: 1rem;
}

.verification-card--expired h4 {
  font-family: var(--font-heading);
  font-size: clamp(1.45rem, 2vw, 1.5rem);
  font-weight: 700;
}

.verification-card p {
  margin: 0.28rem 0 0;
  color: #9ba8b6;
  font-size: 0.98rem;
  line-height: 1.55;
}

.verification-card--expired p {
  max-width: 520px;
  margin-top: 0.45rem;
  font-size: 1rem;
}

.verification-card p strong {
  color: #f7f7f5;
}

.verification-card__expired-message {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin-top: 1rem;
  color: #ef6262;
  font-size: 0.92rem;
  font-weight: 700;
  line-height: 1.4;
}

.verification-card__expired-message span {
  width: 18px;
  height: 18px;
  display: inline-grid;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid rgba(239, 98, 98, 0.7);
  border-radius: 999px;
  font-size: 0.72rem;
}

.verification-link {
  flex: 0 0 auto;
  min-height: 56px;
  padding: 0.85rem 1.55rem;
  border: 1.5px solid #d8a742;
  border-radius: 10px;
  background: rgba(216, 167, 66, 0.1);
  color: #e1b75a;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  white-space: nowrap;
  transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease, opacity 0.2s ease, border-color 0.2s ease;
}

.verification-link--button {
  box-shadow: inset 0 0 0 1px rgba(216, 167, 66, 0.08);
}

.verification-link:hover:not(:disabled),
.verification-link:focus-visible:not(:disabled) {
  background: #d8a742;
  color: #071b2a;
  transform: translateY(-1px);
}

.verification-link:active:not(:disabled) {
  filter: brightness(0.92);
  transform: translateY(0);
}

.verification-link:focus-visible {
  outline: 2px solid rgba(225, 183, 90, 0.9);
  outline-offset: 3px;
}

.verification-link:disabled {
  border-color: rgba(155, 168, 182, 0.42);
  background: transparent;
  color: #9ba8b6;
  cursor: not-allowed;
  opacity: 0.68;
}

.otp-entry {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 48px));
  gap: 0.5rem;
}

.otp-entry__box {
  width: 48px !important;
  height: 56px;
  min-height: 56px !important;
  padding: 0 !important;
  border: 1px solid rgba(216, 167, 66, 0.55) !important;
  border-radius: 8px !important;
  text-align: center;
  color: #f7f7f5;
  font-size: 1.35rem !important;
  font-weight: 800;
}

.otp-entry__box--error {
  border-color: rgba(239, 98, 98, 0.65) !important;
}

.verification-card__actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.request-form__submit {
  margin-top: 0;
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

.request-form__success p {
  white-space: pre-line;
}

.request-form__error {
  border: 1px solid rgba(214, 106, 119, 0.36);
  background: rgba(92, 28, 39, 0.28);
  color: #fff0f2;
}

.request-form__footer {
  display: flex;
  justify-content: space-between;
  gap: 1.25rem;
  align-items: center;
  padding-top: 0.35rem;
}

.request-form__privacy {
  display: flex;
  gap: 0.65rem;
  align-items: center;
  margin: 0;
  color: #9ba8b6;
  line-height: 1.45;
}

.request-form__privacy span {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: #e1b75a;
}

.request-form__actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.request-form__cancel {
  margin-top: 0;
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

  .request-summary {
    grid-template-columns: 1fr;
  }

  .request-summary__media {
    order: -1;
    min-height: 220px;
  }

  .request-summary__media::before {
    background: linear-gradient(180deg, rgba(6, 24, 38, 0.08), #061826 100%);
  }

  .request-summary__media img,
  .request-summary__no-image {
    min-height: 220px;
  }

  .request-summary__copy dl {
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

  .request-modal {
    padding: 0.65rem;
  }

  .request-modal__panel {
    max-height: calc(100vh - 1.3rem);
    border-radius: 12px;
  }

  .request-summary__copy {
    padding: 1.3rem;
  }

  .request-summary__copy h3 {
    font-size: clamp(2rem, 12vw, 3rem);
  }

  .request-summary__copy dl,
  .request-form__grid {
    grid-template-columns: 1fr;
  }

  .request-form {
    padding: 1.15rem;
  }

  .verification-card {
    grid-template-columns: 1fr;
    padding: 1rem;
  }

  .verification-card__head,
  .request-form__footer,
  .request-form__actions {
    flex-direction: column;
    align-items: stretch;
  }

  .verification-link {
    width: 100%;
    text-align: left;
    white-space: normal;
  }

  .verification-link--button {
    justify-content: center;
    text-align: center;
  }

  .otp-entry {
    grid-template-columns: repeat(8, minmax(0, 1fr));
    gap: 0.35rem;
  }

  .otp-entry__box {
    width: 100% !important;
    height: 46px;
    min-height: 46px !important;
    font-size: 1.05rem !important;
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

  .verification-button {
    width: 100%;
  }

  .verification-code {
    grid-template-columns: 1fr;
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
