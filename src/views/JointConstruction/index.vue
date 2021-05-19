<template>
  <div class="jointconstruction">
    <JointLeft />
    <div class="showbtn" @click="show">Tree</div>
    <Tree v-if="showBtn" />
    <JointRight />
  </div>
</template>

<script>
import JointLeft from "../../components/comJoint/JointLeft";
import Tree from "../Tree"
import JointRight from "../../components/comJoint/JointRight";
export default {
  name: "JointConstruction",
  data() {
    return {
        showBtn:false
    };
  },
  methods:{
      show(){
          this.showBtn = !this.showBtn
      }
  },
  components: {
    JointLeft,
    JointRight,
    Tree
  },
};
</script>

<style lang='less' scoped>
.jointconstruction {
  width: 100%;
  color: #fff;
  font-size: 38px;
}
.showbtn{
    width:100px;
    height: 50px;
    background: blueviolet;
    position: absolute;
    left: 900px;
    top: 150px;
    zoom: 2;
    text-align: center;
}
</style>