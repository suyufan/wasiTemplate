<template>
  <div class="app-container">
    <el-row>
      <el-select
        v-model="value"
        placeholder="请选择工作面"
        size="medium"
        @change="handleChange(value)"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-row>
    <p></p>
    <div class="chart-wrapper">
      <!-- 准备具有宽高的容器 -->
      <div style="width: 80%; height: 500px" ref="chart"></div>
    </div>
  </div>
</template>

<script>
// 按需引入 引入 ECharts 主模块
var echarts = require("echarts");
require("echarts/lib/chart/line");

import { getList } from "@/api/workspace";
import { fetchList } from "@/api/gas";

export default {
  name: "WaSi",
  data() {
    return {
      options: [],
      value: "",
      chart: null,
      workspace: {
        workspace: "",
      },
      data: [],
    };
  },
  mounted() {
    this.initCharts();
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getList().then((response) => {
        response.data.forEach((item) => {
          this.options.push({ value: item.id, label: item.name });
        });
      });
    },

    handleChange(value) {
      this.workspace.workspace = value;
      fetchList(JSON.stringify(this.workspace)).then((response) => {
        response.data;
      });
    },

    randomData() {
      let now = new Date(2022,1,1);
      let oneDay = 24 * 3600 * 10000;
      let value = Math.random() * 1000;

      now = new Date(+now + oneDay);
      value = value + Math.random() * 21 - 10;
      // console.log("now.toString()",now.toString());
      // console.log("value", [
      //     [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"),
      //     Math.round(value),
      //   ]);

      return Math.round(value);
      // return {
      //   name: now.toString(),
      //   value: [
      //     [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"),
      //     Math.round(value),
      //   ],
      // };
    },

    initCharts() {
      this.chart = echarts.init(this.$refs.chart);
      //-----基础版-------
      //this.setOptions();
      // 时间动态变化版
      for (var i = 0; i < 1000; i++) {
        this.data.push(this.randomData());
      }
      setInterval(() => {
        for (var i = 0; i < 5; i++) {
          this.data.shift();
          this.data.push(this.randomData());
        }
        this.setOption(this.data);
      }, 1000);
    },

    setOptions() {
      this.chart.setOption({
        title: {
          text: "瓦斯浓度图",
          left: 'center',
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
          },
        ],
      });
    },

    setOption(data) {
      console.log("data",data);
      // let value = data[0].value[1];
      let option = {
        title: {
          text: "瓦斯浓度图",
          left: 'center',
        },
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            params = params[0];
            var date = new Date(params.name);
            return (
              date.getDate() +
              "/" +
              (date.getMonth() + 1) +
              "/" +
              date.getFullYear() +
              ":" +
              params.value[1]
            );
          },
          axisPointer: {
            animation: false,
          },
        },

        xAxis: {
          type: "category",
          splitLine: {
            show: false,
          },
          //data: data,
          data: ["3.9-1", "3.9-2", "3.9-3", "3.10-4", "3.10-5", "3.10-6", "3.11-7", "3.11-8", "3.11-9", "3.12-10", "3.12-11", "3.12-12"],

        },

        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
          splitLine: {
            show: false,
          },
        },

        series: [
          {
            name: "Fake Data",
            type: "line",
            showSymbol: false,
            //data: data,
            data: [6, 7.1, 8.36, 16.6, 18.8, 9.7, 11.4, 13.9, 20.37, 9.7, 11.4, 13.9]
          },
        ],
      };
      console.log("~~~~~~~~~~~~~~", option);
      this.chart.setOption(option);
    },
  },
};
</script>

<style lang="scss">
/* reset element-ui css */
.wasi-container {
  .el-select {
    display: inline-block;
    width: 85%;
  }
}
</style>
