<template>
    <div>
        <div >
            <img class="top" src="../../assets/logo.png" alt="" srcset="">
        </div>
        <div class="px-20 fs-12px">
            <div class="center my-20 fs-14px bold">蕉岭县不动产登记网上办事须知</div>
            <div>
                通过实名认证的申请人可通过网上预约办理各项登记业务，可上传材料进行网上预审，可网络查询登记事项进度情况。（特别提示：境外人士暂无法通过网上预约取号办理。） 为方便您有效进行预约，请抽空详细阅读以下网上办事规则：
            </div>
            <ol class="my-20">
                <div>
                    1. 网上预约，预约人须为不动产登记申请人或相关当事人，预约人须如实填写预约信息；若现场资料与预约信息明显不符，登记部门将不予办理预约确认
                </div>
                <div class="my-10">
                    2. 取消预约，应于约定日期前一天的24点前通过预约平台自行取消；无法网上自行取消的，可向提供预约服务的登记机构申请取消。约定办理日期未按时报到的视作失约
                </div>
                <div class="my-10">
                    3. 同一天如有未办结的预约，须待现有预约办结或取消后方可再次预约；同一天同一业务类型一个月连续3次预约成功后取消办理的，当月不能再次预约；同一手机号同一天只能预约一个登记机构；同一手机号一天内取消预约两次及以上当天不能预约，同一个月内取消预约三次及以上当月不能预约。全部申请人须在约定日期预约时段的最后十分钟前带齐全部登记资料前往约定登记机构报到，预约下午时段的只能下午报到，逾期报到或资料不齐的预约失效
                </div>
                <div class="my-10">
                    4. 网上预审，申请人需将所需资料按照要求上传。同一手机号，一次只能提交一次预审，如需再次提交，需等待上一次预审得出结果，方可再次提交
                </div>
                <div class="my-10">
                    5. 进度查询，申请人需根据受理编号，查询相关业务进度
                </div>
                <div class="my-10">
                    6. 所有网络业务办理，均需实名认证
                </div>
                <div class="my-10">
                    7. 苹果手机IOS系统需要升级到10.5及以上版本
                </div>
            </ol>
        </div>
        <label for="weuiAgree" id="form" class="weui-agree">
            <input id="weuiAgree" type="checkbox" required :checked="checked" v-model="checked" tips="请同意协议" class="weui-agree__checkbox">
            <span class="weui-agree__text">
                阅读并同意<a href="javascript:void(0);">《相关条款》</a>
            </span>
        </label>

        <div class="weui-btn-area">
            <button class="weui-btn weui-btn_primary" @click="next" id="showTooltips">确定</button>
            <!-- <a class="cancel weui-btn weui-btn_default" href="javascript:" id="cancel">取消</a> -->
        </div>
    </div>
</template>
<script>
import online from '../../assets/online-apply.png'
export default {
    name: 'agree',
    data() {
        return {
            checked: false
        }
    },

    methods: {
        next() {
            if (!this.checked) {
                weui.toast('请同意协议')
                return
            }
            this.$router.push({
                path: '/verify'
            })
        }
    }
}
</script>
<style scoped>
.top {width: 100vw;}
.cancel {margin-top: 20px;}
</style>


