<template>
  <div class="app-container">
    <div style="width: 90%; height: 500px" ref="chart"></div>
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
      xsp: [], // 截断之后的x轴数据
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      await getList().then((response) => {
        response.forEach((item) => {
          this.x.push(item.time)
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
            text: "演化趋势图",
            show: true,
            left: "center",
          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["系统瓦斯爆炸风险水平","干预之后的风险水平"],
            bottom: 1,
          },
          xAxis: {
            type: "category",
            data: this.xsp,
            axisLabel: { interval: 0 },
          }, //X轴
          yAxis: {
            axisLine: { show: true },
            axisTick: { show: true },
            type: "value",
          }, //Y轴
          series: [
            {
              name: "系统瓦斯爆炸风险水平",
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
             {
              name: "干预之后的风险水平",
              data: ["6","6.6","7","6.3","6.5","7.2","7.4","8","9","10.3","12"],
              type: "line",
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
