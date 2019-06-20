<template>
  <form-shower>
    <template #head>
      <span>编辑科室</span>
    </template>
    <template #default>
      <form @submit.prevent="submitHandle">
        <div class="am-input-group am-input-group-secondary">
          <span>名称</span>
          <input
            v-model="object.name"
            name="name"
            type="text"
            class="am-form-field"
            placeholder="科室名称"
          >
        </div>
        <div class="am-input-group am-input-group-secondary">
          <span>主任</span>
          <div>
            <el-select v-model="object.personId" filterable>
              <el-option label="未指定" :value="-1"></el-option>
              <el-option
                v-for="item in $store.getters.persons"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </div>
        <br>
        <button class="am-btn am-btn-secondary" type="submit">提交</button>
      </form>
    </template>
  </form-shower>
</template>
<script lang="ts">
import Vue from "vue";
import { Select as ElSelect, Option as ElOption } from "element-ui";

import FormShower from "@/components/FormShower.vue";
import {
  haveSubmitHandle,
  loadBeforeMounted,
  loadingSingleByRouter
} from "@/components/mixin";
export default Vue.extend({
  mixins: [
    loadingSingleByRouter("offices", "object", "#loading"),
    loadBeforeMounted("#loading", "persons"),
    haveSubmitHandle("offices", "object", "submitHandle")
  ],
  components: {
    FormShower,
    ElSelect,
    ElOption
  }
});
</script>