<template>
  <div class="header">
    <img
      src="../../assets/img/top-bg.e2cfef35.png"
      style="width: 100%; height: 100%"
    />
    <div class="header-layout">
      <div class="center-content" @click="navTo('/')">
        <div>广州黄浦区“令行禁止,有呼必应”</div>
      </div>
      <div class="subtitle" @click="navTo('/')">综合指挥调度平台</div>
      <div class="left-layout">
        <div class="left-flex">
          <div class="btn" @click="navTo('JointConstruction')">智慧党建</div>
          <div class="btn" @click="navTo('fun')">令行禁止</div>
          <div class="btn" @click="navTo('wadong')">有呼必应</div>
        </div>
      </div>
      <div class="right-layout">
        <div class="left-flex">
          <div class="btn" @click="navTo('tree')">智慧共治</div>
          <div class="btn">智慧共享</div>
          <div class="btn">智慧花市</div>
        </div>
      </div>
    </div>

    <!-- 时间天气 -->
    <el-popover
      placement="bottom"
      title=""
      trigger="click"
      class="popover"
      popper-class="popover"
    >
      <TimeControl />
      <div class="time_weather" slot="reference">
        <div class="time">
          <div class="hour">{{ time }}</div>
          <div class="year">{{ date }}</div>
        </div>
        <div class="weather">
          <div>
            <i class="el-icon-cloudy-and-sunny"></i>
          </div>
          <div>29℃</div>
        </div>
        <!-- <div>29℃</div> -->
      </div>
    </el-popover>
  </div>
</template>

<script>
import TimeControl from "../comHeader/TimeControl";
import Footer from "./Footer";
export default {
  data() {
    return {
      time: "",
      date: "",
      isShowFenxi: true,
    };
  },
  methods: {
    navTo(name) {
      this.$router.push(name);
    },

    loadingTime() {
      const year = new Date().getFullYear();
      const month =
        new Date().getMonth() + 1 < 10
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1;
      const date =
        new Date().getDate() < 10
          ? "0" + new Date().getDate()
          : new Date().getDate();
      const hh =
        new Date().getHours() < 10
          ? "0" + new Date().getHours()
          : new Date().getHours();
      const mm =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      const ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      const week = new Date().getDay();
      this.time = hh + ":" + mm + ":" + ss;
      this.date = year + "." + month + "." + date;
      return this.Date + this.Time;
    },
  },
  mounted() {
    this.loadingTime();
    this.timeInterval = setInterval(() => {
      this.loadingTime();
    }, 1000);
  },
  components: {
    TimeControl,
    Footer,
  },
};
</script>

<style lang="less">
.time_weather {
  color: #fff;
  position: absolute;
  right: 20px;
  top: 10px;
  font-size: 38px;
  display: flex;
  cursor: pointer;
  .time {
    text-align: center;
    margin-right: 20px;
  }
  .weather {
    display: flex;
    align-items: center;
    font-size: 50px;
    > div {
      margin-right: 20px;
    }
  }
}
.btn {
  width: 425px;
  height: 127px;
  background: #051b26;
  border: 1px solid #eee;
  margin-top: 78px;
  line-height: 125px;
  color: #fff;
  opacity: 0.7;
  text-align: center;
  font-size: 44px;
  border-radius: 20px;
  cursor: pointer;
}
.btn:hover {
  opacity: 1;
}
.left-flex {
  display: flex;
  justify-content: space-between;
}
.header {
  position: absolute;
  top: 0;
  height: 200px;
  width: 6400px;
}
.header-layout {
  position: absolute;
  top: 0;
  left: 0;
  height: 250px;
  width: 100%;
  background: linear-gradient(to bottom, rgba(2, 15, 43, 0.7) 80%, transparent);
}
.subtitle {
  color: #fff;
  line-height: 40px;
  font-size: 60px;
  letter-spacing: 6px;
  position: absolute;
  width: 1000px;
  margin-left: 50%;
  left: -500px;
  text-align: center;
  top: 180px;
}
.left-layout {
  position: absolute;
  width: 25%;
  left: 12.5%;
  height: 40px;
  z-index: 1;
}
.right-layout {
  position: absolute;
  width: 25%;
  right: 12%;
  height: 40px;
  z-index: 1;
}
.center-content {
  position: absolute;
  width: 1500px;
  height: 180px;
  margin-left: 50%;
  left: -750px;
  font-size: 64px;
  line-height: 170px;
  color: #fff;
  text-align: center;
}
.popover {
  font-size: 42px !important;
  background-color: rgba(2, 15, 43, 0.7) !important;
  color: #fff !important;
  border: none !important;
  top: 213px !important;
}

/deep/.el-popper[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: rgba(2, 15, 43, 0.7) !important;
}
/deep/.el-slider__button-wrapper {
  top: -20px !important;
}
</style>
