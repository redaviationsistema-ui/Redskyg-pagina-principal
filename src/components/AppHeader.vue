<template>
  <header
    class="header"
    :class="{
      scrolled,
      solid: !isHome,
    }"
  >
    <div class="header-inner">
      <!-- LEFT NAV -->
      <nav class="nav nav-left">
        <RouterLink :to="toLocalizedRoute('Home')" class="nav-link">
          {{ headerContent.home }}
        </RouterLink>

        <RouterLink :to="toLocalizedRoute('AboutUs')" class="nav-link">
          {{ headerContent.about }}
        </RouterLink>

        <div
          class="dropdown"
          @mouseenter="openDropdown"
          @mouseleave="closeDropdown"
        >
          <span class="nav-link">{{ headerContent.services }}</span>

          <div class="elegant-menu" v-show="dropdownOpen">
            <div class="menu-header">
              <span>{{ headerContent.menuTitle }}</span>
            </div>

            <div class="menu-grid">
              <RouterLink :to="toLocalizedRoute('AircraftSales')" class="menu-item">
                <div class="menu-icon-badge">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path :d="serviceIcons.aircraftSales" />
                  </svg>
                </div>
                <strong>{{ headerContent.aircraftSales }}</strong>
                <small>{{ headerContent.aircraftSalesDesc }}</small>
              </RouterLink>

              <RouterLink :to="toLocalizedRoute('AirTaxi')" class="menu-item">
                <div class="menu-icon-badge">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path :d="serviceIcons.airTaxi" />
                  </svg>
                </div>
                <strong>{{ headerContent.airTaxi }}</strong>
                <small>{{ headerContent.airTaxiDesc }}</small>
              </RouterLink>

              <RouterLink
                :to="toLocalizedRoute('OperationsManagement')"
                class="menu-item"
              >
                <div class="menu-icon-badge">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path :d="serviceIcons.operationsManagement" />
                  </svg>
                </div>
                <strong>{{ headerContent.operationsManagement }}</strong>
                <small>{{ headerContent.operationsManagementDesc }}</small>
              </RouterLink>

              <RouterLink
                :to="toLocalizedRoute('PrePurchaseInspection')"
                class="menu-item"
              >
                <div class="menu-icon-badge">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path :d="serviceIcons.prePurchase" />
                  </svg>
                </div>
                <strong>{{ headerContent.prePurchase }}</strong>
                <small>{{ headerContent.prePurchaseDesc }}</small>
              </RouterLink>

              <RouterLink :to="toLocalizedRoute('ImportExport')" class="menu-item">
                <div class="menu-icon-badge">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path :d="serviceIcons.importExport" />
                  </svg>
                </div>
                <strong>{{ headerContent.importExport }}</strong>
                <small>{{ headerContent.importExportDesc }}</small>
              </RouterLink>

              <RouterLink :to="toLocalizedRoute('EngineShop')" class="menu-item">
                <div class="menu-icon-badge">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path :d="serviceIcons.engineServices" />
                  </svg>
                </div>
                <strong>{{ headerContent.engineServices }}</strong>
                <small>{{ headerContent.engineServicesDesc }}</small>
              </RouterLink>

              <RouterLink :to="toLocalizedRoute('Avionics')" class="menu-item">
                <div class="menu-icon-badge">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path :d="serviceIcons.avionics" />
                  </svg>
                </div>
                <strong>{{ headerContent.avionics }}</strong>
                <small>{{ headerContent.avionicsDesc }}</small>
              </RouterLink>
              <RouterLink
                :to="toLocalizedRoute('FractionalOwnership')"
                class="menu-item"
              >
                <div class="menu-icon-badge">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path :d="serviceIcons.fractionalOwnership" />
                  </svg>
                </div>
                <strong>{{ headerContent.fractionalOwnership }}</strong>
                <small>{{ headerContent.fractionalOwnershipDesc }}</small>
              </RouterLink>
              <RouterLink :to="toLocalizedRoute('CoOwnership')" class="menu-item">
                <div class="menu-icon-badge">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path :d="serviceIcons.coOwnership" />
                  </svg>
                </div>
                <strong>{{ headerContent.coOwnership }}</strong>
                <small>{{ headerContent.coOwnershipDesc }}</small>
              </RouterLink>
            </div>
          </div>
        </div>

        <RouterLink :to="toLocalizedRoute('Blog')" class="nav-link">
          {{ headerContent.blog }}
        </RouterLink>

        <RouterLink :to="toLocalizedRoute('Contact')" class="nav-link">
          {{ headerContent.contact }}
        </RouterLink>
      </nav>

      <!-- LOGO -->
      <div class="logo">
        <RouterLink :to="toLocalizedRoute('Home')">
          <img src="/images/logoo.png" alt="Sky Group Aviation logo" />
        </RouterLink>
      </div>

      <div class="header-actions">
        <div class="locale-switcher" :aria-label="headerContent.changeLanguage">
          <button
            v-for="option in languageOptions"
            :key="option.locale"
            type="button"
            class="locale-switcher__button"
            :class="{ active: locale === option.locale }"
            :aria-pressed="locale === option.locale"
            @click="changeLanguage(option.locale)"
          >
            {{ option.label }}
          </button>
        </div>

        <!-- MOBILE -->
        <div class="hamburger" @click="toggleMenu">
          <span :class="{ open: mobileOpen }"></span>
          <span :class="{ open: mobileOpen }"></span>
          <span :class="{ open: mobileOpen }"></span>
        </div>
      </div>
    </div>
  </header>

  <!-- MOBILE MENU -->
  <div
    class="mobile-overlay"
    :class="{ active: mobileOpen }"
    @click="closeMenu"
  ></div>

  <div class="mobile-panel" :class="{ active: mobileOpen }">
    <div class="mobile-header">
      <div class="mobile-brand">
        <img src="/images/logoo.png" alt="Sky Group Aviation logo" />
        <div class="mobile-brand-copy">
          <span>Sky Group</span>
          <small>{{ headerContent.mobileBrand }}</small>
        </div>
      </div>

      <button class="mobile-close" @click="closeMenu" :aria-label="headerContent.closeNavigation">
        <span></span>
        <span></span>
      </button>
    </div>

    <div class="mobile-locale">
      <span class="mobile-kicker">{{ headerContent.changeLanguage }}</span>
      <div class="mobile-locale-switcher" :aria-label="headerContent.changeLanguage">
        <button
          v-for="option in languageOptions"
          :key="option.locale"
          type="button"
          class="mobile-locale-switcher__button"
          :class="{ active: locale === option.locale }"
          :aria-pressed="locale === option.locale"
          @click="changeLanguage(option.locale)"
        >
          {{ option.longLabel }}
        </button>
      </div>
    </div>

    <nav class="mobile-nav">
      <div class="mobile-nav-section">
        <span class="mobile-kicker">{{ headerContent.overview }}</span>
        <RouterLink :to="toLocalizedRoute('Home')" @click="closeMenu">{{ headerContent.homeTitle }}</RouterLink>
        <RouterLink :to="toLocalizedRoute('AboutUs')" @click="closeMenu">{{ headerContent.aboutTitle }}</RouterLink>
        <RouterLink :to="toLocalizedRoute('Blog')" @click="closeMenu">{{ headerContent.blogTitle }}</RouterLink>
      </div>

      <div class="mobile-divider"></div>

      <div class="mobile-nav-section">
        <span class="mobile-kicker">{{ headerContent.aircraftAdvisory }}</span>
        <RouterLink :to="toLocalizedRoute('AircraftSales')" @click="closeMenu">
          {{ headerContent.aircraftSales }}
        </RouterLink>
        <RouterLink :to="toLocalizedRoute('PrePurchaseInspection')" @click="closeMenu">
          {{ headerContent.prePurchase }}
        </RouterLink>
        <RouterLink :to="toLocalizedRoute('FractionalOwnership')" @click="closeMenu">
          {{ headerContent.fractionalOwnership }}
        </RouterLink>
        <RouterLink :to="toLocalizedRoute('CoOwnership')" @click="closeMenu">
          {{ headerContent.coOwnership }}
        </RouterLink>
      </div>

      <div class="mobile-divider"></div>

      <div class="mobile-nav-section">
        <span class="mobile-kicker">{{ headerContent.operationsTechnical }}</span>
        <RouterLink :to="toLocalizedRoute('AirTaxi')" @click="closeMenu">
          {{ headerContent.airTaxi }}
        </RouterLink>
        <RouterLink :to="toLocalizedRoute('OperationsManagement')" @click="closeMenu">
          {{ headerContent.operationsManagement }}
        </RouterLink>
        <RouterLink :to="toLocalizedRoute('ImportExport')" @click="closeMenu">
          {{ headerContent.importExport }}
        </RouterLink>
        <RouterLink :to="toLocalizedRoute('EngineShop')" @click="closeMenu">
          {{ headerContent.engineServices }}
        </RouterLink>
        <RouterLink :to="toLocalizedRoute('Avionics')" @click="closeMenu">
          {{ headerContent.avionicsMobile }}
        </RouterLink>
      </div>
    </nav>

    <div class="mobile-cta">
      <RouterLink :to="toLocalizedRoute('Contact')" @click="closeMenu" class="mobile-cta-primary">
        {{ headerContent.contactSkyGroup }}
      </RouterLink>
      <a
        href="https://wa.me/525586186576"
        target="_blank"
        rel="noopener noreferrer"
        class="mobile-cta-secondary"
      >
        {{ headerContent.whatsappQuote }}
      </a>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useLocale } from "../i18n";

