'use strict';
// const SnowflakeID = require('../utils/snowflakeId');

const { getMachineIdNum, getNameId, SnowflakeID } = require('../utils/snowflakeId');
const workerId = getMachineIdNum();
const dataCenterId = getNameId('measure_detail');

const snowflakeID = new SnowflakeID({
  workerId,
  dataCenterId,
});
module.exports = app => {
  const { STRING, TINYINT, DATE, TEXT } = app.Sequelize;

  return app.model.define('measure_detail', {
    measure_detail_id: {
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
    measure_detail: {
      type: TEXT,
      allowNull: false,
      comment: '分配测算结果，json字符串'
    },
    type: {
      type: STRING(15),
      allowNull: false,
      comment: '设置类型，allocte: 分配测算\nprofit: 收益测算\npressure: 压力测算\ncost：支付成本测算'
    },
    verify_status: {
      type: TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: '校验状态 0 未校验  1 校验不通过 2 校验通过'
    },
    ext: {
      type: STRING(50),
      allowNull: true,
      defaultValue: '',
      comment: '扩展字段'
    }
  }, {
    sequelize: app.Sequelize,
    tableName: 'measure_detail',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'measure_detail_id' },
        ]
      },
    ]
  });
};
