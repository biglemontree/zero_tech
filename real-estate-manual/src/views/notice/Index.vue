<template>
    <div id="app" class="yo-scroll" v-cloak>
        <Notice :dataList="dataList" :title="dataList[0].firtype" :link="'/notice-sec'">
        </Notice>
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
                //     "sectype": "首次登记公告",
                //     "createTime": "2018-11-28 17:14:26",
                //     "id": "486435817634",
                //     "firtype": "通知公告",
                //     "status": 1
                // },
            ]
        }
    },
    mounted() {
        request({
            url: api.getTypeTZGG,
            // data: {
            //     firtype: '通知公告'
            // }
        }).then(r => {
            this.dataList = r.rows
        })
    },
    components: {
        Notice
    }
}
</script>


