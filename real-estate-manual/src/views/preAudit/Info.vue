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
                    <select class="weui-select" name="YT" v-model="YT"> // todo
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
                    <input class="weui-input" type="text" v-model="ZDMJ" placeholder="平方米">
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
        <div class="weui-cells__title">不动产设立情况 </div>
        <div class="weui-cells weui-cells_checkbox">
            <label class="weui-cell weui-check__label" for="s11">
                <div class="weui-cell__hd">
                    <input type="checkbox" class="weui-check" name="checkbox1" id="s11" checked="checked">
                    <i class="weui-icon-checked"></i>
                </div>
                <div class="weui-cell__bd">
                    <p>地表 </p>
                </div>
            </label>
            <label class="weui-cell weui-check__label" for="s12">
                <div class="weui-cell__hd">
                    <input type="checkbox" name="checkbox1" class="weui-check" id="s12">
                    <i class="weui-icon-checked"></i>
                </div>
                <div class="weui-cell__bd">
                    <p>地上</p>
                </div>
            </label>
            <label class="weui-cell weui-check__label" for="s12">
                <div class="weui-cell__hd">
                    <input type="checkbox" name="checkbox1" class="weui-check" id="s12">
                    <i class="weui-icon-checked"></i>
                </div>
                <div class="weui-cell__bd">
                    <p>地下</p>
                </div>
            </label>
        </div>
        <div class="weui-cells__title">土地权利</div>
         <div class="weui-cells">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <select class="weui-select" name="BDCLX" v-model="TDLX">
                        <option :selected="index===0 && tdTypes[0].TDQLLX" v-for="(item, index) in tdTypes" :key="index" :value="item.TDQLLX">{{item.TDQLLX}}</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <a href="javascript:;" class="weui-btn weui-btn_primary" >下一步</a>
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

        ZDMJ: '',
        ZL: '',
        ZDDM: '',
      YT: '',
      JZWMJ: '',
      TDLX: '',
      bdcTypes: [], //
      tdTypes: [],
    };
  },
  store: vstore,
  mounted() {
    // this.fetchUserInfo();
    this.fetchTdType();
    this.fetchBdcType()
  },
  computed: {
    ...mapState(["userInfo"])
    //   this.$store.state
  },
  methods: {
    ...mapMutations(["fetchUserInfo"]),
    fetchTdType() { // 土地权利类型
      request({
        url: api.getTdqllxList,
      }).then(r => (this.tdTypes = r.rows));
    },
    fetchBdcType() {
      request({
        url: api.geetBdcslqkList
      }).then(r => (this.bdcTypes = r.rows));
    },
    
  }
};
</script>

