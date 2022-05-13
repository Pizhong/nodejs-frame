const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('measure', {
    measure_id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true,
      comment: "流水号"
    },
    measure_no: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: "",
      comment: "编号"
    },
    measure_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: "",
      comment: "方案名称"
    },
    company_id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: "",
      comment: "创建人企业id"
    },
    owner_company_id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: "",
      comment: "关联的企业流水号"
    },
    owner_company_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: "",
      comment: "企业名称"
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "状态 0 未设置 1 草稿 2 待审核 3 未通过 4 确认中 5 已完成"
    },
    creator: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: "",
      comment: "创建人"
    },
    creator_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: "",
      comment: "创建人名称"
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "创建时间"
    },
    updater: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: "",
      comment: "最后更新人"
    },
    updater_name: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: "",
      comment: "最后更新人名称"
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "最后更新（保存）时间"
    },
    confirmor: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: "",
      comment: "确认人"
    },
    confirmor_name: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: "",
      comment: "确认人名称"
    },
    confirm_time: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "确认时间"
    },
    locker: {
      type: DataTypes.STRING(32),
      allowNull: true,
      defaultValue: "",
      comment: "锁定人"
    },
    locker_name: {
      type: DataTypes.STRING(32),
      allowNull: true,
      defaultValue: "",
      comment: "锁定人名称"
    },
    locker_phone: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: "",
      comment: "锁定人手机号"
    },
    is_lock: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "是否被锁定 0 未锁定 1 已锁定"
    },
    bind_code: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "",
      comment: "微咨询方案code"
    },
    bind_id: {
      type: DataTypes.STRING(32),
      allowNull: true,
      defaultValue: "",
      comment: "微咨询方案id"
    },
    talent_valuation_id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: "",
      comment: "人才评估方案id"
    },
    job_valuation_id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: "",
      comment: "岗位评估方案id"
    },
    lock_platform: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "锁定测算所在的平台 0 未设置 1 顾问平台 2 企业平台"
    },
    create_platform: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "创建测算的平台 0 未设置 1 顾问平台 2 企业平台"
    },
    author: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: "",
      comment: "作者"
    },
    author_name: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: "",
      comment: "作者名称"
    },
    company_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'measure',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "measure_id" },
        ]
      },
    ]
  });
};
