/**
 * 雪花 ID 生成器
 * @description js Number最大长度不超过17位,否则会出现精度丢失的问题
 */
'use strict';
const { machineIdSync } = require('node-machine-id');
const BigInterger = require('big-integer');

class SnowflakeID {
  constructor(options) {
    options = options || {};
    this.seq = 0;
    // 机器id或任何随机数。如果您是在分布式系统中生成id，强烈建议您提供一个适合不同机器的mid。
    // 2进制10位 5位dataCenterId  5位是workerId
    // this.mid = (options.mid || 1) % 1023;
    this.dataCenterId = (options.dataCenterId || 1) % 32;
    this.workerId = (options.workerId || 1) % 32;
    // 这是一个时间偏移量，它将从当前时间中减去以获得id的前42位。这将有助于生成更小的id。
    this.offset = (new Date().getFullYear() - 1970) * 31536000 * 1000;
    this.lastTime = 0;
  }

  generate() {
    const time = Date.now();
    const bTime = (time - this.offset).toString(2);
    // get the sequence number
    if (this.lastTime === time) {
      this.seq++;
      if (this.seq > 4095) {
        this.seq = 0;
        // make system wait till time is been shifted by one millisecond
        while (Date.now() <= (time + 1000)) {}
      }
    } else {
      this.seq = 0;
    }

    this.lastTime = time;

    let bSeq = this.seq.toString(2);
    // let bMid = this.mid.toString(2);
    let bDataCenterId = this.dataCenterId.toString(2);
    let bWorkerId = this.workerId.toString(2);

    // create sequence binary bit
    while (bSeq.length < 12) bSeq = '0' + bSeq;

    // while (bMid.length < 10) bMid = '0' + bMid;
    while (bDataCenterId.length < 5) bDataCenterId = '0' + bDataCenterId;
    while (bWorkerId.length < 5) bWorkerId = '0' + bWorkerId;

    // const bid = bTime + bMid + bSeq;
    const bid = bTime + bDataCenterId + bWorkerId + bSeq;
    let id = '';
    for (let i = bid.length; i > 0; i -= 4) {
      id = parseInt(bid.substring(i - 4, i), 2).toString(16) + id;
    }
    // return this.hexToDec(id);
    return new BigInterger(id, 16).toString(36);
  }

  add(x, y, base) {
    const z = [];
    const n = Math.max(x.length, y.length);
    let carry = 0;
    let i = 0;
    while (i < n || carry) {
      const xi = i < x.length ? x[i] : 0;
      const yi = i < y.length ? y[i] : 0;
      const zi = carry + xi + yi;
      z.push(zi % base);
      carry = Math.floor(zi / base);
      i++;
    }
    return z;
  }

  /**
    * 乘以数字
    * @param {*} num
    * @param {*} x
    * @param {*} base
    */
  multiplyByNumber(num, x, base) {
    if (num < 0) return null;
    if (num === 0) return [];

    let result = [];
    let power = x;
    while (true) {
      if (num && 1) {
        result = this.add(result, power, base);
      }
      num = num >> 1;
      if (num === 0) break;
      power = this.add(power, power, base);
    }

    return result;
  }

  /**
    * 解析为数组
    * @param {*} str
    * @param {*} base
    */
  parseToDigitsArray(str, base) {
    const digits = str.split('');
    const ary = [];
    for (let i = digits.length - 1; i >= 0; i--) {
      const n = parseInt(digits[i], base);
      if (isNaN(n)) return null;
      ary.push(n);
    }
    return ary;
  }

  /**
    * 转换
    * @param {*} str 字符串
    * @param {*} fromBase 进制
    * @param {*} toBase
    */
  convertBase(str, fromBase, toBase) {
    const digits = this.parseToDigitsArray(str, fromBase);
    if (digits === null) return null;
    let outArray = [];
    let power = [ 1 ];
    for (let i = 0; i < digits.length; i++) {
      // inletiant: at this point, fromBase^i = power
      if (digits[i]) {
        outArray = this.add(
          outArray,
          this.multiplyByNumber(digits[i], power, toBase),
          toBase
        );
      }
      power = this.multiplyByNumber(fromBase, power, toBase);
    }
    let out = '';
    // 设置了这里-3会返回16位的字符,如果是设置为outArray.length - 1 会返回18位的字符
    for (let i = outArray.length - 3; i >= 0; i--) {
      out += outArray[i].toString(toBase);
    }
    return out;
  }

  /**
    * 16进制=> 10进制
    * @param {*} hexStr 16进制数字
    */
  hexToDec(hexStr) {
    if (hexStr.substring(0, 2) === '0x') hexStr = hexStr.substring(2);
    hexStr = hexStr.toLowerCase();
    return this.convertBase(hexStr, 16, 10);
  }

  /**
    * 十进制数转成36进制
    */
  getNums36() {
    const nums36 = [];
    for (let i = 0; i < 36; i++) {
      if (i >= 0 && i <= 9) {
        nums36.push(i);
      } else {
        nums36.push(String.fromCharCode(i + 87));
      }
    }
    return nums36;
  }

  scale36(n) {
    const arr = [];
    const nums36 = this.getNums36();
    while (n) {
      // 除n取余
      const res = n % 36;
      // 然后作为下标得到对应的36进制数
      arr.unshift(nums36[res]);
      // 去掉个位
      n = parseInt(n / 36);
    }
    return arr.join('');
  }
  // 十进制数转成36进制 end
}

/**
    * 获取机器码
    * @return {String} 机器码
    */
function getMachineIdSync() {
  return machineIdSync();
}

function getMachineIdNum() {
  return getNameId(getMachineIdSync());
}

/**
  * 使用 ascll码生成数字
  * @param {*} name
  */
function getNameId(name) {
  const maxLength = 16;
  const tempArr = name.split('');
  let num = '';
  tempArr.forEach(item => {
    num += item.charCodeAt(0);
  });
  if (num.length > maxLength) {
    num = num.substring(0, maxLength);
  }
  return Number(num);
}

module.exports.getMachineIdNum = getMachineIdNum;
module.exports.getNameId = getNameId;
module.exports.SnowflakeID = SnowflakeID;
// module.exports = SnowflakeID;

