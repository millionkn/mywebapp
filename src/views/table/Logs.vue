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
        <button type="button" class="am-btn am-btn-danger am-round" @click="deleteHandle">删除</button>
      </div>
    </template>
    <template #default>
      <el-table :data="tableData" @selection-change="arr=>selectedRow=arr" stripe>
        <el-table-column type="expand">
          <template #default="scope">
            <div class="am-panel am-panel-secondary">
              <div class="am-panel-hd">{{dateOf(scope.row.date)}}</div>
              <div class="am-panel-bd">
                <template v-if="scope.row.extra">{{scope.row.extra}}</template>
                <template v-else>
                  <span style="color:#DDDDDD">没有说明</span>
                </template>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="科室">
          <template #default="scope">{{(getOffice(scope.row)||{name:'未指定'}).name}}</template>
        </el-table-column>
        <el-table-column label="设备名称">
          <template
            #default="scope"
          >{{(findObjectById('drivers',scope.row.driverId)||{name:"设备已不存在"}).name}}</template>
        </el-table-column>
        <el-table-column label="检修人员">
          <template
            #default="scope"
          >{{(findObjectById('persons',scope.row.personId)||{name:"用户已不存在"}).name}}</template>
        </el-table-column>
        <el-table-column label="检修日期">
          <template #default="scope">{{dateOf(scope.row.date)}}</template>
        </el-table-column>
      </el-table>
    </template>
  </table-shower>
</template>
<script lang="ts">
import Vue from "vue";
import moment from "moment";
import TableShower from "@/components/TableShower.vue";
import { Table as ElTable, TableColumn as ElTableColumn } from "element-ui";
import * as types from "@/types/index";
import { KeysType } from "@/store";
import { loadBeforeMounted, haveDeleteHandle } from "@/components/mixin";
export default Vue.extend({
  mixins: [
    loadBeforeMounted("#loading", "drivers", "offices", "logs", "persons"),
    haveDeleteHandle("logs", "deleteHandle", "selectedRow", "#loading")
  ],
  components: {
    ElTable,
    ElTableColumn,
    TableShower
  },
  data() {
    return {
      office: undefined as string | undefined,
      driverName: "" as string,
      selectedRow: [] as types.Log[]
    };
  },
  computed: {
    tableData(): any {
      let logs = this.$store.getters.logs as types.Log[];
      return logs
        .filter(log =>
          (
            this.findObjectById("drivers", log.driverId) || { name: "" }
          ).name.includes(this.driverName)
        )
        .sort((a, b) => b.date - a.date);
    }
  },
  methods: {
    dateOf: (time: number) => moment(time).format("YYYY-M-D"),
    findObjectById(type: KeysType, id: number) {
      return (this.$store.getters[type] as { id: number; name: string }[]).find(
        obj => obj.id === id
      );
    },
    getOffice(row: types.Log) {
      let driver = this.findObjectById("drivers", row.driverId) as
        | types.Driver
        | undefined;
      if (driver) {
        return this.findObjectById("offices", driver.officeId) as
          | types.Office
          | undefined;
      }
    }
  }
});
</script>