const route = useRoute();
const { locale, toLocalizedRoute, switchLocale } = useLocale();
const serviceIcons = {
  aircraftSales: "M4 18h16M6 18l2-8h8l2 8M9 10V7h6v3",
  airTaxi: "M2 12h11m0 0-3-3m3 3-3 3m3 0h7M18 9l3 3-3 3",
  operationsManagement: "M5 18V8l7-4 7 4v10M9 12h6M9 15h4",
  prePurchase: "M4 12c2-4.5 5-6.75 8-6.75S18 7.5 20 12c-2 4.5-5 6.75-8 6.75S6 16.5 4 12Zm8 2.75a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5Z",
  importExport: "M12 3v18m0 0 4-4m-4 4-4-4m4-10 4 4m-4-4-4 4",
  engineServices: "M4 18h16M7 18v-4l2-2h6l2 2v4M9 12V8h6v4",
  avionics: "M4 7h16M6 12h12M8 17h8",
  fractionalOwnership: "M3 17l9-11 9 11M6 17h12M9 17v-3h6v3",
  coOwnership: "M7 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm10 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3.5 19a3.5 3.5 0 0 1 7 0m3 0a3.5 3.5 0 0 1 7 0",
};

const scrolled = ref(false);
const mobileOpen = ref(false);
const dropdownOpen = ref(false);
let closeTimeout = null;
const languageOptions = [
  { locale: "es", label: "ES", longLabel: "Español" },
  { locale: "en", label: "EN", longLabel: "English" },
];

