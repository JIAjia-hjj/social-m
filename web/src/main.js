import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";
import "./registerServiceWorker";
//网络请求模块
import VueResource from 'vue-resource'
Vue.use(VueResource);

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
