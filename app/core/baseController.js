// app/core/baseController.js
'use strict';
const { Controller } = require('egg');
class BaseController extends Controller {
  // 请求id
  get requestId() {
    return this.ctx.request.header['x-request-id'];
  }
  // 平台用户id（几乎不会用到，一般都是使用entUserId）
  get currentUserId() {
    return this.ctx.request.header['x-linkkap-platform-userid'];
  }
  // 平台用户名
  get currentUserName() {
    const name = this.ctx.request.header['x-linkkap-platform-username'];
    return decodeURIComponent(name);
  }
  // 企业用户id（业务用户id）
  get entUserId() {
    return this.ctx.request.header['x-linkkap-ent-userid'];
  }
  // 企业id
  get entId() {
    return this.ctx.request.header['x-linkkap-entid'];
  }
  // 追踪id
  get chainId() {
    const str = this.ctx.request.header['x-linkkap-chain'];
    if (!str) return '';
    const list = str.split(':') || [];
    return list[1];
	}
  // 追踪编号
  get chainCode() {
    const str = this.ctx.request.header['x-linkkap-chain'];
    if (!str) return '';
    const list = str.split(':') || [];
    return list[0];
	}
	
  get currentAccount() {
    return {
      userName: this.currentUserName,
      entUserId: this.entUserId,
      entId: this.entId,
      userId: this.currentUserId,
    };
  }

  fail(message) {
    this.ctx.body = {
      code: -1,
      message,
      object: null,
      requestId: this.requestId,
      success: true,
    };
    this.logger.error(this.ctx.url, this.ctx.body);
  }
  success(data) {
    this.ctx.body = {
      code: 200,
      message: '成功',
      object: data,
      requestId: this.requestId,
      success: false,
    };
    this.logger.info(this.ctx.url, JSON.stringify(this.ctx.body));
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}
module.exports = BaseController;
