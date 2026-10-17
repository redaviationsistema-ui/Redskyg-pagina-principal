<script setup>
import { useAircraftTradeLocale } from '../../i18n/useAircraftTradeLocale';
const { t, locale, privacyPath, displayError, handleInvalid, clearValidity } = useAircraftTradeLocale();
import { computed, nextTick, ref } from 'vue';
import { MessageCircle, Mail } from 'lucide-vue-next';
import SellAircraftForm from './SellAircraftForm.vue';
import BuyAircraftForm from './BuyAircraftForm.vue';
const props = defineProps({ mode: { type: String, required: true } });
const emit = defineEmits(['update:mode']);
const tabs = ref(null);
const advisorMessage = computed(() => {
  const operation = props.mode === 'buy' ? 'comprar una aeronave' : 'vender mi aeronave';
  return t(`Hola, me gustaría hablar con un asesor para ${operation}.`);
});
const advisorWhatsApp = computed(() =>
  `https://wa.me/525586186576?text=${encodeURIComponent(advisorMessage.value)}`
);
const advisorEmail = computed(() => {
  const subject = props.mode === 'buy' ? 'Asesoría para compra de aeronave' : 'Asesoría para venta de aeronave';
  return `mailto:sales@redskyg.com?subject=${encodeURIComponent(t(subject))}&body=${encodeURIComponent(advisorMessage.value)}`;
});
async function navigateTabs(event) {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const mode = event.key === 'Home' ? 'buy' : event.key === 'End' ? 'sell' : props.mode === 'buy' ? 'sell' : 'buy';
  emit('update:mode', mode);
  await nextTick(); tabs.value.querySelector(`[data-mode="${mode}"]`).focus();
}
</script>
<template>
  <div id="evaluacion" class="trade-panel">
    <header><p class="trade-eyebrow"> {{ t("SKY GROUP AVIATION") }} </p><h2> {{ t("COMPRA O VENTA DE AERONAVES") }} </h2><p> {{ t("Encuentra tu próxima aeronave o comercializa la tuya con asesoría profesional y atención personalizada.") }} </p></header>
    <div ref="tabs" class="trade-tabs" role="tablist" :aria-label='t("Tipo de operación")' @keydown="navigateTabs">
      <button id="trade-buy-tab" type="button" role="tab" data-mode="buy" :aria-selected="mode === 'buy'" :tabindex="mode === 'buy' ? 0 : -1" aria-controls="trade-form-panel" @click="emit('update:mode','buy')"> {{ t("ESTOY INTERESADO EN COMPRAR") }} </button>
      <button id="trade-sell-tab" type="button" role="tab" data-mode="sell" :aria-selected="mode === 'sell'" :tabindex="mode === 'sell' ? 0 : -1" aria-controls="trade-form-panel" @click="emit('update:mode','sell')"> {{ t("QUIERO VENDER MI AERONAVE") }} </button>
    </div>
    <aside class="advisor-contact" aria-labelledby="advisor-contact-title">
      <h3 id="advisor-contact-title"> {{ t("Comunícate con un asesor") }} </h3>
      <p> {{ t("Recibe atención personalizada para") }} {{ t(mode === 'buy' ? 'encontrar tu próxima aeronave' : 'comercializar tu aeronave') }}.</p>
      <div class="advisor-contact__actions">
        <a :href="advisorWhatsApp" target="_blank" rel="noopener noreferrer"><MessageCircle :size="18" aria-hidden="true" /> {{ t("Hablar por WhatsApp") }} </a>
        <a :href="advisorEmail"><Mail :size="18" aria-hidden="true" /> {{ t("Escribir por correo") }} </a>
      </div>
    </aside>
    <p class="required-note"> {{ t("* Campos obligatorios") }} </p>
    <div id="trade-form-panel" role="tabpanel" :aria-labelledby="mode === 'buy' ? 'trade-buy-tab' : 'trade-sell-tab'">
      <KeepAlive><component :is="mode === 'buy' ? BuyAircraftForm : SellAircraftForm" v-bind="mode === 'sell' ? { embedded: true } : {}" /></KeepAlive>
    </div>
  </div>
</template>
<style scoped>
.trade-panel { min-width: 0; padding: 36px; border-radius: 16px; background: #fff; color: #071b30; box-shadow: -12px 0 40px #071b3012; scroll-margin-top: 112px; }
.trade-eyebrow { margin: 0 0 14px; color: #866136; font-size: 11px; font-weight: 650; letter-spacing: .14em; }
.trade-panel h2 { margin: 0; color: #071b30; font: 400 clamp(28px,2.4vw,35px)/1.2 var(--font-heading); letter-spacing: -.025em; }
header > p:not(.trade-eyebrow) { margin: 16px 0 24px; font-size: 15px; line-height: 1.6; color: #526171; }
.trade-tabs { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 5px; padding: 5px; border: 1px solid #e4e8ed; border-radius: 9px; background: #f1f3f6; }
.trade-tabs button { min-height: 62px; padding: 12px 9px; border: 0; border-radius: 6px; background: transparent; color: #405164; font: 600 12px/1.5 var(--font-body); cursor: pointer; transition: background .2s,color .2s; }
.trade-tabs button[aria-selected=true] { background: #071b30; color: #fff; }
.trade-tabs button:focus-visible { outline: 2px solid #a9824c; outline-offset: 2px; }
.advisor-contact { margin-top: 20px; padding: 20px; border: 1px solid #e5d7c3; border-radius: 8px; background: #faf7f2; }
.advisor-contact h3 { margin: 0; color: #071b30; font: 400 24px/1.25 var(--font-heading); letter-spacing: -.015em; }
.advisor-contact p { margin: 10px 0 14px; color: #526171; font-size: 14px; line-height: 1.6; }
.advisor-contact__actions { display: flex; flex-wrap: wrap; gap: 8px 16px; }
.advisor-contact__actions a { display: inline-flex; align-items: center; gap: 8px; min-height: 44px; color: #79552c; font-size: 14px; font-weight: 500; text-underline-offset: 4px; }
.advisor-contact__actions svg { flex-shrink: 0; }
.advisor-contact__actions a:focus-visible { outline: 2px solid #a9824c; outline-offset: 4px; border-radius: 3px; }
.required-note { margin: 18px 0 0; color: #596777; font-size: 13px; }
@media(min-width:768px) and (max-width:1024px) { .trade-panel { padding: 40px; border-radius: 0 0 16px 16px; } }
@media(max-width:767px) { .trade-panel { padding: 28px 22px; border-radius: 0 0 14px 14px; } .trade-tabs button { min-height: 72px; padding: 10px 7px; font-size: 11px; } }
@media(prefers-reduced-motion:reduce) { .trade-tabs button { transition: none; } }
</style>
