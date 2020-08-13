import Vue from 'vue'
import App from './App.vue'
import { VuejsDatatableFactory } from 'vuejs-datatable';

Vue.use( VuejsDatatableFactory );

new Vue({
  el: '#app',
  render: h => h(App)
})
