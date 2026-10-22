<template>
  <header class="header sky-header" :class="{ 'desktop-hidden': headerHidden, 'header-solid': route.name !== 'Home' }" @focusin="headerHidden = false">
    <div class="header-inner">
      <RouterLink :to="toLocalizedRoute('Home')" class="brand" aria-label="Sky Group"><img src="/images/logoo.png" alt="Sky Group Aviation" width="238" height="159" /></RouterLink>
      <nav class="desktop-nav" :aria-label="english ? 'Main navigation' : 'Navegación principal'">
        <RouterLink v-for="item in primaryLinks.slice(0, 2)" :key="item.name" :to="item.to" class="desktop-link">{{ item.label }}</RouterLink>
        <div ref="desktopServices" class="desktop-services" @mouseenter="openDesktopServices" @mouseleave="scheduleDesktopClose" @focusout="onDesktopFocusOut">
          <button ref="desktopServicesButton" type="button" class="desktop-link" :class="{ active: serviceActive }" :aria-expanded="desktopServicesOpen" aria-controls="desktop-services-panel" @click="desktopServicesOpen = !desktopServicesOpen" @keydown.down.prevent="focusDesktopService">{{ headerContent.services }}<ChevronDown :size="14" aria-hidden="true" /></button>
          <Transition name="desktop-menu"><div v-if="desktopServicesOpen" id="desktop-services-panel" class="desktop-services-panel">
            <section v-for="group in serviceGroups" :key="group.title"><h2>{{ group.title }}</h2><RouterLink v-for="item in group.items" :key="item.name" :to="item.to" class="desktop-service-link" @click="desktopServicesOpen = false"><component :is="item.icon" :size="20" :stroke-width="1.5" aria-hidden="true" /><span>{{ item.label }}</span></RouterLink></section>
          </div></Transition>
        </div>
        <RouterLink v-for="item in primaryLinks.slice(2)" :key="item.name" :to="item.to" class="desktop-link">{{ item.name === 'Blog' ? headerContent.blog : item.label }}</RouterLink>
      </nav>
      <div class="header-actions">
        <RouterLink :to="toLocalizedRoute('Contact')" class="header-contact">{{ headerContent.contact }}</RouterLink>
        <LocaleSwitcher compact :change-language="changeLanguage" />
        <button type="button" class="menu-trigger" :aria-label="english ? 'Open navigation' : 'Abrir navegación'" :aria-expanded="isMenuOpen" aria-controls="sky-navigation" aria-haspopup="dialog" @click="isMenuOpen = true"><Menu :size="24" :stroke-width="1.5" aria-hidden="true" /><span>{{ english ? 'Menu' : 'Menú' }}</span></button>
      </div>
    </div>
  </header>
  <nav class="mobile-bottom-nav" :aria-label="english ? 'Quick navigation' : 'Navegación rápida'">
    <RouterLink :to="toLocalizedRoute('Home')" class="bottom-nav-item"><House :size="20" :stroke-width="1.5" aria-hidden="true" /><span>{{ english ? 'Home' : 'Inicio' }}</span></RouterLink>
    <RouterLink :to="toLocalizedRoute('AircraftSales')" class="bottom-nav-item" :class="{ 'is-active': route.name === 'AircraftSalesDetail' }"><Plane :size="20" :stroke-width="1.5" aria-hidden="true" /><span>{{ english ? 'Aircraft' : 'Aeronaves' }}</span></RouterLink>
    <button type="button" class="bottom-nav-item" :class="{ 'is-active': isMenuOpen }" :aria-expanded="isMenuOpen" aria-controls="sky-navigation" aria-haspopup="dialog" @click="isMenuOpen = true"><Menu :size="20" :stroke-width="1.5" aria-hidden="true" /><span>{{ english ? 'Menu' : 'Menú' }}</span></button>
    <RouterLink :to="toLocalizedRoute('Contact')" class="bottom-nav-item"><Mail :size="20" :stroke-width="1.5" aria-hidden="true" /><span>{{ headerContent.contact }}</span></RouterLink>
  </nav>
  <NavigationDrawer v-model="isMenuOpen" :title="english ? 'Main navigation' : 'Navegación principal'" :close-label="headerContent.closeNavigation">
    <template #brand><RouterLink :to="toLocalizedRoute('Home')" class="brand" aria-label="Sky Group" @click="isMenuOpen = false"><img src="/images/logoo.png" alt="Sky Group Aviation" width="238" height="159" /></RouterLink><p class="brand-caption">PRIVATE AVIATION &amp; AIRCRAFT SERVICES</p></template>
    <nav :aria-label="english ? 'Main navigation' : 'Navegación principal'">
      <RouterLink v-for="item in primaryLinks.slice(0, 2)" :key="item.name" :to="item.to" class="drawer-link" @click="isMenuOpen = false"><component :is="item.icon" :size="20" :stroke-width="1.5" aria-hidden="true" /><span>{{ item.label }}</span></RouterLink>
      <button type="button" class="drawer-link services-toggle" :class="{ 'section-active': serviceActive }" :aria-expanded="isServicesExpanded" aria-controls="drawer-services" @click="isServicesExpanded = !isServicesExpanded"><BriefcaseBusiness :size="20" :stroke-width="1.5" aria-hidden="true" /><span>{{ headerContent.services }}</span><ChevronDown class="chevron" :class="{ rotated: isServicesExpanded }" :size="16" aria-hidden="true" /></button>
      <div v-show="isServicesExpanded" id="drawer-services" class="drawer-services"><RouterLink v-for="item in services" :key="item.name" :to="item.to" class="drawer-link service-link" @click="isMenuOpen = false"><component :is="item.icon" :size="18" :stroke-width="1.5" aria-hidden="true" /><span>{{ item.label }}</span></RouterLink></div>
      <RouterLink v-for="item in primaryLinks.slice(2)" :key="item.name" :to="item.to" class="drawer-link" @click="isMenuOpen = false"><component :is="item.icon" :size="20" :stroke-width="1.5" aria-hidden="true" /><span>{{ item.label }}</span></RouterLink>
    </nav>
    <template #footer><strong class="institution-name">SKY GROUP</strong><p class="institution-copy">Aviation Solutions &amp; Private Charter</p><RouterLink :to="toLocalizedRoute('AirTaxi')" class="quote-button" @click="isMenuOpen = false">{{ english ? 'REQUEST A FLIGHT QUOTE' : 'COTIZAR VUELO' }}<ArrowUpRight :size="18" aria-hidden="true" /></RouterLink></template>
  </NavigationDrawer>
