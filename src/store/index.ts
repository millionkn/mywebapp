import Vuex, { Store } from 'vuex';
import Vue from 'vue';
import axios from 'axios';
import { Driver, Office, Person, Supplier, Role, User } from '@/types/index';
Vue.use(Vuex);
type Unset = never[]
const unset = [] as Unset;
let outerData = {
    drivers: unset as Driver[] | Unset,
    offices: unset as Office[] | Unset,
    persons: unset as Person[] | Unset,
    suppliers: unset as Supplier[] | Unset,
    roles: unset as Role[] | Unset,
}
export type OuterData = typeof outerData;
export type KeysType = keyof OuterData;

let store = new Vuex.Store({
    state: {
        user: <User | null>null,
        data: outerData
    },
    mutations: {
        setUser(state, user: User | null) {
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
export async function loadSingle<K extends KeysType>(type: K, id: number): Promise<typeof outerData[K]> {
    return await store.dispatch('loadSingle', { type, id })
}
export async function putData<K extends KeysType>(type: K, arr: typeof outerData[K]): Promise<void> {
    await store.dispatch('putData', { type, arr })
}
export async function loadData(types: KeysType[]) {
    await store.dispatch('loadData', { types })
}
export async function deleteData<K extends KeysType>(type: K, arr: typeof outerData[K]): Promise<void> {
    await store.dispatch('deleteData', { type, arr })
}
export async function postData<K extends KeysType>(type: K, arr: typeof outerData[K]): Promise<void> {
    await store.dispatch('postData', { type, arr })
}