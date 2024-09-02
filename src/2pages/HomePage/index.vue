<template>
  <div class="home-page">
    <h1>Курсы валют</h1>
    <ul class="rates-list">
      <li v-for="(rate, currency) in filteredRates" :key="currency">
        1 {{ baseCurrency }} = {{ rate.toFixed(2) }} {{ currency }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useCurrencyRates } from '../../3features/CurrencyRates/model';

const store = useCurrencyRates();

// Загружаем курсы при монтировании компонента
onMounted(() => {
  store.updateRates();
});

// Регистрируем реактивные данные для отображения
const baseCurrency = computed(() => store.baseCurrency.value);
const rates = computed(() => store.rates.value);

const filteredRates = computed(() => {
  const ratesValue = rates.value || {}; // Защита от null или undefined
  const base = baseCurrency.value;
  const convertedRates: Record<string, number> = {};

  // Пересчёт курсов на основе выбранной базовой валюты
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
}

h1 {
  margin-bottom: 20px;
}

.rates-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 8px 0;
  font-size: 16px;
}
</style>
