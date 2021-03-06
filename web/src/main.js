// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router/index'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// 
import areaData from 'area-data';
Vue.use(iView);
// console.log(areaData);
Vue.config.productionTip = false


//挂载axios
import exAxios from "@/axios/axios.js"

Vue.prototype.$http = exAxios;



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router:router,
  store,
  components: { App },
  template: '<App/>'
})
