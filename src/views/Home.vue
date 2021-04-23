<template>
  <div class="home">
    <div class="left">
      <div class="red-tag">
        <div class="reg-back-tag"></div>
        <img src="../assets/img/bg1.4df3dc82.png" />
        <div class="listen">听总书记话，永远跟党走</div>
      </div>

      <!-- <div class="title">
        <img src="../assets/img/titleicon.46e0e06e.png">
        <div>智慧党建</div>
      </div> -->
      <Title title="智慧党建"></Title>
      <div class="red-tag" style="height: 283px">
        <div class="reg-back-tag"></div>
        <div class="build">
          <div class="build-layout">
            <div class="item">
              <div style="color: rgba(80, 155, 246); margin-left: 10%">
                <span style="font-size: 84px">2,732</span>
                <span style="font-size: 60px">个</span>
              </div>
              <div style="margin-left: 10%; font-size: 40px">
                <span style="color: #fff">党组织</span>
                <i
                  class="el-icon-d-arrow-right"
                  style="color: rgba(80, 155, 246); margin-left: 10px"
                ></i>
              </div>
            </div>
            <div
              class="item"
              style="
                background-image: linear-gradient(
                  to left,
                  rgba(112, 255, 254, 0.1) 2%,
                  rgba(112, 255, 254, 0.8) 80%
                );
              "
            >
              <div style="color: rgba(112, 255, 254); margin-left: 10%">
                <span style="font-size: 84px">48187</span>
                <span style="font-size: 60px">个</span>
              </div>
              <div style="margin-left: 10%; font-size: 40px">
                <span style="color: #fff">党员</span>

                <i
                  class="el-icon-d-arrow-right"
                  style="color: rgba(112, 255, 254); margin-left: 10px"
                ></i>
              </div>
            </div>
            <div
              class="item"
              style="
                background-image: linear-gradient(
                  to left,
                  rgba(212, 179, 74, 0.1) 2%,
                  rgba(212, 179, 74, 0.8) 80%
                );
              "
            >
              <div style="color: rgba(212, 179, 74); margin-left: 10%">
                <span style="font-size: 84px">135</span>
                <span style="font-size: 60px">个</span>
              </div>
              <div style="margin-left: 10%; font-size: 40px">
                <span style="color: #fff">党群服务中心</span>

                <i
                  class="el-icon-d-arrow-right"
                  style="color: rgba(212, 179, 74); margin-left: 10px"
                ></i>
              </div>
            </div>
            <div
              class="item"
              style="
                background-image: linear-gradient(
                  to left,
                  rgba(221, 99, 105, 0.1) 2%,
                  rgba(221, 99, 105, 0.8) 80%
                );
              "
            >
              <div style="color: rgba(221, 99, 105); margin-left: 10%">
                <span style="font-size: 84px">16</span>
                <span style="font-size: 60px">个</span>
              </div>
              <div style="margin-left: 10%; font-size: 40px">
                <span style="color: #fff">创新中心</span>

                <i
                  class="el-icon-d-arrow-right"
                  style="color: rgba(221, 99, 105); margin-left: 10px"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Title title="令行禁止"></Title>
      <div class="red-tag" style="height: 544px">
        <div class="reg-back-tag"></div>
        <div class="build">
          <div style="display: flex; height: 100%">
            <!-- <div id="echartsBar" style="width: 50%;height: 120px"></div> -->

            <div style="width: 100%; display: flex">
              <div class="ling">
                <div
                  class="item"
                  v-for="(item, index) in lingList"
                  :key="index"
                >
                  <div>{{ item.name }}</div>
                  <div class="linner"></div>
                  <div>20个</div>
                </div>
              </div>
              <div
                id="echartsPie"
                style="width: 50%; height: 100%; opacity: 0.8"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <Title title="有呼必应"></Title>
      <div class="red-tag" style="height: 542px">
        <div class="reg-back-tag"></div>
        <div class="res-layout">
          <div class="item" v-for="(item, index) in 4" :key="index">
            <img
              class="back"
              src="../assets/img/gongjiangongzhi.9b2094d0.png"
            />

            <div class="title">民有所呼，党政必应</div>
            <div class="content">
              <div class="content-layout">
                <i
                  class="el-icon-s-data"
                  style="color: #fff; font-size: 100px; color: #4f9efd"
                />
                <div style="flex: 1; margin-left: 20px">
                  <div
                    style="
                      flex: 1;
                      display: flex;
                      justify-content: space-between;
                    "
                  >
                    <div style="display: flex; align-items: center">
                      <div style="color: #fff; font-size: 38px">网格化系统</div>
                      <i
                        class="el-icon-d-arrow-right"
                        style="
                          color: #4f9efd;
                          font-size: 48px;
                          margin-left: 10px;
                        "
                      ></i>
                    </div>
                    <div style="display: flex; align-items: center">
                      <div style="color: #4f9efd; font-size: 38px">1292929</div>
                      <div
                        style="color: #fff; font-size: 38px; margin-left: 10px"
                      >
                        件
                      </div>
                    </div>
                  </div>
                  <div
                    style="
                      flex: 1;
                      display: flex;
                      justify-content: space-between;
                    "
                  >
                    <div style="display: flex; align-items: center">
                      <div style="color: #fff; font-size: 38px">网格化系统</div>
                      <i
                        class="el-icon-d-arrow-right"
                        style="
                          color: #4f9efd;
                          font-size: 48px;
                          margin-left: 10px;
                        "
                      ></i>
                    </div>
                    <div style="display: flex; align-items: center">
                      <div style="color: #4f9efd; font-size: 38px">1292929</div>
                      <div
                        style="color: #fff; font-size: 38px; margin-left: 10px"
                      >
                        件
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="right">
      <div class="right-layout1">
        <div>
          <Title title="城市体征"></Title>
          <div class="city">
            <div class="right-back"></div>
            <div class="city-layout">
              <div class="sub-title">重点监测</div>
              <div class="list">
                <div class="item" v-for="(item, index) in sjList" :key="index">
                  <img :src="item.img" style="width: 127px; height: 127px" />
                  <div class="name">{{ item.name }}</div>
                  <div class="num">
                    <span :style="{ color: item.color }">25</span> 件
                  </div>
                </div>
              </div>
              <div class="sub-title">宏观经济</div>
              <el-carousel
                :interval="5000"
                arrow="always"
                indicator-position="none"
              >
                <el-carousel-item v-for="item in 4" :key="item">
                  <div class="economy">
                    <div class="item">
                      <div>
                        <img src="../assets/img/jiuye.88144c0b.png" />
                      </div>
                      <div class="content">
                        <div class="num">就业人数</div>
                        <div><span>594390</span> 人</div>
                      </div>
                    </div>
                    <div class="item">
                      <div>
                        <img src="../assets/img/nashui.a129957c.png" />
                      </div>
                      <div class="content">
                        <div class="num">纳税总额</div>
                        <div><span>511</span>亿元</div>
                      </div>
                    </div>
                  </div>
                </el-carousel-item>
              </el-carousel>
              <div class="sub-title">融合共享</div>
              <div class="share">
                <div
                  class="item"
                  v-for="(item, index) in shareData"
                  :key="index"
                >
                  <div class="name">
                    {{ item.name }}
                  </div>
                  <div class="unit">
                    <span>{{ item.num }}</span
                    >{{ item.unit }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Title title="黄埔之眼"></Title>
          <div class="video-layout">
            <div class="right-back"></div>
            <div class="video-banner">
              <el-carousel
                :interval="5000"
                arrow="always"
                indicator-position="none"
              >
                <el-carousel-item v-for="item in 4" :key="item" class="list">
                  <div
                    class="item"
                    v-for="(item, index) in bannerList"
                    :key="index"
                  >
                    <img :src="item.img" style="width: auto; height: 100%" />
                  </div>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Dialog -->
    <!-- <Dialog /> -->
    <!-- <VideoDialog /> -->
    <div class="fenxi">
      <i
        :class="isShowFenxi && 'active'"
        @click="isShowFenxi = !isShowFenxi"
        class="iconfont icon-fenxi"
      ></i>
      <transition name="fenxi">
        <Footer v-if="isShowFenxi" />
      </transition>
    </div>
  </div>
</template>

<script>
import Title from "../components/comJoint/Title";
import Dialog from "../components/Dialog";
import VideoDialog from "../components/VideoDialog";
import Footer from "../components/page/Footer";

export default {
  name: "Home",
  components: {
    Title,
    Dialog,
    VideoDialog,
    Footer,
  },
  data() {
    return {
      lingList: [
        { name: "专项工作" },
        { name: "上级交办" },
        { name: "领导批示" },
        { name: "会员督办" },
        { name: "调研督办" },
      ],
      bannerList: [
        { img: require("../assets/img/44011200041320100007.c5579eeb.png") },
        { img: require("../assets/img/44011250001320501048.c724d299.png") },
        { img: require("../assets/img/44011261001320611200.d5c057f3.png") },
      ],
      shareData: [
        { name: "共享部门", num: "22", unit: "个" },
        { name: "共享数据", num: "60", unit: "种" },
        { name: "共享数据", num: "326", unit: "个" },
      ],
      isautoPlay: false,
      name: "",
      setState: false,
      chart: null,
      //bg: '../../assets/img/gongjiangongzhi.png'
      sjList: [
        {
          color: "#6cfeff",
          img: require("../assets/img/zeroMedia.0db1ec7b.png"),
          name: "重大舆情",
        },
        {
          color: "#ff0000",
          img: require("../assets/img/yingji.b3fab0c5.png"),
          name: "应急事件",
        },
        {
          color: "#00aff7",
          img: require("../assets/img/yujin.fb36d330.png"),
          name: "监管预警",
        },
      ],
      isShowFenxi: false,
    };
  },
  created() {
    // this.getdata()
  },
  mounted() {
    this.$nextTick(function () {
      console.log(this.$echarts);
      // this.echartsBarInit()
      this.echartsPieInit();
      //this.linenerInit()
      //this.zInit()
    });
  },
  methods: {
    zInit() {
      var chartDom = document.getElementById("bar");
      var myChart = this.$echarts.init(chartDom);
      var option;

      var dataAxis = ["共享部分", "共享接口", "共享数据", "共享服务"];
      var data = [220, 182, 191, 234];
      var yMax = 500;
      var dataShadow = [];

      for (var i = 0; i < data.length; i++) {
        dataShadow.push(yMax);
      }

      option = {
        xAxis: {
          data: dataAxis,
          axisLabel: {
            inside: true,
            textStyle: {
              color: "#fff",
            },
            fontSize: "50",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          z: 10,
          margin: 0,
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#999",
              fontSize: "40",
            },
          },
        },
        dataZoom: [
          {
            type: "inside",
          },
        ],
        series: [
          {
            type: "bar",
            showBackground: true,
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" },
              ]),
            },
            emphasis: {
              itemStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2378f7" },
                  { offset: 0.7, color: "#2378f7" },
                  { offset: 1, color: "#83bff6" },
                ]),
              },
            },
            data: data,
          },
        ],
      };

      option && myChart.setOption(option);
    },
    linenerInit() {
      var chartDom = document.getElementById("linner");
      var myChart = this.$echarts.init(chartDom);
      var option;

      option = {
        color: ["#80FFA5", "#00DDFF", "#37A2FF", "#linner", "#FFBF00"],

        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        // legend: {
        //   data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
        // },

        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["重大事件", "应急事件", "疫情事件", "重大舆情", "政府信息"],
            axisLabel: {
              inside: true,
              textStyle: {
                color: "#fff",
              },
              fontSize: "30",
            },
          },
        ],

        yAxis: [
          {
            type: "value",
            axisLabel: {
              inside: true,
              textStyle: {
                color: "#fff",
              },
              fontSize: "30",
            },
          },
        ],
        series: [
          {
            name: "重大事件",
            type: "line",
            stack: "总量",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(128, 255, 165)",
                },
                {
                  offset: 1,
                  color: "rgba(1, 191, 236)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [140, 232, 101, 264, 90, 340, 250],
          },
          {
            name: "疫情事件",
            type: "line",
            stack: "总量",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(0, 221, 255)",
                },
                {
                  offset: 1,
                  color: "rgba(77, 119, 255)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [120, 282, 111, 234, 220, 340, 310],
          },
          {
            name: "重大舆情",
            type: "line",
            stack: "总量",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(55, 162, 255)",
                },
                {
                  offset: 1,
                  color: "rgba(116, 21, 219)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [320, 132, 201, 334, 190, 130, 220],
          },
          {
            name: "政府信息",
            type: "line",
            stack: "总量",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(0, 221, 255)",
                },
                {
                  offset: 1,
                  color: "rgba(77, 119, 255)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [220, 402, 231, 134, 190, 230, 120],
          },
          {
            name: "应急事件",
            type: "line",
            stack: "总量",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            label: {
              show: true,
              position: "top",
            },
            areaStyle: {
              opacity: 0.8,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(128, 255, 165)",
                },
                {
                  offset: 1,
                  color: "rgba(1, 191, 236)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [220, 302, 181, 234, 210, 290, 150],
          },
        ],
      };

      option && myChart.setOption(option);
    },
    echartsPieInit() {
      var chartDom = document.getElementById("echartsPie");
      var myChart = this.$echarts.init(chartDom);
      let Planningzoning = [
        {
          value: 10.25,
          name: "专项工作",
          itemStyle: {
            color: "#0095FF",
            shadowColor: "#0095FF",
            shadowBlur: 17,
          },
        },
        {
          value: 10.1,
          name: "主要领导活动",
          itemStyle: {
            color: "#00D5FF",
            shadowColor: "#00D5FF",
            shadowBlur: 17,
          },
        },
        {
          value: 13.9,
          name: "十件民生实事",
          itemStyle: {
            color: "#00D39E",
            shadowColor: "#00D39E",
            shadowBlur: 17,
          },
        },
        {
          value: 21.23,
          name: "征地拆迁",
          itemStyle: {
            color: "#AEF66E",
            shadowColor: "#AEF66E",
            shadowBlur: 17,
          },
        },
      ];
      let Planningzoninginner = [
        {
          value: 10.25,
          name: "生态保护区",
          itemStyle: {
            color: "#0095FF",
            opacity: "0.3",
            shadowBlur: 17,
            shadowColor: "#0095FF",
          },
        },
        {
          value: 10.1,
          name: "城镇发展区",
          itemStyle: {
            color: "#00D5FF",
            opacity: "0.3",
            shadowBlur: 17,
            shadowColor: "#00D5FF",
          },
        },
        {
          value: 13.9,
          name: "生态控制区",
          itemStyle: {
            color: "#00D39E",
            opacity: "0.3",
            shadowBlur: 17,
            shadowColor: "#00D39E",
          },
        },
      ];
      var option = {
        backgroundColor: "transparent",
        graphic: {
          elements: [
            {
              type: "image",
              z: 3,
              style: {
                image: require("../assets/img/pie_line.png"),
                width: 65,
                height: 65,
                stroke: "red",
                lineWidth: 10,
              },
              left: "51",
              top: "center",
            },
          ],
        },
        legend: {
          show: true,
          type: "scroll",
          orient: "vertical",
          top: 60,
          right: -20,
          itemWidth: 20,
          itemHeight: 20,
          icon: "rect",
          itemGap: 50,
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(255, 255, 255, 1)",
          },
          formatter: (name) => {
            let datale = Planningzoning;
            let total = 0;
            let target;
            for (let i = 0, l = datale.length; i < l; i++) {
              total += datale[i].value;
              if (datale[i].name == name) {
                target = datale[i].value;
              }
            }
            let arr = ["{a|" + name + "} "];
            return arr;
          },
          textStyle: {
            color: () => {},
            rich: {
              b: {
                fontSize: 30,
                align: "center",
                fontFamily: "Digital",
                padding: [0, 0, 0, 0],
                color: () => {},
              },
              a: {
                fontSize: 38,
                padding: [5, 0, 10, 0],
                width: 350,
                margin: 20,
                color: () => {},
              },
            },
          },
        },
        title: {
          text: "令行禁止",
          left: "15%",
          top: "45%",
          textStyle: {
            color: "#fff",
            fontSize: 40,
            align: "center",
            background: "",
          },
        },
        series: [
          {
            type: "pie",
            name: "出行占比",
            radius: ["50%", "60%"],
            center: ["25%", "50%"],
            hoverAnimation: true,
            z: 10,
            label: {
              show: false,
              position: "center",
            },
            data: Planningzoning,
            labelLine: {
              show: true,
            },
          },
          {
            type: "pie",
            radius: ["40%", "50%"],
            center: ["25%", "50%"],
            hoverAnimation: false,
            label: {
              show: false,
            },
            data: Planningzoninginner,
            labelLine: {
              show: false,
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
    echartsBarInit() {
      this.chart = this.$echarts.init(document.getElementById("echartsBar")); // 初始化echarts实例

      this.chart.setOption(
        // 通过setOption来生成柱状图
        {
          grid: {
            // 直角坐标系内绘图网格
            left: "10", //grid 组件离容器左侧的距离,
            //left的值可以是80这样具体像素值，
            //也可以是'80%'这样相对于容器高度的百分比
            top: "10",
            right: "0",
            bottom: "0",
            containLabel: true, //gid区域是否包含坐标轴的刻度标签。为true的时候，
            // left/right/top/bottom/width/height决定的是包括了坐标轴标签在内的
            //所有内容所形成的矩形的位置.常用于【防止标签溢出】的场景
          },
          xAxis: {
            //直角坐标系grid中的x轴,
            //一般情况下单个grid组件最多只能放上下两个x轴,
            //多于两个x轴需要通过配置offset属性防止同个位置多个x轴的重叠。
            type: "value", //坐标轴类型,分别有：
            //'value'-数值轴；'category'-类目轴;
            //'time'-时间轴;'log'-对数轴
            splitLine: { show: false }, //坐标轴在 grid 区域中的分隔线
            axisLabel: { show: false }, //坐标轴刻度标签
            axisTick: { show: false }, //坐标轴刻度
            axisLine: { show: false }, //坐标轴轴线
          },
          yAxis: {
            type: "category",
            axisTick: { show: false },
            axisLine: { show: false },
            axisLabel: {
              color: "white",
              fontSize: 12,
            },
            data: ["领导批示", "领导批示", "领导批示", "领导批示", "领导批示"], //类目数据，在类目轴（type: 'category'）中有效。
            //如果没有设置 type，但是设置了axis.data,则认为type 是 'category'。
          },
          series: [
            //系列列表。每个系列通过 type 决定自己的图表类型
            {
              name: "%", //系列名称
              type: "bar", //柱状、条形图
              barWidth: 15, //柱条的宽度,默认自适应
              data: [20, 40, 60, 80, 70], //系列中数据内容数组
              label: {
                //图形上的文本标签
                show: true,
                position: "right", //标签的位置
                offset: [0, 0], //标签文字的偏移，此处表示向上偏移40
                formatter: "{c}{a}", //标签内容格式器 {a}-系列名,{b}-数据名,{c}-数据值
                color: "black", //标签字体颜色
                fontSize: 12, //标签字号
              },
              itemStyle: {
                //图形样式
                normal: {
                  //normal 图形在默认状态下的样式;
                  //emphasis图形在高亮状态下的样式
                  barBorderRadius: 10, //柱条圆角半径,单位px.
                  //此处统一设置4个角的圆角大小;
                  //也可以分开设置[10,10,10,10]顺时针左上、右上、右下、左下
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: "#22B6ED",
                    },
                    {
                      offset: 1,
                      color: "#3FE279",
                    },
                  ]),
                },
              },
              zlevel: 1, //柱状图所有图形的 zlevel 值,
              //zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面
            },
            {
              name: "进度条背景",
              type: "bar",
              barGap: "-100%", //不同系列的柱间距离，为百分比。
              // 在同一坐标系上，此属性会被多个 'bar' 系列共享。
              // 此属性应设置于此坐标系中最后一个 'bar' 系列上才会生效，
              //并且是对此坐标系中所有 'bar' 系列生效。
              barWidth: 15,
              data: [100, 100, 100, 100, 100],
              color: "#151B87", //柱条颜色
              itemStyle: {
                normal: {
                  barBorderRadius: 10,
                },
              },
            },
          ],
        }
      );
    },
  },
};
</script>

