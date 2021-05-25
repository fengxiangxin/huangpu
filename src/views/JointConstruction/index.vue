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

    <div class="fenxi" @click="isShowFenxi = !isShowFenxi">
      <el-tooltip class="item" effect="dark" content="编辑功能" placement="top">
        <i :class="isShowFenxi && 'active'" class="el-icon-edit"></i>
      </el-tooltip>
    </div>
    <transition name="fenxi">
      <div class="editor" v-if="isShowFenxi">
        <div class="editor-item" @click="editQuery(1)">
          <el-tooltip content="多边形查询" placement="top" effect="dark">
            <i class="el-icon-crop" :class="active === 1 && 'active'"></i>
          </el-tooltip>
        </div>
        <div class="editor-item" @click="editQuery(2)">
          <el-tooltip content="画圆查询" placement="top" effect="dark">
            <i
              class="el-icon-circle-plus-outline"
              :class="active === 2 && 'active'"
            ></i>
          </el-tooltip>
        </div>
      </div>
    </transition>
    <div class="enter" v-if="active === 1">
        <span>确定</span>
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
      isShowFenxi: false,
      active: 0,
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
    editQuery(index) {
      if (this.active === index) {
        this.active = 0;
        return;
      }
      this.active = index;
      switch (index) {
        case 1:
          /* 多边形查询 */
          let lineType = 0; //0：直线，1：曲线
          let buildType = 1; //0：画多点线段， 1：画多边形
          let drawType = 1; //0：线  1：平面
          let color = Color.Red; //绘制颜色
          let drawThickness = 10.0; //当DrawType为线时设置无效
          __g.editHelper.setParam(
            lineType,
            buildType,
            drawType,
            color,
            drawThickness
          );
          __g.editHelper.start();
          break;
        case 2:
          break;
        default:
          break;
      }
    },
  },
  mounted() {
    // console.log(__g);
    // let o = new TagData("p1");
    // console.log(o);
    // o.id = "010101";
    // console.log(o);
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
.fenxi {
  position: absolute;
  left: 1800px;
  bottom: 70px;
  font-size: 44px;
  color: #fff;
  z-index: 9;
  cursor: pointer;
  background-color: rgba(2, 15, 43, 0.7);
  padding: 30px 50px;
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
.active {
  color: #4f9efd;
}
.editor {
  position: absolute;
  left: 1950px;
  bottom: 70px;
  // width: 100px;
  color: #fff;
  z-index: 9;
  cursor: pointer;
  //   background-color: rgba(2, 15, 43, 0.7);
  display: flex;
  justify-content: space-between;
  .editor-item {
    border: 1px solid rgba(2, 15, 43, 0.7);
    background: rgba(2, 15, 43, 0.7);
    border-radius: 10px;
    align-items: center;
    padding: 25px 50px;
    margin-left: 20px;
  }
}
.enter{
    // width: 200px;
    // height: 200px;
    // background: red;
    padding: 20px 50px;
    background: rgba(2, 15, 43, 0.7);
    position: absolute;
    left: 1950px;
    bottom: 170px;
}
</style>