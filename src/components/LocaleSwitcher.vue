<script setup>
import { useLocale } from '../i18n';
const props = defineProps({ compact: Boolean, changeLanguage: Function });
const { locale, switchLocale } = useLocale();
function select(value) { return props.changeLanguage ? props.changeLanguage(value) : switchLocale(value); }
</script>
<template>
  <div class="locale-switcher" :class="{ 'locale-switcher--compact': compact }" role="group" :aria-label="locale === 'en' ? 'Change language' : 'Cambiar idioma'">
    <button v-for="option in ['es','en']" :key="option" type="button" class="locale-switcher__button" :class="{ active: locale === option }" :aria-pressed="locale === option" :aria-label="option === 'es' ? 'Español' : 'English'" @click="select(option)">{{ option.toUpperCase() }}</button>
  </div>
</template>
<style scoped>
.locale-switcher { display:inline-flex; align-items:center; gap:.6rem; padding:.35rem; border-radius:999px; background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.14); backdrop-filter:blur(12px); }
.locale-switcher__button { border:none; cursor:pointer; transition:.28s ease; font-family:inherit; letter-spacing:.16em; text-transform:uppercase; width:42px; height:42px; border-radius:50%; background:transparent; color:rgba(255,255,255,.72); font-size:.82rem; font-weight:600; }
.locale-switcher__button:hover { color:white; }
.locale-switcher__button.active { color:#d8b26e; border:1px solid rgba(216,178,110,.65); background:rgba(216,178,110,.12); box-shadow:0 0 0 1px rgba(216,178,110,.08); }
.locale-switcher__button:focus-visible { outline:2px solid #d8b26e; outline-offset:2px; }
.locale-switcher--compact { gap:4px; padding:4px; background:#061526; }
@media(max-width:1024px) { .locale-switcher:not(.locale-switcher--compact) { display:none; } }
@media(max-width:767px) { .locale-switcher--compact { gap:2px; padding:3px; } .locale-switcher--compact .locale-switcher__button { width:34px; height:38px; font-size:11px; letter-spacing:.08em; } }
@media(prefers-reduced-motion:reduce) { .locale-switcher__button { transition:none; } }
</style>
