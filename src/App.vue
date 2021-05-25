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
    <div ref="zoom">
      <Header></Header>
      <!-- <Footer /> -->
      <!-- <div class="container"> -->
      <transition name="router">
        <router-view />
      </transition>
      <!-- </div> -->
    </div>
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
      cameraHight: 0,
    };
  },
  computed: {
    ...mapState({
      goBuildingAlone: (state) => state.goBuildingAlone,
    }),
  },
  watch: {
    cameraHight(val, newval) {
      //高度少于1000隐藏全部线和面a
      if (val <= 1000) {
        __g.infoTree.hide(["87887F19491218E491B38A973D381E06"]);
        __g.infoTree.hide(["7C9EC78F4D5851621520DBB59D4912B8"]);
        __g.infoTree.hide(["213449954FE142A4D96686AA0F2FCB99"]);
        return;
      } else {
        __g.infoTree.show(["213449954FE142A4D96686AA0F2FCB99"]);
      }

      if (val <= 45000) {
        //街道面
        __g.infoTree.hide(["87887F19491218E491B38A973D381E06"]);
        //社区线
        __g.infoTree.show(["7C9EC78F4D5851621520DBB59D4912B8"]);
      } else {
        __g.infoTree.show(["87887F19491218E491B38A973D381E06"]);
        __g.infoTree.hide(["7C9EC78F4D5851621520DBB59D4912B8"]);
      }
    },
  },

  created() {
    // window.addEventListener('load', this.onLoad, true)
    // window.addEventListener('resize', this.onResize, true)
    this.tagdata = [
      ...shop.pois,
      ...shequ.pois,
      ...school.pois,
      ...yiyuan.pois,
      ...yule.pois,
    ];
    // console.log(this.tagdata);

    // this.$nextTick(() => {
    //   const resize = () => {
    //     const doc = this.$refs.zoom;
    //     /* 按屏幕高度适配，始终保持一屏展示，如果按宽度适配，则可以将大屏效果等比例缩放 */
    //     // doc.style.zoom = 1920 / document.body.clientWidth;
    //     doc.style.zoom = 0.33;
    //     console.log(document.body.clientWidth);
    //   };
    //   resize();
    //   window.addEventListener("resize", resize);
    // });
  },
  mounted() {
    // this.initWebSocket();
    this.timer = setInterval(this.getCamera, 1000);
  },
  methods: {
    //获取相机高度
    async getCamera() {
      if (__g.camera) {
        await __g.camera.get((res) => {
          this.cameraHight = res.z;
        //   console.log(this.cameraHight, "=============");
        });
      }
    },

    // =======================AirCityExplorer配置====================//
    initWebSocket() {
      //初始化weosocket
      const wsuri = "127.0.0.1:4321"; //映射本机端口d
      this.websock = new AirCityAPI(wsuri, this.onReady, this.log);
      this.websock.setEventCallback(this.onEvent);
    },

    //==================监听三维交互的返回事件===================//
    async onEvent(e) {
      console.log(e);
      //街道点击事件
      if (
        e.Type == "shapefilelayer" &&
        e.Id == "69337115449ACECC51116DA246BBFC77"
      ) {
        this.communityClick(e);
      }
      /*  */
      if (e.Type === "tag") {
        await __g.tag.focus(e.Id, 500, 0.5);
        let data = [];
        let ID = "";
        if (e.Id.slice(0, 4) === "tag1") {
          ID = e.Id.split("+")[1];
          data = require("./assets/json/yanganqi.json").data.data.filter(
            (item, index) => {
              if (index < 200) return true;
            }
          );
          this.$store.state.header = "烟感器";
        }
        if (e.Id.slice(0, 4) === "tag2") {
          ID = e.Id.split("+")[1];
          data = require("./assets/json/lajitong.json").data.data.filter(
            (item, index) => {
              if (index < 200) return true;
            }
          );
          this.$store.state.header = "智能垃圾桶";
        }
        if (e.Id.slice(0, 4) === "tag3") {
          ID = e.Id.split("+")[1];
          data = require("./assets/json/jiucun.json").data.data.filter(
            (item, index) => {
              if (index < 200) return true;
              // }
            }
          );
        }

        console.log(ID, "id");
        console.log(data, "data");
        const one = data.find((item) => {
          if (item.ID === ID) {
            return true;
          }
        });

        const tempObj = {};
        one.CREATE_TIME && (tempObj["时间"] = one.CREATE_TIME);
        one.DEVICE_POSITION && (tempObj["地点"] = one.DEVICE_POSITION);
        one.LONGITUDE &&
          (tempObj["坐标"] = one.LONGITUDE + "   " + one.LATITUDE);
        one.PEOPLE_STATUS && (tempObj["重点人员"] = one.PEOPLE_STATUS);
        one.PROBLEM && (tempObj["名称"] = one.PROBLEM);
        one.PROJ_AREA && (tempObj["建筑范围"] = one.PROJ_AREA);
        one.STREET && (tempObj["所属街道"] = one.STREET);
        one.WORK_MEASURE && (tempObj["问题"] = one.WORK_MEASURE);
        one.POSITION && (tempObj["地点"] = one.POSITION);
        one.DATA_DEPT && (tempObj["名字"] = one.DATA_DEPT);
        // localStorage.setItem("key", JSON.stringify(tempObj));
        const arr = [];
        for (const key in tempObj) {
          const str = key + "=" + tempObj[key];
          arr.push(str);
        }
        // console.log(arr.join("&"));
        // __g.tag.setURL(e.Id, IP + "/mock/diag.html?" + "id=" + e.Id);

        // console.log(IP + "/mock/diag.html?" + "id=" + e.Id);
        // console.log(tempObj);
        setTimeout(() => {
          this.$store.state.oneTag = tempObj;
        }, 1000);
        // console.log(this.$store.state.oneTag);
        // console.log(1111111);
        const res = await __g.coord.world2Screen(
          e.MouseClickPoint[0],
          e.MouseClickPoint[1]
        );
        //   const res = await __g.coord.world2Screen(65098.971781,230293.31815799978);
        console.log(res, "456989898989898");
        this.$store.state.positonPOI = {
          left: res.screenPosition[0],
          top: res.screenPosition[1],
        };
        // });
      }
      /*  */

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
        let tagarr;
        newtagdata &&
          (tagarr = {
            data: {
              名称: newtagdata.name || "",
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
          });

        this.$store.commit("tagdata", tagarr);
        // console.log(tagarr, 9898989);
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
        let __fn = fn;

        var ws = new WebSocket(url);
        ws.onopen = function () {
          this.send(
            JSON.stringify({
              command: 6,
              callbackIndex: callbackIndex,
            })
          );
        };
        ws.onmessage = function (event) {
          var o = JSON.parse(event.data);
          __fn(o);
        };
        ws.onclose = function () {};
        ws.onerror = function (event) {};
      } else {
        this.log("Not Support WebSocket!");
      }
    },
    init(withPlayer, withInterface) {
      // console.log("222");
      let _this = this;
      // let bitrate = getQueryVariable("bitrate");
      // console.log(bitrate);
      this.getMatchServerConfig(HostConfig.MatchServer, function (o) {
        if (o.result == 0) {
          if (withPlayer) {
            let acp = new AirCityPlayer(
              o.instanceId,
              "player",
              HostConfig.Token,
              true
            );
            // bitrate && acp.setBitrate(bitrate); //2021.04.16 Add 设置码率
          }
          if (withInterface) {
            var ace = new AirCityAPI(o.instanceId, _this.onReady, _this.log);
            ace.setEventCallback(_this.onEvent);
          }
        } else {
          if (withPlayer) {
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
            // bitrate && acp.setBitrate(bitrate); //2021.04.16 Add 设置码率
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

    //街道点击事件
    communityClick(e) {
      let pointCamera = e.MouseClickPoint;
      __g.camera.get(function (res) {
        console.log(res, "res=============");
      });
      let camera = [
        56255.792969,
        225782.515625,
        10000,
        -85.999626,
        -123.442863,
        0,
      ];
      __g.camera.set(camera);
      console.log(e, "街道点击事件");
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
