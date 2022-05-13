const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('measure_old_relation', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "主键id"
    },
    company_id: {
      type: DataTypes.STRING(32),
      allowNull: true,
      comment: "新系统的companyId"
    },
    creator: {
      type: DataTypes.STRING(32),
      allowNull: true,
      comment: "新系统的creatorId"
    },
    old_company_id: {
      type: DataTypes.STRING(32),
      allowNull: true,
      comment: "旧系统的company_id"
    },
    old_creator: {
      type: DataTypes.STRING(32),
      allowNull: true,
      comment: "旧系统的creatorId"
    },
    ext: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "扩展字段"
    }
  }, {
    sequelize,
    tableName: 'measure_old_relation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
