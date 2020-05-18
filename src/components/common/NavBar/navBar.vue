<template>
    <div class="nav-bar">
        <div class="left"><slot name="left"></slot></div>
        <div class="center"><slot name="center"></slot></div>
        <div class="right"><slot name="right"></slot></div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .nav-bar{
        display:flex;
        height:44px;
        position:fixed;
        right:0;
        left:0;
        top:0;
        text-align:center;
        line-height:44px;
        z-index:9;
        font-size:16px;
    }
    .left{
        width:60px;
    }
    .center{
        flex:1;
    }
    .right{
        width:60px;
    }
</style>
