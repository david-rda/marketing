import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import axios from 'axios';
import VueSweetalert2 from "vue-sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';

import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css'

// axios.defaults.baseURL = "http://localhost/exhibition_api/public/api";
axios.defaults.baseURL = "https://survey.rda.gov.ge/api";
// axios.defaults.baseURL = "http://localhost:8000/api";

const app = createApp(App);

app.use(
    VueTippy,
    {
        directive: 'tippy',
        component: 'tippy',
        componentSingleton: 'tippy-singleton',
        defaultProps: {
            placement: 'top',
            allowHTML: true,
        },
    }
)

app.use(router);
app.use(VueSweetalert2);
app.mount('#app')