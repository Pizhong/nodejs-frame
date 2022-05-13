/* eslint valid-jsdoc: "off" */

'use strict';
const Op = require('sequelize').Op;

// mysql数据库
const host = '127.0.0.1';
const port = '3306';
const user = 'root';
const password = 'root';
const database = 'node_frame';
// redis数据库
const redisAddress = host;
const redisPort = '6379';
const redisPassword = '';

const logPath = './logs/';
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.logger = {
    dir: logPath,
    formatter(meta) {
      if (meta.message.length > 2000) {
        meta.message = meta.message.substring(0, 2000) + '...';
      }
      return `${meta.date}  ${meta.level} - ${meta.message}`;
    },
    // ctx logger
    contextFormatter(meta) {
      if (meta.message.length > 2000) {
        meta.message = meta.message.substring(0, 2000) + '...';
      }
      return `${meta.date}  ${meta.level} - [${meta.ctx.request.header['x-request-id'] || '-'}] : ${meta.message}`;
    },
  };

  config.nacos = {
    serverList: 'nacos.kapboo.com:80', // 必填，  nacos 服务url
    client: {
      namespace: '7b087457-a91d-42b0-9d43-526913677817', // 必填，  命名空间ID，用于后续服务注册、服务发现
      serviceName: 'node-frame', // 非必填, 服务名称， 默认自动获取package.json中的name
      groupName: 'DEFAULT_GROUP', // 非必填, 分组名称 默认 DEFAULT_GROUP
      username: 'linkkap-app', // 非必填
      password: 'lg#2017', // 非必填
    },
    subscribers: {
      'platform-user-center-ms': {
        serviceName: 'platform-user-center-ms', // 服务名称
        groupName: 'DEFAULT_GROUP', // 默认 DEFAULT_GROUP
        clusters: '', // 默认 DEFAULT
        subscribe: true, // 是否订阅服务  默认 true
      },
      'talent-valuation-ms': {
        serviceName: 'talent-valuation-ms', // 人才评估服务名称
        groupName: '', // 默认 DEFAULT_GROUP
        clusters: '', // 默认 DEFAULT
        subscribe: true, // 是否订阅服务  默认 true
      },
      'micro-consulting-ms': {
        serviceName: 'micro-consulting-ms', // 微咨询服务名称
        groupName: '', // 默认 DEFAULT_GROUP
        clusters: '', // 默认 DEFAULT
        subscribe: true, // 是否订阅服务  默认 true
      },
    },
  };

  config.sequelize = {
    dialect: 'mysql', // 表示使用mysql
    host, // 连接的数据库主机地址
    port, // mysql服务端口
    database, // 数据库名
    username: user, // 数据库用户名
    password, // 数据库密码
    define: { // model的全局配置
      timestamps: false, // 添加create,update,delete时间戳
      paranoid: true, // 添加软删除
      freezeTableName: true, // 防止修改表名为复数
      underscored: false, // 防止驼峰式字段被默认转为下划线
    },
    timezone: '+08:00', // 由于orm用的UTC时间，这里必须加上东八区，否则取出来的时间相差8小时
    dialectOptions: { // 让读取date类型数据时返回字符串而不是UTC时间
      dateStrings: true,
      typeCast(field, next) {
        if (field.type === 'DATETIME') {
          return field.string();
        }
        return next();
      },
    },
    // 使用默认运算符别名
    operatorsAliases: {
      $eq: Op.eq,
      $ne: Op.ne,
      $gte: Op.gte,
      $gt: Op.gt,
      $lte: Op.lte,
      $lt: Op.lt,
      $not: Op.not,
      $in: Op.in,
      $notIn: Op.notIn,
      $is: Op.is,
      $like: Op.like,
      $notLike: Op.notLike,
      $iLike: Op.iLike,
      $notILike: Op.notILike,
      $regexp: Op.regexp,
      $notRegexp: Op.notRegexp,
      $iRegexp: Op.iRegexp,
      $notIRegexp: Op.notIRegexp,
      $between: Op.between,
      $notBetween: Op.notBetween,
      $overlap: Op.overlap,
      $contains: Op.contains,
      $contained: Op.contained,
      $adjacent: Op.adjacent,
      $strictLeft: Op.strictLeft,
      $strictRight: Op.strictRight,
      $noExtendRight: Op.noExtendRight,
      $noExtendLeft: Op.noExtendLeft,
      $and: Op.and,
      $or: Op.or,
      $any: Op.any,
      $all: Op.all,
      $values: Op.values,
      $col: Op.col,
    },
  };

  // 参考：https://zhuanlan.zhihu.com/p/58845116
  config.redis = {
    client: {
      host: redisAddress,
      port: redisPort,
      password: redisPassword,
      db: 0,
    },
  };


  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
