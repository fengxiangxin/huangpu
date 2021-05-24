<template>
  <div
    class="right"
    :style="{ left: positonPOI.left + 'px', top: positonPOI.top + 'px' }"
  >
    <div class="close" @click="$emit('close')">
      <i class="el-icon-close"></i>
    </div>
    <div class="content">
      <div v-for="(value, key, index) in oneTag" :key="index">
        <span>{{ key }} : {{ value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: fasle,
      dataList: {
        名字: "洪恩医疗财团法人洪恩综合医院",
        城市: "广州",
        区域: "黄埔区",
        地址: "开发大道412号-416号-420号",
      },
    };
  },
  props: ["oneTag", "positonPOI"],
  methods: {
    // close() {
    //   console.log(1111);
    // },
  },
};
</script>

<style lang="less" scoped>
.right {
  width: 350px;
  border: 1px solid rgba(2, 15, 43, 0.7);
  position: absolute;
  right: 320px;
  top: 300px;
  zoom: 4;
  box-shadow: 5px 5px 15px rgba(2, 15, 43, 0.7);
  // background-image:url(../../assets/img/frame.60f567eb.png) ;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  background: rgba(2, 15, 43, 0.7);
  opacity: 0.6;
  .close {
    font-size: 10px;
    float: right;
    cursor: pointer;
    color: #ffffff;
  }
  .content {
    padding: 0 10px 10px 10px;
    clear: both;
    span {
      font-size: 10px;
      display: block;
    }
  }
}
</style>