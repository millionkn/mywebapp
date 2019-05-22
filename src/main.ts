import Vue from 'vue';
import App from './App.vue';
import router from './router';
import "amazeui/less/amazeui.less";
import "amazeui/dist/css/amazeui.css";
import 'element-ui/lib/theme-chalk/index.css';
import './env.ts';
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
