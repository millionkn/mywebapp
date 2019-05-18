<template>
  <div class="home">
    <div class="am-panel am-panel-secondary">
      <div class="am-panel-hd">
        <el-input placeholder="设备名称" v-model="driverName" class="input">
          <el-select v-model="office" slot="prepend" placeholder="科室" style="width:8em;">
            <el-option label="科室A" value="1"></el-option>
            <el-option label="科室B" value="2"></el-option>
            <el-option label="科室C" value="3"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <button type="button" class="am-btn am-btn-primary">添加</button>
        <button type="button" class="am-btn am-btn-primary">导出</button>
        <button type="button" class="am-btn am-btn-primary">导入</button>
      </div>
      <div class="am-panel-bd"></div>
    </div>
  </div>
</template>
<style lang="less" scoped>
#full {
  align-items: stretch;
}
.home {
  flex-grow: 1;
  flex-direction: column;
  > .am-panel {
    flex-grow: 1;
    > .am-panel-hd {
      display: flex;
      flex-direction: row;
      > .input {
        flex-grow: 1;
      }
    }
  }
}
</style>

<script lang="ts">
import Vue from "vue";
import {
  Select as ElSelect,
  Option as ElOption,
  Input as ElInput,
  Button as ElButton,
} from "element-ui";
export default Vue.extend({
  components: {
    ElSelect,
    ElOption,
    ElInput,
    ElButton,
  },
  data() {
    return {
      office: undefined,
      driverName: undefined,
    };
  }
});
</script>
