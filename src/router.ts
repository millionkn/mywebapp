import Vue from 'vue'
import Router from 'vue-router'
import Empty from "@/components/Empty.vue";

Vue.use(Router);
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      component: () => import('./views/Login.vue'),
      meta: {
        breadcrumbTltle: "登录",
      },
    },
    {
      path: "/",
      component: Empty,
      meta: {
        breadcrumbTltle: "管理",
      },
      children: [
        {
          path: "/",
          redirect: "/drivers",
        },
        {
          path: 'drivers',
          component: () => import('./views/table/Drivers.vue'),
          meta: {
            breadcrumbTltle: "设备管理",
          },
        },
        {
          path: "persons",
          component: () => import('@/views/table/Persons.vue'),
          meta: {
            breadcrumbTltle: "用户",
          }
        },
        {
          path: "suppliers",
          component: () => import('@/views/table/Suppliers.vue'),
          meta: {
            breadcrumbTltle: "供应商",
          }
        },
        {
          path: "offices",
          component: () => import('@/views/table/Offices.vue'),
          meta: {
            breadcrumbTltle: "科室",
          }
        },
      ],
    },
  ]
})
