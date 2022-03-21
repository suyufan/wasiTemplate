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
      <div style="width: 60%; height: 500px; float: left" ref="chart"></div>
      <div style="width: 30%; height: 500px; float: left">
        <el-form ref="form" :model="form" label-width="160px">
          <el-form-item label="采样间隔（秒）：">
            <el-input-number
              v-model="form.time"
              controls-position="right"
              @change="handleChangeNum"
              :min="1"
              :max="10"
            ></el-input-number>
          </el-form-item>
          <el-form-item prop="red">
            <span slot="label">
              <el-tag type="danger" effect="dark" style="font-size: 13px"
                >红色预警浓度值：</el-tag
              >
            </span>
            <el-input-number
              v-model="form.red"
              controls-position="right"
              @change="handleChangeNum"
              :min="0"
              :max="10"
              :step="0.05"
            ></el-input-number>
          </el-form-item>
          <el-form-item prop="orange">
            <span slot="label">
              <el-tag type="warning" effect="dark" style="font-size: 13px"
                >橙色预警浓度值：</el-tag
              >
            </span>
            <el-input-number
              v-model="form.orange"
              controls-position="right"
              @change="handleChangeNum"
              :min="0"
              :max="1.0"
              :step="0.05"
            ></el-input-number>
          </el-form-item>
          <el-form-item prop="yellow">
            <span slot="label">
              <el-tag type="warning" style="font-size: 13px"
                >黄色预警浓度值：</el-tag
              >
            </span>
            <el-input-number
              v-model="form.yellow"
              controls-position="right"
              @change="handleChangeNum"
              :min="0"
              :max="1.0"
              :step="0.05"
            ></el-input-number>
          </el-form-item>
          <el-form-item prop="blue">
            <span slot="label">
              <el-tag type="" style="font-size: 13px">蓝色预警浓度值：</el-tag>
            </span>
            <el-input-number
              v-model="form.bule"
              controls-position="right"
              @change="handleChangeNum"
              :min="0"
              :max="1.0"
              :step="0.05"
            ></el-input-number>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// 按需引入 引入 ECharts 主模块
var echarts = require("echarts");
require("echarts/lib/chart/line");

import { getList } from "@/api/workspace";
import { newList, fetchList } from "@/api/gas";

export default {
  name: "WaSi",
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
      num: 1,
      form: {
        time: 5,
        red: 1.0,
        orange: 0.85,
        yellow: 0.7,
        bule: 0.45,
      },
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

    handleChangeNum(value) {
      console.log("累加器变化了", value);
    },

    onSubmit(value) {
      newList({ workspace: value.value, sensor_id: value.sensor }).then(
        (response) => {
          console.log("实时瓦斯监测", response);
        }
      );
      this.formInline.value = value.value;
      this.formInline.sensor = value.sensor;
      this.initCharts();
    },

    async initCharts() {
      await fetchList(
        { since: "1969-03-12 07:04:04", until: "2069-03-14 07:08:04" },
        { workspace: this.formInline.value, sensor_id: this.formInline.sensor }
      ).then((response) => {
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
    
      // 初始化
      this.chart = echarts.init(this.$refs.chart);
      //配置数据
      let option = {
        title: {
          text: "瓦斯浓度图",
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
          //data: this.xall,
        },
        yAxis: {
          axisLine: { show: true },
          axisTick: { show: true },
          type: "value",
        },
        series: [
          {
            name: "1501-1",
            type: "line",
            //data: [0.68, 0.72, 0.66, 0.67, 0.89, 1.01, 0.82, 0.91, 0.74, 0.88],
            data: this.y1,
          },
          {
            name: "1501-2",
            type: "line",
            //data: [0.91, 1.17, 1.23, 0.93, 0.89, 0.77, 0.56, 0.69, 0.84, 0.92],
            data: this.y2
          },
          {
            name: "1501-3",
            type: "line",
            //data: [0.78, 0.65, 0.71, 0.75, 0.79, 0.84, 0.92, 1.12, 0.87, 0.66],
            data: this.y3
          },
          {
            name: "1501-4",
            type: "line",
            //data: [0.56, 0.61, 0.64, 0.63, 0.65, 0.68, 0.71, 0.66, 0.89, 0.61],
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

<style lang="scss">
/* reset element-ui css */
.wasi-container {
  .el-select {
    display: inline-block;
    width: 85%;
  }
}
</style>
