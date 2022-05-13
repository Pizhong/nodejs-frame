'use strict';

const Controller = require('../../core/baseController');

/**
 * @Controller 与第三方接口通讯
 */
class CommunicateController extends Controller {
  // 发送通知到其他服务，触发其他服务的回调
  async notify() {
    const res = await this.service.callbackService.notify('MEASURE_PLAN_UPDATE', { actionCode: 'FINISH_PLAN', planId: 171, bindId: 'kaye5nmj1fk', operator: this.user });
    this.success(res);
  }

  // 通过微服务框架nacos调用其他服务的方法
  async fetchOtherService() {
    const res = await this.service.measure.fetchOtherService();
    this.success(res);
  }

}
module.exports = CommunicateController;
