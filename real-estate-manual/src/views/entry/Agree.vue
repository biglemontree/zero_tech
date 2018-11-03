<template>
    <div>
        <div >
            <img class="top" src="../../assets/logo.png" alt="" srcset="">
        </div>
        <label for="weuiAgree" class="weui-agree">
            <input id="weuiAgree" type="checkbox" class="weui-agree__checkbox">
            <span class="weui-agree__text">
                阅读并同意<a href="javascript:void(0);">《相关条款》</a>
            </span>
        </label>

        <div class="weui-btn-area">
            <router-link to="/verify">
                <button class="weui-btn weui-btn_primary" id="showTooltips">确定</button>
            </router-link>
            <a class="cancel weui-btn weui-btn_default" href="javascript:" id="cancel">取消</a>
        </div>
    </div>
</template>
<script>
import online from '../../assets/online-apply.png'
export default {
    name: 'agree',
    data() {
        return {
            online
        }
    }
}
</script>
<style scoped>
.top {width: 100vw;}
.cancel {margin-top: 20px;}
</style>


