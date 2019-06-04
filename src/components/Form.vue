<template>
  <form class="am-panel-bd" @submit.prevent="submit" ref="ref">
    <template v-for="(item,index) in items">
      <div class="am-input-group am-input-group-secondary" :key="item.name">
        <span class="am-input-group-label">
          <i :class="[item.icon,'am-icon-fw']"></i>
        </span>
        <input :name="item.name" :type="item.type" class="am-form-field" :placeholder="item.label">
      </div>
      <br v-if="index<=items.length-1"  :key="item.name+'_br'">
    </template>
    <slot></slot>
  </form>
</template>
<script lang="ts">
export type Item = {
  icon: string | undefined;
  type: "text" | "password";
  label: string | undefined;
  name: string;
};
import Vue from "vue";
export default Vue.extend({
  props:['items'],
  methods:{
    submit(){
      let arg:any={};
      (<Item[]>this.items).map((obj)=>obj.name).forEach(name => {
        arg[name] = (<HTMLInputElement>((<any>this.$refs['ref'])[name]).value)
      });
      this.$emit("submit",arg);
    }
  }
});
</script>
