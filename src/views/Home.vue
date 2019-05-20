<template>
  <div class="home">
    <div class="am-panel am-panel-secondary">
      <div class="am-panel-hd">
        <el-input placeholder="设备名称" v-model="driverName" class="input">
          <el-select v-model="office" slot="prepend" placeholder="科室" style="width:8em;">
            <el-option label="科室A" value="1"></el-option>
            <el-option label="科室B" value="2"></el-option>
            <el-option label="科室C" value="3"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <button type="button" class="am-btn am-btn-primary">添加</button>
        <button type="button" class="am-btn am-btn-primary">导出</button>
        <button type="button" class="am-btn am-btn-primary">导入</button>
      </div>
      <div class="am-panel-bd">
        <el-table
          :data="tableData"
        >
          <el-table-column
            type="selection"
            width="55"
          >
          </el-table-column>
          <el-table-column label="科室" prop="office">
          </el-table-column>
          <el-table-column label="仪器名称" prop="name">
          </el-table-column>
          <el-table-column label="购买日期">
            <template #default="scope">
              {{dateOf(scope.row)}}
            </template>
          </el-table-column>
          <el-table-column label="上次年检时间" prop="lastTime">
            <template #default="scope">
              {{dateOf(scope.row)}}
            </template>
          </el-table-column>
          <el-table-column label="年检周期" prop="inspectionTimes">
          </el-table-column>
          <el-table-column label="距离下次检测">
            <template #default="scope">
              <span :class="scope.row.line>=(scope.row.inspectionTimes-daysAfterLastCheck(scope.row)) ? 'danger' : 'normal'">
                {{scope.row.inspectionTimes-daysAfterLastCheck(scope.row)}}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="提前预警" prop="line">
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <span :class="'text-button'" @click="checkFor(scope.row)"><a href="#">确认检修</a></span>
            </template>
          </el-table-column>
          <el-table-column label="详情">
            <template #default="scope">
              <span :class="'text-button'"><a href="#">详情</a></span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.danger{
  color: #F56C6C;
}
.normal{
  color:#409EFF;
}
.text-button{
  color:#67C23A;
}
#full {
  align-items: stretch;
}
.home {
  flex-grow: 1;
  flex-direction: column;
  > .am-panel {
    flex-grow: 1;
    > .am-panel-hd {
      display: flex;
      flex-direction: row;
      > .input {
        flex-grow: 1;
      }
    }
  }
}
</style>

<script lang="ts">
import Vue from "vue";
import moment from 'moment';
import {
  Select as ElSelect,
  Option as ElOption,
  Input as ElInput,
  Button as ElButton,
  Table as ElTable,
  TableColumn as ElTableColumn,
} from "element-ui";
type TimeStamp=number;
type Turnaround=number;
type TableRow={
  office:string,
  name:string,
  buyDate:TimeStamp,
  lastCheck:TimeStamp,
  inspectionTimes:Turnaround,
  line:Turnaround,
};
export default Vue.extend({
  components: {
    ElSelect,
    ElOption,
    ElInput,
    ElButton,
    ElTable,
    ElTableColumn,
  },
  data() {
    return {
      office: undefined,
      driverName: undefined,
      tableData:<Array<TableRow>>[
        {
          office:"科室A",
          name:"仪器A1",
          buyDate:new Date().valueOf(),
          lastCheck:new Date().valueOf(),
          inspectionTimes:7,
          line:3,
        },
        {
          office:"科室A",
          name:"仪器A1",
          buyDate:new Date().valueOf(),
          lastCheck:moment().add({
            day:-4,
          }).valueOf(),
          inspectionTimes:7,
          line:3,
        },
      ],
    };
  },
  methods:{
    dateOf:(row:TableRow)=>moment(row.buyDate).format("YYYY-M-D"),
    daysAfterLastCheck:(row:TableRow)=>Math.floor(moment.duration(new Date().valueOf()-row.lastCheck).asDays()),
    checkFor(row:TableRow){
      row.lastCheck=new Date().valueOf();
    }
  },
});
</script>
