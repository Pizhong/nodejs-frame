'use strict';

const Service = require('egg').Service;

const getRedisKey = str => `nodejs_${str}`;

class BaseService extends Service {
  // 通过redis获取全局唯一id，redisKey可选
  async getUUId(redisKey) {
    if (!redisKey) throw new Error('redisKey不允许为空');
    redisKey = getRedisKey(redisKey);
    const idStr = await this.app.redis.get(redisKey);
    const id = Number(idStr) || 1;
    // 初始化redis自增id
    if (!id) {
      await this.app.redis.set(redisKey, 1);
    } else {
      await this.app.redis.set(redisKey, id + 1);
    }
    return id;
  }
  // 更新uuid，用于优化频繁操作redis的场景
  async updateUUId(redisKey, id) {
    if (!redisKey) throw new Error('redisKey不允许为空');
    redisKey = getRedisKey(redisKey);
    return await this.app.redis.set(redisKey, id);
  }

  // 事务
  async transaction(callback) {
    const result = await new Promise(async (resolve, reject) => {
      const { ctx } = this;
      let transaction = null;
      try {
        transaction = await ctx.model.transaction();
        const res = callback && await callback(transaction);
        await transaction.commit();
        resolve(res);
      } catch (error) {
        // 事务回滚
        await transaction.rollback();
        reject(error);
      }
    });
    return result;
  }

  /**
   * nacos 区分环境
   * 说明: 本地服务通过 nacos 注册微服务后, 可能会导致线上服务调用到本地正在开发中的服务。
   * 当本地服务运行，需要调用其他微服务，可以配置直接调用某个域名
   * @param {*} name 微服务名
   * @param {*} url 请求地址
   * @param {*} options 参数
   */
  async nacos(name, url, options) {
    let res = {};
    if (this.app.config.nacos[name]) {
      url = this.app.config.nacos[name] + url;
      res = this.ctx.curl(url, options);
    } else {
      res = await this.ctx.nacos[name].request(url, options);
    }

    return res;
  }
}
module.exports = BaseService;
