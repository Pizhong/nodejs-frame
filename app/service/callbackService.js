'use strict';

const events = require('events');
const Service = require('../core/baseService');

async function retryRequest(request, url, options, maxTries = 3, error = null) {
  if (maxTries <= 0) return error;
  try {
    const res = await request.call(this, url, options);
    console.log('tryRequest res', res);
    return res;
  } catch (e) {
    console.log('tryRequest e', e);
    return retryRequest.call(this, request, url, options, --maxTries, e);
  }
}

class CallbackService extends Service {

	static emitter = new events.EventEmitter();

	static addListen(code, cb) {
		CallbackService.emitter.on(code, cb);
	}

	static onReceive(code, body, logger) {
		CallbackService.emitter.emit(code, body, logger);
	}

	  /**
   * 用于发送通知给其他服务
   * data格式如下：
   * {
   *   "actionCode": CREATE_PLAN / FINISH_PLAN
   *   "bindId": 例如微咨询ID
   *   "planId": 例如测算ID
   *   "operator": {"entId":"xxx","entUserId":"xxx","userId":"xxx","userName":"xxx"}
   * }
   * @param {*} code
   * @param {*} data
   * @return
   */
  async notify(code, data) {
    const result = await this.ctx.model.CallbackRegistry.findAll({
      where: {
        code,
      },
    });
    const serverList = result.map(item => item.dataValues);
    this.logger.info('serverList', serverList, data);
    if (serverList.length === 0) {
      return;
    }

    for (let i = 0; i < serverList.length; i++) {
      const item = serverList[i];
      let res = {};
      if (this.app.config.nacos[item.server_name]) {
        // 不走微服务
        const url = this.app.config.nacos[item.server_name] + `/v1/callback/action?code=${item.code}`;
        res = this.ctx.curl(url, {
          method: 'POST',
          dataType: 'json',
          headers: {
            'Content-Type': 'application/json',
          },
          data,
        });
      } else {
        // 微服务
        const service = this.ctx.nacos[item.server_name]
        const request = retryRequest.bind(service);
        res = await request(service.request, `/v1/callback/action?code=${item.code}`, {
          method: 'POST',
          dataType: 'json',
          headers: {
            'Content-Type': 'application/json',
          },
          data,
        }, 3);
      }

      this.logger.info('notify res ', item.code, res);
    }
  }
}
module.exports = CallbackService;