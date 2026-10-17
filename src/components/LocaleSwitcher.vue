<script setup>
import { useLocale } from '../i18n';
const props = defineProps({ compact: Boolean, changeLanguage: Function });
const { locale, switchLocale } = useLocale();
function select(value) { return props.changeLanguage ? props.changeLanguage(value) : switchLocale(value); }
</script>
<template>
  <div class="locale-switcher" :class="{ 'locale-switcher--compact': compact, 'locale-switcher--en': locale === 'en' }" role="group" :aria-label="locale === 'en' ? 'Change language' : 'Cambiar idioma'">
    <button v-for="option in ['es','en']" :key="option" type="button" class="locale-switcher__button" :class="{ active: locale === option }" :aria-pressed="locale === option" :aria-label="option === 'es' ? 'Español' : 'English'" @click="select(option)">{{ option.toUpperCase() }}</button>
  </div>
</template>
<style scoped>
.locale-switcher { --switch-pad: .35rem; --switch-gap: .6rem; position: relative; isolation: isolate; }
.locale-switcher::before { content: ''; position: absolute; z-index: -1; top: var(--switch-pad); bottom: var(--switch-pad); left: var(--switch-pad); width: calc((100% - 2 * var(--switch-pad) - var(--switch-gap)) / 2); border: 1px solid #d8b26ea6; border-radius: 50%; background: #d8b26e1f; transition: transform 280ms ease; pointer-events: none; }
.locale-switcher--en::before { transform: translateX(calc(100% + var(--switch-gap))); }
.locale-switcher--compact { --switch-pad: 4px; --switch-gap: 4px; }

.locale-switcher { display:inline-flex; align-items:center; gap:.6rem; padding:.35rem; border-radius:999px; background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.14); backdrop-filter:blur(12px); }
.locale-switcher__button { border:1px solid transparent; cursor:pointer; transition:.28s ease; font-family:inherit; letter-spacing:.16em; text-transform:uppercase; width:42px; height:42px; border-radius:50%; background:transparent; color:rgba(255,255,255,.72); font-size:.82rem; font-weight:600; }
.locale-switcher__button:hover { color:white; }
.locale-switcher__button.active { color:#e4c48e; }
.locale-switcher__button:focus-visible { outline:2px solid #d8b26e; outline-offset:2px; }
.locale-switcher--compact { gap:4px; padding:4px; background:#061526; }
@media(max-width:1024px) { .locale-switcher:not(.locale-switcher--compact) { display:none; } }
@media(max-width:767px) { .locale-switcher--compact { --switch-pad:3px; --switch-gap:2px; gap:2px; padding:3px; } .locale-switcher--compact .locale-switcher__button { width:34px; height:38px; font-size:11px; letter-spacing:.08em; } }
@media(prefers-reduced-motion:reduce) { .locale-switcher__button, .locale-switcher::before { transition:none; } }
</style>
