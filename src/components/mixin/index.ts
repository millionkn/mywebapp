import { Loading } from 'element-ui';
import {
  KeysType,
  loadData,
  postData,
  putData,
  OuterData,
  deleteData,
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
export function haveSubmitHandle(type: KeysType, propName: string, handleName: string): ComponentOptions<Vue> {
  return {
    props: {
      [propName]: {
        type: Object,
        default: {}
      }
    },
    methods: {
      async [handleName]() {
        let loading = Loading.service({ target: this.$el as HTMLElement });
        let object = (this as any)[propName]
        if (object.id === undefined) {
          await postData(type, [object]);
        } else {
          await putData(type, [object]);
        }
        await loadData([type]);
        loading.close();
        this.$router.back();
      }
    }
  }
};
export function haveDeleteHandle<T extends KeysType>(type: T, handleName: string, targetArrayName: string, targetElement?: string) {
  return {
    methods: {
      async [handleName]() {
        let loading = Loading.service({
          target: targetElement
        });
        let array = (this as any)[targetArrayName]
        await deleteData(type, array);
        await loadData([type]);
        array.splice(0, array.length);
        loading.close();
      }
    }
  }
}