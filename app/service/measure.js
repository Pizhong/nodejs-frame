'use strict';

const Service = require('../core/baseService');

class MeasureService extends Service {
  async fetchOtherService() {
    const res = await this.nacos('platform-user-center-ms', '/api/platform-user-center/platform/v1/user/login-log/list', {
      method: 'POST',
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {},
    });
    const data = res.data;
    this.logger.info('第三方服务返回的数据', JSON.stringify(data));
    if (data.code !== 200) throw new Error(data.message);
    return data.object;
  }
  // 新增一条记录
  async insert(data) {
    const record = this.ctx.helper.toLine(data);
    const res = await this.ctx.model.Measure.create(record);
    return res;
  }

  // 如果id存在，则update，否则insert
  async saveBatch(list) {
    const recordList = this.ctx.helper.toLine(list);
    const res = await this.ctx.model.Measure.bulkCreate(recordList, { updateOnDuplicate: [ 'measure_id' ] });
    return res;
  }

  // 仅作演示，不建议物理删除
  async delete(id) {
    const res = await this.ctx.model.Measure.destroy({
      where: {
        measure_id: id,
      },
    });
    return res;
  }

  /**
   * sql格式为：
   * UPDATE `measure` SET `measure_name`=? WHERE `measure_id` = ?
   * @param {*} id
   * @param {*} data
   * @return
   */
  async update(id, data) {
    const record = this.ctx.helper.toLine(data);
    const res = await this.ctx.model.Measure.update(record, {
      where: {
        measure_id: id,
      },
    });
    return res;
  }

  async findOne(id) {
    const res = await this.ctx.model.Measure.findOne({
      where: {
        measure_id: id,
      },
    });
    return this.ctx.helper.toHump(res.dataValues);
  }
  /**
   * sql格式为：
   *    SELECT `measure_id`, `measure_no`, `measure_name`, `company_id`, `owner_company_id`, `owner_company_name`, `status`, `creator`, `creator_name`, `create_time`, `updater`, `updater_name`, `update_time`, `confirmor`, `confirmor_name`, `confirm_time`, `locker`, `locker_name`, `locker_phone`, `is_lock`, `talent_valuation_id`, `job_valuation_id`, `lock_platform`, `create_platform`, `author`, `author_name`, `company_name` FROM `measure` AS `measure` WHERE `measure`.`company_name` LIKE '%undefined%' AND (`measure`.`create_time` >= 'Invalid date' AND `measure`.`create_time` <= 'Invalid date') LIMIT 0, 10;
   *    SELECT count(*) AS `count` FROM `measure` AS `measure` WHERE `measure`.`company_name` LIKE '%undefined%' AND (`measure`.`create_time` >= 'Invalid date' AND `measure`.`create_time` <= 'Invalid date');
   * sequelize官方文档：https://sequelize.org/docs/v6/
   * @param {*} param0
   */
  async search({ current, size, companyName, startTime, endTime }) {
    current = current || 1;
    size = size || 10;
    const where = {};
    if (companyName) {
      where.company_name = { $like: `%${companyName}%` };
    }
    if (startTime && endTime) {
      where.$and = [
        { create_time: { $gte: `${startTime} 00:00:00` } },
        { create_time: { $lte: `${endTime} 23:59:59` } },
      ];
    }

    const res = await this.ctx.model.Measure.findAndCountAll({
      where,
      offset: (current - 1) * size,
      limit: Number(size),
    });
    // res格式为 { count: 0, rows: [] }
    return res;
  }

  // 事务
  async transactionProcessing() {
    const result = await this.transaction(async transaction => {
      const id = new Date().getTime();
      const res = await this.ctx.model.Measure.create({
        measure_id: id,
        measure_name: '测试事务',
      }, {
        transaction,
      });
      // 模拟失败的情况
      // await this.ctx.model.Measure.create({
      //   measure_id: id,
      //   measure_name: '测试事务',
      // }, {
      //   transaction,
      // });
      // 模拟失败的情况

      return res;
    });
    return result;
  }

}

module.exports = MeasureService;
