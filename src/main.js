import './assets/all.scss';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import Vue3Marquee from 'vue3-marquee';
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import VueCookies from 'vue-cookies'; // 可移除cookies
import CKEditor from '@ckeditor/ckeditor5-vue';

import App from './App.vue';
import router from './router';
import { currency, date } from './methods/filters';

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);

configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});
setLocale('zh_TW');

const app = createApp(App);

app.config.globalProperties.$filters = {
  currency, date,
};

app.use(createPinia());
app.component('VLoading', Loading);
app.component('VForm', Form);
app.component('VField', Field);
app.component('ErrorMessage', ErrorMessage);
app.use(Vue3Marquee);
app.use(router);
app.use(VueAxios, axios);
app.use(VueCookies, { expires: '7d' });
app.use(CKEditor);
app.mount('#app');
