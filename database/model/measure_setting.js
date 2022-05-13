const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('measure_setting', {
    measure_setting_id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: "",
      primaryKey: true,
      comment: "测算详情id"
    },
    measure_id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: "",
      comment: "测算id"
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "状态 1 使用中 2 删除"
    },
    creator: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: "",
      comment: "创建人"
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
      comment: "更新人"
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "更新时间"
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "设置详情，json字符串"
    },
    type: {
      type: DataTypes.STRING(15),
      allowNull: false,
      comment: "设置类型，batch 批次设置 parameter: 参数设置 overview: 激励概况"
    },
    verify_status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "校验状态 0 未校验 1 校验不通过 2 校验通过"
    },
    ext: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "",
      comment: "设置类型，"
    }
  }, {
    sequelize,
    tableName: 'measure_setting',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "measure_setting_id" },
        ]
      },
    ]
  });
};
