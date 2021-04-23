<template>
  <div class="title">
    <div>{{ title || "标题" }}</div>
  </div>
</template>

<script>
export default {
  name: "Title",
  data () {
    return {};
  },
  props: ["title"],
};
</script>

<style lang='less' scoped>
.title {
  box-sizing: border-box;
  padding-left: 70px;
  background-image: url("../../assets/img/title_bg.ecbcedea.png");
  width: 100%;
  height: 108px;
  font-size: 60px;
  line-height: 108px;
  text-indent: 153px;
  position: relative;
  background-size: 100% 100%;
  color: #fff;
  > div {
    background: url("../../assets/img/titleicon.46e0e06e.png") no-repeat;
    background-size: contain;
    letter-spacing: 5px;
  }
}
</style>