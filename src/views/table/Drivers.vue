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
        <button
          type="button"
          class="am-btn am-btn-primary am-round"
          @click="$router.push(`Drivers/-1`)"
        >添加</button>
        <button type="button" class="am-btn am-btn-danger am-round" @click="deleteHandle">删除</button>
      </div>
    </template>
    <template #default>
      <el-table
        :data="$store.getters.drivers.filter(info=>info.name.includes(driverName))"
        @selection-change="arr=>selectedRow=arr"
        stripe
      >
        <el-table-column type="expand">
          <template #default="scope">
            <div class="am-panel am-panel-secondary">
              <div class="am-panel-hd">{{scope.row.name}}</div>
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
          <template
            #default="scope"
          >{{($store.getters.offices.find(office=>office.id===scope.row.officeId)||{name:"未指定"}).name}}</template>
        </el-table-column>
        <el-table-column label="仪器名称" prop="name"></el-table-column>
        <el-table-column label="购买日期">
          <template #default="scope">{{dateOf(scope.row.buyDate)}}</template>
        </el-table-column>
        <el-table-column label="年检周期" prop="inspectionTimes"></el-table-column>
        <el-table-column label="提前预警" prop="line"></el-table-column>
        <el-table-column label="编辑">
          <template #default="scope">
            <button
              class="am-btn am-btn-primary"
              @click="$router.push(`Drivers/${scope.row.id}`)"
            >编辑</button>
          </template>
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
import { Driver } from "@/types/index";
import { loadBeforeMounted, haveDeleteHandle } from "@/components/mixin";
export default Vue.extend({
  mixins: [
    loadBeforeMounted("#loading", "drivers", "offices"),
    haveDeleteHandle("drivers", "deleteHandle", "selectedRow", "#loading")
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
      selectedRow: [] as Driver[]
    };
  },
  methods: {
    dateOf: (time: number) => moment(time).format("YYYY-M-D")
  }
});
</script>
