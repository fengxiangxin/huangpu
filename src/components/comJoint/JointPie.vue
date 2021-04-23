<template>
  <div class="jointpie">
    <div>项目投资金额占比</div>
    <div ref="chart"></div>
  </div>
</template>

<script>
export default {
  name: "JointPie",
  data() {
    return {};
  },
  methods: {
    initChart() {
      this.chart = this.$echarts.init(this.$refs.chart);
      const option = {
        backgroundColor: "transparent",
        graphic: {
          elements: [
            {
              type: "text",
              z: 3,
              style: {
                // image: require("../../../assets/icons/pie_line.png"),
                // text:"q",
                width: 100,
                height: 100,
                stroke: "red",
                lineWidth: 10,
              },
              left: 45,
              top: "center",
            },
          ],
        },
        legend: {
          orient: "vertical",
          show: true,
          right: "200",
          y: "center",
          itemWidth: 38,
          itemHeight: 38,
          itemGap: 50,
          textStyle: {
            color: "#fff",
            fontSize: 38,
            lineHeight: 20,
            rich: {
              percent: {
                color: "#fff",
                fontSize: 38,
              },
            },
          },
          formatter: (name) => {
            switch (name) {
              case "200亿以上项目":
                return "200亿以上项目\r\r\r\r\r570个" + "\r\r{percent|38%}";
              case "15-50亿项目":
                return "15-50亿项目\r\r\r\r\r\r\r\r420个" + "\r\r{percent|28%}";
              case "5-15亿项目":
                return "5-15亿项目\r\r\r\r\r\r\r\r\r\r300个" + "\r\r20%";
              case "5亿以下项目":
                return (
                  "5亿以下项目\r\r\r\r\r\r\r\r\r350个" + "\r\r{percent|50%}"
                );
              case "50-100亿项目":
                return (
                  "50-100亿项目\r\r\r\r\r\r\r\r90个" + "\r\r\r\r{percent|6%}"
                );
              case "100-200亿项目":
                return (
                  "100-200亿项目\r\r\r\r\r\r90个" + "\r\r\r\r{percent|6%}"
                );
              default:
                break;
            }
          },
        },
        tooltip: {
          show: true,
          // formatter: params => {
          //   var showHtm = ""
          //   //x轴名称
          //   var name = params.seriesName
          //   //名称
          //   var text = params.name
          //   //值
          //   var value = params.percent
          //   // 图标
          //   var mark = params.marker
          //   showHtm = name + '<br />' + mark + text + '\r\r\r' + value + '%'
          //   return showHtm
          // }
        },
        series: [
          {
            type: "pie",
            name: "出行占比",
            radius: ["75%", "85%"],
            center: ["25%", "50%"],
            hoverAnimation: true,
            z: 10,
            label: {
              position: "center",
              formatter: (e) => {
                // return "{total|1500}W \r\n出行人数/天";
                return "";
              },
              rich: {
                total: {
                  fontSize: 28,
                  color: "#fff",
                  fontFamily: "Digital",
                },
              },
              color: "#fff",
              fontSize: 12,
              lineHeight: 30,
            },
            data: [
              {
                value: 570,
                name: "200亿以上项目",
                itemStyle: {
                  color: "#0095FF",
                },
              },
              {
                value: 420,
                name: "15-50亿项目",
                itemStyle: {
                  color: "#00D39E",
                },
              },
              {
                value: 300,
                name: "5-15亿项目",
                itemStyle: {
                  color: "#FEF57A",
                },
              },
              {
                value: 350,
                name: "5亿以下项目",
                itemStyle: {
                  color: "#767CFF",
                },
              },
              {
                value: 90,
                name: "50-100亿项目",
                itemStyle: {
                  color: "#FF815A",
                },
              },
              {
                value: 90,
                name: "100-200亿项目",
                itemStyle: {
                  color: "#FF815A",
                },
              },
            ],
            labelLine: {
              show: false,
            },
          },
          {
            type: "pie",
            radius: ["60%", "75%"],
            center: ["25%", "50%"],
            hoverAnimation: false,
            label: {
              show: false,
            },
            data: [
              {
                value: 570,
                name: "200亿以上项目",
                itemStyle: {
                  color: "#0095FF",
                  opacity: "0.5",
                },
              },
              {
                value: 420,
                name: "15-50亿项目",
                itemStyle: {
                  color: "#00D39E",
                  opacity: "0.5",
                },
              },
              {
                value: 300,
                name: "5-15亿项目",
                itemStyle: {
                  color: "#FEF57A",
                  opacity: "0.5",
                },
              },
              {
                value: 350,
                name: "5亿以下项目",
                itemStyle: {
                  color: "#767CFF",
                  opacity: "0.5",
                },
              },
              {
                value: 90,
                name: "50-100亿项目",
                itemStyle: {
                  color: "#FF815A",
                  opacity: "0.5",
                },
              },
              {
                value: 90,
                name: "100-200亿项目",
                itemStyle: {
                  color: "#FF815A",
                  opacity: "0.5",
                },
              },
            ],
            labelLine: {
              show: false,
            },
          },
        ],
      };
      this.chart.setOption(option);
      window.onresize = () => {
        this.chart.resize();
      };
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
};
</script>

<style lang='less' scoped>
.jointpie {
  padding: 0 50px;
  height: 691px;
  > div:first-child {
    width: 690px;
    font-size: 50px;
    line-height: 88px;
    box-sizing: border-box;
    padding-left: 28px;
    background: rgba(46, 116, 227, 0.1);
  }
  > div:last-child {
    height: 557px;
  }
}
</style>