import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import axios from 'axios';

axios.defaults.baseURL = "http://172.16.31.18/exhibition_api/public/api";

const app = createApp(App);
app.use(router);
app.mount('#app')