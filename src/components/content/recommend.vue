<template>
    <div class="recommend">
        <div class="title"><slot name="text">每日推荐</slot></div>
    </div> 
</template>

<script>
export default {

}
</script>

<style scoped>
    .recommend{
        padding:20px 0;
    }
    .title{
        text-align:center;
        font-size:15px;
        width:30%;
        margin:0 auto;
        padding:10px;
        background-color:#d6ffd6;
        color:#639e5e;
        border-radius:20px;
    }
</style>
