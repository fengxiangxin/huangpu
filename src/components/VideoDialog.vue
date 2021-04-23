<template>
  <div class="rainpipe">
    <div>
      <span>视频播放</span>
      <span @click="$emit('close')">关闭</span>
    </div>
    <div>
      <div class="more">
        <img src="../assets/img/ip_more_bg.png" alt="" />
      </div>
      <div class="video">
        <video @click="play" ref="video" :src="video"></video>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoDialog",
  data() {
    return {
      isPaly: false,
    };
  },
  props: ["video"],
  methods: {
    play() {
      if (this.isPaly === false) {
        this.$refs.video.play().then(() => {
          this.isPaly = true;
        });
      }
      if (this.isPaly) {
        this.$refs.video.pause();
        this.isPaly = false;
      }
    },
  },
};
</script>

<style lang='less' scoped>
.rainpipe {
  position: absolute;
  right: 27%;
  top: 270px;
  width: 1500px;
  font-size: 50px;
  color: #fff;

  > div:nth-of-type(1) {
    height: 100px;
    background: url("../assets/img/traffic_map_video_bg1.png");
    background-size: cover;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 20px 20px 0 50px;

    > span:last-of-type {
      color: #8f9cff;
      cursor: pointer;
    }
  }
  > div:nth-of-type(2) {
    position: relative;
    width: 99%;
    padding: 50px 0;
    background: rgba(0, 0, 0, 0.57);
    margin: 0 auto;

    .more {
      position: absolute;
      bottom: 0;
      width: 100%;
      > img {
        position: absolute;
        bottom: 0;
        width: 100%;
      }
    }
  }
}
.rainpipe-con {
  height: 100%;
  flex-direction: column;
  display: flex;
  justify-content: space-evenly;
  > div {
    display: flex;
    justify-content: space-around;
    opacity: 0.8;
    margin: 10px 0;
    > span {
      width: 40%;
    }
    > span:first-of-type {
      text-align: right;
    }
  }
}
.video {
  display: flex;
  justify-content: space-evenly;
  > video {
    margin: 0 auto;
    display: block;
    width: 95%;
    height: 700px;
    border: none;
    object-fit: fill;
  }
}
</style>