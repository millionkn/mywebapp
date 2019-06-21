<template>
  <form-shower>
    <template #head>
      <span>登录</span>
    </template>
    <template #default>
      <form @submit.prevent="submitHandle" id="loading">
        <div class="am-input-group am-input-group-secondary">
          <span class="am-input-group-label">
            <i class="am-icon-fw am-icon-user"></i>
          </span>
          <input type="text" v-model="object.username" class="am-form-field">
        </div>
        <br>
        <div class="am-input-group am-input-group-secondary">
          <span class="am-input-group-label">
            <i class="am-icon-fw am-icon-lock"></i>
          </span>
          <input type="password" v-model="object.password" class="am-form-field">
        </div>
        <br>
        <button class="am-btn am-btn-secondary" type="submit">提交</button>
      </form>
    </template>
  </form-shower>
</template>
<script lang="ts">
import Vue from "vue";
import FormShower from "@/components/FormShower.vue";
import { Loading, MessageBox } from "element-ui";
import axios from "axios";
import * as type from "@/types";
export default Vue.extend({
  components: {
    FormShower
  },
  data() {
    return { object: {} };
  },
  methods: {
    async submitHandle() {
      let loading = Loading.service({ target: "#loading" });
      try {
        await this.$store.dispatch("login", this.object);
        loading.close();
        this.$router.back();
      } catch (e) {
        loading.close();
        let text = "登录失败";
        try {
          text = e.response.data.message;
        } catch (e) {}
        await MessageBox.alert(text, "错误");
      }
    }
  }
});
</script>