'use strict';
// helper建议使用范围：controller或service中
const { toLineParams, list2map, formatDate, toHumpParams, str2json } = require('../utils/common');

/**
 * 用于将数组或对象属性名从下划线格式统一改为小写驼峰格式，如将数据库字段转换为前端展示数据格式
 * 示例：this.ctx.helper.toLine({measure_id: 1}) => {measureId: 1}
 * @param  {...any} args
 * @return
 */
exports.toHump = (...args) => toHumpParams(...args);

/**
 * 用于将数组或对象属性名从小写驼峰格式统一改为下划线格式，如将前端传参转换为数据库字段
 * 示例：this.ctx.helper.toLine({measureId: 1}) => {measure_id: 1}
 * @param  {...any} args
 * @return
 */
exports.toLine = (...args) => toLineParams(...args);

/**
 * 用于将数组转换为指定key的map映射
 * 示例：this.ctx.helper.list2map([{id: 1, name: ''}], 'id') => {1: {id: 1, name: ''}}
 * @param  {...any} args
 * @return
 */
exports.list2map = (...args) => list2map(...args);

/**
 * 用于转换指定的日期格式
 * 示例：this.ctx.helper.formatDate() => 2022-04-08 13:14:00
 * @param  {...any} args
 * @return
 */
exports.formatDate = (...args) => formatDate(...args);

/**
 * 用于将字符串转换为json
 * @param  {...any} args
 * @return
 */
exports.str2json = (...args) => str2json(...args);
