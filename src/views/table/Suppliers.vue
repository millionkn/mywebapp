<template>
  <table-shower :dataNameArray="['suppliers']">
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
        :data="$store.state.data.suppliers.filter(supplier=>supplier.name.includes(supplierName))"
        @selection-change="(arg)=>selected=arg"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="经销商名称" prop="name"></el-table-column>
        <el-table-column label="营业执照编号" prop="businessLicense"></el-table-column>
        <el-table-column label="医疗器械经营许可证编号" prop="medicalDeviceBusinessLicense"></el-table-column>
        <el-table-column label="编辑">
          <template #default="scope">
            <button type="button" class="am-btn am-btn-primary am-round">编辑</button>
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
type Supplier = Record<
  "id" | "name" | "businessLicense" | "medicalDeviceBusinessLicense",
  string
>;
export default Vue.extend({
  components: { ElTable, ElTableColumn, TableShower },
  data() {
    return {
      tableData: [] as Supplier[],
      supplierName: "",
      selected: [] as Supplier[]
    };
  },
  methods: {
    delectSuppliers() {
      this.tableData = this.tableData.filter(
        supplier => !this.selected.includes(supplier)
      );
      this.selected.splice(0, this.selected.length);
    }
  }
});
</script>
