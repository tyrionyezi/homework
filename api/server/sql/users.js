var userSQL = {
    selectUserByUserNameAndPwd:"SELECT * FROM user WHERE tel1 = ? ", // get uses by tel
    selectUserByUserId:'SELECT * FROM user WHERE id = ? ', //get user by id
    updateUserPassword:'UPDATE `user` set `password` = ? WHERE `id` = ?', //update user password
    updateUserInfo:'UPDATE `user` set name = ?, sex=?, tel1=?, tel2=?, email=?,area=? where id = ?', //update user info
    insertUser:'INSERT INTO `user` (name, sex, tel1, tel2,email,area) values(?,?,?,?,?,?)', //插入学生

    selectUserByTel1:'SELECT * FROM user WHERE tel1 = ? ',


}

module.exports = userSQL;