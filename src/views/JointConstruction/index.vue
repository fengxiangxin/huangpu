<template>
  <div class="jointconstruction">
    <JointLeft />
    <div class="showbtn" @click="show"></div>
    <transition name="fade">
        <Tree v-if="showBtn" />
    </transition>
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
    width:150px;
    height: 100px;
    background-image:url(../../assets/img/map-tool-select.e4fe350f.gif);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    position: absolute;
    left: 900px;
    top: 150px;
    zoom: 2;
    text-align: center;
    transition: all 0.6s;
    &:hover{
         transform: scale(1.4);
    }
}
.fade-enter-to{
    opacity: 1;
}
.fade-enter-active{
    transition: opacity .5s;
}
.fade-leave-active{
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
</style>