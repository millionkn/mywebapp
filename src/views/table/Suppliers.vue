<template>
  <table-shower id="loading">
    <template #panel-head>
      <div class="am-input-group">
        <input type="text" class="am-form-field" v-model="supplierName">
        <span class="am-input-group-btn">
          <button class="am-btn am-btn-default" type="button">
            <span class="am-icon-search"/>
          </button>
        </span>
      </div>
      <span style="flex:1"></span>
      <div class="am-btn-group">
        <button type="button" class="am-btn am-btn-danger am-round" @click="delectSuppliers">删除</button>
      </div>
    </template>
    <template #default>
      <el-table
        :data="$store.getters.suppliers.filter(supplier=>supplier.name.includes(supplierName))"
        @selection-change="(arg)=>selected=arg"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="经销商名称" prop="name"></el-table-column>
        <el-table-column label="营业执照编号" prop="businessLicense"></el-table-column>
        <el-table-column label="医疗器械经营许可证编号" prop="medicalDeviceBusinessLicense"></el-table-column>
        <el-table-column label="编辑">
          <template #default="scope">
            <button
              type="button"
              class="am-btn am-btn-primary am-round"
              @click="$router.push(`Suppliers/${scope.row.id}`)"
            >编辑</button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </table-shower>
</template>
<script lang="ts">
import Vue from "vue";
import TableShower from "@/components/TableShower.vue";
import { Table as ElTable, TableColumn as ElTableColumn } from "element-ui";
import { Supplier } from "@/types";
import { loadBeforeMounted } from "@/components/mixin";
import { Loading } from "element-ui";
import { deleteData, loadData } from "@/store";
export default Vue.extend({
  mixins: [loadBeforeMounted("#loading", "suppliers")],
  components: { ElTable, ElTableColumn, TableShower },
  data() {
    return {
      supplierName: "",
      selected: [] as Supplier[]
    };
  },
  methods: {
    async delectSuppliers() {
      let loading = Loading.service({});
      await deleteData("suppliers", this.selected);
      await loadData(["suppliers"]);
      this.selected = [];
      loading.close();
    }
  }
});
</script>
