<template lang="html">
    <div>
        <div class="weui-cells__title">登记证号</div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_select">
                <!-- <div class="weui-cell__hd">
                    <label class="weui-label">宅基地</label>
                </div> -->
                <div class="weui-cell__bd">
                    <select class="weui-select" name="YT" v-model="BDCQZH" >
                        <option @click="fetchHouseInfo" v-for="(item, index) in houseInfoArr" :key="index" :value="item">{{item}}</option>
                        <!-- :selected="houseInfoArr[0]" -->
                        <!-- <option selected="住宅" value="住宅" @click="fetchYwInfoList">住宅</option>
                        <option value="商铺">商铺</option> -->
                    </select>
                </div>
            </div>
        </div>
        <div class="weui-cells__title">权利人信息</div>
        <div class="weui-cells">
            <div class="weui-cell c-666" v-for="(item, index) in house.FWSUOYQLR.split('、')">
                <span>
                    {{item}}
                </span>
                <span class="mx-10">
                    {{house.QLRZJBH.split('、')[index]}}
                </span>
            </div>
        </div>            
        
        <div class="weui-cells__title">房屋信息</div>
        <div class="weui-cells">
            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label class="weui-label">证书类型</label>
                </div>
                <div class="weui-cell__bd c-666">
                    
                </div>
            </div>
            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label class="weui-label">坐落</label>
                </div>
                <div class="weui-cell__bd c-666">
                    {{house.FDZL}}
                </div>
            </div>
            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label class="weui-label">用途</label>
                </div>
                <div class="weui-cell__bd c-666">
                     {{house.GHYT}}
                </div>
            </div>
            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label class="weui-label">面积</label>
                </div>
                <div class="weui-cell__bd c-666">
                     {{house.JZMJ}}
                </div>
            </div>
            <div class="weui-cell ">
                <div class="weui-cell__hd">
                    <label class="weui-label">状态</label>
                </div>
                <div class="weui-cell__bd c-666">
                     {{house.status}}
                </div>
            </div>
        </div>
        <div class="c-666 px-20 fs-12px">
            <div class="my-10px">
                说明
            </div>
            <ul>
                <li>1、申请人查询范围仅包含在本县级范围内已依法进行登记的不动产（房产）信息；</li>
                <li>2、查询以个人为单位进行，不包含家庭其他成员单独登记的不动产（房产）信息；</li>
                <li>3、查询结果如用于缴税、银行按揭等，按照税务、银行等单位的有关要求进行查询，建议申请人以家庭为单位查询不动产登记情况；</li>
                <li>4、对查询结果有异议，请到五华县不动产登记中心进行核查；</li>
                <li>5、自助查询与档案查询不符的，以纸质档案查询为准。</li>
            </ul>
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
  name: "houseInfo",
  data() {
    return {
        BDCQZH: '', // 登记证号
        house: {}
    };
  },
  store: vstore,
  mounted() {
    // this.fetchUserInfo();
    
    this.BDCQZH = this.houseInfoArr[0]
    this.house = this.firstHouseDetail
    // this.fetchHouseInfo()

  },
  watch: {
      BDCQZH() {
            this.fetchHouseInfo()
      }
  },
  computed: {
    ...mapState(["userInfo",'firstHouseDetail','houseInfoArr'])
  },
  methods: {
    ...mapMutations(["fetchUserInfo"]),
    fetchHouseInfo() {
        // debugger
        request({
            url: api.queryHouseDetail,
            data: {
                BDCQZH: this.BDCQZH
            }
        }).then(r => { 
            this.house = r.data
        })
    }
  }
};
</script>

