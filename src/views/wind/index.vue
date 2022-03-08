<template>
  <div class="app-container">
    <el-row>
      <el-select v-model="value" placeholder="请选择工作面" size="medium">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-row>
    <p>展示 风速曲线图 和 风压曲线图</p>

    <div class="chart-wrapper">
      <!-- 准备具有宽高的容器 -->
      <div style="width: 100%; height: 500px" ref="chart"></div>
    </div>
  </div>
</template>

<script>
// 按需引入 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/bar");

export default {
  data() {
    return {
      options: [
        {
          value: "工作面1",
          label: "工作面1",
        },
        {
          value: "工作面2",
          label: "工作面2",
        },
        {
          value: "工作面3",
          label: "工作面3",
        },
        {
          value: "工作面4",
          label: "工作面4",
        },
      ],
      value: "",
      chart: null,
    };
  },
  mounted() {
    this.initCharts();
  },
  methods: {
    init() {
      //2.初始化
      this.chart = Echarts.init(this.$refs.chart);
      //3.配置数据
      let option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        }, //X轴
        yAxis: { type: "value" }, //Y轴
        series: [{ data: [120, 200, 150, 80, 70, 110, 130], type: "bar" }], //配置项
      };
      // 4.传入数据
      this.chart.setOption(option);
    },
    initCharts() {
      this.chart = echarts.init(this.$refs.chart);
      this.setOptions();
    },
    setOptions() {
      this.chart.setOption({
        title: {
          text: "Echarts 入门示例",
        },
        tooltip: {},
        xAxis: {
          data: ["1", "2", "3", "4", "5"],
        },
        yAxis: {},
        series: [
          {
            name: "比列",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
    },
  },
};
</script>
