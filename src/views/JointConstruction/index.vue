<template>
  <div class="jointconstruction">
    <JointLeft />
    <div class="btn" @click="show"></div>
    <Tree />
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
    return {};
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

</style>