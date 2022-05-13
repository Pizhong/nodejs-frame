'use strict';
// const SnowflakeID = require('../utils/snowflakeId');

const { getMachineIdNum, getNameId, SnowflakeID } = require('../utils/snowflakeId');
const workerId = getMachineIdNum();
const dataCenterId = getNameId('measure_old_relation');

const snowflakeID = new SnowflakeID({
  workerId,
  dataCenterId,
});
module.exports = app => {
  const { BIGINT, STRING } = app.Sequelize;

  return app.model.define('measure_old_relation', {
    id: {
      autoIncrement: true,
      type: BIGINT,
      allowNull: false,
      primaryKey: true,
      defaultValue: () => {
        const id = snowflakeID.generate();
        return id;
      },
      comment: '主键id'
    },
    company_id: {
      type: STRING(32),
      allowNull: true,
      comment: '新系统的companyId'
    },
    creator: {
      type: STRING(32),
      allowNull: true,
      comment: '新系统的creatorId'
    },
    old_company_id: {
      type: STRING(32),
      allowNull: true,
      comment: '旧系统的company_id'
    },
    old_creator: {
      type: STRING(32),
      allowNull: true,
      comment: '旧系统的creatorId'
    },
    ext: {
      type: STRING(100),
      allowNull: true,
      comment: '扩展字段'
    }
  }, {
    sequelize: app.Sequelize,
    tableName: 'measure_old_relation',
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
