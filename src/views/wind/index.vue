<template>
  <div class="app-container">
    <el-row>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="工作面">
          <el-select
            v-model="formInline.value"
            placeholder="请选择工作面"
            size="medium"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="传感器">
          <el-select v-model="formInline.sensor" placeholder="请选择传感器">
            <el-option label="回风巷" value="1"></el-option>
            <el-option label="上隅角" value="2"></el-option>
            <el-option label="风流" value="3"></el-option>
            <el-option label="机电设备附近" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(formInline)"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-row>
    <p></p>
    <div class="chart-wrapper">
      <!-- 准备具有宽高的容器 -->
      <div style="width: 80%; height: 500px" ref="chart1"></div>
    </div>
  </div>
</template>

<script>
// 按需引入 引入 ECharts 主模块
var echarts = require("echarts");
// 引入折线图
require("echarts/lib/chart/line");
import { getList } from "@/api/workspace";
import { newList, fetchList } from "@/api/wind";

export default {
  data() {
    return {
      options: [],
      optionSensor: [
        {
          value: 1,
          label: "回风巷",
        },
        {
          value: 2,
          label: "上隅角",
        },
        {
          value: 3,
          label: "风流",
        },
        {
          value: 4,
          label: "机电设备附近",
        },
      ],
      formInline: {
        value: "",
        sensor: "",
      },
      chart: null,
      x1: [],
      y1: [],

      x2: [],
      y2: [],

      x3: [],
      y3: [],

      x4: [],
      y4: [],
    };
  },

  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getList().then((response) => {
        response.forEach((item) => {
          this.options.push({ value: item.name, label: item.name });
        });
      });
    },

    onSubmit(value) {
      newList({ workspace: value.value, sensor_id: value.sensor }).then(
        (response) => {
          console.log("实时通风监测", response);
        }
      );
      this.formInline.value = value.value;
      this.formInline.sensor = value.sensor;
      this.init();
    },

    async init() {
      await fetchList(
       { since: "1969-03-12 07:04:04", until: "2069-03-14 07:08:04" },
        { workspace: this.formInline.value, sensor_id: this.formInline.sensor }
      ).then((response) => {
        console.log("通风",response);
        // -------response为[]时报错 但页面没有影响--------
        if (response[0].sensor_id == 1) {
          response.forEach((item) => {
            this.x1.push(item.time);
            this.y1.push(item.volume/100);
          });
          //--------数据量太大，横坐标展示不全的处理------
          // this.x1.forEach((i) => {
          //   this.xsp1.push(i.substring(5, 10));
          // });
        } else if (response[0].sensor_id == 2) {
          response.forEach((item) => {
            this.x2.push(item.time);
            this.y2.push(item.volume/100);
          });
        } else if (response[0].sensor_id == 3) {
          response.forEach((item) => {
            this.x3.push(item.time);
            this.y3.push(item.volume/100);
          });
        } else if (response[0].sensor_id == 4) {
          response.forEach((item) => {
            this.x4.push(item.time);
            this.y4.push(item.volume/100);
          });
        }
      });
      //2.初始化
      this.chart = echarts.init(this.$refs.chart1);
      //3.配置数据
      let option = {
        title: {
          text: "风速图",
          show: true,
          left: "center",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["1501-1", "1501-2", "1501-3", "1501-4"],
          bottom: 1,
        },
        xAxis: {
          type: "category",
          data: ["", "", "", "", "时间序列", "", "", "", "", ""],
        },
        yAxis: {
          axisLine: { show: true },
          axisTick: { show: true },
          type: "value",
          name: "m/s",
        },
        series: [
          {
            name: "1501-1",
            type: "line",
            data: this.y1
          },
          {
            name: "1501-2",
            type: "line",
            data: this.y2

          },
          {
            name: "1501-3",
            type: "line",
            data: this.y3
          },
          {
            name: "1501-4",
            type: "line",
            data: this.y4
          },
        ],
      };
      // 4.传入数据
      this.chart.setOption(option);
    },
  },
};
</script>
