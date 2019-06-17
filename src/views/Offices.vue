<template>
  <table-shower @successed="(data)=>tableData=data" table-data-url="/restAPI/offices">
    <template #panel-head>
      <span style="flex-grow:1"></span>
      <div class="am-btn-group">
        <button type="button" class="am-btn am-btn-primary am-round">添加</button>
        <button type="button" class="am-btn am-btn-danger am-round">删除</button>
      </div>
    </template>
    <template #default>
      <el-table :data="tableData">
        <el-table-column label="部门名称" prop="name"></el-table-column>
        <el-table-column label="主任">
          <template #default="scope">{{(users[scope.row.userId]||{name:"未指定"}).name}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <div class="am-btn-group">
              <button type="button" class="am-btn am-btn-primary am-round">编辑</button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </table-shower>
</template>
<script lang="ts">
import Vue from "vue";
import {
  Table as ElTable,
  TableColumn as ElTableColumn,
  Select as ElSelect,
  Option as ElOption
} from "element-ui";
import TableShower from "@/components/TableShower.vue";
import axios from "axios";
type Office = {
  id: number;
  name: string;
  userId: number;
};
export default Vue.extend({
  components: {
    ElTable,
    ElTableColumn,
    TableShower,
    ElSelect,
    ElOption
  },
  data() {
    return {
      tableData: [] as Office[],
      users: [] as { id: number; name: string }[]
    };
  },
  async mounted() {
    this.users = (await axios.get("restAPI/users")).data;
  }
});
</script>
