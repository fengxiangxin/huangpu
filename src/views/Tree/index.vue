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
            yangan.data.data.forEach((item) => {
              /* 坐标转换 经-纬 */
              __g.coord.gcs2pcs([item.LONGITUDE, item.LATITUDE], () => {
                const coord = [
                  res.coordinates[0][0],
                  res.coordinates[0][1],
                  20,
                ];
                console.log(coord);
                let o = new TagData("tag1+" + item.ID);
                this.poiID2.push("tag1+" + item.ID);
                o.coordinate = coord;
                o.imagePath = IP + "/mock/shop.png";
                o.url = "";
                o.imageSize = [28, 28];
                o.text = item.name;
                o.range = [1, 800000.1];
                o.textRange = 300000;
                o.showLine = true;
                o.textColor = Color.Black;
                o.textBackgroundColor = Color.White;
                o.hoverImagePath = IP + "/mock/商店2.png";
                poiArr.push(o);
              });
            });
            __g.tag.add(poiArr);
          } else {
            __g.tag.hide(this.poiID2);
          }
          break;
        case "3":
          if (isCheck) {
            if (this.poiID3.length > 0) {
              /* 显示poi */
              __g.tag.show(this.poiID3);
              return;
            }
            const lajitong = require("../../assets/json/lajitong.json");
            const poiArr = [];
            lajitong.data.data.forEach((item) => {
              /* 坐标转换 经-纬 */
              __g.coord.gcs2pcs([item.LONGITUDE, item.LATITUDE], () => {
                const coord = [res.coordinates[0][0], res.coordinates[0][1]];
                console.log(coord);
                let o = new TagData("tag+" + item.ID);
                this.poiID3.push("tag+" + item.ID);
                o.coordinate = coord;
                o.imagePath = IP + "/mock/shop.png";
                o.url = "";
                o.imageSize = [28, 28];
                o.text = item.name;
                o.range = [1, 800000.1];
                o.textRange = 300000;
                o.showLine = true;
                o.textColor = Color.Black;
                o.textBackgroundColor = Color.White;
                o.hoverImagePath = IP + "/mock/商店2.png";
                poiArr.push(o);
              });
            });
            __g.tag.add(poiArr);
          } else {
            __g.tag.hide(this.poiID3);
          }
          break;
        case "4":
          break;
        default:
          break;
      }
    },
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
  background-image: url(../../assets/img/frame.60f567eb.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  background-color: transparent;
  color: #fff;
  font-size: 24px;
}
/deep/ .el-icon-caret-right:before {
  content: "";
}
/deep/ .el-tree-node__content:hover {
  background-color: transparent;
}
/deep/.el-tree-node:focus > .el-tree-node__content {
  background-color: transparent !important;
}
</style>