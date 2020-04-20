import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "./util/request";
import "../src/util/filter";

import "../src/assets/style/global.scss";

// import Vant from "vant";
// import "vant/lib/index.css";

// Vue.use(Vant);

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
