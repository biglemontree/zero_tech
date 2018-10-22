<template lang="html">
    <div v-if="isSuccess">
        <div class="weui-cells__title">请选择您不动产登记受理地点</div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">受理点</label></div>
                <div class="weui-cell__bd">
                    蕉岭县
                    <!-- <input class="weui-input" name="" type="text" emptyTips="请输入受理点" placeholder="请输入受理点"/> -->
                </div>
            </div>
        </div>
        <div class="weui-cells__title">请选择你办理业务的类型</div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_select">
                <div class="weui-cell__bd">
                    <select class="weui-select" name="select1">
                        <option selected="" value="1">受理点</option>
                        <option value="2">QQ号</option>
                        <option value="3">Email</option>
                    </select>
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
                    <input class="weui-input" type="text" placeholder="请输入完整姓名">
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
                    <input class="weui-input" type="tel" placeholder="请输入手机号">
                </div>
            </div>
        </div>
        <div class="weui-cells">
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
import NodeRSA from "node-rsa";
import request from "../../utils/request";
import api from "../../constants/api";
import Feedback from "../common/Feedback";
const publicKey =
  "-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQChaN2wLApfaKBORUjanb6ocZbG9Y7ckp8o2o0yJavymbFmzzrm3ONa7cSVJOs5Q6SUl+KPnJSlU89cmd80Il/7ZiBgYNHieTySmPf/6U1qKELaBlDUsLGY93WSFHoqXEwYvXI6xarQNuS8QZUPk9DKkC/C669U/X6DR3K39h7H3wIDAQAB-----END PUBLIC KEY-----";
const key = new NodeRSA();
key.setOptions({encryptionScheme: 'pkcs1'})
key.importKey(publicKey);
const x = key.encrypt(18122059359, "base64");
console.log('x', x)

export default {
  name: "home",
  data() {
    return {
      isSuccess: true
    };
  },
  mounted() {
    request({
      url: api.SendCode,
      data: {
        phone: x
      }
    });
  },
  components: {
    Feedback
  }
};
</script>

