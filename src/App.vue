<template>
  <div class="global">
    <div class="header am-topbar-inverse">
      <logo/>
      <span style="flex-grow:1"/>
      <logo/>
    </div>
    <div class="body">
      <div class="aside">
        <ul class="am-nav">
          <li><router-link to="/">控制台</router-link></li>
          <li class="am-nav-divider"></li>
          <!-- 管理员功能 -->
          <li><router-link to="/users">用户管理</router-link></li>
          <li><router-link to="/suppliers">供应商管理</router-link></li>
          <li><router-link to="/offices">科室管理</router-link></li>
          <li class="am-nav-divider"></li>
          <!-- 特定人员功能 -->
          <li><router-link to="/drivers">设备</router-link></li>
        </ul>
      </div>
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
        <router-view style="padding:6px;display:flex"/>
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
      >.am-nav{
        #flex-full;
        align-items:stretch;
        :first-child{
          margin-top:1em;
        }
      }
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
export default Vue.extend({
  components: {
    elContainer,
    elHeader,
    elAside,
    Logo,
  },
  computed:{
    breadcrumbTltles(){
      const ret:Array<any> = this.$route.matched.map((r)=>r.meta.breadcrumbTltle);
      return ret;
    }
  }
});
</script>
