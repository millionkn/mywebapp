import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';
Vue.use(Vuex);
type User={

}
export default new Vuex.Store({
    state:{
        user:<User|null>null,
    },
    mutations:{
        setUser(state,user:User|null){
            state.user=user;
        }
    },
    actions:{
        async login({commit},{username,password}){
            commit('setUser',(await axios.post("/login",{
                username,
                password,
            })).data);
        },
        async logout({commit}){
            await axios.post('/loginOut');
            commit('setUser',null);
        }
    }
})