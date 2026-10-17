<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { Plane, PlaneTakeoff, BadgeDollarSign, BriefcaseBusiness, Wrench, ArrowUpRight, ShieldCheck } from 'lucide-vue-next';
import { useLocale } from '../i18n';
import { commercialNavigation } from '../features/aircraft-sales/commercialDrafts';
const { isEnglish, toLocalizedRoute } = useLocale();
const text = (es, en) => isEnglish.value ? en : es;
const services = computed(() => [
  { key: 'buy', icon: Plane, title: text('Comprar una aeronave', 'Buy an aircraft'), description: text('Encuentra tu próxima aeronave.', 'Find your next aircraft.'), cta: text('QUIERO COMPRAR UN AVIÓN', 'I WANT TO BUY AN AIRCRAFT') },
  { key: 'sell', icon: BadgeDollarSign, title: text('Vender una aeronave', 'Sell an aircraft'), description: text('Comercializa tu aeronave con asesoría especializada.', 'Market your aircraft with expert guidance.'), cta: text('QUIERO VENDER MI AVIÓN', 'I WANT TO SELL MY AIRCRAFT') },
  { key: 'flight', icon: PlaneTakeoff, title: text('Cotizar un vuelo privado', 'Get a private flight quote'), description: text('Organiza tu próximo vuelo privado.', 'Plan your next private flight.'), cta: text('COTIZAR VUELO PRIVADO', 'REQUEST A FLIGHT QUOTE') },
  { key: 'management', icon: BriefcaseBusiness, title: text('Administrar mi aeronave', 'Manage my aircraft'), description: text('Soluciones para la gestión de aeronaves.', 'Solutions for managing your aircraft.'), cta: text('ADMINISTRAR MI AERONAVE', 'MANAGE MY AIRCRAFT') },
  { key: 'maintenance', icon: Wrench, title: text('Solicitar servicio técnico', 'Request technical service'), description: text('Atención técnica y servicios aeronáuticos.', 'Technical support and aviation services.'), cta: text('SOLICITAR SERVICIO TÉCNICO', 'REQUEST TECHNICAL SERVICE') },
]);
const root = ref(null);
const heroImage = ref(null);
const motionEnabled = ref(false);
const heroReady = ref(false);
let observer, motionQuery, pointerQuery, scrollFrame = 0, lightFrame = 0, loadTimer;
let lightTarget, lightX = 50, lightY = 50;
function revealHero() { heroReady.value = true; clearTimeout(loadTimer); }
function syncMotion() {
  motionEnabled.value = !motionQuery.matches;
  if (!motionEnabled.value) {
    cancelAnimationFrame(scrollFrame); scrollFrame = 0;
    root.value?.style.setProperty('--hero-shift', '0px');
    observer?.disconnect();
    root.value?.querySelectorAll('.service-reveal').forEach(card => card.classList.add('is-visible'));
  }
}
function onScroll() {
  if (!motionEnabled.value || scrollFrame) return;
  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = 0;
    const hero = root.value?.querySelector('.aviation-hero');
    if (!hero) return;
    const bounds = hero.getBoundingClientRect();
    const shift = `${Math.min(22, Math.max(0, -bounds.top) * .045)}px`;
    if (root.value.style.getPropertyValue('--hero-shift') !== shift) root.value.style.setProperty('--hero-shift', shift);
  });
}
function followLight(event) {
  if (!motionEnabled.value || !pointerQuery?.matches || event.pointerType === 'touch') return;
  lightTarget = event.currentTarget;
  const bounds = lightTarget.getBoundingClientRect();
  lightX = (event.clientX - bounds.left) / bounds.width * 100;
  lightY = (event.clientY - bounds.top) / bounds.height * 100;
  if (lightFrame) return;
  lightFrame = requestAnimationFrame(() => {
    lightFrame = 0;
    lightTarget?.style.setProperty('--light-x', `${lightX}%`);
    lightTarget?.style.setProperty('--light-y', `${lightY}%`);
  });
}
function goToServices(event) {
  event.preventDefault();
  root.value?.querySelector('#servicios').scrollIntoView({ behavior: motionEnabled.value ? 'smooth' : 'instant', block: 'start' });
}
onMounted(() => {
  motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
  pointerQuery = matchMedia('(hover: hover) and (pointer: fine)');
  syncMotion();
  motionQuery.addEventListener('change', syncMotion);
  window.addEventListener('scroll', onScroll, { passive: true });
  if (heroImage.value?.complete) revealHero();
  else loadTimer = setTimeout(revealHero, 700);
  const cards = root.value.querySelectorAll('.service-reveal');
  if (motionEnabled.value && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: .08 });
    cards.forEach(card => observer.observe(card));
  } else cards.forEach(card => card.classList.add('is-visible'));
});
onBeforeUnmount(() => {
  observer?.disconnect();
  motionQuery?.removeEventListener('change', syncMotion);
  window.removeEventListener('scroll', onScroll);
  cancelAnimationFrame(scrollFrame); cancelAnimationFrame(lightFrame); clearTimeout(loadTimer);
});
const flightUrl = computed(() => 'https://redskyg.com/landing/es-mx/reserva');
</script>
<template>
  <article ref="root" class="aviation-home" :class="{ 'motion-enabled': motionEnabled, 'hero-ready': heroReady }">
    <section class="aviation-hero" aria-labelledby="home-title">
      <picture class="hero-image-layer"><source media="(max-width: 600px)" srcset="/images/landing/hero-mobile.webp" /><img ref="heroImage" @load="revealHero" @error="revealHero" src="/images/landing/hero.webp" :alt="text('Jet ejecutivo en plataforma', 'Executive jet on the apron')" width="1677" height="938" fetchpriority="high" decoding="async" /></picture>
      <div class="hero-shade"></div>
      <div class="landing-container hero-content">
        <p class="eyebrow">SKY GROUP LLC <span> / </span> {{ text('AVIACIÓN EJECUTIVA', 'EXECUTIVE AVIATION') }}</p>
        <h1 id="home-title">{{ text('Tu próxima operación comienza aquí.', 'Your next venture starts here.') }}</h1>
        <p class="hero-description">{{ text('Compra, vende, vuela o solicita servicios aeronáuticos con atención especializada.', 'Buy, sell, fly or request aviation services with expert support.') }}</p>
        <a href="#servicios" class="hero-link" @click="goToServices">{{ text('EXPLORA NUESTROS SERVICIOS', 'EXPLORE OUR SERVICES') }} <ArrowUpRight :size="18" /></a>
      </div>
      <span class="hero-caption" aria-hidden="true">{{ text('UNA VISIÓN. TODAS LAS POSIBILIDADES.', 'ONE VISION. EVERY POSSIBILITY.') }}</span>
    </section>
    <section id="servicios" class="service-selector landing-container" aria-labelledby="services-title">
      <div class="selector-heading"><div><p class="eyebrow">{{ text('TU SIGUIENTE PASO', 'YOUR NEXT STEP') }}</p><h2 id="services-title">{{ text('¿Cómo podemos ayudarte hoy?', 'How can we help you today?') }}</h2></div><p>{{ text('Selecciona el servicio que necesitas para comenzar.', 'Select the service you need to get started.') }}</p></div>
      <div class="services-grid">
        <div v-for="(service,index) in services" :key="service.key" class="service-reveal" :style="{ '--reveal-delay': `${index * 70}ms` }">
        <component :is="service.key === 'flight' ? 'a' : RouterLink" v-bind="service.key === 'flight' ? { href: flightUrl } : { to: toLocalizedRoute('ServiceRequest', { service: service.key }) }" class="service-choice" :class="[`service-choice--${service.key}`, { 'is-selected': commercialNavigation.selected === service.key }]" @click="commercialNavigation.selected = service.key" @pointermove="followLight">
          <img class="service-photo" :src="`/images/landing/${service.key}.webp`" alt="" width="900" height="600" loading="lazy" decoding="async" />
          <div class="service-shade" aria-hidden="true"></div>
          <div class="service-light" aria-hidden="true"></div>
          <div class="choice-top"><component :is="service.icon" :size="29" :stroke-width="1.3" aria-hidden="true" /><span>0{{ index + 1 }}</span></div>
          <h3>{{ service.title }}</h3><p>{{ service.description }}</p><span class="choice-cta">{{ service.cta }}<span class="arrow-circle"><ArrowUpRight :size="19" aria-hidden="true" /></span></span>
        </component>
        </div>
      </div>
      <div class="selector-note"><ShieldCheck :size="19" aria-hidden="true" /><p>{{ text('Atención personalizada. Asesoría especializada. Información confidencial.', 'Personal attention. Expert guidance. Confidential information.') }}</p><span>SKY GROUP AVIATION</span></div>
    </section>
  </article>
