<template>
  <div class="app-container">
    <el-row style="float: right">
      <el-button type="success" round size="medium" @click="handleAdd()"
        >新增</el-button
      >
      <el-button type="danger" round size="medium" @click="handleMultipleDel()"
        >批量删除</el-button
      >
      <!-- 新增弹窗 -->
      <el-dialog title="新增信息" :visible.sync="addFormVisible" center>
        <el-form :model="form" label-width="80px" :ref="form">
          <el-form-item label="ID" prop="id">
            <el-input v-model="form.id"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="部门" prop="department">
            <el-input v-model="form.department"></el-input>
          </el-form-item>
          <el-form-item label="位置" prop="location">
            <el-input v-model="form.location"></el-input>
          </el-form-item>
          <el-form-item label="权限组" prop="perm_group">
            <el-select v-model="form.perm_group" placeholder="请选择权限组">
              <el-option label="published" value="published"></el-option>
              <el-option label="admin" value="admin"></el-option>
            </el-select>
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
        :data="list.slice((page-1)*pageSize,pageSize*page)"
        ref="multipleTable"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" label="全选"> </el-table-column>
        <el-table-column align="center" label="ID" width="95">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="部门">
          <template slot-scope="scope">
            <span>{{ scope.row.department }}</span>
          </template>
        </el-table-column>
        <el-table-column label="位置">
          <template slot-scope="scope">
            {{ scope.row.location }}
          </template>
        </el-table-column>
        <el-table-column
          class-name="Perm_group"
          label="权限组"
          width="110"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.perm_group | statusFilter">{{
              scope.row.perm_group
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          class-name="Operation"
          label="操作"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <!-- 编辑弹窗 -->
            <el-dialog
              title="编辑信息"
              :visible.sync="dialogFormVisible"
              center
            >
              <el-form :model="editData" label-width="80px">
                <el-form-item label="ID" prop="id">
                  <el-input v-model="editData.id" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="editData.name"></el-input>
                </el-form-item>
                <el-form-item label="部门" prop="department">
                  <el-input v-model="editData.department"></el-input>
                </el-form-item>
                <el-form-item label="位置" prop="location">
                  <el-input v-model="editData.location"></el-input>
                </el-form-item>
                <el-form-item label="权限组" prop="perm_group">
                  <el-select
                    v-model="editData.perm_group"
                    placeholder="请选择权限组"
                  >
                    <el-option label="published" value="published"></el-option>
                    <el-option label="admin" value="admin"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="handleCancle(editData)">取 消</el-button>
                <el-button
                  type="primary"
                  @click="handleOk(editData)"
                  >确 定</el-button
                >
              </div>
            </el-dialog>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="text-align: center">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[10, 20, 30]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="list.length"
          style="display: inline-block;"
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
import { getList } from "@/api/table";

export default {
  filters: {
    statusFilter(perm_group) {
      const statusMap = {
        published: "success",
        admin: "danger",
      };
      return statusMap[perm_group];
    },
  },
  data() {
    return {
      list: null,
      listLoading: true,
      dialogFormVisible: false,
      addFormVisible: false,
      multipleSelection: [], //多选的数据
      form: {
        id: "",
        name: "",
        department: "",
        location: "",
        perm_group: "",
      },
      page: 1, // 当前页号
      pageSize: 10, // 每页的记录数
      editData: {}, // 编辑的对象
      // rules: {
      //   name: [
      //     { required: true, message: '请输入修改之后的姓名', trigger: 'blur' },
      //     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //   ]
      // }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getList().then((response) => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.page = val
    },

    handleAdd() {
      this.addFormVisible = true;
    },
    // 确定新增
    handleAddOk(row) {
      this.addFormVisible = false;
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
        perm_group: "",
      };
    },
    // 取消新增
    handleAddCancle(row) {
      this.addFormVisible = false;
      this.$message({
        type: "info",
        message: "已取消新增",
      });
      this.form = {
        id: "",
        name: "",
        department: "",
        location: "",
        perm_group: "",
      };
    },

    handleMultipleDel() {
      this.$confirm("此操作将永久删除该人员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const length = this.multipleSelection.length;
          const multipleSelectionArr = [];
          for (let i = 0; i < length; i++) {
            // console.log("多选删除的index", this.multipleSelection[i].id);
            multipleSelectionArr.push(this.multipleSelection[i].id);
          }
          //----------------- 多选删除 传递id数组给后端进行操作 ------------
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

    handleEdit(index, row) {
      this.dialogFormVisible = true;
      console.log("编辑的row",row);
      this.editData = row;
    },
    // 确定编辑
    handleOk(row) {
      //------------- 编辑信息，传递编辑后的row给后端 ------------------
      this.dialogFormVisible = false;
      this.$message({
        type: "success",
        message: "编辑成功!",
      });
      console.log("确定编辑的row",row);
    },
    // 取消编辑
    handleCancle(row) {
      row = this.editData
      console.log("取消编辑的row",row);
      this.dialogFormVisible = false;
      // ----------------------------- 取消编辑 有问题----------------
      //----------------- 不传信息 不调用后端接口 直接关闭弹窗-----------
      //
      // console.log("取消编辑的row",row);
      this.$message({
        type: "info",
        message: "已取消编辑",
      });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该人员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.list.splice(index, 1);
          console.log("单次删除的index", index);
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
  },
};
</script>
