const mysql = require('../utils/mysqlUtils.js')
/**
 * 根据fieldName 查询blog
 * @param {*} fieldName, fieldValue 
 */
exports.findBlogByFieldName = async (fieldName, fieldValue) => {
    let mysqlOptions = {
        sql: `select * from blog where ${fieldName} = ?`,
        args: [fieldValue],
    };
    return await mysql.execQuery(mysqlOptions);
}
/**
 * 添加blog
 * @param {*} blog 
 */
exports.addBlog = async (blog) => {
    let mysqlOptions = {
        sql: 'insert into blog (id, title, content, create_by, create_name, create_time, update_time) values (?,?,?,?,?,?,?)',
        args: [blog.id, blog.title, blog.content, blog.user_id, blog.username, new Date(), new Date()],
    }
    let result = await mysql.execQuery(mysqlOptions);
    return result;
}
/**
 * 更新blog
 * @param {*} blog 
 */
exports.updateBlogById = async (blog) => {
    let mysqlOptions = {
        sql: 'update blog set title = ?, content = ?, update_time = ? where id = ?',
        args: [blog.title, blog.content, new Date(), blog.id],
    }
    let result = await mysql.execQuery(mysqlOptions);
    return result;
}
/**
 * 获取所有blog
 */
exports.findBlogAll = async () => {
    let mysqlOptions = {
        sql: 'select * from blog',
    };
    return await mysql.execQuery(mysqlOptions);
}
// 删除blog
exports.delBlogById = async (blogId) => {
    let mysqlOptions = {
        sql: 'delete from blog where id = ?',
        args: [blogId]
    };
    return await mysql.execQuery(mysqlOptions);
}
/**
 * 更新blog
 * @param {*} blog 
 */
exports.updateBlogFieldNameById = async (fieldName, fieldValue, id) => {
    let mysqlOptions = {
        sql: `update blog set ${fieldName} = ? where id = ?`,
        args: [fieldValue, id],
    }
    let result = await mysql.execQuery(mysqlOptions);
    return result;
}