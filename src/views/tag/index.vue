<template>
  <div class="showtag">
    <div @click="isShow = !isShow" :class="isShow && 'active'">POI</div>
    <div v-if="isShow">
      <el-checkbox-group @change="change" v-model="checkboxGroup1">
        <el-checkbox-button
          v-for="(city, index) in cities"
          :label="city"
          :key="index"
        >
          <!-- {{ city }} -->
          <el-tooltip
            class="item"
            effect="dark"
            :content="city"
            placement="right"
          >
            <span v-if="index == 0" class="iconfont icon-store"></span>
            <span
              v-if="index == 1"
              class="iconfont icon-dibudaohanglan-"
            ></span>
            <span v-if="index == 2" class="iconfont icon-xuexiao"></span>
            <span v-if="index == 3" class="iconfont icon-yiyuan"></span>
            <span v-if="index == 4" class="iconfont icon-yule"></span>
          </el-tooltip>
        </el-checkbox-button>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
import gcoord from "gcoord";

import shop from "../../assets/json/商店1";
import shequ from "../../assets/json/社区1";
import school from "../../assets/json/学校1";
import yiyuan from "../../assets/json/医院1";
import yule from "../../assets/json/娱乐1";
export default {
  data() {
    const cityOptions = ["商店", "社区", "学校", "医院", "娱乐"];
    return {
      checkboxGroup1: [],

      cities: cityOptions,
      getPoi1change: false,
      poi1IDs: [],
      poi2IDs: [],
      poi3IDs: [],
      poi4IDs: [],
      poi5IDs: [],
      isShow: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    change(arr) {
      let _this = this;

      console.log(arr);
      //   e.forEach((item) => {
      if (arr.indexOf("商店") !== -1) {
        if (this.poi1IDs.length <= 0) {
          console.log("添加商店tag");
          let pointPoiArr = [];
          shop.pois.forEach((item, index) => {
            let newc84 = this.getcroo(item.location.split(","));

            __g.coord.gcs2pcs([newc84[1], newc84[0]], (res) => {
              let aaa = res.coordinates[0];
              let coord = [aaa[0] + 40000, aaa[1] - 2330000, 20];
              console.log(coord);
              let o = new TagData(item.id);
              _this.poi1IDs.push(item.id);
              //   o.coordinate = coord;
              //   o.imagePath = "http://localhost:8080/mock/商店.png";
              //   o.hoverImagePath = "http://localhost:8080/mock/商店2.png";
              //   o.imageSize = [28, 28];
              //   o.text = item.name;
              //   o.range = [1, 800000.0];
              //   o.textRange = 300000;
              //   o.showLine = true;
              //   o.textColor = Color.Black;
              //   o.textBackgroundColor = Color.White;

              //
              o.coordinate = coord;
              o.imagePath = "http://10.140.241.98:8080/mock/shop.png";
              o.url = "";
              o.imageSize = [28, 28];
              o.text = item.name;
              o.range = [1, 800000.0];
              o.textRange = 300000;
              o.showLine = true;
              o.textColor = Color.Black;
              o.textBackgroundColor = Color.White;
              o.hoverImagePath = "http://10.140.241.98:8080/mock/商店2.png";
              pointPoiArr.push(o);
              if (index == shop.pois.length - 1) {
                console.log(pointPoiArr);

                __g.tag.add(pointPoiArr);
              }
            });
          });
        } else {
          console.log("show商店tag");

          __g.tag.show(this.poi1IDs);
        }
      } else {
        console.log("hide商店tag");

        __g.tag.hide(this.poi1IDs);
      }
      //   });
      //
      //
      //
      //   2
      if (arr.indexOf("社区") !== -1) {
        if (this.poi2IDs.length <= 0) {
          let pointPoiArr = [];
          console.log("添加社区tag");
          shequ.pois.forEach((item, index) => {
            let newc84 = this.getcroo(item.location.split(","));
            __g.coord.gcs2pcs([newc84[1], newc84[0]], (res) => {
              let aaa = res.coordinates[0];
              let coord = [aaa[0] + 40000, aaa[1] - 2330000, 20];
              console.log(coord);
              let o = new TagData(item.id);
              _this.poi2IDs.push(item.id);
              // o.coordinate = coord;
              // o.imageSize = [28, 28];
              // o.text = item.name;
              // o.range = [1, 800000.0];
              // o.textRange = 300000;
              // o.showLine = true;
              // o.textColor = Color.Black;
              // o.textBackgroundColor = Color.White;
              // __g.tag.add(o);
              //
              o.coordinate = coord;
              o.imagePath = "http://10.140.241.98:8080/mock/社区.png";
              o.url = "";
              o.imageSize = [28, 28];
              o.text = item.name;
              o.range = [1, 800000.0];
              o.textRange = 300000;
              o.showLine = true;
              o.textColor = Color.Black;
              o.textBackgroundColor = Color.White;
              o.hoverImagePath = "http://10.140.241.98:8080/mock/社区2.png";
              //   __g.tag.add(o);
              pointPoiArr.push(o);

              if (index == shequ.pois.length - 1) {
                console.log(pointPoiArr);

                __g.tag.add(pointPoiArr);
              }
            });
          });
        } else {
          console.log("show社区tag");

          __g.tag.show(this.poi2IDs);
        }
      } else {
        console.log("hideshqutag");

        __g.tag.hide(this.poi2IDs);
      }
      //   3

      if (arr.indexOf("学校") !== -1) {
        if (this.poi3IDs.length <= 0) {
          console.log("添加学校tag");
          let pointPoiArr = [];
          school.pois.forEach((item, index) => {
            let newc84 = this.getcroo(item.location.split(","));
            __g.coord.gcs2pcs([newc84[1], newc84[0]], (res) => {
              let aaa = res.coordinates[0];
              let coord = [aaa[0] + 40000, aaa[1] - 2330000, 20];
              console.log(coord);
              let o = new TagData(item.id);
              _this.poi3IDs.push(item.id);
              o.coordinate = coord;
              o.imagePath = "http://10.140.241.98:8080/mock/学校.png";
              o.url = "";
              o.imageSize = [28, 28];
              o.text = item.name;
              o.range = [1, 800000.0];
              o.textRange = 300000;
              o.showLine = true;

              o.textColor = Color.Black;
              o.textBackgroundColor = Color.White;
              o.hoverImagePath = "http://10.140.241.98:8080/mock/学校2.png";
              o.UserData = "item";
              //   __g.tag.add(o);
              pointPoiArr.push(o);

              if (index == school.pois.length - 1) {
                console.log(pointPoiArr);

                __g.tag.add(pointPoiArr);
              }
            });
          });
        } else {
          console.log("show学校tag");

          __g.tag.show(this.poi3IDs);
        }
      } else {
        console.log("hide学校tag");

        __g.tag.hide(this.poi3IDs);
      }

      //
      //
      //
      // 4
      if (arr.indexOf("医院") !== -1) {
        if (this.poi4IDs.length <= 0) {
          console.log("添加医院tag");
          let pointPoiArr = [];
          yiyuan.pois.forEach((item, index) => {
            let newc84 = this.getcroo(item.location.split(","));
            __g.coord.gcs2pcs([newc84[1], newc84[0]], (res) => {
              let aaa = res.coordinates[0];
              let coord = [aaa[0] + 40000, aaa[1] - 2330000, 20];
              console.log(coord);
              let o = new TagData(item.id);
              _this.poi4IDs.push(item.id);
              o.coordinate = coord;
              o.imagePath = "http://10.140.241.98:8080/mock/医院.png";
              o.url = "";
              o.imageSize = [28, 28];
              o.text = item.name;
              o.range = [1, 800000.0];
              o.textRange = 300000;
              o.showLine = true;
              o.textColor = Color.Black;
              o.textBackgroundColor = Color.White;
              o.hoverImagePath = "http://10.140.241.98:8080/mock/医院2.png";
              //   __g.tag.add(o);
              pointPoiArr.push(o);

              if (index == yiyuan.pois.length - 1) {
                console.log(pointPoiArr);

                __g.tag.add(pointPoiArr);
              }
            });
          });
        } else {
          console.log("show医院tag");

          __g.tag.show(this.poi4IDs);
        }
      } else {
        console.log("hide医院tag");

        __g.tag.hide(this.poi4IDs);
      }
      //
      //
      //
      //
      // 5
      if (arr.indexOf("娱乐") !== -1) {
        if (this.poi5IDs.length <= 0) {
          console.log("添加娱乐tag");
          let pointPoiArr = [];
          yule.pois.forEach((item, index) => {
            let newc84 = this.getcroo(item.location.split(","));
            __g.coord.gcs2pcs([newc84[1], newc84[0]], (res) => {
              let aaa = res.coordinates[0];
              let coord = [aaa[0] + 40000, aaa[1] - 2330000, 20];
              console.log(coord);
              let o = new TagData(item.id);
              _this.poi5IDs.push(item.id);
              o.coordinate = coord;
              o.imagePath = "http://10.140.241.98:8080/mock/娱乐.png";
              o.url = "";
              o.imageSize = [28, 28];
              o.text = item.name;
              o.range = [1, 800000.0];
              o.textRange = 300000;
              o.showLine = true;
              o.textColor = Color.Black;
              o.textBackgroundColor = Color.White;
              o.hoverImagePath = "http://10.140.241.98:8080/mock/娱乐2.png";
              //   __g.tag.add(o);
              pointPoiArr.push(o);

              if (index == yule.pois.length - 1) {
                console.log(pointPoiArr);

                __g.tag.add(pointPoiArr);
              }
            });
          });
        } else {
          console.log("show娱乐tag");

          __g.tag.show(this.poi5IDs);
        }
      } else {
        console.log("hide娱乐tag");

        __g.tag.hide(this.poi5IDs);
      }
    },
    getPoi1(arr) {
      // console.log(arr);
      // let _this = this;
      // this.getPoi1change = !this.getPoi1change;
      // if (this.getPoi1change) {
      //   if (this.poi1IDs.length == 0) {
      //     const { data: res1 } = await this.$http.get("poi/商店1.json");
      //     res1.pois.forEach((item, index) => {
      //       let newc84 = this.getcroo(item.location.split(","));
      //       __g.coord.gcs2pcs([newc84[1], newc84[0]], (res) => {
      //         let aaa = res.coordinates[0];
      //         let coord = [aaa[0] + 40000, aaa[1] - 2330000, 20];
      //         console.log(coord);
      //         let o = new TagData(item.id);
      //         _this.poi1IDs.push(item.id);
      //         o.coordinate = coord;
      //         o.imageSize = [28, 28];
      //         o.text = item.name;
      //         o.range = [1, 800000.0];
      //         o.textRange = 300000;
      //         o.showLine = true;
      //         o.textColor = Color.Black;
      //         o.textBackgroundColor = Color.White;
      //         __g.tag.add(o);
      //       });
      //     });
      //   } else {
      //     __g.tag.show(this.poi1IDs);
      //   }
      // } else {
      //   __g.tag.hide(this.poi1IDs);
      // }
      // const { data: res2 } = await this.$http.get('poi/社区1.json')
      // console.log(res2)
      // const { data: res3 } = await this.$http.get('poi/学校1.json')
      // console.log(res3)
      // const { data: res4 } = await this.$http.get('poi/医院1.json')
      // console.log(res4)
      // const { data: res5 } = await this.$http.get('poi/娱乐1.json')
      // console.log(res5)
    },
    getcroo(res) {
      this.result = gcoord.transform(
        res, // 经纬度坐标
        gcoord.GCJ02, // 当前坐标系
        gcoord.WGS84 // 目标坐标系
      );
      return this.result;
    },
  },
  created() {},
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  components: {},
};
</script>

<style lang="less" scoped>
.iconfont {
  width: 100%;
  height: 100%;
  font-size: 70px;
}
.showtag {
  position: absolute;
  top: 300px;
  left: 1800px;
  width: 100px;
  height: 1000px;

  > div:first-of-type {
    background: rgba(2, 15, 43, 0.7);
    font-size: 70px;
    color: #fff;
    text-align: center;
    width: 150px;
    margin-bottom: 30px;
    cursor: pointer;
    user-select: none;
    &.active {
      background: rgba(2, 15, 43, 0.911);
      color: aqua;
    }
  }

  .el-checkbox-group {
    width: 100%;
    height: 800px;
    font-size: 50px;
    .el-checkbox-button {
      // width: 100%;
      // height: 25%;
      height: 140px;
    }
  }
}
/deep/ .el-checkbox-button__inner {
  font-size: 50px;
  padding: 0 !important;
  background: rgba(2, 15, 43, 0.7);
  text-align: center;
  line-height: 100px;
  color: #fff;
  border: none;
  display: block;
  width: 150px !important;
  height: 100px !important;
}
/deep/ .el-checkbox-button:first-child .el-checkbox-button__inner {
  border: none;
}
/deep/ .el-checkbox-button.is-checked .el-checkbox-button__inner {
  background: rgba(2, 15, 43, 0.911);
  color: aqua;
}
</style>
