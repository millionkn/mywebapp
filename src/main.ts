import "amazeui/dist/css/amazeui.css";
import "amazeui/less/amazeui.less";
import 'element-ui/lib/theme-chalk/index.css';
import 'reflect-metadata';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
Vue.config.productionTip = false;
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