</template>
<script setup>
import LocaleSwitcher from './LocaleSwitcher.vue';
import NavigationDrawer from './NavigationDrawer.vue';
import { ArrowUpRight, BadgeDollarSign, BookOpen, BriefcaseBusiness, Building2, ChevronDown, FileCheck2, Globe2, House, Mail, Menu, Plane, PlaneTakeoff, UsersRound, Wrench } from 'lucide-vue-next';
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useLocale } from '../i18n';
const route = useRoute();
const { locale, toLocalizedRoute, switchLocale } = useLocale();
const english = computed(() => locale.value === 'en');
const isMenuOpen = ref(false);
const desktopServicesOpen = ref(false);
const desktopServices = ref(null);
const desktopServicesButton = ref(null);
const headerHidden = ref(false);
let lastY = 0;
let desktopCloseTimer;
function openDesktopServices() { clearTimeout(desktopCloseTimer); desktopServicesOpen.value = true; }
function scheduleDesktopClose() { clearTimeout(desktopCloseTimer); desktopCloseTimer = setTimeout(() => { if (!desktopServices.value?.contains(document.activeElement)) desktopServicesOpen.value = false; }, 180); }
function onDesktopFocusOut(event) { if (!desktopServices.value?.contains(event.relatedTarget)) desktopServicesOpen.value = false; }
async function focusDesktopService() { openDesktopServices(); await nextTick(); desktopServices.value?.querySelector('a')?.focus(); }
function onPointerDown(event) { if (!desktopServices.value?.contains(event.target)) desktopServicesOpen.value = false; }
function onKeydown(event) { if (event.key === 'Escape' && desktopServicesOpen.value) { desktopServicesOpen.value = false; desktopServicesButton.value?.focus(); } }
function onScroll() {
  const y = Math.max(0, window.scrollY);
  const delta = y - lastY;
  if (y <= 40) headerHidden.value = false;
  else if (Math.abs(delta) >= 4 && !desktopServices.value?.contains(document.activeElement)) { headerHidden.value = delta > 0; if (headerHidden.value) desktopServicesOpen.value = false; }
  if (Math.abs(delta) >= 4 || y <= 40) lastY = y;
}
function onResize() { if (window.innerWidth > 1240) isMenuOpen.value = false; else desktopServicesOpen.value = false; }
onMounted(() => { lastY = window.scrollY; document.addEventListener('pointerdown', onPointerDown); document.addEventListener('keydown', onKeydown); window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onResize); });
onUnmounted(() => { clearTimeout(desktopCloseTimer); document.removeEventListener('pointerdown', onPointerDown); document.removeEventListener('keydown', onKeydown); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); });
const isServicesExpanded = ref(false);
const headerContent = computed(() =>
  locale.value === "en"
    ? {
        home: "Home",
        about: "About us",
        services: "Services",
        menuTitle: "Our Aviation Services",
        aircraftSales: "Aircraft Sales & Acquisitions",
        aircraftSalesDesc: "Sourcing, Valuation, and Transactions",
        airTaxi: "Executive Air Charter",
        airTaxiDesc: "Private Flights and Mission Support",
        operationsManagement: "Aircraft Management",
        operationsManagementDesc: "Compliance, Crew, and Oversight",
        prePurchase: "Pre-Purchase Advisory",
        prePurchaseDesc: "Due Diligence and Risk Review",
        importExport: "Import & Export",
        importExportDesc: "Cross-Border Asset Coordination",
        engineServices: "Engine Services",
        engineServicesDesc: "Programs, Logistics, and Technical Support",
        avionics: "Avionics",
        avionicsDesc: "Aircraft Systems and Modernization",
        fractionalOwnership: "Fractional Ownership",
        fractionalOwnershipDesc: "Structured Shared Access Programs",
        coOwnership: "Aircraft Co-Ownership",
        coOwnershipDesc: "Shared Equity and Governance Structure",
        blog: "Aviation guide",
        contact: "Contact",
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
        contactSkyGroup: "Speak with an Advisor",
        whatsappQuote: "WhatsApp Quote",
      }
    : {
        home: "Inicio",
        about: "Nosotros",
        services: "Servicios",
        menuTitle: "Nuestros servicios aeronáuticos",
        aircraftSales: "Venta y adquisición de aeronaves",
        aircraftSalesDesc: "Búsqueda, valuación y transacción",
        airTaxi: "Vuelos privados",
        airTaxiDesc: "Vuelos privados y coordinación de misión",
        operationsManagement: "Servicios aeronáuticos",
        operationsManagementDesc: "Cumplimiento, tripulacion y supervision",
        prePurchase: "Asesoría precompra",
        prePurchaseDesc: "Debida diligencia y revisión de riesgos",
        importExport: "Importación y exportación",
        importExportDesc: "Coordinacion aeronautica transfronteriza",
        engineServices: "Servicios de motores",
        engineServicesDesc: "Programas, logística y soporte técnico",
        avionics: "Avionica",
        avionicsDesc: "Sistemas de aeronaves y modernización",
        fractionalOwnership: "Propiedad fraccional",
        fractionalOwnershipDesc: "Programas estructurados de acceso compartido",
        coOwnership: "Copropiedad de aeronaves",
        coOwnershipDesc: "Capital compartido y estructura de gobernanza",
        blog: "Guía de aviación",
        contact: "Contacto",
        mobileBrand: "Servicios de aviación privada",
        changeLanguage: "Cambiar idioma",
        closeNavigation: "Cerrar navegación",
        overview: "General",
        homeTitle: "Inicio",
        aboutTitle: "Nosotros",
        blogTitle: "Guía de aviación privada",
        aircraftAdvisory: "Asesoría de aeronaves",
        operationsTechnical: "Operaciones y soporte técnico",
        avionicsMobile: "Aviónica y sistemas",
        contactSkyGroup: "Hablar con un asesor",
        whatsappQuote: "Cotizar por WhatsApp",
      }
);


