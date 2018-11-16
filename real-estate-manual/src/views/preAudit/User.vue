<template lang="html">
    <div>
        <div class="weui-cells__title"></div>
        <div class="weui-cells">
            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label class="weui-label">权利人姓名</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" v-model="QLRXM" placeholder="请输入姓名">
                </div>
            </div>
            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label class="weui-label">证件种类</label>
                </div>
                <div class="weui-cell__bd">
                    <select class="weui-select" name="QLRZJLX" v-model="QLRZJLX" style="paddingLeft: 0px;">
                        <option selected="身份证" value="身份证">身份证</option>
                        <option value="营业执照">营业执照</option>
                    </select>
                </div>
            </div>
            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label class="weui-label">证件号</label>
                </div>
                <div class="weui-cell__bd">
                    <!-- v-model="QLRZJH" -->
                    <input class="weui-input" type="text"  v-model="QLRZJH" placeholder="请输入证件号">
                </div>
            </div>
            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label class="weui-label">通讯地址</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="textarea" v-model="QLRTXDZ" placeholder="请输入通讯地址">
                </div>
            </div>
            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label class="weui-label">邮政编码</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" v-model="QLRYB" placeholder="请输入邮政编码">
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <a href="javascript:;" class="weui-btn weui-btn_primary" @click="save">提交</a>
        </div>
    </div>
        
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import store from 'store'
import vstore from '@/store.js'
import request from "../../utils/request";
import api from "../../constants/api";

export default {
  name: "user",
  data() {
    return {
        QLRXM: '',
        QLRZJLX: '身份证',
        QLRZJH: '',
        QLRYB: '',
        QLRTXDZ: '',
    };
  },
  store: vstore,
  mounted() {
    this.actionUserInfo().then(r => {
        const {userName, cardId} = r
        this.QLRXM = userName
        this.QLRZJH = cardId
    })

  },
  computed: {
      ...mapState(['userInfo', 'onlineData', 'fileIds'])
  },
  methods: {
      ...mapMutations(['fetchUserInfo']),
      ...mapActions(['actionUserInfo']),
    fetchAvaiTime() {
        request({
            url: api.getTime,
            data: {
                date: this.YYRQ
            }
        }).then(r => this.availTime = r.rows);
    },
    fetchYwType() {
        request({
            url: api.getYwList,
        }).then(r => this.ywTypes = r.rows);
    },
    fetchDate() {
        request({
            url: api.getDate,
        }).then(r => this.availDate = r.rows);
    },
    save() {
        const {DJLX, todo} = this.onlineData
        const {QLRXM, QLRZJLX, QLRZJH, QLRYB,
        QLRTXDZ} = this
        const that = this
        if (QLRYB.length !== 6) {
            weui.toast('请填写正确的邮编')
            return
        }
        request({
            url: api.saveSqb,
            data: {
                QLRXM, QLRZJLX, QLRZJH, QLRYB,
                QLRTXDZ,
                ZMWJID: this.fileIds,
                YWLX: todo.id
            }
        }).then(() => weui.toast('提交成功', {
            duration: 1000,
            callback() {
                that.$router.push({
                    path: '/preAudit'
                })
            }
        }))
    },
  },
};
</script>

