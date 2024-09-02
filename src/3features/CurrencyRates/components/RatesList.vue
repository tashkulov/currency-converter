<template>
  <div class="rates-container">
    <h2 class="rates-title">Курсы валют</h2>
    <ul class="rates-list">
      <li v-for="(rate, currency) in filteredRates" :key="currency" class="rate-item">
        <span class="currency-pair">1 {{ baseCurrency }} =</span>
        <span class="rate-value">{{ rate.toFixed(2) }}</span>
        <span class="currency-code">{{ currency }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useCurrencyRates } from '../model';

const store = useCurrencyRates();

const baseCurrency = computed(() => store.baseCurrency.value);
const rates = computed(() => store.updateRates());

const filteredRates = computed(() => {
  const base = baseCurrency.value;
  const ratesValue = rates.value || {};
  const convertedRates: Record<string, number> = {};

  for (const [currency, rate] of Object.entries(ratesValue)) {
    if (currency !== base && ratesValue[base] !== undefined) {
      convertedRates[currency] = rate / ratesValue[base];
    }
  }

  return convertedRates;
});

watch(baseCurrency, () => {
  store.updateRates();
});
</script>

<style scoped>
.rates-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 25px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: linear-gradient(145deg, #ffffff, #f3f4f6);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05), inset 0 1px 3px rgba(255, 255, 255, 0.6);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.rates-container:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.1), inset 0 2px 5px rgba(255, 255, 255, 0.7);
  transform: translateY(-4px);
}

.rates-title {
  margin-bottom: 20px;
  font-size: 26px;
  font-weight: 700;
  color: #2c3e50;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.rates-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.rate-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  border-bottom: 1px solid #e6e6e6;
  font-size: 16px;
  color: #333;
  background: linear-gradient(145deg, #fafafa, #f0f0f0);
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.3s ease, color 0.3s ease;
}

.rate-item:hover {
  background-color: #f1f9ff;
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.1);
}

.currency-pair {
  font-weight: 500;
  color: #3a3a3a;
}

.rate-value {
  font-weight: 600;
  color: #007bff;
  font-size: 18px;
}

.currency-code {
  color: #7b8a8b;
  font-weight: 400;
  font-size: 15px;
}

.rate-item {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>

