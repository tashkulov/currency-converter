<template>
  <div class="convert-page">
    <h1>Конвертация валют</h1>
    <ConverterForm />
  </div>
</template>

<script setup lang="ts">
import ConverterForm from '../../3features/CurrencyConverter/components/ConverterFrom.vue';
</script>

<style scoped>
.convert-page {
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}
</style>
