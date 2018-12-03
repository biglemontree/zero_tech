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
                {
                "ID": "9E5BC5F31EB7485A9E97C44947A90A1F",
                "content": "公示公告",
                "firtype": "891E3C9EBA7B423E8F1D28C500FF7406",
                "KEY": "GSGG",
                "DESCRIPTION": null
            },
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


