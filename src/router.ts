import Vue from 'vue'
import Router from 'vue-router'
import Empty from "@/components/Empty.vue";

Vue.use(Router);
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: ()=>import('./views/Home.vue'),
      meta:{
        breadcrumbTltle:"控制台",
      },
    },
    {
      path:"/",
      component:Empty,
      meta:{
        breadcrumbTltle:"管理",
      },
      children:[
        {
          path:"users",
          component:()=>import('./views/Users.vue'),
          meta:{
            breadcrumbTltle:"用户",
          }
        },
      ],
    },
  ]
})
