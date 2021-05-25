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

    <div class="fenxi">
      <el-tooltip
        class="item"
        effect="dark"
        content="编辑功能"
        placement="left"
      >
        <i
          :class="isShowFenxi && 'active'"
          @click="isShowFenxi = !isShowFenxi"
          class="el-icon-edit"
        ></i>
      </el-tooltip>
      <transition name="fenxi">
        <div>
            
        </div>
      </transition>
    </div>

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
      isShowFenxi:false,
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
  mounted() {
    // console.log(__g);
    let o = new TagData("p1");
    console.log(o);
    o.id = "010101";
    console.log(o);
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
  background: rgba(2, 15, 43, 0.7) !important;
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
.fenxi{
  position: absolute;
  left: 1800px;
  bottom: 70px;
  font-size: 44px;
  // width: 400px;
  // height: 109px;
  color: #fff;
  z-index: 9;
  cursor: pointer;
  background-color: rgba(2, 15, 43, 0.7);
  padding: 20px 40px;
  border-radius: 20px;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  .iconfont {
    font-size: 70px;
  }
  > .active {
    color: #4f9efd;
  }
}
</style>