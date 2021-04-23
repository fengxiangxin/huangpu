<template>
  <div class="rainpipe">
    <div>
      <span>建筑详情</span>
      <span @click="close">关闭</span>
    </div>
    <div>
      <div class="rainpipe-con">
        <div
          v-for="(value, key, index) in $store.state.tagdata.data"
          :key="index"
        >
          <span>{{ key }}：</span>
          <span>{{ value }}</span>
        </div>
      </div>
      <div class="more">
        <!-- <span> 更多 </span> -->
        <img src="../assets/img/ip_more_bg.png" alt="" />
      </div>
      <div v-if="$store.state.tagdata.imgList.length > 0" class="video">
        <!-- <img v-if="img && !video" :src="img" alt="" /> -->
        <!-- <img src="../assets/img/44011200041320100007.c5579eeb.png" alt="">
        <img src="../assets/img/44011200041320100007.c5579eeb.png" alt="">
        <img src="../assets/img/44011200041320100007.c5579eeb.png" alt=""> -->
        <div v-for="(item, index) in $store.state.tagdata.imgList" :key="index">
          <el-image
            style="width: 100%; height: 100%"
            :src="item"
            :preview-src-list="$store.state.tagdata.imgList"
          >
          </el-image>
        </div>
        <!-- <video
          v-if="video && !img"
          @click="play"
          ref="video"
          :src="video"
        ></video> -->
      </div>
    </div>
    <!-- <div></div> -->
  </div>
</template>

<script>
/**
 * 传入数据attrList，数组，每个元素都是对象，由key-value组成
 * 点击关闭可以触发自定义时间‘close’
 * 传入参数imgList显示图片
 */
export default {
  name: "Dialog",
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
      // isShowVideo: false,
      isPaly: false,
      // srcList: [require("../assets/img/44011200041320100013.648f09fa.png")],
      // url: require("../assets/img/44011200041320100013.648f09fa.png"),
    };
  },
  props: ["attrList", "imgList"],
  methods: {
    close() {
      this.$store.commit("tagdata", {});
    },
    play() {
      if (this.isPaly === false) {
        this.$refs.video.play().then(() => {
          this.isPaly = true;
        });
      }
      if (this.isPaly) {
        this.$refs.video.pause();
        this.isPaly = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.rainpipe {
  position: absolute;
  right: 27%;
  top: 270px;
  width: 1500px;
  font-size: 50px;
  color: #fff;

  > div:nth-of-type(1) {
    height: 100px;
    background: url("../assets/img/traffic_map_video_bg1.png");
    background-size: cover;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 20px 20px 0 50px;

    > span:last-of-type {
      color: #8f9cff;
      cursor: pointer;
    }
  }
  > div:nth-of-type(2) {
    position: relative;
    // width: 268px;
    // height: 274px;
    width: 99%;
    padding: 50px 0;
    background-color: rgba(2, 15, 43, 0.7);
    margin: 0 auto;

    .more {
      position: absolute;
      bottom: 0;
      width: 100%;
      > img {
        position: absolute;
        bottom: 0;
        width: 100%;
      }
      //   > span {
      //     position: absolute;
      //     bottom: 0;
      //     left: 50%;
      //     transform: translateX(-50%);
      //     font-size: 12px;
      //     color: #00e0ff;
      //   }
    }
  }
  //   > div:nth-of-type(3) {
  //     position: absolute;
  //     width: 100%;
  //     bottom: -100px;
  //     left: 2px;
  //     height: 100px;
  //     background: url("../assets/img/traffic_map_video_bg2.png");
  //     background-size: cover;
  //     z-index: 5;
  //   }
}
.rainpipe-con {
  height: 100%;
  flex-direction: column;
  display: flex;
  justify-content: space-evenly;
  > div {
    display: flex;
    justify-content: space-around;
    opacity: 0.8;
    margin: 10px 0;
    > span:last-of-type {
      width: 68%;
    }
    > span:first-of-type {
      width: 30%;
      text-align: right;
    }
  }
}
.video {
  // padding: ;
  display: flex;
  justify-content: space-evenly;
  > div {
    // margin: 40px auto 0;
    margin-top: 40px;
    margin-bottom: 40px;
    display: block;
    width: 28%;
    height: 300px;
    border: none;
    object-fit: fill;
  }
}
</style>
