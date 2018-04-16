const Koa = require('koa'); //引用koa  
const app = new Koa(); //实例化koa  
//中间件
app.use(ctx => {  
    ctx.body = '<h1>Hello Koa2 nishishabi</h1>';
});
const port = 3000;  
app.listen(port);  
console.log("koa2 server started, listen port is", port);