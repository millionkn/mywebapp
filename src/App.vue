<template>
  <div class="global">
    <div class="header am-topbar-inverse">
      <button class="am-show-sm-only">test</button>
      <logo/>
      <user/>
    </div>
    <div class="body am-scrollable-horizontal">
      <my-nav class="aside am-hide-sm-only" :items="navs"></my-nav>
      <div class="body am-scrollable-vertical">
        <ol class="am-breadcrumb am-hide-sm-only">
          <li v-for="(title,index) in breadcrumbTltles" :key="index">
            <a
              href="#"
              :class="{
                'am-active':breadcrumbTltles.length==index+1,
              }"
            >{{title}}</a>
          </li>
        </ol>
        <router-view class="view"/>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "amazeui/less/variables.less";
#flex-full {
  flex-grow: 1;
}
#flex-container {
  display: flex;
}
.global {
  #flex-container;
  flex-direction: column;
  height: 100%;
  > .header {
    padding: 15px;
    height: 60px;
    #flex-container;
    justify-content: space-between;
  }
  > .body {
    #flex-full;
    #flex-container;
    flex-direction: row;
    > .aside {
      background-color: #ebebeb;
      border-right: 1px solid #cecece;
      width: 240px;
      #flex-container;
    }
    > .body {
      #flex-full;
      #flex-container;
      flex-direction: column;
      height: 100%;
      > .am-breadcrumb {
        height: 3em;
        background-color: #ebebeb;
        margin: 0;
      }
      > .view {
        padding: 6px;
        @media @small-only {
          padding: 0;
        }
        display: flex;
        height: 100%;
        flex-direction: column;
      }
    }
  }
}
</style>

<script lang="ts">
import Vue from "vue";
import {
  Container as elContainer,
  Header as elHeader,
  Aside as elAside
} from "element-ui";
import Logo from "@/components/logo.vue";
import User from "@/components/User.vue";
import MyNav from "@/components/Nav.vue";
import { Args as NavArgs, Item, Divider } from "@/components/Nav.vue";
import { Route } from "vue-router";
export default Vue.extend({
  data() {
    return {
      navs: <NavArgs>[
        new Item("控制台", "/"),
        new Divider(),
        new Item("人员管理", "Persons"),
        new Item("供应商管理", "/Suppliers"),
        new Item("科室管理", "/Offices")
      ]
    };
  },
  components: {
    elContainer,
    elHeader,
    elAside,
    Logo,
    User,
    MyNav
  },
  computed: {
    breadcrumbTltles() {
      let route = this.$route as Route; //迷之问题，放在一行就报错
      return route.matched
        .map(r => r.meta.breadcrumbTltle as string | undefined)
        .filter(str => str !== undefined);
    }
  }
});
</script>