const openDropdown = () => {
  clearTimeout(closeTimeout);
  dropdownOpen.value = true;
};

const closeDropdown = () => {
  closeTimeout = setTimeout(() => {
    dropdownOpen.value = false;
  }, 300); // 🔥 aquí controlas la velocidad
};
const isHome = computed(() => route.name === "Home");
const headerContent = computed(() =>
  locale.value === "en"
    ? {
        home: "HOME",
        about: "ABOUT US",
        services: "SERVICES",
        menuTitle: "Our Aviation Services",
        aircraftSales: "Aircraft Sales Advisory",
        aircraftSalesDesc: "Acquisition, Valuation, and Brokerage",
        airTaxi: "Executive Air Charter",
        airTaxiDesc: "Private Flights and Mission Support",
        operationsManagement: "Operational Management",
        operationsManagementDesc: "Compliance, Crew, and Oversight",
        prePurchase: "Pre-Purchase Advisory",
        prePurchaseDesc: "Due Diligence and Risk Review",
        importExport: "Import & Export",
        importExportDesc: "Cross-Border Aircraft Coordination",
        engineServices: "Engine Services",
        engineServicesDesc: "Programs, Logistics, and Technical Support",
        avionics: "Avionics",
        avionicsDesc: "Aircraft Systems and Modernization",
        fractionalOwnership: "Fractional Ownership",
        fractionalOwnershipDesc: "Structured Shared Access Programs",
        coOwnership: "Aircraft Co-Ownership",
        coOwnershipDesc: "Shared Equity and Governance Structure",
        blog: "PRIVATE FLIGHT GUIDE",
        contact: "CONTACT",
        mobileBrand: "Private Aviation Services",
        changeLanguage: "Change language",
        closeNavigation: "Close navigation",
        overview: "Overview",
        homeTitle: "Home",
        aboutTitle: "About Us",
        blogTitle: "Private Flight Guide",
        aircraftAdvisory: "Aircraft Advisory",
        operationsTechnical: "Operations & Technical",
        avionicsMobile: "Avionics & Systems",
        contactSkyGroup: "Contact Sky Group",
        whatsappQuote: "WhatsApp Quote",
      }
    : {
        home: "INICIO",
        about: "NOSOTROS",
        services: "SERVICIOS",
        menuTitle: "Nuestros servicios de aviacion",
        aircraftSales: "Compra y venta de aeronaves",
        aircraftSalesDesc: "Adquisicion, valuacion e intermediacion",
        airTaxi: "Taxi aereo ejecutivo",
        airTaxiDesc: "Vuelos privados y coordinacion de misiones",
        operationsManagement: "Administracion operativa",
        operationsManagementDesc: "Cumplimiento, tripulacion y supervision",
        prePurchase: "Asesoria precompra",
        prePurchaseDesc: "Debida diligencia y revision de riesgos",
        importExport: "Importacion y exportacion",
        importExportDesc: "Coordinacion aeronautica transfronteriza",
        engineServices: "Servicios de motores",
        engineServicesDesc: "Programas, logistica y soporte tecnico",
        avionics: "Avionica",
        avionicsDesc: "Sistemas de aeronaves y modernizacion",
        fractionalOwnership: "Propiedad fraccional",
        fractionalOwnershipDesc: "Programas estructurados de acceso compartido",
        coOwnership: "Copropiedad de aeronaves",
        coOwnershipDesc: "Capital compartido y estructura de gobernanza",
        blog: "GUIA DE VUELOS PRIVADOS",
        contact: "CONTACTO",
        mobileBrand: "Servicios de aviacion privada",
        changeLanguage: "Cambiar idioma",
        closeNavigation: "Cerrar navegacion",
        overview: "General",
        homeTitle: "Inicio",
        aboutTitle: "Nosotros",
        blogTitle: "Guia de vuelos privados",
        aircraftAdvisory: "Asesoria aeronáutica",
        operationsTechnical: "Operaciones y tecnico",
        avionicsMobile: "Avionica y sistemas",
        contactSkyGroup: "Contactar a Sky Group",
        whatsappQuote: "Cotizar por WhatsApp",
      }
);

