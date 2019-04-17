
<template lang="html">
    <div>
        <div class="weui-cells__title"></div>
        <div class="weui-cells">
            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label class="weui-label">姓名</label>
                </div>
                <div class="weui-cell__bd">
                    {{user.userName}}
                </div>
            </div>
            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label class="weui-label">证件号</label>
                </div>
                <div class="weui-cell__bd">
                    {{user.cardId}}
                </div>
            </div>
        </div>
        <div class="weui-panel weui-panel_access">
            <div class="weui-panel__bd">
                <div class="noMore" v-if="rows.length==0">暂无预审记录</div>
                <div v-else v-for="(row, index) in rows" :key="index" class="weui-media-box weui-media-box_appmsg">
                    <!-- <div class="weui-media-box__hd">
                        <img class="weui-media-box__thumb" src="../../assets/search_list.png" alt="">
                    </div> -->
                    <div class="weui-cell__bd weui-cell_primary">
                        <h4 class="weui-media-box__title">登记类型：{{row.DJLX}}</h4>
                        <p class="weui-media-box__desc">申请时间：{{row.createTime}}</p>
                        <p class="weui-media-box__desc right-align fs-12px" >{{row.fbk1.reason}}kkkk</p>
                    </div>
                    <div class="weui-cell__bd " >
                        <i class="weui-icon-success"></i>
                        <div class="weui-media-box__title right-align fs-12px" >{{row.fbk1.result}}</div>
                    </div>
                    <!-- <div class="weui-panel__ft">{{row.fbk1.result}}</div> -->
                    <!-- <div class="weui-panel__ft"><a class=" weui-cell_access weui-cell_link"><span class="weui-cell__ft">{{row.fbk1.result}}fd</span></a></div> -->
                </div>
            </div>
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
        user: store.get('user') || {},
        rows: []
    };
  },
  store: vstore,
  mounted() {
      request({
            url: api.getSqbList,
        }).then(r => this.rows = r.rows)
  },
  methods: {
  },
};
</script>

