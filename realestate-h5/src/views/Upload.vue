<template>
  <div class="bg-eee h-full">
    <div class="title px-20 ">图片资料上传</div> 
    <div class=" p-10 fs-12px c-999  ">身份证上传（正反面）<span class="c-red fs-14px red-dot">*</span></div> 
    <div class="bg-fff p-20">
      <van-uploader :after-read="afterRead" 
      @change="selectPic" upload-icon="plus" multiple v-model="idCardImg"/>
    </div>
    <div class=" p-10 fs-12px c-999">户口本上传（逐页上传）<span class="c-red fs-14px red-dot">*</span></div> 

    <van-field name="uploader" label="">
      <template #input>
        <van-uploader v-model="household" />
      </template>
    </van-field>
    <div class=" p-10 fs-12px c-999">其他证明材料（村委会证明）</div> 
    <div class="bg-fff p-20">
      <van-uploader :after-read="afterRead" upload-icon="plus" multiple v-model="others"/>
    </div>
    <div class="title px-20">权利来源资料（非必传选上传）</div> 
    <div class=" p-10 fs-12px c-999">上传资料包括不限于：</div>
    <div class="bg-fff p-20">
      <van-uploader :after-read="afterRead" upload-icon="plus" multiple v-model="others"/>
    </div>
    <div style="margin: 20px">
      <van-button block type="primary" native-type="submit" @click="submit">
        确认
      </van-button>
    </div>
  </div>
</template>

<script>
import vstore from '@/store.js'
import { mapState, mapMutations } from 'vuex'
import request from "../utils/request"
import api from '../constants/api'
export default {
  name: 'Upload',
  data() {
    return {
      idCardImg: [],
      household: [],
      others : [],
      authority: []
    }
  },
  store: vstore,
  methods: {
    submit() {
      const {userInfo} = this.$store.state;
      
      request({
        api: api.CheckUser,
        data: {
          ...userInfo,
        }
      })
    },
    afterRead(file,detail){
      console.log(file,detail);
      request({
        api: api.CheckUser,
        data: {
          // ...userInfo,
        }
      })
    },
    selectPic(file, obj) {
      request({
        api: api.uploadImg
      })
    },
    upload() {
      request({
        api: api.uploadImg
      })
    }
  }
}
</script>

<style scoped>
.title {
  height: 60px;
  line-height: 60px;
}
.red-dot {
  vertical-align: top;
}
</style>