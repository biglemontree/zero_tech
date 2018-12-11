<template>
    <div>
        <div class="Header">
            <div class="head-pic">
                <img src="../../assets/icon_01.png" style="width: 20px;">
            </div>
            <span class="headerFont">{{title}}</span>
        </div>
        <div>
            <div class="weui-cells">
                <router-link class="weui-cell weui-cell_access" :to="(link+'?id='+items.id+'&sectype='+items.sectype
                    +'&title='+items.title)" 
                    v-for="(items,val,index) in dataList" 
                    :key="index">
                    <div class="weui-cell__bd">
                        <img class="myIcon" src="../../assets/icon_022.png" />
                        <p v-if="link=='notice-detail'">{{items.title}}</p>
                        <p v-if="link=='/notice-sec'">{{items.sectype}}</p>
                        <!-- <slot name="name"></slot> -->
                    </div>
                    <div class="weui-cell__ft">
                    </div>
                </router-link>
                <a v-if="dataList.length==0">
                    <div class="noMore">暂无数据</div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'notice',
    data() {
        return {
            
        }
    },
    props: {
        title: String,
        dataList: Array,
        link: String
    }
}
</script>

<style scoped>
/*vue 防止卡顿出现标签的样式*/
    [v-cloak] {
        display: none
    }
    /*公用样式*/
    .Header {
        background-color: #3b84ea;
        height: 44px;
        line-height: 44px;
    }

    .head-pic {
        width: 28px;
        height: 28px;
        line-height: 28px;
        float: left;
        border: 0px solid red;
        margin-top: 12px;
        margin-left: 12px;
    }

    .myIcon {
        width: 20px;
        display: inline;
        float: left;
        margin-right: 10px;
    }

    .headerFont {
        text-align: left;
        padding-left: 10px;
        color: #ffffff;
        font-weight: bold;
    }

    .pageBtn {
        margin: 0 auto;
        text-align: center;
    }
    /*设置Cell的lineheight 使得里面的内容居中*/
    .weui-cells-lineheight {
        display: table-cell;
        vertical-align: middle;
        line-height:30px;
    }
    .weui-cells-lineheight img {
        margin-right: 5px;
        vertical-align: middle;
    }
    .important {
        color: red !important;
    }
    .msgValid{
        margin:0 auto;
    }

.yo-scroll {
    position: absolute;
    top: 0.5rem;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}

.noMore {
    margin: 0 auto;
    text-align: center;
    font-size: 14px;
    color: #84888e;
    height: 60px;
    line-height: 60px;
    background-image: url(../../assets/nodata.png);
    background-repeat: no-repeat;
    background-size: 20px 20px;
    background-position-x: 38%;
    background-position-y: center;
}
</style>