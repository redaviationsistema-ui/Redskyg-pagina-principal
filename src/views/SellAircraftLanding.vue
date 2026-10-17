<script setup>
import { useAircraftTradeLocale } from '../i18n/useAircraftTradeLocale';
const { t, locale, privacyPath, displayError, handleInvalid, clearValidity } = useAircraftTradeLocale();
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { ChartNoAxesCombined, Globe2, ShieldCheck, ArrowUpRight, Check } from 'lucide-vue-next';
import AircraftTradeForm from '../components/aircraft-sales/AircraftTradeForm.vue';
import { trackAircraftInquiry as trackSeller } from '../features/aircraft-sales/services/aircraftInquiry.service';
import { trackBuyer } from '../features/aircraft-sales/services/aircraftBuyer.service';
const route = useRoute();
const mode = ref(route.meta.aircraftMode === 'buy' ? 'buy' : 'sell');
const isBuying = computed(() => mode.value === 'buy');
const seenModes = new Set();
watch(mode, value => {
  if (seenModes.has(value)) return;
  seenModes.add(value);
  if (value === 'buy') trackBuyer('buyer_landing_view');
  else trackSeller('seller_landing_view');
}, { immediate: true });
const benefits = computed(() => isBuying.value
  ? ['Asesoría especializada', 'Opciones de aeronaves', 'Acompañamiento comercial']
  : ['Evaluación comercial', 'Alcance internacional', 'Gestión confidencial']);
