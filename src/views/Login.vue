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
          <input type="text" class="am-form-field" placeholder="Username">
        </div>
        <br>
        <div class="am-input-group am-input-group-secondary">
          <span class="am-input-group-label">
            <i class="am-icon-lock am-icon-fw"></i>
          </span>
          <input type="password" class="am-form-field" placeholder="Password">
        </div>
        <div class="save-me">
          <div class="am-checkbox">
            <label>
              <input type="checkbox">记住密码
            </label>
          </div>
          <button type="button" class="am-btn am-btn-secondary">登录</button>
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
        margin-top:1em;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>