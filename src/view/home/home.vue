<template>
    <div class="home">
        <nav-bar class="nav-bar"><div slot="center">A cup of music!</div></nav-bar>
        <my-scroll class="my-scroll" ref="myScroll" :PullUpLoad="isLoad" @pullingUp="pullingUp">
            <my-swiper :json="bannerData"></my-swiper>
            <recommend/>
            <music-list>
                <music-item v-for="(item,index) in listJson" :key="index" :obj="item" @imgLoad="imgLoad"></music-item>
            </music-list>
            <no-data v-if="noData"></no-data>
        </my-scroll>   
    </div>
</template>

<script>
import {mapState,mapMutations} from "vuex"
import NavBar from "components/common/NavBar/navBar"
import {getBanner,getList} from "network/api"
import MySwiper from "./childComps/mySwiper"
import MusicList from "components/content/musicList/musicList"
import MusicItem from "components/content/musicList/musicItem"
import Recommend from "components/content/recommend"
import MyScroll from "@/components/common/myscroll/MyScroll"
import NoData from "./childComps/noData"
import debounce from "@/utils/debounce"

export default {
    components:{
        NavBar,
        MySwiper,
        MusicList,
        MusicItem,
        Recommend,
        MyScroll,
        NoData
    },
    data(){
        return {
            bannerData:[],
            page:1,
            listJson:[],
            isLoad:true,
            noData:false
        }
    },
    methods:{
        ...mapMutations([
            'SET_AUDIO_DATA',
            'SET_PLAY_MODE',
            'SET_PLAY_LIST'
        ]),
        getBannerData() {
            getBanner().then(res => {
                console.log(res)
                this.bannerData = res.data
            })
        },
        getListData() {
            this.$indicator.open()
            this.page = 1
            getList(this.page).then(res => {
                this.listJson = res.data
                this.page = 2
                this.$indicator.close()
            })
        },
        pullingUp(){
            this.$indicator.open()
            getList(this.page).then(res=>{
                if(res.data && res.data.length > 0){
                    this.listJson.push(...res.data)
                    this.$indicator.close()
                    this.page++
                }else {
                    this.$indicator.close()
                    this.noData = true
                    this.$refs.myScroll.myRefresh()
                }
            }).catch(res=>console.log(res))
            this.$refs.myScroll.scroll.finishPullUp()
        },
        imgLoad:debounce(function(){
            this.$refs.myScroll.myRefresh()
        },10)
    },
    mounted(){
        this.getBannerData()
        this.getListData()
    },
    activated(){
        this.$refs.myScroll.myRefresh()
    },
}
</script>

<style scoped>
    .my-scroll{
        position:fixed;
        top:44px;
        bottom:0;
        right:0;
        left:0;
    }
    .nav-bar{
        background-color: #85e885;
        color:#ffffff;
        box-shadow:0 2px 10px rgba(100,100,100,.2);
    }
</style>
