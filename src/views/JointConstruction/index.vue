<template>
  <div class="jointconstruction">
    <JointLeft />
    <div class="showbtn" @click="show"></div>
    <transition name="fade">
      <Tree v-if="showBtn" />
    </transition>
    <JointRight />
    <div class="rightTree">
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        @check-change="handleCheckChange"
        :render-after-expand="false"
        :check-on-click-node="true"
        v-if="rightTreeFlag"
      >
        <template #default="{ node }">
          <span class="custom-tree-node">
            <span style="font-size: 16px; line-height: 46px">{{
              node.label
            }}</span>
            <span style="font-size: 16px; padding-left: 60px; color: #00aaed">
              <a>{{ coordList.length }}</a>
            </span>
          </span>
        </template>
      </el-tree>
    </div>
    <Dialog
      v-if="oneTag['坐标']"
      :oneTag="oneTag"
      @close="close"
      :positonPOI="positonPOI"
    />

    <div class="fx" @click="isShowFX = !isShowFX">
      <el-tooltip class="item" effect="dark" content="编辑功能" placement="top">
        <i :class="isShowFX && 'active'" class="el-icon-edit"></i>
      </el-tooltip>
    </div>
    <transition name="fade">
      <div class="editor" v-if="isShowFX">
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
    <div class="enter" v-if="active === 1" @click="stopEdit">
      <span>确定</span>
    </div>

    <!-- fenxi -->
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
          class="iconfont icon-fenxi"
        ></i>
      </el-tooltip>
      <transition name="fade">
        <Footer v-if="isShowFenxi" />
      </transition>
    </div>
  </div>
</template>

<script>
import JointLeft from "../../components/comJoint/JointLeft";
import Tree from "../Tree";
import JointRight from "../../components/comJoint/JointRight";
import Dialog from "../Dialog/Dialog";
import Footer from "../../components/page/Footer";
import { mapState } from "vuex";

