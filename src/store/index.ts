import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';
Vue.use(Vuex);
const unset = [] as any[];
type User = {

}
export default new Vuex.Store({
    state: {
        user: <User | null>null,
        data: {
            drivers: unset,
            offices: unset,
            persons: unset,
            suppliers: unset,
            roles: unset,
        }
    },
    mutations: {
        setUser(state, user: User | null) {
            state.user = user;
        },
        setData(state, { name, array }) {
            (state.data as any)[name] = array;
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
        async loadData({ commit }, { names }: { names: string[] }) {
            let obj = {} as { [s: string]: object };
            await Promise.all(
                names.map(async (name) => {
                    let data = (await axios.get(`/restAPI/${name}`)).data;
                    obj[name] = data;
                })
            );
            Object.keys(obj).forEach((name) => commit('setData', { name, array: obj[name] }));
        },
        async loadSingle({ commit }, { type, id }) {
            return (await axios.get(`/restAPI/${type}/${id}`)).data
        },
        async putData({ commit }, { type, arr }: {
            type: string,
            arr: { id: number }[]
        }) {
            for (let i = 0; i < arr.length; i++) {
                await axios.patch(`/restAPI/${type}/${arr[i].id}`, arr[i])
            }
            await this.dispatch('loadData', { names: [type] })
        }
    }
})