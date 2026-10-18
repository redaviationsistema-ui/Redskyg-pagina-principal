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
         </nav>
    </div>
  </footer>
</template>

<style scoped>
.trade-footer { padding: 24px 0; background: #061526; color: #c7d0da; }
.trade-footer__inner { display: flex; align-items: center; justify-content: space-between; gap: 16px; width: min(1360px, calc(100% - 80px)); margin-inline: auto; }
.trade-footer small, .trade-footer a { font-size: 13px; line-height: 1.6; }
.trade-footer nav { display: flex; flex-wrap: wrap; gap: 20px; }
.trade-footer a { position: relative; display: inline-flex; align-items: center; min-height: 44px; color: #d9bf98; text-decoration: none; transition: color 250ms; }
.trade-footer a::after { content: ''; position: absolute; left: 0; right: 0; bottom: 9px; height: 1px; background: currentColor; transform: scaleX(.25); transform-origin: left; transition: transform 250ms; }
.trade-footer a:hover, .trade-footer a:focus-visible { color: #f0d5ad; }
.trade-footer a:hover::after, .trade-footer a:focus-visible::after { transform: scaleX(1); }
@media (prefers-reduced-motion: reduce) { .trade-footer a, .trade-footer a::after { transition: none; } }
.trade-footer a:focus-visible { outline: 2px solid #c59b61; outline-offset: 4px; }
@media (min-width: 768px) and (max-width: 1024px) { .trade-footer__inner { width: calc(100% - 64px); } }
@media (max-width: 767px) { .trade-footer__inner { width: calc(100% - 36px); flex-direction: column; align-items: flex-start; gap: 12px; } }
</style>
