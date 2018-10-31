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
            <div class="weui-cell ">
                <div class="weui-cell__hd"><label class="weui-label">受理点</label></div>
                <div class="weui-cell__bd">
                    综合类型
                    <!-- <input class="weui-input" name="" type="text" emptyTips="请输入受理点" placeholder="请输入受理点"/> -->
                </div>
                <!-- <div class="weui-cell__bd">
                    <select class="weui-select" name="select1">
                        <option selected="" value="1">受理点</option>
                        <option value="2">QQ号</option>
                        <option value="3">Email</option>
                    </select>
                </div> -->
            </div>
        </div>

        <div class="weui-cells__title"></div>
        <div class="weui-cells">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">预约时间</label></div>
                <div class="weui-cell__bd">
                    <div v-if="isDeail">{{detail.YYSJD}}</div>
                    <!-- <input v-else class="weui-input" type="date" value="" placeholder=""/> -->
                    <select class="weui-select" name="YYRQ">
                        <option selected="" value="2018-09-30">2018-09-30</option>
                        <option value="2018-09-31">2018-09-31</option>
                        <option value="3">Email</option>
                    </select>
                </div>
            </div>
            <div class="weui-cell ">
                <div class="weui-cell__hd"><label class="weui-label">预约时段</label></div>
                <div class="weui-cell__bd">
                    <select class="weui-select" name="YYSJD">
                        <option selected="" v-for="(item, index) in availTime" :key="index" value="item.SJD">{{item.SJD}}</option>
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
                </div>
            </div>
            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label class="weui-label">身份证号</label>
                </div>
                <div class="weui-cell__bd">
                </div>
            </div>
            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label class="weui-label">手机号码</label>
                </div>
                <div class="weui-cell__bd">
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <a href="javascript:;" class="cancel weui-btn weui-btn_default" v-if="isDeail" @click="cancel">取消预约</a>
            <a href="javascript:;" class="weui-btn weui-btn_primary" v-else @click="save">下一步</a>
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
        isSuccess: true,
        isDeail: false,
        availTime: [],
        phone: null,
        name: '',
        IDCardNum: '',
        "YYSJD": '',
        "YWLX": '',// 预约业务类型id,
        "YWName": '',// 预约业务类型名,
        YYRQ:'2018-10-30', // 日期
    };
  },
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
        this.fetchAvaiTime()
    }
  },
  methods: {
    fetchAvaiTime() {
        request({
            url: api.getTime,
            data: {
                date: this.YYRQ
            }
        }).then(r => this.availTime = r.rows);
    },
    save() {
        request({
            url: api.getTime,
            data: {
                // "FWSZXZQY":房屋所在行政区域,
                // "YYSJD": 预约时间段,
                // "YWLX": 预约业务类型id,
                // "YWName": 预约业务类型名,
                // "YYRQ":预约日期,
                // "BDCDZ":不动产地址,
                // "YYYWID": 预约业务类型Id,
                // "YYYWName":预约业务名
                // // "YWName":预约业务名,
                // "name": 预约人姓名,
                // "BLJG": 办理机构,
                // "CARD_ID":身份证号,
                // "id": "650857697473",
                // "ZCLX": 资产类型（0国有1集体）
            }
        })
    },
    cancel() {
        const {id} = this.$route.params
        request({
            url: api.cancelApply,
            data: {yyId: id}
        }).then(() => weui.toast('取消成功'))
    }
  },
  components: {
    Feedback
  }
};
</script>

