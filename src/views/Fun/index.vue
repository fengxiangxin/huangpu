<template>
  <div class="fun">
    <!-- <PlayVideo v-if="$store.state.isPlayVideo" /> -->
    <Dialog />
  </div>
</template>

<script>
// import PlayVideo from "../../components/comFun/PlayVideo";
import Dialog from "../../components/Dialog";
export default {
  name: "Fun",
  data() {
    return {};
  },
  methods: {
    async addTag() {
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
    },
  },
  mounted() {
    // this.addTag();
  },
  beforeDestroy() {
    // __g.tag.delete(["tag1"]);
  },
  components: {
    PlayVideo,
    Dialog,
  },
};
</script>

<style lang='less' scoped>
</style>