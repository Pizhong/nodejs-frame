'use strict';

const CallbackService = require('./app/service/callbackService');
const AssociateModel = require('./app/core/associateModel');
class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  // 配置文件已读取合并但还未生效，修改配置的最后时机，仅支持同步操作。
  configWillLoad() {
  }

  // 所有配置已经加载完毕，用于自定义 Loader 挂载。
  configDidLoad() {}

  // 插件的初始化
  async didLoad() {}

  // 所有插件启动完毕，用于做应用启动成功前的一些必须的前置操作。
  async willReady() {}

  // 应用已经启动完毕，可以用于做一些初始化工作。
  async didReady() {
    this.app.logger.info('注册回调监听器');
    CallbackService.addListen('test', function(data, logger) {
      logger.info('收到回调01');
      logger.info('data', data);
    });
    CallbackService.addListen('test', function(data, logger) {
      logger.info('收到回调02');
    });

    const associateModel = new AssociateModel(this.app);
    associateModel.associate();
  }

  // Server 已经启动成功，可以开始导入流量，处理外部请求。
  async serverDidReady() {
  }

  // 应用即将关闭前
  async beforeClose() {}
}

module.exports = AppBootHook;
