<template>
    <div class="detail-cover" v-if="audio&&audio.data">
        <img class="cover-img" :src="audio.data.sound.pic_500">
        <div class="progress-bar-container" @click = "changeProgress">
            <div class="progress-time">{{audio.currentTime | sec2his}}/{{audio.duration | sec2his}}</div>
            <div class="progress-bar" :style="`width:${audio_progress}`"></div>
        </div>
        <!-- 控制 -->
        <div class="control">
            <div class="control-playBtn" :class="audio.play ? 'play' : 'pause'" @click="SET_AUDIO_PLAY(!audio.play)"></div>
            <div class="control-info">
                <div class="info-name"><p>{{audio.data.sound.name}}</p></div>
                <div class="info-source">
                    <a class="info-author"><p>{{audio.data.sound.user.name}}</p></a>
                    <div class="info-label">发布在</div>
                    <a class='info-channel'><p>{{audio.data.sound.channel.name}}</p></a>
                    <div class="info-label">频道</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState,mapMutations,mapGetters} from "vuex"
export default {
    computed:{
        ...mapState(['audio']),
        ...mapGetters(['audio_progress'])
    },
    methods:{
        ...mapMutations(['SET_AUDIO_PLAY']),
        changeProgress(e){
            e = e || window.event
            let percent = Math.floor(e.pageX / window.innerWidth * 100) / 100
            this.audio.ele.currentTime = this.audio.ele.duration * percent
        }
    },
    filters:{
        sec2his: t => {
            if (~~t || t < 1) {
                var tt = Math.round(t)
                var m = Math.floor(t / 60)
                var s = tt % 60
                m = m >= 10 ? m : '0' + m
                s = s >= 10 ? s : '0' + s
                return m + ':' + s
            } else {
                return t
            }
        },
    }
}
</script>

<style scoped>
    .detail-cover{
        position:relative;
        width:100%;
        font-size:0;
    }
    img{
        width:100%;
    }
    .control{
        position:absolute;
        display:flex;
        bottom:0;
        font-size:14px;
        color:#ffffff;
        padding:8px 10px;
        align-items: center;
        background-color:rgba(0,0,0,0.5);
        width:100%;
    }
    .control-playBtn{
        width:50px;
        height:50px;
    }
    .play{
        background:url("~@/assets/img/play.png") no-repeat;
        background-size:cover;
    }
    .pause{
        background:url("~@/assets/img/pause.png") no-repeat;
        background-size:cover;
    }
    .control-info{
        display:flex;
        flex-direction: column;
        padding:0px 10px;
        justify-content: space-between;
        line-height:20px;
    }
    .info-source{
        display:flex;
        justify-items: center;
    }
    .info-author{
        color:#7dd97f;
        padding:0 4px;
        max-width:100px;
    }
    .info-channel{
        color:#7dd97f;
        padding:0 4px;
        max-width:100px;
    }
    .info-name{
        max-width:295px;
    }
    .info-name>p,.info-channel>p,.info-author>p{
        margin:0;
        overflow:hidden;
        text-overflow: ellipsis;
        white-space:nowrap;
    }
    .progress-bar-container{
        width:100%;
        height:14px;
        position:absolute;
        bottom:66px;
    }
    .progress-time{
        width:100%;
        height:100%;
        position:absolute;
        display:flex;
        font-size:6px;
        align-items: center;
        color:#ffffff;
        z-index:9;
        margin-left:10px;
    }
    .progress-bar{
        height:100%;
        background-color:rgba(133,232,133,0.3);
        position: absolute;
        border-right:10px solid rgb(136, 240, 136);
    }
</style>
