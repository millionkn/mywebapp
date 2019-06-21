<template>
  <div class="contioner">
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
.contioner {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
}
</style>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    full: Boolean
  }
});
</script>
