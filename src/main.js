import Vue from 'vue';
import Antd from 'ant-design-vue';
import VueCookies from 'vue-cookies';
import router from './router';
import Login from './views/login.vue';
import Framework from './views/framework.vue';

import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(VueCookies);

const AppContent = VueCookies.get('token') ? Framework : Login;

new Vue({
    router,
    render: h => h(AppContent)
}).$mount('#app');
