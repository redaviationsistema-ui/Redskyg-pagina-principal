<script setup>
import CommercialRequestForm from './CommercialRequestForm.vue';
defineProps({ mode:{type:String,required:true} });
</script>
<template><CommercialRequestForm :key="mode" :mode="mode" /></template>