<style lang="less" scoped>
.fenxi-enter-active,
.fenxi-leave-active {
  transition: all 0.3s linear;
}
.fenxi-enter,
.fenxi-leave-to {
  opacity: 0;
}
.fenxi-leave,
.fenxi-enter-to {
  opacity: 1;
}
.fenxi {
  position: absolute;
  right: 1710px;
  bottom: 70px;
  font-size: 44px;
  // width: 400px;
  // height: 109px;
  color: #fff;
  z-index: 9;
  cursor: pointer;
  background-color: rgba(2, 15, 43, 0.7);
  padding: 20px 40px;
  border-radius: 20px;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  .iconfont {
    font-size: 70px;
  }
  > .active {
    color: #4f9efd;
  }
}

.el-carousel {
  width: 90%;
  margin: 0 auto;
  margin-top: 30px;
  .economy {
    width: 100%;
    height: 97%;
    display: flex;
    margin: 0 auto;
    .item {
      width: 50%;
      //margin: 0 auto;
      height: 100%;
      padding-left: 70px;
      display: flex;
      justify-content: space-between;
      justify-items: center;
      align-items: center;
      img {
        width: 150px;
        height: 150px;
      }
      .content {
        text-align: right;
        width: auto;
        height: 180px;
        font-size: 50px;
        margin-right: 70px;
        .num {
          padding-bottom: 20px;
        }
        span {
          color: #3cbdc3;
          font-size: 70px;
          font-weight: 900;
        }
      }
    }
  }
}

