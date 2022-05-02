<template>
  <div class="app-container">
    <el-row>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        :inline="true"
        label-width="300px"
        size="medium"
      >
        <el-form-item label="矿井" prop="site">
          <el-select v-model="form.site" placeholder="请选择">
            <el-option label="1#矿井" value="1"></el-option>
            <el-option label="2#矿井" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="瓦斯等级c" prop="c">
          <el-select v-model="form.c" placeholder="请选择">
            <el-option label="煤与瓦斯突出矿井" value="3"></el-option>
            <el-option label="高瓦斯矿井或有瓦斯危害" value="2"></el-option>
            <el-option label="瓦斯矿井" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="矿井瓦斯管理d" prop="d">
          <el-select v-model="form.d" placeholder="请选择">
            <el-option
              label="瓦斯管理制度不完善，或有严重漏洞"
              value="3"
            ></el-option>
            <el-option
              label="瓦斯管理制度完善，但落实中有缺项，或落实不力，无落实记录"
              value="2"
            ></el-option>
            <el-option
              label="瓦斯管理制度齐全，但有少数条款不符合矿井实际，或记录不全"
              value="1"
            ></el-option>
            <el-option label="全部符合瓦斯管理制度" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="瓦斯检查员素质e" prop="e">
          <el-select v-model="form.e" placeholder="请选择">
            <el-option
              label="检查员未经培训上岗，有填假瓦斯日报等违章行为"
              value="3"
            ></el-option>
            <el-option
              label="检查员当中有未经培训就上岗者，或检查员在检测中有漏检现象"
              value="2"
            ></el-option>
            <el-option
              label="全员虽经培训，但抽查中有无证操作或考核当中有5～10％不及格"
              value="1"
            ></el-option>
            <el-option
              label="瓦斯检查员全部经过培训，符合《煤矿安全规程》规定"
              value="0"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机电设备和硐室的安全保护装备a" prop="a">
          <el-select v-model="form.a" placeholder="请选择">
            <el-option
              label="机电设备安全保护不全（过流、超温、短路、过负荷等），或硐室支护材料不合格"
              value="3"
            ></el-option>
            <el-option
              label="机电设备的安全保护齐全，但有的保护装置动作不灵活，或硐室支护材料不合格，无消防材料、设备"
              value="2"
            ></el-option>
            <el-option
              label="机电设备保护齐全、可靠，硐室支护合格，但布置或值班管理差"
              value="1"
            ></el-option>
            <el-option
              label="机电设备安全保护齐全，完好率100％，硐室支护及消防合格"
              value="0"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="栅栏管理b" prop="b">
          <el-select v-model="form.b" placeholder="请选择">
            <el-option
              label="井下盲巷、报废巷或采空区存在没打栅栏、挂警示牌"
              value="3"
            ></el-option>
            <el-option
              label="井下所有盲巷、报废巷或采空区虽打上栅栏、警示牌，但质量不符合有关规定"
              value="2"
            ></el-option>
            <el-option
              label="井下所有盲巷、报废巷或采空区虽打上栅栏、警示牌，但50％以下的质量不符合有关规定"
              value="1"
            ></el-option>
            <el-option
              label="井下所有盲巷、报废巷或采空区均打上栅栏、警示牌，并且质量全部符合有关规定"
              value="0"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机电工人素质f" prop="f">
          <el-select v-model="form.f" placeholder="请选择">
            <el-option
              label="机电工人操作中有“三违”事件，或有未经过培训就上岗的现象"
              value="3"
            ></el-option>
            <el-option
              label="机电工人文盲或者工龄在1年以下（含1年）的占总数的20～30％，或安全活动无计划、无签到、无记录"
              value="2"
            ></el-option>
            <el-option
              label="机电工人当中经过了专业培训，但在抽查考核中有5～10％不及格，或存在无证操作的现象"
              value="1"
            ></el-option>
            <el-option label="符合《煤矿安全规程》要求" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="放炮员素质g" prop="g">
          <el-select v-model="form.g" placeholder="请选择">
            <el-option
              label="工作面放炮过程中存在“三违”现象"
              value="3"
            ></el-option>
            <el-option
              label="放炮员有未经过专业培训的，或经抽查考核有5～10％不及格"
              value="2"
            ></el-option>
            <el-option
              label="由于操作等原因，造成5～10％的瞎炮率"
              value="1"
            ></el-option>
            <el-option label="放炮作业符合作业规程要求" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机电设备失爆率h" prop="h">
          <el-select v-model="form.h" placeholder="请选择">
            <el-option
              label="机电设备选型个别不符合《煤矿安全规程》的规定，或防爆电气设备及小型电气有失爆现象"
              value="3"
            ></el-option>
            <el-option
              label="机电设备选型符合《煤矿安全规程》规定，且全矿井机电设备综合完好率在90％以上"
              value="2"
            ></el-option>
            <el-option
              label="机电设备型号全部符合《煤矿安全规程》规定，且全矿井机电设备综合完好率在95％以上"
              value="1"
            ></el-option>
            <el-option
              label="机电设备全部符合《煤矿安全规程》规定，设备完好率100％"
              value="0"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="通风管理i" prop="i">
          <el-select v-model="form.i" placeholder="请选择">
            <el-option
              label="通风管理制度混乱（通风系统、局部通风、测风、配风量等），或通风设施不完善"
              value="3"
            ></el-option>
            <el-option
              label="通风管理制度完善，但有部分条款不完善，或通风设施完善，但质量不符合要求"
              value="2"
            ></el-option>
            <el-option
              label="通风管理制度完善，但执行不到位，或个别通风设施质量不合格"
              value="1"
            ></el-option>
            <el-option
              label="通风管理制度完善，执行到位，通风设施完善"
              value="0"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="采面通风状况k" prop="k">
          <el-select v-model="form.k" placeholder="请选择">
            <el-option
              label="采面配风量不足，瓦斯浓度经常超限，或高、突矿井没有“先抽后采”，或有不合理的通风系统（角联、串联等）"
              value="3"
            ></el-option>
            <el-option
              label="通风系统完善，但不稳定，有瓦斯超限现象"
              value="2"
            ></el-option>
            <el-option
              label="通风系统完善、稳定，但瓦斯浓度有时接近临界值"
              value="1"
            ></el-option>
            <el-option
              label="通风系统完善、稳定，配风量合理"
              value="0"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="领导执行安全方针j" prop="j">
          <el-select v-model="form.j" placeholder="请选择">
            <el-option
              label="安全责任制、安全生产管理制度齐全，但不实用，或贯彻落实无记录或记录失实"
              value="3"
            ></el-option>
            <el-option
              label="安全生产责任制、安全生产管理制度齐全，但不规范，或贯彻落实不力"
              value="2"
            ></el-option>
            <el-option
              label="安全生产责任制和安全生产管理制度齐全，但不规范，或贯彻落实记录不全"
              value="1"
            ></el-option>
            <el-option
              label="安全生产责任制、安全生产管理制度齐全规范，且贯彻落实到位"
              value="0"
            ></el-option>
          </el-select>
        </el-form-item>

        <br />
        <el-form-item style="margin-left: 40%">
          <el-button type="primary" @click="submitForm('form', form)"
            >确定</el-button
          >
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row style="float: right"
      ><el-button type="danger" round size="medium" @click="handleMultipleDel()"
        >批量删除</el-button
      ></el-row
    >
    <el-row><p><br /></p></el-row>
    <el-row>
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        fit
        highlight-current-row
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" label="全选">
        </el-table-column>
        <el-table-column label="时间" prop="time" align="center">
        </el-table-column>
        <el-table-column label="矿井" prop="area" align="center">
        </el-table-column>
        <el-table-column label="危险值" prop="value" align="center">
        </el-table-column>
        <el-table-column
          label="瓦斯爆炸事故危险度"
          prop="degree"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.degree | statusFilter" effect="dark">{{
              scope.row.degree
            }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import { getList, addList } from "@/api/area";
