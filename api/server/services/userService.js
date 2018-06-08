const userModel = require('./../models/user');
const _RES_ = require('./../utils/_RES_');
const _CW_ = require('./../CW/user');
var userService = {

    //user login 
    async getUser(da){
        console.log(arguments.callee);
        _RES_.init();
        let res = await userModel.selectUserByUserNameAndPwd(da);
        console.log("----"+JSON.stringify(res));
        if(res.length>0){
            console.log(da.password);
            console.log(res[0].password);
            console.log(da.password==res[0].password);
            if(da.password==res[0].password){
                _RES_.data = res;
            }else{
                _RES_.msg = _CW_.USER_PASSWORD_ERR;
                _RES_.isHDa = 0;
            }
        }else{
                _RES_.msg = _CW_.USER_NO_EXiST;
                _RES_.isHDa = 0;
        }
        return _RES_;
          
    },

    /**
     * get user info by id     获取登录人信息
     */

    async getUserInfo(da){
          _RES_.init();
          let res = await userModel.getUserInfoById(da.id);
          if(res.length>0){
            _RES_.data = res;
          }else{
            _RES_.msg = _CW_.USER_ACCOUNT_EXC;
            _RES_.isHDa = 0;
          }

          return _RES_;
    },
    /**
     * update user password
     * 
     */
    async updateUserPassword(da){
        _RES_.init();
        console.log("--"+da.id);
        let res_ = await userModel.getUserInfoById(da.id);
        console.log("修改结果");
        console.log(da.oldPass);
        console.log(res_[0].password);
        console.log(da.oldPass==res_[0].password);
        if(da.oldPass==res_[0].password){
            let res = await userModel.updateUserPassword(da);
            if(res.affectedRows==1){
                _RES_.data = 1;
                _RES_.msg = _CW_.BASE_REVISE_SUCCESS;
                
            }else{
                _RES_.data = 0;
                _RES_.msg = _CW_.BASE_REVISE_FALSE;
            }

        }else{
            _RES_.data = 0;
            _RES_.msg = _CW_.USER_OLD_PASSWORD_ERR;
        }
        return _RES_;

    },

    /**
     * 修改用户信息
     * @param {} da 
     */
    async updateUserInfo(da){
        _RES_.init();
        let res = await userModel.updateUserInfo(da);

        if(res.affectedRows==1){
            _RES_.msg = _CW_.BASE_REVISE_SUCCESS;
            _RES_.data = 1;
        }else{
            _RES_.msg = _CW_.BASE_REVISE_FALSE;
            _RES_.data = 0;
        }

        return _RES_;
    },

    /**
     * 添加用户
     * @param {*} da 
     */
    async addUser(da){
        _RES_.init();
        let res = await userModel.selectUserByTel1(da.tel1);
        if(res.length>0){
            _RES_.msg = _CW_.USER_EXIST;
            _RES_.data = 0;
        }else{
            let res_ =  await userModel.addUser(da);
            if(res_.affectedRows==1){
                _RES_.msg = _CW_.BASE_ADD_SUCCESS;
                _RES_.data = 1;
            }else{
                _RES_.msg = _CW_.BASE_ADD_FALSE;
                _RES_.data = 0;
            }
        }

        return _RES_;
          
    }


}

module.exports = userService;