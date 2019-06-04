<template>
  <div class="center">
    <slot></slot>
  </div>
</template>
<style lang="less" scoped>
.center {
  display: block;
  justify-content: center;
  align-items: center;
}
</style>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    props:{
        full:Boolean,
    }
});
</script>
