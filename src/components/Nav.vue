<template>
  <div>
    <ul class="am-nav">
      <li v-for="(n,i) in items" :key="i" :class="{'am-nav-divider':n.type==='divider'}">
        <template v-if="n.type==='item'">
            <router-link :to="n.path">{{n.label}}</router-link>
        </template>
      </li>
    </ul>
  </div>
</template>
<style lang="less" scoped>
.am-nav {
  flex-grow: 1;
  align-items: stretch;
  :first-child {
    margin-top: 1em;
  }
}
</style>

<script lang="ts">
import Vue from "vue";
export type Args = (Item | Divider)[];
export class Item {
  public type: string = "item";
  constructor(public label: string, public path: string) {}
}
export class Divider {
  public type: string = "divider";
}
export default Vue.extend({
  props: {
    items: Array,
  }
});
</script>
