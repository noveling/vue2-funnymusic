<template>
    <div class="myswiper">
        <mt-swipe class="swiper" :auto="4000" v-if="json.length>0">
            <mt-swipe-item class="swiper-item" v-for="(item, index) in json" :key="index">
                <img :src="item.sound.pic_640">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    props:{
        json:{
            type:Array,
            default:()=>{},
            required:true
        }
    }
}
</script>

<style scoped>
    .swiper{
        width:100%;
        height:150px;
    }
    img{
        display:block;
        width:100%;
    }
</style>
