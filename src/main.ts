import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from '@/store';
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import './assets/tailwind.css';
import WebSocketManager from "@/services/ws/WebSocketManager.vue";
import Mount from './components/util/Mount';
// import apolloProvider from "@/services/graphql/provider-init";

import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

loadFonts()

Mount.component(WebSocketManager);

const app = createApp(App);
app
  .use(router)
  .use(vuetify)
  .use(pinia)
  // .use(apolloProvider)
  .mount('#app');


