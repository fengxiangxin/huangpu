import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/global.less";
import "../public/airCity/ac_conf";
import "../public/airCity/ac_int_test";
import "../public/airCity/ac_api.min";
import * as echarts from "echarts";
import "./assets/font/iconfont.css";

//vue-awesome-swiper'
//import 'swiper/dist/css/swiper.css'

Vue.use(ElementUI);
Vue.config.productionTip = false;

import axios from "axios";

const baseURL11 = "http://10.140.241.144:8080/mock/";
var baseURL1 = axios.create({
  baseURL: baseURL11,
  timeout: 2000,
  headers: {
    "X-Custom-Header": "foobar",
  },
});
//本地Mock接口
Vue.prototype.$http = baseURL1;

//开启云服务配置
// router.beforeEach((to, from, next) => {
//     next()
//     router.push({
//         query: {
//             bsms: 'ms',
//         }
//     })
// })
Vue.prototype.$echarts = echarts;

// const doc = document.documentElement
// doc.style.zoom = 1920 / 6400

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
