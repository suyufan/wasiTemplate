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
    <!-- 此处的折线图没有引入成功 -->
    <p>展示 浓度曲线图</p>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>
  </div>
</template>

<script>
import LineChart from './LineChart.vue'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'WaSi',
  components: LineChart,
  data() {
    return {
      options: [{
        value: '工作面1',
        label: '工作面1'
      }, {
        value: '工作面2',
        label: '工作面2'
      }, {
        value: '工作面3',
        label: '工作面3'
      }, {
        value: '工作面4',
        label: '工作面4'
      }],
      value: '',
      // 曲线图
      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
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
