<template>
    <div class="detail-lyric">
        <template v-if='obj.data.sound.song_info'>
            <p v-if='obj.data.sound.song_info.album_name'>{{obj.data.sound.song_info.album_name.type}} : {{obj.data.sound.song_info.album_name.name}}</p>
            <p v-if='obj.data.sound.song_info.author'>{{obj.data.sound.song_info.author.type}} : {{obj.data.sound.song_info.author.name}}</p>
            <p v-if='obj.data.sound.song_info.name'>{{obj.data.sound.song_info.name.type}} : {{obj.data.sound.song_info.name.name}}</p>
        </template>
        <!-- 歌词 -->
        <div v-if="obj.data.sound.lyrics" v-html="obj.data.sound.lyrics"></div>
        <!-- 没有歌词 -->
        <div v-if="!obj.data.sound.song_info && !obj.data.sound.lyrics" class="noLyric">没有相关的歌词T T~ </div>
    </div>
</template>

<script>
export default {
    props:{
        obj:{
            default:()=>{},
            type:Object
        }
    }
}
</script>

<style scoped>
    .detail-lyric{
        white-space:pre-wrap;
        font-size:14px;
        line-height:20px;
        padding:8px 20px 6px;
        color:#555;
        text-align:center;
        background-image:linear-gradient(to bottom,white,#f5e8d7,white)
    }
    p{
        font-size:13px;
        padding:0;
        margin:0;
        color:#999;
    }
</style>
