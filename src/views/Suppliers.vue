<template>
  <div class="suppliers">
    <div class="am-panel am-panel-secondary">
      <div class="am-panel-hd">
        <div class="am-input-group search">
          <input type="text" class="am-form-field" v-model="supplierName">
          <span class="am-input-group-btn">
            <button class="am-btn am-btn-default" type="button">
              <span class="am-icon-search"/>
            </button>
          </span>
        </div>
        <div class="am-btn-group">
          <button type="button" class="am-btn am-btn-danger am-round" @click="delectSuppliers">删除</button>
        </div>
      </div>
      <div class="am-panel-bd">
        <el-table
          :data="tableData.filter(supplier=>supplier.name.includes(supplierName))"
          @selection-change="(arg)=>selected=arg"
          id="table"
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
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.suppliers {
  > .am-panel {
    > .am-panel-hd {
      display: flex;
      flex-direction: row;
      > .am-input-group {
        flex-grow: 1;
      }
    }
  }
}
</style>
<script lang="ts">
import Vue from "vue";
import axios from "axios";
import {
  Table as ElTable,
  TableColumn as ElTableColumn,
  Loading
} from "element-ui";
type Supplier = Record<
  "id" | "name" | "businessLicense" | "medicalDeviceBusinessLicense",
  string
>;
export default Vue.extend({
  components: { ElTable, ElTableColumn },
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
  },
  async mounted() {
    let loading = Loading.service({ target: "#table" });
    this.tableData = (await axios.get("/data/suppliers")).data;
    loading.close();
  }
});
</script>
