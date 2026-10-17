<script setup>
import { computed, nextTick, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ArrowLeft } from 'lucide-vue-next';
import { useLocale } from '../i18n';
import { commercialCopy } from '../locales/commercialInquiry';
import BuyAircraftForm from '../components/aircraft-sales/BuyAircraftForm.vue';
import SellAircraftForm from '../components/aircraft-sales/SellAircraftForm.vue';
import AviationServiceForm from '../components/aircraft-sales/AviationServiceForm.vue';
const route=useRoute();
const {locale,toLocalizedRoute}=useLocale();
const copy=computed(()=>commercialCopy[locale.value]);
const mode=computed(()=>route.params.service);
const panel=ref(null);
onMounted(async()=>{await nextTick();panel.value?.querySelector('select,input')?.focus({preventScroll:true});});
</script>
<template>
  <article class="request-page"><div class="request-container">
    <RouterLink :to="{path:locale==='en'?'/en/sell-aircraft':'/vender-aeronave',hash:'#servicios'}" class="back-link"><ArrowLeft :size="16" />{{ copy.back }}</RouterLink>
    <section ref="panel" class="request-panel" :aria-label="copy.titles[mode]">
      <header><p class="eyebrow">SKY GROUP LLC</p><h1>{{ copy.titles[mode] }}</h1><p class="description">{{ copy.descriptions[mode] }}</p></header>
      <BuyAircraftForm v-if="mode==='buy'" /><SellAircraftForm v-else-if="mode==='sell'" embedded /><AviationServiceForm v-else :key="mode" :mode="mode" />
    </section>
  </div></article>
</template>
<style scoped>
.request-page{padding:106px 0 50px;background:radial-gradient(ellipse at top right,#183852,#031323 65%);min-height:100svh;color:#fff}.request-container{width:min(780px,calc(100% - 48px));margin:auto}.back-link{display:inline-flex;align-items:center;gap:8px;min-height:44px;margin-bottom:16px;color:#e1c59d;font-size:13px;text-underline-offset:4px}.request-panel{min-width:0;padding:32px 38px;background:#f8fafb;border:1px solid #b18a5280;border-radius:8px;animation:request-enter 300ms both}.request-panel::before,.request-panel::after{display:none!important}.eyebrow{font-size:10px;letter-spacing:.18em;color:#805a2e;margin-bottom:13px}h1{font:400 clamp(30px,4vw,42px)/1.15 var(--font-heading);letter-spacing:-.025em;color:#071b30}.description{font-size:14px;line-height:1.7;color:#526171;margin:17px 0 24px;max-width:620px}.back-link:focus-visible{outline:2px solid #d8b47d;outline-offset:4px}@keyframes request-enter{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@media(max-width:767px){.request-page{padding-top:85px}.request-container{width:calc(100% - 28px)}.request-panel{padding:24px 18px}h1{font-size:30px}.description{font-size:13px}}@media(prefers-reduced-motion:reduce){.request-panel{animation:none}}
</style>
