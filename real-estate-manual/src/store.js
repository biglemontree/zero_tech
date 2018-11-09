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
        needUploads: [],
        fileList: [],
        fileIds: ''
    },
    mutations: {
        setOnlineData(state, data) {
            state.onlineData = data
        },
        fetchUserInfo(state) {
            return request({
                url: api.fetchUserInfo
            }).then(r => {
                state.userInfo = r.data
            })
        },
        fetchNeedFiles(state) {
            return request({
                url: api.fileList,
                data: {
                    YWID: state.onlineData.todo
                }
            })
            .then(r => {
                state.needUploads = r.rows
                return r
            })
        },
        addIds(state, ids) {
            state.fileIds += ids
            debugger
        }
    },
    actions: {
        actionUserInfo(context) {
            context.commit('fetchUserInfo')
        }
    }
})
