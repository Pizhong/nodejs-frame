'use strict';
// const SnowflakeID = require('../utils/snowflakeId');

const { getMachineIdNum, getNameId, SnowflakeID } = require('../utils/snowflakeId');
const workerId = getMachineIdNum();
const dataCenterId = getNameId('callback_registry');

const snowflakeID = new SnowflakeID({
  workerId,
  dataCenterId,
});
module.exports = app => {
  const { BIGINT, STRING } = app.Sequelize;

  return app.model.define('callback_registry', {
    id: {
      autoIncrement: true,
      type: BIGINT,
      allowNull: false,
      primaryKey: true,
      defaultValue: () => {
        const id = snowflakeID.generate();
        return id;
      },
      comment: '主键'
    },
    server_name: {
      type: STRING(64),
      allowNull: false,
      defaultValue: '',
      comment: '微服务名称'
    },
    code: {
      type: STRING(64),
      allowNull: false,
      defaultValue: '',
      comment: '监听的业务编码'
    },
    note: {
      type: STRING(255),
      allowNull: false,
      defaultValue: '',
      comment: '备注'
    }
  }, {
    sequelize: app.Sequelize,
    tableName: 'callback_registry',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'id' },
        ]
      },
    ]
  });
};
