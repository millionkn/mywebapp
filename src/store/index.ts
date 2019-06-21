import Vuex, { Store } from 'vuex';
import Vue from 'vue';
import axios from 'axios';
import * as type from '@/types/index';
import { MessageBox } from 'element-ui';
Vue.use(Vuex);
type Unset = never[]
const unset = [] as Unset;
let outerData = {
    drivers: unset as type.Driver[] | Unset,
    offices: unset as type.Office[] | Unset,
    persons: unset as type.Person[] | Unset,
    suppliers: unset as type.Supplier[] | Unset,
    roles: unset as type.Role[] | Unset,
    logs: unset as type.Log[] | Unset,
}
export type OuterData = typeof outerData;
export type KeysType = keyof OuterData;

let store = new Vuex.Store({
    state: {
        user: <type.Person | null>null,
        data: outerData
    },
    mutations: {
        setUser(state, user: type.Person | null) {
            state.user = user;
        },
        setData<K extends KeysType>(state: { data: typeof outerData }, { type, array }: {
            type: K,
            array: typeof outerData[K]
        }) {
            state.data[type] = array;
        },
        needRefresh<K extends KeysType>(state: { data: typeof outerData }, { type }: { type: K }) {
            state.data[type] = unset;
        },
    },
    getters: {
        suppliers(state) {
            return state.data.suppliers;
        },
        persons(state) {
            return state.data.persons;
        },
        roles(state) {
            return state.data.roles;
        },
        drivers(state) {
            return state.data.drivers;
        },
        offices(state) {
            return state.data.offices;
        },
        logs(state) {
            return state.data.logs;
        }
    },
    actions: {
        async login({ commit }, { username, password }) {
            commit('setUser', (await axios.post("/login", {
                username,
                password,
            })).data);
        },
        async logout({ commit }) {
            await axios.post('/loginOut');
            commit('setUser', null);
        },
        async loadData({ commit }: any, { types }: { types: KeysType[] }) {
            let obj = {} as { [s in KeysType]: typeof outerData[s] };
            let keys = [] as typeof types;
            let data = (this as any).state.data as typeof outerData;
            let promises = types.map(async (type) => {
                if (data[type] === unset) {
                    obj[type] = (await axios.get(`/restAPI/${type}`)).data;
                    keys.push(type);
                }
            })
            await Promise.all(promises);
            keys.forEach((type) => {
                commit('setData', { type, array: obj[type] })
            })
        },
        async loadSingle({ commit }, { type, id }: { type: KeysType, id: number }) {
            return (await axios.get(`/restAPI/${type}/${id}`)).data
        },
        async putData({ commit }, { type, arr }: {
            type: KeysType,
            arr: { id: number }[]
        }) {
            for (let i = 0; i < arr.length; i++) {
                await axios.patch(`/restAPI/${type}/${arr[i].id}`, arr[i])
            }
            commit('needRefresh', { type })
        },
        async postData({ commit }, { type, arr }: {
            type: KeysType,
            arr: { id: number }[]
        }) {
            for (let i = 0; i < arr.length; i++) {
                await axios.post(`/restAPI/${type}`, arr[i])
            }
            commit('needRefresh', { type })
        },
        async deleteData({ commit }, { type, arr }: {
            type: KeysType,
            arr: { id: number }[]
        }) {
            for (let i = 0; i < arr.length; i++) {
                await axios.delete(`/restAPI/${type}/${arr[i].id}`)
            }
            commit('needRefresh', { type })
        }
    }
});
export default store;
async function showMessageOnError<T>(promise: Promise<T>) {
    try {
        return await promise;
    } catch (e) {
        let text = "操作失败";
        try {
            text = e.response.data.message;
        } catch (e) { }
        await MessageBox.alert(text, "错误");
        throw e;
    }

}
export async function loadSingle<K extends KeysType>(type: K, id: number): Promise<typeof outerData[K]> {
    return await store.dispatch('loadSingle', { type, id })
}
export async function putData<K extends KeysType>(type: K, arr: typeof outerData[K]): Promise<void> {
    await showMessageOnError(store.dispatch('putData', { type, arr }))
}
export async function loadData(types: KeysType[]) {
    await showMessageOnError(store.dispatch('loadData', { types }))
}
export async function deleteData<K extends KeysType>(type: K, arr: typeof outerData[K]): Promise<void> {
    await showMessageOnError(store.dispatch('deleteData', { type, arr }))
}
export async function postData<K extends KeysType>(type: K, arr: typeof outerData[K]): Promise<void> {
    await showMessageOnError(store.dispatch('postData', { type, arr }))
}