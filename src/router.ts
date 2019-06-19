import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'
import Empty from "@/components/Empty.vue";
import { KeysType, loadSingle } from './store';
Vue.use(Router);
function pack(type: KeysType, table: RouteConfig['component'], form: RouteConfig['component']) {
  let editing: any;
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
      async beforeEnter(to, from, next) {
        try {
          editing = await loadSingle(type, Number.parseInt(to.params.id));
        } catch{
          editing = undefined
        }
        next();
      },
      props(route) {
        return {
          object: editing
        }
      },
      meta: {},
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
      path: "/",
      component: Empty,
      meta: {
        breadcrumbTltle: "管理",
      },
      children: [
        {
          path: "/",
          redirect: "/Drivers",
        },
        {
          path: 'Drivers',
          component: () => import('@/views/table/Drivers.vue'),
          meta: {
            breadcrumbTltle: "设备管理",
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
          children: pack("suppliers", () => import("@/views/table/Suppliers.vue"), () => import("@/views/form/Supplier.vue"))
        },
        {
          path: "Offices",
          component: () => import('@/views/table/Offices.vue'),
          meta: {
            breadcrumbTltle: "科室",
          }
        },
      ],
    },
  ]
})
