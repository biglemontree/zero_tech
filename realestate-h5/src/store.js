import Vue from 'vue'
import { createStore } from 'vuex'
import request from "./utils/request";
import api from "./constants/api";

export default new createStore({
    state: {
        userInfo: {
            phone: '',
            name: '',
            idCard: '',
            code: "",
        },
        needUploads: [],
        fileList: [], // 上传的图片列表
        fileIds: '',
        houseInfoArr: [],
        firstHouseDetail: {}
    },
    mutations: {
        fetchUserInfo(state, data) {
            state.userInfo = data
        },
        fetchNeedFiles(state, rows) {
            state.needUploads = rows
        },
        addIds(state, ids) {
            state.fileIds += ids
        },
        setHouseList(state, arr) {
            state.houseInfoArr = arr
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
