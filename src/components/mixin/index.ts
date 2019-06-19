import { Loading as ElLoading, Loading } from 'element-ui';
import { KeysType, loadData } from '@/store';
import { ComponentOptions } from 'vue/types/options';
import Vue from 'vue';
export function loadBeforeMounted(target: string, ...args: KeysType[]): ComponentOptions<Vue> {
  return {
    async mounted() {
      let loading = Loading.service({ target })
      await loadData(args);
      loading.close();
    },
  }
}