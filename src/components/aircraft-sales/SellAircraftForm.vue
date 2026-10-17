<script setup>
import { useAircraftTradeLocale } from '../../i18n/useAircraftTradeLocale';
const { t, locale, privacyPath, displayError, handleInvalid, clearValidity } = useAircraftTradeLocale();
import { reactive, ref } from 'vue';
import { ArrowRight, CheckCircle2 } from 'lucide-vue-next';
import { aircraftTypes, manufacturers, aircraftStatuses, relationships, contactMethods, validateSeller } from '../../features/aircraft-sales/sellerSchema';
import { buildAircraftInquiryPayload, submitAircraftInquiry, trackAircraftInquiry as trackSeller, aircraftInquiryVerified } from '../../features/aircraft-sales/services/aircraftInquiry.service';
defineProps({ embedded: { type: Boolean, default: false } });
const form = reactive({ aircraft_type: '', manufacturer: '', model: '', manufacturing_year: '', registration: '', serial_number: '', total_time: '', total_cycles: '', country: '', city: '', asking_price: '', currency: 'USD', price_to_be_defined: true, aircraft_status: 'Operativa', aircraft_notes: '', contact_name: '', company: '', email: '', phone: '', relationship_to_aircraft: 'Propietario', preferred_contact_method: 'Correo electrónico', privacy_accepted: false });
const busy = ref(false), error = ref(''), result = ref(null), started = ref(false), trap = ref('');
const requestId = ref(crypto.randomUUID());
const year = new Date().getFullYear() + 1;
const aircraftFields = [
  ['aircraft_type', 'Tipo de aeronave', 'select', aircraftTypes, true], ['manufacturer', 'Fabricante', 'select', manufacturers, true],
  ['model', 'Modelo', 'text', null, true], ['manufacturing_year', 'Año de fabricación', 'number', null, true],
  ['registration', 'Matrícula', 'text', null, true], ['serial_number', 'Número de serie', 'text'],
  ['total_time', 'Horas totales de vuelo', 'number'], ['total_cycles', 'Ciclos totales', 'number'],
  ['country', 'País', 'text', null, true], ['city', 'Ciudad', 'text', null, true],
];
function start() { if (!started.value) { started.value = true; trackSeller('seller_form_start'); } }
async function send() {
  if (busy.value || result.value) return;
  error.value = '';
  try {
    const validated = validateSeller(form);
    busy.value = true;
    trackSeller('seller_form_submit');
    const response = await submitAircraftInquiry(buildAircraftInquiryPayload({ ...validated, privacy_accepted: form.privacy_accepted }, 'sell', trap.value));
    result.value = response;
    const transactionId = response.id || requestId.value;
    trackSeller('seller_form_success', { submission_id: transactionId });
    trackSeller('aircraft_sale_submit_success');
    const conversion = import.meta.env.VITE_SELLER_GOOGLE_ADS_SEND_TO;
    if (conversion) trackSeller('conversion', { send_to: conversion, transaction_id: transactionId });
  } catch (e) {
    error.value = e.message;
  } finally { busy.value = false; }
}
</script>

