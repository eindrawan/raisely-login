import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import api from "./api";
import vuetify from "./plugins/vuetify";
import VueToast from "vue-toast-notification";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "vue-toast-notification/dist/theme-sugar.css";

Vue.config.productionTip = false;
Vue.prototype.$api = api;
Vue.use(VueToast);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
