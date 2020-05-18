<template>
    <div class="music-item" @click="pathToDetail">
        <div class="item-image-container">
            <img class="item-image" :src="obj.sound.pic_500" alt="..." @load="imgLoad">
            <div class="iconfont icon-fire" v-if='obj.sound.is_hot' :class="obj.sound.is_hot | colorFilter"></div>
        </div>
        <div class="title">{{obj.sound.name}}</div>
        <div class="item-channel">
            <div class="item-channel-value">{{obj.sound.channel.name}}</div>
            <div class="item-channel-label">频道</div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        obj:{
            type:Object,
            default:()=>{}
        }
    },
    filters:{
        colorFilter(colorKey){
            switch(colorKey){
                case 1: return 'fire-red'
                case 3: return 'fire-yellow'
                case 4: return 'fire-blue'
            }
        }
    },
    methods:{
        imgLoad(){
            this.$emit("imgLoad")
        },
        pathToDetail(){
            this.$router.push({
                path:"/detail",
                query:{
                    id:this.obj.sound.id
                }
            })
        }
    }
}
</script>

<style scoped>
    .music-item{
        width:44%;
        color:#666;
    }
    .item-image-container{
        position:relative;
    }
    .item-image-container .iconfont{
        position:absolute;
        display:flex;
        justify-content: center;
        align-items:center;
        background-color:#ffffff;
        width:15%;
        height:15%;
        top:10px;
        right:10px;
        border-radius:50%;
    }
    img{
        width:100%;
    }
    .title{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding:3px;
        font-size:12px;
    }
    .item-channel{
        display:flex;
        justify-content: space-between;
        padding:3px;
        margin-bottom:10px;
        font-size:10px;
    }
    .item-channel-value{
        max-width:80%;
        text-overflow:ellipsis;
        white-space: nowrap;
        overflow: hidden;
        color:#7dd97f;
    }
    .item-channel-label{
        color:#aaa;
    }
    .fire-red{
        color:#ed3d57;
    }
    .fire-yellow{
        color:#f3993e;;
    }
    .fire-blue{
        color:#3a94f7;
    }
</style>
