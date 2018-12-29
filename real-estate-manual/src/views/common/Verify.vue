<template lang="html">
    <div id="form">
        <div class="weui-cells__title">身份信息</div>
        <div class="weui-cells">
            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label class="weui-label">姓名</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" v-model="name" required emptyTips="请输入姓名" notMatchTips="请输入姓名" placeholder="请输入完整姓名">
                </div>
            </div>
            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label class="weui-label">身份证号</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" v-model="IDCardNum" required pattern="REG_IDNUM" placeholder="输入你的身份证号码" emptyTips="请输入身份证号码" notMatchTips="请输入正确的身份证号码">
                </div>
            </div>
        </div>
        <div class="weui-cells__title">验证号码</div>
        <div class="weui-cells">
            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label class="weui-label">手机号码</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="tel" required pattern="REG_TEL" v-model="phone" emptyTips="请输入手机号" notMatchTips="请输入正确的手机号" placeholder="请输入手机号">
                </div>
            </div>
        </div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_vcode">
                <div class="weui-cell__hd">
                    <label class="weui-label">验证码</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" required v-model="code" emptyTips="请输入验证码" notMatchTips="请输入验证码" placeholder="请输入验证码">
                </div>
                <div class="weui-cell__ft">
                    <a href="javascript:;" v-if="second==0" @click="sendCode" class="weui-vcode-btn">获取验证码</a>
                    <span class="weui-btn weui-btn_plain-primary weui-btn_plain-disabled" v-else disabled>{{second}}s获取验证码</span>
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <a href="javascript:;" class="weui-btn weui-btn_primary" @click="checkUser">下一步</a>
        </div>
    </div>
        
</template>

<script>
import axios from 'axios'
import NodeRSA from "node-rsa";
import qs from 'qs'
import store from 'store'
import vstore from '@/store.js'
import request from "../../utils/request";
import api from "../../constants/api";
import consts from "../../constants/";
import Feedback from "../common/Feedback";

let timer
let s = 60
export default {
  name: "home",
  data() {
    return {
        phone: null,
        name: '',
        IDCardNum: '',
        code: '',
        isSuccess: true,
        second: 0,
        disabled: false
    };
  },
  store: vstore,
  mounted() {
    weui.form.checkIfBlur('#form', {
        regexp: {
            IDNUM: /(?:^\d{15}$)|(?:^\d{18}$)|^\d{17}[\dXx]$/,
            TEL: /^[0-9]{11}$/
        }
    })
  },
  methods: {
    sendCode() {
        const phone = this.genRsaKey(+this.phone)
        request({
            url: api.SendCode,
            data: {phone}
        }).then(() => {
            timer = setInterval(() => {
                if (s > 0) {
                    this.second = --s 
                } else {
                    s = 60
                    clearInterval(timer)
                }
            }, 1000)
        });
    },
    genRsaKey(content) {
        const key = new NodeRSA();
        key.setOptions({ encryptionScheme: "pkcs1" });
        key.importKey(consts.publicKey);
        const x = key.encrypt(content, "base64");
        return x
    },
    checkUser() {
        weui.form.validate('#form', error => {
            if (!error) {
                const {phone,IDCardNum,code,name} = this
                request({
                    url: api.CheckUser,
                    data: {
                        phone,
                        IDCardNum,
                        code,
                        name
                    }
                }).then(r => {
                    store.set('token', r.data)
                    let params = this.$route.query.from
                    if (!params) {
                        params = 'entry'
                    }
                    console.log('parms ', params)

                    this.$router.push({
                        path: '/entry'
                        // path: '/' + params,
                        // path: store.get('from'),
                    })
                })
            }
        }, {
            regexp: {
                IDNUM: /(?:^\d{15}$)|(?:^\d{18}$)|^\d{17}[\dXx]$/,
                TEL: /^[0-9]{11}$/
            }
        })
    }
  },
};
</script>

