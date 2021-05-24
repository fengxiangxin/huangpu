<template>
  <div class="tree">
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      @node-click="handleNodeClick"
      @check-change="handleCheckChange"
      :default-expand-all="true"
      :render-after-expand="false"
      :check-on-click-node="true"
      :props="defaultProps"
    >
    </el-tree>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      data: [
        {
          id: 1,
          label: "城市概览",
          children: [
            {
              id: "2",
              label: "烟感器",
            },
            {
              id: "3",
              label: "智能垃圾桶",
            },
            {
              id: "4",
              label: "重点旧村改造",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      checkArr: [],
      poiID2: [],
      poiID3: [],
      poiID4: [],
    };
  },
  methods: {
    handleNodeClick() {},
    handleCheckChange(data, isCheck) {
      // __g.tag.clear();
      console.log(data, "data");
      if (data.children) return;
      console.log(data.id, isCheck);
      switch (data.id) {
        case "2":
          if (isCheck) {
            if (this.poiID2.length > 0) {
              /* 显示poi */
              __g.tag.show(this.poiID2);
              return;
            }
            const yangan = require("../../assets/json/yanganqi.json");
            const poiArr = [];
            const temp = yangan.data.data.filter((item, index) => {
              if (index < 200) {
                return true;
              }
            });
            temp.forEach(async (item, index, arr) => {
              /* 坐标转换 经-纬 */
              __g.coord.gcs2pcs(
                [parseFloat(item.LATITUDE), parseFloat(item.LONGITUDE)],
                (res) => {
                  const coord = [
                    res.coordinates[0][0] + 40000,
                    res.coordinates[0][1] - 2330000,
                    20,
                  ];
                  console.log(parseInt((index / (arr.length - 1)) * 100) + "%");
                  let o = new TagData("tag1+" + item.ID);
                  this.poiID2.push("tag1+" + item.ID);
                  o.coordinate = coord;
                //   o.imagePath = IP + "/mock/shop.png";
                  o.imagePath = HostConfig.Path + '/烟感器.png';
                  console.log(o.imagePath,'image')
                  o.url = "";
                  o.imageSize = [28, 28];
                  o.text = "";
                  o.range = [1, 800000.1];
                  o.textRange = 300000;
                  o.showLine = false;
                  o.textColor = Color.Black;
                  o.textBackgroundColor = Color.White;
                  o.hoverImagePath = IP + "/mock/商店2.png";
                  poiArr.push(o);
                  // console.log(o);
                  if (index >= 199) {
                    console.log("添加");
                    __g.tag.add(poiArr);
                  }
                }
              );
            });
          } else {
            __g.tag.hide(this.poiID2);
          }
          break;
        case "3":
          if (isCheck) {
            // console.log(333333333);
            if (this.poiID3.length > 0) {
              /* 显示poi */
              __g.tag.show(this.poiID3);
              return;
            }
            const lajitong = require("../../assets/json/lajitong.json");
            const poiArr = [];
            const temp = lajitong.data.data.filter((item, index) => {
              if (index < 200) {
                return true;
              }
            });
            temp.forEach(async (item, index) => {
              /* 坐标转换 经-纬 */
               __g.coord.gcs2pcs(
                [parseFloat(item.LATITUDE), parseFloat(item.LONGITUDE)],
                (res) => {
                  const coord = [
                    res.coordinates[0][0] + 40000,
                    res.coordinates[0][1] - 2330000,
                    20,
                  ];
                  // console.log(coord);
                  let o = new TagData("tag2+" + item.ID);
                  this.poiID3.push("tag2+" + item.ID);
                  o.coordinate = coord;
                  o.imagePath = IP + "/mock/社区.png";
                  o.url = "";
                  o.imageSize = [28, 28];
                  o.text = item.name;
                  o.range = [1, 800000.1];
                  o.textRange = 300000;
                  o.showLine = false;
                  o.textColor = Color.Black;
                  o.textBackgroundColor = Color.White;
                  o.hoverImagePath = "";
                  // console.log(o);
                  poiArr.push(o);
                  if (index >= 199) {
                    // console.log(poiArr);
                    __g.tag.add(poiArr);
                  }
                }
              );
            });
          } else {
            __g.tag.hide(this.poiID3);
          }
          break;
        case "4":
          if (isCheck) {
            // console.log(444);
            if (this.poiID4.length > 0) {
              /* 显示poi */
              __g.tag.show(this.poiID4);
              return;
            }
            const jiucun = require("../../assets/json/jiucun.json");
            const poiArr = [];
            const temp = jiucun.data.data.filter((item, index) => {
              if (index < 200) {
                return true;
              }
            });
            temp.forEach(async (item, index) => {
              /* 坐标转换 经-纬 */
               __g.coord.gcs2pcs(
                [parseFloat(item.LATITUDE), parseFloat(item.LONGITUDE)],
                (res) => {
                  const coord = [
                    res.coordinates[0][0] + 40000,
                    res.coordinates[0][1] - 2330000,
                    20,
                  ];
                  // console.log(coord);
                  let o = new TagData("tag3+" + item.ID);
                  this.poiID4.push("tag3+" + item.ID);
                  o.coordinate = coord;
                  o.imagePath = IP + "/mock/娱乐.png";
                  o.url = "";
                  o.imageSize = [28, 28];
                  o.text = item.name;
                  o.range = [1, 800000.1];
                  o.textRange = 300000;
                  o.showLine = false;
                  o.textColor = Color.Black;
                  o.textBackgroundColor = Color.White;
                  o.hoverImagePath = "";
                  // console.log(o);
                  poiArr.push(o);
                  if (index >= temp.length - 1) {
                    // console.log(poiArr);
                    __g.tag.add(poiArr);
                  }
                }
              );
            });
          } else {
            __g.tag.hide(this.poiID4);
          }
          break;
        default:
          break;
      }
    },
  },
  async mounted() {
    __g.tag.clear();
    // let o = new TagData("test");
    // o.coordinate = [23.19030724 + 40000, 113.43788454 - 2330000];
    // o.imagePath = IP + "/mock/shop.png";
    // o.url = IP + "/mock/diag.html?a=1&b=2";
    // o.imageSize = [28, 28];
    // o.text = "";
    // o.range = [1, 800000.1];
    // o.textRange = 300000;
    // o.showLine = false;
    // o.textColor = Color.Black;
    // o.textBackgroundColor = Color.White;
    // o.hoverImagePath = IP + "/mock/商店2.png";
    // __g.tag.add(o);
    // __g.tag.focus("test");
  },
};
</script>

<style lang="less" scoped>
.tree {
  width: 300px;
  height: 100px;
  position: absolute;
  top: 130px;
  left: 450px;
  zoom: 4;
}
.el-tree {
  //   background-image: url(../../assets/img/frame.60f567eb.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  background-color: rgba(2, 15, 43, 0.7);
  color: #fff;
  font-size: 24px;
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