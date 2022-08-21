import Vue from "vue";
import Vuex from "vuex";
import Auth from "../service/Auth/AuthService";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: null,
    token: null,
    role: null,
  },
  getters: {
    getStatusLogin: (state) => {
      return state.auth;
    },
    getRole: (state) => {
      return state.role;
    },
  },
  mutations: {
    loginStart: (state) => (state.auth = true),
    updateToken: (state, token) => {
      state.token = token;
    },
    logout: (state) => {
      state.token = null;
      state.auth = false;
    },
  },
  actions: {
    async doLogin({ commit }, loginData) {
      commit("loginStart");
      await Auth.login(loginData)
        .then((response) => {
          commit("updateToken", response.data.data.accessToken);
          localStorage.setItem("token", this.state.token);
          location.href = "#/";
        })
        .catch((e) => {
          commit("logout");
          console.log(e);
        });
    },
    logout({ commit }) {
      localStorage.removeItem("token");
      commit("logout");
      location.href = "#/acceso/login";
    },
  },
  fetchAccessToken({ commit }) {
    commit("updateToken", localStorage.getItem("token"));
  },
  modules: {},
});
