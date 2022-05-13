'use strict';
// const SnowflakeID = require('../utils/snowflakeId');

const { getMachineIdNum, getNameId, SnowflakeID } = require('../utils/snowflakeId');
const workerId = getMachineIdNum();
const dataCenterId = getNameId('measure_setting');

const snowflakeID = new SnowflakeID({
  workerId,
  dataCenterId,
});
module.exports = app => {
  const { STRING, TINYINT, DATE, TEXT } = app.Sequelize;

  return app.model.define('measure_setting', {
    measure_setting_id: {
      type: STRING(32),
      allowNull: false,
      defaultValue: () => {
        const id = snowflakeID.generate();
        return id;
      },
      primaryKey: true,
      comment: '测算详情id'
    },
    measure_id: {
      type: STRING(32),
      allowNull: false,
      defaultValue: '',
      comment: '测算id'
    },
    status: {
      type: TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: '状态 1 使用中 2 删除'
    },
    creator: {
      type: STRING(32),
      allowNull: false,
      defaultValue: '',
      comment: '创建人'
    },
    create_time: {
      type: DATE,
      allowNull: false,
      defaultValue: app.Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: '创建时间'
    },
    updater: {
      type: STRING(32),
      allowNull: false,
      defaultValue: '',
      comment: '更新人'
    },
    update_time: {
      type: DATE,
      allowNull: false,
      defaultValue: app.Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: '更新时间'
    },
    content: {
      type: TEXT,
      allowNull: false,
      comment: '设置详情，json字符串'
    },
    type: {
      type: STRING(15),
      allowNull: false,
      comment: '设置类型，batch 批次设置 parameter: 参数设置 overview: 激励概况'
    },
    verify_status: {
      type: TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: '校验状态 0 未校验 1 校验不通过 2 校验通过'
    },
    ext: {
      type: STRING(50),
      allowNull: true,
      defaultValue: '',
      comment: '设置类型，'
    }
  }, {
    sequelize: app.Sequelize,
    tableName: 'measure_setting',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'measure_setting_id' },
        ]
      },
    ]
  });
};