const steps = computed(() => isBuying.value ? [
  ['Indica qué aeronave buscas', 'Comparte tus preferencias, presupuesto y necesidades de operación.'],
  ['Revisamos tus necesidades', 'Nuestro equipo analiza tus objetivos de compra y el uso previsto.'],
  ['Presentamos opciones disponibles', 'Revisamos alternativas acordes con tus criterios y disponibilidad.'],
  ['Acompañamos el proceso de adquisición', 'Te orientamos durante la evaluación y negociación comercial.'],
] : [
  ['Registra tu aeronave', 'Completa el formulario con los datos principales de tu avión.'],
  ['Evaluación comercial', 'Nuestro equipo revisa la información para determinar las opciones de comercialización.'],
  ['Estrategia de comercialización', 'Se define una estrategia personalizada, sujeta a evaluación y acuerdo con el propietario.'],
  ['Gestión de compradores', 'Se atienden solicitudes de posibles compradores y se acompaña el proceso de negociación.'],
]);
const categories = [
  ['Jets privados', 'Gulfstream, Cessna Citation, Bombardier, Dassault, Embraer y otros.', 'Asesoría para adquirir o comercializar tu jet ejecutivo.', '/images/Home/IMG_2992.jpg'],
  ['Turbohélices', 'King Air, Pilatus, Daher y otros.', 'Versatilidad y alcance para nuevas oportunidades.', '/images/king-air-smithsonian.jpg'],
  ['Helicópteros', 'Bell, Airbus Helicopters, Leonardo y otros.', 'Atención especializada para aeronaves de ala rotativa.', '/images/Service/IMG_8868.jpg'],
];
</script>
<template>
  <article class="seller-landing">
    <div class="seller-hero">
      <div class="seller-container hero-grid">
        <div class="hero-left">
          <div class="hero-scene">
            <img class="hero-image" src="/images/Home/IMG_3121.jpg" :alt='t("Jet privado en la plataforma de un aeropuerto al atardecer")' fetchpriority="high" />
            <div class="hero-copy">
              <p class="seller-eyebrow"> {{ t("COMPRA Y VENTA DE AERONAVES") }} </p>
              <p class="hero-context"> {{ t("Compra o vende tu aeronave con expertos") }} </p>
              <h1 v-if="isBuying"> {{ t("Encuentra tu") }} <br /><em> {{ t("próxima aeronave") }} </em></h1>
              <h1 v-else> {{ t("Maximiza el valor") }} <br /><em> {{ t("de tu aeronave") }} </em></h1>
              <p class="hero-description">{{ t(isBuying ? 'Accede a oportunidades de compra de jets privados, turbohélices y helicópteros con asesoría comercial personalizada.' : 'Comercializa tu aeronave con asesoría profesional, atención personalizada y una estrategia adaptada a tus necesidades.') }}</p>
            </div>
          </div>
          <ul class="hero-mobile-benefits"><li v-for="benefit in benefits" :key="benefit"><Check :size="17" />{{ t(benefit) }}</li></ul>
          <div class="hero-commercial">
            <div class="commercial-copy"><p class="seller-eyebrow"> {{ t("UNA DECISIÓN IMPORTANTE, UN EQUIPO A TU LADO") }} </p>
              <h2> {{ t("Asesoría que te acompaña") }} </h2>
              <p> {{ t("Te acompañamos durante todo el proceso de compra o comercialización de aeronaves, con atención personalizada y confidencialidad.") }} </p>
              <div class="hero-benefits"><p v-for="(benefit,index) in benefits" :key="benefit"><component :is="[ChartNoAxesCombined,Globe2,ShieldCheck][index]" :size="28" stroke-width="1.5" /><span>{{ t(benefit) }}</span></p></div>
              <a href="#evaluacion" class="commercial-cta">{{ t(isBuying ? 'Cuéntanos qué aeronave buscas' : 'Comparte los datos de tu aeronave') }}<ArrowUpRight :size="18" /></a>
            </div>
          </div>
        </div>
        <AircraftTradeForm v-model:mode="mode" />
      </div>
    </div>
    <section class="seller-process seller-container" aria-labelledby="process-title"><div class="section-heading"><div><p class="seller-eyebrow"> {{ t("UN PROCESO CLARO") }} </p><h2 id="process-title"> {{ t("¿Cómo funciona?") }} </h2></div><p> {{ t("Un proceso claro, profesional y confidencial.") }} </p></div>
      <ol class="process-grid"><li v-for="([title, description], index) in steps" :key="title"><span class="step-number">0{{ t(index + 1) }}</span><h3>{{ t(title) }}</h3><p>{{ t(description) }}</p></li></ol>
    </section>
    <section class="seller-categories" aria-labelledby="categories-title"><div class="seller-container"><div class="section-heading"><div><p class="seller-eyebrow"> {{ t("EXPERIENCIA EN CADA CATEGORÍA") }} </p><h2 id="categories-title"> {{ t("Tu aeronave. Nuestra atención.") }} </h2></div><a href="#evaluacion"> {{ t("Habla con nuestro equipo") }} <ArrowUpRight :size="17" /></a></div>
      <div class="category-grid"><div v-for="[title, makes, description, photo] in categories" :key="title" class="category"><img :src="photo" :alt="t(title)" loading="lazy" width="640" height="360" /><h3>{{ t(title) }}</h3><p>{{ t(makes) }}</p><small>{{ t(description) }}</small></div></div>
    </div></section>
    <section class="seller-trust seller-container"><div><p class="seller-eyebrow"> {{ t("CRITERIO, DISCRECIÓN Y SEGUIMIENTO") }} </p><h2> {{ t("Una estrategia comercial para cada aeronave") }} </h2></div><div><p> {{ t("Cada operación requiere una evaluación particular. Nuestro equipo analiza las necesidades de compradores y propietarios y propone alternativas acordes con las características de la aeronave y las condiciones de la operación.") }} </p><ul><li v-for="item in ['Atención personalizada', 'Confidencialidad comercial', 'Evaluación individual', 'Seguimiento de solicitudes']" :key="item"><Check :size="17" />{{ t(item) }}</li></ul><a href="#evaluacion"> {{ t("Solicita asesoría personalizada") }} <ArrowUpRight :size="18" /></a></div></section>
  </article>
