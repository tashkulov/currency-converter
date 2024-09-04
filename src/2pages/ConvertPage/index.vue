<template>
  <div class="converter-form">
    <div class="converter-row">
      <CurrencyDropdown v-model="currency1" />
      <input
          type="number"
          v-model.number="value1"
          @input="handleInput(1)"
          :class="['currency-input', { 'input-error': errors.value1 }]"
          placeholder="Введите сумму"
      />
      <span v-if="errors.value1" class="error-message">{{ errors.value1 }}</span>
    </div>

    <div class="converter-row">
      <CurrencyDropdown v-model="currency2" />
      <input
          type="number"
          v-model.number="value2"
          @input="handleInput(2)"
          :class="['currency-input', { 'input-error': errors.value2 }]"
          placeholder="Введите сумму"
      />
      <span v-if="errors.value2" class="error-message">{{ errors.value2 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import CurrencyDropdown from "../../3features/CurrencyConverter/components/CurrencyDropdown.vue";
import { fetchCurrencyRates } from "../../4shared/api/currencyApi.ts";

const currency1 = ref('USD');
const currency2 = ref('RUB');
const value1 = ref<number | string>('');
const value2 = ref<number | string>('');
const errors = ref({ value1: '', value2: '' });

const rates = ref<Record<string, number>>({});

async function loadRates() {
  try {
    const data = await fetchCurrencyRates('USD');
    rates.value = data;
  } catch (error) {
    console.error('Не удалось загрузить курсы валют', error);
  }
}

loadRates();

function convert(source: number) {
  if (!rates.value) return;

  const conversionRate = source === 1
      ? getConversionRate(currency1.value, currency2.value)
      : getConversionRate(currency2.value, currency1.value);

  if (source === 1 && !errors.value1) {
    value2.value = +(value1.value as number * conversionRate).toFixed(2);
  } else if (source === 2 && !errors.value2) {
    value1.value = +(value2.value as number * conversionRate).toFixed(2);
  }
}

function handleInput(source: number) {
  const value = source === 1 ? value1.value : value2.value;

  if (typeof value === 'string' || value < 0) {
    errors.value[source === 1 ? 'value1' : 'value2'] = 'Введите корректное положительное число';
  } else {
    errors.value[source === 1 ? 'value1' : 'value2'] = '';
    convert(source);
  }
}

function getConversionRate(fromCurrency: string, toCurrency: string): number {
  if (fromCurrency === 'USD') {
    return rates.value[toCurrency] || 1;
  }

  if (toCurrency === 'USD') {
    return 1 / (rates.value[fromCurrency] || 1);
  }

  const fromToUSD = 1 / (rates.value[fromCurrency] || 1);
  const usdToTarget = rates.value[toCurrency] || 1;
  return fromToUSD * usdToTarget;
}

watch([currency1, currency2], () => convert(1));
</script>

<style scoped>
.converter-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s, border-color 0.3s;
}

.converter-form:hover {
  border-color: #d4d4d4;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.converter-row {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.currency-input {
  flex: 1;
  padding: 12px 14px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  color: #333;
  background-color: #fff;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s, box-shadow 0.3s, background-color 0.3s;
}

.currency-input::placeholder {
  color: #aaa;
  font-style: italic;
}

.currency-input:focus {
  border-color: #5c9ded;
  box-shadow: 0 0 0 3px rgba(92, 157, 237, 0.3);
  outline: none;
  background-color: #fdfdfd;
}

.currency-input:hover {
  border-color: #c0c0c0;
}

.currency-input:disabled {
  background-color: #f0f0f0;
  border-color: #d4d4d4;
  color: #999;
  cursor: not-allowed;
}

.currency-input:active {
  border-color: #5c9ded;
  background-color: #f0f8ff;
}

.input-error {
  border-color: #f44336;
  background-color: #ffe6e6;
}

.error-message {
  color: #f44336;
  font-size: 12px;
  margin-top: 4px;
}
</style>
