<template>
  <div class="home-page">
    <h1>Курсы валют</h1>
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
import { computed, onMounted } from 'vue';
import { useCurrencyRates } from '../../3features/CurrencyRates/model';

const store = useCurrencyRates();

onMounted(() => {
  store.updateRates();
});

const baseCurrency = computed(() => store.baseCurrency.value);
const rates = computed(() => store.rates.value);

const filteredRates = computed(() => {
  const ratesValue = rates.value || {};
  const base = baseCurrency.value;
  const convertedRates: Record<string, number> = {};

  if (ratesValue[base] !== undefined) {
    for (const [currency, rate] of Object.entries(ratesValue)) {
      if (currency !== base) {
        convertedRates[currency] = rate / ratesValue[base];
      }
    }
  }

  return convertedRates;
});
</script>

<style scoped>
.home-page {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.rates-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.rate-item {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  font-size: 16px;
  color: #555;
}

.currency-pair {
  font-weight: 500;
}

.rate-value {
  font-weight: bold;
  margin: 0 5px;
}

.currency-code {
  color: #888;
}
</style>
