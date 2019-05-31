<template>
  <div class="global">
    <div class="header am-topbar-inverse">
      <logo/>
      <span style="flex-grow:1"/>
      <user/>
    </div>
    <div class="body">
      <my-nav class="aside" :items="navs"></my-nav>
      <div class="body">
        <ol class="am-breadcrumb">
          <li v-for="(title,index) in breadcrumbTltles" :key="index">
            <a href="#"
              :class="{
                'am-active':breadcrumbTltles.length==index+1,
              }"
            >
              {{title}}
            </a>
          </li>
        </ol>
        <router-view style="padding:6px;display:flex;height:100%"/>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
#flex-full{
  flex-grow:1;
}
#flex-container{
  display:flex;
}
.global{
  #flex-container;
  flex-direction:column;
  height:100%;
  >.header{
    padding:15px;
    height:60px;
    #flex-container
  }
  >.body{
    #flex-full;
    #flex-container;
    flex-direction:row;
    >.aside{
      background-color:#ebebeb;
      border-right:1px solid #cecece;
      width:240px;
      #flex-container;
    }
    >.body{
      #flex-full;
      #flex-container;
      flex-direction:column;
      
      >.am-breadcrumb{
        height:3em;
        background-color:#ebebeb;
        margin:0;
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
  Aside as elAside,
} from "element-ui";
import Logo from '@/components/logo.vue';
import User from '@/components/User.vue';
import MyNav from '@/components/Nav.vue';
import {
  Args as NavArgs,
  Item,Divider,
} from '@/components/Nav.vue';
export default Vue.extend({
  data(){
    return {
      navs:<NavArgs>[
        new Item('控制台','/'),
        new Divider(),
        new Item('用户管理','/users'),
        new Item('供应商管理','/suppliers'),
        new Item('科室管理','/offices'),
        new Divider(),
        new Item('设备管理','/drivers'),
      ],
    };
  },
  components: {
    elContainer,
    elHeader,
    elAside,
    Logo,
    User,
    MyNav,
  },
  computed:{
    breadcrumbTltles(){
      const ret:Array<any> = this.$route.matched.map((r)=>r.meta.breadcrumbTltle);
      return ret;
    }
  }
});
</script>
