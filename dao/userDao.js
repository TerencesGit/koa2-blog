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