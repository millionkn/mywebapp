<template>
  <table-shower @successed="(data)=>tableData=data" table-data-url="/restAPI/users">
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
            <el-select v-model="scope.row.officeId" @change="changed.add(scope.row)">
              <el-option label="未指定" :value="-1"></el-option>
              <el-option v-for="item in offices" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="角色">
          <template #default="scope">
            <el-select v-model="scope.row.roleId" @change="changed.add(scope.row)">
              <el-option label="未审核" :value="-1"></el-option>
              <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </table-shower>
</template>

<script lang="ts">
import Vue from "vue";
import TableShower from "@/components/TableShower.vue";
import {
  Table as ElTable,
  TableColumn as ElTableColumn,
  Select as ElSelect,
  Option as ElOption
} from "element-ui";
import axios from "axios";
type User = {
  id: number;
  username: string;
  name: string;
  officeId: number;
  roleId: number;
};
type Office = {
  id: number;
  name: string;
};
type Role = Office;
export default Vue.extend({
  data() {
    return {
      changed: new Set() as Set<User>,
      tableData: [] as User[],
      roles: [] as Role[],
      offices: [] as Office[]
    };
  },
  methods: {
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
  },
  async mounted() {
    this.roles = (await axios.get("/restAPI/roles")).data;
    this.offices = (await axios.get("/restAPI/offices")).data;
  }
});
</script>
