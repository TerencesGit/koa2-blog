const router = require('koa-router')()
const User = require('../controller/userController')
const Blog = require('../controller/blogController')

router.get('/blog/findBlogAll.do', Blog.findBlogAll)

router.post('/blog/createBlog.do', Blog.createBlog)

router.post('/blog/updateBlog.do', Blog.updateBlog)

router.post('/blog/delBlog.do', Blog.delBlog)

router.get('/blog/findBlogById.do', Blog.findBlogById)

module.exports = router
