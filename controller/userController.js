const userService = require('../service/userService');

const responseFormatter = function (status, message, data = null) {
  return {
    status,
    message,
    data,
  }
}
// 登录
exports.login = async (ctx, next) => {
  ctx.body = await userService.login(ctx.request.body);
}
// 注册
exports.register = async (ctx, next) => {
  ctx.body = await userService.resgister(ctx.request.body);
}
