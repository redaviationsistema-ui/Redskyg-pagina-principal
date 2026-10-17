<script setup>
import LocaleSwitcher from '../LocaleSwitcher.vue';
import { useLocale } from '../../i18n';
const { isEnglish } = useLocale();
</script>
<template>
  <header class="trade-header">
    <div class="trade-header__inner">
      <RouterLink to="/" class="trade-header__home" :aria-label="isEnglish ? 'Sky Group Aviation — Home' : 'Sky Group Aviation — Inicio'">
        <img src="/images/logoo.png" alt="Sky Group Aviation" />
      </RouterLink>
      <LocaleSwitcher compact class="trade-header__language" />
    </div>
  </header>
</template>

<style scoped>
.trade-header { position: fixed; inset: 0 0 auto; z-index: 10000; height: 80px; background: #061526; }
.trade-header__inner { position: relative; display: flex; align-items: center; justify-content: center; width: min(1360px, calc(100% - 80px)); height: 100%; margin-inline: auto; }
.trade-header__language { position: absolute; right: 0; top: 50%; transform: translateY(-50%); }
.trade-header__home { display: inline-flex; align-items: center; min-height: 44px; border-radius: 4px; }
.trade-header__home:focus-visible { outline: 2px solid #c59b61; outline-offset: 5px; }
.trade-header img { display: block; width: auto; height: 60px; max-width: 180px; object-fit: contain; filter: brightness(0) invert(1); }
@media (min-width: 768px) and (max-width: 1024px) { .trade-header__inner { width: calc(100% - 64px); } }
@media (max-width: 767px) {
  .trade-header { height: 68px; }
  .trade-header__inner { width: calc(100% - 36px); }
  .trade-header img { height: 48px; max-width: 100px; }
}
</style>
