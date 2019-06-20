<template>
  <table-shower id="loading">
    <template #panel-head="scope">
      <span style="flex-grow:1"></span>
      <button type="button" class="am-btn am-btn-primary am-round" @click="submitChange">提交修改</button>
    </template>
    <template #default="scope">
      <el-table
        id="loading"
        :data="$store.getters.persons"
        :row-style="(arg)=>changed.has(arg.row)?{background:'rgb(255, 226, 173)'}:{}"
      >
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="真实姓名" prop="name"></el-table-column>
        <el-table-column label="科室">
          <template #default="scope">
            <el-select v-model="scope.row.officeId" @change="changed.add(scope.row)">
              <el-option label="未指定" :value="-1"></el-option>
              <el-option
                v-for="item in $store.getters.offices"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="角色">
          <template #default="scope">
            <el-select v-model="scope.row.roleId" @change="changed.add(scope.row)">
              <el-option label="未审核" :value="-1"></el-option>
              <el-option
                v-for="item in $store.getters.roles"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
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
import { Person } from "@/types/index";
import { loadBeforeMounted } from "@/components/mixin";
import { putData, loadData } from "@/store";
import { Loading } from "element-ui";
export default Vue.extend({
  mixins: [loadBeforeMounted("#loading", "persons", "offices", "roles")],
  data() {
    return {
      changed: new Set() as Set<Person>
    };
  },
  methods: {
    async submitChange() {
      let loading = Loading.service({ target: "#loading" });
      await putData("persons", new Array(...this.changed));
      await loadData(["persons"]);
      this.changed = new Set() as Set<Person>;
      loading.close();
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
