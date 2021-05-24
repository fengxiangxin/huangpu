<template>
  <div
    class="right"
    :style="{ left: positonPOI.left + 'px', top: positonPOI.top + 'px' }"
  >
    
    <div class="close" @click="$emit('close')">
      <i class="el-icon-close"></i>
    </div>
    <div class="header">{{$store.state.header}}</div>
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
      show: false,
      dataList: {
        '名字': "洪恩医疗财团法人洪恩综合医院",
        '城市': "广州",
        '区域': "黄埔区",
        '地址': "开发大道412号-416号-420号",
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
//   height: 100px;
  border: 1px solid #3377E0;
  position: absolute;
  right: 320px;
  top: 300px;
  zoom: 4;
  box-shadow: 0px 0.5px 0.5px 1px #3377E0,
            -0.5px 0px 0.5px 1px #3377E0,
            0.5px 0px 0.5px 1px #3377E0,
            0px -0.5px 0.5px 1px #3377E0;
//   background: url("../../assets/img/traffic_map_video_bg1.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  background: rgba(2, 15, 43, 0.7);
  
//   opacity: 0.6;
  .close {
    font-size: 10px;
    float: right;
    cursor: pointer;
    color: #ffffff;
  }
  .header{
      clear: both;
      font-size: 16px;
      float: left;
      width: 100%;
      height: 20px;
      margin-top: 10px;
      text-indent: 20px;
      font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
      color: #5BC9CE;
  }
  .content {
    clear: both;
    padding: 0 10px 10px 10px;
    // border: 1px solid red;
    margin-top: 30px;
    span {
      font-size: 14px;
      display: block;
      padding: 5px;
    }
  }
}
</style>