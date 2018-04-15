const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koajwt = require('koa-jwt')
const jwt = require('jsonwebtoken')
const index = require('./routes/index')
const users = require('./routes/users')
// error handler
onerror(app)
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(async (ctx, next) => {
  if(ctx.request.header.authorization) {
    ctx.user = jwt.decode(ctx.request.header.authorization.substr(7)).data;
  }
  return next().catch((err) => {
    if (401 === err.status) {
      ctx.status = 200;
      let res = {
        status: 999,
        message: 'Protected resource, use Authorization header to get access',
        data: null
      }
      ctx.body = res;
    } else {
      throw err;
    }
  });
})
app.use(require('koa-static')(__dirname + '/public'))
// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
//jwt
app.use(koajwt({ secret: 'junru' }).unless({
  path: [/\/public/],
}))
// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
