<template>
    <div class="detail">
        <nav-bar class="nav-bar">
            <div class="goback iconfont" slot="left" @click="goBack">
                <span class="icon-LeftArrow"></span>
            </div>
            <div slot="center">详情页</div>
        </nav-bar>
        <my-scroll class="myscroll" ref="myScroll">
            <detail-cover></detail-cover>
            <recommend><span slot="text">曲目详情</span></recommend>
            <detail-lyric :obj="audio" v-if="audio&&audio.data"></detail-lyric>
            <other-recommend :obj="otherJson" v-if="otherJson"></other-recommend>
        </my-scroll>
    </div>
</template>

<script>
import NavBar from "components/common/NavBar/navBar"
import MyScroll from "components/common/myscroll/MyScroll"
import {getDetail,getOther} from "@/network/api"
import {mapState,mapGetters,mapMutations} from "vuex"
import DetailCover from "./childComps/detailCover"
import MusicBar from "components/content/musicBar"
import Recommend from "components/content/recommend"
import DetailLyric from "./childComps/detailLyric"
import OtherRecommend from "./childComps/otherRecommend"
import debounce from "@/utils/debounce"

export default {
    name:'detail',
    components:{
        NavBar,
        DetailCover,
        MusicBar,
        Recommend,
        DetailLyric,
        MyScroll,
        OtherRecommend
    },
    data(){
        return {
            otherJson:[]
        }
    },
    computed:{
        ...mapState(['audio'])
    },
    methods:{
        ...mapMutations([
            'SET_AUDIO_DATA',
            'SET_AUDIO_PLAY'
        ]),
        goBack(){
            this.$router.replace("/home")
        },
        getMusicData(){
            this.$indicator.open()
            let id = this.$route.query.id
            getDetail(id).then(res=>{
                this.$indicator.close()
                if (res && res.data) {
                    this.SET_AUDIO_DATA(res.data)
                }
                console.log(res)
            }).catch(error=>console.log(error))
        },
        getOtherData(){
            this.$indicator.open()
            getOther().then(res=>{
                this.$indicator.close()
                this.otherJson = res.data
            }).catch(error=>console.log(error))
        }
    },
    mounted(){
        const refresh = debounce(this.$refs.myScroll.myRefresh,5)
        this.getMusicData()
        this.getOtherData()
        this.$bus.$on("imgLoad",()=>{
            refresh()
        })
    },
    watch: {
        $route(to, from) {
            if (this.$route.path.includes('detail')) {
                this.getMusicData()
                this.getOtherData()
            }
        }
    },
}
</script>

<style scoped>
    .detail{
        position:fixed;
        right:0;
        left:0;
    }
    .goback{
        font-size:25px;
    }
    .nav-bar{
        background-color:#85e885;
        color:#ffffff;
    }
    .myscroll{
        position:fixed;
        top:44px;
        bottom:49px;
    }
</style>
