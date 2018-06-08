const router = require('koa-router')();
const cateCtrl = require('./../controllers/category');

router.get('/getUser', async (ctx, next) => {
    console.log(ctx.query);
    console.log("-------");
    // ctx.body = await getUserList(ctx, next);
    ctx.body = 'yeah you got it!';
  });
  
  /**
   * post login
   */
  router.post('/addCategory',async (ctx,next)=>{
     let req = ctx.request.body;
     console.log(req);
     ctx.body = await cateCtrl.addCategory(req);
  });

  router.post('/updateCategory',async (ctx,next)=>{
    let req = ctx.request.body;
    console.log(req);
    ctx.body = await cateCtrl.updateCategory(req);
  });

  router.post('/delCategory',async (ctx,next)=>{
    let req = ctx.request.body;
    console.log(req);
    ctx.body = await cateCtrl.delCategory(req);
  });

  router.post('/setStoreroom',async (ctx,next)=>{
    let req = ctx.request.body;
    ctx.body = await cateCtrl.setStoreroom();
  });
  router.get('/getList', async (ctx, next) => {
    console.log(ctx.query);
    console.log("-------");
    let req = ctx.query;
    // ctx.body = await getUserList(ctx, next);
    ctx.body = await cateCtrl.getCategoryList(req);
  });
  router.get('/getStoreroom', async (ctx, next) => {
    console.log(ctx.query);
    console.log("-------");
    let req = ctx.query;
    // ctx.body = await getUserList(ctx, next);
    ctx.body = await cateCtrl.getStoreroomByNumber(req);
  });
  module.exports = router;