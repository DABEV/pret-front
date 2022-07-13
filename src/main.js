import Vue from 'vue'
import App from './App.vue'
import Vuesax from 'vuesax';
import VueRouter from "vue-router";
import 'vuesax/dist/vuesax.css';
import 'boxicons';


// router setup
import routes from "./routes/routes";

Vue.config.productionTip = false


// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active",
});

Vue.use(VueRouter);
Vue.use(Vuesax);

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
