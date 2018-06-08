// import { resolve } from 'path';
import Main from '@/views/Main.vue';


// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    // component: () => import('@/views/login.vue')
    component:resolve=>require(['@/views/login'],resolve),
};


/**
 * Main 作为父容器 所有的正常的业务代码都在 main里面作为main的子路由
 */
export const appRouter = [
    // {
    //     path: '/access',
    //     icon: 'key',
    //     name: 'access',
    //     title: '权限管理',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '权限管理', name: 'access_index', component: () => import('@/views/access/access.vue') }
    //     ]
    // },

    {
        path:'/home',
        icon:'home',
        name:'home',
        title:'主页面',
        component:Main,
        children:[
            {
                path:"/",
                title:'首页',
                name:'home',
                meta:{
                    title:'工作情况'
                },
                // component:resolve=>require(['@/views/user/index'],resolve),
                component: () => import('@/views/home/home.vue')
            }
        ]
    },
    {
        path:'/user',
        icon:'user',
        name:'user',
        title:'个人中心',
        component:Main,
        children:[
            {
                path:"index",
                title:'个人中心首页',
                name:'user_index',
                meta:{
                    title:'个人中心'
                },
                // component:resolve=>require(['@/views/user/index'],resolve),
                component: () => import('@/views/user/index.vue')
            }
        ]
    },
    {
        path:'/logistics',
        icon:'logistics',
        name:'logistics',
        title:'所有物流信息',
        component:Main,
        children:[
            {
                path:"list",
                name:'logistics_list',
                meta:{
                    title:'物流信息'
                },
                // component:resolve=>require(['@/views/user/index'],resolve),
                component: () => import('@/views/data/list.vue')
            },
            {
                path:"transtation",
                name:'transtation',
                meta:{
                    title:'运输情况'
                },
                // component:resolve=>require(['@/views/user/index'],resolve),
                component: () => import('@/views/data/transtation.vue')
            },
            {
                path:"add",
                title:'物流添加',
                name:'logistics_add',
                meta:{
                    title:'添加物流'
                },
                // component:resolve=>require(['@/views/user/index'],resolve),
                component: () => import('@/views/data/add.vue')
            },
        ]
    },
    {
        path:'/config',
        icon:'config',
        name:'config',
        title:'系统配置',
        component:Main,
        children:[
            // {
            //     path:"/",
            //     title:'配置列表',
            //     name:'config_list',
            //     // component:resolve=>require(['@/views/user/index'],resolve),
            //     component: () => import('@/views/basicConfig/list.vue')
            // },
            {
                path:"deliveryList",
                title:'配置列表',
                name:'deliveryList',
                meta:{
                    title:'配送分类列表'
                },
                // component:resolve=>require(['@/views/user/index'],resolve),
                component: () => import('@/views/basicConfig/deliveryList.vue')
            },
            {
                path:"materialList",
                title:'配置列表',
                name:'materialList',
                meta:{
                    title:'物质分类列表'
                },
                // component:resolve=>require(['@/views/user/index'],resolve),
                component: () => import('@/views/basicConfig/materialList.vue')
            },
            {
                path:"storeroomList",
                title:'配置列表',
                name:'storeroomList',
                meta:{
                    title:'物流仓库列表'
                },
                // component:resolve=>require(['@/views/user/index'],resolve),
                component: () => import('@/views/basicConfig/storeroomList.vue')
            },
            {
                path:"add",
                title:'添加配置',
                name:'config_add',
                meta:{
                    title:'添加配置'
                },
                // component:resolve=>require(['@/views/user/index'],resolve),
                component: () => import('@/views/basicConfig/add.vue')
            },
           
        ]
    }
];

/**
 * 所有上面定义的路由都要写在下面的routers里
 */
export const routers = [
    loginRouter,
    ...appRouter,
    // otherRouter,
    // preview,
    // locking,
    // page500,
    // page403,
    // page404
];