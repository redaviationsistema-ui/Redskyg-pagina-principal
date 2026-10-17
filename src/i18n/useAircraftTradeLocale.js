import { localizedInquiryError } from '../features/aircraft-sales/services/aircraftInquiry.service.js';
import { computed, watch } from 'vue';
import { useLocale, localizePath } from './index';
import es from '../locales/es';
import en from '../locales/en';
const messages = { es, en };
export function useAircraftTradeLocale() {
  const { locale, isEnglish } = useLocale();
  const t = value => {
    if (value == null) return '';
    const text = String(value);
    return messages[locale.value].aircraftTrade[text] ?? text;
  };
  const privacyPath = computed(() => localizePath('/privacy', locale.value));
  const displayError = message => {
    if (!message) return '';
    const inquiryMessage = localizedInquiryError(message, locale.value);
    if (inquiryMessage) return inquiryMessage;
    return locale.value === 'en'
      ? en.aircraftTrade[message] || 'We could not complete your request. Please try again or contact our team.'
      : message;
  };
  const invalidFields = new Set();
  function handleInvalid(event) {
    const field = event.target;
    if (!field?.setCustomValidity) return;
    const message = field.validity.typeMismatch && field.type === 'email'
      ? 'Ingresa un correo electrónico válido.'
      : field.validity.valueMissing ? 'Completa los campos obligatorios.' : 'Revisa este campo.';
    field.setCustomValidity(t(message));
    invalidFields.add(field);
  }
  function clearValidity(event) { event.target?.setCustomValidity?.(''); invalidFields.delete(event.target); }
  watch(locale, () => { invalidFields.forEach(field => field.setCustomValidity('')); invalidFields.clear(); });
  return { t, locale, isEnglish, privacyPath, displayError, handleInvalid, clearValidity };
}
