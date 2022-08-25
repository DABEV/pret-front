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
    updateRole: (state, role) => {
      state.role = role;
    },
    logout: (state) => {
      state.token = null;
      state.auth = false;
      state.role = null;
    },
  },
  actions: {
    async doLogin({ commit }, loginData) {
      commit("loginStart");
      await Auth.login(loginData)
        .then((response) => {
          commit("updateToken", response.data.data.accessToken);
          localStorage.setItem("token", this.state.token);
          commit("updateRole", response.data.data.roles[0].nombre);
          localStorage.setItem("role", response.data.data.roles[0].nombre);
          console.log(response.data.data.roles[0].nombre);
          if(response.data.data.roles[0].nombre == "ROL_CANDIDATO"){
            location.href = "#/candidato/buscar";
          }else{
            location.href = "#/reclutador/perfil";
          }
          
        });
    },
    logout({ commit }) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      commit("logout");
      location.href = "#/acceso/login";
    },
  },
  fetchAccessToken({ commit }) {
    commit("updateToken", localStorage.getItem("token"));
  },
  modules: {},
});
