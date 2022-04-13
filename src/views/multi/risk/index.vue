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
import { getList } from "@/api/multi";
export default {
  data() {
    return {
      x: [],
      y: [],
      xsp: [],
    };
  },
  created() {},
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      await getList().then((response) => {
        response.forEach((item) => {
          this.x.push(item.time);
          this.y.push(item.value/100);
        });
        // this.x.forEach((i) => {
        //   this.xsp.push(i.substring(5, 10));
        // });
         this.xsp = ["0","1","2","3","4","5","6","7","8","9","10"]
        //2.初始化
        this.chart = echarts.init(this.$refs.chart);
        //3.配置数据
        let option = {
          title: {
            text: "耦合风险图",
            show: true,
            left: "center",
          },
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category",
            data: this.xsp,
          }, //X轴
          yAxis: {
            axisLine: { show: true },
            axisTick: { show: true },
            type: "value",
          }, //Y轴
          series: [
            {
              data: this.y,
              type: "line",
              markArea: {
                //标记区域
                data: [
                  [
                    {
                      yAxis: "0",
                      itemStyle: {
                        color: "#ADD8E6",
                      },
                    },
                    {
                      yAxis: "9",
                    },
                  ],
                  [
                    {
                      yAxis: "9",
                      itemStyle: {
                        color: "#FFFACD",
                      },
                    },
                    {
                      yAxis: "15",
                    },
                  ],
                  [
                    {
                      yAxis: "15",
                      itemStyle: {
                        color: "#F5DEB3",
                      },
                    },
                    {
                      yAxis: "20",
                    },
                  ],
                  [
                    {
                      yAxis: "20",
                      itemStyle: {
                        color: " #FFA07A",
                      },
                    },
                    {
                      yAxis: "100",
                    },
                  ],
                ],
              },
            },
          ], //配置项
        };
        // 4.传入数据
        this.chart.setOption(option);
      });
    },
  },
};
</script>
