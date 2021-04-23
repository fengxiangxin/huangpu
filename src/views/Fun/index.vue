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
        <div class="footer">
          <div class="footer-con">
            <div
              v-for="index in 3"
              :key="index"
              :class="active === index && 'active'"
              @click="updateActive(index)"
            >
              导览{{ index }}
              <!-- {{ item }} -->
              <!-- <el-tooltip
                class="item"
                effect="dark"
                :content="item"
                placement="left"
              > -->
              <!-- <div>{{导览}}</div> -->
              <!-- <i v-if="index === 0" class="iconfont"></i>
                <i v-if="index === 1" class="iconfont"></i>
                <i v-if="index === 2" class="iconfont"></i> -->
              <!-- </el-tooltip> -->
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
// import Dialog from "../../components/Dialog";
// import VideoDialog from "../../components/VideoDialog";
export default {
  name: "Fun",
  data() {
    return {
      // pipeList: [
      //   {
      //     key: "类型",
      //     value: "雨水管线",
      //   },
      //   {
      //     key: "管线材质",
      //     value: "砼",
      //   },
      //   {
      //     key: "管径",
      //     value: "1200",
      //   },
      //   {
      //     key: "道路名称",
      //     value: "无名路",
      //   },
      //   {
      //     key: "埋设方式",
      //     value: "直埋",
      //   },
      //   {
      //     key: "埋设日期",
      //     value: "2017/09/21",
      //   },
      //   {
      //     key: "权属单位代码",
      //     value: "廉江市水务局",
      //   },
      //   {
      //     key: "普查侧区编号",
      //     value: "",
      //   },
      // ],
      // video: require("../../assets/video/videoDemo.mp4"),
      // isShow: true,
      // imgList: [
      //   require("../../assets/img/44011261001320611200.d5c057f3.png"),
      //   require("../../assets/img/44011261001320611200.d5c057f3.png"),
      //   require("../../assets/img/44011262001320620043.706e1c59.png"),
      // ],
    };
  },
  methods: {
    // async addTag() {
    // __g.tag.clear();
    // let o = new TagData("tag1");
    // o.coordinate = [56867.73828125, 227770.65625, 8.577655792236328];
    // o.imagePath = "";
    // // o.url = "C:Users\fourzeroDesktophuangpuScreensrcassetshtml\video.html";
    // o.url = "";
    // o.imageSize = [58, 58];
    // o.text = "路口监控";
    // o.range = [1, 8000.0];
    // o.textRange = 30000;
    // o.showLine = true;
    // o.textColor = Color.Black;
    // o.textBackgroundColor = Color.White;
    // o.hoverImagePath = "";
    // await __g.tag.add(o, (re) => {
    //   console.log(re);
    // });
    // __g.tag.focus(o.id, 200, 0);
    // let id = "ct1";
    // let coord = [56867.73828125, 227770.65625, 8.577655792236328];
    // /* 使用相对路径出现错误 */
    // let page =
    //   "C://Users//fourzero//Desktop//huangpuScreen//src//assets//html/tag.html";
    // let contentWeb = new WebUIData(page, 150, 188);
    // let popupWeb = new WebUIData("../../assets/html/video.html", 800, 600);
    // let pivot = [0.5, 0.5];
    // let range = [1, 5000];
    // let o = new CustomTagData(id, coord, contentWeb, popupWeb, pivot, range);
    // await __g.ctag.clear();
    // await __g.ctag.add(o);
    // __g.ctag.focus(o.id, 50, 0.2);
    // },
  },
  mounted() {
    // this.addTag();
  },
  beforeDestroy() {
    // __g.tag.delete(["tag1"]);
  },
  components: {
    // PlayVideo,
    // Dialog,
    // VideoDialog,
  },
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
