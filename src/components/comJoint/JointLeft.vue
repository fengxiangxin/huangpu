<template>
  <div class="jointleft">
    <Title title="项目统计" />
    <div class="toplist">
      <div v-for="(item, index) in List" :key="index">
        <div>
          <span>{{ item.num }}</span>
          <span>{{ item.unit }}</span>
        </div>
        <div>{{ item.name }}</div>
      </div>
    </div>

    <div class="radio">
      <div>项目分类占比</div>
      <div>
        <div v-for="(item, index) in radioList" :key="index">
          <div>
            <div>
              <span>{{ item.name }}</span>
              <span>
                {{ parseInt((item.num / (8 + 72 + 91 + 120)) * 100) }}
                %
              </span>
            </div>
            <div>
              <span>{{ item.num }}</span>
              <span>&nbsp;个</span>
            </div>
          </div>
          <div style="margin-top: 20px">
            <el-progress
              :percentage="parseInt((item.num / (8 + 72 + 91 + 120)) * 100)"
              :show-text="false"
              :stroke-width="30"
            ></el-progress>
          </div>
        </div>
      </div>
    </div>

    <JointPie />
    <JointTable />
  </div>
</template>

<script>
import Title from "./Title";
import JointPie from "./JointPie";
import JointTable from "./JointTable";
export default {
  name: "JointLeft",
  data() {
    return {
      List: [
        {
          name: "筹建项目总数",
          num: 245,
          unit: "个",
        },
        {
          name: "计划投资总金额",
          num: 2168.38,
          unit: "亿",
        },
        {
          name: "已投资总金额",
          num: 329.4,
          unit: "亿",
        },
      ],
      radioList: [
        {
          name: "省重点",
          num: 8,
        },
        {
          name: "市重点",
          num: 72,
        },
        {
          name: "区重点",
          num: 91,
        },
        {
          name: "一般",
          num: 120,
        },
      ],
    };
  },
  components: {
    Title,
    JointPie,
    JointTable,
  },
};
</script>

<style lang='less' scoped>
.jointleft {
  position: absolute;
  width: 1777px;
  height: 2066px;
  background-color: rgba(2, 15, 43, 0.7);
  top: 264px;
  left: 80px;
}
.toplist {
  height: 291px;
  padding: 60px 50px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;

  > div {
    height: 200px;
    width: 524px;
    box-sizing: border-box;
    padding: 20px 0 0 30px;
    > div:first-of-type {
      font-size: 86px;

      > span:last-of-type {
        font-size: 38px;
        margin-left: 20px;
      }
    }
    > div:last-of-type {
      font-size: 38px;
      color: #fff;
    }
  }
  > div:nth-of-type(1) {
    color: #4f9efd;
    background: linear-gradient(
      90deg,
      rgba(79, 158, 253, 0.28),
      rgba(79, 158, 253, 0.04)
    );
  }
  > div:nth-of-type(2) {
    background: linear-gradient(
      90deg,
      rgba(79, 158, 253, 0.28),
      rgba(79, 158, 253, 0.04)
    );
  }
  > div:nth-of-type(3) {
    background: linear-gradient(
      90deg,
      rgba(79, 158, 253, 0.28),
      rgba(79, 158, 253, 0.04)
    );
  }
}
.radio {
  height: 438px;
  padding: 0 50px;
  > div:first-child {
    font-size: 50px;
    width: 690px;
    height: 94px;
    line-height: 88px;
    background: rgba(46, 116, 227, 0.1);
    box-sizing: border-box;
    padding-left: 28px;
  }
  > div:last-child {
    margin-top: 36px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    > div {
      width: 820px;
      height: 154px;
      box-sizing: border-box;
      padding-right: 30px;
      > div:first-child {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}

/deep/ .el-progress-bar__outer {
  background: rgba(108, 254, 255, 0.3);
  border-radius: 150px;
}
/deep/.el-progress-bar__inner {
  background: linear-gradient(90deg, #388cff, #6cfeff);
}
</style>