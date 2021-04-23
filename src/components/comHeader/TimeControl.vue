<template>
  <div class="control">
    <div class="control-top">
      <div>
        <div>18:00:59</div>
        <div>2021年03月23日 二月十一</div>
      </div>
      <div>
        <div>
          <div>
            <img src="../../assets/img/weather_bg.png" alt="" />
          </div>
          <span>多云</span>
        </div>
        <div>气温：28摄氏度</div>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="control-theme">
      <div>
        <span>暗黑模式</span>
        <el-switch v-model="value1" @change="setDarkMode"> </el-switch>
      </div>
      <div>
        <span>灯光模式</span>
        <el-switch v-model="value2"> </el-switch>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="control-weather">
      <div :class="weatherActive === 1 && 'active'" @click="updateWeather(1)">
        <div>
          <img src="../../assets/img/weather_sunshine.png" alt="" />
        </div>
        <span>晴朗</span>
      </div>
      <div :class="weatherActive === 2 && 'active'" @click="updateWeather(2)">
        <div>
          <img src="../../assets/img/weather_cloudy_s.png" alt="" />
        </div>
        <span>多云</span>
      </div>
      <div :class="weatherActive === 3 && 'active'" @click="updateWeather(3)">
        <div>
          <img src="../../assets/img/weather_rain.png" alt="" />
        </div>
        <span>下雨</span>
      </div>
      <div :class="weatherActive === 4 && 'active'" @click="updateWeather(4)">
        <div>
          <img src="../../assets/img/weather_snow.png" alt="" />
        </div>
        <span>下雪</span>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="control-time">
      <div>
        <span>实时时间</span>
        <el-switch v-model="value3"> </el-switch>
      </div>

      <div>
        <div :class="timeActive === 1 && 'active'" @click="updateSlot(1)">
          <div>
            <img src="../../assets/img/weather_morning.png" alt="" />
          </div>
          <div>早晨</div>
        </div>
        <div :class="timeActive === 2 && 'active'" @click="updateSlot(2)">
          <div>
            <img src="../../assets/img/weather_afternoon.png" alt="" />
          </div>
          <div>中午</div>
        </div>
        <div :class="timeActive === 3 && 'active'" @click="updateSlot(3)">
          <div>
            <img src="../../assets/img/weather_sunset.png" alt="" />
          </div>
          <div>傍晚</div>
        </div>
        <div :class="timeActive === 4 && 'active'" @click="updateSlot(4)">
          <div>
            <img src="../../assets/img/weather_night.png" alt="" />
          </div>
          <div>晚上</div>
        </div>
      </div>

      <div>
        <!-- <el-slider tooltip-class="tool" :show-tooltip="false"></el-slider> -->
        <div ref="father">
          <!-- <div ref="time"></div>
          <div @mousedown="updateTime">{{ time }}</div> -->
          <el-slider
            v-model="timeValue"
            tooltip-class="tool"
            :step="1"
            :max="24"
            @input="updateTime"
            :format-tooltip="formatTime"
          ></el-slider>
        </div>
        <div>
          <span>00:00</span>
          <span>24:00</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      value1: false,
      value2: false,
      value3: true,
      time: "08:00",
      weatherActive: 2,
      timeActive: 3,
      timeValue: 8,
    };
  },
  methods: {
    setDarkMode() {
      __g.weather.setDarkMode(this.value1);
    },
    formatTime(value) {
      return value && value.toString().padStart(2, "0") + ":00";
    },
    updateTime() {
      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1;
      const date = new Date().getDate();
      __g &&
        __g.weather.setDateTime(year, month, date, this.timeValue, 0, false);
    },
    updateSlot(active) {
      this.timeActive = active;
      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1;
      const date = new Date().getDate();
      switch (active) {
        case 1:
          __g.weather.setDateTime(year, month, date, 8, 0, false);
          break;
        case 2:
          __g.weather.setDateTime(year, month, date, 12, 0, false);
          break;
        case 3:
          __g.weather.setDateTime(year, month, date, 18, 0, false);
          break;
        case 4:
          __g.weather.setDateTime(year, month, date, 23, 0, false);
          break;
        default:
          break;
      }
    },
    updateWeather(active) {
      this.weatherActive = active;
      switch (active) {
        case 1:
          __g.weather.disableRainSnow();
          break;
        case 2:
          __g.weather.setCloudDensity(0.8);
          break;
        case 3:
          __g.weather.setRainParam(80, 80, 80);
          break;
        case 4:
          __g.weather.setSnowParam(80, 80,80);
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang='less' scoped>
.control {
  width: 1137px;
  height: 1296px;
  // background: url("../../assets/img/weather_bg_0.png");
  // position: absolute;
  right: 120px;
  top: -30px;
  .control-top {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 324px;
    > div:first-of-type {
      > div:first-of-type {
        font-size: 78px;
      }
      > div:last-of-type {
        opacity: 0.7;
        font-size: 42px;
      }
    }
    > div:last-of-type {
      > div:first-of-type {
        display: flex;
        align-items: center;
        > span {
          opacity: 0.7;
          font-size: 54px;
        }
      }
      > div:last-of-type {
        opacity: 0.7;
        font-size: 42px;
      }
    }
  }
  .control-theme {
    display: flex;
    margin-left: 93px;
    font-size: 42px;
    height: 144px;
    align-items: center;
    > div {
      margin-right: 63px;
      > span {
        margin-right: 30px;
      }
    }
  }
  .control-weather {
    display: flex;
    justify-content: space-evenly;
    padding: 0 60px;
    margin: 30px 0;
    > div {
      width: 222px;
      height: 241.5px;

      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    > div.active {
      background: rgba(87, 87, 122, 0.5);
    }
  }
  .control-time {
    > div:first-of-type {
      margin-left: 93px;
      margin-top: 39px;
      > span {
        margin-right: 30px;
      }
    }
    > div:nth-of-type(2) {
      display: flex;
      justify-content: space-evenly;
      margin-top: 45px;
      margin-bottom: 63px;
      padding: 0 60px;
      > div {
        width: 222px;
        height: 214.5px;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      > div.active {
        background: rgba(87, 87, 122, 0.5);
      }
    }
    > div:last-of-type {
      width: 948px;
      margin: 0 auto;
      > div:first-of-type {
        height: 12px;
        background: rgba(55, 66, 109, 0.64);
        display: flex;
        align-items: center;
        > div:first-of-type {
          opacity: 0.9;
          background-image: linear-gradient(90deg, #05a9e6 0%, #09ecff 99%);
          height: 100%;
          width: 300px;
        }
        > div:last-of-type {
          width: 120px;
          width: 100%;
          height: 45px;
          background: rgba(0, 69, 129, 0.18);
          // border: 1px solid #67e1ff;
          font-size: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #00fff9;
          cursor: pointer;
          user-select: none;
        }
      }
      > div:last-of-type {
        display: flex;
        justify-content: space-between;
        font-size: 36px;
        margin-top: 9px;
      }
    }
  }
}
img {
  width: 78px;
  height: 78px;
  user-select: none;
  -webkit-touch-callout: none;
}
/deep/.el-switch.is-checked .el-switch__core {
  background-color: rgba(38, 153, 168, 0.25);
  border-color: #00fff9;
}
/deep/.el-switch.is-checked .el-switch__core:after {
  background-color: #00fff9;
  left: 80%;
}
/deep/.el-switch__core {
  background-color: rgba(22, 87, 117, 0.16);
  border-color: #2c448b;
  height: 60px;
  border-radius: 30px;
  width: 120px !important;
}
/deep/.el-switch__core:after {
  background-color: #2c448b;
  width: 30px;
  height: 30px;
  top: 10.5px;
}
/deep/.el-divider--horizontal {
  margin: 0 auto;
  width: 84%;
}
/deep/.el-divider {
  opacity: 0.6;
  background-image: linear-gradient(to right, #cbd4ff, #fff 50%, #cbd4ff);
  border-radius: 8px;
}
/deep/.el-slider__runway {
  height: 18px;
}
/deep/.el-slider__button {
  width: 32px;
  height: 32px;
}
/deep/.el-slider__bar {
  height: 18px;
}
/deep/.el-slider__button-wrapper {
  width: 32px !important;
  height: 32px !important;
  top: -19px !important;
}
</style>