<template>
  <div :id="embedded ? undefined : 'evaluacion'" class="seller-form-shell" :class="{ 'intake-embedded': embedded }">
    <div v-if="result" class="seller-success" role="status" tabindex="-1">
      <CheckCircle2 :size="46" />
      <h2>{{ t('Solicitud enviada correctamente') }}</h2>
      <p>{{ t('Gracias por contactar a Sky Group Aviation. Hemos recibido tu solicitud y uno de nuestros asesores comerciales se pondrá en contacto contigo a la brevedad.') }}</p>
    </div>
    <form v-else @submit.prevent="send" @focusin="start" @invalid.capture="error = 'Campos pendientes: revisa los datos obligatorios.'; handleInvalid($event)" @input.capture="clearValidity" @change.capture="clearValidity">
      <header v-if="!embedded"><p class="eyebrow"> {{ t("COMENCEMOS CON TU AERONAVE") }} </p><h2> {{ t("Vende tu aeronave con asesoría profesional") }} </h2><p> {{ t("Completa el formulario y un asesor comercial se pondrá en contacto contigo.") }} </p><small> {{ t("* Campos obligatorios") }} </small></header>
      <fieldset :disabled="busy"><legend><span>01</span> {{ t("Información de la aeronave") }} </legend>
        <div class="field-grid">
          <label v-for="[key, title, type, options, required] in aircraftFields" :key="key" :for="`seller-${key}`" :class="{ full: key === 'aircraft_type' || key === 'serial_number' }">{{ t(title) }} {{ t(required ? '*' : '') }}
            <select v-if="type === 'select'" :id="`seller-${key}`" v-model="form[key]" :required="required"><option disabled value=""> {{ t("Seleccionar") }} </option><option v-for="option in options" :key="option" :value="option">{{ t(option) }}</option></select>
            <input v-else :id="`seller-${key}`" v-model="form[key]" :type="type" :required="required" :min="key === 'manufacturing_year' ? 1903 : type === 'number' ? 0 : undefined" :max="key === 'manufacturing_year' ? year : undefined" :step="key === 'total_time' ? '0.1' : type === 'number' ? '1' : undefined" :maxlength="160" :placeholder="t(key === 'registration' ? 'Ej. XB-ABC o N123AB' : key === 'model' ? 'Ej. Citation XLS+' : '')" />
          </label>
          <label> {{ t("Precio solicitado") }} <input v-model="form.asking_price" type="number" min="0" step="0.01" :disabled="form.price_to_be_defined" :placeholder='t("Opcional")' /></label>
          <label> {{ t("Moneda") }} <select v-model="form.currency"><option value="USD"> {{ t("USD") }} </option><option value="MXN"> {{ t("MXN") }} </option></select></label>
          <label class="check full"><input v-model="form.price_to_be_defined" type="checkbox" /> {{ t("Precio por definir") }} </label>
          <label class="full"> {{ t("Estado general") }} <select v-model="form.aircraft_status"><option v-for="status in aircraftStatuses" :key="status" :value="status">{{ t(status) }}</option></select></label>
          <label class="full"> {{ t("Comentarios adicionales") }} <textarea v-model="form.aircraft_notes" rows="3" maxlength="4000" :placeholder='t("Equipamiento, mantenimiento o información relevante (opcional)")' /></label>
        </div>
      </fieldset>
      <fieldset :disabled="busy"><legend><span>02</span> {{ t("Datos del propietario") }} </legend>
        <div class="field-grid">
          <label class="full"> {{ t("Nombre completo *") }} <input v-model="form.contact_name" autocomplete="name" maxlength="160" required /></label>
          <label class="full"> {{ t("Empresa") }} <input v-model="form.company" autocomplete="organization" maxlength="160" :placeholder='t("Opcional")' /></label>
          <label> {{ t("Correo electrónico *") }} <input v-model="form.email" type="email" autocomplete="email" maxlength="160" required /></label>
          <label> {{ t("Teléfono internacional *") }} <input v-model="form.phone" type="tel" autocomplete="tel" :placeholder='t("+52 722 123 4567")' maxlength="24" required /></label>
          <label> {{ t("Relación con la aeronave") }} <select v-model="form.relationship_to_aircraft"><option v-for="item in relationships" :key="item" :value="item">{{ t(item) }}</option></select></label>
          <label> {{ t("Contacto preferido") }} <select v-model="form.preferred_contact_method"><option v-for="item in contactMethods" :key="item" :value="item">{{ t(item) }}</option></select></label>
        </div>
      </fieldset>
      <label class="honeypot" aria-hidden="true"> {{ t("Sitio web") }} <input v-model="trap" tabindex="-1" autocomplete="off" /></label>
      <label class="check consent"><input v-model="form.privacy_accepted" type="checkbox" required :disabled="busy" /><span> {{ t("He leído y acepto el") }} <RouterLink :to="privacyPath" target="_blank"> {{ t("aviso de privacidad") }} </RouterLink> {{ t("y el contacto para atender esta solicitud. *") }} </span></label>
      <p v-if="!aircraftInquiryVerified" class="form-message" role="status">{{ t('El servicio de correo está pendiente de verificación. Si el envío falla, tus datos se conservarán para reintentarlo. También puedes contactar a') }} <a href="mailto:sales@redskyg.com">sales@redskyg.com</a>.</p>
      <p v-if="error" class="form-message error" role="alert">{{ displayError(error) }}</p>

      <button class="seller-submit" type="submit" :disabled="busy">{{ t(busy ? 'ENVIANDO SOLICITUD…' : 'SOLICITAR EVALUACIÓN COMERCIAL') }} <ArrowRight :size="19" /></button>
      <p class="form-footnote"> {{ t("Atención personalizada. Información confidencial.") }} </p>
    </form>
  </div>
</template>

<style scoped src="./aircraftIntakeForm.css"></style> 