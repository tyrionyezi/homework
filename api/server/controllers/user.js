/**
 *  用户操作 用户contorller
 * 
 */

const usrService = require('./../services/userService'); //调用service层数据

var  users = {
     
    /**
     * 添加用户
     */
    addUser:function(){

    },

    /**
     * 查询用户
     */

     async getUserInfo(da){
         let self = this;
         let res = await usrService.getUserInfo(da);
         return res;
         
         
     },

     /**
      * login 
      */
     async userLogin(da){
         console.log(da.id);
         let self = this;
         let res = await usrService.getUser(da);
         return res; 
     },

     /**
      * 更新密码
      * @param {*} da 
      */
     async updatePassword(da){
        console.log("updatePassword");
        console.log(da);
        let res = await usrService.updateUserPassword(da);
        return res; 
     },

     /**
      * 更新用户信息
      * @param {*} da 
      */
     async updateUserInfo(da){
         let res = await usrService.updateUserInfo(da);
         return res;
     },

     /**
      * 管理员添加用户
      * @param {*} da 
      */
     async addUser(da){
         let res = await usrService.addUser(da);
         return res;
     }
}

module.exports = users