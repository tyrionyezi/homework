const router = require('koa-router')();
const logisticCtrl = require('./../controllers/logistic');

router.get('/getUser', async (ctx, next) => {
    console.log(ctx.query);
    console.log("-------");
    // ctx.body = await getUserList(ctx, next);
    ctx.body = 'yeah you got it!';
});

/**
 * post login
 */
router.post('/addLogistic', async (ctx, next) => {
    let req = ctx.request.body;
    console.log(req);
    ctx.body = await logisticCtrl.addLogistic(req);
});

router.get('/getAllLogistic', async (ctx, next) => {
    let req = ctx.query;
    console.log(req);
    ctx.body = await logisticCtrl.selectLogistic(req);
});

router.post('/delLogistic', async (ctx, next) => {
    let req = ctx.request.body;
    console.log(req);
    ctx.body = await logisticCtrl.delLogistic(req);
});

router.post('/updateLogistic', async (ctx, next) => {
    let req = ctx.request.body;
    console.log(req);
    ctx.body = await logisticCtrl.updateLogistic(req);
});


router.get('/getList', async (ctx, next) => {
    console.log(ctx.query);
    console.log("-------");
    let req = ctx.query;
    // ctx.body = await getUserList(ctx, next);
    ctx.body = await cateCtrl.getCategoryList(req);
});
router.get('/getLogisticByParams', async (ctx, next) => {
    console.log(ctx.query);
    console.log("-------");
    let req = ctx.query;
    // ctx.body = await getUserList(ctx, next);
    ctx.body = await logisticCtrl.selectLogisticByParams(req);
});

router.get('/getAreaLogistic', async (ctx, next) => {
    console.log(ctx.query);
    console.log("-------");
    let req = ctx.query;
    // ctx.body = await getUserList(ctx, next);
    ctx.body = await logisticCtrl.getAreaLogisitc(req);
});

router.get('/updateTransmission', async (ctx, next) => {
    console.log(ctx.query);
    console.log("-------");
    let req = ctx.query;
    // ctx.body = await getUserList(ctx, next);
    ctx.body = await logisticCtrl.updateTransmission(req);
});

router.get('/userGetTransmission', async (ctx, next) => {
    console.log(ctx.query);
    console.log("-------");
    let req = ctx.query;
    // ctx.body = await getUserList(ctx, next);
    ctx.body = await logisticCtrl.selectTransmissionByUserAreaId(req);
});

router.get('/userGetWeekData', async (ctx, next) => {
    console.log(ctx.query);
    console.log("-------");
    let req = ctx.query;
    // ctx.body = await getUserList(ctx, next);
    ctx.body = await logisticCtrl.getWeekData(req);
});

router.post('/userUpdateTransmission', async (ctx, next) => {
    console.log("-------");
    let req = ctx.request.body;
    // ctx.body = await getUserList(ctx, next);
    ctx.body = await logisticCtrl.userUpdatetransportStatus(req);
});
module.exports = router;