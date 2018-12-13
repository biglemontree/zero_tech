<template>
    <div class="page__bd page__bd_spacing ">
        <div class="icon-box flex items-center center justify-center">
            
            <div class="icon-box__ctn">
                <!-- <i class="weui-icon-success weui-icon_msg"></i>
                <h3 class="icon-box__title">提示</h3>
                <p class="icon-box__desc">用于表示信息提示；也常用于缺乏条件的操作拦截，提示用户所需信息</p> -->
                <slot name="tip-info"></slot>
            </div>
        </div>
            <!-- <i class="weui-icon-warn weui-icon_msg-primary"></i> -->
        <div class="weui-btn-area">
            <a href="javascript:;" @click="$emit('go')" class="weui-btn weui-btn_primary">确定</a>
        </div>
    </div>
</template>
<script>
export default {
    name: 'feedback',
    props: {
        type: String,
        go: Function
    },
    methods: {
        
    }
}
</script>
<style scoped>
.icon-box {
    height: 45vh;
}
.icon-box__title {
    margin-bottom: 14px;
}
p {
    font-size: 12px;
}
</style>

