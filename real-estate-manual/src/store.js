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
        fileList: [], // 上传的图片列表
        fileIds: '',
        from: {}
    },
    mutations: {
        setOnlineData(state, data) {
            state.onlineData = data
        },
        fetchUserInfo(state, data) {
            state.userInfo = data
        },
        fetchNeedFiles(state, rows) {
            state.needUploads = rows
        },
        setFileList(state, rows) {
            // state.fileList += ids

        },
        addIds(state, ids) {
            state.fileIds += ids
            debugger
        }
    },
    actions: {
        actionUserInfo(context) {
            return request({
                url: api.fetchUserInfo
            }).then(r => {
                context.commit('fetchUserInfo', r.data)
                return r.data
            })
        },
        actionNeedFiles(context) {
            return request({
                url: api.fileList,
                data: {
                    YWID: context.state.onlineData.todo.id
                }
            }).then(r => {
                context.commit('fetchNeedFiles', r.rows)
                return r
            })
        }
    }
})
