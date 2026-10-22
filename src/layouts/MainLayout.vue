<template>
  <slot v-if="isNestedLayout" />

  <div v-else class="layout-wrapper" :class="{ 'layout-wrapper--request': route.name === 'ServiceRequest', 'layout-wrapper--bottom-nav': !isAircraftTradeLanding }">
    <AircraftTradeHeader v-if="isAircraftTradeLanding" />
    <AppHeader v-else />

    <main class="main-content">
      <slot />
    </main>

    <AircraftTradeFooter v-if="isAircraftTradeLanding" />
    <AppFooter v-else />

    <a
      v-if="!route.meta.standalone"
      href="https://wa.me/525586186576?text=Hola,%20quiero%20cotizar%20un%20vuelo%20privado.%20Podrian%20darme%20informacion%3F"
      target="_blank"
      rel="noopener noreferrer"
      class="whatsapp-float"
      :aria-label="locale === 'en' ? 'Contact Sky Group on WhatsApp' : 'Contactar a Sky Group por WhatsApp'"
    >
      <div class="whatsapp-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="28"
          height="28"
          fill="white"
        >
          <path
            d="M16 0C7.164 0 0 7.163 0 16c0 2.82.74 5.574 2.147 8.005L0 32l8.207-2.123A15.93 15.93 0 0016 32c8.836 0 16-7.163 16-16S24.836 0 16 0zm0 29.333c-2.6 0-5.147-.69-7.36-2l-.527-.312-4.867 1.26 1.298-4.74-.343-.547A13.284 13.284 0 012.667 16C2.667 8.64 8.64 2.667 16 2.667S29.333 8.64 29.333 16 23.36 29.333 16 29.333zm7.387-10.08c-.403-.202-2.383-1.176-2.75-1.31-.367-.134-.634-.202-.902.202-.268.403-1.036 1.31-1.27 1.578-.233.268-.467.302-.87.1-.403-.202-1.7-.626-3.24-1.996-1.197-1.067-2.005-2.385-2.24-2.788-.233-.403-.025-.62.177-.822.182-.181.403-.467.605-.7.202-.233.268-.403.403-.67.134-.268.067-.503-.034-.705-.1-.202-.902-2.176-1.236-2.98-.326-.784-.657-.677-.902-.69l-.768-.013c-.268 0-.705.1-1.075.503-.37.403-1.41 1.378-1.41 3.36 0 1.983 1.443 3.9 1.645 4.167.202.268 2.84 4.34 6.884 6.085.962.415 1.71.663 2.295.848.964.306 1.842.263 2.536.16.774-.116 2.383-.974 2.718-1.916.335-.943.335-1.75.233-1.916-.1-.167-.367-.268-.77-.47z"
          />
        </svg>
      </div>

      <span class="quote-action">
        <span class="aircraft-flight" aria-hidden="true">
          <span class="aircraft-flight__plane">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9L2 14v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5L21 16z" />
            </svg>
            <span class="aircraft-flight__trail"></span>
          </span>
        </span>
        <span class="whatsapp-text">
          <span>{{ locale === "en" ? "Get a quote now!" : "Cotiza ahora" }}</span>
          <ArrowRight class="whatsapp-arrow" :size="18" :stroke-width="2" aria-hidden="true" />
        </span>
      </span>
    </a>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed, inject, provide } from "vue";
import { ArrowRight } from "lucide-vue-next";
import { useLocale } from "../i18n";
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";
import AircraftTradeHeader from "../components/aircraft-sales/AircraftTradeHeader.vue";
import AircraftTradeFooter from "../components/aircraft-sales/AircraftTradeFooter.vue";

const route = useRoute();
const isAircraftTradeLanding = computed(() =>
  route.name === 'ServiceRequest' || Boolean(route.meta.aircraftPage) || ['/compra-venta-aeronaves', '/vender-aeronave', '/comprar-aeronave'].includes(route.path.replace(/\/+$/, ''))
);
const isNestedLayout = inject("has-main-layout", false);
const { locale } = useLocale();

provide("has-main-layout", true);
</script>

<style>
.header { position: fixed; top: 0; left: 0; width: 100%; z-index: 10000; background: transparent; }
.whatsapp-float {
  position: fixed;
  right: 24px;
  bottom: calc(24px + env(safe-area-inset-bottom, 0px));
  display: flex;
  align-items: center;
  gap: 10px;
  width: max-content;
  max-width: calc(100vw - 32px);
  text-decoration: none;
  z-index: 9999;
}
.whatsapp-icon {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #25d366;
  box-shadow: 0 8px 22px rgba(3,14,35,.2);
}
.whatsapp-icon svg { width: 26px; height: 26px; }
.quote-action { position: relative; display: block; min-width: 0; }
.whatsapp-text {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  min-height: 52px;
  padding: 0 20px;
  border: 1px solid #d4af6a;
  border-radius: 999px;
  background: linear-gradient(110deg,#174fbd,#0b2a68);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.3;
  white-space: nowrap;
  box-shadow: 0 8px 22px rgba(3,14,35,.2);
  transition: background 220ms ease, border-color 220ms ease;
}
.whatsapp-arrow { flex-shrink: 0; color: #f0d08c; transition: transform 220ms ease; }
.whatsapp-float:hover .whatsapp-text { border-color: #f0d08c; background: linear-gradient(110deg,#1c5bd2,#10367f); }
.whatsapp-float:hover .whatsapp-arrow { transform: translateX(3px); }
.whatsapp-float:focus-visible { outline: 2px solid #d4af6a; outline-offset: 5px; border-radius: 999px; }
.aircraft-flight { position: absolute; left: 16px; right: 16px; bottom: calc(100% + 24px); height: 30px; pointer-events: none; }
.aircraft-flight__plane { position: absolute; left: 0; top: 0; width: 32px; height: 32px; color: #f0d08c; filter: drop-shadow(0 2px 5px rgba(216,180,125,.3)); animation: aircraft-quote-flight 6s ease-in-out infinite; }
.aircraft-flight__plane svg { position: relative; z-index: 1; display: block; width: 100%; height: 100%; transform: rotate(90deg); }
.aircraft-flight__trail { position: absolute; top: 49%; left: -22px; width: 25px; height: 1px; background: linear-gradient(90deg,transparent,rgba(240,208,140,.6)); }
@keyframes aircraft-quote-flight {
  0%, 100% { transform: translate3d(0,2px,0); }
  50% { transform: translate3d(70px,-5px,0); }
}
.layout-wrapper.layout-wrapper--request .trade-footer__inner { justify-content: flex-start; gap: 24px; }
@media(max-width:767px) {
  .whatsapp-float .quote-action { display: none; }
  .whatsapp-float { right: 16px; bottom: calc(16px + env(safe-area-inset-bottom,0px)); gap: 10px; }
  .whatsapp-icon { width: 48px; height: 48px; }
  .whatsapp-icon svg { width: 24px; height: 24px; }
  .whatsapp-text { min-height: 48px; padding-inline: 18px; gap: 16px; font-size: 13px; }
  .aircraft-flight__plane { width: 28px; height: 28px; }
  .layout-wrapper--bottom-nav { padding-bottom: calc(84px + env(safe-area-inset-bottom,0px)); }
  .layout-wrapper--bottom-nav .whatsapp-float { bottom: calc(84px + env(safe-area-inset-bottom,0px)); }
}
@media(prefers-reduced-motion:reduce) {
  .aircraft-flight__plane { animation: none; }
  .whatsapp-text, .whatsapp-arrow { transition: none; }
}
</style>
