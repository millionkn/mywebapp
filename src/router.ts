import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'
import Empty from "@/components/Empty.vue";
import { KeysType, loadSingle } from './store';
Vue.use(Router);
function pack(table: RouteConfig['component'], form: RouteConfig['component']) {
  return [
    {
      path: "",
      component: table,
      meta: {
        breadcrumbTltle: "概览",
      },
    },
    {
      path: ":id",
      component: form,
      meta: {
        breadcrumbTltle: "编辑",
      },
    },
  ] as RouteConfig[]
}
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/Login",
      component: () => import('@/views/Login.vue'),
      meta: {
        breadcrumbTltle: "登录",
      },
    },
    {
      path: "",
      component: Empty,
      meta: {
        breadcrumbTltle: "管理",
      },
      children: [
        {
          path: '',
          component: () => import('@/views/Console.vue'),
          meta: {
            breadcrumbTltle: "控制台",
          },
        },
        {
          path: "Persons",
          component: () => import('@/views/table/Persons.vue'),
          meta: {
            breadcrumbTltle: "用户",
          }
        },
        {
          path: "Suppliers",
          component: Empty,
          meta: {
            breadcrumbTltle: "供应商",
          },
          children: pack(() => import("@/views/table/Suppliers.vue"), () => import("@/views/form/Supplier.vue"))
        },
        {
          path: "Offices",
          component: Empty,
          meta: {
            breadcrumbTltle: "科室",
          },
          children: pack(() => import('@/views/table/Offices.vue'), () => import('@/views/form/Office.vue'))
        },
        {
          path: "Drivers",
          component: Empty,
          meta: {
            breadcrumbTltle: "设备",
          },
          children: pack(() => import('@/views/table/Drivers.vue'), () => import('@/views/form/Driver.vue')),
        },
        {
          path: "Logs",
          component: () => import('@/views/table/Logs.vue'),
          meta: {
            breadcrumbTltle: "日志",
          },
        },
      ],
    },
  ]
})
