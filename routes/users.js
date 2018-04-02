const router = require('koa-router')()

router.prefix('/user')
const User = require('../controller/userController')

router.post('/public/login', User.login)

router.post('/public/register', User.register)

router.get('/findUsers.do', User.findUsers)

// router.get('/', function (ctx, next) {
//   ctx.body = 'this is a users response!'
// })

// router.get('/bar', function (ctx, next) {
//   ctx.body = 'this is a users/bar response'
// })

module.exports = router
