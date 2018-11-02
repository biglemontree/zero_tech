<template lang="html">
    <div>
        <div class="weui-cells__title">不动产坐落</div>
        <div class="weui-cells">
            <div class="weui-cell ">
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" v-model="ZL" placeholder="请输入地址">
                </div>
            </div>
        </div>
        <div class="weui-cells__title">宗地编号</div>
        <div class="weui-cells">
            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label class="weui-label">宗地代码</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" v-model="ZDDM" placeholder="请输入宗地代码">
                </div>
            </div>
        </div>
        <div class="weui-cells">
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">原不动产权证明号</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" v-model="QLRXM" placeholder="请输入原不动产权证明号">
                </div>
            </div>
        </div>
        <div class="weui-cells">
            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label class="weui-label">不动产单元号</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" v-model="QLRXM" placeholder="请输入不动产单元号">
                </div>
            </div>
        </div>
        <div class="weui-cells__title">宗地用途</div>
        <div class="weui-cells">
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">宅基地</label>
                </div>
                <div class="weui-cell__bd">
                    <select class="weui-select" name="BDCLX" v-model="BDCLX">
                    <option selected="住宅" value="住宅">住宅</option>
                    <option value="商铺">商铺</option>
                </select>
                </div>
            </div>
        </div>
        <div class="weui-cells__title">宗地信息</div>
        <div class="weui-cells">
            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label class="weui-label">不动产类型</label>
                </div>
                <div class="weui-cell__bd">
                    <select class="weui-select" name="QLRZJLX" v-model="QLRZJLX">
                        <option selected="住宅" value="住宅">住宅</option>
                        <option value="商铺">商铺</option>
                    </select>
                </div>
            </div>
            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label class="weui-label">宗地面积</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" v-model="YT" placeholder="平方米">
                </div>
            </div>
            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label class="weui-label">建筑物面积</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" v-model="QLRXM" placeholder="平方米">
                </div>
            </div>

        </div>
        <div class="weui-btn-area">
            <a href="javascript:;" class="weui-btn weui-btn_primary" @click="save">下一步</a>
        </div>
    </div>
        
</template>

<script>
import { mapState, mapMutations } from "vuex";
import store from "store";
import vstore from "@/store.js";
import request from "../../utils/request";
import api from "../../constants/api";

export default {
  name: "user",
  data() {
    return {
      QLRTXDZ: "",
      QLRZJH: "",
      QLRYB: "",
      QLRZJLX: "",
      QLRXM: "",

        ZL: '',
        ZDDM: '',
      YT: '',
      JZWMJ: ''
    };
  },
  store: vstore,
  mounted() {
    this.fetchUserInfo();
  },
  computed: {
    ...mapState(["userInfo"])
    //   this.$store.state
  },
  methods: {
    ...mapMutations(["fetchUserInfo"]),
    fetchAvaiTime() {
      request({
        url: api.getTime,
        data: {
          date: this.YYRQ
        }
      }).then(r => (this.availTime = r.rows));
    },
    fetchYwType() {
      request({
        url: api.getYwList
      }).then(r => (this.ywTypes = r.rows));
    },
    fetchDate() {
      request({
        url: api.getDate
      }).then(r => (this.availDate = r.rows));
    },
    save() {
      const { userName, phone, cardId } = this.userInfo;
      request({
        url: api.onlineApply,
        data: {
          YYSJD: this.YYSJD, // "YYSJD": 预约时间段,
          YYRQ: this.YYRQ, // "YYRQ":预约日期,
          CARD_ID: cardId, // 身份证号,
          // "FWSZXZQY":房屋所在行政区域,
          QLRZJLX: this.QLRZJLX, // 预约业务类型,
          // "BDCDZ":不动产地址,
          // "YYYWID": 预约业务类型Id,
          // "YYYWName":预约业务名(小分类)
          // "YWName": '',// 预约业务类型名（大分类）,
          name: userName, // 预约人姓名,
          BLJG: "蕉岭县" // 办理机构,
        }
      }).then(() => (this.isSuccess = true));
    }
  }
};
</script>