</template>
<style scoped>
.aviation-home {
  --gold: #d8b47d;
  background: #031323;
  color: #e8edf2;
  padding-top: 80px;
}
.landing-container { width: min(1240px, calc(100% - 80px)); margin-inline: auto; }
.aviation-home > section::before, .aviation-home > section::after { display: none; }
.aviation-hero { position: relative; isolation: isolate; min-height: 420px; display: flex; align-items: center; overflow: hidden; background: #06192b; }
.hero-image-layer, .hero-shade { position: absolute; inset: 0; z-index: -2; }
.hero-image-layer { inset: -24px 0; transform: translate3d(0, var(--hero-shift, 0px), 0); }
.hero-image-layer img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: center 47%; }
.hero-shade { z-index: -1; background: linear-gradient(90deg, #031323f5, #06192bd9 36%, #06192b33 85%), linear-gradient(0deg, #031323, transparent 35%); }
.hero-content { padding-block: 38px 44px; }
.eyebrow { font: 600 10px/1.6 var(--font-body); letter-spacing: .22em; color: var(--gold); }
.eyebrow span { margin-inline: 10px; color: #ffffff60; }
h1 { color: #fff; font: 400 clamp(34px, 3.6vw, 50px)/1.12 var(--font-heading); letter-spacing: -.035em; max-width: 660px; margin-top: 18px; text-wrap: balance; }
h1::after { content: ''; display: block; width: 52px; height: 1px; background: var(--gold); margin-top: 20px; }
.hero-description { font-size: 16px; line-height: 1.7; max-width: 480px; color: #e8edf2; margin-top: 22px; }
.hero-link { display: inline-flex; align-items: center; gap: 27px; padding: 14px 19px; min-height: 48px; margin-top: 26px; border: 1px solid #b18a5270; border-radius: 4px; background: #b18a5212; color: #f0d5ad; font-size: 10px; letter-spacing: .12em; text-decoration: none; transition: transform 300ms, background 300ms, box-shadow 300ms, border-color 300ms; }
.hero-link svg, .arrow-circle svg { transition: transform 300ms; }
.hero-link:active { transform: translateY(0) scale(.98); background: #b18a5233; }
.hero-caption { position: absolute; right: 40px; bottom: 26px; font-size: 8px; letter-spacing: .2em; color: #e8edf2a0; }
.service-selector { padding-block: 44px 22px; scroll-margin-top: 100px; }
.selector-heading { display: flex; align-items: end; justify-content: space-between; gap: 24px; margin-bottom: 27px; }
.selector-heading h2 { color: #fff; font: 400 clamp(28px, 3vw, 38px)/1.2 var(--font-heading); letter-spacing: -.025em; margin-top: 10px; }
.selector-heading > p { font-size: 13px; line-height: 1.7; color: #c0ccd8; max-width: 260px; }
.services-grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 2px; padding: 1px; border-radius: 10px; overflow: hidden; background: linear-gradient(135deg, #b18a5270, #102b46, #b18a5240); }
.service-reveal { grid-column: span 6; min-width: 0; }
.service-reveal:first-child { grid-column: span 7; }
.service-reveal:nth-child(2) { grid-column: span 5; }
.service-reveal:nth-child(3) { grid-column: span 12; }
.service-reveal:nth-child(3) .service-choice { min-height: 230px; }
.service-reveal:nth-child(3) .choice-top { margin-bottom: 24px; }
.service-reveal:nth-child(3) .service-photo { object-position: center 36%; }
.service-choice::after { content: ''; position: absolute; top: 17px; right: 52px; width: 80px; height: 1px; background: linear-gradient(90deg, transparent, #d8b47d80); transform: rotate(-12deg); pointer-events: none; }
.service-choice.is-selected { box-shadow: inset 0 0 0 2px #d8b47d; }
.service-choice { position: relative; isolation: isolate; overflow: hidden; display: flex; flex-direction: column; height: 100%; min-height: 292px; padding: 26px; border: 1px solid transparent; border-radius: 0; background: #102b46; text-decoration: none; color: white; transition: transform 300ms, border-color 300ms, box-shadow 300ms; }
.service-photo, .service-shade, .service-light { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.service-photo { z-index: -3; object-fit: cover; transition: transform 350ms; }
.service-choice--sell .service-photo { object-position: 80% center; }
.service-shade { z-index: -2; background: linear-gradient(0deg, #031323fa 0%, #031323c9 42%, #06192b22 100%), linear-gradient(90deg, #06192b55, #06192b22); }
.service-light { z-index: -1; opacity: 0; background: radial-gradient(300px circle at var(--light-x, 50%) var(--light-y, 50%), #d8b47d24, transparent 75%); transition: opacity 300ms; }
.choice-top { display: flex; align-items: center; justify-content: space-between; color: var(--gold); margin-bottom: 58px; }
.choice-top > svg { transition: color 300ms; }
.choice-top > span { font-size: 11px; letter-spacing: .13em; color: #fff; text-shadow: 0 1px 8px #031323; background: #031323bd; padding: 3px 7px; border-radius: 2px; }
.service-choice h3 { color: #fff; font: 400 25px/1.2 var(--font-heading); letter-spacing: -.02em; }
.service-choice p { font-size: 13px; line-height: 1.65; margin-top: 10px; margin-bottom: 20px; color: #e8edf2; }
.choice-cta { display: flex; align-items: center; justify-content: space-between; gap: 12px; border-top: 1px solid #d8b47d40; padding-top: 15px; margin-top: auto; font-size: 10px; font-weight: 600; letter-spacing: .065em; color: #f0d5ad; }
.arrow-circle { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border: 1px solid #d8b47d70; border-radius: 50%; flex-shrink: 0; }
.service-choice:active { transform: translateY(-1px) scale(.995); border-color: var(--gold); }
a:focus-visible { outline: 3px solid var(--gold); outline-offset: 4px; }
.service-choice:focus-visible { outline-offset: -5px; border-color: var(--gold); }
.selector-note { display: flex; gap: 10px; align-items: center; padding-block: 25px; color: #b8c5d1; font-size: 11px; line-height: 1.6; }
.selector-note > svg { color: var(--gold); flex-shrink: 0; }
.selector-note > span { margin-left: auto; font-size: 9px; letter-spacing: .16em; white-space: nowrap; }
/* Reveal wrappers keep entry movement independent from interactive card transforms. */
.motion-enabled .service-reveal:not(.is-visible) { opacity: 0; transform: translateY(20px); }
.motion-enabled .service-reveal.is-visible { animation: card-reveal 550ms var(--reveal-delay) both; }
.service-reveal:focus-within { opacity: 1 !important; transform: none !important; animation: none !important; }
.motion-enabled:not(.hero-ready) .hero-content > *, .motion-enabled:not(.hero-ready) .hero-image-layer img { opacity: 0; }
.motion-enabled.hero-ready .hero-image-layer img { animation: hero-image 1000ms both; }
.motion-enabled.hero-ready .hero-content > .eyebrow { animation: hero-rise 600ms 80ms both; }
.motion-enabled.hero-ready h1 { animation: hero-rise 800ms 150ms both; }
.motion-enabled.hero-ready .hero-description { animation: hero-rise 700ms 300ms both; }
.motion-enabled.hero-ready .hero-link { animation: hero-rise 600ms 450ms both; }
@keyframes hero-image { from { opacity: 0; transform: scale(1.04); } to { opacity: 1; transform: scale(1); } }
@keyframes hero-rise { from { opacity: 0; translate: 0 25px; } to { opacity: 1; translate: 0 0; } }
@keyframes card-reveal { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@media (hover: hover) and (pointer: fine) {
  .hero-link:hover { transform: translateY(-2px); background: #b18a5228; border-color: #d8b47d; box-shadow: 0 8px 25px #b18a521a; }
  .hero-link:hover svg { transform: translateX(4px); }
  .service-choice:hover { transform: translateY(-5px); border-color: #d8b47dba; box-shadow: 0 18px 36px #0005; }
  .service-choice:hover .service-photo { transform: scale(1.04); }
  .service-choice:hover .service-light { opacity: 1; }
  .service-choice:hover .choice-top > svg { color: #f6dcac; }
  .service-choice:hover .arrow-circle svg { transform: translateX(3px); }
}
@media (min-width: 601px) and (max-width: 1024px) {
  .landing-container { width: calc(100% - 48px); }
  .services-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .service-reveal, .service-reveal:first-child, .service-reveal:nth-child(2) { grid-column: auto; }
  .service-reveal:nth-child(3) { grid-column: span 2; }
  .service-choice { min-height: 275px; }
  .selector-heading { align-items: start; }
  .selector-heading > p { max-width: 200px; }
}
@media (max-width: 600px) {
  .aviation-home { padding-top: 68px; }
  .landing-container { width: calc(100% - 36px); }
  .aviation-hero { min-height: 320px; }
  .hero-content { padding-block: 24px 28px; }
  .hero-image-layer img { object-position: 59% center; }
  .hero-content .eyebrow { font-size: 8px; letter-spacing: .12em; }
  h1 { font-size: clamp(28px, 7.3vw, 34px); margin-top: 16px; max-width: 440px; }
  h1::after { margin-top: 18px; }
  .hero-description { font-size: 14px; line-height: 1.55; margin-top: 16px; max-width: 335px; }
  .hero-link { margin-top: 20px; font-size: 9px; padding: 11px 14px; }
  .hero-caption { display: none; }
  .hero-shade { background: linear-gradient(90deg, #031323ed, #06192b8c), linear-gradient(0deg, #031323, transparent); }
  .service-selector { padding-top: 27px; scroll-margin-top: 83px; }
  .selector-heading { display: block; margin-bottom: 20px; }
  .selector-heading h2 { font-size: 28px; }
  .selector-heading > p { max-width: none; margin-top: 11px; font-size: 12px; }
  .services-grid { grid-template-columns: minmax(0, 1fr); gap: 2px; }
  .service-reveal, .service-reveal:first-child, .service-reveal:nth-child(2), .service-reveal:nth-child(3) { grid-column: auto; }
  .service-choice { min-height: 215px; padding: 20px; }
  .choice-top { margin-bottom: 27px; }
  .choice-top > svg { width: 24px; height: 24px; }
  .service-choice h3 { font-size: 23px; }
  .service-choice p { margin: 8px 0 14px; font-size: 12px; }
  .choice-cta { font-size: 9px; padding-top: 11px; }
  .arrow-circle { width: 29px; height: 29px; }
  .selector-note { font-size: 10px; align-items: start; }
  .selector-note > span { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
  .hero-image-layer, .hero-image-layer img, .service-reveal, .service-choice, .service-photo, .hero-link, .hero-link svg, .arrow-circle svg { transform: none !important; translate: none !important; opacity: 1 !important; }
  .hero-content > * { opacity: 1 !important; }
  .service-light { display: none; }
}
</style>
<style>
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
</style>
