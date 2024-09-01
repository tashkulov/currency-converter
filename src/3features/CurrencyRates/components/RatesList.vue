<template>
  <ul class="rates-list">
    <li v-for="(rate, currency) in rates" :key="currency">
      1 {{ baseCurrency }} = {{ rate.toFixed(2) }} {{ currency }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  rates: Record<string, number>;
  baseCurrency: string;
}>();
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
