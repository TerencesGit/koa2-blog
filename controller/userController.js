const userService = require('../service/userService');
const userDao = require('../dao/userDao');
const passport = require('../utils/passport');
const jwt = require('jsonwebtoken');
const responseFormatter = function (status, message, data = null) {
  return { status, message, data }
}
/**
 * 用户登录
 * @param {*} user 
 */
exports.login = async (ctx, next) => {
  let user = ctx.request.body;
  if(!user.mobile) {
    ctx.body = new responseFormatter(111, '用户名不能为空');
  } else if(!user.password) {
    ctx.body = new responseFormatter(112, '密码不能为空');
  } else {
    ctx.body = await userService.login(user);
  }
}
/**
 * 用户注册
 * @param {*} user 
 */
exports.register = async (ctx, next) => {
  let user = ctx.request.body;
  if(!user.mobile) {
    ctx.body = new responseFormatter(101, '手机号不能为空');
  } else if(!user.mobile.match(/^(13|14|15|16|17|18)\d{9}$/)) {
    ctx.body = new responseFormatter(102, '手机号格式有误');
  } else if(!user.password) {
    ctx.body = new responseFormatter(103, '密码不能为空');
  } else {
    ctx.body = await userService.resgister(user);
  }
}
/**
 * 用户列表
 * @param {*} ctx 
 * @param {*} next 
 */
exports.findUsers = async (ctx, next) => {
  let users = await userDao.findUserAll();
  ctx.body = new responseFormatter(1, '操作成功', users);
}
/**
*  更新用户信息
*/
exports.updateUserInfo = async (ctx, next) => {
  let user = ctx.request.body;
  ctx.body = await userDao.updateUserInfo(user);
}
/**
*  更新用户头像
*/
exports.updateAvatar = async (ctx, next) => {
  let user = ctx.request.body;
  ctx.body = await userDao.updateUserAvatar(user);
}
/**
* 修改密码
*/
exports.updatePassword = async (ctx, next) => {
  let tokenUser = ctx.user;
  let user = ctx.request.body;
  let isCompared = await passport.validate(user.password, tokenUser.password);
  if(isCompared) {
    let newPassword = await passport.encrypt(user.newPassword); 
    let _user = {
      user_id: tokenUser.user_id,
      newPassword: newPassword
    }
    ctx.body = await userDao.updatePassword(_user);
  } else {
    ctx.body = new responseFormatter(301, '原密码错误');
  }
}
/**
 * 获取用户信息
 * @param {*} ctx 
 * @param {*} next 
 */
exports.findUserInfo = async (ctx, next) => {
  let tokenUser = jwt.decode(ctx.request.header.authorization.substr(7)).data;
  if(tokenUser) {
    ctx.body = new responseFormatter(1, '获取成功', tokenUser);
  } else {
    ctx.body = new responseFormatter(401, '获取失败');
  }
}