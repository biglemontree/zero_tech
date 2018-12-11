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
                {
                    "sectype": "不动产登记暂行条例实施细则",
                    "createTime": "2018-11-30 16:18:11",
                    "id": "291865880471",
                    "firtype": "政策法规",
                    "status": 1
                }
            ]
        }
    },
    mounted() {
        request({
            url: api.getTypeZCFG
        }).then(r => {
            this.dataList = r.rows
        })
    },
    components: {
        Notice
    }
}
</script>


