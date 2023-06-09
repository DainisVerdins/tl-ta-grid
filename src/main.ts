import { createApp } from 'vue';
import BootstrapVueNext from 'bootstrap-vue-next';
import ToastPlugin from 'vue-toast-notification';
// Global scss styles
import './style.scss';

/* STYLES SECTION */

// Bootstrap vue styles 
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

// bootstrap icons
import "bootstrap-icons/font/bootstrap-icons.css";

// For Vue3date picker styles 
import '@vuepic/vue-datepicker/dist/main.css';

// Toast notification css
import 'vue-toast-notification/dist/theme-bootstrap.css';


import App from './App.vue';

const app = createApp(App);
app.use(BootstrapVueNext);
app.use(ToastPlugin, {
    position: 'top-right'
});
app.mount('#app');
