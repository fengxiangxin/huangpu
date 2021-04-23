<template>
  <div class="wadong"></div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    async wadong() {
      // 移动到楼
      await __g.camera.set(
        66432.140625,
        249894.578125,
        350.772247,
        -32.998325,
        111.669296,
        0
      );
      await __g.tileLayer.enableClip("CA95D0BA4331F167171D06A8E552FAE3");
      let coords = [
        [66676.5703125, 249313.953125, 48.0500373840332],
        [66524.125, 249603.21875, 48.02583694458008],
        [66120.4140625, 249388.859375, 50.00001907348633],
        [66275.8203125, 249098.015625, 50.000038146972656],
      ];
      __g.tools.startPolygonClip(coords);
      //
      //     {
      // 	"command":	6,
      // 	"timestamp":	1619162708505,
      // 	"callbackIndex":	16,
      // 	"result":	0,
      // 	"resultMessage":	"OK",
      // 	"x":	66432.140625,
      // 	"y":	249894.578125,
      // 	"z":	350.772247,
      // 	"pitch":	-32.998325,
      // 	"yaw":	111.669296,
      // 	"roll":	-0.000002,
      // 	"camera":	[66432.140625, 249894.578125, 350.772247, -32.998325, 111.669296, -0.000002]
      // }
      // 这是camera.get的回调函数的输出信息，可以通过下面的代码重新设置到当前的位置：

      // __g.camera.set(66432.140625, 249894.578125, 350.772247, -32.998325, 111.669296, 0);
      //
    },
  },
  created() {},
  mounted() {
    if (__g) {
      this.wadong();
    }
  },
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  components: {},
};
</script>

<style lang="less" scoped></style>