export default {
  filters: {
    statusFilter(degree) {
      const statusMap = {
        稍有危险: "",
        一般危险: "info",
        比较危险: "warning",
        很危险: "danger",
      };
      return statusMap[degree];
    },
  },
  data() {
    return {
      form: {
        a: "",
        b: "",
        c: "",
        d: "",
        e: "",
        f: "",
        g: "",
        h: "",
        i: "",
        j: "",
        k: "",
        site: "",
      },
      rules: {
        site: [{ required: true, message: "请选择矿井", trigger: "change" }],
        a: [
          {
            required: true,
            message: "请选择机电设备和硐室的安全保护装备a",
            trigger: "change",
          },
        ],
        b: [{ required: true, message: "请选择栅栏管理b", trigger: "change" }],
        c: [{ required: true, message: "请选择瓦斯等级c", trigger: "change" }],
        d: [
          { required: true, message: "请选择矿井瓦斯管理d", trigger: "change" },
        ],
        e: [
          {
            required: true,
            message: "请选择瓦斯检查员素质e",
            trigger: "change",
          },
        ],
        f: [
          { required: true, message: "请选择机电工人素质f", trigger: "change" },
        ],
        g: [
          { required: true, message: "请选择放炮员素质g", trigger: "change" },
        ],
        h: [
          {
            required: true,
            message: "请选择机电设备失爆率h",
            trigger: "change",
          },
        ],
        i: [{ required: true, message: "请选择通风管理i", trigger: "change" }],
        j: [
          { required: true, message: "请选择领导执行方针j", trigger: "change" },
        ],
        k: [
          { required: true, message: "请选择采面通风状况k", trigger: "change" },
        ],
      },
      tableData: [],
      risk_value: 0,
      risk_level: "",
      listLoading: true,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getList().then((response) => {
        this.tableData = response;
        this.listLoading = false;
      });
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
          // ----- 前端处理 ------
          // multipleSelectionArr.forEach(id => {
          //   this.list.forEach((item, index) => {
          //     if(item.id == id){
          //       this.list.splice(index,1)
          //     }
          //   })
          // })

          //----------------- 多选删除 传递id数组给后端进行操作 ------------
          delList(multipleSelectionArr);
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
    // 确定
    submitForm(formName, val) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 危险值risk_value
          this.risk_value = 0;
          for (let i in val) {
            this.risk_value += val[i] * 1;
          }
          this.risk_value -= val.c;
          this.risk_value -= val.site;
          this.risk_value = this.risk_value * val.c;
          // 危险程度risk_level
          if (this.risk_value > 29) {
            this.risk_level = "很危险";
          } else if (this.risk_value > 19) {
            this.risk_level = "比较危险";
          } else if (this.risk_value > 4) {
            this.risk_level = "一般危险";
          } else {
            this.risk_level = "稍有危险";
          }
          // 获取当前时间
          function getTime() {
            var date = new Date();

            var year = date.getFullYear(); //年 ,从 Date 对象以四位数字返回年份
            var month = date.getMonth() + 1; //月 ,从 Date 对象返回月份 (0 ~ 11) ,date.getMonth()比实际月份少 1 个月
            var day = date.getDate(); //日 ,从 Date 对象返回一个月中的某一天 (1 ~ 31)

            var hours = date.getHours(); //小时 ,返回 Date 对象的小时 (0 ~ 23)
            var minutes = date.getMinutes(); //分钟 ,返回 Date 对象的分钟 (0 ~ 59)
            var seconds = date.getSeconds(); //秒 ,返回 Date 对象的秒数 (0 ~ 59)

            //获取当前系统时间
            var currentDate =
              year +
              "-" +
              month +
              "-" +
              day +
              " " +
              hours +
              ":" +
              minutes +
              ":" +
              seconds;

            //修改月份格式
            if (month >= 1 && month <= 9) {
              month = "0" + month;
            }

            //修改日期格式
            if (day >= 0 && day <= 9) {
              day = "0" + day;
            }

            //修改小时格式
            if (hours >= 0 && hours <= 9) {
              hours = "0" + hours;
            }

            //修改分钟格式
            if (minutes >= 0 && minutes <= 9) {
              minutes = "0" + minutes;
            }

            //修改秒格式
            if (seconds >= 0 && seconds <= 9) {
              seconds = "0" + seconds;
            }

            //获取当前系统时间  格式(yyyy-mm-dd hh:mm:ss)
            var currentFormatDate =
              year +
              "-" +
              month +
              "-" +
              day +
              " " +
              hours +
              ":" +
              minutes +
              ":" +
              seconds;
            return currentFormatDate;
          }
          let arr = {
            time: getTime(),
            area: val.site + "#矿井",
            value: this.risk_value,
            degree: this.risk_level,
          };
          // this.tableData.push(arr);
          addList(arr);
          this.fetchData();
          console.log("tableData", this.tableData);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 重置
    resetForm(formName) {
      this.risk_value = 0;
      this.$refs[formName].resetFields();
    },
  },
};
</script>

