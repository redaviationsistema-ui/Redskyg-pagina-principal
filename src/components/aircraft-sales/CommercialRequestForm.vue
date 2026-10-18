<script setup>
import { computed, nextTick, onBeforeUnmount, ref } from 'vue';
import { ArrowRight, CheckCircle2, LoaderCircle, Plane, Tag, MapPin, UserRound, Mail, Phone, MessageCircle, Wrench } from 'lucide-vue-next';
import { RouterLink, useRouter } from 'vue-router';
import { useLocale, localizePath } from '../../i18n';
import { commercialCopy } from '../../locales/commercialInquiry';
import { contract, operationForMode, validateCommercial, normalizePhone, aircraftTypeOptions } from '../../features/aircraft-sales/commercialSchema';
import { commercialDraft, commercialNavigation } from '../../features/aircraft-sales/commercialDrafts';
import { useFieldValidation } from '../../features/aircraft-sales/useFieldValidation';
import { submitCommercialInquiry, commercialInquiryErrorKey } from '../../features/aircraft-sales/services/commercialInquiry.service';
import { trackAircraftInquiry, reportBlockedInquiryAttempt } from '../../features/aircraft-sales/services/aircraftInquiry.service';
const props = defineProps({ mode:{type:String,required:true} });
const router = useRouter();
const { locale, toLocalizedRoute } = useLocale();
const copy = computed(() => commercialCopy[locale.value]);
const operation = operationForMode[props.mode];
const config = contract.operations[operation];
const draft = commercialDraft(props.mode);
const form = draft.form;
const aircraftTypeText = ref('');
const busy = computed(() => ['validating','sending'].includes(draft.status));
const successPanel = ref(null);
const homeRedirectTimer = ref(null);
onBeforeUnmount(() => {
  if (homeRedirectTimer.value) clearTimeout(homeRedirectTimer.value);
});
const { fieldErrors, fieldAttrs, onBlur, onEdit, checkFields } = useFieldValidation(form, value => validateCommercial(value, operation));
const fields = computed(() => {
  const aircraft = [{key:'aircraftType',type:'text',max:80,options:aircraftTypeOptions(config.types),required:true,full:true}];
  if (props.mode === 'sell') aircraft.push({key:'manufacturer',max:80,required:true},{key:'model',max:100,required:true},{key:'year',max:4,inputmode:'numeric'});
  else aircraft.push({key:'model',max:120});
  aircraft.push({key:'country',max:80,autocomplete:'country-name',required:true});
  if(config.fields.service) aircraft.push({key:'service',max:120,required:true,full:true});
  return [...aircraft,{key:'name',max:100,required:true,autocomplete:'name',full:true},{key:'email',type:'email',max:254,required:true,autocomplete:'email'},{key:'phone',type:'tel',max:10,inputmode:'numeric',required:true,autocomplete:'tel-national'},{key:'comments',type:'textarea',max:1000,full:true}];
});
const fieldIcons = {
  aircraftType: Plane,
  manufacturer: Tag,
  model: Tag,
  year: Tag,
  country: MapPin,
  name: UserRound,
  email: Mail,
  phone: Phone,
  service: Wrench,
  comments: MessageCircle,
};
function label(key) {
  if(key==='model' && props.mode==='sell') return locale.value==='es'?'Modelo':'Model';
  if(key==='country' && props.mode!=='buy') return locale.value==='es'?'País de ubicación':'Aircraft location country';
  if(key==='comments' && props.mode==='maintenance') return locale.value==='es'?'Descripción general':'General description';
  return copy.value.fields[key];
}
function errorText(key) {
  const code=fieldErrors[key];
  if(key==='country' && code==='format') return locale.value==='es' ? 'Escribe la ubicación en texto simple, sin etiquetas HTML ni caracteres de control.' : 'Enter the location as plain text without HTML tags or control characters.';
  if(code==='length') {
    const rule=({...contract.common,...config.fields})[key];
    return locale.value==='es' ? (rule?.min ? 'Entre '+rule.min+' y ' : 'Máximo ') + rule?.max + ' caracteres.' : (rule?.min ? 'Between '+rule.min+' and ' : 'Maximum ') + rule?.max + ' characters.';
  }
  return copy.value.errors[code] || copy.value.errors.format;
}
function normalizedAircraftType(value) {
  return String(value ?? '').trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
}
function knownAircraftType(value) {
  const normalized = normalizedAircraftType(value);
  return fields.value.find(field => field.key === 'aircraftType')?.options.find(option => {
    const translated = copy.value.options[option.label] || option.label;
    return [option.value, option.label, translated].some(candidate => normalizedAircraftType(candidate) === normalized);
  });
}
function syncAircraftType() {
  const answer = aircraftTypeText.value.trim();
  form.aircraftType = answer ? (knownAircraftType(answer)?.value || 'other') : '';
}
function editPhone(event) {
  const input = event.target;
  const before = input.value;
  const cursor = input.selectionStart ?? before.length;
  const sanitize = value => {
    const raw = String(value ?? '');
    const digits = raw.replace(/[^0-9]/g, '');
    return raw.trimStart().startsWith('+') ? ('+' + digits).slice(0, 13) : digits.slice(0, 10);
  };
  const normalized = sanitize(before);
  const position = Math.min(sanitize(before.slice(0, cursor)).length, normalized.length);
  form.phone = normalized;
  input.value = normalized;
  input.setSelectionRange(position, position);
}
function pastePhone(event) {
  event.preventDefault();
  const input = event.target;
  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? start;
  const pasted = event.clipboardData.getData('text');
  const before = input.value.slice(0, start);
  const merged = before + pasted + input.value.slice(end);
  const digits = merged.replace(/[^0-9]/g, '');
  const hasInternationalPrefix = merged.trimStart().startsWith('+');
  form.phone = hasInternationalPrefix ? ('+' + digits).slice(0, 13) : digits.slice(0, 10);
  input.value = form.phone;
  const cursor = Math.min(before.replace(/[^0-9]/g, '').length + pasted.replace(/[^0-9]/g, '').length + (hasInternationalPrefix ? 1 : 0), input.value.length);
  input.setSelectionRange(cursor, cursor);
  onEdit(event);
}
function start() {
  commercialNavigation.selected=props.mode;
  if(!draft.started){draft.started=true;trackAircraftInquiry((props.mode==='buy'?'buyer':props.mode==='sell'?'seller':props.mode)+'_form_start');}
}
async function send(event) {
  if(busy.value || draft.result) { reportBlockedInquiryAttempt(); return; }
  form.phone=normalizePhone(form.phone);
  draft.status='validating';draft.error='';
  if(!await checkFields(event)){draft.status='idle';return;}
  const { values }=validateCommercial(form,operation);
  const typedAircraftType = aircraftTypeText.value.trim();
  if (typedAircraftType && !knownAircraftType(typedAircraftType)) {
    const description = `${values.comments ? `${values.comments}\n\n` : ''}${locale.value === 'es' ? 'Tipo de aeronave indicado' : 'Aircraft type provided'}: ${typedAircraftType}`;
    if (Array.from(description).length > contract.common.comments.max) {
      fieldErrors.comments = 'length';
      draft.status = 'idle';
      await nextTick();
      event.target.querySelector('[data-field="comments"]')?.focus();
      return;
    }
    values.comments = description;
  }
  const fingerprint=JSON.stringify(values);
  if(draft.fingerprint && draft.fingerprint!==fingerprint) draft.requestId=crypto.randomUUID();
  draft.fingerprint=fingerprint;
  draft.status='sending';
  const eventPrefix=props.mode==='buy'?'buyer':props.mode==='sell'?'seller':props.mode;
  trackAircraftInquiry(eventPrefix+'_form_submit');
  try {
    const response=await submitCommercialInquiry({...values,operation,requestId:draft.requestId,website:draft.website,locale:locale.value,privacyVersion:contract.version});
    draft.error='';
    draft.result=response;draft.status='success';
    if(!draft.tracked){
      draft.tracked=true;
      trackAircraftInquiry(eventPrefix+'_form_success',{submission_id:draft.requestId});
      if(props.mode==='buy'||props.mode==='sell'){
        trackAircraftInquiry(props.mode==='buy'?'aircraft_purchase_submit_success':'aircraft_sale_submit_success');
        const conversion=props.mode==='buy'?import.meta.env.VITE_AIRCRAFT_PURCHASE_ADS_SEND_TO:import.meta.env.VITE_SELLER_GOOGLE_ADS_SEND_TO;
        if(conversion)trackAircraftInquiry('conversion',{send_to:conversion,transaction_id:draft.requestId});
      }
    }
    await nextTick();
    successPanel.value?.focus({preventScroll:true});
    homeRedirectTimer.value = setTimeout(() => {
      homeRedirectTimer.value = null;
      router.push(toLocalizedRoute('Home'));
    }, 3000);
  } catch(error) {
    draft.status='error';
    draft.error=commercialInquiryErrorKey(error);
    if(error.fields){Object.assign(fieldErrors,error.fields);await nextTick();event.target.querySelector('[aria-invalid="true"]')?.focus();}
  }
}
</script>
<template>
  <div class="commercial-form">
    <section v-if="draft.result" ref="successPanel" class="confirmation" role="status" tabindex="-1">
      <CheckCircle2 :size="38" aria-hidden="true" /><h2>{{ copy.sent }}</h2><p>{{ copy.success }}</p>
      <p v-if="draft.result.folio" class="footnote">{{ copy.folio }}: {{ draft.result.folio }}</p>
      <p class="footnote">{{ copy.homeRedirect }}</p>
      <RouterLink :to="{path:locale==='en'?'/en/sell-aircraft':'/vender-aeronave',hash:'#servicios'}">{{ copy.back }}</RouterLink>
    </section>
    <form v-else @submit.prevent="send" @focusin="start" @focusout="onBlur" @input="onEdit" @change="onEdit" novalidate :aria-busy="busy">
      <p class="required-note">{{ copy.required }}</p>
      <fieldset :disabled="draft.status==='sending'"><legend class="sr-only">{{ copy.titles[mode] }}</legend><div class="form-grid">
        <label v-for="(field,index) in fields" :key="field.key" :for="'commercial-'+field.key" :class="{full:field.full}" :style="{'--field-index':index}">
          <span>{{ label(field.key) }} {{ field.required ? '*' : '('+copy.optional+')' }}</span>
          <span class="commercial-control" :class="{'commercial-control--textarea':field.type==='textarea','is-invalid':Boolean(fieldErrors[field.key])}">
            <component :is="fieldIcons[field.key]" class="commercial-control__icon" :size="19" :stroke-width="1.8" aria-hidden="true" />
            <input v-if="field.key==='aircraftType'" :id="'commercial-'+field.key" v-model="aircraftTypeText" v-bind="fieldAttrs(field.key)" type="text" :maxlength="field.max" :required="field.required" autocomplete="off" :placeholder="locale==='es'?'Escribe el tipo de aeronave':'Type the aircraft'" aria-describedby="aircraft-type-help" @input="syncAircraftType" />
            <select v-else-if="field.type==='select'" :id="'commercial-'+field.key" v-model="form[field.key]" v-bind="fieldAttrs(field.key)" :required="field.required" :aria-describedby="fieldErrors[field.key] ? 'field-error-'+field.key : undefined">
              <option disabled value="">{{ copy.select }}</option><option v-for="option in field.options" :key="option.value+':'+option.label" :value="option.value">{{ copy.options[option.label] || option.label }}</option>
            </select>
            <textarea v-else-if="field.type==='textarea'" :id="'commercial-'+field.key" v-model="form[field.key]" v-bind="fieldAttrs(field.key)" rows="3" :maxlength="field.max" />
            <input v-else-if="field.key==='phone'" :id="'commercial-'+field.key" :value="form.phone" @input="editPhone" @paste="pastePhone" v-bind="fieldAttrs(field.key)" type="tel" inputmode="tel" maxlength="13" pattern="(?:\+52)?[0-9]{10}" autocomplete="tel" :placeholder="copy.phonePlaceholder" required />
            <input v-else :id="'commercial-'+field.key" v-model="form[field.key]" v-bind="fieldAttrs(field.key)" :type="field.type||'text'" :inputmode="field.inputmode" :autocomplete="field.autocomplete" :maxlength="field.max" :required="field.required" :placeholder="field.key==='country'?copy.countryPlaceholder:field.key==='service'?copy.servicePlaceholder:field.key==='model'&&mode!=='sell'?copy.modelPlaceholder:undefined" />
          </span>
          <small v-if="fieldErrors[field.key]" :id="'field-error-'+field.key" class="field-error">{{ errorText(field.key) }}</small>
          <small v-if="field.key==='aircraftType'" id="aircraft-type-help" class="hint">{{ locale==='es' ? 'Escribe libremente el tipo de aeronave. Tu respuesta se enviará al equipo comercial.' : 'Type any aircraft type freely. Your answer will be sent to our commercial team.' }}</small>
          <small v-if="['manufacturer','model','country','comments'].includes(field.key)" class="hint">{{ locale==='es' ? 'Texto libre: no necesitas elegir una opción de catálogo.' : 'Free text: you do not need to choose from a catalog.' }}</small>
          <small v-if="field.key==='phone'" class="hint">{{ copy.phoneHint }}</small>
        </label>
      </div></fieldset>
      <label class="honeypot" aria-hidden="true">Website<input v-model="draft.website" tabindex="-1" autocomplete="off" /></label>
      <label class="consent" for="commercial-privacy"><input id="commercial-privacy" v-model="form.privacyAccepted" v-bind="fieldAttrs('privacyAccepted')" type="checkbox" required :disabled="draft.status==='sending'" /><span>{{ copy.privacyBefore }} <RouterLink :to="localizePath('/privacy',locale)" target="_blank" rel="noopener">{{ copy.privacy }}</RouterLink> {{ copy.privacyAfter }} *</span></label>
      <p v-if="fieldErrors.privacyAccepted" id="field-error-privacyAccepted" class="field-error">{{ errorText('privacyAccepted') }}</p>
      <p v-if="mode==='maintenance'" class="technical-note">{{ copy.technical }}</p>
      <div v-if="draft.error" class="form-alert" role="alert"><p>{{ copy[draft.error] }}</p><a href="mailto:sales@redskyg.com">{{ copy.contact }}</a></div>
      <button type="submit" class="commercial-submit" :disabled="busy"><LoaderCircle v-if="busy" class="spinner" :size="18" aria-hidden="true" /><span aria-live="polite">{{ draft.status==='validating'?copy.validating:draft.status==='sending'?copy.sending:copy.buttons[mode] }}</span><ArrowRight v-if="!busy" :size="18" aria-hidden="true" /></button>
      <p class="footnote">{{ copy.confidential }}</p>
    </form>
  </div>
</template>
<style scoped src="./commercialRequestForm.css"></style>
