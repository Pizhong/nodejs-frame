'use strict';
// const SnowflakeID = require('../utils/snowflakeId');

const { getMachineIdNum, getNameId, SnowflakeID } = require('../utils/snowflakeId');
const workerId = getMachineIdNum();
const dataCenterId = getNameId('measure');

const snowflakeID = new SnowflakeID({
  workerId,
  dataCenterId,
});
module.exports = app => {
  const { STRING, TINYINT, DATE } = app.Sequelize;

  return app.model.define('measure', {
    measure_id: {
      type: STRING(32),
      allowNull: false,
      primaryKey: true,
      defaultValue: () => {
        const id = snowflakeID.generate();
        return id;
      },
      comment: '流水号'
    },
    measure_no: {
      type: STRING(32),
      allowNull: false,
      defaultValue: '',
      comment: '编号'
    },
    measure_name: {
      type: STRING(30),
      allowNull: false,
      defaultValue: '',
      comment: '方案名称'
    },
    company_id: {
      type: STRING(32),
      allowNull: false,
      defaultValue: '',
      comment: '创建人企业id'
    },
    owner_company_id: {
      type: STRING(32),
      allowNull: false,
      defaultValue: '',
      comment: '关联的企业流水号'
    },
    owner_company_name: {
      type: STRING(30),
      allowNull: false,
      defaultValue: '',
      comment: '企业名称'
    },
    status: {
      type: TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: '状态 0 未设置 1 草稿 2 待审核 3 未通过 4 确认中 5 已完成'
    },
    creator: {
      type: STRING(32),
      allowNull: false,
      defaultValue: '',
      comment: '创建人'
    },
    creator_name: {
      type: STRING(30),
      allowNull: false,
      defaultValue: '',
      comment: '创建人名称'
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
      comment: '最后更新人'
    },
    updater_name: {
      type: STRING(32),
      allowNull: false,
      defaultValue: '',
      comment: '最后更新人名称'
    },
    update_time: {
      type: DATE,
      allowNull: false,
      defaultValue: app.Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: '最后更新（保存）时间'
    },
    confirmor: {
      type: STRING(32),
      allowNull: false,
      defaultValue: '',
      comment: '确认人'
    },
    confirmor_name: {
      type: STRING(32),
      allowNull: false,
      defaultValue: '',
      comment: '确认人名称'
    },
    confirm_time: {
      type: DATE,
      allowNull: true,
      comment: '确认时间'
    },
    locker: {
      type: STRING(32),
      allowNull: true,
      defaultValue: '',
      comment: '锁定人'
    },
    locker_name: {
      type: STRING(32),
      allowNull: true,
      defaultValue: '',
      comment: '锁定人名称'
    },
    locker_phone: {
      type: STRING(32),
      allowNull: false,
      defaultValue: '',
      comment: '锁定人手机号'
    },
    is_lock: {
      type: TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: '是否被锁定 0 未锁定 1 已锁定'
    },
    bind_code: {
      type: STRING(50),
      allowNull: true,
      defaultValue: '',
      comment: '微咨询方案code'
    },
    bind_id: {
      type: STRING(32),
      allowNull: true,
      defaultValue: '',
      comment: '微咨询方案id'
    },
    talent_valuation_id: {
      type: STRING(32),
      allowNull: false,
      defaultValue: '',
      comment: '人才评估方案id'
    },
    job_valuation_id: {
      type: STRING(32),
      allowNull: false,
      defaultValue: '',
      comment: '岗位评估方案id'
    },
    lock_platform: {
      type: TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: '锁定测算所在的平台 0 未设置 1 顾问平台 2 企业平台'
    },
    create_platform: {
      type: TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: '创建测算的平台 0 未设置 1 顾问平台 2 企业平台'
    },
    author: {
      type: STRING(32),
      allowNull: false,
      defaultValue: '',
      comment: '作者'
    },
    author_name: {
      type: STRING(32),
      allowNull: false,
      defaultValue: '',
      comment: '作者名称'
    },
    company_name: {
      type: STRING(100),
      allowNull: true
    }
  }, {
    sequelize: app.Sequelize,
    tableName: 'measure',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'measure_id' },
        ]
      },
    ]
  });
};
