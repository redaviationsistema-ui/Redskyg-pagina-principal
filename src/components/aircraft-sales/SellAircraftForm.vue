<script setup>
import CommercialRequestForm from './CommercialRequestForm.vue';
defineProps({ embedded: Boolean });
</script>
<template><div :id="embedded ? undefined : 'evaluacion'"><CommercialRequestForm mode="sell" /></div></template>
