'use strict';

const Controller = require('../../core/baseController');
class MeasureController extends Controller {
  // 新增记录
  async insert() {
    const { measureName, talentValuationId, jobValuationId } = this.ctx.request.body;
    this.logger.info('insert userId measureName', this.userId, measureName);
    const companyId = this.entId;
    const creator = this.userId;
    const createTime = this.ctx.helper.formatDate();
    const res = await this.service.measure.insert({ measureName, talentValuationId, jobValuationId, createTime, companyId, creator });
    return this.success(res);
  }
  // 删除记录
  async delete() {
    const { id } = this.ctx.request.body;
    const res = await this.service.measure.delete(id);
    return this.success(res);
  }

  // 更新记录
  async update() {
    const { id, data } = this.ctx.request.body;
    const res = await this.service.measure.update(id, data);
    return this.success(res);
  }

  // 获取详情
  async findOne() {
    const { id } = this.ctx.request.query;
    const res = await this.service.measure.findOne(id);
    return this.success(res);
  }

  // 搜索列表
  async search() {
    const { current, size, companyName, startTime, endTime } = this.ctx.request.query;
    const res = await this.ctx.service.measure.search({ current, size, companyName, startTime, endTime });
    return this.success(res);
  }

  // 批量保存
  async saveBatch() {
    const { list } = this.ctx.request.body;
    const res = await this.ctx.service.measure.saveBatch(list);
    return this.success(res);
  }

  // 事务
  async transactionProcessing() {
    const res = await this.ctx.service.measure.transactionProcessing();
    return this.success(res);
  }

}
module.exports = MeasureController;
