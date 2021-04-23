<template>
  <div class="jointtable">
    <Title title="项目列表" />
    <div class="table" @mouseenter="pauseScroll" @mouseleave="continueScroll">
      <el-table
        :data="tableList"
        height="100%"
        v-el-table-infinite-scroll="load"
        ref="table"
      >
        <el-table-column prop="name" label="项目名称"></el-table-column>
        <el-table-column prop="danwei" label="项目名称"></el-table-column>
        <el-table-column prop="dangwei" label="项目名称"></el-table-column>
        <el-table-column prop="pianqu" label="项目名称"></el-table-column>
        <el-table-column prop="status" label="项目名称"></el-table-column>
        <el-table-column prop="jine" label="项目名称"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Title from "./Title";
import elTableInfiniteScroll from "el-table-infinite-scroll";

export default {
  name: "JointTable",
  data() {
    return {
      tableList: [
        {
          name: "多益网络总部大楼",
          danwei: "广州多益网络股份有限公司",
          dangwei: "多益党委",
          pianqu: "科学城",
          status: "在建项目",
          jine: 75000,
        },
        {
          name: "多益网络总部大楼",
          danwei: "广州多益网络股份有限公司",
          dangwei: "多益党委",
          pianqu: "科学城",
          status: "在建项目",
          jine: 75000,
        },
        {
          name: "多益网络总部大楼",
          danwei: "广州多益网络股份有限公司",
          dangwei: "多益党委",
          pianqu: "科学城",
          status: "在建项目",
          jine: 75000,
        },
        {
          name: "多益网络总部大楼",
          danwei: "广州多益网络股份有限公司",
          dangwei: "多益党委",
          pianqu: "科学城",
          status: "在建项目",
          jine: 75000,
        },
        {
          name: "多益网络总部大楼",
          danwei: "广州多益网络股份有限公司",
          dangwei: "多益党委",
          pianqu: "科学城",
          status: "在建项目",
          jine: 75000,
        },
        {
          name: "多益网络总部大楼",
          danwei: "广州多益网络股份有限公司",
          dangwei: "多益党委",
          pianqu: "科学城",
          status: "在建项目",
          jine: 75000,
        },
      ],
    };
  },
  methods: {
    load() {
      const list = JSON.parse(JSON.stringify(this.tableList));
      list.forEach((item) => {
        this.tableList.push(item);
      });
    },
    startScroll() {
      this.scrollTable = setInterval(() => {
        this.scroll = this.scroll + 1;
        this.$refs.table &&
          this.$refs.table.bodyWrapper.scrollTo(0, this.scroll);
      }, 10);
    },
    pauseScroll() {
      clearInterval(this.scrollTable);
      this.$refs.table.bodyWrapper.onscroll = (e) => {
        this.scroll = e.target.scrollTop;
      };
    },
    continueScroll() {
      this.startScroll();
      this.$refs.table.bodyWrapper.onscroll = null;
    },
  },
  mounted() {
    this.scroll = 0;
    this.startScroll();
  },
  beforeDestroy() {
    clearInterval(this.scrollTable);
    this.$refs.table.bodyWrapper.onscroll = null;
  },
  components: {
    Title,
  },
  directives: {
    "el-table-infinite-scroll": elTableInfiniteScroll,
  },
};
</script>

<style lang='less' scoped>
.table {
  height: 430px;
  padding: 0 50px;
}

/deep/.el-table {
  font-size: 30px;
}
/deep/.el-table .cell {
  width: 280px;
  height: 106px;
  line-height: 106px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/deep/ .el-table,
/deep/.el-table__expanded-cell {
  background-color: transparent;
  color: #fff;
}
/deep/ .el-table th,
/deep/ .el-table tr {
  background-color: transparent !important;
}
/deep/ .el-table__row > td {
  /* 去除表格线 */
  border: none;
}
/deep/ .el-table th.is-leaf {
  /* 去除上边框 */
  border: none;
}
/deep/ .el-table::before {
  /* 去除下边框 */
  height: 0;
}
/deep/.el-table tbody tr > td {
  height: 30px !important;
}
/deep/.el-table tbody tr:hover > td {
  background-color: rgba(87, 87, 122, 0) !important;
}
/deep/.el-table tbody tr:nth-of-type(odd) > td {
  background-color: rgba(87, 87, 122, 0.5) !important;
}
/deep/.el-table--mini td,
/deep/.el-table--mini th {
  padding: 0;
}
/deep/.el-table .cell {
  padding-left: 10px;
  text-align: center;
}

/deep/.el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar {
  display: none;
}
/deep/.el-table tbody tr:hover > td {
  background-color: rgba(86, 172, 233, 0.5) !important;
}
</style>