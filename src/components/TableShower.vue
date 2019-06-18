<template>
  <div class="am-panel am-panel-secondary">
    <div class="am-panel-hd">
      <slot name="panel-head"></slot>
    </div>
    <div class="am-panel-bd" id="loading">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
.am-panel {
  display: flex;
  flex-direction: column;
  > .am-panel-hd {
    display: flex;
    flex-direction: row;
  }
  > .am-panel-bd {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>
<script lang="ts">
import Vue from "vue";
import axios from "axios";
import { Loading } from "element-ui";
export default Vue.extend({
  props: ["dataNameArray"],
  async mounted() {
    let loading = Loading.service({ target: "#loading" });
    try {
      await Promise.all(
        (this.dataNameArray as string[]).map(name =>
          this.$store.dispatch("loadData", { name })
        )
      );
    } catch (e) {
      this.$emit("failed", e);
    } finally {
      loading.close();
    }
  }
});
</script>

