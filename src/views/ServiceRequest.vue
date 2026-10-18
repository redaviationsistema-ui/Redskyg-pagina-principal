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
  <article class="request-page">
    <div class="request-page__background" aria-hidden="true"></div>
    <div class="request-container">
      <RouterLink :to="{path:locale==='en'?'/en/sell-aircraft':'/vender-aeronave',hash:'#servicios'}" class="back-link"><ArrowLeft :size="16" />{{ copy.back }}</RouterLink>
      <section ref="panel" class="request-panel" :aria-label="copy.titles[mode]">
        <header>
          <p class="eyebrow">SKY GROUP LLC <span aria-hidden="true">/</span> {{ locale === 'en' ? 'EXECUTIVE AVIATION' : 'AVIACIÓN EJECUTIVA' }}</p>
          <h1>{{ copy.titles[mode] }}</h1>
          <p class="description">{{ copy.descriptions[mode] }}</p>
        </header>
        <BuyAircraftForm v-if="mode==='buy'" />
        <SellAircraftForm v-else-if="mode==='sell'" embedded />
        <AviationServiceForm v-else :key="mode" :mode="mode" />
      </section>
    </div>
  </article>
</template>
<style scoped>
.request-page{position:relative;isolation:isolate;overflow:hidden;min-height:calc(100svh - var(--header-height,80px));padding:106px 0 64px;background:#06192b;color:#071b30}
.request-page__background{position:absolute;inset:0;z-index:-1;pointer-events:none;background-image:linear-gradient(90deg,rgba(3,18,33,.88) 0%,rgba(3,18,33,.54) 45%,rgba(3,18,33,.24) 100%),linear-gradient(180deg,rgba(3,15,27,.2),transparent 38%,rgba(3,15,27,.32)),url('/images/About/about2.jpg');background-size:cover;background-position:left center;background-repeat:no-repeat;animation:request-photo-enter 550ms ease-out both}
.request-container{position:relative;z-index:1;display:grid;grid-template-columns:minmax(0,.9fr) minmax(620px,690px) minmax(0,1.1fr);width:min(1320px,calc(100% - 64px));margin:0 auto}
.back-link{display:inline-flex;align-items:center;gap:9px;min-height:44px;margin-bottom:15px;color:#f0d5ad;font-size:13px;text-decoration-thickness:1px;text-underline-offset:4px;transition:color 180ms ease}
.back-link:hover{color:#fff}
.back-link,.request-panel{grid-column:2}
.request-panel{width:100%;min-width:0;padding:30px 32px 28px;background:#fafaf8;border:1px solid rgba(177,138,82,.76);border-radius:14px;box-shadow:0 28px 80px rgba(1,11,20,.4),0 4px 18px rgba(177,138,82,.12);animation:request-enter 550ms cubic-bezier(.2,.75,.25,1) both}
.request-panel::before,.request-panel::after{display:none!important}
.eyebrow{font:600 10px/1.6 var(--font-body);letter-spacing:.2em;color:#805a2e;margin-bottom:13px}.eyebrow span{padding-inline:7px;color:#b18a52}
h1{font:400 clamp(30px,3.5vw,42px)/1.13 var(--font-heading);letter-spacing:-.025em;color:#071b30;text-wrap:balance}
.description{font-size:14px;line-height:1.7;color:#526579;margin:15px 0 23px;max-width:620px}
.back-link:focus-visible{outline:2px solid #d8b47d;outline-offset:4px}
@keyframes request-enter{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes request-photo-enter{from{opacity:0}to{opacity:1}}
@media(max-width:1023px){.request-container{display:block;width:min(820px,calc(100% - 48px))}.request-panel{width:min(690px,100%);margin-inline:auto}.request-page__background{background-position:center center}}
@media(max-width:767px){.request-page{min-height:calc(100svh - 68px);padding:86px 0 72px}.request-page__background{background-image:linear-gradient(180deg,rgba(3,18,33,.58) 0%,rgba(3,18,33,.72) 48%,rgba(3,18,33,.55) 100%),url('/images/About/about2.jpg');background-position:center 38%}.request-container{width:calc(100% - 28px)}.back-link{margin-bottom:12px}.request-panel{padding:23px 17px 25px;border-radius:12px}h1{font-size:30px}.description{font-size:13px;line-height:1.65;margin:12px 0 20px}}
@media(max-width:359px){.request-container{width:calc(100% - 24px)}.request-panel{padding-inline:14px}.eyebrow{font-size:9px;letter-spacing:.16em}}
@media(prefers-reduced-motion:reduce){.request-page__background,.request-panel{animation:none}.back-link{transition:none}}
</style>
