import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    statusPlaneClip: false,
    isPlayVideo: false,
    showVideoDialog: false,
  },
  mutations: {
    showVideoDialog(state, flag) {
      state.showVideoDialog = flag;
    },
  },
  actions: {},
  modules: {},
});
