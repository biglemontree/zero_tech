<template>
    <div>
        <router-link to="/register">
            <div class="up flex items-center center justify-center">
                <div>
                    <img src="../../assets/online-apply.png" alt="" srcset="">
                    <div>在线预约</div>
                    <div>随时在线预约</div>
                </div>
            </div>
        </router-link>
        <router-link to="/list">
            <div class="down flex items-center center justify-center">
                <div>
                    <img src="../../assets/search-info.png" alt="" srcset="">
                    <div>查询预约</div>
                    <div>查询你的预约信息</div>
                </div>
            </div>
        </router-link>
    </div>
</template>
<script>
import store from 'store'
import vstore from '@/store'
import { mapMutations } from 'vuex'
import online from '../../assets/online-apply.png'
export default {
    name: 'entry',
    data() {
        return {
            online
        }
    },
    store: vstore,
    mounted() {
        this.fetchUserInfo()
    },
    methods: {
        ...mapMutations(['fetchUserInfo'])
    }
}
</script>
<style scoped>
.up,.down {
    height: 50vh;
}
.up {
    border-bottom: 1px solid #eeeeee;
}
</style>


