<template>
    <div class="root">
        <div class="item" v-for="(row,index) in rows" :key="index">
            <h4>{{index+1}}.{{row.question}}</h4>
            <p v-html="row.answer"></p>
        </div>

    </div>
</template>

<script>
import _ from 'underscore';
import request from '../../utils/request';
import apis from '@/constants/api';

export default {
    name: 'qa',
    data() {
        return {
            rows: []
        }
    },
    mounted() {
        request({
            url: apis.questionAnswer
        }).then(r => {
            this.rows = r.rows.map(item => {
                item.answer = _.unescape(item.answer)
                return item
            })
        })
    }
}
</script>

<style scoped>
.root {
    color: #1A1A1A;
    background: #F2F2F2;
    height: 100vh;
}

.item {
    background: #FFFFFF;
    margin-bottom: 16px;
    padding: 20px;
    font-size: 16px;
}

.item h4 {
    font-weight: 500;
    font-size: 15px;
    margin-bottom:20px;
}

.item p {
    color: #808080;
}
</style>
