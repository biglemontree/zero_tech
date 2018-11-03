import Vue from 'vue'
import Vuex from 'vuex'
import request from "./utils/request";
import api from "./constants/api";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {},
        onlineData: {
            // DJLX, SQLX, todo
        },
        needUploads: []
    },
    mutations: {
        setOnlineData(state, data) {
            state.onlineData = data
        },
        fetchUserInfo(state) {
            request({
                url: api.fetchUserInfo
            }).then(r => {
                state.userInfo = r.data
            })
        },
        fetchNeedFiles(state) {
            request({
                url: api.fileList,
                data: {
                    YWID: state.onlineData.todo
                }
            }).then(r => {
                state.needUploads = r.rows
            })
        },
    },
    actions: {

    }
})
