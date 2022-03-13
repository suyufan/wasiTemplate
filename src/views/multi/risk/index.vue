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
          text: '耦合风险图',
          show: true,
          left: 'center'
        },
        xAxis: {
          type: "category",
          data: ["3.9-1", "3.9-2", "3.9-3", "3.10-4", "3.10-5", "3.10-6", "3.11-7", "3.11-8", "3.11-9", "3.12-10", "3.12-11", "3.12-12"],
        }, //X轴
        yAxis: { type: "value" }, //Y轴
        series: [{ data: [7, 10, 14, 9, 11, 17, 13, 20, 23, 18, 15,7], type: "line" }], //配置项
      };
      // 4.传入数据
      this.chart.setOption(option);
    },
  },
}
</script>
