<script setup>
import { useLocale } from '../../i18n';
const { isEnglish, toLocalizedRoute } = useLocale();
const year = new Date().getFullYear();
</script>

<template>
  <footer class="trade-footer">
    <div class="trade-footer__inner">
      <small>© {{ year }} Sky Group Aviation. {{ isEnglish ? 'All rights reserved.' : 'Todos los derechos reservados.' }}</small>
      <nav :aria-label="isEnglish ? 'Legal information' : 'Información legal'">
        <RouterLink :to="toLocalizedRoute('Privacy')">{{ isEnglish ? 'Privacy' : 'Privacidad' }}</RouterLink>
        <RouterLink :to="toLocalizedRoute('Terms')">{{ isEnglish ? 'Terms' : 'Términos' }}</RouterLink>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.trade-footer { padding: 24px 0; background: #061526; color: #c7d0da; }
.trade-footer__inner { display: flex; align-items: center; justify-content: space-between; gap: 16px; width: min(1360px, calc(100% - 80px)); margin-inline: auto; }
.trade-footer small, .trade-footer a { font-size: 13px; line-height: 1.6; }
.trade-footer nav { display: flex; flex-wrap: wrap; gap: 20px; }
.trade-footer a { color: #d9bf98; text-underline-offset: 4px; }
.trade-footer a:focus-visible { outline: 2px solid #c59b61; outline-offset: 4px; }
@media (min-width: 768px) and (max-width: 1024px) { .trade-footer__inner { width: calc(100% - 64px); } }
@media (max-width: 767px) { .trade-footer__inner { width: calc(100% - 36px); flex-direction: column; align-items: flex-start; gap: 12px; } }
</style>
