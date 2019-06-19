<template>
  <table-shower id="loading">
    <template #panel-head="scope">
      <div class="am-input-group">
        <input type="text" class="am-form-field" v-model="driverName">
        <span class="am-input-group-btn">
          <button class="am-btn am-btn-default" type="button">
            <span class="am-icon-search"/>
          </button>
        </span>
      </div>
      <span style="flex-grow:1"></span>
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
    <template #default>
      <el-table
        :data="$store.state.data.drivers.filter(info=>info.name.includes(driverName))"
        @selection-change="arr=>selectedRow=arr"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          label="科室"
          :filters="$store.state.data.offices.map(office => new Object({ value: office.id, text: office.name }))"
          :filter-method="(value, row) => row.officeId === value"
        >
          <template
            #default="scope"
          >{{($store.state.data.offices[scope.row.officeId]||{name:'未指定'}).name}}</template>
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
          <template #default>
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
import { Table as ElTable, TableColumn as ElTableColumn } from "element-ui";
import { Driver } from "@/types/index";
import { loadBeforeMounted } from "@/components/mixin";
export default Vue.extend({
  mixins: [loadBeforeMounted("#loading", "drivers", "offices")],
  components: {
    ElTable,
    ElTableColumn,
    TableShower
  },
  data() {
    return {
      office: undefined as string | undefined,
      driverName: "" as string,
      selectedRow: [] as Driver[]
    };
  },
  methods: {
    dateOf: (row: Driver) => moment(row.buyDate).format("YYYY-M-D"),
    daysAfterLastCheck: (row: Driver) =>
      Math.floor(
        moment.duration(new Date().valueOf() - row.lastCheck).asDays()
      ),
    makesureCheck() {
      let data = new Date().valueOf();
      this.selectedRow.forEach(row => (row.lastCheck = data));
    }
  }
});
</script>
