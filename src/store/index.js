import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    statusPlaneClip: false,
    isPlayVideo: false,
    showVideoDialog: false,
    tagdata: {},
    goBuildingAlone: false,
    BuildingAloneData: {},
    showAlarm: false,
    oneTag: {},
    positonPOI: {}
  },
  mutations: {
    showVideoDialog(state, flag) {
      state.showVideoDialog = flag;
    },
    tagdata(state, flag) {
      state.tagdata = flag;
    },
    goBuildingAlone(state, flag) {
      state.goBuildingAlone = flag;
    },
    BuildingAloneData(state, data) {
      state.BuildingAloneData = data;
    },
    showAlarm(state, flag) {
      state.showAlarm = flag;
    },
  },
  actions: {},
  modules: {},
});