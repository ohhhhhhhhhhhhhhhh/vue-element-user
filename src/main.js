import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from '../store/index.js';
import '../mock';
import './utils/permission';
import axios from 'axios';
import qs from 'qs';
import Cookie from 'js-cookie'
import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  ak: "rQxHPQX1ua21rWnXzTbUh5KSSUbnefxR"
})

Vue.use(ElementUI);

Vue.prototype.$ajax = axios;
Vue.prototype.$qs = qs;


Vue.config.productionTip = false;

new Vue({
	store,
	router,
	render: h => h(App),
}).$mount('#app')
