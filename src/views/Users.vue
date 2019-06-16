<template>
  <table-shower @successed="loadSuccessedHandle" table-data-url="/data/users">
    <template #panel-head="scope">
      <span style="flex-grow:1"></span>
      <button type="button" class="am-btn am-btn-primary am-round" @click="submitChange">提交修改</button>
    </template>
    <template #default="scope">
      <el-table
        ref="table"
        :data="tableData"
        :row-style="(arg)=>changed.has(arg.row)?{background:'rgb(255, 226, 173)'}:{}"
      >
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="真实姓名" prop="personName"></el-table-column>
        <el-table-column label="科室">
          <template #default="scope">
            <el-select v-model="scope.row.office" @change="changed.add(scope.row)">
              <el-option v-for="(item,index) in office" :key="index" :label="item" :value="index"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="角色">
          <template #default="scope">
            <el-select v-model="scope.row.role" @change="changed.push(scope.row)">
              <el-option v-for="(item,index) in role" :key="index" :label="item" :value="index"></el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </table-shower>
</template>

<script lang="ts">
import Vue from "vue";
import TableShower from "./TableShower.vue";
import {
  Table as ElTable,
  TableColumn as ElTableColumn,
  Select as ElSelect,
  Option as ElOption
} from "element-ui";
type TableData = {
  id: number;
  username: string;
  personName: string;
  office: number;
  role: number;
};
export default Vue.extend({
  data() {
    return {
      changed: new Set() as Set<TableData>,
      role: [] as string[],
      office: [] as string[],
      tableData: [] as TableData[]
    };
  },
  methods: {
    loadSuccessedHandle(obj: {
      role: string[];
      office: string[];
      table: TableData[];
    }) {
      this.role = obj.role;
      this.office = obj.office;
      this.tableData = obj.table;
    },
    submitChange() {
      this.changed.clear();
      this.$forceUpdate();
    }
  },
  components: {
    ElTable,
    ElTableColumn,
    ElSelect,
    ElOption,
    TableShower
  }
});
</script>
