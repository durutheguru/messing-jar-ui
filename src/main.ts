import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from '@/store';
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import './assets/tailwind.css';

import { Chart, registerables } from "chart.js";

Chart.register(...registerables);


loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .use(pinia)
  .mount('#app')
