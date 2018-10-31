<template lang="html">
    <div >
        <div class="weui-cells__title">身份信息</div>
        <div class="weui-cells">
            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label class="weui-label">姓名</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" v-model="name" placeholder="请输入完整姓名">
                </div>
            </div>
            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label class="weui-label">身份证号</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" v-model="IDCardNum" placeholder="请输入身份证号">
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
                    <input class="weui-input" type="number" v-model="phone" placeholder="请输入手机号">
                </div>
            </div>
        </div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_vcode">
                <div class="weui-cell__hd">
                    <label class="weui-label">验证码</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="tel" v-model="code" placeholder="请输入验证码">
                </div>
                <div class="weui-cell__ft">
                    <a href="javascript:;" @click="sendCode" class="weui-vcode-btn">获取验证码</a>
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <a href="javascript:;" class="weui-btn weui-btn_primary" @click="checkUser">下一步</a>
            <!-- <router-link to="/register">
            </router-link> -->
        </div>
    </div>
        
</template>

<script>
import axios from 'axios'
import NodeRSA from "node-rsa";
import qs from 'qs'
import store from 'store'
import request from "../../utils/request";
import api from "../../constants/api";
import consts from "../../constants/";
import Feedback from "../common/Feedback";

export default {
  name: "home",
  data() {
    return {
        phone: null,
        name: '',
        IDCardNum: '',
        code: '',
      isSuccess: true
    };
  },
  mounted() {
    
  },
  methods: {
    sendCode() {
        const phone = this.genRsaKey(+this.phone)
        console.log(phone)
        // const key = new NodeRSA();
        // key.setOptions({ encryptionScheme: "pkcs1" });
        // key.importKey(consts.publicKey);
        // const phone = key.encrypt(18122059359, "base64")
        request({

            url: api.SendCode,
            data: {phone}
        });
    },
    genRsaKey(content) {
        const key = new NodeRSA();
        key.setOptions({ encryptionScheme: "pkcs1" });
        key.importKey(consts.publicKey);
        console.log(consts.publicKey)
        const x = key.encrypt(content, "base64");
        console.log(x);
        
        return x
    },
    checkUser() {
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
            console.log(router)
            this.$router.push({
                path: '/register',
            })
            // this.p
        })
    }
  },
  components: {
  }
};
</script>

