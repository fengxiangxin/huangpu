<template>
  <div class="jointconstruction">
    <JointLeft />
    <div class="showbtn" @click="show"></div>
    <transition name="fade">
      <Tree v-if="showBtn" />
    </transition>
    <JointRight />
    <div class="search-box">
      <el-input
        placeholder=""
        v-model="values"
        style="width: 100%"
        suffix-icon="el-icon-search"
        @keydown.enter.native="search"
      ></el-input>
    </div>
    <Dialog
      v-if="oneTag['坐标']"
      :oneTag="oneTag"
      @close="close"
      :positonPOI="positonPOI"
    />
  </div>
</template>

<script>
import JointLeft from "../../components/comJoint/JointLeft";
import Tree from "../Tree";
import JointRight from "../../components/comJoint/JointRight";
import Dialog from "../Dialog/Dialog";
import { mapState } from "vuex";

export default {
  name: "JointConstruction",
  data() {
    return {
      showBtn: false,
      values: "",
    };
  },
  computed: {
    ...mapState(["oneTag", "positonPOI"]),
  },
  methods: {
    show() {
      this.showBtn = !this.showBtn;
    },
    search() {
      this.$emit("search", ["search", this.keyword]);
      this.values = "";
    },
    close() {
      this.$store.state.oneTag = {};
    },
  },
  components: {
    JointLeft,
    JointRight,
    Tree,
    Dialog,
  },
};
</script>

<style lang='less' scoped>
.jointconstruction {
  width: 100%;
  color: #fff;
  font-size: 38px;
}
.showbtn {
  width: 150px;
  height: 100px;
  background-image: url(../../assets/img/map-tool-select.e4fe350f.gif);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  position: absolute;
  left: 900px;
  top: 150px;
  zoom: 2;
  text-align: center;
  transition: all 0.6s;
  &:hover {
    transform: scale(1.4);
  }
}
.search-box {
  height: 26px;
  width: 200px;
  position: absolute;
  right: 320px;
  top: 80px;
  zoom: 4;
  border-radius: 10px;
}
/deep/.el-input__inner {
  background: rgba(2, 15, 43, 0.7)!important;
  border-radius: 46px;
  border: 1px solid rgba(2, 15, 43, 0.7);
  box-shadow: 5px 5px 15px rgba(2, 15, 43, 0.7);
  color: #fff;
  opacity: 0.8;
}
/deep/.el-input__icon {
  color: #208abe;
  font-size: 24px;
}
.fade-enter-to {
  opacity: 1;
}
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>