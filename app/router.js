/*
 * @file: 路由配置
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/v1/callback/action', controller.ms.callback.onReceiver);

  router.post('/webapi/node-frame/v1/notify', controller.webapi.communicate.notify);
  router.get('/webapi/node-frame/v1/fetchOtherService', controller.webapi.communicate.fetchOtherService);

  router.post('/webapi/node-frame/v1/insert', controller.webapi.measure.insert);
  router.post('/webapi/node-frame/v1/delete', controller.webapi.measure.delete);
  router.post('/webapi/node-frame/v1/update', controller.webapi.measure.update);
  router.post('/webapi/node-frame/v1/saveBatch', controller.webapi.measure.saveBatch);
  router.get('/webapi/node-frame/v1/detail', controller.webapi.measure.findOne);
  router.get('/webapi/node-frame/v1/page', controller.webapi.measure.search);

  router.get('/webapi/node-frame/v1/transactionProcessing', controller.webapi.measure.transactionProcessing);
};
