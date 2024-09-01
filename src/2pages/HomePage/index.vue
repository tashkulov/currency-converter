<template>
  <div class="home-page">
    <h1>Курсы валют</h1>
    <RatesList :baseCurrency="baseCurrency" :rates="rates" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useCurrencyRates } from '../../3features/CurrencyRates/model';
import RatesList from '../../3features/CurrencyRates/components/RatesList.vue';

// Подключаем стор для работы с курсами валют
const store = useCurrencyRates();

// Загружаем курсы при монтировании компонента
onMounted(() => {
  store.loadRates();
});

// Регистрируем реактивные данные для отображения
const rates = computed(() => store.rates);
const baseCurrency = computed(() => store.baseCurrency);
</script>

<style scoped>
.home-page {
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}
</style>