// const logoSrc = computed(() => {
//   return "/images/logo.png";
// });

const handleScroll = () => {
  scrolled.value = window.scrollY > 40;
};

const toggleMenu = () => {
  mobileOpen.value = !mobileOpen.value;
};

const closeMenu = () => {
  mobileOpen.value = false;
};

const changeLanguage = (nextLocale) => {
  if (locale.value === nextLocale) return;
  closeMenu();
  switchLocale(nextLocale);
};

watch(mobileOpen, (val) => {
  document.body.style.overflow = val ? "hidden" : "auto";
});

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
<style>
/* HEADER */

.header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 140px;
  display: flex;
  align-items: center;
  z-index: 10000;
  transition: all 0.4s ease;
  background: transparent;
}

.header.scrolled,
.header.solid {
  height: 90px;
  background: rgba(5, 15, 30, 0.96);
  backdrop-filter: blur(16px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.header-inner {
  max-width: 1400px;
  width: 100%;
  margin: auto;
  padding: 0 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.locale-switcher {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.35rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
}

.locale-switcher__button,
.mobile-locale-switcher__button {
  border: none;
  cursor: pointer;
  transition: 0.28s ease;
  font-family: inherit;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.locale-switcher__button {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: transparent;
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.78rem;
  font-weight: 600;
}

.locale-switcher__button:hover,
.mobile-locale-switcher__button:hover {
  color: white;
}

.locale-switcher__button.active {
  color: #d4af37;
  border: 1px solid rgba(212, 175, 55, 0.65);
  background: rgba(212, 175, 55, 0.1);
  box-shadow: 0 0 0 1px rgba(212, 175, 55, 0.08);
}

.nav {
  flex: 1;
  display: flex;
  gap: 2.5rem;
  font-family: "Segoe UI", Arial, sans-serif;
  font-size: 12px;
  letter-spacing: 2px;
}

.nav-link {
  color: white;
  text-decoration: none;
  position: relative;
  transition: 0.3s;
}

.nav-link:hover {
  color: #d4af37;
}

.nav-link.router-link-active,
.nav-link.router-link-exact-active {
  color: #d4af37;
}

.nav-link.router-link-active::after,
.nav-link.router-link-exact-active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #d4af37, rgba(212, 175, 55, 0.3));
}

.cta {
  border: 1px solid rgba(255, 255, 255, 0.4);
  padding: 6px 16px;
  border-radius: 30px;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: transparent;
}

.logo img {
  height: 96px;
  width: auto;
  object-fit: contain;
  transition: all 0.3s ease;
  filter: brightness(0) invert(1); /* convierte logo oscuro en blanco */
}
.header.scrolled .logo img {
  height: 42px;
}

.header.scrolled .logo img {
  height: 55px;
}

.header.scrolled .logo img {
  height: 60px;
}

/* DROPDOWN */

/* ===============================
   ULTRA ELEGANT DROPDOWN
================================= */

.elegant-menu {
  position: absolute;
  top: 135%;
  left: 50%;
  transform: translateX(-50%);
  width: min(1080px, calc(100vw - 48px));
  max-height: calc(100vh - 120px);
  padding: 2rem 2.2rem;
  overflow-y: auto;
  border-radius: 22px;

  background: linear-gradient(
    145deg,
    rgba(10, 25, 50, 0.95),
    rgba(5, 15, 30, 0.98)
  );

  backdrop-filter: blur(30px);

  box-shadow:
    0 60px 120px rgba(0, 0, 0, 0.6),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);

  animation: fadeElegant 0.3s ease;
}

/* Top Accent Line */

.elegant-menu::before {
  content: "";
  position: absolute;
  top: 0;
  left: 40px;
  right: 40px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #0078ff, transparent);
}

/* Header */

.menu-header {
  margin-bottom: 1.25rem;
  font-size: 0.65rem;
  letter-spacing: 0.35em;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
}

/* Grid */

.menu-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem 1rem;
}

/* Links */

.menu-grid a {
  text-decoration: none;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 128px;
  padding: 0.85rem 0.9rem 0.95rem;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.04);
  transition: 0.35s ease;
}

