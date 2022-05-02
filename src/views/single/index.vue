<template>
  <div class="app-container">
    <el-table :data="list" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="时间" prop="time" align="center">
      </el-table-column>
      <el-table-column label="工作面/位置" prop="workspace" align="center">
      </el-table-column>
      <el-table-column label="异常指标" prop="risk" align="center">
      </el-table-column>
      <el-table-column label="异常值" prop="value" align="center">
      </el-table-column>
      <el-table-column label="预警级别" prop="degree" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.degree | statusFilter" effect="dark">{{
            scope.row.degree
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是/否采取应对措施" prop="value" align="center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from "@/api/single";
export default {
  filters: {
    statusFilter(degree) {
      const statusMap = {
        低风险: "",
        一般风险: "info",
        较大风险: "warning",
        重大风险: "danger",
      };
      return statusMap[degree];
    },
  },
  data() {
    return {
      listLoading: true,
      list: "",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getList().then((response) => {
        this.list = response;
        this.listLoading = false;
      });
    },
  },
};
</script>
