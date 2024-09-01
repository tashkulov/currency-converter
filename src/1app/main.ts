// src/app/index.ts
import { createApp } from 'vue';
import App from './App.vue';
import { router } from './providers/Router'; // Импорт роутера
import { store } from './providers/Store'; // Подключение Pinia стора, если есть

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');
