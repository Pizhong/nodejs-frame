'use strict';

const str2json = str => {
  if (!str) return str;
  try {
    return JSON.parse(str);
  } catch (e) {
    console.error('str', str, e);
  }
};

/**
 * 将 Date 转化为指定格式的String
月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
例子：
formatDate("yyyy-MM-dd hh:mm:ss.S", new Date()) ==> 2006-07-02 08:09:04.423
formatDate("yyyy-M-d h:m:s.S", , new Date())      ==> 2006-7-2 8:9:4.18
 */
const formatDate = function(format, date) {
  // 无参数时，设置默认值
  if (date === undefined) {
    date = new Date();
  }
  if (typeof date === 'string') {
    date = new Date(date);
  }
  if (format === undefined) {
    format = 'yyyy-MM-dd hh:mm:ss';
  }
  const map = {
    'M+': Number(date.getMonth() + 1), // 月份
    'd+': Number(date.getDate()), // 日
    'h+': Number(date.getHours()), // 小时
    'm+': Number(date.getMinutes()), // 分
    's+': Number(date.getSeconds()), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: Number(date.getMilliseconds()), // 毫秒
  };
  let fmt = format;
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (const key in map) {
    if (new RegExp('(' + key + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (map[key]) : (('00' + map[key]).substr(('' + map[key]).length)));
  }

  return fmt;
};
// 下划线转换驼峰
function toHump(name) {
  return name.replace(/\_(\w)/g, function(all, letter) {
    return letter.toUpperCase();
  });
}
// 驼峰转换下划线
function toLine(name) {
  return name.replace(/([A-Z])/g, '_$1').toLowerCase();
}

/**
   *
   * @param {*} source
   * @return
   *
    { "interviewId": "EP10087-FT001",
      "targetId": "-1",
      "answerContent": "{}"
    }
      ===>
    {
      answer_content: "{}"
      interview_id: "EP10087-FT001"
      target_id: "-1"
    }
   */
const toLineParams = source => {
  if (!source || typeof (source) !== 'object') return source;
  if (Array.isArray(source)) {
    return source.map(item => {
      return toLineParams(item);
    });
  }
  const obj = {};
  Object.keys(source).forEach(key => {
    obj[toLine(key)] = toLineParams(source[key]);
  });
  return obj;
};

/**
   *
   * @param {*} source
   * @return
   {
      answer_content: "{}"
      interview_id: "EP10087-FT001"
      target_id: "-1"
    }
    ===>
    { "interviewId": "EP10087-FT001",
      "targetId": "-1",
      "answerContent": "{}"
    }
   */
const toHumpParams = source => {
  if (!source || typeof (source) !== 'object') return source;
  if (Array.isArray(source)) {
    return source.map(item => {
      return toHumpParams(item);
    });
  }
  const obj = {};
  Object.keys(source).forEach(key => {
    obj[toHump(key)] = toHumpParams(source[key]);
  });
  return obj;
};

const list2map = (source, key) => {
  if (!Array.isArray(source) || !key) { return source; }

  const obj = {};
  source.forEach(item => {
    if (typeof (item[key]) === 'undefined') throw new Error(`不存在${key}的key值`);
    obj[item[key]] = item;
  });
  return obj;
};

// 解析文件流
const processExcelReadStream = (xlsx, stream) => {
  return new Promise((resolve, reject) => {
    const buffers = [];
    stream.on('data', data => { buffers.push(data); });
    stream.on('end', () => {
      const buffer = Buffer.concat(buffers);
      const workbook = xlsx.read(buffer, { type: 'buffer' });

      /* DO SOMETHING WITH workbook IN THE CALLBACK */
      return resolve(workbook);
    });
    stream.on('error', error => {
      return reject(error);
    });
  });
};

/*
 * randomWord 产生任意长度随机字母数字组合
 * randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
*/
const randomStr = (randomFlag, min, max) => {
  let str = '',
    range = min;
  const arr = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];

  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (let i = 0; i < range; i++) {
    const pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
};

/**
 * 校验必填项已填
 * @param {*} params 参数对象
 * @param {*} requiredParamsArr 必填项数组
 */
const checkRequired = (params, requiredParamsArr) => {
  for (let i = 0; i < requiredParamsArr.length; i++) {
    if (!params[requiredParamsArr[i]] && params[requiredParamsArr[i]] !== 0) {
      return false;
    }
  }
  return true;
};
module.exports = {
  toHumpParams,
  toLineParams,
  list2map,
  processExcelReadStream,
  formatDate,
  str2json,
  randomStr,
  checkRequired,
  toLine,
};
