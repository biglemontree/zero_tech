<template>
    <div class="weui-panel weui-panel_access">
    <div class="weui-panel__bd">
        <router-link :to="'/register/'+row.id" v-for="(row, index) in rows" :key="index" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
                <img class="weui-media-box__thumb" src="../../assets/search_list.png" alt="">
            </div>
            <div class="weui-cell__bd weui-cell_primary">
                <h4 class="weui-media-box__title">申请人：{{row.name}}</h4>
                <p class="weui-media-box__desc">预约时段：{{row.YYSJD}}</p>
            </div>
            <div class="weui-panel__ft"><a class=" weui-cell_access weui-cell_link"><span class="weui-cell__ft">{{row.status===0 ? '未处理' : row.status===1 ? '已处理' : '已取消'}}</span></a></div>
        </router-link>
    </div>
</div>
</template>
<script>
import Feedback from "../common/Feedback"
import request from '../../utils/request';
import api from '../../constants/api';
export default {
    name: 'agree',
    data() {
        return {
            rows: [],
            SLID: ''
        }
    },
    mounted() {
        this.searchAll()
    },
    methods: {
        searchAll() {
            request({
                url: api.getAllApplys,
                data: {
                    // yyId: 'df'
                }
            }).then(r => {
                this.rows = r.rows
            })
        }
    },
  components: {
    Feedback
  }
}
</script>