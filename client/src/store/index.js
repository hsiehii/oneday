import Vue from 'vue';
import Vuex from 'vuex';
import backlogs from './backlogs';
import days from './days';
import today from './today';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},

  modules: {
    backlogs,
    days,
    today,
  }
});
