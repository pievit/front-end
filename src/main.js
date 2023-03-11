// import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import Vue from "vue";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import VueSimpleAlert from "vue-simple-alert";

import "bootstrap-vue/dist/bootstrap-vue.css";
import { BCard } from "bootstrap-vue";
Vue.component("b-card", BCard);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueSimpleAlert);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
