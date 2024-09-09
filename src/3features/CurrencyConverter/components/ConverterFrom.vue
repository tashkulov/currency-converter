<template>
  <div class="converter-form">
    <div class="converter-row">
      <CurrencyDropdown v-model="currency1" />
      <input
          type="number"
          v-model.number="value1"
          @input="convert(1)"
          placeholder="Введите сумму"
          class="currency-input"
      />
    </div>

    <div class="converter-row">
      <CurrencyDropdown v-model="currency2" />
      <input
          type="number"
          v-model.number="value2"
          @input="convert(2)"
          placeholder="Введите сумму"
          class="currency-input"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { fetchCurrencyRates } from '../../../4shared/api/currencyApi.ts';
import CurrencyDropdown from './CurrencyDropdown.vue';

const currency1 = ref('USD');
const currency2 = ref('RUB');
const value1 = ref(0);
const value2 = ref(0);

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

  if (source === 1) {
    const conversionRate = getConversionRate(currency1.value, currency2.value);
    value2.value = +(value1.value * conversionRate).toFixed(2);
  } else {
    const conversionRate = getConversionRate(currency2.value, currency1.value);
    value1.value = +(value2.value * conversionRate).toFixed(2);
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
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: #fdfdfd;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s, border-color 0.3s;
}

.converter-form:hover {
  border-color: #d1d1d1;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
}

.converter-row {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.currency-input {
  flex: 1;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  color: #333;
  background-color: #fafafa;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s, box-shadow 0.3s, background-color 0.3s;
}

.currency-input::placeholder {
  color: #a0a0a0;
}

.currency-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.2);
  outline: none;
  background-color: #fff;
}

.currency-input:hover {
  border-color: #bbb;
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.15);
}

.currency-input:disabled {
  background-color: #f0f0f0;
  border-color: #ddd;
  color: #999;
  cursor: not-allowed;
}

.currency-input:active {
  border-color: #007bff;
  background-color: #e8f0fe;
}
</style>
