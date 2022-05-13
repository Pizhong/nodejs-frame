/*
 * @file: 提供给其他微服务调用的方法。前端不调用这部分
 */

'use strict';

const Controller = require('../../core/baseController');
const CallbackService = require('../../service/callbackService');
class CallbackController extends Controller {

  async onReceiver() {
    const { code, data } = await this.onListenData();
    console.log(code, data);
    CallbackService.onReceive(code, data, this.logger);
    this.success(null);
  }
  // 服务监听
  onListenData() {
    // code和body都为字符串
    const body = this.ctx.request.body;
    const code = this.ctx.queries.code;
    if (body && typeof body === 'object') return { code, data: body };
    try {
      const data = JSON.parse(body);
      return { code, data };
    } catch (e) {
      throw e;
    }
  }


}
module.exports = CallbackController;
