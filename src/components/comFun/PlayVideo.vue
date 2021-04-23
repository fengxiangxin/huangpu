<template>
  <div class="playvideo">
    <video
      ref="video"
      class="video"
      src="../../assets/video/videoDemo.mp4"
      @click="play"
    ></video>
  </div>
</template>

<script>
export default {
  name: "PlayVideo",
  data() {
    return {
      isPaly: false,
    };
  },
  methods: {
    play() {
      if (this.isPaly === false) {
        this.$refs.video.play().then(() => {
          this.isPaly = true;
        });
      }
      if (this.isPaly) {
        this.$refs.video.pause();
      }
    },
  },
  mounted() {},
  beforeDestroy() {},
  components: {},
};
</script>

<style lang='less' scoped>
.playvideo {
  position: absolute;
  left: 3300px;
  top: 600px;
}
.video {
  width: 800px;
  height: 600px;
}
</style>