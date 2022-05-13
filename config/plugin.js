'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  // 参考文档：https://www.cnblogs.com/crazycode2/p/12445929.html
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  nacos: {
    enable: true,
    env: [ 'dev', 'prod' ],
    package: 'eggjs-nacos',
  },
};
