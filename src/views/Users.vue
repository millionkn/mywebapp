<template>
  <div class="root">
    <div class="am-panel am-panel-secondary">
      <div class="am-panel-hd">
        <span></span>
        <button type="button" class="am-btn am-btn-primary am-round" @click="submitChange">提交修改</button>
      </div>
      <div class="am-panel-bd">
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
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.root {
  > .am-panel {
    > .am-panel-hd {
      display: flex;
      flex-direction: row;
      > span {
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
  Loading,
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
    submitChange() {
      this.changed.clear();
      this.$forceUpdate();
    }
  },
  components: { ElTable, ElTableColumn, ElSelect, ElOption },
  async mounted() {
    let loading = Loading.service({
      target: <HTMLElement>(<Vue>this.$refs["table"]).$el
    });
    let data = (await axios.get("/data/users")).data;
    this.role = data.role;
    this.office = data.office;
    this.tableData = data.table;
    loading.close();
  }
});
</script>
