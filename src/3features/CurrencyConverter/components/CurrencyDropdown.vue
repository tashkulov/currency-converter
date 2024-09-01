<template>
  <select v-model="selectedCurrency" @change="emitCurrencyChange" class="currency-dropdown">
    <option v-for="currency in currencies" :key="currency" :value="currency">
      {{ currency }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps<{
  modelValue: string; // Выбранная валюта
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const currencies = ['USD', 'EUR', 'RUB'];

const selectedCurrency = ref(props.modelValue);

watch(
    () => props.modelValue,
    (newValue) => {
      selectedCurrency.value = newValue;
    }
);

function emitCurrencyChange() {
  emit('update:modelValue', selectedCurrency.value);
}
</script>

<style scoped>
.currency-dropdown {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}
</style>
