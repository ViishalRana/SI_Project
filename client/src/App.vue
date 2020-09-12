<template>
<div id="app">
  <app-header></app-header>
  <component :is="curComponent" :curState="curState"></component>
</div>
</template>

<script>
import Header from './components/general/Header.vue'
import Home from './components/general/Home.vue'
import Gujarat from './components/states/Gujarat.vue'
import State from './components/general/State.vue'
import AW from './components/general/Awareness.vue'
export default {
  components:{
    'app-header': Header,
    'app-home':Home,
    'GJ':Gujarat,
    'app-state':State,
    'app-awarness':AW
  },
  data(){
    return {
      curComponent:'app-home',
      curState:null
    }
  },
  methods:{
    change(cs){
      if(cs=="TT"){
        this.curComponent='app-home';
        curState=null;
      }
      else if(cs=='AWRNS'){
        this.curComponent='app-awarness';
        curState=null;
      }
      else{
        this.curComponent='app-state';
        this.curState=cs;
      }
      console.log("it works.!");
    },
    loadAwarness(){
      this.curComponent='app-awarness';
    }
  }
}
</script>

<style scoped>

</style>
