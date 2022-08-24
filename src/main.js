import Vue from "vue";
import App from "./App.vue";
import Vuesax from "vuesax";
import VueRouter from "vue-router";
import store from "../src/store/store";
import "vuesax/dist/vuesax.css";
import "boxicons";

// router setup
import routes from "./routes/routes";

Vue.config.productionTip = false;

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active",
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!store.getters.getStatusLogin) {
      next({ name: "Login" });
    }
  } else {
    next();
  }
  next();
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth) {
    if(to.meta.isCandidate && store.getters.getRole == 'ROL_CANDIDATO'){
      next();
    }else if(!to.meta.isCandidate && store.getters.getRole == 'ROL_RECLUTADOR'){
      next();
    }else{
      from();
    }
  }
  next();
})

Vue.use(VueRouter);
Vue.use(Vuesax);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
