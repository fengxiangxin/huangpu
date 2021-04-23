<template>
  <div id="app">
    <div class="back">
      <img
        src="https://up.23magic.com/image/20190816/1565924177727505.jpg"
        width="6400px"
        height="2400px"
      />
    </div>
    <div id="player"></div>
    <Header></Header>
    <!-- <Footer /> -->
    <!-- <div class="container"> -->
    <transition name="router">
      <router-view />
    </transition>
    <!-- </div> -->
  </div>
</template>

<script>
import shop from "./assets/json/商店1";
import shequ from "./assets/json/社区1";
import school from "./assets/json/学校1";
import yiyuan from "./assets/json/医院1";
import yule from "./assets/json/娱乐1";
import Header from "../src/components/page/header";
import Footer from "../src/components/page/Footer";
import { mapState } from "vuex";
export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      isPlay: false,
      tagdata: [],
    };
  },
  computed: {
    ...mapState({
      goBuildingAlone: (state) => state.goBuildingAlone,
    }),
  },
  created() {
    window.addEventListener("load", this.onLoad, true);
    window.addEventListener("resize", this.onResize, true);
    this.tagdata = [
      ...shop.pois,
      ...shequ.pois,
      ...school.pois,
      ...yiyuan.pois,
      ...yule.pois,
    ];
    console.log(this.tagdata);
  },
  methods: {
    //监听三维交互的返回事件
    onEvent(e) {
      console.log(e);
      if (e.Id == "E4021A414121DCB8ACF30D85A2C358BF") {
        this.$store.commit("showAlarm", true);
        return;
      }
      if (this.$store.state.statusPlaneClip) {
        __g.tools.startPlaneClip(e.MouseClickPoint, [0, 0, 0]);
        this.$store.state.statusPlaneClip = false;
      }
      if (e.Type == "shapefilelayer" && !e.Fields.建筑物高度) {
        this.$store.commit("showVideoDialog", true);
      }
      if (
        e.Type == "shapefilelayer" &&
        e.Fields.建筑物高度 &&
        this.goBuildingAlone
      ) {
        let BuildingAloneData = {
          地址: e.Fields.所在道路,
          楼层: e.Fields.实际层数,
          名称: "--",
          所属区: "黄埔区",
          邮编: "--",
          建筑面积: e.Fields.建筑面积,
          建筑编号: e.Fields.国标要素代,
        };
        this.$store.commit("BuildingAloneData", BuildingAloneData);
        console.log(BuildingAloneData, 9887877868);
      }
      if (e.Type === "tag" && e.Id.slice(0, 3) !== "zxd") {
        let newtagdata = this.tagdata.find((item) => {
          return item.id == e.Id;
        });
        let tagarr = {
          data: {
            名称: newtagdata.name,
            类别: newtagdata.type,
            建筑编号: newtagdata.typecode,
            地址: newtagdata.address,
            经纬度: newtagdata.location,
            电话: newtagdata.tel.length > 0 ? newtagdata.tel : "--",
            所属区: newtagdata.adname,
            邮编: newtagdata.adcode ? newtagdata.adcode : "--",
          },
          // imgList: newtagdata.photos.length > 0 ? newtagdata.photos : [],
          imgList:
            newtagdata.photos.length > 0
              ? newtagdata.photos.map((item) => {
                  return item.url;
                })
              : [],
        };

        this.$store.commit("tagdata", tagarr);
        console.log(tagarr, 9898989);
        // if (e.Id === "tag1") {
        //   if (!this.$store.state.isPlayVideo) {
        //     this.$store.state.isPlayVideo = true;
        //   } else {
        //     this.$store.state.isPlayVideo = false;
        //   }
        // }
      }

      // if(e.Type === "tag")
    },

    onLoad() {
      this.onResize();

      this.init(true, true);
    },
    onResize() {
      let player = document.getElementById("player");
      player.style.height = "100%";
      player.style.width = "100%";
      player.style.position = "absolute";
    },
    onReady() {},
    log() {},
    getMatchServerConfig(host, fn, callbackIndex) {
      if ("WebSocket" in window) {
        var url = `ws://${host}`;
        var __fn = fn;

        var ws = new WebSocket(url);
        ws.onopen = function() {
          this.send(
            JSON.stringify({
              command: 6,
              callbackIndex: callbackIndex,
            })
          );
        };
        ws.onmessage = function(event) {
          var o = JSON.parse(event.data);
          __fn(o);
        };
        ws.onclose = function() {};
        ws.onerror = function(event) {};
      } else {
        this.log("Not Support WebSocket!");
      }
    },
    init(withPlayer, withInterface) {
      // console.log("222");
      let _this = this;

      getMatchServerConfig(HostConfig.MatchServer, function(o) {
        if (o.result == 0) {
          if (withPlayer) {
            console.log("player");
            new AirCityPlayer(o.instanceId, "player", HostConfig.Token, true);
          }
          if (withInterface) {
            var ace = new AirCityAPI(o.instanceId, _this.onReady, _this.log);
            ace.setEventCallback(_this.onEvent);

            //更新页面显示
          }
        } else {
          if (withPlayer) {
            console.log("player2");
            let host = HostConfig.instanceId
              ? HostConfig.instanceId
              : HostConfig.AirCityPlayer;
            let acp = new AirCityPlayer(
              host,
              "player",
              HostConfig.Token,
              true,
              true
            );
            //AirCityPlayer对象增加方法enableAutoAdjustResolution，可以设置启用或关闭视频窗口缩放时
            //自动调整分辨率的功能。这个功能默认是启用的，如果想关闭此功能，可以在初始化的时候调用enableAutoAdjustResolution(false)
            //acp.enableAutoAdjustResolution(false);
          }
          if (withInterface) {
            let host = HostConfig.instanceId
              ? HostConfig.instanceId
              : HostConfig.AirCityAPI;
            var ace = new AirCityAPI(host, _this.onReady, _this.log);
            ace.useColorLog = true;
            ace.setEventCallback(_this.onEvent);
          }
        }
      });
    },
  },
};
</script>
<style lang="less">
/* 特殊方法控制elementui中使用js控制的组件样式，不能使用scoped和deep */
.el-image-viewer__img {
  width: 50%;
}
.container {
  position: absolute;
}
#app {
  font-size: 16px;
}
.back {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.el-carousel__arrow {
  font-size: 40px !important;
}

.router-leave {
  opacity: 1;
}
.router-leave-active {
  transition: all 0.5s;
}
.router-leave-to {
  opacity: 0;
}

.router-enter {
  opacity: 0;
}
.router-enter-active {
  transition: all 0.5s;
}
.router-enter-to {
  opacity: 1;
}
.el-tooltip__popper {
  font-size: 50px !important;
}
</style>
