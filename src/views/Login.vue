<template>
  <div class="root">
    <div class="am-panel am-panel-default">
      <header class="am-panel-hd">
        <h3 class="am-panel-title">登录</h3>
      </header>
      <div class="am-panel-bd">
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
                <input type="checkbox">记住密码
              </label>
            </div>
            <button class="am-btn am-btn-secondary" @click="login">登录</button>
          </div>
      </div>
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
export default Vue.extend({
  data(){
    return{
      username:<string|undefined>undefined,
      password:<string|undefined>undefined,
    };
  },
  methods: {
    login() {
      this.$store.dispatch('login',{
        username:this.username,
        password:this.password,
      }).then(()=>this.$router.back());
    }
  }
});
</script>
