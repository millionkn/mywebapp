<template>
  <contioner>
    <div class="am-panel am-panel-secondary">
      <div class="am-panel-hd">
        <slot name="head"></slot>
      </div>
      <div class="am-panel-bd" id="loading">
        <slot></slot>
      </div>
    </div>
  </contioner>
</template>
<script lang="ts">
import Vue from "vue";
import Contioner from "@/components/Contioner.vue";

export default Vue.extend({
  components: { Contioner }
});
</script>
