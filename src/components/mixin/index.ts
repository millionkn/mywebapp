import { Loading } from 'element-ui';
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
export function loadingSingleByRouter(type: KeysType, dataName: string, target?: string): ComponentOptions<Vue> {
  return {
    data() {
      return {
        [dataName]: {}
      }
    },
    async mounted() {
      let loading = Loading.service({ target });
      try {
        (this as any)[dataName] = await loadSingle(type, Number.parseInt((this as any).$router.currentRoute.params.id))
      } catch (e) {
        (this as any)[dataName] = {};
      }

      loading.close();

    },
  }
}
export function haveSubmitHandle(type: KeysType, dataName: string, handleName: string): ComponentOptions<Vue> {
  return {
    methods: {
      async [handleName]() {
        let loading = Loading.service({ target: this.$el as HTMLElement });
        let object = (this as any)[dataName]
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