import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import axios from 'axios';


axios.defaults.baseURL = "https://survey.rda.gov.ge/api";
// axios.defaults.baseURL = "http://localhost:8000/api";

const app = createApp(App);
app.use(router);
app.mount('#app')