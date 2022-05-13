const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('callback_registry', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "主键"
    },
    server_name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: "",
      comment: "微服务名称"
    },
    code: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: "",
      comment: "监听的业务编码"
    },
    note: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
      comment: "备注"
    }
  }, {
    sequelize,
    tableName: 'callback_registry',
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
