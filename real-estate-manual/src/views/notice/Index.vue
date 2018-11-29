<template>
    <div id="app" class="yo-scroll" v-cloak>
        <Notice :dataList="dataList" :title="'通知公告'" >

        </Notice>
        <!-- <div >
            <div class="Header">
                <div class="head-pic">
                    <img src="../../assets/icon_01.png" style="width: 20px;">
                </div>
                <span class="headerFont">通知公告</span>
            </div>
            <div>
                <div class="weui-cells">
                    <a class="weui-cell weui-cell_access" :href="('GetTWList?twlabelid='+items.ID+'&title='+items.NAME)" v-for="(items,val,index) in dataList">
                        <div class="weui-cell__bd">
                            <img class="myIcon" src="../../assets/icon_022.png" />
                            <p>{{items.NAME}}</p>
                        </div>
                        <div class="weui-cell__ft">
                        </div>
                    </a>
                    <a v-if="dataList.length==0">
                        <div class="noMore">暂无数据</div>
                    </a>
                </div>
            </div>
        </div> -->
        <!-- <my-dialog v-bind:message="message"></my-dialog> -->
    </div>

</template>

<script>
import Notice from '../common/Notice';
export default {
    name: 'notice',
    data() {
        return {
            "dataList": [
                {
                "ID": "9E5BC5F31EB7485A9E97C44947A90A1F",
                "content": "公示公告",
                "PARENTID": "891E3C9EBA7B423E8F1D28C500FF7406",
                "KEY": "GSGG",
                "DESCRIPTION": null
            }, {
                "ID": "FDE39D7BC368467FB915E91F00B3A35A",
                "NAME": "首次登记公告",
                "PARENTID": "891E3C9EBA7B423E8F1D28C500FF7406",
                "KEY": "SCDJGG",
                "DESCRIPTION": null
            }, {
                "ID": "3C0023E7E42D4E85A809F4D02324A197",
                "NAME": "注销登记公告",
                "PARENTID": "891E3C9EBA7B423E8F1D28C500FF7406",
                "KEY": "ZXDJGG",
                "DESCRIPTION": null
            }, {
                "ID": "0962D54CA75F4EC480C7BD52DAB39FB7",
                "NAME": "遗失登记中心",
                "PARENTID": "891E3C9EBA7B423E8F1D28C500FF7406",
                "KEY": "YSDJZX",
                "DESCRIPTION": null
            }
            ]
        }
    },
    components: {
        Notice
    }
}
</script>


