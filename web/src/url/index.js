let URLS = {};

//用户的url接口
URLS.user = {
    userLogin:'/users/login', //用户登陆
    addUser:'',
    getUserInfo:'/users/getUserInfo', //h获取用户信息
    eidtUserPassword:'/users/updatePassword',//修改密码
    updateUserInfo:'/users/updateUserInfo',//修改个人信息

    addUser:'/users/addUser'
}

URLS.cate = {
    addConfig:'/category/addCategory',
    getList:'/category/getList',
    editItemList:'/category/updateCategory',
    delCategory:'/category/delCategory',
    setStoreroom:'/category/setStoreroom',
    getStoreroom:'/category/getStoreroom',
}

URLS.logistic = {
    addLogistic:'/logistic/addLogistic',
    getLogisticList:'/logistic/getAllLogistic',
    delLogistic:'/logistic/delLogistic',
    updateLogistic:'/logistic/updateLogistic',
    selectLogistivByParams:'/logistic/getLogisticByParams',
    getAreaLogistic:'/logistic/getAreaLogistic',
    updateTransmission:'/logistic/updateTransmission',
    userUpdateTransmission:'/logistic/userUpdateTransmission',

    userGetTransmission:'/logistic/userGetTransmission',

    getWeekData:'/logistic/userGetWeekData',
}

export default URLS;