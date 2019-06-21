<template>
  <div>
    <span v-if="user">
      <span>[{{$store.getters.roles[user.roleId].name}}]</span>
      <span>{{user.name}}</span>
      <span @click="logout">
        <a href="#">退出</a>
      </span>
    </span>
    <span v-else>
      请
      <router-link to="/Login">
        <a href="#">登录</a>
      </router-link>
    </span>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { loadBeforeMounted } from "@/components/mixin";
export default Vue.extend({
  mixins: [loadBeforeMounted("#loading", "roles")],
  computed: {
    ...mapState(["user"])
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
});
</script>
