<template>
    <div id="uploader">
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
                            
                            <li v-for="(file, index) in fileList" :key="index" class="weui-uploader__file weui-uploader__file_status" :style="`background-image:url(${imgURL}/${file.url})`">
                                <div class="weui-uploader__file-content">
                                    <i class="weui-icon-warn"></i>
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

export default {
    name: 'upload',
    data() {
        return {
            needUploads: [],
            fileList: []
        }
    },
    store: vstore,
    mounted() {
        this.fetchNeedFiles().then(r => {
            let ids = ''
            for (let index = 0; index < r.rows.length; index++) {
                const item = r.rows[index]
                const {id} = item
                ids += id + ','
                this.upload(index, id)
            }
            this.$store.state.fileIds = ids
        })
    },
    // computed: {
    //     ...mapState(['needUploads'])
    // },
    methods: {
        ...mapMutations(['fetchNeedFiles']),
        next() {
            this.$router.push({
                path: '/user'
            })
        },
        upload(index, id) {
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
                onSuccess(r) {
                    console.log('success', r)
                    this.fileList = r.rows
                }
            })
        },
        fetchNeedFiles(state) {
            return request({
                url: api.fileList,
                data: {
                    YWID: this.$store.state.onlineData.todo
                }
            })
            .then(r => {
                this.needUploads = r.rows
                return r
            })
        },
        
    }
}
</script>

