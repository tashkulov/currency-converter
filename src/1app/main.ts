// src/app/index.ts
import { createApp } from 'vue';
import App from './App.vue';
import { router } from './providers/Router';
import { store } from './providers/Store';

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');