.right {
  position: absolute;
  width: 1700px;
  height: 2066px;
  right: 0;
  top: 264px;
  .right-layout1 {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .video-layout {
    height: 400px;
    padding-top: 60px;
    position: relative;
    .video-banner {
      position: absolute;
      top: 30px;
      left: 0;
      width: 100%;
      height: 100%;
      .list {
        width: 90%;
        margin-left: 5% !important;
        display: flex;
        // margin: 10px;
        justify-content: space-between;
        .item {
          width: 30%;
          height: 450px;
          background: #fff;
          overflow: hidden;
        }
      }
    }
  }
  .right-back {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background: rgba(2, 15, 43, 0.7);
  }
  .city {
    padding-top: 60px;
    height: 1200px;
    position: relative;
    .city-layout {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      color: #fff;
      .sub-title {
        width: 90%;
        margin-left: 70px;
        margin-top: 60px;
        color: #fff;
        font-size: 50px;
        padding: 10px 0;
      }
      .share {
        width: 90%;
        margin-left: 70px;
        font-size: 48px;
        display: flex;
        margin-top: 40px;
        opacity: 0.7;
        .item {
          width: 30%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .unit {
            span {
              color: #416cb4;
              font-size: 60px;

              font-weight: 900;
              margin-right: 20px;
            }
          }
        }
        .item:not(:first-child) {
          margin-left: 5%;
        }
      }
      .list {
        padding-top: 63px;
        width: 90%;
        margin-left: 70px;
        display: flex;
        justify-content: space-between;

        .item {
          width: 513px;
          height: 136px;
          border: 1px solid #bbb;
          border-radius: 10px;
          position: relative;
          color: #fff;
          font-size: 38px;
          img {
            position: absolute;
            top: -63.5px;
            left: 40px;
          }
          .name {
            position: absolute;
            bottom: 20px;
            left: 40px;
          }
          .num {
            position: absolute;
            bottom: 20px;
            right: 20px;
            span {
              font-size: 48px;
            }
          }
        }
        .item:not(:first-child) {
          margin-left: 20px;
        }
      }
    }
  }
}
.left {
  width: 1770px;
  height: 2066px;
  top: 300px;
  position: absolute;
  left: 0px;
  .red-tag {
    position: relative;
    height: 341px;
    font-size: 14px;
    .ling {
      height: 400px;
      width: 50%;
      padding-top: 67px;
      .item {
        display: flex;
        width: 90%;
        height: 20%;
        margin: 0 auto;

        align-items: center;
        justify-content: center;
        font-size: 40px;
        color: #fff;
        .linner {
          margin-left: 40px;
          margin-right: 40px;
          flex: 1;
          height: 20px;
          border-radius: 20px;
          background: linear-gradient(
            to left,
            rgba(80, 155, 246, 0.1) 1%,
            rgba(80, 155, 246, 0.1) 30%,
            rgba(80, 155, 246, 0.8) 40%
          );
        }
      }
    }
    .res-layout {
      display: flex;
      height: 100%;
      flex-wrap: wrap;

      .item {
        width: 48%;
        height: 46%;
        margin: 0.7%;
        opacity: 0.8;
        position: relative;
        .title {
          color: #4f9efd;
          font-size: 50px;
          top: 30px;
          left: 30px;
          position: absolute;
        }
        .content {
          position: absolute;
          top: 110px;
          left: 30px;
          height: 100px;
          width: 80%;
          .content-layout {
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 100%;
            height: 100%;
            // justify-content: space-between;
            //line-height: 100px;
            img {
              width: 50px;
              height: 50px;
            }
          }
        }
        .back {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }
    }
    .build {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    .build-layout {
      padding: 0 10px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .item {
        //width: 88px;
        width: 23%;
        height: 78%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 1%;
        background-image: linear-gradient(
          to left,
          rgba(80, 155, 246, 0.1) 2%,
          rgba(80, 155, 246, 0.8) 80%
        );
      }
    }
    .listen {
      color: #fff;
      width: auto;
      background-image: linear-gradient(
        to left,
        rgba(146, 29, 32, 0),
        rgba(146, 29, 32, 1)
      );

      text-align: center;
      position: absolute;
      left: 500px;
      top: 100px;
      font-size: 60px;
    }
    .reg-back-tag {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      background: rgba(2, 15, 43, 0.7);
    }
    img {
      top: -33px;
      left: -33px;
      position: absolute;
      width: 66%;
    }
  }
}
</style>
