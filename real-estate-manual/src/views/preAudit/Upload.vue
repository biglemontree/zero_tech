<template>
    <div id="uploader">
        <div v-if="needUploads.length>0" id="form">
            <div v-for="(item, index) in needUploads" :key="index" :id="'uploader'+index">
                <div class="weui-cells__title">证明文件类型</div>
                <div class="weui-cells weui-cells_form" >
                    <div class="weui-uploader">
                        <div class="weui-uploader__hd">
                            <p class="weui-uploader__title">{{item.WJLX}}</p>
                            <!-- <div class="weui-uploader__info">0/2</div> -->
                        </div>
                        <div class="weui-uploader__bd">
                            <ul class="weui-uploader__files" id="uploaderFiles">
                                
                                <li v-for="(file, j) in fileList[index]" :key="j" class="weui-uploader__file weui-uploader__file_status" :style="`background-image:url(${imgURL}/${file.url})`">
                                    <div class="weui-uploader__file-content">
                                        <i class="weui-icon-warn"></i>
                                        {{file.url}}
                                    </div>
                                </li>
                                <!-- <li class="weui-uploader__file weui-uploader__file_status" style="background-image:url(./images/pic_160.png)">
                                    <div class="weui-uploader__file-content">50%</div>
                                </li> -->
                            </ul>
                            <div class="weui-uploader__input-box">
                                <input id="uploaderInput" :dataset="item.id" required emptyTips="请上传文件" class="weui-uploader__input" type="file" accept="image/*" multiple />
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
        <div v-else class="center" style="minHeight: 40vh;marginTop: 18vh">暂无需要提交相关证明文件</div>
        <div class="weui-btn-area">
            <a href="javascript:;" class="weui-btn weui-btn_primary" @click="next">下一步</a>
        </div>
    </div>
</template>

<script>
import store from 'store'
import vstore from '@/store.js'
import { mapState, mapMutations } from 'vuex'
 
import request,{baseURL, imgURL} from "../../utils/request";
import api from "../../constants/api";

let fieldids = ''
let fieldArr = []
export default {
    name: 'upload',
    data() {
        return {
            imgURL,
            idArr: [],
            ids: ''
        }
    },
    store: vstore,
    mounted: function (){
        this.$store.dispatch('actionNeedFiles').then(async r => {
            await r.rows.map(async (item, index) => {
                const {id} = item
                const res = await this.upload(index, id)
                const {rows} = res
                    const arr = this.$store.state.fileList[index]
                    if (arr) { // 返回数据持久化
                        this.$store.state.fileList[index].push(rows) // 上传成功后,回显示图片
                    } else {
                        this.$store.state.fileList[index] = []
                        this.$store.state.fileList[index].push(rows)
                    }
                    console.log(rows, 'res 返回的')
                    const ids = rows.reduce((total, item) => {
                        fieldArr.push(item.id)
                        return item.id+','+ total
                    }, '')
                    // fieldids = fieldids + ids
            })
        })
    },
    computed: {
        ...mapState(['needUploads', 'fileList'])
    },
    destroyed() {
        this.$store.state.fileList = []
    },
    methods: {
        ...mapMutations(['fetchNeedFiles']),
        next() {
            console.log(this.idArr)
            this.$store.state.fileIds = this.idArr.join(',')
            if (fieldArr.length<3) {
                weui.toast('请上传相应的图片')
                return
            }
            this.$router.push({
                path: '/user'
            })
        },
        upload(index, id) {
            const that = this
            return new Promise((resolve, reject) => {
                weui.uploader('#uploader'+index, {
                    url: `${baseURL}zmwjlx/uploadFile`,
                    auto: true,
                    type: 'file',
                    fileVal: 'file',
                    compress: {
                        width: 1600,
                        height: 1600,
                        quality: .8
                    },
                    onQueued() {
                        // this.upload(index, id)
                        // uploadList.push(this)
                    },
                    onBeforeSend(data, headers) {
                        $.extend(data, { 
                            zmwjlxId: id,
                            token: store.get('token')
                        }); // 可以扩展此对象来控制上传参数
                    },
                    // onSuccess: resolve,
                    onSuccess: (res) => {
                        console.log('res...', res)
                        that.idArr.push(res.rows[0].id)
                        resolve(res)
                    },
                    onError() {
                        return true
                    }
                })
            })
        },
    }
}
</script>

