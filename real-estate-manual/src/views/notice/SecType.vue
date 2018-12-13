<template>
    <div id="app" class="yo-scroll" v-cloak>
        <Notice :dataList="dataList" :title="sectype" :link="'notice-detail'">

        </Notice>
        <!-- <my-dialog v-bind:message="message"></my-dialog> -->
    </div>

</template>

<script>
import Notice from '../common/Notice';
import request from '../../utils/request.js';
import api from '../../constants/api.js';

export default {
    name: 'notice',
    data() {
        return {
            "dataList": [
                // {
                //     "sectype": "公示公告",
                //     "createTime": "2018-10-19 14:57:21",
                //     "id": "639724546851",
                //     "title": "登记零距离 服务暖民心",
                //     "firtype": "通知公告",
                //     "status": 1
                // }
            ],
            sectype: ''
        }
    },
    mounted() {
        const {sectype} = this.$route.query
        this.sectype = sectype
        request({
            url: api.getType,
            data: {
                sectype: sectype
            }
        }).then(r => {
            this.dataList = r.rows
        })
    },
    components: {
        Notice
    }
}
</script>


