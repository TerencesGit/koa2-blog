const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');
const config = require('../config/index.js')
Promise.promisifyAll(bcrypt);
/**
 * 加盐加密
 */
const encrypt = async function (password) {
    let salt = await bcrypt.genSaltSync(config.password.saltTimes);
    let hash = await bcrypt.hashSync(password, salt);
    return hash;
}

/**
 * 密码对比
 */
const validate = async function(password, hash) {
    let res = await bcrypt.compareSync(password, hash);
    return res;
}

module.exports = {
    encrypt,
    validate
}