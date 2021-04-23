<template>
  <div class="fun">
    <!-- Dialog使用示例 -->
    <!-- <Dialog
      v-if="isShow"
      :attrList="pipeList"
      :imgList="imgList"
      @close="isShow = false"
    /> -->
    <!-- <VideoDialog :video="video" /> -->
    <div class="fenxi">
      <el-tooltip
        class="item"
        effect="dark"
        content="分析功能"
        placement="left"
      >
        <i
          :class="isShowFenxi && 'active'"
          @click="isShowFenxi = !isShowFenxi"
          class="iconfont icon-Dchanpindonghuayanshi"
        ></i>
      </el-tooltip>
      <transition name="fenxi">
        <div v-if="isShowFenxi" class="footer">
          <div class="footer-con">
            <div
              v-for="index in 3"
              :key="index"
              :class="active === index && 'active'"
              @click="updateActive(index)"
            >
              导览{{ index }}
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "Fun",
  data() {
    return {
      isShowFenxi: false,
      active: -1,
    };
  },
  methods: {
    updateActive(index) {
      if (this.active === index) {
        this.active = -1;
        return;
      }
      this.active = index;
      switch (index) {
        case 1:
          __g.camera.playAnimation(0);
          break;
        case 2:
          __g.camera.playAnimation(1);
          break;
        case 3:
          __g.camera.playAnimation(2);
          break;
        default:
          __g.camera.stopAnimation();
          break;
      }
    },
  },
  watch: {},
  mounted() {},
  beforeDestroy() {
    __g.camera.stopAnimation();
  },
  components: {},
};
</script>

<style lang="less" scoped>
.fenxi-enter-active,
.fenxi-leave-active {
  transition: all 0.3s linear;
}
.fenxi-enter,
.fenxi-leave-to {
  opacity: 0;
}
.fenxi-leave,
.fenxi-enter-to {
  opacity: 1;
}
.fenxi {
  position: absolute;
  right: 210px;
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
.footer-con {
  position: absolute;
  z-index: 10;
  // top: -1000px;
  height: 330px;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  > div {
    cursor: pointer;
    background-color: rgba(2, 15, 43, 0.7);
    padding: 20px 40px;
    white-space: nowrap;
    // width: 100px;
    // height: 100px;
    border-radius: 20px;
    user-select: none;
    color: #ccc;
  }
  > div.active {
    color: #fff;
    background-color: rgba(2, 15, 43, 0.9);
  }
}
.footer {
  position: absolute;
  z-index: 10;
  top: -180px;
  left: -25px;

  // transform: translateX(-50%);
  // width: 2000px;
  // height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ccc;
  font-size: 48px;
}
</style>
