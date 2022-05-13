/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1627981046679_9209';

  config.cluster = {
    listen: {
      path: '',
      port: 7090,
      hostname: '0.0.0.0',
    },
  };

  // add your middleware config here
  // 统一错误信息配置（注：match和ignore不可以同时配置）
  config.middleware = [ 'commonHandler' ];
  config.commonHandler = {
    enable: true, // 中间件开启配置
    match: '', // 设置请求中间件的请求路由
    // ignore: '', // 设置不经过这个中间件的请求路由
  };

  // 文件上传
  config.multipart = {
    // fileExtensions: [ '.xlsx', '.docx', '.pdf', '.doc', '.xls' ], // 增加对 xlsx 扩展名的文件支持
    whitelist() {
      return true;
    },
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };


  // static files and cache files
  config.static = {
    // 静态化访问前缀,如：`http://127.0.0.1:7001/static/images/logo.png`
    prefix: '/static',
    dir: path.join(appInfo.baseDir, 'app/public'), // `String` or `Array:[dir1, dir2, ...]` 静态化目录,可以设置多个静态化目录
    dynamic: true, // 如果当前访问的静态资源没有缓存，则缓存静态文件，和`preload`配合使用；
    preload: false,
    maxAge: 31536000, // in prod env, 0 in other envs
    buffer: true, // in prod env, false in other envs
  };

  // add your user config here
  const userConfig = {
  };

  return {
    ...config,
    ...userConfig,
  };
};
