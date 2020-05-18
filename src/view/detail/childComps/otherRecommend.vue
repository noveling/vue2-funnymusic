<template>
    <div class="other-recommend">
        <recommend><span slot="text">更多推荐</span></recommend>
        <music-list class="muisc-list">
            <music-item v-for="(item,index) in obj" :key="index" :obj="item" @imgLoad="imgLoad"></music-item>
        </music-list>
    </div>    
</template>

<script>
import MusicItem from "components/content/musicList/musicItem"
import MusicList from "components/content/musicList/musicList"
import Recommend from "components/content/recommend"
export default {
    components:{
        MusicItem,
        MusicList,
        Recommend
    },
    props:{
        obj:{
            default:[],
            type:Array
        }
    },
    methods:{
        imgLoad(){
            this.$bus.$emit("imgLoad")
        }
    }
}
</script>

<style scoped>
    .other-recommend{
        background-image:linear-gradient(to bottom,white,#f5e8d7,white)
    }
</style>
