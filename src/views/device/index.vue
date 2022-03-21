<template>
  <!-- 设备管理 -->
  <div class="app-container">
    <el-row style="float: right">
      <el-button type="success" round size="medium" @click="handleAdd()"
        >新增</el-button
      >
      <el-button type="danger" round size="medium" @click="handleMultipleDel()"
        >批量删除</el-button
      >
      <!-- 新增弹窗 -->
      <el-dialog title="新增设备" :visible.sync="addFormVisible" center>
        <el-form :model="form" label-width="80px" :ref="form">
          <el-form-item label="设备名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="部门" prop="department">
            <el-input v-model="form.department"></el-input>
          </el-form-item>
          <el-form-item label="地点" prop="location">
            <el-input v-model="form.location"></el-input>
          </el-form-item>
          <el-form-item label="工作面" prop="workspace">
            <el-input v-model="form.workspace"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleAddCancle(form)">取 消</el-button>
          <el-button type="primary" @click="handleAddOk(form)">确 定</el-button>
        </div>
      </el-dialog>
    </el-row>
    <p><br /></p>
    <el-row>
      <el-table
        v-loading="listLoading"
        :data="list.slice((page - 1) * pageSize, pageSize * page)"
        ref="multipleTable"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" label="全选">
        </el-table-column>
        <el-table-column align="center" label="编号" width="95">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="设备名" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.machine_name }}
          </template>
        </el-table-column>
        <el-table-column label="部门">
          <template slot-scope="scope">
            <span>{{ scope.row.department }}</span>
          </template>
        </el-table-column>
        <el-table-column label="地点">
          <template slot-scope="scope">
            {{ scope.row.location }}
          </template>
        </el-table-column>
        <el-table-column label="工作面">
          <template slot-scope="scope">
            {{ scope.row.workspace }}
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="block" style="text-align: center">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[10, 20, 30]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="list.length"
          style="display: inline-block"
        >
        </el-pagination>
      </div>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
    </el-row>
  </div>
</template>

<script>
import { fetchList,addList,delList } from "@/api/device";

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      page: 1, // 当前页号
      pageSize: 10, // 每页的记录数
      addFormVisible: false,
      multipleSelection: [], //多选的数据
      form: {
        id: "",
        name: "",
        department: "",
        location: "",
        workspace: "",
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      fetchList().then((response) => {
        this.list = response
        this.listLoading = false;
      });
    },

    // 分页器
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.page = val;
    },

    handleAdd() {
      this.addFormVisible = true;
    },
    // 确定新增
    async handleAddOk(row) {
      this.addFormVisible = false;
      // --------------- 连接后端之后打开-----------
      await addList(row);
      this.fetchData();
      this.$message({
        type: "success",
        message: "新增成功!",
      });
      this.list.push(row);
      this.form = {
        id: "",
        name: "",
        department: "",
        location: "",
        workspace: ""
      };
    },
    // 取消新增
    handleAddCancle(row) {
      this.addFormVisible = false;
      this.fetchData()
      this.$message({
        type: "info",
        message: "已取消新增",
      });
      this.form = {
        id: "",
        name: "",
        department: "",
        location: "",
      };
    },

    handleMultipleDel() {
      this.$confirm("此操作将永久删除该人员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          const length = this.multipleSelection.length;
          const multipleSelectionArr = [];
          for (let i = 0; i < length; i++) {
            // console.log("多选删除的index", this.multipleSelection[i].id);
            multipleSelectionArr.push(this.multipleSelection[i].id);
          }
          // ----- 前端处理 ------
          // multipleSelectionArr.forEach(id => {
          //   this.list.forEach((item, index) => {
          //     if(item.id == id){
          //       this.list.splice(index,1)
          //     }
          //   })
          // })
         
          //----------------- 多选删除 传递id数组给后端进行操作 ------------
          delList(multipleSelectionArr)
          this.fetchData();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleSelectionChange(val) {
      // console.log("多选------------",$index);
      this.multipleSelection = val;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
  },
};
</script>
