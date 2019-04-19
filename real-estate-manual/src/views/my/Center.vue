<template>
  <div class="home">
      <div class="weui-cells">
            <div class="weui-cell">
                <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
                    <img src="../../assets/avatar.jpg" style="width: 50px;display: block">
                </div>
                <div class="weui-cell__bd">
                    <p>{{user.phone}}</p>
                    <p style="font-size: 13px;color: #888888;"></p>
                </div>
            </div>
            <router-link to="/myAudit" class="weui-cell weui-cell_access">
                <div class="weui-cell__bd">
                    <span style="vertical-align: middle">我的预审</span>
                </div>
                <div class="weui-cell__ft"></div>
            </router-link> 
            <router-link to="/list" class="weui-cell weui-cell_access">
                <div class="weui-cell__bd">
                    <span style="vertical-align: middle">我的预约</span>
                </div>
                <div class="weui-cell__ft"></div>
            </router-link>                
            <router-link to="/verify?type=1" class="weui-cell weui-cell_access">
                <div class="weui-cell__bd">
                    <span style="vertical-align: middle">个人信息修改</span>
                </div>
                <div class="weui-cell__ft"></div>
            </router-link>                
            
        </div>
  </div>
</template>

<script>
import vstore from '@/store.js'
import store from 'store';
import { mapState, mapActions } from 'vuex'

export default {
  name: 'center',
  store: vstore,
  data() {
      return {
          user: store.get('user') || {}
      }
  },
  mounted() {
      this.actionUserInfo().then((user) => {
          store.set('user', user)
      })
  },
  computed: {
  },
  methods: {
      ...mapActions(['actionUserInfo']),
  }
}
</script>
