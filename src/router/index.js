import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import JointConstruction from "../views/JointConstruction";
import Fun from "../views/Fun";
import Tree from "../views/Tree";

Vue.use(VueRouter);
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [{
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/jointconstruction",
    name: "JointConstruction",
    component: JointConstruction,
  },
  {
    path: "/fun",
    name: "Fun",
    component: Fun,
  },
  {
    path: "/wadong",
    name: "Wadong",
    component: () => import("../views/wadongmax"),
  },
  {
    path: "/tree",
    name: "tree",
    component: Tree
  },
];

const router = new VueRouter({
  routes,
});

export default router;