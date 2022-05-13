'use strict';

module.exports = () => {

  return async function commonHandler(ctx, next) {
    try {
      ctx.logger.info(ctx.url, ctx.request.body);
      await next();
    } catch (err) {
      ctx.logger.error(ctx.url, err);
      // 所有的异常都会在app上出发一个error事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx);

      const status = err.code || err.status || 500;

      // 如果时生产环境的时候 500错误的详细错误内容不返回给客户端
      // const error = status === 500 && ctx.app.config.env === 'prod' ? '网络错误' : err.message;
      const error = err.message;
      const requestId = ctx.request.header['x-request-id'];
      ctx.body = {
        message: error,
        code: status,
        object: null,
        success: false,
        requestId,
      };
    }
  };

};
