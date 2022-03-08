<template>
  <div class="app-container">
    <el-row>
      <el-cascader
        placeholder="请选择指标"
        :options="options"
        :props="props"
        style="width: 50%"
        v-model="inputData"
        @change="handleChange"
        clearable>
      </el-cascader>
        &nbsp;
      <el-button  @click="handleClick(inputData)"><svg-icon icon-class="search"/></el-button>
    </el-row>
    <el-row><p><br></p></el-row>
    <el-row>
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        fit
        highlight-current-row
        >
        <el-table-column
          label="指标"
          prop="label"
          align="center">
        </el-table-column>
        <el-table-column
          label="风险值"
          prop="risk_value"
          align="center">
        </el-table-column>
        <el-table-column
          label="风险等级"
          prop="risk_level"
          align="center">
          <template slot-scope="scope">
          <el-tag :type="scope.row.risk_level | statusFilter" effect="dark">{{ scope.row.risk_level }}</el-tag>
           </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
  export default {
     filters: {
    statusFilter(risk_level) {
      const statusMap = {
        低风险: '',
        一般风险: 'info',
        较大风险: 'warning',
        重大风险: 'danger'
      }
      return statusMap[risk_level]
    }
  },
    data() {
     return {
        props: { multiple: true },
        options: [{
          value: 1,
          label: '人员信息',
          children: [{
            value: 11,
            label: '违反劳动纪律B1',
            children: [
              { value: 111, label: '脱岗、串岗、提前离岗', possibility: '可能', severity: '一般', risk_value: '12', risk_level: '一般风险' },
              { value: 112, label: '工作时间休息',  risk_value: '12', risk_level: '一般风险' },
              { value: 113, label: '无证上岗',  risk_value: '12', risk_level: '一般风险' },
              { value: 114, label: '擅自更改或不执行指令',  risk_value: '12', risk_level: '一般风险' },
              { value: 115, label: '未佩戴劳动防护用品',  risk_value: '20', risk_level: '重大风险' },
              { value: 116, label: '伪造瓦斯日报',  risk_value: '20', risk_level: '重大风险' },
            ]
          }, {
            value: 12,
            label: '违反操作规程B2',
            children: [
              { value: 121, label: '停风作业',  risk_value: '10', risk_level: '一般风险' },
              { value: 122, label: '随意开关风门', risk_value: '12', risk_level: '重大风险' },
              { value: 123, label: '带电检修', risk_value: '16', risk_level: '较大风险' },
              { value: 124, label: '未按规定排放瓦斯', risk_value: '16', risk_level: '较大风险' },
              { value: 125, label: '违章爆破', risk_value: '10', risk_level: '一般风险' },
              { value: 126, label: '中孔装药作业违章', risk_value: '15', risk_level: '较大风险' },
              { value: 127, label: '违章焊接', risk_value: '10', risk_level: '一般风险' },
              { value: 128, label: '瓦斯漏检', risk_value: '12', risk_level: '一般风险' },
              { value: 129, label: '违章操作电气设备', risk_value: '16', risk_level: '较大风险' }
            ]
          }, {
            value: 13,
            label: '安全技能不足B3',
            children: [
              { value: 131, label: '技能理论不合格', risk_value: '6', risk_level: '低风险' },
              { value: 132, label: '实操不合格', risk_value: '12', risk_level: '一般风险' },
              { value: 133, label: '日检操作不当', risk_value: '12', risk_level: '一般风险'  }
            ]
          },{
            value: 14,
            label: '安全认知差错B4',
            children: [
              { value: 141, label: '安全感知偏差', risk_value: '12', risk_level: '一般风险'  },
              { value: 142, label: '安全认知差错', risk_value: '12', risk_level: '一般风险'  }
            ]
          },{
            value: 15,
            label: '安全责任感差B5',
            children: [
              { value: 151, label: '发现问题未反馈', risk_value: '12', risk_level: '一般风险'  },
              { value: 152, label: '遇到危险不上报', risk_value: '10', risk_level: '一般风险'  }
            ]
          },{
            value: 16,
            label: '安全意识不强B6',
            children: [
              { value: 161, label: '侥幸心理', risk_value: '16', risk_level: '较大风险'  },
              { value: 162, label: '习惯性违章', risk_value: '16', risk_level: '较大风险' }
            ]
          },{
            value: 17,
            label: '违章指挥B7',
            children: [
              { value: 171, label: '强令冒险作业', risk_value: '12', risk_level: '一般风险' }
            ]
          },
          ]
        }, {
          value: 2,
          label: '设备信息',
          children: [{
            value: 21,
            label: '设备缺失C1',
            children: [
              { value: 211, label: '未安装瓦斯监控系统', risk_value: '12', risk_level: '一般风险' },
              { value: 212, label: '传感器数量缺乏', risk_value: '12', risk_level: '一般风险' },
              { value: 213, label: '无便携式瓦斯检测仪', risk_value: '9', risk_level: '一般风险' },
            ]
          }, {
            value: 22,
            label: '设备可靠性差C2',
            children: [
              { value: 221, label: '通风设备不合格', risk_value: '15', risk_level: '较大风险' },
              { value: 222, label: '供电设备不合格', risk_value: '12', risk_level: '一般风险' },
              { value: 223, label: '抽放设备不合格', risk_value: '12', risk_level: '一般风险' },
              { value: 224, label: '防护装置不合格', risk_value: '15', risk_level: '较大风险' },
              { value: 225, label: '监测设备不合格', risk_value: '12', risk_level: '一般风险' }
            ]
          },{
            value: 23,
            label: '通风系统混乱C3',
            children: [
              { value: 231, label: '供风量不足', risk_value: '10', risk_level: '一般风险' },
              { value: 232, label: '随意关停通风机', risk_value: '15', risk_level: '较大风险' },
              { value: 233, label: '循环风', risk_value: '12', risk_level: '一般风险' },
              { value: 234, label: '风筒脱节', risk_value: '8', risk_level: '低风险' },
              { value: 235, label: '风筒漏风', risk_value: '8', risk_level: '低风险' },
              { value: 236, label: '风筒掘工作面过长', risk_value: '6', risk_level: '低风险' }
            ]
          },{
            value: 24,
            label: '电气设备失爆C4',
            children: [
              { value: 241, label: '信号装置失爆', risk_value: '9', risk_level: '一般风险' },
              { value: 242, label: '放炮器失爆', risk_value: '12', risk_level: '一般风险' },
              { value: 243, label: '矿灯失爆', risk_value: '8', risk_level: '低风险' },
              { value: 244, label: '其他设备失爆', risk_value: '12', risk_level: '一般风险' }
            ]
          }]
        }, {
          value: 3,
          label: '环境信息',
          children: [{
            value: 31,
            label: '巷道堵塞D1',
            risk_value: '8', 
            risk_level: '低风险'
          }, {
            value: 32,
            label: '瓦斯异常涌出D2',
            risk_value: '10', 
            risk_level: '一般风险'
          },{
            value: 33,
            label: '密闭空间瓦斯积聚D3',
            risk_value: '15', 
            risk_level: '较大风险'
          },{
            value: 34,
            label: '地质变化D4',
            risk_value: '5', 
            risk_level: '低风险'
          }]
        }, {
          value: 4,
          label: '管理信息',
          children: [{
            value: 41,
            label: '资源管理不到位E1',
            children: [
              { value: 411, label: '未配齐安全技术人员', risk_value: '12', risk_level: '一般风险' },
              { value: 412, label: '设备管理不到位', risk_value: '12', risk_level: '一般风险' },
              { value: 413, label: '栅栏管理不合规', risk_value: '9', risk_level: '一般风险' },
              { value: 414, label: '矿灯未统一管理', risk_value: '9', risk_level: '一般风险' },
              { value: 415, label: '警示标识不清晰', risk_value: '12', risk_level: '一般风险' },
            ]
          }, {
            value: 42,
            label: '安全制度不健全E2',
            children: [
              { value: 421, label: '瓦斯管理制度不完善', risk_value: '12', risk_level: '一般风险' },
              { value: 422, label: '通风管理制度不完善', risk_value: '12', risk_level: '一般风险' },
              { value: 423, label: '制度执行不到位', risk_value: '12', risk_level: '一般风险' }
            ]
          },{
            value: 43,
            label: '安全责任未落实E3',
            children: [
              { value: 431, label: '岗位责任未落实', risk_value: '16', risk_level: '较大风险' },
              { value: 432, label: '主体责任未落实', risk_value: '16', risk_level: '较大风险'  }
            ]
          },{
            value: 44,
            label: '安全检查不到位E4',
            children: [
              { value: 441, label: '隐患排查不到位', risk_value: '16', risk_level: '较大风险'  },
              { value: 442, label: '伪造检查记录', risk_value: '12', risk_level: '一般风险'  },
              { value: 443, label: '现场检查不到位', risk_value: '16', risk_level: '较大风险'  },
            ]
          },{
            value: 45,
            label: '安全培训不到位E5',
            children: [
              { value: 451, label: '培训内容陈旧', risk_value: '9', risk_level: '一般风险'  },
              { value: 452, label: '针对性不强', risk_value: '12', risk_level: '一般风险'  },
              { value: 453, label: '培训效果不理想', risk_value: '9', risk_level: '一般风险' },
            ]
          },{
            value: 46,
            label: '技术管理不到位E6',
            children: [
              { value: 461, label: '采用国家明令禁止的采煤方法', risk_value: '10', risk_level: '一般风险' },
              { value: 462, label: '技术方案不合理', risk_value: '12', risk_level: '一般风险' },
              { value: 463, label: '无开采设计', risk_value: '10', risk_level: '一般风险' },
              { value: 464, label: '无技术规程', risk_value: '12', risk_level: '一般风险' },
              { value: 465, label: '无安全技术措施', risk_value: '12', risk_level: '一般风险' },
              { value: 466, label: '瓦斯抽采不合理', risk_value: '16', risk_level: '较大风险' },
              { value: 467, label: '应急措施不健全', risk_value: '12', risk_level: '一般风险' }
            ]
          },{
            value: 47,
            label: '组织机构不健全Q1',
            children: [
              { value: 471, label: '机构设置不足', risk_value: '6', risk_level: '低风险' },
              { value: 472, label: '人员配备不足', risk_value: '12', risk_level: '一般风险' },
              { value: 473, label: '责任分配不合理' , risk_value: '12', risk_level: '一般风险'},
            ]
          },{
            value: 48,
            label: '重生产轻安全Q2',
            children: [
              { value: 481, label: '超能力生产', risk_value: '10', risk_level: '一般风险' },
              { value: 482, label: '领导安全意识不强', risk_value: '12', risk_level: '一般风险' }
            ]
          },{
            value: 49,
            label: '违法违规组织生产Q3',
            children: [
              { value: 491, label: '超深越界开采', risk_value: '10', risk_level: '一般风险' },
              { value: 492, label: '以检修、整改名义生产', risk_value: '15', risk_level: '较大风险' },
              { value: 493, label: '随意复工复产', risk_value: '8', risk_level: '低风险' },
              { value: 494, label: '无证、证过期生产', risk_value: '10', risk_level: '一般风险' },
            ]
          }]
        }],
        inputData: "",
        search: [],
        tableData: []
      };
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      // 级联筛选
      handleChange(value) {
        console.log("选中的",value);
      },
      // 搜索
      handleClick(arr) {
        // console.log("搜索的",arr)
        this.search = arr.map((item, index, arr) => {
          return  item[item.length-1]
        })
        // console.log("return的结果",this.search);
        this.tableData = this.search.map((item) => {
          if(item < 35) {
            return this.options[2].children[item%10 -1]
          } else {
            return this.options[parseInt(item/100 - 1)].children[parseInt((item%100)/10 - 1)].children[parseInt(item%10 - 1)]
          }
        })
      }
    },
  }
</script>