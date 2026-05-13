<template>
  <slot v-if="isNestedLayout" />

  <div v-else class="layout-wrapper">
    <AppHeader />

    <main class="main-content">
      <slot />
    </main>

    <AppFooter />

    <a
      href="https://wa.me/525586186576?text=Hola,%20quiero%20cotizar%20un%20vuelo%20privado.%20Podrian%20darme%20informacion%3F"
      target="_blank"
      rel="noopener noreferrer"
      class="whatsapp-float"
      :aria-label="locale.value === 'en' ? 'Contact Sky Group on WhatsApp' : 'Contactar a Sky Group por WhatsApp'"
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

      <span class="whatsapp-text">{{ locale.value === "en" ? "Get a quote now!" : "Cotiza ahora" }}</span>
    </a>
  </div>
</template>

<script setup>
import { inject, provide } from "vue";
import { useLocale } from "../i18n";
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";

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

@media (max-width: 768px) {
  .whatsapp-float {
    right: 15px;
    bottom: 20px;
  }

  .whatsapp-text {
    display: none;
  }
}
</style>
