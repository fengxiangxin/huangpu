<template>
  <div class="footer">
    <div class="footer-con">
      <div
        v-for="(item, index) in list"
        :key="index"
        :class="active === index && 'active'"
        @click="updateActive(index)"
      >
        <!-- {{ item }} -->
        <el-tooltip
          class="item"
          effect="dark"
          :content="item"
          placement="left"
        >
          <i v-if="index === 0" class="iconfont icon-hongshui"></i>
          <i v-if="index === 1" class="iconfont icon-iconishijue"></i>
          <i v-if="index === 2" class="iconfont icon-poumianfenxi"></i>
          <i
            v-if="index === 3"
            class="iconfont icon-iconfonttubiao_tianjixian"
          ></i>
          <i v-if="index === 4" class="iconfont icon-relitu"></i>
        </el-tooltip>
      </div>
    </div>

    <!-- v-if="active === 0 && $route.path === '/shuiyan'" -->
    <div v-if="active === 0" class="dynamicwater">
      <el-slider
        v-model="value"
        vertical
        height="1600px"
        :step="1"
        show-stops
        :max="30"
        tooltip-class="tooltip"
        @input="updateDynamicWater"
      >
      </el-slider>
    </div>
  </div>
</template>

<script>
// import { toTreeData } from "../../utils";
export default {
  name: "Footer",
  data() {
    return {
      list: ["水淹分析", "视域分析", "剖面分析", "天际线分析", "热力图"],
      active: -1,
      value: 0,
    };
  },
  methods: {
    updateActive(index) {
      if (index === this.active) {
        this.active = -1;
        return;
      }
      this.active = index;
    },

    updateDynamicWater() {
      let coords = [
        [1898, 337064, this.value],
        [126413, 337064, this.value],
        [126413, 155499, this.value],
        [1898, 155499, this.value],
      ];
      let o = new DynamicWaterData("dy1", coords, 1);
      __g.dynamicWater.update(o);
    },

    /* 水淹 */
    addDynamicWater() {
      let coords = [
        [1898, 337064, this.value],
        [126413, 337064, this.value],
        [126413, 155499, this.value],
        [1898, 155499, this.value],
      ];
      let o = new DynamicWaterData("dy1", coords, 1);
      __g.dynamicWater.add(o);
      //   __g.dynamicWater.focus("dy1");
    },
    /* 视域 */
    addViewShed() {
      let options = {
        fov_h: 150,
        fov_v: 45,
        height: 10.0,
        visibleColor: Color.Green,
        invisibleColor: Color.Red,
      };
      __g.tools.startViewshedAnalysis(options);
    },
    /* 剖面 */
    addPlaneClip() {
      this.$store.state.statusPlaneClip = true;
    },
    /* 天际线 */
    addSkylineAnalysis() {
      let options = {
        showOutline: true,
        outlineThickness: 3.0,
        outlineColor: Color.Red,
        useSceneColor: false,
        sceneColor: Color.Black,
        showSkyline: true,
        windowSize: [400, 200],
        skylineColor: Color.Green,
        backgroundColor: Color.Gray,
        height: 50.0,
      };
      __g.tools.startSkylineAnalysis(options);
    },
    async heatMap() {
      clearInterval(__tidUpdateHeatMap);
      await __g.tag.clear();
      await __g.heatmap.clear();

  /* [61148.578125, 255377.953125, 51.6875] */
  /* [72798.296875, 246008.078125, 113.31624603271484] */
      let bbox = [61148, 246008, -100, 72798, 255377, 100];
      let range = [0, 100];
      let data = [];
      let tagData = [];
      for (let i = 0; i < 1000; i++) {
        let x = getRandNumBetween(bbox[0], bbox[3]); //minX ~ maxX
        let y = getRandNumBetween(bbox[1], bbox[4]); //minY ~ maxY
        let z = 0;
        let coord = [x, y, z]; //热力点的坐标
        let radius = Math.random() * 550; //热力点影像半径范围
        let heatValue = Math.random() * 100; //热力值
        let o = new HeatMapPointData(i, coord, radius, heatValue);
        data.push(o);
      }

      __g.heatmap.add("heatmap1", bbox, range, data);
    },
  },
  watch: {
    active(newVal) {
      __g.dynamicWater.delete("dy1");
      __g.tools.stopViewshedAnalysis();
      __g.tools.stopSkylineAnalysis();
      this.$store.state.statusPlaneClip = false;
      __g.tools.stopPlaneClip();
      __g.heatmap.clear();

      switch (newVal) {
        case 0:
          // this.$router.push("/shuiyan");
          this.addDynamicWater();
          break;
        case 1:
          this.addViewShed();
          break;
        case 2:
          this.addPlaneClip();
          break;
        case 3:
          this.addSkylineAnalysis();
          break;
        case 4:
          this.heatMap();
          break;
        default:
          break;
      }
    },
    // "route.path"(newVal) {
    //   if (newVal !== "/shuiyan" && this.active === 0) {
    //     this.active = 1;
    //   }
    // },
  },
  mounted() {},
  destroyed() {
    __g.dynamicWater.delete("dy1");
    __g.tools.stopViewshedAnalysis();
    __g.tools.stopSkylineAnalysis();
    this.$store.state.statusPlaneClip = false;
    __g.tools.stopPlaneClip();
    __g.heatmap.clear();
  },
  components: {},
};
</script>

<style lang='less' scoped>
.iconfont {
  font-size: 70px;
}
.footer {
  position: absolute;
  z-index: 10;
  top: -360px;
  left: 0;
  // transform: translateX(-50%);
  // width: 2000px;
  // height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ccc;
  font-size: 70px;
}
.dynamicwater {
  position: absolute;
  left: -135%;
  // top: -1900px;
  bottom: -380px;
  width: 100px;
  height: 1800px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-con {
  position: absolute;
  z-index: 10;
  // top: -1000px;
  height: 700px;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  > div {
    cursor: pointer;
    background-color: rgba(2, 15, 43, 0.7);
    padding: 20px 40px;
    border-radius: 20px;
    user-select: none;
  }
  > div.active {
    color: #fff;
    background-color: rgba(2, 15, 43, 0.9);
  }
}
/deep/.el-slider.is-vertical .el-slider__runway {
  width: 30px;
}
/deep/.el-slider__button {
  width: 60px;
  height: 60px;
}
/deep/.el-tooltip__popper {
  font-size: 50px !important;
}
.tooltip {
  font-size: 50px !important;
}
/deep/.el-slider__button-wrapper {
  width: 60px !important;
  height: 60px !important;
}
/deep/.el-slider.is-vertical .el-slider__button-wrapper {
  left: -19px !important;
}
/deep/.el-slider.is-vertical .el-slider__bar {
  width: 30px;
}
</style>