<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from "better-scroll"
export default {
    name:"MyScroll",
    data(){
        return {
            scroll:null,
        }
    },
    props:{
        PullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    methods:{
        myRefresh(){
            this.scroll.refresh()
        }
    },
    mounted(){
        this.scroll = new BScroll(this.$refs.wrapper,{
            // 弹性设置
            bounce:false,
            
            // 下拉设置
            pullDownRefresh:false,
            // 监听滚动
            probeType:3,
            click:true,
            pullUpLoad:this.PullUpLoad,
            preventDefault:true
        })
        // 监听滚动
        this.scroll.on("scroll",pos=>{
            this.$emit("backToTop",pos)
        })
        this.scroll.on("pullingUp",()=>{
            this.$emit("pullingUp")
        })
    },
    beforeDestroy(){
    }
}
</script>

<style scoped>

</style>
