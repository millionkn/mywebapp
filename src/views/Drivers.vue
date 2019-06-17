<template>
  <table-shower table-data-url="/restAPI/drivers" @successed="(arr)=>tableData=arr">
    <template #panel-head="scope">
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
        <button type="button" class="am-btn am-btn-success am-round" @click="makesureCheck">确认检修</button>
        <button type="button" class="am-btn am-btn-danger am-round">删除</button>
      </div>
    </template>
    <template #default="scope">
      <el-table
        :data="tableData.filter(info=>info.name.includes(driverName))"
        @selection-change="arr=>selectedRow=arr"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          label="科室"
          :filters="findFilters()"
          :filter-method="(value, row) => row.officeId === value"
        >
          <template #default="scope">{{offices[scope.row.officeId].name}}</template>
        </el-table-column>
        <el-table-column label="仪器名称" prop="name"></el-table-column>
        <el-table-column label="购买日期">
          <template #default="scope">{{dateOf(scope.row)}}</template>
        </el-table-column>
        <el-table-column label="上次年检时间" prop="lastTime">
          <template #default="scope">{{dateOf(scope.row)}}</template>
        </el-table-column>
        <el-table-column label="年检周期" prop="inspectionTimes"></el-table-column>
        <el-table-column label="距离下次检测">
          <template #default="scope">
            <span
              :class="scope.row.line>=(scope.row.inspectionTimes-daysAfterLastCheck(scope.row)) ? 'danger' : 'normal'"
            >{{scope.row.inspectionTimes-daysAfterLastCheck(scope.row)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="提前预警" prop="line"></el-table-column>
        <el-table-column label="详情">
          <template #default="scope">
            <span :class="'text-button'">
              <a href="#">详情</a>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </table-shower>
</template>
<style lang="less" scoped>
.danger {
  color: #f56c6c;
}
.normal {
  color: #409eff;
}
.text-button {
  color: #67c23a;
}
#full {
  align-items: stretch;
}
</style>

<script lang="ts">
import Vue from "vue";
import moment from "moment";
import TableShower from "@/components/TableShower.vue";
import axios from "axios";
import {
  Table as ElTable,
  TableColumn as ElTableColumn,
  Loading
} from "element-ui";
type TimeStamp = number;
type Turnaround = number;
type TableRow = {
  office: string;
  name: string;
  buyDate: TimeStamp;
  lastCheck: TimeStamp;
  inspectionTimes: Turnaround;
  line: Turnaround;
};
export default Vue.extend({
  components: {
    ElTable,
    ElTableColumn,
    TableShower
  },
  data() {
    return {
      office: undefined as string | undefined,
      driverName: "" as string,
      tableData: [] as TableRow[],
      selectedRow: [] as TableRow[],
      offices: [] as { id: number; name: string }[]
    };
  },
  methods: {
    dateOf: (row: TableRow) => moment(row.buyDate).format("YYYY-M-D"),
    daysAfterLastCheck: (row: TableRow) =>
      Math.floor(
        moment.duration(new Date().valueOf() - row.lastCheck).asDays()
      ),
    makesureCheck() {
      let data = new Date().valueOf();
      this.selectedRow.forEach(row => (row.lastCheck = data));
    },
    findFilters() {
      return this.offices.map(
        office => new Object({ value: office.id, text: office.name })
      );
    }
  },
  async mounted() {
    this.offices = (await axios.get("/restAPI/offices")).data;
  }
});
</script>
