<template lang="html">
    <div >
        <!-- <div class="weui-cells__title">所有权选择</div>
        <div class="weui-cells">
            <div class="weui-cell__bd">
                <select class="weui-select" name="YYRQ" v-model="YYRQ">
                    <option :selected="signTypes[0].createTime" @click="fetchDate" v-for="(item, index) in signTypes" :key="index" :value="item.name">{{item.name}}</option>
                </select>
            </div>
        </div> -->
        <div class="weui-cells__title">登记类型选择</div>
        <div class="weui-cells">
            <!-- <div class="weui-cell__hd"><label for="" class="weui-label">变更登记</label></div> -->
            <div class="weui-cell__bd">
                <select class="weui-select" name="DJLX" v-model="DJLX">
                    <option :selected="signTypes[0].DJLX" v-for="(item, index) in signTypes" :key="index" :value="item.DJLX">{{item.DJLX}}</option>
                </select>
            </div>
        </div>
       
       <div class="weui-cells__title">申请类型选择</div>
        <div class="weui-cells weui-cells_checkbox">
            <label class="weui-cell weui-check__label" for="s11">
                <div class="weui-cell__hd">
                    <input type="checkbox" class="weui-check" name="checkbox1" id="s11" checked="checked">
                    <i class="weui-icon-checked"></i>
                </div>
                <div class="weui-cell__bd">
                    <p>单方申请</p>
                </div>
            </label>
            <label class="weui-cell weui-check__label" for="s12">
                <div class="weui-cell__hd">
                    <input type="checkbox" name="checkbox1" class="weui-check" id="s12">
                    <i class="weui-icon-checked"></i>
                </div>
                <div class="weui-cell__bd">
                    <p>双方申请</p>
                </div>
            </label>
            <label class="weui-cell weui-check__label" for="s12">
                <div class="weui-cell__hd">
                    <input type="checkbox" name="checkbox1" class="weui-check" id="s12">
                    <i class="weui-icon-checked"></i>
                </div>
                <div class="weui-cell__bd">
                    <p>其他</p>
                </div>
            </label>
        </div>
        <div class="weui-btn-area">
            <a href="javascript:;" class="weui-btn weui-btn_primary" @click="checkUser">下一步</a>
        </div>
    </div>
        
</template>

<script>

import store from 'store'
import request from "../../utils/request";
import api from "../../constants/api";
import consts from "../../constants/";
import Feedback from "../common/Feedback";

export default {
  name: "preAudit",
  data() {
    return {
        tdTypes: [],
        signTypes: [],
    };
  },
  mounted() {
    this.fetchTdTypes()
  },
  methods: {
    fetchSignTypes() {
        request({
            url: api.getYwList
        }).then(r => {
            this.signTypes = r.rows
        })
    },
    fetchTdTypes() {
        request({
            url: api.getTdlxList
        }).then(r => {
            this.tdTypes = r.rows
        })
    },
  },
  components: {
  }
};
</script>

