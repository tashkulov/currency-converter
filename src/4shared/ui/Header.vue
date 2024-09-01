<template>
  <header class="header">
    <nav class="nav">
      <router-link to="/" class="nav-link">Главная</router-link>
      <router-link to="/convert" class="nav-link">Конвертация</router-link>
    </nav>
    <select v-model="baseCurrency" @change="updateBaseCurrency" class="currency-select">
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="RUB">RUB</option>
    </select>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCurrencyRates } from '../../3features/CurrencyRates/model';

const store = useCurrencyRates();
const baseCurrency = ref(store.baseCurrency);

function updateBaseCurrency() {
  store.setBaseCurrency(baseCurrency.value);
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ddd;
}

.nav {
  display: flex;
  gap: 1rem;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.currency-select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
