const Koa = require('koa'); //引用koa  
const app = new Koa(); //实例化koa 
const cors = require('koa2-cors');    //设置请求头部
const koaLogger = require('koa-logger');
const config = require('./config');  //引入配置文件
const bodyParser = require('koa-bodyparser')
// const router = require('koa-router')()  //引入路由
const router = require('./server/routes/index');

// const config = require('./config'); //配置文件
//中间件
// app.use(ctx => {  
//     ctx.body = '<h1>Hello Koa2 nishishabi</h1>';
// });
const port = config.port;  
app.listen(port); 
app.use(cors()); 
app.use(koaLogger());

// 配置ctx.body解析中间件
app.use(bodyParser())

app.use(router.routes(), router.allowedMethods());
console.log("koa2 server started, listen port is", port);