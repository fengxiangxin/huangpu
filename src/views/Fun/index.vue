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

<style lang='less' scoped>
</style>