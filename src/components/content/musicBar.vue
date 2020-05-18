<template>
    <div class="music-bar">
        <audio id='audio' autoplay="autoplay" :src="audio_data.sound.source"></audio>  
        <div class="music-info">
            <div class="music-img"><img :src="audio_data.sound.pic_500"></div>
            <div class="music-name">
                <div class="info-name">
                    <p>{{audio_data.sound.name}}</p>
                </div>
                <div class="info-author">
                    <p>{{audio_data.sound.user.name}}</p>
                </div>
            </div>
        </div>  
        <div class="music-control">
            <div class="my-icon-menu control-icon iconfont" @click="$refs.popup.toggleVisable()"><span class="icon-music-note"></span></div>
            <!-- 播放/暂停 -->
            <div class="control-icon control-icon-mid iconfont" @click="SET_AUDIO_PLAY(!audio_play)"><span :class="audio_play?'icon-el-hg-icon-stop':'icon-StopFilled'"></span></div>
            <!-- 下一首 -->
            <div class="my-icon-next control-icon iconfont" @click="listRepeatMode()"><span class="icon-NexttrackFilled"></span></div>
        </div>
        <popup-menu ref="popup"></popup-menu>
        <my-progress ref="myprogress"></my-progress>
    </div>            
</template>

<script>
import {mapState,mapGetters,mapMutations} from "vuex"
import PopupMenu from "./popupMenu"
import MyProgress from "components/common/myprogress"
export default {
    components:{
        PopupMenu,
        MyProgress
    },
    computed:{
        ...mapState({
            audio_ele: state => state.audio.ele,
            audio_data: state => state.audio.data,
            audio_play: state => state.audio.play,
            playList: state => state.playList,
            playMode: state => state.playMode
        }),
        ...mapGetters([
            'audio_progress'
        ]),
        btnState(){
            
        }
    },
    watch:{
        audio_play(val) {
            val ? this.audio_ele.play() : this.audio_ele.pause()
        },
        audio_progress(val){
            this.$refs.myprogress.setProgress(val)
        }
    },
    methods:{
        ...mapMutations([            
            'SET_AUDIO_ELE',
            'SET_AUDIO_DATA',
            'SET_AUDIO_PLAY',
            'SET_AUDIO_DURATION',
            'SET_AUDIO_CURREN_TIME',
            'SET_PLAY_MODE',
            'SET_PLAY_LIST']),
        // 对audio进行初始化
        audioInit() {
            // 设置audio元素
            let _audio = this.$el.querySelector('#audio')
            this.SET_AUDIO_ELE(_audio)
            // 可以播放
            _audio.oncanplay = () => {
                // Tip: 如果直接打开音乐详情页在一些浏览器中是不允许自动播放的，如：chrome、safari等
                _audio.play()
                // 设置时长
                this.SET_AUDIO_DURATION(_audio.duration)
            }
            // 播放位置改变
            _audio.ontimeupdate = () => {
                // 设置当前时间
                this.SET_AUDIO_CURREN_TIME(Math.floor(_audio.currentTime))
            }
            // 正在播放
            _audio.onplay = () => {
                this.SET_AUDIO_PLAY(true)
            }
            // 暂停
            _audio.onpause = () => {
                this.SET_AUDIO_PLAY(false)
            }
            // 结束
            _audio.onended = () => {
                console.log("播放完了")
                this.SET_AUDIO_PLAY(false)
                // 加载播放模式逻辑
                switch (this.playMode) {
                    case 'default':this.listRepeatMode()
                        break
                    case 'random': this.randomMode()
                        break
                    case 'singleRepeat': this.singleRepeatMode()
                        break
                    case 'listRepeat': this.listRepeatMode()
                        break
                }
            }
        },
        // 随机播放
        randomMode() {
            // 0 ~ 播放列表的长度，随机得到一个数
            // 如果随机数对应的音乐和当前播放的音乐相同的话，采取listRepeatMode方法的逻辑，否则播放
            let index = ~~(Math.random() * this.playList.length)
            let isCurrentSame = this.playList[index].sound.id === this.audio_data.sound.id
            if (isCurrentSame) {
                this.listRepeatMode()
            } else {
                this.SET_AUDIO_DATA(this.playList[index])
            }
        },
        // 单曲循环
        singleRepeatMode() {
            this.audio_ele.load()
            this.audio_ele.play()
        },
        // 列表循环
        listRepeatMode() {
            // 获取当前音乐位置currentIndex
            // currentIndex是结尾的话，nextIndex就等于0，否则 +1
            // 只有一首音乐，播放模式是列表循环或者用户点击下一首的情况：重新加载并播放当前的音乐
            let currentIndex = this.playList.findIndex(n => n.sound.id === this.audio_data.sound.id)
            if (currentIndex > -1) {
                let nextIndex
                currentIndex === this.playList.length - 1
                    ? nextIndex = 0
                    : nextIndex = currentIndex + 1
                let isCurrentSame = this.playList[nextIndex].sound.id === this.audio_data.sound.id
                if (isCurrentSame) {
                    this.singleRepeatMode()
                } else {
                    this.SET_AUDIO_DATA(this.playList[nextIndex])
                }
            } else {
                console.warn('正常逻辑不会到这里啊')
            }
        },
    },
    mounted(){
        this.audioInit()
    }
}
</script>

<style scoped>
    img{
        max-width:100%;
        max-height:100%;
    }
    .music-info{
        display:flex;
        width:60%;
    }
    .music-img{
        box-sizing:border-box;
        height:100%;
        padding:3px;
        width:49px;
    }
    .music-name{
        display: flex;
        flex-direction: column;
        font-size:9px;
        justify-content: space-evenly;
        text-align:left;
        color:#777474;
        overflow: hidden;
    }
    .music-name p{
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow:hidden;
        margin:0;
        padding:0;
        max-width:165px;
    }
    .music-control{
        width:40%;
        display:flex;
        align-items:center;
        justify-content: space-evenly;
    }
    .music-bar{
        height:49px;
        display:flex;
        flex-wrap: wrap;
        border:1px solid #fff;
        box-shadow: 0 0 2px #eee;
        position:fixed;
        bottom:0;
        left:0;
        right:0;
        background-color:#ffffff;
    }
    .control-icon{
        width:40px;
        height:40px;
        line-height:40px;
        font-size:26px;
        text-align:center;
        color:#666;
    }
</style>
