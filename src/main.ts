import { createApp } from 'vue';
import './style.css';

// TODO add suport of scss and change default variable colors to proper ones

// Bootstrap vue styles 
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

// For Vue3date picker styles 
import '@vuepic/vue-datepicker/dist/main.css';

import App from './App.vue';

createApp(App).mount('#app');
