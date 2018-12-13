<template lang="html">
    <div v-if="!isSuccess">
        <div class="weui-cells__title" v-if="!isDeail">请选择您不动产登记受理地点</div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">受理点</label></div>
                <div class="weui-cell__bd">
                    蕉岭县
                    <!-- <input class="weui-input" name="" type="text" emptyTips="请输入受理点" placeholder="请输入受理点"/> -->
                </div>
            </div>
        </div>
        <div class="weui-cells__title" v-if="!isDeail">请选择你办理业务的类型</div>
        <div class="weui-cells">
            <div class="weui-cell ">
                <div class="weui-cell__hd"><label class="weui-label">预约类型</label></div>
                <div class="weui-cell__bd">
                    <div v-if="isDeail">{{detail.YWName}}</div>
                    <select v-else class="weui-select" name="YWLX" v-model="YWLX" required tips="请输入手机号" notMatchTips="请输入正确的手机号">
                        <option :selected="ywTypes[0].name" @click="fetchDate" v-for="(item, index) in ywTypes" :key="index" :value="item.name">{{item.name}}</option>
                    </select>
                </div>
                <div v-if="!isDeail" class="weui-panel__ft"><a class=" weui-cell_access weui-cell_link"><span class="weui-cell__ft"></span></a></div>
            </div>
        </div>

        <div class="weui-cells__title"></div>
        <div class="weui-cells">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">预约时间</label></div>
                <div class="weui-cell__bd">
                    <div v-if="isDeail">{{detail.YYRQ}}</div>
                    <select v-else class="weui-select" name="YYRQ" v-model="YYRQ">
                        <option :selected="availDate[0].createTime" @click="fetchDate" v-for="(item, index) in availDate" :key="index" :value="item.createTime">{{item.createTime}}</option>
                    </select>
                </div>
                <div v-if="!isDeail" class="weui-panel__ft"><a class=" weui-cell_access weui-cell_link"><span class="weui-cell__ft"></span></a></div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">预约时段</label></div>
                <div class="weui-cell__bd">
                    <div v-if="isDeail">{{detail.YYSJD}}</div>
                    <select v-else class="weui-select" name="YYSJD" v-model="YYSJD">
                        <option :selected="availTime[0].SJD" v-for="(item, index) in availTime" :key="index" :value="item.SJD">{{item.SJD}}(可预约:{{item.count}}人)</option>
                    </select>
                </div>
                <div v-if="!isDeail" class="weui-panel__ft"><a class=" weui-cell_access weui-cell_link"><span class="weui-cell__ft"></span></a></div>
            </div>
        </div>
        <div class="weui-cells__title"></div>
        <div class="weui-cells">
            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label class="weui-label">姓名</label>
                </div>
                <div class="weui-cell__bd">
                    {{$store.state.userInfo.userName}}
                </div>
            </div>
            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label class="weui-label">身份证号</label>
                </div>
                <div class="weui-cell__bd">
                    {{$store.state.userInfo.cardId}}
                </div>
            </div>
            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label class="weui-label">手机号码</label>
                </div>
                <div class="weui-cell__bd">
                    {{$store.state.userInfo.phone}}
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <a href="javascript:;" class="cancel weui-btn weui-btn_default" v-if="isDeail && detail.status===0" @click="cancel">取消预约</a>
            <a href="javascript:;" class="weui-btn weui-btn_primary" v-if="!isDeail" @click="save">下一步</a>
        </div>
    </div>
    <Feedback v-else @go="go">
        <div slot="tip-info">
            <i class="weui-icon-success weui-icon_msg"></i>
            <h3 class="icon-box__title">操作成功</h3>
            <p class="icon-box__desc c-666">您办理的不动产业务登记预约申请成功</p>
            <p class="icon-box__desc c-666">请您时刻注意微信公众号的提醒</p>
        </div>
    </Feedback>
        
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import store from 'store'
import vstore from '@/store.js'
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
        isSuccess: false,
        isDeail: false,
        ywTypes: [],
        availDate: [],
        availTime: [],
        id: '',
        YYSJD: '',
        YWLX: '',// 预约业务类型,
        YWName: '',// 预约业务类型名,
        YYRQ: '', // 日期
    };
  },
  store: vstore,
  mounted() {
    const {id} = this.$route.params 
    if (id) {
        request({
            url: api.getApplyDetail,
            data: {
                yyId: id
            }
        }).then(r => {
            this.detail = r.data
            this.isDeail = true
        })
    } else {
        this.fetchYwType()
        this.fetchDate()
    }
    this.$store.dispatch('actionUserInfo')
  },
  computed: {
      ...mapState(['userInfo'])
  },
  watch: {
      YYRQ() {
            this.fetchAvaiTime()
      }
  },
  methods: {
     go() {
        this.isSuccess = false
    },
    fetchAvaiTime() {
        request({
            url: api.getTime,
            data: {
                date: this.YYRQ
            }
        }).then(r => this.availTime = r.rows);
    },
    fetchYwType() {
        request({
            url: api.getYwList,
        },true).then(r => this.ywTypes = r.rows);
    },
    fetchDate() {
        request({
            url: api.getDate,
        },true).then(r => this.availDate = r.rows);
    },
    save() {
        const {userName, phone, cardId} = this.userInfo
        if (!this.YWLX) {
            weui.toast('请选择预约类型', {duration: 1000})
            return
        }
        request({
            url: api.onlineApply,
            data: {
                YYSJD: this.YYSJD, // "YYSJD": 预约时间段,
                YYRQ: this.YYRQ, // "YYRQ":预约日期,
                "CARD_ID": cardId, // 身份证号,
                YWLX: this.YWLX, // 预约业务类型,
                "name": userName, // 预约人姓名,
                "BLJG": '蕉岭县', // 办理机构,
            }
        }).then(() => this.isSuccess = true)
    },
    cancel() {
        const that = this
        weui.dialog({
        title: '提示',
        content: '确定取消当前预约吗',
        className: 'custom-classname',
        buttons: [{
            label: '取消',
            type: 'default',
        }, {
            label: '确定',
            type: 'primary',
            onClick: function () { that.postCancel() }
        }]
    })
    },
    postCancel() {
        const {id} = this.$route.params
        request({
            url: api.cancelApply,
            data: {yyId: id}
        }).then(() => {
            weui.toast('取消成功', {duration: 1000})
            this.$router.push({
                path: '/list',
            })
        })
    }
  },
  components: {
    Feedback
  }
};
</script>

