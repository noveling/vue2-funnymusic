<template>
    <div class="music-list">
        <slot></slot>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .music-list{
        display:flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
</style>
