<template>
    <div v-html="content"></div>
</template>

<script>
import request from '../../utils/request.js';
import api from '../../constants/api.js';

export default {
    name: 'notice',
    data() {
        return {
            content: ''
        }
    },
    mounted() {
        const {sectype} = this.$route.query
        this.sectype = sectype
        request({
            url: api.getTypes,
  
        }).then(r => {
            this.content = r.rows[0].content
        })
    },
}
</script>