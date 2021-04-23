<template>
  <div class="jointconstruction">
    <JointLeft />
    <JointRight />
  </div>
</template>

<script>
import JointLeft from "../../components/comJoint/JointLeft";
import JointRight from "../../components/comJoint/JointRight";
export default {
  name: "JointConstruction",
  data() {
    return {};
  },
  components: {
    JointLeft,
    JointRight,
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