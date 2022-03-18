import Vue from 'vue';
import Vuex from '../plugins/Vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    counter: 1,
  },
  getters: {
    doubleCounter(state) {
      return state.counter * 2;
    },
  },
  mutations: {
    changeCounter(state) {
      state.counter++;
    },
  },
  actions: {
    changeCounter({ commit }) {
      setTimeout(() => {
        commit('changeCounter');
      }, 1000);
    },
  },
  modules: {},
});
