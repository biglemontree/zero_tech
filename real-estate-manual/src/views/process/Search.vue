<template>
    <div>
        <div v-if="!isSearched">
            <div >
                <img class="top" src="../../assets/logo1.png" alt="" srcset="">
            </div>
            <div class="weui-cells__title">请输入您的受理编号</div>
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">受理编号</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" v-model="SLID" type="text" emptyTips="请输入受理编号" placeholder="请输入受理编号"/>
                    </div>
                </div>
            </div>

            <div class="weui-btn-area">
                <button class="weui-btn weui-btn_primary" id="showTooltips" @click="search">确定</button>
            </div>
        </div>
        <div v-else>
            <Feedback @go="go">
                <div slot="tip-info">
                    <i v-if="result.status === 1" class="weui-icon-success weui-icon_msg"></i>
                    <i v-else class="weui-icon-warn weui-icon_msg-primary"></i>
                    <h3 class="icon-box__title">{{result.SZZT}}</h3>
                    <p class="icon-box__desc c-666" >受理编号{{SLID}}</p>
                </div>
            </Feedback>
        </div>
    </div>
</template>
<script>
import Feedback from "../common/Feedback"
import request from '../../utils/request';
import store from 'store'
import vstore from '@/store'
import { mapState, mapMutations } from 'vuex'

import api from '../../constants/api';
export default {
    name: 'agree',
    data() {
        return {
            isSearched: false,
            SLID: '',
            result: {}
        }
    },
    store: vstore,
    mounted() {
        this.fetchUserInfo()
    },
    methods: {
        ...mapMutations(['fetchUserInfo']),
        search() {
            request({
                url: api.queryPregress,
                data: {
                    SLID: this.SLID
                }
            }).then((r) => {
                this.isSearched = true
                this.result = r.data
            })
        },
        go() {
            this.isSearched = false
        }
    },
  components: {
    Feedback
  }
}
</script>
<style scoped>
.top {width: 100vw;}
.weui-btn-area {margin-top: 60px;}
</style>


