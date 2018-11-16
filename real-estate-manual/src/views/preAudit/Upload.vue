<template>
    <div id="uploader">
        <div v-if="needUploads.length>0">
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
                                <input id="uploaderInput" :dataset="item.id" class="weui-uploader__input" type="file" accept="image/*" multiple />
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
export default {
    name: 'upload',
    data() {
        return {
            imgURL,
            // fileList: [],
            ids: ''
        }
    },
    store: vstore,
    mounted() {

        this.$store.dispatch('actionNeedFiles').then(r => {
            for (let index = 0; index < r.rows.length; index++) {
                const item = r.rows[index]
                const {id} = item
                this.upload(index, id).then(r => {
                    const {rows} = r
                    const arr = this.$store.state.fileList[index]
                    if (arr) {
                        this.$store.state.fileList[index].push(rows)
                    } else {
                        this.$store.state.fileList[index] = []
                        this.$store.state.fileList[index].push(rows)
                    }
                    const ids = rows.reduce((total, item) => item.id+','+ total, '')
                    fieldids = fieldids + ids
                })
            }
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
            this.$store.state.fileIds = fieldids
            this.$router.push({
                path: '/user'
            })
        },
        upload(index, id) {
            return new Promise((resolve, reject) => {
                let ids = ''
                weui.uploader('#uploader'+index, {
                    url: `${baseURL}zmwjlx/uploadFile`,
                    auto: false,
                    type: 'file',
                    fileVal: 'file',
                    compress: {
                        width: 1600,
                        height: 1600,
                        quality: .8
                    },
                    onQueued() {
                        this.upload()
                    },
                    onBeforeSend(data, headers) {
                        console.log(this);
                        $.extend(data, { 
                            zmwjlxId: id,
                            token: store.get('token')
                        }); // 可以扩展此对象来控制上传参数
                    },
                    onSuccess: resolve,
                    onError() {
                        return true
                    }
                })
            })
        },
    }
}
</script>

