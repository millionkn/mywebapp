import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'
import Empty from "@/components/Empty.vue";
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
      path: "-1",
      component: form,
      props: (router) => ({
        id: -1,
      }),
      meta: {
        breadcrumbTltle: "添加",
      },
    },
    {
      path: ":id",
      component: form,
      props: (router) => ({
        id: Number.parseInt(router.params.id),
      }),
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
          children: pack(() => import("@/views/table/Suppliers.vue"), () => import("@/views/form/Supplier.vue"))
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
