const mysql = require('../utils/mysqlUtils.js')
const passport = require('../utils/passport');
/**
 * 根据fieldName 查询用户
 * @param {*} fieldName, fieldValue 
 */
exports.findUserByFieldName = async (fieldName, fieldValue) => {
    let mysqlOptions = {
        sql: `select * from user where ${fieldName} = ?`,
        args: [fieldValue],
    };
    return await mysql.execQuery(mysqlOptions);
}
/**
 * 添加用户
 * @param {*} user 
 */
exports.addUser = async (user) => {
    let mysqlOptions = {
        sql: 'insert into user (username, password, mobile, create_time, update_time) values (?,?,?,?,?)',
        args: [user.mobile, user.password, user.mobile, new Date(), new Date()],
    }
    let result = await mysql.execQuery(mysqlOptions);
    return result;
}
/**
 * 获取所有用户
 */
exports.findUserAll = async () => {
    let mysqlOptions = {
        sql: 'select * from user',
    };
    return await mysql.execQuery(mysqlOptions);
}
/**
* 更新用户信息
*/
exports.updateUserInfo = async(user) => {
    let mysqlOptions = {
        sql: 'update user set username = ?, avatar = ?, gender = ? where user_id = ?',
        args: [user.username, user.avatar, user.gender , user.user_id]
    }
    return await mysql.execQuery(mysqlOptions);
}
/**
* 更新用户头像
*/
exports.updateUserAvatar = async(user) => {
    let mysqlOptions = {
        sql: 'update user set avatar = ? where user_id = ?',
        args: [user.avatar, user.user_id]
    }
    return await mysql.execQuery(mysqlOptions);
}
/**
* 更新用户密码
*/
exports.updatePassword = async(user) => {
    let mysqlOptions = {
        sql: 'update user set password = ? where user_id = ?',
        args: [user.newPassword, user.user_id]
    }
    return await mysql.execQuery(mysqlOptions);
}