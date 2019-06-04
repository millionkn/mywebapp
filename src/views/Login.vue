<template>
  <contioner>
    <div class="am-panel am-panel-default">
      <header class="am-panel-hd">
        <h3 class="am-panel-title">登录</h3>
      </header>
      <my-form :items="items" @submit="login" ref="loading" id="test">
        <div class="save-me">
          <div class="am-checkbox">
            <label>
              <input type="checkbox" v-model="savePassword">记住密码
            </label>
          </div>
          <button class="am-btn am-btn-secondary" type="submit">登录</button>
        </div>
      </my-form>
    </div>
  </contioner>
</template>
<style lang="less" scoped>
.save-me {
  margin-top: 1em;
  display: flex;
  justify-content: flex-end;
}
</style>
<script lang="ts">
import Vue from "vue";
import { Loading } from "element-ui";
import { Item } from "@/components/Form.vue";

export default Vue.extend({
  components: {
    contioner: () => import("@/components/Contioner.vue"),
    myForm: () => import("@/components/Form.vue"),
  },
  data() {
    return {
      savePassword: <true | false>false,
      items: <Item[]>[
        {
          icon: "am-icon-user",
          type: "text",
          label: "用户名",
          name: "username"
        },
        {
          icon: "am-icon-lock",
          type: "password",
          label: "密码",
          name: "password"
        }
      ]
    };
  },
  methods: {
    async login(formData: any) {
      let loading = Loading.service({
        target: <HTMLElement>(<Vue>this.$refs["loading"]).$el
      });
      await this.$store.dispatch("login", formData);
      this.$router.back();
      loading.close();
    }
  }
});
</script>
