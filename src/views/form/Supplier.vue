<template>
  <form-shower>
    <template #head>
      <span>编辑供应商</span>
    </template>
    <template #default>
      <form @submit.prevent="submitHandle">
        <div class="am-input-group am-input-group-secondary">
          <span>名称</span>
          <input
            v-model="object.name"
            name="name"
            type="text"
            class="am-form-field"
            placeholder="供应商名称"
          >
        </div>
        <br>
        <div class="am-input-group am-input-group-secondary">
          <span>营业执照编号</span>
          <input
            v-model="object.businessLicense"
            name="name"
            type="text"
            class="am-form-field"
            placeholder="营业执照编号"
          >
        </div>
        <br>
        <div class="am-input-group am-input-group-secondary">
          <span>医疗器械经营许可证编号</span>
          <input
            v-model="object.medicalDeviceBusinessLicense"
            name="name"
            type="text"
            class="am-form-field"
            placeholder="营业执照编号"
          >
        </div>
        <br>
        <button class="am-btn am-btn-secondary" type="submit">提交</button>
      </form>
    </template>
  </form-shower>
</template>
<script lang="ts">
import Vue from "vue";
import axios from "axios";
import { Loading } from "element-ui";
import FormShower from "@/components/FormShower.vue";
import { putData } from "@/store";
export default Vue.extend({
  components: {
    FormShower
  },
  props: {
    object: {
      type: Object
    }
  },
  methods: {
    async submitHandle() {
      let loading = Loading.service({ target: this.$el as HTMLElement });
      if (this.object === undefined) {
        await axios.post(`/restAPI/Suppliers`, this.object);
      } else {
        await putData("suppliers", [this.object]);
      }
      loading.close();
      this.$router.back();
    }
  }
});
</script>
