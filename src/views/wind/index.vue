<template>
  <div class="app-container">
    <el-row>
      <el-select v-model="value" placeholder="请选择工作面" size="medium" @change="handleChange(value)">
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
      <div style="width: 50%; height: 500px; float: left;" ref="chart1"></div>
      <div style="width: 50%; height: 500px; float: left;" ref="chart2"></div>
    </div>
  </div>
</template>

<script>
// 按需引入 引入 ECharts 主模块
var echarts = require("echarts");
// 引入折线图
require("echarts/lib/chart/line");
import { getList } from "@/api/workspace";
import { fetchList } from "@/api/wind";

export default {
  data() {
    return {
      options: [],
      value: "",
      chart: null,
      workspace: {
        workspace: ""
      }
    };
  },
  mounted() {
    this.init();
    this.initCharts();
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getList().then((response) => {
        response.data.forEach(item => {
          this.options.push({value: item.id, label: item.name})
        });
      })
    },

     handleChange(value) {
      this.workspace.workspace = value
      fetchList(JSON.stringify(this.data)).then((response) => {
        response.data
      })
    },

    init() {
      //2.初始化
      this.chart = echarts.init(this.$refs.chart1);
      //3.配置数据
      let option = {
        title: {
          text: '风速图',
          show: true,
          left: 'center'
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        }, //X轴
        yAxis: { type: "value" }, //Y轴
        series: [{ data: [120, 100, 148, 80, 70, 110, 130], type: "line" }], //配置项
      };
      // 4.传入数据
      this.chart.setOption(option);
    },

    initCharts() {
       //2.初始化
      this.chart = echarts.init(this.$refs.chart2);
      //3.配置数据
      let option = {
        title: {
          text: '风压图',
          show: true,
          left: 'center'
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        }, //X轴
        yAxis: { type: "value" }, //Y轴
        series: [{ data: [120, 100, 148, 80, 70, 110, 130], type: "line" }], //配置项
      };
      // 4.传入数据
      this.chart.setOption(option);
    }
    
  },
};
</script>
