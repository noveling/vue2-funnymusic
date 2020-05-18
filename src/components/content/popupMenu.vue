<template>
    <div class="popup-menu">
        <mt-popup v-model="popupVisable" position="bottom" class="play-list-sheet">
            <div class="list-container">
                <div class="playList-header">
                    <div class="playList-mode-btn left">清空</div>
                    <div class="playList-title">播放列表<span class="playList-count">（{{playList.length}}首）</span>
                    </div>
                    <div class="playList-mode-btn right iconfont" @click="changeMode"><span :class="activeIcon(playMode)"></span></div>
                </div>
                <ul class="playList" v-if="playList && playList.length > 0">
                    <li class="playList-item" v-for="item in playList" :key="item.sound.id" :class="{'playing': audio.data.sound.id === item.sound.id}" @click="musicChange(item)">
                        <div class="item-name" :class="audio.data.sound.id === item.sound.id ? 'is-playing': 'queued'">
                            <!-- icon -->
                            <div class="name-icon-container iconfont">
                                <div class="name-icon" :class="audio.data.sound.id === item.sound.id ? 'icon-audiotrack': 'icon-StopFilled'"></div>
                            </div>
                            <!-- 名字 -->
                            <div class="name-value" :class="audio.data.sound.id === item.sound.id ? 'onPlay': '' ">{{item.sound.name}}</div>
                        </div>
                        <!-- 删除按钮 -->
                        <div class="item-close my-icon-close"></div>
                    </li>
                </ul>
            </div>
        </mt-popup>
        <!-- 播放模式 -->
        <mt-popup class="playModeSheet" v-model="playModeVisable" position="bottom">
            <ul class="playModeList">
                <li class="playMode-item" v-for="(item, index) in playModeOptions" :key="index" :class="{'active':playMode == item.value}" @click="selectMode(item.value)">
                    <div class="playMode-title">{{item.label}}</div>
                    <div class="iconfont playMode-icon"><span :class="item.icon"></span></div>
                </li>
            </ul>
        </mt-popup>
    </div>
</template>

<script>
import {mapState,mapMutations} from "vuex"
import { ArrayOptions, findActiveMode } from '@/utils/playMode'
export default {
    computed:{
        ...mapState(['playList','audio','playMode']),
    },
    data(){
        return{
            playModeOptions: ArrayOptions,
            popupVisable:false,
            playModeVisable:false
        }
    },
    methods:{
        ...mapMutations([
            'SET_AUDIO_DATA',
            'SET_PLAY_MODE',
            'SET_PLAY_LIST'
        ]),
        musicChange(item){
            this.SET_AUDIO_DATA(item)
        },
        // 切换显示（供父组件调用）
        toggleVisable() {
            this.popupVisable = !this.popupVisable
        },
        changeMode(){
            this.playModeVisable = ! this.playModeVisable
        },
        activeIcon(val){
            return findActiveMode(val).icon
        },
        selectMode(val){
            this.SET_PLAY_MODE(val)
        }
    }
}
</script>

<style scoped>
    ul{
        list-style:none;
        margin:0;
        padding:0;
    }
    .is-playing{
        color: #58bf37;
    }
    .queued{
        color:#777;
    }
    .play-list-sheet{
        width:100%;
    }
    .playList-header{
        display:flex;
        text-align:center;
        line-height:45px;
        color: #6ed56c;
        font-size:13px;
    }
    .left{
        width:20%;
    }
    .right{
        width:20%
    }
    .playList-title{
        flex:1;
    }
    .playList-item{
        display:flex;
        font-size:13px;
        line-height:38px;
        color:#666;
    }
    .item-name{
        display:flex;
    }
    .name-icon-container{
        width:38px;
        height:38px;
        text-align:center;
    }
    .playModeSheet{
        width:100%;
    }
    .playModeList{
        width:100%;
    }
    .playMode-item{
        width:100%;
        display:flex;
        justify-content:space-between;
        align-items:center;
        height:44px;
    }
    .playMode-title{
        font-size:13px;
        margin-left:16px;
        color:#666;
    }
    .playMode-icon{
        font-size:18px;
        color:#555;
        margin-right:14px;
    }
    .active .playMode-title{
        color:#58bf37;
    }
</style>
