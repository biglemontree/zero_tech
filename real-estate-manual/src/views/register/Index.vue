<template lang="html">
    <div>
        <div class="weui-cells__title">请选择您不动产登记受理地点</div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">qq</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" pattern="[0-9]*" placeholder="请输入qq号"/>
                </div>
            </div>
            <div class="weui-cell weui-cell_vcode">
                <div class="weui-cell__hd">
                    <label class="weui-label">手机号</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="tel" placeholder="请输入手机号">
                </div>
                <div class="weui-cell__ft">
                    <a href="javascript:;" class="weui-vcode-btn">获取验证码</a>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">日期</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="date" value=""/>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">时间</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="datetime-local" value="" placeholder=""/>
                </div>
            </div>
            <div class="weui-cell weui-cell_vcode">
                <div class="weui-cell__hd"><label class="weui-label">验证码</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" placeholder="请输入验证码"/>
                </div>
                <div class="weui-cell__ft">
                    <!-- <img class="weui-vcode-img" src="./images/vcode.jpg" /> -->
                </div>
            </div>
        </div>
        <div class="weui-cells">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <p>标题文字</p>
                </div>
                <div class="weui-cell__ft">说明文字</div>
            </div>
        </div>
    </div>
        
</template>

<script>
import NodeRSA from "node-rsa";
import request from "../../utils/request";
import api from "../../constants/api";
const publicKey =
  "-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQChaN2wLApfaKBORUjanb6ocZbG9Y7ckp8o2o0yJavymbFmzzrm3ONa7cSVJOs5Q6SUl+KPnJSlU89cmd80Il/7ZiBgYNHieTySmPf/6U1qKELaBlDUsLGY93WSFHoqXEwYvXI6xarQNuS8QZUPk9DKkC/C669U/X6DR3K39h7H3wIDAQAB-----END PUBLIC KEY-----";
const key = new NodeRSA();
// key.setOptions({encryptionScheme: 'pkcs1'})
key.importKey(publicKey, "pkcs8-public");
const x = key.encrypt(18122059359, "base64");
export default {
  name: "home",
  mounted() {
    request({
      url: api.SendCode,
      data: {
        phone: x
      }
    });
  }
};
</script>

