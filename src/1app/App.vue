<template>
  <div id="app">
    <!-- Основной хедер с навигацией и выбором основной валюты -->
    <Header />

    <router-view />
  </div>
</template>

<script setup lang="ts">
import Header from '../4shared/ui/Header.vue'; // Подключение компонента Header
</script>

<style scoped>

</style>
