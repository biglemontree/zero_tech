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
            <div class="weui-cell weui-cell_select">
                <div class="weui-cell__bd">
                    <select class="weui-select" name="DJLX" v-model="DJLX">
                        <option :selected="signTypes[0].name" @click="fetchYwInfoList" v-for="(item, index) in signTypes" :key="index" :value="item">{{item.name}}</option>
                    </select>
                </div>
            </div>
        </div>
       <div class="weui-cells__title">详细类型</div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_select">
                <!-- <div class="weui-cell__hd"><label for="" class="weui-label">变更登记</label></div> -->
                <div class="weui-cell__bd">
                    <select class="weui-select" name="todo" v-model="todo">
                        <option :selected="ywInfoList[0].name" v-for="(item, index) in ywInfoList" :key="index" :value="item">{{item.name}}</option>
                    </select>
                </div>
            </div>

        </div>
       <div class="weui-cells__title">申请类型选择</div>
        <div class="weui-cells weui-cells_checkbox" name="SQLX">
            <label class="weui-cell weui-check__label" for="s11">
                <div class="weui-cell__hd">
                    <input type="radio" class="weui-check" v-model="SQLX" value="单方申请" name="radio1" id="s11" checked="checked">
                    <i class="weui-icon-checked"></i>
                </div>
                <div class="weui-cell__bd">
                    <p>单方申请</p>
                </div>
            </label>
            <label class="weui-cell weui-check__label" for="s12">
                <div class="weui-cell__hd">
                    <input type="radio" name="radio1" class="weui-check" v-model="SQLX" value="双方申请" id="s12">
                    <i class="weui-icon-checked"></i>
                </div>
                <div class="weui-cell__bd">
                    <p>双方申请</p>
                </div>
            </label>
            <label class="weui-cell weui-check__label" for="s13">
                <div class="weui-cell__hd">
                    <input type="radio" name="radio1" class="weui-check" v-model="SQLX" value="其他" id="s13">
                    <i class="weui-icon-checked"></i>
                </div>
                <div class="weui-cell__bd">
                    <p>其他</p>
                </div>
            </label>
        </div>
        <div class="weui-btn-area">
            <a href="javascript:;" class="weui-btn weui-btn_primary" @click="nextStep">下一步</a>
        </div>
    </div>
        
</template>

<script>

import vstore from '@/store.js'
import { mapState, mapMutations } from 'vuex'

import request from "../../utils/request";
import api from "../../constants/api";

export default {
  name: "preAudit",
  store: vstore,
  data() {
    return {
        todo: '',
        DJLX: '',
        SQLX: '',
        checkUser: false,
        tdTypes: [],
        signTypes: [],
        ywInfoList: []
    };
  },
  mounted() {
    this.fetchSignTypes()
  },
  watch: {
      DJLX() {
            this.fetchYwInfoList()
      }
  },
  methods: {
      ...mapMutations(['setOnlineData']),
    fetchSignTypes() {
        request({
            url: api.getYwList
        },true).then(r => {
            this.signTypes = r.rows
        })
    },
    fetchYwInfoList() {
        request({
            url: api.getYwInfoList,
            data: {
                type: this.DJLX.id
            }
        }).then(r => {
            this.ywInfoList = r.rows
        })
    },
    fetchTdTypes() {
        request({
            url: api.getTdlxList
        }).then(r => {
            this.tdTypes = r.rows
        })
    },
    nextStep() {
        const {DJLX, SQLX, todo} = this
        this.setOnlineData({
            DJLX, SQLX, todo
        })
        this.$router.push({
            path: '/upload',
            // path: '/user',
        })
    }
  },
  components: {
  }
};
</script>

