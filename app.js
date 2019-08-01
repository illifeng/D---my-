// 引入模块
const express = require('express')
const session = require('express-session')
const ejs = require('ejs')
const bodyParser = require('body-parser')
// 引入用户(路由)模块
const indexRouter = require('./router/indexRouter')
// 引入express框架实例对象
const app = express()
// 开启服务器,监听端口
app.listen(3000, () => {
  console.log('http://127.0.0.1:3000');
})
// 第一个参数为固定写法, 参数二模板引擎
app.set('views engine', 'ejs')
// 参数1:固定写法 2:不设置其它的话会默认到这个根目录下去查找
app.set('views', 'views')
// 托管静态资源(第一个为虚拟文件名,第二个为静态资源的文件名)
app.use('/assets', express.static('assets'))
app.use('/uploads', express.static('uploads'))
// bodyParser模板里面的一些必要设置
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// 让app应用使用session的方式来进行状态保持
app.use(session({
  //name: 'hhw',
  // 对session加密：加盐，可以设置一个只有你自己知道的字符串
  //  md5加密
  secret: '加什么都没有所谓',
  //重新保存：强制会话保存即使是未修改的。默认为true但是得写上
  resave: false,
  //强制“未初始化”的会话保存到存储。 
  saveUninitialized: false,

}))
// 基于cookies的session中间件
app.use(function (req, res, next) {
  // var cookie = querystring.parse(req.headers.cookie)
  // if (cookie.islogin && cookie.islogin == 'true' || req.url == '/admin/login' || req.url.indexOf('/admin') == -1) {
  //     // next：之前用户的请求操作
  //     next()
  // } else {
  //     res.redirect('/admin/login')
  // }
  if (req.session.login && req.session.login == 'true' || req.url == '/admin/login' || req.url.indexOf('/admin') == -1) {
    next()
  } else {
    res.redirect('/admin/login')
  }
})
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
})
// 引入中间件,此为路由器与入口文件的中间件
app.use(indexRouter)