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
    };
  },
  methods: {
    handleNodeClick(a, b, c) {},
    handleCheckChange(data, isCheck) {
      //   console.log(data, isCheck);
      if (data.children) return;
      if (isCheck) {
        this.checkArr.push(data.id);
        switch (data.id) {
          case "2":
            this.$request
              .post("/v1/service/ygsbwzxxbcxjk", {
                query: { street_name: "大沙街", duty_date: "2021-03-04" },
              })
              .then((res) => {
                console.log(res);
              });
            break;
          case "3":
            break;
          case "4":
            break;
          default:
            break;
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tree{
    width: 300px;
    height: 100px;
    position: absolute;
    top: 130px;
    left: 450px;
    zoom: 4;
}
.el-tree {
  background-image:url(../../assets/img/frame.60f567eb.png) ;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  background-color: transparent;
  color: #fff;
  font-size: 24px;
}
/deep/ .el-icon-caret-right:before{
    content: '';
}
/deep/ .el-tree-node__content:hover{
    background-color: transparent;
}

</style>