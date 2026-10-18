<template>
  <slot v-if="isNestedLayout" />

  <div v-else class="layout-wrapper" :class="{ 'layout-wrapper--request': route.name === 'ServiceRequest' }">
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
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10000;
  background: transparent;
}

.header.scrolled {
  background: rgba(10, 20, 30, 0.95);
}

.whatsapp-float {
  position: fixed;
  bottom: 25px;
  right: 25px;
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  z-index: 9999;
}

.whatsapp-icon {
  width: 60px;
  height: 60px;
  background: #25d366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  transition: 0.3s ease;
  animation: floatPulse 2.5s infinite;
}

@keyframes floatPulse {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-4px);
  }

  100% {
    transform: translateY(0);
  }
}

.whatsapp-text {
  background: linear-gradient(135deg, #1e40ff, #2736c9);
  color: white;
  padding: 12px 22px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.5px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
  transition: 0.3s ease;
}

.whatsapp-float:hover .whatsapp-icon {
  transform: scale(1.1);
}

.whatsapp-float:hover .whatsapp-text {
  transform: translateX(4px);
}

.layout-wrapper--request .whatsapp-float {
  position: fixed;
  right: clamp(14px, 2vw, 26px);
  bottom: calc(18px + env(safe-area-inset-bottom, 0px));
  width: max-content;
  margin: 0;
  gap: 8px;
  z-index: 9999;
  animation: whatsapp-reveal 450ms cubic-bezier(.2,.75,.25,1) both;
}

@keyframes whatsapp-reveal {
  from { opacity: 0; translate: 0 10px; }
  to { opacity: 1; translate: 0 0; }
}

.layout-wrapper--request .whatsapp-icon {
  width: 48px;
  height: 48px;
}

.layout-wrapper--request .whatsapp-icon svg {
  width: 23px;
  height: 23px;
}

.layout-wrapper--request .whatsapp-text {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  min-height: 48px;
  padding: 0 18px;
  border: 1px solid #c49a55;
  background: linear-gradient(110deg, #174fbd 0%, #0b2a68 100%);
  color: #fff;
  font-size: 13px;
  line-height: 1;
  box-shadow: 0 8px 22px rgba(3, 14, 35, .25), inset 0 0 0 1px rgba(255,255,255,.06);
  transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease, background 220ms ease;
}

.layout-wrapper--request .quote-action {
  position: relative;
  display: block;
  overflow: visible;
}

.layout-wrapper--request .aircraft-flight {
  position: absolute;
  z-index: 2;
  left: 5px;
  right: 5px;
  bottom: calc(100% + 34px);
  height: 28px;
  overflow: visible;
  pointer-events: none;
}

.layout-wrapper--request .aircraft-flight__plane {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 36px;
  height: 36px;
  color: #f0d08c;
  filter: drop-shadow(0 2px 5px rgba(216,180,125,.34));
  opacity: 0;
  transform-origin: center;
  animation: aircraft-quote-flight 6s ease-in-out infinite;
}

.layout-wrapper--request .aircraft-flight__plane svg {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;
  transform: rotate(90deg);
}

.layout-wrapper--request .aircraft-flight__trail {
  position: absolute;
  top: 49%;
  left: -22px;
  width: 25px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(240,208,140,.6));
  transform: rotate(-4deg);
}

@keyframes aircraft-quote-flight {
  0%, 8% { opacity: 0; transform: translate3d(0, 6px, 0) rotate(-2deg); }
  18% { opacity: 1; }
  72% { opacity: 1; }
  90%, 100% { opacity: 0; transform: translate3d(clamp(70px, 8.3vw, 120px), -5px, 0) rotate(1deg); }
}

.layout-wrapper--request .whatsapp-arrow {
  flex: 0 0 auto;
  color: #f0d08c;
  transition: transform 220ms ease;
}

.layout-wrapper--request .whatsapp-float:hover .whatsapp-text {
  transform: translateX(2px);
  border-color: #e2bd73;
  background: linear-gradient(110deg, #1c5bd2 0%, #10367f 100%);
  box-shadow: 0 10px 26px rgba(3, 14, 35, .32), 0 0 16px rgba(196,154,85,.18);
}

.layout-wrapper--request .whatsapp-float:hover .whatsapp-arrow {
  transform: translateX(3px);
}

.layout-wrapper--request .whatsapp-icon {
  animation: none;
}

.layout-wrapper.layout-wrapper--request .trade-footer__inner {
  justify-content: flex-start;
  gap: 24px;
}

@media (max-width: 1100px) {
  .layout-wrapper--request .whatsapp-text {
    display: inline-flex;
    min-height: 42px;
    gap: 8px;
    padding-inline: 12px;
    font-size: 11px;
  }

  .layout-wrapper--request .whatsapp-float {
    right: 12px;
    bottom: calc(12px + env(safe-area-inset-bottom, 0px));
  }

  .layout-wrapper--request .whatsapp-icon {
    width: 40px;
    height: 40px;
  }

  .layout-wrapper--request .whatsapp-icon svg {
    width: 22px;
    height: 22px;
  }

  .layout-wrapper--request .aircraft-flight__plane {
    width: 28px;
    height: 28px;
  }
}

@media (max-width: 768px) {
  .whatsapp-float {
    right: 15px;
    bottom: 20px;
  }

  .whatsapp-text {
    display: none;
  }

  .layout-wrapper--request .whatsapp-text {
    display: none;
  }

  .layout-wrapper--request .aircraft-flight {
    display: none;
  }

  .layout-wrapper--request .whatsapp-float {
    position: fixed;
    right: 15px;
    bottom: calc(15px + env(safe-area-inset-bottom, 0px));
    z-index: 9999;
  }

  .layout-wrapper--request .whatsapp-icon {
    animation: whatsapp-mobile-float 2.8s ease-in-out infinite;
  }
}

@keyframes whatsapp-mobile-float {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, -4px, 0); }
}

@media (max-width: 600px) {
  .layout-wrapper--request .whatsapp-float {
    right: 8px;
    bottom: calc(8px + env(safe-area-inset-bottom, 0px));
  }

  .layout-wrapper--request .whatsapp-icon {
    width: 40px;
    height: 40px;
  }

  .layout-wrapper--request .whatsapp-icon svg {
    width: 24px;
    height: 24px;
  }

  .layout-wrapper--request .whatsapp-text {
    min-height: 38px;
    gap: 5px;
    padding-inline: 9px;
    font-size: 10px;
  }

  .layout-wrapper--request .whatsapp-arrow {
    width: 15px;
    height: 15px;
  }

  .layout-wrapper--request .aircraft-flight__plane {
    width: 25px;
    height: 25px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .layout-wrapper--request .whatsapp-float { animation: none !important; }
  .layout-wrapper--request .whatsapp-icon { animation: none !important; }
  .layout-wrapper--request .aircraft-flight__plane { animation: none; opacity: 1; transform: translate3d(0, 2px, 0) rotate(-2deg); }
  .layout-wrapper--request .aircraft-flight__trail { opacity: .35; }
}
</style>
