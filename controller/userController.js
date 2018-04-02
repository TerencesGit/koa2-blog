const userService = require('../service/userService');
const userDao = require('../dao/userDao');
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