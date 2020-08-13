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
export default {
  components:{
    'app-header': Header,
    'app-home':Home,
    'GJ':Gujarat,
    'app-state':State
  },
  data(){
    return {
      curComponent:'app-home',
      curState:null
    }
  },
  methods:{
    change(cs){
      this.curComponent='app-state';
      this.curState=cs;
      console.log("it works.!");
    }
  }
}
</script>

<style scoped>

</style>
