<template>
  <div class="app-container">
    <el-table :data="list" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="时间" prop="time" align="center">
      </el-table-column>
      <el-table-column label="工作面" prop="workspace" align="center">
      </el-table-column>
      <el-table-column label="风险因素" prop="label" align="center">
      </el-table-column>
      <el-table-column label="风险值" prop="risk_value" align="center">
      </el-table-column>
      <el-table-column label="风险等级" prop="risk_level" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.risk_level | statusFilter" effect="dark">{{
            scope.row.risk_level
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="应对措施" prop="do" align="center">
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
          time: "2022/3/9",
          workspace: "采煤工作面1501",
          label: "违章爆破；通风设备不合格；供风量不足",
          risk_value: "23",
          risk_level: "重大风险",
          do: "",
        },
        {
          time: "2022/3/10",
          workspace: "采煤工作面1502",
          label: "设备操作不当；随意关停通风机；超深越界开采；政府监管不到位",
          risk_value: "25",
          risk_level: "重大风险",
          do: "",
        },
        {
          time: "2022/3/11",
          workspace: "采煤工作面1501",
          label: "瓦斯抽采不达标；防护装置损坏；瓦斯漏检",
          risk_value: "17",
          risk_level: "较大风险",
          do: "",
        }
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
