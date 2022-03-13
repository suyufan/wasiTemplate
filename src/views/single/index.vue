<template>
  <div class="app-container">
    <el-table :data="list" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="时间" prop="time" align="center">
      </el-table-column>
      <el-table-column label="工作面/位置" prop="workspace" align="center">
      </el-table-column>
      <el-table-column label="异常指标" prop="label" align="center">
      </el-table-column>
      <el-table-column label="异常值" prop="risk_value" align="center">
      </el-table-column>
      <el-table-column label="预警级别" prop="risk_level" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.risk_level | statusFilter" effect="dark">{{
            scope.row.risk_level
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是/否采取应对措施" prop="do" align="center">
        <template slot-scope="scope">
          <el-select placeholder="请选择" v-model="scope.row.do" >
            <el-option value="true" label="是"></el-option>
            <el-option value="false" label="否"></el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  filters: {
    statusFilter(risk_level) {
      const statusMap = {
        低风险: "",
        一般风险: "info",
        较大风险: "warning",
        重大风险: "danger",
      };
      return statusMap[risk_level];
    },
  },
  data() {
    return {
      listLoading: true,
      list: [
        {
          time: "2022/3/10/10：41",
          workspace: "采煤工作面1501—2",
          label: "瓦斯浓度",
          risk_value: "1.23%",
          risk_level: "重大风险",
          do: "否",
        },
        {
          time: "2022/3/10/13：02",
          workspace: "采煤工作面1501—3",
          label: "瓦斯浓度",
          risk_value: "1.07%",
          risk_level: "重大风险",
          do: "是",
        },
        {
          time: "2022/3/10/12：47",
          workspace: "采煤工作面1501—1",
          label: "风速",
          risk_value: "6.1m/s",
          risk_level: "重大风险",
          do: "是",
        },
        {
          time: "2022/3/10",
          workspace: "采煤工作面1501",
          label: "伪造瓦斯日报",
          risk_value: "20",
          risk_level: "重大风险",
          do: "是",
        },
        {
          time: "2022/3/10",
          workspace: "采煤工作面1501",
          label: "随意关停通风机",
          risk_value: "15",
          risk_level: "较大风险",
          do: "否",
        },
        {
          time: "2022/3/10",
          workspace: "采煤工作面1501",
          label: "带电检修",
          risk_value: "16",
          risk_level: "较大风险",
          do: "",
        },
      ],
      // form: {
      //   time: "",
      //   workspace: "",
      //   label: "",
      //   risk_value: "",
      //   risk_level: "",
      //   do: "",
      // },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      // this.listLoading = true;
      // getList().then((response) => {
      //   this.list = response.data.items;
      //   this.listLoading = false;
      // })
    },
  },
};
</script>