</template>
<style scoped>
.seller-landing {
  --font-heading: "Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif;
  --seller-navy: #071b30;
  --seller-gold: #a9824c;
  --seller-muted: #526171;
  background: #ffffff;
  color: var(--seller-navy);
  font-size: 16px;
  line-height: 1.6;
}
.seller-container { width: min(1360px, calc(100% - 80px)); margin-inline: auto; }
.seller-hero { padding: 138px 0 64px; background: #071b30; }
.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 52fr) minmax(0, 48fr);
  align-items: stretch;
  gap: 0;
  border-radius: 16px;
  background: #0c2439;
  box-shadow: 0 28px 80px #00000020;
}
.hero-left { display: flex; flex-direction: column; min-width: 0; overflow: clip; border-radius: 16px 0 0 16px; background: #0b253c; }
.hero-scene { position: relative; isolation: isolate; height: 700px; flex: 0 0 700px; overflow: hidden; }
.hero-image { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 75%; }
.hero-scene::after { content: ''; position: absolute; inset: 0; z-index: 0; background: linear-gradient(180deg,#071b30e0 0%,#071b3094 35%,#071b301a 68%,#0b253cb3 100%); }
.hero-copy { position: relative; z-index: 1; padding: 42px 40px; color: #fff; }
.hero-context { margin: 0 0 22px; color: #d6e0e9; font-size: 16px; font-weight: 500; line-height: 1.6; }
.hero-mobile-benefits { display: none; }
.hero-commercial { display: flex; flex: 1; align-items: center; padding: 48px 40px; background: radial-gradient(ellipse at 0 40%,#173b57,transparent 75%),#0b253c; border-top: 1px solid #c59b612e; }
.commercial-copy { width: 100%; }
.hero-commercial .seller-eyebrow { color: #dfbb84; font-size: 11px; }
.seller-landing .hero-commercial h2 { margin: 0 0 20px; color: #fff; font-size: 34px; }
.hero-commercial .commercial-copy > p:not(.seller-eyebrow) { margin: 0; color: #d6e0e9; font-size: 16px; line-height: 1.7; }
.commercial-cta { display: inline-flex; align-items: center; gap: 9px; margin-top: 32px; color: #dfbb84; font-size: 15px; text-underline-offset: 5px; }
.seller-eyebrow { margin: 0 0 16px; font-size: 12px; font-weight: 650; letter-spacing: .16em; line-height: 1.5; color: #876338; }
.hero-copy .seller-eyebrow { color: #e2be87; }
.seller-landing h1 {
  margin: 0 0 24px; color: #ffffff; font-family: var(--font-heading); font-size: clamp(45px, 4vw, 58px);
  font-weight: 400; line-height: 1.1; letter-spacing: -.035em;
}
.seller-landing h1 em { font-family: inherit; color: #dfbb84; font-style: normal; font-weight: inherit; }
.hero-description { max-width: 440px; margin: 0; color: #edf1f5; font-size: 16px; font-weight: 400; line-height: 1.65; }
.hero-benefits { display: grid; gap: 22px; margin-top: 36px; }
.hero-benefits p { color: #fff; display: flex; align-items: center; gap: 16px; margin: 0; font-size: 16px; line-height: 1.5; font-weight: 500; }
.hero-benefits p span { margin: 0; }
.hero-benefits svg { flex: 0 0 auto; color: #dfbb84; }
.seller-process { padding-block: 76px 80px; }
.section-heading { display: flex; justify-content: space-between; align-items: end; gap: 32px; margin-bottom: 42px; }
.seller-landing h2 { margin: 0; font-family: var(--font-heading); color: var(--seller-navy); font-size: clamp(30px, 3vw, 40px); font-weight: 400; line-height: 1.2; letter-spacing: -.02em; }
.section-heading > p { max-width: 330px; margin: 0; color: var(--seller-muted); font-size: 16px; line-height: 1.6; }
.process-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 32px; list-style: none; padding: 0; margin: 0; }
.process-grid li { position: relative; min-width: 0; }
.process-grid li:not(:last-child)::after { content: ''; position: absolute; top: 27px; left: 76px; right: -12px; height: 1px; background: #d9c6ac; }
.step-number { display: inline-grid; place-items: center; width: 56px; height: 56px; margin: 0; border: 1px solid #dbc6a9; border-radius: 50%; background: #fbf8f3; color: #896238; font-size: 20px; font-weight: 500; }
.seller-landing h3 { color: var(--seller-navy); margin: 22px 0 12px; font-family: var(--font-body); font-size: 18px; font-weight: 600; line-height: 1.4; letter-spacing: 0; }
.process-grid p { margin: 0; color: var(--seller-muted); font-size: 15px; line-height: 1.65; }
.seller-categories { padding-block: 72px 76px; background: #f5f6f8; }
.section-heading a, .seller-trust a { display: inline-flex; align-items: center; gap: 10px; color: #7f5c31; font-size: 15px; font-weight: 500; text-underline-offset: 5px; }
.section-heading a { flex-shrink: 0; }
.category-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 28px; }
.category { min-width: 0; }
.category img { display: block; width: 100%; height: auto; aspect-ratio: 16 / 9; object-fit: cover; border-radius: 8px; }
.seller-landing .category h3 { margin: 22px 0 10px; font-family: var(--font-heading); font-size: 28px; font-weight: 400; }
.category p { margin: 0; color: #465667; font-size: 15px; line-height: 1.65; }
.category small { display: block; margin-top: 10px; color: var(--seller-muted); font-size: 15px; line-height: 1.6; }
.seller-trust { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); gap: 70px; padding-block: 76px; }
.seller-trust h2 { max-width: 480px; }
.seller-trust > div > p:not(.seller-eyebrow) { margin: 0; color: var(--seller-muted); font-size: 16px; line-height: 1.65; }
.seller-trust ul { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px 20px; list-style: none; margin: 28px 0; padding: 0; }
.seller-trust li { display: flex; align-items: start; gap: 10px; color: var(--seller-navy); font-size: 15px; line-height: 1.5; }
.seller-trust li svg { flex: 0 0 auto; color: #a17a44; margin-top: 3px; }
.seller-landing section::before, .seller-landing section::after { display: none !important; }
@media (min-width: 1600px) { .hero-copy { padding-inline: 52px; } }
@media (min-width: 768px) and (max-width: 1024px) {
  .seller-container { width: calc(100% - 64px); }
  .seller-hero { padding-top: 128px; }
  .hero-grid { grid-template-columns: 1fr; }
  .hero-left { border-radius: 16px 16px 0 0; }
  .hero-scene { height: 620px; flex-basis: 620px; }
  .hero-image { object-position: center 68%; }
  .hero-copy { max-width: 620px; padding: 40px; }
  .hero-commercial { padding: 36px 40px; }
  .process-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 36px; }
  .process-grid li:nth-child(2)::after { display: none; }
  .section-heading { align-items: start; flex-direction: column; gap: 20px; }
  .section-heading > p { max-width: none; }
  .category-grid { gap: 20px; }
  .seller-trust { gap: 36px; }
  .seller-trust ul { grid-template-columns: 1fr; }
}
@media (max-width: 767px) {
  .seller-container { width: calc(100% - 36px); }
  .seller-hero { padding: 104px 0 36px; }
  .hero-grid { grid-template-columns: 1fr; border-radius: 14px; }
  .hero-left { border-radius: 14px 14px 0 0; }
  .hero-scene { height: 450px; flex-basis: 450px; }
  .hero-image { object-position: center 45%; }
  .hero-copy { padding: 28px 24px; }
  .hero-context { font-size: 14px; margin-bottom: 16px; }
  .hero-commercial { display: none; }
  .hero-mobile-benefits { display: grid; gap: 12px; list-style: none; margin: 0; padding: 22px 24px; background: #0b253c; color: #fff; }
  .hero-mobile-benefits li { display: flex; align-items: center; gap: 10px; font-size: 14px; }
  .hero-mobile-benefits svg { color: #dfbb84; flex-shrink: 0; }
  .hero-copy .seller-eyebrow { font-size: 11px; margin-bottom: 16px; }
  .seller-landing h1 { font-size: clamp(31px, 8.6vw, 42px); line-height: 1.1; letter-spacing: -.035em; margin-bottom: 18px; }
  .hero-description { font-size: 15px; line-height: 1.6; }
  .hero-benefits { gap: 14px; margin: 0; padding: 22px 24px 26px; background: #071b30; }
  .hero-benefits p { font-size: 14px; gap: 12px; }
  .hero-benefits svg { width: 24px; height: 24px; }
  .seller-process, .seller-trust { padding-block: 46px; }
  .section-heading { display: block; margin-bottom: 32px; }
  .section-heading > p, .section-heading > a { margin-top: 18px; }
  .seller-eyebrow { font-size: 11px; letter-spacing: .12em; }
  .seller-landing h2 { font-size: 32px; }
  .process-grid { grid-template-columns: 1fr; gap: 28px; }
  .process-grid li { padding-left: 76px; min-height: 100px; }
  .step-number { position: absolute; top: 0; left: 0; width: 52px; height: 52px; font-size: 18px; }
  .process-grid li:not(:last-child)::after { top: 64px; bottom: -16px; left: 26px; right: auto; width: 1px; height: auto; }
  .seller-landing .process-grid h3 { margin-top: 0; font-size: 18px; }
  .seller-categories { padding-block: 46px; }
  .category-grid { grid-template-columns: 1fr; gap: 32px; }
  .seller-landing .category h3 { margin-top: 18px; font-size: 27px; }
  .seller-trust { grid-template-columns: 1fr; gap: 24px; }
  .seller-trust ul { grid-template-columns: 1fr; gap: 16px; }
}
@media (prefers-reduced-motion: reduce) { .seller-landing { scroll-behavior: auto; } }
</style>
