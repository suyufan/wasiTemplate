<template>
  <div class="app-container">
    <div style="width: 80%; height: 500px" ref="chart"></div>
  </div>
</template>

<script>
// 按需引入 引入 ECharts 主模块
var echarts = require("echarts");
// 引入折线图
require("echarts/lib/chart/line");
export default {
 mounted() {
    this.init();
    // this.initCharts();
  },
  methods: {
    init() {
      //2.初始化
      this.chart = echarts.init(this.$refs.chart);
      //3.配置数据
      let option = {
        title: {
          text: '演化趋势图',
          show: true,
          left: 'center'
        },
        xAxis: {
          type: "category",
          data: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        }, //X轴
        yAxis: { type: "value" }, //Y轴
        series: [{ data: [6, 7.1, 8.36, 9.7, 11.4, 13.9, 16.6, 18.8, 20.37, 22.79, 25], type: "line" }], //配置项
      };
      // 4.传入数据
      this.chart.setOption(option);
    },
  },
}
</script>
