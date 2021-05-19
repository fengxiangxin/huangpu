<template>
  <div class="tree">
    <div class="leftTree">
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        @node-click="handleNodeClick"
        @check-change="handleCheckChange"
        :default-expand-all="true"
        :render-after-expand="false"
        :props="defaultProps"
      >
      </el-tree>
    </div>
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

<style scoped>
.tree {
  width: 300px;
  height: 100px;
  position: absolute;
  top: 150px;
  left: 450px;
  zoom: 4;
}
.leftTree {
  width: 300px;
  height: 100px;
}

.el-tree {
  background: black;
  color: #fff;
  font-size: 24px;
}
</style>