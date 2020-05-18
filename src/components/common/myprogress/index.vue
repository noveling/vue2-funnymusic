<template>
    <div class="progress">
        <div class="progress-inner" :style="`width:${rate}`"></div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            rate:0
        }
    },
    methods:{
        setProgress(progress){
            this.rate = progress
        }
    }
}
</script>

<style scoped>
    .progress{
        width:100%;
        height:2px;
        background: rgba(255, 255, 255, 0.9);
        padding:3px;
    }
    .progress-inner{
        width:0%;
        height:100%;
        background-color: rgba(133, 232, 133, 0.7);
    }
</style>
