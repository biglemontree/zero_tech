<template lang="html">
    <div id="form">
        <div class="weui-cells__title">身份信息</div>
        <div class="weui-cells">
            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label class="weui-label">姓名</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" disabled type="text" v-model="name" required emptyTips="请输入姓名" notMatchTips="请输入姓名" placeholder="请输入完整姓名">
                </div>
            </div>
            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label class="weui-label">身份证号</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" disabled type="text" v-model="cardId" required pattern="REG_IDNUM" placeholder="输入你的身份证号码" emptyTips="请输入身份证号码" notMatchTips="请输入正确的身份证号码">
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
                    <input class="weui-input" type="tel" disabled @input="checkTel()" required pattern="REG_TEL" v-model="phone" emptyTips="请输入手机号" notMatchTips="请输入正确的手机号" placeholder="请输入手机号">
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
                    <a href="javascript:;" v-if="second==0" @click="sendCode" :class="['weui-btn',  {'weui-btn_plain-disabled': disabled, 'weui-btn_plain-primary':!disabled}]">获取验证码</a>
                    <span class="weui-btn weui-btn_plain-disabled" v-else disabled>{{second}}s获取验证码</span>
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <a href="javascript:;" class="weui-btn weui-btn_primary" @click="checkUser">确认查询</a>
        </div>
    </div>
        
</template>

<script>
import NodeRSA from "node-rsa";
import store from "store";
import vstore from "@/store.js";
import { mapState, mapMutations, mapActions } from 'vuex'

import request from "../../utils/request";
import api from "../../constants/api";
import consts from "../../constants/";

let timer;
let s = 60;
export default {
  name: "houseSearch",
  data() {
    return {
      phone: '',
      name: '',
      cardId: '',
      code: "",
      isSuccess: true,
      second: 0,
      disabled: false // 验证码btn
    };
  },
  store: vstore,
  mounted() {
      this.actionUserInfo().then(r => {
        const {userName, cardId, phone} = r
        this.name = userName
        this.cardId = cardId
        this.phone = phone
    })
  },
  methods: {
      ...mapActions(['actionUserInfo']),
    checkTel() {
      if (this.phone.match(/^1(3|4|5|7|8|9)\d{9}$/g)) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    sendCode() {
      const phone = this.genRsaKey(+this.phone);
      request({
        url: api.SendCode,
        data: { phone }
      }).then(() => {
        timer = setInterval(() => {
          if (s > 0) {
            this.second = --s;
          } else {
            s = 60;
            clearInterval(timer);
          }
        }, 1000);
      });
    },
    genRsaKey(content) {
      const key = new NodeRSA();
      key.setOptions({ encryptionScheme: "pkcs1" });
      key.importKey(consts.publicKey);
      const x = key.encrypt(content, "base64");
      return x;
    },
    checkUser() {
        const {name, phone, cardId,code} = this
        request({
            url: api.querySignList,
            data: {
                phone,
                cardId,
                code,
                name,
            }
        }).then(r => {
            weui.toast('查找成功',1000)
            this.$router.push('/house-info');
        });
    }
  }
};
</script>

<style scoped>
.weui-label {
    width: 80px;
}
</style>
