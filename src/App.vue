<template>
  <div id="app">
    <keep-alive exclude="detail"><router-view/></keep-alive>
    <music-bar v-if="audio&&audio.data"></music-bar>
  </div>
</template>

<script>
import {mapState} from "vuex"
import MusicBar from "components/content/musicBar"

export default {
  name: 'App',
  computed:{
    ...mapState(['audio'])
  },
  components:{
    MusicBar
  },
  mounted(){
    console.log(process.env)
  }
}
</script>

<style>
  
</style>
