<template>
  <div class="global">
    <div class="header">
      <logo/>
      <span style="flex-grow:1"/>
      <logo/>
    </div>
    <div class="body">
      <div class="aside">

      </div>
      <div class="body">
        <ol class="am-breadcrumb">
          <li><a href="#">首页</a></li>
          <li><a href="#">分类</a></li>
          <li class="am-active">内容</li>
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
    background-color: cornflowerblue;
    padding:15px;
    height:60px;
    #flex-container
  }
  >.body{
    #flex-full;
    #flex-container;
    flex-direction:row;
    >.aside{
      background-color:lightslategrey;
      width:240px;
      #flex-container
    }
    >.body{
      #flex-full;
      .am-breadcrumb{
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
  }
});
</script>
