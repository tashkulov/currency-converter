<template>
  <ul class="rates-list">
    <li v-for="(rate, currency) in filteredRates" :key="currency">
      1 {{ baseCurrency }} = {{ rate.toFixed() }} {{ currency }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useCurrencyRates } from '../model';

const store = useCurrencyRates();

// Реактивные данные для использования в шаблоне
const baseCurrency = computed(() => store.baseCurrency.value);
const rates = computed(() => store.updateRates());

// Фильтрованные и пересчитанные курсы относительно базовой валюты
const filteredRates = computed(() => {
  const base = baseCurrency.value;
  const ratesValue = rates.value || {}; // Защита от null или undefined
  const convertedRates: Record<string, number> = {};

  // Пересчёт курсов на основе выбранной базовой валюты
  for (const [currency, rate] of Object.entries(ratesValue)) {
    if (currency !== base && ratesValue[base] !== undefined) {
      convertedRates[currency] = rate / ratesValue[base];
    }
  }

  return convertedRates;
});

// Следим за изменением базовой валюты и обновляем курсы
watch(baseCurrency, () => {
  store.updateRates(); // Обновляет курсы при смене базовой валюты
});
</script>

<style scoped>
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
