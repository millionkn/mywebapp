import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import "amazeui/less/amazeui.less";
import "amazeui/dist/css/amazeui.css";
import 'element-ui/lib/theme-chalk/index.css';
import env from './env';
env.then(() => {
  Vue.config.productionTip = false;
  new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('#app')
})

