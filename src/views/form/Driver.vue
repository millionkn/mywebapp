<template>
  <form-shower>
    <template #head>
      <span>编辑设备</span>
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
            placeholder="设备名称"
          >
        </div>
        <div class="am-input-group am-input-group-secondary">
          <span>科室</span>
          <div>
            <el-select v-model="object.officeId" filterable>
              <el-option label="未指定" :value="-1"></el-option>
              <el-option
                v-for="item in $store.getters.offices"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="am-input-group am-input-group-secondary">
          <span>购买日期</span>
          <el-date-picker v-model="object.buyDate" placeholder="选择购买日期" value-format="timestamp"></el-date-picker>
        </div>
        <div class="am-input-group am-input-group-secondary">
          <span>检修周期(天)</span>
          <el-input-number v-model="object.inspectionTimes" :min="1"></el-input-number>
        </div>
        <div class="am-input-group am-input-group-secondary">
          <span>提前预警(天)</span>
          <el-input-number
            v-model="object.line"
            placeholder="不能超过检修周期"
            :max="object.inspectionTimes"
            :min="0"
          ></el-input-number>
        </div>
        <div class="am-input-group am-input-group-secondary">
          <span>设备说明</span>
          <el-input type="textarea" placeholder="请输入内容" v-model="object.extra" show-word-limit></el-input>
        </div>
        <br>
        <button class="am-btn am-btn-secondary" type="submit">提交</button>
      </form>
    </template>
  </form-shower>
</template>
<script lang="ts">
import Vue from "vue";
import {
  Select as ElSelect,
  Option as ElOption,
  DatePicker as ElDatePicker,
  InputNumber as ElInputNumber,
  Input as ElInput
} from "element-ui";

import FormShower from "@/components/FormShower.vue";
import {
  haveSubmitHandle,
  loadBeforeMounted,
  loadingSingleByRouter
} from "@/components/mixin";
import { Driver } from "../../types";
export default Vue.extend({
  mixins: [
    loadingSingleByRouter("drivers", "object", {
      target: "#loading",
      default: {
        buyDate: new Date().valueOf(),
        officeId: -1,
        inspectionTimes: 1,
        line: 0,
        test: 456
      }
    }),
    loadBeforeMounted("#loading", "offices"),
    haveSubmitHandle("drivers", "object", "submitHandle")
  ],
  components: {
    FormShower,
    ElSelect,
    ElOption,
    ElDatePicker,
    ElInputNumber,
    ElInput
  }
});
</script>