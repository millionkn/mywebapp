<template>
  <div class="am-panel am-panel-secondary">
    <div class="am-panel-hd">
      <slot name="panel-head"></slot>
    </div>
    <div class="am-panel-bd">
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
export default Vue.extend({});
</script>

