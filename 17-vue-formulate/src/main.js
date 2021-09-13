import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueFormulate from '@braid/vue-formulate';
import Autocomplete from '@/components/Autocomplete';
import '@/assets/main.scss';
import { nl } from '@braid/vue-formulate-i18n';

Vue.config.productionTip = false;
Vue.use(VueFormulate, {
    plugins: [nl],
    locale: 'nl',
    library: {
        autocomplete: {
            classification: 'text',
            component: Autocomplete,
        },
    },
});

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
