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


if (process.env.NODE_ENV === "development") {
  window.IP = 'http://localhost:8080';
} else {
  /* 生产环境下服务器IP */
  window.IP = ''
}

const baseURL11 = "http://10.197.153.176:8082/mock/";
var baseURL1 = axios.create({
  baseURL: baseURL11,
  timeout: 2000,
  headers: {
    "X-Custom-Header": "foobar",
  },
});
//本地Mock接口
Vue.prototype.$http = baseURL1;

Vue.prototype.$request = axios.create({
  baseURL: 'http://10.198.246.32/ebus/gzshpqsjfwpt',
  headers: {
    "x-tif-paasid": "{{paasidHeader}}",
    "x-tif-signature": "{{signatureHeader}}",
    "x-tif-timestamp": "{{timestampHeader}}",
    "x-tif-nonce": "{{nonceHeader}}",
    "Content-Type": "application/json",
  }  
})

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