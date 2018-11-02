import Vue from 'vue'
import Vuex from 'vuex'
import request from "./utils/request";
import api from "./constants/api";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {}
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        fetchUserInfo(state) {
            request({
                url: api.fetchUserInfo
            }).then(r => {
                state.userInfo = r.data
            })
        }
    },
    actions: {

    }
})
