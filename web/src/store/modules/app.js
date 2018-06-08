// import {otherRouter, appRouter} from '@/router/router';
// import Util from '@/libs/util';
// import Cookies from 'js-cookie';
import Vue from 'vue';

const app = {
    state: {
        currentPath: [
            {
                title: '首页',
                path: '',
                name: 'home_index'
            }
        ], // 面包屑数组
    },
    mutations: {
        setCurrentPath (state, pathArr) {
            state.currentPath = pathArr;
        },
        
    }
};

export default app;
