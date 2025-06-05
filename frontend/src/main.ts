import Vue from 'vue';

// import {createBootstrap} from 'bootstrap-vue-next';

// Add the necessary CSS
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router';


createApp(App)
  .use(router)
  // .use(createBootstrap())
  .mount('#app')
