import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import { resolve } from 'path';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component:resolve=>require(['@/views/home/login'],resolve),
    },
    {
      path:'home/login',
      name:'login',
      component:resolve=>require(['@/views/home/login'],resolve),
    }
  ]
})
