const blogDao = require('../dao/blogDao');
const responseFormatter = function (status, message, data = null) {
    return { status, message, data }
}
const getCurrentDateString = function (date = new Date()) {
    let dateObj = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
    }
    let dateString = '';
    for(let o in dateObj) {
        dateObj[o] = String(dateObj[o]).replace(/^(\d)$/, '0$1');
        dateString += dateObj[o];
    }
    return dateString;
}
/**
 * 
 * @param {*} ctx 
 * @param {*} next 
 */
exports.createBlog = async (ctx, next) => {
    let blog = ctx.request.body;
    blog.user_id = ctx.user.user_id;
    blog.username = ctx.user.username;
    blog.id = getCurrentDateString() + String(new Date().getTime()).substr(-4);
    let res = await blogDao.addBlog(blog);
    ctx.body = new responseFormatter(1, '操作成功');
  }
/**
 * 获取博客列表
 * @param {*} ctx 
 * @param {*} next 
 */
exports.findBlogAll = async (ctx, next) => {
    let blogList = await blogDao.findBlogAll();
    ctx.body = new responseFormatter(1, '操作成功', blogList);
}
/**
 * 更新博客
 * @param {*} ctx 
 * @param {*} next 
 */
exports.updateBlog = async (ctx, next) => {
    let blog = ctx.request.body;
    let tokenUser = ctx.user;
    let blogInfo = await blogDao.findBlogByFieldName('id', blog.id);
    if(tokenUser.user_id === blogInfo[0].create_by) {
        let result = await blogDao.updateBlogById(blog);
        ctx.body = new responseFormatter(1, '操作成功');
    } else {
        ctx.body = new responseFormatter(2, '删除失败，非本人操作');
    }
}
/**
 * 查询博客 
 * @param {*} ctx 
 * @param {*} next 
 */
exports.findBlogById = async (ctx, next) => {
    let blogId = ctx.query.id;
    let result = await blogDao.findBlogByFieldName('id', blogId);
    let pv = result[0].pv + 1;
    let result1 = await blogDao.updateBlogFieldNameById('pv', pv, blogId);
    ctx.body = new responseFormatter(1, '操作成功', result[0]);
}
/**
 * 删除博客
 * @param {*} ctx 
 * @param {*} next 
 */
exports.delBlog = async (ctx, next) => {
    let tokenUser = ctx.user;
    let blogId = ctx.request.body.id;
    let blogInfo = await blogDao.findBlogByFieldName('id', blogId);
    if(tokenUser.user_id === blogInfo[0].create_by) {
        let result = await blogDao.delBlogById(blogId);
        ctx.body = new responseFormatter(1, '操作成功');
    } else {
        ctx.body = new responseFormatter(2, '删除失败，非本人操作');
    }
    
}