const primaryLinks = computed(() => [
  { name: 'Home', icon: House, label: headerContent.value.home },
  { name: 'AboutUs', icon: Building2, label: headerContent.value.about },
  { name: 'Blog', icon: BookOpen, label: english.value ? 'Private aviation guide' : 'Guía de aviación privada' },
  { name: 'Contact', icon: Mail, label: headerContent.value.contact },
].map(item => ({ ...item, to: toLocalizedRoute(item.name) })));
const serviceGroups = computed(() => [
  { title: english.value ? 'Aircraft & operations' : 'Aeronaves y operaciones', items: [
    { name: 'AircraftSales', icon: Plane, label: headerContent.value.aircraftSales },
    { name: 'sell', icon: BadgeDollarSign, label: english.value ? 'Sell your aircraft' : 'Vende tu aeronave', to: '/vender-aeronave' },
    { name: 'AirTaxi', icon: PlaneTakeoff, label: headerContent.value.airTaxi },
    { name: 'OperationsManagement', icon: BriefcaseBusiness, label: headerContent.value.operationsManagement },
  ] },
  { title: english.value ? 'Specialist services' : 'Servicios especializados', items: [
    { name: 'PrePurchaseInspection', icon: FileCheck2, label: headerContent.value.prePurchase },
    { name: 'ImportExport', icon: Globe2, label: headerContent.value.importExport },
    { name: 'EngineShop', icon: Wrench, label: headerContent.value.engineServices },
    { name: 'CoOwnership', icon: UsersRound, label: headerContent.value.coOwnership },
  ] },
].map(group => ({ ...group, items: group.items.map(item => ({ ...item, to: item.to || toLocalizedRoute(item.name) })) })));

