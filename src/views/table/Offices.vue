<template>
  <table-shower id="loading">
    <template #panel-head>
      <span style="flex-grow:1"></span>
      <div class="am-btn-group">
        <button
          type="button"
          class="am-btn am-btn-primary am-round"
          @click="$router.push(`Offices/-1`)"
        >添加</button>
        <button type="button" class="am-btn am-btn-danger am-round" @click="deleteHandle">删除</button>
      </div>
    </template>
    <template #default>
      <el-table :data="$store.getters.offices" @selection-change="(arg)=>selected=arg">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="部门名称" prop="name"></el-table-column>
        <el-table-column label="主任">
          <template
            #default="scope"
          >{{($store.getters.persons.find(person=>person.id===scope.row.personId)||{name:"未指定"}).name}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <div class="am-btn-group">
              <button
                type="button"
                class="am-btn am-btn-primary am-round"
                @click="$router.push(`Offices/${scope.row.id}`)"
              >编辑</button>
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
import { loadBeforeMounted, haveDeleteHandle } from "@/components/mixin";
export default Vue.extend({
  mixins: [
    loadBeforeMounted("#loading", "persons", "offices"),
    haveDeleteHandle("offices", "deleteHandle", "selected", "#loading")
  ],
  components: {
    ElTable,
    ElTableColumn,
    TableShower,
    ElSelect,
    ElOption
  },
  data() {
    return {
      selected: []
    };
  }
});
</script>
