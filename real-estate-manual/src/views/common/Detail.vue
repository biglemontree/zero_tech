<template lang="html">
    <div v-if="isSuccess">
        <div class="weui-cells__title">请选择您不动产登记受理地点</div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">受理点</label></div>
                <div class="weui-cell__bd">
                    五华县
                    <!-- <input class="weui-input" name="" type="text" emptyTips="请输入受理点" placeholder="请输入受理点"/> -->
                </div>
            </div>
        </div>
        <div class="weui-cells__title">请选择你办理业务的类型</div>
        <div class="weui-cells">
            <div class="weui-cell ">
                <div class="weui-cell__hd"><label class="weui-label">受理点</label></div>
                <div class="weui-cell__bd">
                    综合类型
                    <!-- <input class="weui-input" name="" type="text" emptyTips="请输入受理点" placeholder="请输入受理点"/> -->
                </div>
            </div>
        </div>

        <div class="weui-cells__title"></div>
        <div class="weui-cells">
            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label class="weui-label">姓名</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" v-model="name" placeholder="请输入完整姓名">
                </div>
            </div>
            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label class="weui-label">身份证号</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" v-model="IDCardNum" placeholder="请输入身份证号">
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">预约时段</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="date" value="" placeholder=""/>
                </div>
                <div class="weui-cell__bd">
                    <select class="weui-select" name="select1">
                        <option selected="" value="1">受理点</option>
                        <option value="2">QQ号</option>
                        <option value="3">Email</option>
                    </select>
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
                    <input class="weui-input" type="number" v-model="phone" placeholder="请输入手机号">
                </div>
            </div>
        </div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_vcode">
                <div class="weui-cell__hd">
                    <label class="weui-label">验证码</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="tel" v-model="code" placeholder="请输入验证码">
                </div>
                <div class="weui-cell__ft">
                    <a href="javascript:;" @click="sendCode" class="weui-vcode-btn">获取验证码</a>
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <a href="javascript:;" class="weui-btn weui-btn_primary">下一步</a>
        </div>
    </div>
    <Feedback v-else>
        <div slot="tip-info">
            <i class="weui-icon-success weui-icon_msg"></i>
            <h3 class="icon-box__title">操作成功</h3>
            <p class="icon-box__desc c-666">您办理的不动产业务登记预约申请成功</p>
            <p class="icon-box__desc c-666">请您时刻注意微信公众号的提醒</p>
        </div>
    </Feedback>

</template>

<script>
import axios from 'axios'
import NodeRSA from "node-rsa";
import qs from 'qs'
import request from "../../utils/request";
import api from "../../constants/api";
import consts from "../../constants/";
import Feedback from "../common/Feedback";

export default {
  name: "home",
  data() {
    return {
        phone: null,
        name: '',
        IDCardNum: '',
        code: '',
        isSuccess: true
    };
  },
};
</script>

