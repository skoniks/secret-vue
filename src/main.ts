import { createApp } from 'vue';
import App from './App.vue';
import router from './plugins/router';
import { createPinia } from 'pinia';

import '@fontsource/nunito';
import './assets/main.css';

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);
app.mount('#app');
