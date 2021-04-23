import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    statusPlaneClip: false,
    isPlayVideo: false,
    showVideoDialog: false,
    tagdata: {},
    sheciangIsShow: false,
  },
  mutations: {
    showVideoDialog(state, flag) {
      state.showVideoDialog = flag;
    },
    tagdata(state, flag) {
      state.tagdata = flag;
    },
  },
  actions: {},
  modules: {},
});
