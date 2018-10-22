<template>
    <div v-if="isSuccess">
        <div >
            <img class="top" src="../../assets/logo.png" alt="" srcset="">
        </div>
        <div class="weui-cells__title">请输入您的受理编号</div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">受理编号</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" name="" type="text" emptyTips="请输入受理编号" placeholder="请输入受理编号"/>
                </div>
            </div>
        </div>
        <div class="weui-cells__title">验证码输入</div>
        <div class="weui-cells">
            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label class="weui-label">手机号码</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="tel" placeholder="请输入手机号">
                </div>
            </div>
            <div class="weui-cell weui-cell_vcode">
                <div class="weui-cell__hd">
                    <label class="weui-label">验证码</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="tel" placeholder="请输入手机号">
                </div>
                <div class="weui-cell__ft">
                    <a href="javascript:;" class="weui-vcode-btn">获取验证码</a>
                </div>
            </div>
        </div>

        <div class="weui-btn-area">
            <button class="weui-btn weui-btn_primary" id="showTooltips">确定</button>
        </div>
    </div>
    <!-- <Feedback v-if="">
        <div slot="tip-info">
            <i class="weui-icon-success weui-icon_msg"></i>
            <h3 class="icon-box__title">已完结</h3>
            <p class="icon-box__desc c-666">受理编号</p>
        </div>
    </Feedback>
    <Feedback v-if="status">
        <div slot="tip-info">
            <i class="weui-icon-warn weui-icon_msg-primary"></i>
            <h3 class="icon-box__title">受理中</h3>
            <p class="icon-box__desc c-666">受理编号</p>
        </div>
    </Feedback> -->
</template>
<script>
import Feedback from "../common/Feedback"
export default {
    name: 'agree',
    data() {
        return {
            isSuccess: true,
            status: ''
        }
    },
  components: {
    Feedback
  }
}
</script>
<style scoped>
.top {width: 100vw;}
.weui-btn-area {margin-top: 60px;}
</style>


