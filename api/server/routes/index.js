const router = require('koa-router')();
// const index = require('./index');
const users = require('./users');
const category = require('./category');
const logistic = require('./logistic')
// const files = require('./files');

// router.use('/', index.routes(), index.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());
router.use('/category', category.routes(), category.allowedMethods());
router.use('/logistic', logistic.routes(), logistic.allowedMethods());
// router.use('/files', files.routes(), files.allowedMethods());

module.exports = router;