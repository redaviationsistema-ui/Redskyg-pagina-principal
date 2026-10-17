<script setup>
import { computed, nextTick, ref } from 'vue';
import { ArrowRight, CheckCircle2, LoaderCircle } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';
import { useLocale, localizePath } from '../../i18n';
import { commercialCopy } from '../../locales/commercialInquiry';
import { contract, operationForMode, validateCommercial, normalizePhone, aircraftTypeOptions } from '../../features/aircraft-sales/commercialSchema';
import { commercialDraft, commercialNavigation } from '../../features/aircraft-sales/commercialDrafts';
import { useFieldValidation } from '../../features/aircraft-sales/useFieldValidation';
import { submitCommercialInquiry } from '../../features/aircraft-sales/services/commercialInquiry.service';
import { trackAircraftInquiry, reportBlockedInquiryAttempt } from '../../features/aircraft-sales/services/aircraftInquiry.service';
const props = defineProps({ mode:{type:String,required:true} });
const { locale, toLocalizedRoute } = useLocale();
const copy = computed(() => commercialCopy[locale.value]);
const operation = operationForMode[props.mode];
const config = contract.operations[operation];
const draft = commercialDraft(props.mode);
const form = draft.form;
const busy = computed(() => ['validating','sending'].includes(draft.status));
const successPanel = ref(null);
const { fieldErrors, fieldAttrs, onBlur, onEdit, checkFields } = useFieldValidation(form, value => validateCommercial(value, operation));
const fields = computed(() => {
  const aircraft = [{key:'aircraftType',type:'select',options:aircraftTypeOptions(config.types),required:true,full:true}];
  if (props.mode === 'sell') aircraft.push({key:'manufacturer',max:80,required:true},{key:'model',max:100,required:true},{key:'year',max:4,inputmode:'numeric'});
  else aircraft.push({key:'model',max:120,full:true});
  aircraft.push({key:'country',max:80,autocomplete:'country-name',required:true});
  if(config.fields.service) aircraft.push({key:'service',max:120,required:true});
  return [...aircraft,{key:'name',max:100,required:true,autocomplete:'name',full:true},{key:'email',type:'email',max:254,required:true,autocomplete:'email'},{key:'phone',type:'tel',max:10,inputmode:'numeric',required:true,autocomplete:'tel-national'},{key:'comments',type:'textarea',max:1000,full:true}];
});
function label(key) {
  if(key==='model' && props.mode==='sell') return locale.value==='es'?'Modelo':'Model';
  if(key==='country' && props.mode!=='buy') return locale.value==='es'?'País de ubicación':'Aircraft location country';
  if(key==='comments' && props.mode==='maintenance') return locale.value==='es'?'Descripción general':'General description';
  return copy.value.fields[key];
}
function errorText(key) {
  const code=fieldErrors[key];
  if(code==='length') {
    const rule=({...contract.common,...config.fields})[key];
    return locale.value==='es' ? (rule?.min ? 'Entre '+rule.min+' y ' : 'Máximo ') + rule?.max + ' caracteres.' : (rule?.min ? 'Between '+rule.min+' and ' : 'Maximum ') + rule?.max + ' characters.';
  }
  return copy.value.errors[code] || copy.value.errors.format;
}
function editPhone(event) {
  const input = event.target;
  const before = input.value;
  const position = normalizePhone(before.slice(0, input.selectionStart ?? before.length)).length;
  const normalized = normalizePhone(before);
  form.phone = normalized;
  input.value = normalized;
  input.setSelectionRange(position, position);
}
function pastePhone(event) {
  event.preventDefault();
  const input = event.target;
  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? start;
  const digits = event.clipboardData.getData('text').replace(/[^0-9]/g, '');
  const inserted = digits.slice(0, Math.max(0, 10 - (input.value.length - (end - start))));
  form.phone = normalizePhone(input.value.slice(0, start) + inserted + input.value.slice(end));
  input.value = form.phone;
  input.setSelectionRange(start + inserted.length, start + inserted.length);
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
  const fingerprint=JSON.stringify(values);
  if(draft.fingerprint && draft.fingerprint!==fingerprint) draft.requestId=crypto.randomUUID();
  draft.fingerprint=fingerprint;
  draft.status='sending';
  const eventPrefix=props.mode==='buy'?'buyer':props.mode==='sell'?'seller':props.mode;
  trackAircraftInquiry(eventPrefix+'_form_submit');
  try {
    const response=await submitCommercialInquiry({...values,operation,requestId:draft.requestId,website:draft.website,locale:locale.value,privacyVersion:contract.version});
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
    await nextTick();successPanel.value?.focus({preventScroll:true});
  } catch(error) {
    draft.status='error';draft.error=['delivery_unknown','in_progress'].includes(error.code)?'uncertain':error.code==='rate_limit'?'rateLimit':'retry';
    if(error.fields){Object.assign(fieldErrors,error.fields);await nextTick();event.target.querySelector('[aria-invalid="true"]')?.focus();}
  }
}
</script>
<template>
  <div class="commercial-form">
    <section v-if="draft.result" ref="successPanel" class="confirmation" role="status" tabindex="-1">
      <CheckCircle2 :size="38" aria-hidden="true" /><h2>{{ copy.sent }}</h2><p>{{ draft.result.delivery === 'pending' ? copy.saved : ['failed','unknown','not_configured'].includes(draft.result.clientConfirmation) ? copy.confirmationFailed : copy.success }}</p>
      <p v-if="draft.result.folio" class="footnote">{{ copy.folio }}: {{ draft.result.folio }}</p>
      <RouterLink :to="{path:locale==='en'?'/en/sell-aircraft':'/vender-aeronave',hash:'#servicios'}">{{ copy.back }}</RouterLink>
    </section>
    <form v-else @submit.prevent="send" @focusin="start" @focusout="onBlur" @input="onEdit" @change="onEdit" novalidate :aria-busy="busy">
      <p class="required-note">{{ copy.required }}</p>
      <fieldset :disabled="draft.status==='sending'"><legend class="sr-only">{{ copy.titles[mode] }}</legend><div class="form-grid">
        <label v-for="field in fields" :key="field.key" :for="'commercial-'+field.key" :class="{full:field.full}">
          <span>{{ label(field.key) }} {{ field.required ? '*' : '('+copy.optional+')' }}</span>
          <select v-if="field.type==='select'" :id="'commercial-'+field.key" v-model="form[field.key]" v-bind="fieldAttrs(field.key)" :required="field.required" :aria-describedby="fieldErrors[field.key] ? 'field-error-'+field.key : field.key==='aircraftType' ? 'aircraft-type-help' : undefined">
            <option disabled value="">{{ copy.select }}</option><option v-for="option in field.options" :key="option.value" :value="option.value">{{ copy.options[option.label] || option.label }}</option>
          </select>
          <textarea v-else-if="field.type==='textarea'" :id="'commercial-'+field.key" v-model="form[field.key]" v-bind="fieldAttrs(field.key)" rows="3" :maxlength="field.max" />
          <input v-else-if="field.key==='phone'" :id="'commercial-'+field.key" :value="form.phone" @input="editPhone" @paste="pastePhone" v-bind="fieldAttrs(field.key)" type="tel" inputmode="numeric" maxlength="10" pattern="[0-9]{10}" autocomplete="tel-national" :placeholder="copy.phonePlaceholder" required />
          <input v-else :id="'commercial-'+field.key" v-model="form[field.key]" v-bind="fieldAttrs(field.key)" :type="field.type||'text'" :inputmode="field.inputmode" :autocomplete="field.autocomplete" :maxlength="field.max" :required="field.required" :placeholder="field.key==='country'?copy.countryPlaceholder:field.key==='service'?copy.servicePlaceholder:field.key==='model'&&mode!=='sell'?copy.modelPlaceholder:undefined" />
          <small v-if="fieldErrors[field.key]" :id="'field-error-'+field.key" class="field-error">{{ errorText(field.key) }}</small>
          <small v-if="field.key==='aircraftType'" id="aircraft-type-help" class="hint" aria-live="polite">{{ copy.aircraftHelp[form.aircraftType] || copy.aircraftPrompt }}</small>
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
