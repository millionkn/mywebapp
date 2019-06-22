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
      <el-dialog :visible.sync="timeLineShowing" :before-close="()=>timeLineShowing=false">
        <timeline>
          <timeline-item
            v-for="item in timeLine"
            :key="item.id"
            :timestamp="item.date"
          >{{item.extra}}</timeline-item>
        </timeline>
      </el-dialog>
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
        <el-table-column label="检修记录">
          <template #default="scope">
            <button class="am-btn am-btn-primary am-round" @click="showTimeLine(scope.row)">检修记录</button>
          </template>
        </el-table-column>
        <el-table-column label="设备信息">
          <template #default="scope">
            <button
              class="am-btn am-btn-primary am-round"
              @click="$router.push(`Drivers/${scope.row.driver.id}`)"
            >详情</button>
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
</style>

<script lang="ts">
import Vue from "vue";
import moment from "moment";
import TableShower from "@/components/TableShower.vue";
import {
  Table as ElTable,
  TableColumn as ElTableColumn,
  MessageBox,
  Dialog as ElDialog,
  Timeline,
  TimelineItem,
  Loading
} from "element-ui";
import * as type from "@/types/index";
import { loadBeforeMounted } from "@/components/mixin";
import { postData, loadData } from "@/store";
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
    TableShower,
    ElDialog,
    Timeline,
    TimelineItem
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
      selectedRow: [] as Info[],
      timeLineShowing: false as boolean,
      timeLine: [] as ({
        id: number;
        date: string;
        extra: string;
      }[])
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
      let extra: string;
      try {
        extra = ((await MessageBox.prompt("创建日志", "输入日志内容")) as {
          value: string;
        }).value;
      } catch (e) {
        return;
      }
      let loading = Loading.service({ target: "#loading" });
      let date = new Date().valueOf();
      await postData("logs", this.selectedRow.map(info => ({
        date,
        driverId: info.driver.id,
        personId: 0,
        extra
      })) as type.Log[]);
      loading.close();
    },
    showTimeLine(row: Info) {
      this.timeLineShowing = true;
      this.timeLine = (this.$store.getters.logs as type.Log[])
        .filter(log => log.driverId === row.driver.id)
        .sort((a, b) => b.date - a.date)
        .map(log =>
          Object.assign({}, log, {
            date: moment(log.date).format("YYYY-MM-DD")
          })
        );
      this.timeLine.push({
        id: NaN,
        date: moment(row.driver.buyDate).format("YYYY-MM-DD"),
        extra: row.driver.extra
      });
    }
  }
});
</script>
