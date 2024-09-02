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
import { computed } from 'vue';
import { useCurrencyRates } from '../../3features/CurrencyRates/model.ts';

const store = useCurrencyRates();

const baseCurrency = computed(() => store.baseCurrency.value);

function updateBaseCurrency() {
  store.setBaseCurrency(baseCurrency.value);
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.nav {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  text-decoration: none;
  color: #ffffff;
  font-weight: 600;
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
  transition: color 0.3s ease, border-color 0.3s ease;
}

.nav-link:hover {
  color: #ffdd57;
  border-color: #ffdd57;
}

.currency-select {
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 14px;
  transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
  backdrop-filter: blur(8px);
}

.currency-select:focus {
  border-color: #ffdd57;
  outline: none;
  background: rgba(255, 255, 255, 0.3);
}

.currency-select option {
  background: #ffffff;
  color: #333;
}

.currency-select option:hover {
  background: #f0f0f0;
  color: #000;
}
</style>
