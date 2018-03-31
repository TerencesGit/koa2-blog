const mysql = require('mysql');
const config = require('../config/index');
// 连接数据库
const connectionPool = mysql.createPool({
    'host': config.database.mysql.host,
    'port': config.database.mysql.port,
    'user': config.database.mysql.user,
    'password': config.database.mysql.password,
    'database': config.database.mysql.database,
    'charset': config.database.mysql.charset,
    'connectionLimit': config.database.mysql.connectionLimit,
    'supportBigNumbers': true,
    'bigNumberStrings': true
})
// 释放连接
const release = connection => {
    connection.end(err => {
        if(err) {
            console.log('connection closed failed.')
        } else {
            console.log('connection closed successed.')
        }
    })
}
// 执行sql
const execQuery = sqlOptions => {
    let results = new Promise((resolve, reject) => {
        connectionPool.getConnection((err, connection) => {
            if(err) {
                throw err;
            }
            let sql = sqlOptions['sql'];
            let args = sqlOptions['args'];
            if(!args) {
                let query = connection.query(sql, (err, results) => {
                    if(err) {
                        console.log('Execute query error!');
                        reject(err)
                    }
                    resolve(JSON.parse(JSON.stringify(results)));
                })
            } else {
                let query = connection.query(sql, args, (err, results) => {
                    if(err) {
                        console.log('Execute query error!');
                        reject(err)
                    }
                    resolve(JSON.parse(JSON.stringify(results)));
                })
            }
            connection.release(err => {
                if(err) {
                    console.log('Mysql connection close failed!');
                    throw err;
                }
                console.log('Mysql connection close success!');
            })
        })
    }).then(chunk => {
        return chunk;
    })
    return results;
}
module.exports = {
    release,
    execQuery,
}