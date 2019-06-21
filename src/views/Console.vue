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
        <button type="button" class="am-btn am-btn-success am-round" @click="makesureCheck">确认检修</button>
      </div>
    </template>
    <template #default>
      <el-table
        :data="tableData.filter(info=>info.driver.name.includes(driverName))"
        @selection-change="arr=>selectedRow=arr"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="科室">
          <template #default="scope">{{(scope.row.office||{name:"未指定"}).name}}</template>
        </el-table-column>
        <el-table-column label="仪器名称">
          <template #default="scope">{{scope.row.driver.name}}</template>
        </el-table-column>
        <el-table-column label="上次年检时间" prop="lastTime">
          <template #default="scope">
            <template v-if="scope.row.lastLog">{{dateOf(scope.row.lastLog.date)}}</template>
            <template v-else>尚无检修记录</template>
          </template>
        </el-table-column>
        <el-table-column label="距离下次检测">
          <template #default="scope">
            <span
              :class="colorClassName(scope.row)"
            >{{scope.row.driver.inspectionTimes-daysAfterLastCheck(scope.row)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备信息">
          <template #default>
            <span :class="'text-button'">
              <a href="#">详情</a>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="检修记录">
          <template #default>
            <span :class="'text-button'">
              <a href="#">检修记录</a>
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
import {
  Table as ElTable,
  TableColumn as ElTableColumn,
  Loading
} from "element-ui";
import * as type from "@/types/index";
import { loadBeforeMounted } from "@/components/mixin";
import { checkDrivers } from "@/store";
type Info = {
  office?: type.Office;
  driver: type.Driver;
  lastLog: type.Log;
};
export default Vue.extend({
  mixins: [loadBeforeMounted("#loading", "drivers", "offices", "logs")],
  components: {
    ElTable,
    ElTableColumn,
    TableShower
  },
  computed: {
    tableData(): Info[] {
      let offices = this.$store.getters.offices as type.Office[];
      let drivers = this.$store.getters.drivers as type.Driver[];
      let logs = this.$store.getters.logs as type.Log[];
      return drivers.map(driver => ({
        driver,
        office: offices.find(office => office.id === driver.officeId),
        lastLog: logs
          .filter(log => log.driverId === driver.id)
          .sort((a, b) => b.date - a.date)[0]
      }));
    }
  },
  data() {
    return {
      office: undefined as string | undefined,
      driverName: "" as string,
      selectedRow: [] as Info[]
    };
  },
  methods: {
    daysAfterLastCheck(row: Info) {
      let date = row.lastLog ? row.lastLog.date : row.driver.buyDate;
      return Math.floor(moment.duration(new Date().valueOf() - date).asDays());
    },
    colorClassName(row: Info) {
      return row.driver.line >=
        row.driver.inspectionTimes - this.daysAfterLastCheck(row)
        ? "danger"
        : "normal";
    },
    dateOf: (num: number) => moment(num).format("YYYY-M-D"),
    async makesureCheck() {
      let loading = Loading.service({ target: "#loading" });
      await checkDrivers(this.selectedRow.map(info => info.driver.id));
      loading.close();
    }
  }
});
</script>
