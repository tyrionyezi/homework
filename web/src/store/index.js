/* vuex的仓库 */
import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
const store = new Vuex.Store({
    state:{
        userInfo:{
           status:false,
           info:{  
            email: '',
            headimg: '',
            nickname: '',
            password: '',
            age: '',
            phone: '',
            sex: '',
            userid: ''
           }
        },
        modulesName:{
            oneTitle:'',
            twoTitle:'',
        },
        showLoginDialog:false
    },
    mutations:{
        changeOneTitle(state,info){
            state.modulesName.oneTitle = info;
        },
        changeTwoTitle(state,info){
            state.modulesName.twoTitle = info;
        },
        changeStatus (state) {
            state.userInfo.status = !state.userInfo.status;
        },
        changeUserInfo (state, info) {
            for(var i in state.userInfo.info){
                state.userInfo.info[i] = info[i]
            }
        },
        loginDialog(state){
            state.showLoginDialog = !state.showLoginDialog;
        },
        loginDialogClose(state){
            state.showLoginDialog = false;
        }
    }
 })
 
 export default store;