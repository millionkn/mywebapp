<template>
  <div class="home">
    <div class="am-panel am-panel-secondary">
      <div class="am-panel-hd">
        <div class="am-input-group">
          <input type="text" class="am-form-field" v-model="driverName">
          <span class="am-input-group-btn">
            <button class="am-btn am-btn-default" type="button">
              <span class="am-icon-search"/>
            </button>
          </span>
        </div>
        <div class="am-btn-group">
          <button type="button" class="am-btn am-btn-primary am-round">添加</button>
          <button type="button" class="am-btn am-btn-primary am-round">导出</button>
          <button type="button" class="am-btn am-btn-primary am-round">导入</button>
        </div>
        <div class="am-btn-group">
          <button
            type="button"
            class="am-btn am-btn-success am-round"
            @click="makesureCheck"
          >确认检修</button>
          <button type="button" class="am-btn am-btn-danger am-round">删除</button>
        </div>
      </div>
      <div class="am-panel-bd">
        <el-table
          id="table"
          :data="tableData"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
          >
          </el-table-column>
          <el-table-column
            label="科室"
            prop="office"
            :filters="findFilters()"
            :filter-method="filterHandler"
          >
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
      > .am-input-group {
        flex-grow: 1;
      }
    }
  }
}
</style>

<script lang="ts">
import Vue from "vue";
import moment from 'moment';
import axios from 'axios';
import {
  Table as ElTable,
  TableColumn as ElTableColumn,
  Loading,
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
let selectedRow:Array<TableRow> = [];
export default Vue.extend({
  components: {
    ElTable,
    ElTableColumn,
  },
  data() {
    return {
      office: <string|undefined>undefined,
      driverName: <string|undefined>undefined,
      tableData:<Array<TableRow>>[],
    };
  },
  methods:{
    dateOf:(row:TableRow)=>moment(row.buyDate).format("YYYY-M-D"),
    daysAfterLastCheck:(row:TableRow)=>Math.floor(moment.duration(new Date().valueOf()-row.lastCheck).asDays()),
    makesureCheck(){
      let data=new Date().valueOf();
      selectedRow.forEach((row)=>row.lastCheck=data);
    },
    handleSelectionChange(selected:Array<TableRow>){
      selectedRow=selected;
    },
    findFilters(){
      return Array(...new Set(this.tableData.map((row)=>row.office)))
      .map((office)=>{
        return{
          value:office,
          text:office,
        }
      })
    },
    filterHandler:(value:string, row:TableRow)=>row.office===value,
  },
  mounted(){
    (async ()=>{
      let loading = Loading.service({
        'target':'#table',
      });
      this.tableData = (await axios.get('/data/console')).data;
      loading.close();
    })();
  }
});
</script>
