<template>
  <div class="jointright">
    <div>
      <Title title="项目筹建状态" />
      <div class="right_progress">
        <div v-for="item in list" :key="item.id">
          <div>{{ item.id }} {{ item.name }}</div>
          <div>
            <div>
              <el-progress
                :percentage="parseInt((item.num / (41 + 143 + 22 + 39)) * 100)"
                :stroke-width="30"
                :show-text="false"
              ></el-progress>
            </div>
            <div>{{ item.num }} 个</div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <Title title="项目片区分布" />
      <div class="chart_1" ref="chartBar"></div>
    </div>

    <div>
      <Title title="项目建设曲线" />
      <div class="chart_2" ref="chartLine"></div>
    </div>
  </div>
</template>

<script>
import Title from "../../components/comJoint/Title";
export default {
  name: "JointRight",
  data() {
    return {
      list: [
        {
          id: 1,
          name: "投资试产项目",
          num: 41,
        },
        {
          id: 2,
          name: "在建项目",
          num: 143,
        },
        {
          id: 3,
          name: "已签协议未拿地项目",
          num: 22,
        },
        {
          id: 4,
          name: "已拿地未动工项目",
          num: 39,
        },
      ],
    };
  },
  methods: {
    initBarChart() {
      this.chart = this.$echarts.init(this.$refs.chartBar);
      var xData = [
          "知识城",
          "科学城",
          "永和",
          "云埔",
          "其他",
          "生物岛",
          "东区",
          "西区",
          "临港",
          "长岭区",
          "保税区",
        ],
        yData1 = [72, 57, 33, 28, 17, 13, 13, 11, 10, 5, 3],
        yData2 = [100, 206, 236, 106],
        yData3 = [90, 106, 236, 96],
        borderData = [],
        legend = ["轨道", "公交", "自驾"],
        colorArr = ["#0095FF", "#00D39E", "#FEF57A"];
      const colorArr2 = ["#0994F3", "#09F2AE", "#F2DD15"];
      var normalColor = "rgba(255,255,255,0.4)";
      let seriesData = [];
      var borderHeight = 2;
      xData.forEach(() => {
        borderData.push(borderHeight);
      });
      [yData1].forEach((item, index) => {
        var obj1 = {};
        var obj2 = {};
        obj1 = {
          realtimeSort: true,
          name: legend[index],
          type: "bar",
          stack: legend[index],
          data: item,
          barWidth: "35%",
          itemStyle: {
            color: colorArr[index],
            opacity: 0.4,
          },
          label: {
            show: true,
            position: "top",
            valueAnimation: true,
            distance: 15,
            fontSize: 28, 
          },
        };
        obj2 = {
          name: "",
          type: "bar",
          stack: legend[index],
          itemStyle: {
            color: colorArr[index],
            opacity: 1,
          },
          data: borderData,
        };
        seriesData.push(obj1);
        seriesData.push(obj2);
      });
      const option = {
        backgroundColor: "transparent",
        grid: {
          left: "3%",
          top: "10%",
          right: "3%",
          bottom: 30,
          containLabel: true,
        },
        legend: {
          show: false,
          icon: "rect",
          itemWidth: 8,
          itemHeight: 8,
          x: "center", //可设定图例在左、右、居中
          y: "bottom", //可设定图例在上、下、居中
          // padding:[30,0,0,0],   //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
          textStyle: {
            color: "#fff",
          },
          data: legend,
        },
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            var str = "";
            for (var i = 0; i < params.length; i++) {
              if (params[i].seriesName !== "") {
                str +=
                  params[i].name +
                  ":" +
                  params[i].seriesName +
                  params[i].value +
                  "<br/>";
              }
            }
            return str;
          },
        },
        xAxis: [
          {
            type: "category",
            data: xData,
            axisPointer: {
              type: "shadow",
            },
            axisLabel: {
              color: "#EDF9FF",
              fontSize: 38,
              rotate: 60,
            },
            axisLine: {
              lineStyle: {
                type: "solid",
                color: normalColor,
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            nameTextStyle: {
              color: normalColor,
              fontSize: 12,
            },
            axisLabel: {
              formatter: "{value}",
              color: "#fff",
              fontSize: 38,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: normalColor,
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: normalColor,
              },
            },
          },
        ],
        series: seriesData,
      };
      this.chart.setOption(option);
      window.onresize = () => {
        this.chart.resize();
      };
    },
    initLineChart() {
      var chartDom = this.$refs.chartLine;
      var myChart = this.$echarts.init(chartDom);
      var option;

      option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisLabel: {
            show: false,
            formatter: "{value}",
            color: "#fff",
            fontSize: 38,
          },
        },
        yAxis: {
          type: "value",
          max: 15,
          axisLabel: {
            formatter: "{value}",
            color: "#fff",
            fontSize: 38,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "rgba(255, 255, 255, 0.4)",
            },
          },
        },
        series: [
          {
            data: [0, 0, 0, 0, 0, 1, 0],
            type: "line",
            lineStyle: {
              color: "#44D1C2",
              width: 8,
            },
            symbolSize: 20,
            itemStyle: {
              color: "#fff",
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
  mounted() {
    this.initBarChart();
    this.initLineChart();
  },
  components: {
    Title,
  },
};
</script>

<style lang='less' scoped>
.jointright {
  width: 1248px;
  height: 2066px;
  position: absolute;
  top: 264px;
  right: 0px;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
}
.right_progress {
  background-color: rgba(2, 15, 43, 0.7);
  padding: 0 50px;
  height: 400px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  > div {
    width: 500px;
    > div:last-of-type {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      > div:first-of-type {
        width: 360px;
      }
    }
  }
}
.chart_1 {
  height: 660px;
  background-color: rgba(2, 15, 43, 0.7);
}
.chart_2 {
  height: 560px;
  background-color: rgba(2, 15, 43, 0.7);
}
/deep/ .el-progress-bar__outer {
  background: rgba(108, 254, 255, 0.3);
  border-radius: 150px;
}
/deep/.el-progress-bar__inner {
  background: linear-gradient(90deg, #388cff, #6cfeff);
}
// .select {
//   position: absolute;
//   left: -50px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: space-between;
//   height: 500px;
//   > span {
//     width: 50px;
//   }
// }
</style>