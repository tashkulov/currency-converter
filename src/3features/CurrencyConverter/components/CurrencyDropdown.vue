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
  modelValue: string;
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
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  color: #333;
  background-color: #f9f9f9;
  transition: border-color 0.3s, box-shadow 0.3s;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;
}

.currency-dropdown:focus {
  border-color: #a3a3a3;
  box-shadow: 0 0 0 2px rgba(163, 163, 163, 0.2);
  outline: none;
}

.currency-dropdown:hover {
  border-color: #bbb;
}

.currency-dropdown option {
  font-size: 16px;
  padding: 10px;
}
</style>