.menu-icon-badge {
  width: 42px;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  color: #8bbcff;
  transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
  animation: menuIconFloat 4.2s ease-in-out infinite;
}

.menu-icon-badge svg {
  width: 22px;
  height: 22px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.menu-grid strong {
  font-weight: 500;
  margin-bottom: 4px;
  font-size: 0.9rem;
  letter-spacing: 0.03em;
  line-height: 1.3;
}

.menu-grid small {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 0.05em;
  line-height: 1.45;
}

/* Hover Effect */

.menu-grid a:hover {
  transform: translateY(-4px);
  border-color: rgba(77, 163, 255, 0.12);
  background: rgba(255, 255, 255, 0.045);
}

.menu-grid a:hover .menu-icon-badge {
  transform: translateY(-4px) scale(1.06);
  border-color: rgba(77, 163, 255, 0.25);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.18);
}

.menu-grid a:hover strong {
  color: #4da3ff;
}

.menu-grid a:hover small {
  color: rgba(255, 255, 255, 0.7);
}

/* Animation */

@keyframes fadeElegant {
  from {
    opacity: 0;
    transform: translate(-50%, 15px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

@keyframes menuIconFloat {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
}

@media (max-width: 1200px) {
  .elegant-menu {
    width: min(920px, calc(100vw - 40px));
    padding: 1.8rem 1.8rem;
  }

  .menu-grid {
    gap: 0.9rem;
  }

  .menu-grid a {
    min-height: 120px;
    padding: 0.8rem;
  }
}

@media (max-width: 900px) {
  .elegant-menu {
    width: min(720px, calc(100vw - 32px));
  }

  .menu-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
/* ===== MOBILE PROFESSIONAL PANEL ===== */

.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  opacity: 0;
  visibility: hidden;
  transition: 0.4s ease;
  z-index: 9998;
}

.mobile-overlay.active {
  opacity: 1;
  visibility: visible;
}

.mobile-panel {
  position: fixed;
  top: 0;
  right: -420px;
  width: 380px;
  height: 100vh;
  background:
    radial-gradient(circle at top right, rgba(77, 163, 255, 0.08), transparent 22%),
    linear-gradient(180deg, #05101d 0%, #081728 100%);
  padding: 1.4rem 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  transition: 0.45s cubic-bezier(0.77, 0, 0.18, 1);
  z-index: 9999;
  box-shadow: -20px 0 60px rgba(0, 0, 0, 0.5);
}

.mobile-panel.active {
  right: 0;
}

.mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 0.35rem 0 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.mobile-locale {
  display: grid;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.mobile-locale-switcher {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.mobile-locale-switcher__button {
  min-height: 48px;
  padding: 0.9rem 1rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.76rem;
  font-weight: 600;
}

.mobile-locale-switcher__button.active {
  color: #d4af37;
  border-color: rgba(212, 175, 55, 0.38);
  background: rgba(212, 175, 55, 0.1);
}

.mobile-brand {
  display: flex;
  align-items: center;
  gap: 0.9rem;
}

.mobile-header img {
  height: 44px;
}

.mobile-brand-copy {
  display: flex;
  flex-direction: column;
}

.mobile-brand-copy span {
  color: white;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.mobile-brand-copy small,
.mobile-kicker {
  color: rgba(255, 255, 255, 0.46);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 0.66rem;
}

.mobile-close {
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  cursor: pointer;
}

.mobile-close span {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 16px;
  height: 1.5px;
  background: white;
}

.mobile-close span:first-child {
  transform: translate(-50%, -50%) rotate(45deg);
}

.mobile-close span:last-child {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 1;
  overflow-y: auto;
  padding-right: 0.2rem;
}

.mobile-nav-section {
  display: grid;
  gap: 0.45rem;
  padding: 1rem 0;
}

.mobile-nav a {
  color: #ffffff;
  text-decoration: none;
  font-size: 0.96rem;
  letter-spacing: 0.03em;
  font-weight: 500;
  transition: 0.25s ease;
  padding: 0.85rem 0.95rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid transparent;
}

.mobile-nav a:hover {
  color: white;
  transform: translateX(4px);
  border-color: rgba(123, 183, 255, 0.18);
  background: rgba(255, 255, 255, 0.05);
}

.mobile-nav a.router-link-active,
.mobile-nav a.router-link-exact-active {
  color: #d4af37;
  border-color: rgba(212, 175, 55, 0.3);
  background: rgba(212, 175, 55, 0.08);
}

.mobile-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 0.1rem 0;
}

.mobile-cta {
  display: grid;
  gap: 0.7rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.mobile-cta-primary,
.mobile-cta-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  text-decoration: none;
  border-radius: 16px;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
}

.mobile-cta-primary {
  background: linear-gradient(135deg, #d4af37, #f1d88a);
  color: #08111d;
  font-weight: 700;
}

.mobile-cta-secondary {
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
}

/* RESPONSIVE */

@media (max-width: 1024px) {
  .nav {
    display: none;
  }

  .locale-switcher {
    display: none;
  }

  .hamburger {
    display: flex;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    width: 44px;
    height: 44px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .hamburger span {
    width: 26px;
    height: 2px;
    background: white;
    transition: 0.3s;
  }
}

@media (max-width: 480px) {
  .mobile-panel {
    width: min(100vw, 360px);
    padding: 1rem;
  }

  .header-inner {
    padding: 0 1rem;
  }

  .mobile-locale-switcher {
    grid-template-columns: 1fr;
  }
}
</style>
