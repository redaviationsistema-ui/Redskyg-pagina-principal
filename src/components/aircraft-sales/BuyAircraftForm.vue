<script setup>
import { useAircraftTradeLocale } from '../../i18n/useAircraftTradeLocale';
const { t, locale, privacyPath, displayError, handleInvalid, clearValidity } = useAircraftTradeLocale();
import { reactive, ref } from 'vue';
import { Plane, PlaneTakeoff, Helicopter, Ellipsis, ArrowRight, CheckCircle2 } from 'lucide-vue-next';
import { buyerAircraftTypes, buyerBudgets, primaryUses, validateBuyer } from '../../features/aircraft-sales/buyerSchema';
import { submitBuyer, trackBuyer } from '../../features/aircraft-sales/services/aircraftBuyer.service';
import { aircraftInquiryVerified } from '../../features/aircraft-sales/services/aircraftInquiry.service';
const form = reactive({ aircraft_type: 'Jet privado', manufacturer_model: '', approximate_year: '', budget_range: 'undefined', registration: '', primary_use: 'Personal', contact_name: '', company: '', email: '', phone: '', country: '', comments: '', privacy_accepted: false });
const busy = ref(false), error = ref(''), result = ref(null), started = ref(false), trap = ref('');
const requestId = crypto.randomUUID();
const icons = [Plane, PlaneTakeoff, Helicopter, Ellipsis];
const maxYear = new Date().getFullYear() + 1;
function start() { if (!started.value) { started.value = true; trackBuyer('buyer_form_start'); } }
async function send() {
  if (busy.value || result.value) return;
  error.value = '';
  try {
    const payload = validateBuyer(form);
    busy.value = true;
    trackBuyer('buyer_form_submit');
    result.value = await submitBuyer({ ...payload, request_id: requestId, website: trap.value });
    const transactionId = result.value.id || requestId;
    trackBuyer('buyer_form_success', { submission_id: transactionId });
    trackBuyer('aircraft_purchase_submit_success');
    const conversion = import.meta.env.VITE_AIRCRAFT_PURCHASE_ADS_SEND_TO;
    if (conversion) trackBuyer('conversion', { send_to: conversion, transaction_id: transactionId });
  } catch (e) { error.value = e.message; } finally { busy.value = false; }
}
</script>
<template>
  <div class="buyer-form-shell intake-embedded">
    <div v-if="result" class="buyer-success" role="status" tabindex="-1"><CheckCircle2 :size="42" /><h2>{{ t('Solicitud enviada correctamente') }}</h2><p>{{ t('Gracias por contactar a Sky Group Aviation. Hemos recibido tu solicitud y uno de nuestros asesores comerciales se pondrá en contacto contigo a la brevedad.') }}</p></div>
    <form v-else @submit.prevent="send" @focusin="start" @invalid.capture="error = 'Campos pendientes: revisa los datos obligatorios de compra.'; handleInvalid($event)" @input.capture="clearValidity" @change.capture="clearValidity">
      <fieldset :disabled="busy"><legend><span>01</span> {{ t("Información de la aeronave") }} </legend>
        <div class="field-grid">
          <fieldset class="aircraft-picker full"><legend> {{ t("Tipo de aeronave de interés *") }} </legend><div class="aircraft-options"><label v-for="(type, index) in buyerAircraftTypes" :key="type" :class="{ selected: form.aircraft_type === type }"><input v-model="form.aircraft_type" type="radio" name="buyer-aircraft-type" :value="type" required /><component :is="icons[index]" :size="26" stroke-width="1.5" /><span>{{ t(type) }}</span></label></div></fieldset>
          <label class="full"> {{ t("Fabricante y modelo *") }} <input v-model="form.manufacturer_model" maxlength="160" :placeholder='t("Ej. Cessna Citation XLS+")' required /></label>
          <label> {{ t("Año aproximado") }} <input v-model="form.approximate_year" type="number" min="1903" :max="maxYear" step="1" :placeholder='t("Opcional")' /></label>
          <label> {{ t("Matrícula de interés") }} <input v-model="form.registration" maxlength="20" :placeholder='t("Opcional")' /></label>
          <label class="full"> {{ t("Presupuesto aproximado (USD) *") }} <select v-model="form.budget_range" required><option v-for="[key,label] in buyerBudgets" :key="key" :value="key">{{ t(label) }}</option></select></label>
          <label class="full"> {{ t("Uso principal *") }} <select v-model="form.primary_use" required><option v-for="use in primaryUses" :key="use" :value="use">{{ t(use) }}</option></select></label>
        </div>
      </fieldset>
      <fieldset :disabled="busy"><legend><span>02</span> {{ t("Datos de contacto") }} </legend><div class="field-grid">
        <label class="full"> {{ t("Nombre completo *") }} <input v-model="form.contact_name" autocomplete="name" maxlength="160" required /></label>
        <label class="full"> {{ t("Empresa") }} <input v-model="form.company" autocomplete="organization" maxlength="160" :placeholder='t("Opcional")' /></label>
        <label> {{ t("Correo electrónico *") }} <input v-model="form.email" type="email" autocomplete="email" maxlength="160" required /></label>
        <label> {{ t("Teléfono internacional *") }} <input v-model="form.phone" type="tel" autocomplete="tel" maxlength="24" :placeholder='t("+52 722 123 4567")' required /></label>
        <label class="full"> {{ t("País *") }} <input v-model="form.country" autocomplete="country-name" maxlength="160" required /></label>
        <label class="full"> {{ t("Comentarios adicionales") }} <textarea v-model="form.comments" rows="3" maxlength="4000" :placeholder='t("Cuéntanos más sobre la aeronave que buscas (opcional)")' /></label>
      </div></fieldset>
      <label class="honeypot" aria-hidden="true"> {{ t("Sitio web") }} <input v-model="trap" tabindex="-1" autocomplete="off" /></label>
      <label class="check consent"><input v-model="form.privacy_accepted" type="checkbox" required :disabled="busy" /><span> {{ t("He leído y acepto el") }} <RouterLink :to="privacyPath" target="_blank"> {{ t("aviso de privacidad") }} </RouterLink> {{ t("y el contacto para atender esta solicitud. *") }} </span></label>
      <p v-if="!aircraftInquiryVerified" id="buyer-availability" class="form-message" role="status">{{ t('El servicio de correo está pendiente de verificación. Si el envío falla, tus datos se conservarán para reintentarlo. También puedes contactar a') }} <a href="mailto:sales@redskyg.com">sales@redskyg.com</a>.</p>
      <p v-if="error" class="form-message error" role="alert">{{ displayError(error) }}</p>
      <button type="submit" class="buyer-submit" :disabled="busy" :aria-describedby="!aircraftInquiryVerified ? 'buyer-availability' : undefined">{{ t(busy ? 'ENVIANDO SOLICITUD…' : 'SOLICITAR INFORMACIÓN DE COMPRA') }}<ArrowRight :size="19" /></button>
      <p class="form-footnote"> {{ t("Asesoría personalizada. Información confidencial.") }} </p>
    </form>
  </div>
</template>
<style scoped src="./aircraftIntakeForm.css"></style>
<style scoped>
.aircraft-picker { border: 0; padding: 0; margin: 0; }
.aircraft-picker legend { font-size: 13px; font-weight: 500; margin-bottom: 10px; }
.aircraft-options { clear: both; display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); gap: 8px; }
.aircraft-options label { position: relative; align-items: center; justify-content: center; gap: 9px; min-height: 88px; padding: 12px 5px; border: 1px solid #dce2e8; border-radius: 7px; background: #f8f9fb; text-align: center; cursor: pointer; font-size: 12px; }
.aircraft-options input { position: absolute; opacity: 0; width: 1px; min-height: 1px; height: 1px; padding: 0; }
.aircraft-options .selected { border-color: #a9824c; background: #faf5ed; color: #79552c; box-shadow: inset 0 0 0 1px #a9824c; }
.aircraft-options label:focus-within { outline: 2px solid #a9824c; outline-offset: 2px; }
.aircraft-options span { font-weight: 500; }
@media(max-width:767px) { .aircraft-options { grid-template-columns: repeat(2,minmax(0,1fr)); } .aircraft-options label { min-height: 76px; font-size: 13px; } }
</style>
