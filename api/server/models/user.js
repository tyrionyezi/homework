
const dbUtils = require('./../utils/db'); // 引入链接池
const userSql = require('./../sql/users')

var userModels = {
    

    /**
     *  在用户表种查询用户
     */

     async selectUserByUserNameAndPwd(args){
         console.log("222");
         console.log(args);
         let result = await dbUtils.query(userSql.selectUserByUserNameAndPwd,[args.user]);
         return result;


     },

     /**
      * 根据用户id查询用户信息
      */
     async getUserInfoById(id){
         console.log(id);
         
         let result  = await dbUtils.query(userSql.selectUserByUserId,id);
         return result;

     },

     /**
      * 更新用户密码
      * 
      */
     async updateUserPassword(args){
         console.log("___"+args);
         let result = await dbUtils.query(userSql.updateUserPassword,[args.password,args.id]);
         return result;
     },

     /**
      * 更新用户基本信息
      * @param {*} args 
      */
     async updateUserInfo(args){
         console.log(args);
         let result = await dbUtils.query(userSql.updateUserInfo,[args.name,args.sex,args.tel1,args.tel2,args.email,args.area,args.id]);
         console.log(result);
         return result;
     },

     /**
      * 添加用户
      * @param {*} args 
      */
     async addUser(args){
         console.log(args);
         let result =  await dbUtils.query(userSql.insertUser,[args.name,args.sex,args.tel1,args.tel2,args.email,args.areaId]);
         console.log(result);
         return result;
     },

     /**
      * 查询用户通过手机号！
      * @param {*} t 
      */
    async selectUserByTel1(t){
         console.log(t);
         let result = await dbUtils.query(userSql.selectUserByTel1,t);
         return result;
         
     }
     
     

}

module.exports = userModels;