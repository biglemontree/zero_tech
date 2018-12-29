<template>
  <div class="home">
      <div class="weui-cells">
            <div class="weui-cell">
                <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
                    <img src="images/pic_160.png" style="width: 50px;display: block">
                    <span class="weui-badge" style="position: absolute;top: -.4em;right: -.4em;">8</span>
                </div>
                <div class="weui-cell__bd">
                    <p>联系人名称</p>
                    <p style="font-size: 13px;color: #888888;">摘要信息</p>
                </div>
            </div>
            <div class="weui-cell weui-cell_access">
                <div class="weui-cell__bd">
                    <span style="vertical-align: middle">我的预审</span>
                </div>
                <div class="weui-cell__ft"></div>
            </div>
            <div class="weui-cell weui-cell_access">
                <div class="weui-cell__bd">
                    <span style="vertical-align: middle">我的预约</span>
                </div>
            </div>
            <div class="weui-cell weui-cell_access">
                <div class="weui-cell__bd">
                    <span style="vertical-align: middle">个人信息修改</span>
                </div>
                <div class="weui-cell__ft"></div>
            </div>
        </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
  }
}
</script>
