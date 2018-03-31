const mysql = require('../utils/mysqlUtils.js')
/**
 * 根据id查询用户信息
 */
exports.getUserById = async (userId) => {
    let mysqlOptions = {
        sql: 'select * from user where user_id = ?',
        args: [userId],
    };
    return await mysql.execQuery(mysqlOptions);
}
/**
 * 根据email 查询用户
 * @param {*} Email 
 */
exports.getUserByEmail = async (email) => {
    let mysqlOptions = {
        sql: 'select * from user where email = ?',
        args: [email],
    };
    return await mysql.execQuery(mysqlOptions);
}
exports.getUserByMobile = async (mobile) => {
    let mysqlOptions = {
        sql: 'select * from user where mobile = ?',
        args: [mobile],
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
exports.getUserAll = async () => {
    let mysqlOptions = {
        sql: 'select * from user',
    };
    return await mysql.execQuery(mysqlOptions);
}