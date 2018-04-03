const userDao = require('../dao/userDao');
const passport = require('../utils/passport');
const jwt = require('jsonwebtoken');
const responseFormatter = function (status, message, data = null) {
    return { status, message, data }
}
/**
 * 用户注册
 * @param {*} user 
 */
exports.resgister = async (user) => {
    let users = await userDao.findUserByFieldName('mobile', user.mobile);
    if(users.length > 0) {
        return new responseFormatter(104, '该手机号已注册');
    }
    user.password = await passport.encrypt(user.password);
    let result = await userDao.addUser(user);
    if(result) {
        let _users = await userDao.findUserByFieldName('mobile', user.mobile);
        let resUser = {
            userId: _users[0].user_id,
            userename: _users[0].username,
            mobile: _users[0].mobile,
        }
        return new responseFormatter(1, '注册成功', resUser);
    } else {
        return new responseFormatter(0, '注册失败，请重试');
    }
}
/**
 * 用户登录
 * @param {*} user 
 */
exports.login = async (user) => {
    let users = await userDao.findUserByFieldName('mobile', user.mobile);
    if(users.length === 0) {
        return new responseFormatter(113, '用户名不存在');
    }
    let _user = users[0];
    let isCompared = await passport.validate(user.password, _user.password);
    if(isCompared) {
        delete _user['password']
        // const userToken = {
        //     id: _user.user_id,
        //     name: _user.username,
        // }
        const secret = 'junru';
        const token = jwt.sign({
            data: _user,
            exp: Math.floor(Date.now() / 1000 ) + (60 * 30)
        }, secret)
        return new responseFormatter(1, '登录成功', {_user, token})
    } else {
        return new responseFormatter(114, '登录密码有误')
    }
}