import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import { resolve } from 'path';
import {routers, appRouter} from './router';
Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

// export const router = new VueRouter(RouterConfig);  //不知道为什么这样写不行
export default new VueRouter(RouterConfig)  //这样写是可以的  but don't know wh










// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'login',
//       component:resolve=>require(['@/views/home/login'],resolve),
//     },
//     /**
//      * 登陆页面
//      */
//     {
//       path:'/home/login',
//       name:'login',
//       component:resolve=>require(['@/views/home/login'],resolve),
//     },
//     /**
//      * data页面注释
//      */
//     {
//       path:'/Main',
//       name:'data',
//       component:resolve=>require(['@/views/Main'],resolve),
//     },

//     /**
//      *个人中心模块
//      */
//     {
//       path:'/user/me',
//       name:'me',
//       component:resolve=>require(['@/views/user/me'],resolve),
//     },
//   ]
// })
