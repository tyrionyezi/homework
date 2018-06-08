const router = require('koa-router')();
const userCtrl = require('./../controllers/user');


router.get('/', function (ctx, next) {
  ctx.body = 'this a users response!';
});
router.get('/getUser', async (ctx, next) => {
  console.log(ctx.query);
  console.log("-------");
  // ctx.body = await getUserList(ctx, next);
  ctx.body = 'yeah you got it!';
});

/**
 * post login
 */
router.post('/login',async (ctx,next)=>{
   let req = ctx.request.body;
   console.log(req);
   ctx.body = await userCtrl.userLogin(req);
});


/**
 * 获取用户密码
 */
router.post('/getUserInfo',async (ctx,next)=>{
  let req = ctx.request.body;
  console.log(req);
  ctx.body = await userCtrl.getUserInfo(req);
});



/**
 * 更新用户密码
 */
router.post('/updatePassword',async (ctx,next)=>{
  let req = ctx.request.body;
  console.log(req);
  ctx.body = await userCtrl.updatePassword(req);
});

/**
 * 修改用户信息
 */
router.post('/updateUserInfo',async (ctx,next)=>{
  let req = ctx.request.body;
  console.log(req);
  ctx.body = await userCtrl.updateUserInfo(req);
});

/**
 * 添加永华
 */
router.post('/addUser',async (ctx,next)=>{
  let req = ctx.request.body;
  console.log(req);
  ctx.body = await userCtrl.addUser(req);
});

router.post('/register', async (ctx, next) => {
  let reqBody = ctx.request.body;
  ctx.body = await register(reqBody);
});
router.del('/removeUser', async (ctx, next) => {
  console.log(ctx.request.body);
  let reqBody = ctx.request.body;
  ctx.body = await removeUser(reqBody);
});
module.exports = router;