
'use strict';
const fs = require('fs');
// 下划线转换驼峰
function toHump(name) {
  return name.replace(/\_(\w)/g, function(all, letter) {
    return letter.toUpperCase();
  });
}

const originDir = 'database/model/';
const targetDir = 'app/model/';
const fileList = fs.readdirSync(originDir);
// const fileNameList = [];
// const targetFileNameList = [];
const fileNameMap = {};
fileList.forEach(fileName => {
  if (/^(init).*/gi.test(fileName)) return true;
  fileNameMap[fileName] = toHump(fileName);
});
Object.keys(fileNameMap).forEach(fileName => {
  const targetFileName = fileNameMap[fileName];
  fs.readFile(`${originDir}${fileName}`, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    const reg = /sequelize.define\(['"]{1}([\S]*?)['"]{1}/;
    const tableName = data.match(reg)[1];
    const res1 = data.replace(/const Sequelize = require\('sequelize'\);/g, `'use strict';
// const SnowflakeID = require('../utils/snowflakeId');

const { getMachineIdNum, getNameId, SnowflakeID } = require('../utils/snowflakeId');
const workerId = getMachineIdNum();
const dataCenterId = getNameId('${tableName}');

const snowflakeID = new SnowflakeID({
  workerId,
  dataCenterId,
});`);

    const types = [];
    res1.replace(/(DataTypes\.(.+),)/g, function(match, p1, p2) {
      const type = p2.split('(');
      if (!types.includes(type[0])) {
        types.push(type[0]);
      }
    });

    const res2 = res1.replace(/module.exports = function\(sequelize, DataTypes\) {/g, `module.exports = app => {\n\r  const { ${types.join(', ')} } = app.Sequelize;\n`);
    const res3 = res2.replace(/DataTypes\./g, '');
    const res4 = res3.replace(/Sequelize\.Sequelize\.literal/g, 'app.Sequelize.Sequelize.literal');
    const res5 = res4.replace(/sequelize\.define/g, 'app.model.define');
    const res6 = res5.replace(/sequelize,/g, 'sequelize: app.Sequelize,');
    const res7 = res6.replace(/"/g, "'");
    // 主键默认值(主键默认值为16位的雪花Id)
    let res8 = res7;
    const primaryKeyReg = /({[\s\S]*?defaultValue: )([\s\S]*?)(,[^}]*?primaryKey: true[^}]*?})/;
    if (primaryKeyReg.test(res7)) {
      res8 = res7.replace(primaryKeyReg, (str, $1, $2, $3) => {
        return $1 + `() => {
        const id = snowflakeID.generate();
        return id;
      }` + $3;
      });
    } else {
      res8 = res7.replace(/primaryKey: true/g, `primaryKey: true,
      defaultValue: () => {
        const id = snowflakeID.generate();
        return id;
      }`);
    }
    fs.writeFile(`${targetDir}${targetFileName}`, res8, 'utf8', function(err) {
      if (err) {
        throw err;
      }
    });
  });
});

