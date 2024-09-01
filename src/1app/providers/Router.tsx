// src/app/providers/Router.ts
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../../2pages/HomePage/index.vue'; // Страница "Главная"
import ConvertPage from '../../2pages/ConvertPage/index.vue'; // Страница "Конвертация"

// Определение маршрутов
const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/convert', name: 'Convert', component: ConvertPage },
];

// Создание роутера
export const router = createRouter({
    history: createWebHistory(), // Используем HTML5 History API
    routes,
});
