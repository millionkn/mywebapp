import { Loading, MessageBox } from 'element-ui';
import {
  KeysType,
  loadData,
  postData,
  putData,
  OuterData,
  deleteData,
  loadSingle,
} from '@/store';
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
export function loadingSingleByRouter(type: KeysType, dataName: string, opt: { target?: string, default?: object }): ComponentOptions<Vue> {
  return {
    data() {
      return {
        [dataName]: opt.default || {}
      }
    },
    async mounted() {
      let loading;
      if (opt.target) {
        loading = Loading.service({ target: opt.target });
      }
      let data = {};
      try {
        data = await loadSingle(type, Number.parseInt((this as any).$router.currentRoute.params.id))
      } catch (e) {

      } finally {
        (this as any)[dataName] = Object.assign(opt.default || {}, data);
      }
      if (loading) {
        loading.close();
      }
    },
  }
}
export function haveSubmitHandle(type: KeysType, dataName: string, handleName: string): ComponentOptions<Vue> {
  return {
    methods: {
      async [handleName]() {
        let loading = Loading.service({ target: this.$el as HTMLElement });
        let object = (this as any)[dataName]
        try {
          if (object.id === undefined) {
            await postData(type, [object]);
          } else {
            await putData(type, [object]);
          }
          loading.close();
          this.$router.back();
        } catch (e) {
          loading.close();
          await MessageBox.alert(e.response.data.message || '提交失败');
        }
      }
    }
  }
};
export function haveDeleteHandle<T extends KeysType>(type: T, handleName: string, targetArrayName: string, targetElement?: string) {
  return {
    methods: {
      async [handleName]() {
        let loading = Loading.service({ target: targetElement });
        let array = (this as any)[targetArrayName];
        try {
          await deleteData(type, array);
          array.splice(0, array.length);
          loading.close();
        } catch (e) {
          loading.close();
          await MessageBox.alert(e.response.data.message || '删除失败');
        }
      }
    }
  }
}