export default {
  name: "JointConstruction",
  data() {
    return {
      showBtn: false,
      values: "",
      isShowFenxi: false,
      isShowFX:false,
      active: 0,
      pioIdList: [],
      data: [
        {
          id: 1,
          label: `显示/隐藏`,
        },
      ],
      coordList: [],
      rightTreeFlag: false,
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
        __g.polygon.clear();
        __g.editHelper.cancel();
        /* 删除poi */
        __g.tag.delete(this.pioIdList);
        this.pioIdList = [];
        this.coordList = [];
        this.rightTreeFlag = false;
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
          // console.log(11111111111);
          __g.editHelper.start();
          break;
        case 2:
          break;
        default:
          break;
      }
    },
    async stopEdit() {
      let res = await __g.editHelper.finish(true);
      // console.log(res);
      const { buildType, resultMessage, coordinates } = res;
      if (resultMessage !== "OK") {
        console.log();
        return;
      }
      if (buildType === 1) {
        let color = Color.Blue; //多边形的填充颜色
        let frameColor = Color.Red;
        let frameThickness = 1;
        let o = new PolygonData(
          Math.random(),
          color,
          res.coordinates,
          frameColor,
          frameThickness,
          false,
        );
        __g.polygon.add(o);
      }

      const data = await this.requestGeo(res.coordinates);
      // console.log(data);
      const coordList = data.map((item) => {
        return item.geometry.coordinates;
      });
      this.coordList = coordList;
      this.rightTreeFlag = true;
    },
    async requestGeo(coords) {
      // console.log(coords);
      let str = coords.reduce((p, c) => {
        return (p = p + " " + c[0] + "," + c[1]);
      }, "");
      str += " " + coords[0][0] + "," + coords[0][1];
      console.log(str);
      const { data: res } = await this.$geoserver.get("HPCIM/ows", {
        params: {
          service: "WFS",
          version: "1.0.0",
          request: "GetFeature",
          typeName: "HPCIM:HP_ld_points ",
          maxFeatures: "50",
          outputFormat: "application/json",
          filter: `<Filter xmlns="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">  
                    <Within>
	                    <PropertyName>the_geom</PropertyName>
	                        <gml:Polygon>  
                                <gml:outerBoundaryIs> 
	                                <gml:LinearRing>   
                                        <gml:coordinates>${str}</gml:coordinates> 
                                    </gml:LinearRing> 
                                </gml:outerBoundaryIs> 
                            </gml:Polygon>		
                    </Within>
                </Filter>`,
        },
      });
      console.log(res.features, "res");
      return res.features;
    },
    handleCheckChange(data, isCheck) {
      if (isCheck) {
        /* 添加 */
        if (this.pioIdList.length) {
          __g.tag.show(this.pioIdList);
          return;
        }
        const poiArr = [];
        this.coordList.forEach((item, index, arr) => {
          const id = Math.random();
          let o = new TagData(id);
          this.pioIdList.push(id);
          o.coordinate = item;
          o.imagePath = HostConfig.Path + "/监控点.png";
          o.url = "";
          o.imageSize = [56, 56];
          o.text = "";
          o.range = [1, 800000.1];
          o.textRange = 300000;
          o.showLine = false;
          o.textColor = Color.Black;
          o.textBackgroundColor = Color.White;
          o.hoverImagePath = "";
          poiArr.push(o);
          if (index >= arr.length - 1) {
            console.log("添加");
            __g.tag.add(poiArr);
          }
        });
      } else {
        /* 隐藏 */
        __g.tag.hide(this.pioIdList);
      }
    },
  },
  async mounted() {
    // const { data: res } = await this.$geoserver.get("HPCIM/ows", {
    //   params: {
    //     service: "WFS",
    //     version: "1.0.0",
    //     request: "GetFeature",
    //     typeName: "HPCIM:ldpoins",
    //     maxFeatures: "50",
    //     outputFormat: "application/json",
    //     filter: `<Filter xmlns="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">
    //                 <Within>
    //                   <PropertyName>the_geom</PropertyName>
    //                       <gml:Polygon>
    //                             <gml:outerBoundaryIs>
    //                               <gml:LinearRing>
    //                                     <gml:coordinates>61141.398438,228731.609375 65404.644531, 228022.09375 65778.820313, 234537.296875 62120.984375, 234735.109375 61141.398438,228731.609375</gml:coordinates>
    //                                 </gml:LinearRing>
    //                             </gml:outerBoundaryIs>
    //                         </gml:Polygon>
    //                 </Within>
    //             </Filter>`,
    //   },
    // });
    // console.log(res, "res");
  },
  destroyed() {
    __g.polygon.clear();
    __g.editHelper.cancel();
    __g.tag.delete(this.pioIdList);
    this.pioIdList = [];
    this.coordList = [];
    this.rightTreeFlag = false;
  },
  components: {
    JointLeft,
    JointRight,
    Tree,
    Dialog,
    Footer
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
.fx {
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
.enter {
  // width: 200px;
  // height: 200px;
  // background: red;
  padding: 20px 50px;
  background: rgba(2, 15, 43, 0.7);
  position: absolute;
  left: 1950px;
  bottom: 205px;
  cursor: pointer;
}
.rightTree {
  width: 200px;
  height: 100px;
  position: absolute;
  top: 100px;
  left: 1080px;
  zoom: 4;
}
.el-tree {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  background-color: rgba(2, 15, 43, 0.7);
  color: #fff;
  font-size: 24px;
}
.fenxi {
  position: absolute;
  right: 1280px;
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
/deep/ .el-icon-caret-right:before {
  content: "";
}
/deep/ .el-tree-node__content:hover {
  background-color: rgba(2, 15, 43, 0.7);
}
/deep/.el-tree-node:focus > .el-tree-node__content {
  background-color: rgba(2, 15, 43, 0.7) !important;
 }
</style>