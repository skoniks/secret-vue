import { createApp } from 'vue';
import App from './App.vue';
import router from './plugins/router';

import '@fontsource/nunito';
// import '@fontsource/nunito/200.css';
// import '@fontsource/nunito/400.css';
// import '@fontsource/nunito/500.css';
// import '@fontsource/nunito/700.css';
import './assets/main.css';

const app = createApp(App);
app.use(router);
app.mount('#app');