const services = computed(() => serviceGroups.value.flatMap(group => group.items));
const serviceActive = computed(() => services.value.some(item => item.name === route.name) || ['AircraftSalesDetail', 'Avionics', 'FractionalOwnership'].includes(route.name));
function changeLanguage(value) { isMenuOpen.value = false; if (locale.value !== value) switchLocale(value); }
watch(() => route.fullPath, () => { isMenuOpen.value = false; desktopServicesOpen.value = false; headerHidden.value = false; });
watch(isMenuOpen, value => { if (value) isServicesExpanded.value = serviceActive.value; });
</script>
<style scoped>
.mobile-bottom-nav, .desktop-nav { display: none; }
.desktop-menu-enter-active, .desktop-menu-leave-active { transition: opacity 180ms ease, translate 180ms ease; }
.desktop-menu-enter-from, .desktop-menu-leave-to { opacity: 0; translate: 0 -6px; }
.header.sky-header { position: fixed; inset: 0 0 auto; z-index: 10000; height: 84px; color: #fff; background: rgba(7,19,35,.88); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-bottom: 1px solid rgba(212,175,106,.12); }
.header-inner { max-width: 1800px; height: 100%; margin: auto; padding-inline: clamp(20px,4vw,72px); display: flex; align-items: center; justify-content: space-between; gap: 20px; }
.brand { position: relative; display: block; width: 175px; height: 64px; flex-shrink: 0; overflow: hidden; }
.brand img { position: absolute; left: 50%; top: 50%; width: 238px; max-width: none; height: 159px; object-fit: contain; transform: translate(-50%,-50%); filter: brightness(0) invert(1); }
.header-actions { display: flex; align-items: center; gap: 28px; }
.header-contact { color: #fff; text-decoration: none; font-size: 14px; padding-block: 14px; }
.menu-trigger { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-width: 44px; min-height: 44px; padding: 0; border: 0; background: transparent; color: #fff; cursor: pointer; font: 400 14px var(--font-body,sans-serif); }
.header-actions :deep(.locale-switcher) { display: inline-flex; padding: 0; gap: 4px; border: 0; background: transparent; backdrop-filter: none; }
.header-actions :deep(.locale-switcher::before) { display: none; }
.header-actions :deep(.locale-switcher__button) { width: 44px; height: 44px; border: 0; border-radius: 0; font-size: 12px; font-weight: 400; letter-spacing: .06em; color: #c7d3df; }
.header-actions :deep(.locale-switcher__button.active) { color: #d4af6a; }
.header-actions :deep(.locale-switcher__button + .locale-switcher__button)::before { content: '/'; position: absolute; margin-left: -13px; color: #c7d3df; }
.brand-caption { max-width: 250px; margin-top: 8px; color: #c7d3df; font-size: 9px; letter-spacing: .15em; line-height: 1.6; }
.drawer-link { position: relative; display: flex; align-items: center; gap: 14px; width: 100%; min-height: 50px; padding: 12px 14px; border: 0; border-radius: 4px; background: transparent; color: #fff; font: 400 15px/1.5 var(--font-body,sans-serif); text-align: left; text-decoration: none; cursor: pointer; transition: background-color 180ms ease,color 180ms ease; }
.drawer-link svg { flex-shrink: 0; color: #c7d3df; }
.drawer-link span { flex: 1; }
.drawer-link:hover { background: rgba(255,255,255,.06); color: #d4af6a; }
.drawer-link.router-link-exact-active, .drawer-link.section-active { color: #d4af6a; }
.drawer-link.router-link-exact-active::before, .drawer-link.section-active::before { content: ''; position: absolute; left: 0; top: 12px; bottom: 12px; width: 2px; background: #d4af6a; }
.drawer-link.router-link-exact-active svg, .drawer-link.section-active svg { color: #d4af6a; }
.chevron { transition: transform 200ms ease; }
.rotated { transform: rotate(180deg); }
.drawer-services { padding: 4px 0 12px 16px; }
.service-link { font-size: 14px; min-height: 46px; gap: 12px; }
.institution-name { color: #fff; font-size: 12px; font-weight: 500; letter-spacing: .18em; }
.institution-copy { color: #c7d3df; font-size: 12px; line-height: 1.6; margin: 8px 0 20px; }
.quote-button { display: flex; align-items: center; justify-content: space-between; gap: 10px; min-height: 48px; padding: 12px 16px; border: 1px solid #d4af6a; border-radius: 3px; background: #d4af6a; color: #071323; text-decoration: none; font-size: 11px; font-weight: 600; letter-spacing: .08em; }
.quote-button:hover { background: #e2c38b; }
:where(a,button):focus-visible { outline: 2px solid #d4af6a; outline-offset: 3px; }
@media (min-width: 1241px) {
  .header.sky-header { height: 96px; background: rgba(7,19,35,.28); border: 0; backdrop-filter: blur(8px); transition: transform 200ms ease; }
  .header.sky-header.header-solid { background: #071323; }
  .header.sky-header.desktop-hidden { transform: translateY(-100%); }
  .header-actions .header-contact, .header-actions .menu-trigger { display: none; }
  .desktop-nav { display: flex; flex: 1; justify-content: space-evenly; align-items: center; height: 100%; gap: 24px; }
  .desktop-link { position: relative; display: inline-flex; align-items: center; gap: 10px; min-height: 48px; padding: 0; border: 0; background: transparent; color: #fff; text-decoration: none; white-space: nowrap; font: 400 clamp(14px,1.2vw,19px) var(--font-body); cursor: pointer; }
  .desktop-link.router-link-exact-active::after, .desktop-link.active::after { content: ''; position: absolute; bottom: -3px; left: -4px; right: -4px; height: 2px; background: #d4af6a; }
  .desktop-services { display: flex; align-items: center; height: 100%; }
  .desktop-services-panel { position: absolute; top: 100%; left: 50%; transform: translateX(-50%); width: min(760px,calc(100vw - 48px)); padding: 30px 36px; display: grid; grid-template-columns: 1fr 1fr; gap: 36px; background: rgba(7,19,35,.97); border: 1px solid rgba(255,255,255,.08); border-radius: 0 0 8px 8px; }
  .desktop-services-panel h2 { font: 400 12px var(--font-body); color: #c7d3df; margin-bottom: 16px; }
  .desktop-service-link { display: flex; align-items: center; gap: 12px; min-height: 48px; color: #fff; text-decoration: none; font-size: 14px; line-height: 1.5; }
  .desktop-service-link svg { flex-shrink: 0; color: #d4af6a; }
  .desktop-link:hover, .desktop-service-link:hover { color: #d4af6a; }
  .header-actions :deep(.locale-switcher) { border-left: 1px solid rgba(255,255,255,.3); border-radius: 0; padding-left: 24px; }
}

@media(max-width:767px) { .header.sky-header { height: calc(88px + env(safe-area-inset-top, 0px)); padding-top: calc(20px + env(safe-area-inset-top, 0px)); } .header-inner { padding-inline: 16px; gap: 12px; } .header-actions { gap: 8px; } .header-contact, .menu-trigger span { display: none; } .brand { width: 135px; height: 54px; } .brand img { width: 184px; height: 123px; } }
@media(max-width:767px) {
  .mobile-bottom-nav { position: fixed; z-index: 10001; left: 50%; bottom: calc(12px + env(safe-area-inset-bottom, 0px)); transform: translateX(-50%); display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); align-items: center; width: calc(100% - 32px); max-width: 420px; height: 60px; padding: 4px 8px; border-radius: 22px; background: #091b2f; box-shadow: 0 5px 20px rgba(0,0,0,.2); }
  .bottom-nav-item { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; min-width: 44px; min-height: 44px; height: 52px; padding: 0; border: 0; background: transparent; color: #fff; text-decoration: none; font: 400 10px/1.2 var(--font-body,sans-serif); cursor: pointer; }
  .bottom-nav-item svg { flex-shrink: 0; }
  .bottom-nav-item.router-link-exact-active, .bottom-nav-item.is-active { color: #d4af6a; }
  .bottom-nav-item:focus-visible { outline-offset: 0; border-radius: 12px; }
}
@media(max-width:359px) { .header-inner { padding-inline: 12px; } .header-actions { gap: 0; } .header-inner > .brand { width: 112px; } .header-inner > .brand img { width: 152px; height: 101px; } }
@media(prefers-reduced-motion:reduce) { *, *::before { transition: none !important; } }
</style>
