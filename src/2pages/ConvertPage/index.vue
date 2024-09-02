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
import CurrencyDropdown from "../../3features/CurrencyConverter/components/CurrencyDropdown.vue";
import {fetchCurrencyRates} from "../../4shared/api/currencyApi.ts";

const currency1 = ref('USD');
const currency2 = ref('RUB');
const value1 = ref(0);
const value2 = ref(0);

// Состояние для хранения курсов валют
const rates = ref<Record<string, number>>({});

async function loadRates() {
  try {
    // Загрузка курсов с выбранной базовой валютой (например, USD)
    const data = await fetchCurrencyRates('USD');
    rates.value = data;
  } catch (error) {
    console.error('Не удалось загрузить курсы валют', error);
  }
}

// Загрузка курсов при инициализации компонента
loadRates();

// Функция для конвертации значений при вводе в поля
function convert(source: number) {
  if (!rates.value) return;

  if (source === 1) {
    // Конвертация из первой валюты во вторую
    const conversionRate = getConversionRate(currency1.value, currency2.value);
    value2.value = +(value1.value * conversionRate).toFixed(2);
  } else {
    // Конвертация из второй валюты в первую
    const conversionRate = getConversionRate(currency2.value, currency1.value);
    value1.value = +(value2.value * conversionRate).toFixed(2);
  }
}

// Функция для получения курса конвертации между двумя валютами
function getConversionRate(fromCurrency: string, toCurrency: string): number {
  // Если исходная валюта совпадает с базовой (USD), возвращаем прямой курс
  if (fromCurrency === 'USD') {
    return rates.value[toCurrency] || 1;
  }

  // Если целевая валюта совпадает с базовой (USD), возвращаем обратный курс
  if (toCurrency === 'USD') {
    return 1 / (rates.value[fromCurrency] || 1);
  }

  // В других случаях сначала переводим из исходной валюты в USD, затем из USD в целевую валюту
  const fromToUSD = 1 / (rates.value[fromCurrency] || 1);
  const usdToTarget = rates.value[toCurrency] || 1;
  return fromToUSD * usdToTarget;
}

// Следим за изменением выбранных валют и конвертируем значения
watch([currency1, currency2], () => convert(1));
</script>

<style scoped>
.converter-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.converter-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.currency-input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}
</style>
