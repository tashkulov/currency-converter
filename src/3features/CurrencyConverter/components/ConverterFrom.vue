<template>
  <div class="converter-form">
    <div class="converter-row">
      <!-- Выпадающий список для выбора первой валюты -->
      <CurrencyDropdown v-model="currency1" />

      <!-- Поле ввода для первой валюты -->
      <input
          type="number"
          v-model.number="value1"
          @input="convert(1)"
          placeholder="Введите сумму"
          class="currency-input"
      />
    </div>

    <div class="converter-row">
      <!-- Выпадающий список для выбора второй валюты -->
      <CurrencyDropdown v-model="currency2" />

      <!-- Поле ввода для второй валюты -->
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
import CurrencyDropdown from './CurrencyDropdown.vue';
import { fetchCurrencyRates } from '../../../4shared/api/currencyApi'; // Импорт функции для получения курсов валют

// Состояния выбранных валют и введенных значений
const currency1 = ref('USD');
const currency2 = ref('RUB');
const value1 = ref(0);
const value2 = ref(0);

// Состояние для хранения курсов валют
const rates = ref<Record<string, number>>({});

// Функция для загрузки курсов валют при загрузке компонента
async function loadRates() {
  try {
    const data = await fetchCurrencyRates();
    rates.value = data;
  } catch (error) {
    console.error('Не удалось загрузить курсы валют', error);
  }
}

// Вызов загрузки курсов при инициализации компонента
loadRates();

// Функция для конвертации значений при вводе
function convert(source: number) {
  if (!rates.value) return;

  if (source === 1) {
    // Определяем курс для конвертации из первой валюты во вторую
    const conversionRate = getConversionRate(currency1.value, currency2.value);
    value2.value = +(value1.value * conversionRate).toFixed(2);
  } else {
    // Определяем курс для конвертации из второй валюты в первую
    const conversionRate = getConversionRate(currency2.value, currency1.value);
    value1.value = +(value2.value * conversionRate).toFixed(2);
  }
}

// Функция для получения курса конвертации между двумя валютами
function getConversionRate(fromCurrency: string, toCurrency: string): number {
  // Пример: из USD в RUB => 'usd-rub'
  const rateKey = `${fromCurrency.toLowerCase()}-${toCurrency.toLowerCase()}`;
  const rate = rates.value[rateKey];

  // Если курс найден, возвращаем его, иначе 1 (при отсутствии курса)
  return rate ? rate : 1;
}

// Следим за изменением валют и конвертируем значения
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
