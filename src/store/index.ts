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
        setUser(state,user:User){
            state.user=user;
        }
    },
    actions:{
        async login({state},{username,password}){
            state.user = (await axios.post("/login",{
                username,
                password,
            })).data;
        }
    }
})