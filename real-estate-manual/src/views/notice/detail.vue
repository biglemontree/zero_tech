<template>
    <div class="" v-html="content"></div>
</template>

<script>
import _ from 'underscore';
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
        const {sectype, title} = this.$route.query
        this.sectype = sectype
        this.title = title
        request({
            url: api.getTypeByTitle,
            data: {
                title
            }
        }).then(r => {
            const {content} = r.data
            this.content = _.unescape(content)
        })
    },
}
</script>