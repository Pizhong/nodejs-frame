const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('measure_detail', {
    measure_detail_id: {
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
    measure_detail: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "分配测算结果，json字符串"
    },
    type: {
      type: DataTypes.STRING(15),
      allowNull: false,
      comment: "设置类型，allocte: 分配测算\nprofit: 收益测算\npressure: 压力测算\ncost：支付成本测算"
    },
    verify_status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "校验状态 0 未校验  1 校验不通过 2 校验通过"
    },
    ext: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "",
      comment: "扩展字段"
    }
  }, {
    sequelize,
    tableName: 'measure_detail',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "measure_detail_id" },
        ]
      },
    ]
  });
};
