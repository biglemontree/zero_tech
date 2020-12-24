<template lang="html">
  <van-form @submit="onSubmit" class="bg-eee h-full">
    <div class="title px-20 ">文字资料上传</div> 
    <van-field
      v-model="name"
      name="name"
      label="姓名"
      placeholder="必填"
      :rules="[{ required: true, message: '请输入姓名' }]"
    />
    <van-field
      v-model="idCard"
      name="idCard"
      label="身份证号码"
      placeholder="必填"
      :rules="[{ required: true, message: '必填', pattern: /(?:^\d{15}$)|(?:^\d{18}$)|^\d{17}[\dXx]$/ }]"
    />
    <van-field
      v-model="phone"
      name="phone"
      label="手机号码"
      placeholder="必填"
      :rules="[{ required: true, message: '必填', pattern: /^1(3|4|5|7|8|9)\d{9}$/ }]"
    />

    <van-field v-model="code" class="verify-code" center clearable label="验证码" placeholder="请输入验证码">
      <template #button>
        <van-button size="small" type="primary" @click="sendCode">发送验证码</van-button>
      </template>
    </van-field>
    <div class="next-button" >
      <van-button round block type="primary" native-type="submit">
        下一步
      </van-button>
    </div>
  </van-form>
</template>

<script>
const CryptoJS = require("crypto-js")
import vstore from '@/store.js'
import { mapState, mapMutations } from 'vuex'
import request from "../utils/request";
import api from "../constants/api";
// import consts from "../constants/";
// import Feedback from "../common/Feedback";

let timer;
let s = 60;
export default {
  name: "verify",
  data() {
    return {
      phone: '',
      name: '',
      idCard: '',
      code: "",
      isSuccess: true,
      second: 0,
      disabled: true // 验证码btn
    };
  },
  store: vstore,
  methods: {
    checkTel() {
      if (this.phone.match(/^1(3|4|5|7|8|9)\d{9}$/g)) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    genRsaKey(content) {
      var keyHex = CryptoJS.enc.Utf8.parse('zy2dUKlG');
      var ivHex = CryptoJS.enc.Utf8.parse('3fTrP5xE');
      var encrypted = CryptoJS.DES.encrypt(content, keyHex, { iv: ivHex });
      // console.log(encrypted.toString(),encrypted.ciphertext.toString(CryptoJS.enc.Base64));
      return encrypted.toString()
      // var keyHex = CryptoJS.enc.Utf8.parse('abcd1234');
      // // direct decrypt ciphertext
      // var decrypted = CryptoJS.DES.decrypt({
      //     ciphertext: CryptoJS.enc.Base64.parse('8dKft9vkZ4I=')
      // }, keyHex, {
      //     mode: CryptoJS.mode.ECB,
      //     padding: CryptoJS.pad.Pkcs7
      // });
      // console.log(333, decrypted.toString(CryptoJS.enc.Utf8));
    },
    sendCode() {
      const phone = this.genRsaKey(this.phone);
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
    onSubmit(values) {
      const data = {
        phone: this.genRsaKey(this.phone),
        name: this.genRsaKey(this.name),
        idCard: this.genRsaKey(this.idCard),
        code: this.genRsaKey(this.code),
      }
      this.$store.commit('fetchUserInfo',data) 
      this.$router.push('/upload')
      console.log('submit', values);
    },
  },
};
</script>

<style scoped>
.title {
  height: 60px;
  line-height: 60px;
}
.verify-code {
  margin-top:20px;
}
.next-button {
  margin: 160px 20px 0;
}
</style>
