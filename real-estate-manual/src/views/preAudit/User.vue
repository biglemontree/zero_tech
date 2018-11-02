<template lang="html">
    <div>
        <div class="weui-cells__title"></div>
        <div class="weui-cells">
            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label class="weui-label">权利人姓名</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" v-model="QLRXM" :defaultValue="userInfo.userName" placeholder="请输入证件号">
                </div>
            </div>
            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label class="weui-label">证件种类</label>
                </div>
                <div class="weui-cell__bd">
                    <select class="weui-select" name="QLRZJLX" v-model="QLRZJLX">
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
                    <input class="weui-input" type="text"  :value="userInfo.cardId" placeholder="请输入证件号">
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
            <a href="javascript:;" class="weui-btn weui-btn_primary" @click="save">下一步</a>
        </div>
    </div>
        
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import store from 'store'
import vstore from '@/store.js'
import request from "../../utils/request";
import api from "../../constants/api";

export default {
  name: "user",
  data() {
    return {
        QLRTXDZ: '',
        QLRZJH: '',
        QLRYB: '',
        QLRZJLX: '',
        QLRXM: ''
    };
  },
  store: vstore,
  mounted() {
    this.fetchUserInfo()

  },
  computed: {
      ...mapState(['userInfo'])
    //   this.$store.state
  },
  methods: {
      ...mapMutations(['fetchUserInfo']),
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
        const {userName, phone, cardId} = this.userInfo
        request({
            url: api.onlineApply,
            data: {
                YYSJD: this.YYSJD, // "YYSJD": 预约时间段,
                YYRQ: this.YYRQ, // "YYRQ":预约日期,
                "CARD_ID": cardId, // 身份证号,
                // "FWSZXZQY":房屋所在行政区域,
                QLRZJLX: this.QLRZJLX, // 预约业务类型,
                // "BDCDZ":不动产地址,
                // "YYYWID": 预约业务类型Id,
                // "YYYWName":预约业务名(小分类)
                // "YWName": '',// 预约业务类型名（大分类）,
                "name": userName, // 预约人姓名,
                "BLJG": '蕉岭县', // 办理机构,
            }
        }).then(() => this.isSuccess = true)
    },
  },
};
</script>

