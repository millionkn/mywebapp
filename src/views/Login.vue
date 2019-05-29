<template>
  <div class="root">
    <div class="am-panel am-panel-default">
      <header class="am-panel-hd">
        <h3 class="am-panel-title">登录</h3>
      </header>
      <form class="am-panel-bd" @submit.prevent="login" ref="loadingFrom">
        <div class="am-input-group am-input-group-secondary">
          <span class="am-input-group-label">
            <i class="am-icon-user am-icon-fw"></i>
          </span>
          <input v-model="username" type="text" class="am-form-field" placeholder="Username">
        </div>
        <br>
        <div class="am-input-group am-input-group-secondary">
          <span class="am-input-group-label">
            <i class="am-icon-lock am-icon-fw"></i>
          </span>
          <input v-model="password" type="password" class="am-form-field" placeholder="Password">
        </div>
        <div class="save-me">
          <div class="am-checkbox">
            <label>
              <input type="checkbox" v-model="savePassword">记住密码
            </label>
          </div>
          <button class="am-btn am-btn-secondary" type="submit">登录</button>
        </div>
      </form>
    </div>
  </div>
</template>
<style lang="less" scoped>
.root {
  display: block;
  justify-content: center;
  align-items: center;
  > .am-panel {
    > .am-panel-bd {
      > .save-me {
        margin-top: 1em;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
<script lang="ts">
import Vue from "vue";
import {Loading} from 'element-ui';
export default Vue.extend({
  data() {
    return {
      savePassword:<true|false>false,
      username: <string | undefined>undefined,
      password: <string | undefined>undefined
    };
  },
  methods: {
    async login() {
      let loading = Loading.service({
        'target':<HTMLElement>this.$refs.loadingFrom
      })
      await this.$store
        .dispatch("login", {
          username: this.username,
          password: this.password
        })
        .then(() => this.$router.back());
      loading.close();
    }
  }
});
</script>
