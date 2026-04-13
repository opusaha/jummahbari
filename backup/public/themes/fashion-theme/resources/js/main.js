if (typeof window !== 'undefined' && window.__webpack_public_path__) {
    __webpack_public_path__ = window.__webpack_public_path__;
}

import axios from "axios";
// Set global axios defaults for subdirectory support
axios.defaults.baseURL = window.baseUrl || '/';

// Add interceptor to strip leading slash from URLs to respect baseURL path
axios.interceptors.request.use(config => {
    if (config.url && config.url.startsWith('/') && axios.defaults.baseURL !== '/') {
        config.url = config.url.substring(1);
    }
    return config;
});

// Recursive function to fix paths in response data
const fixPaths = (obj) => {
    if (!obj || typeof obj !== 'object') return obj;
    const base = window.baseUrl || '/';
    if (base === '/') return obj;

    for (let key in obj) {
        if (typeof obj[key] === 'string') {
            // Fix paths starting with /public/ or /themes/
            if (obj[key].startsWith('/public/') || obj[key].startsWith('/themes/')) {
                obj[key] = base + obj[key].substring(1);
            }
        } else if (typeof obj[key] === 'object') {
            fixPaths(obj[key]);
        }
    }
    return obj;
};

// Add response interceptor
axios.interceptors.response.use(response => {
    if (response.data) {
        fixPaths(response.data);
    }
    return response;
});

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BaseIconSvg from "./components/global/BaseIconSvg.vue";
import SectionTitle from "./components/global/SectionTitle.vue";
import TheLogo from "./components/global/TheLogo.vue";
import Currency from "./components/global/Currency.vue"
import Skeleton from "./components/skeleton/Skeleton.vue"
import BaseFileInput from "./components/global/BaseFileInput.vue"
import i18n from "./i18n_setup";
import vSelect from "vue-select";
import ToastPlugin from 'vue-toast-notification';
import NotFound from "./components/global/NotFound.vue"
import VueSocialSharing from 'vue-social-sharing'

const app = createApp(App);

app.use(i18n);
app.use(store);
app.use(router);
app.use(ToastPlugin);
app.use(VueSocialSharing);
app.component("base-icon-svg", BaseIconSvg);
app.component("base-file-input", BaseFileInput);
app.component("section-title", SectionTitle);
app.component("the-logo", TheLogo);
app.component("the-currency", Currency);
app.component("v-select", vSelect);
app.component('the-not-found', NotFound);
app.component('skeleton', Skeleton);

// add global helper
app.config.globalProperties.$translateLanguage = function (val) {
    return this.$t(val);
};

app.config.globalProperties.$asset = function (path) {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const base = window.baseUrl || '/';
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return base + cleanPath;
};

app.mount("#app");

//Import coreui Styles
import 'bootstrap/dist/css/bootstrap.css'
import "@coreui/coreui/dist/css/coreui.min.css";

//Toast notification
import 'vue-toast-notification/dist/theme-sugar.css';


//Import Google Icons Style
import "./assets/css/google-icons.css";

//Import Main Style
import "./assets/sass/app.scss";
