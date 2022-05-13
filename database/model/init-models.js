var DataTypes = require("sequelize").DataTypes;
var _callback_registry = require("./callback_registry");
var _measure = require("./measure");
var _measure_detail = require("./measure_detail");
var _measure_old_relation = require("./measure_old_relation");
var _measure_setting = require("./measure_setting");

function initModels(sequelize) {
  var callback_registry = _callback_registry(sequelize, DataTypes);
  var measure = _measure(sequelize, DataTypes);
  var measure_detail = _measure_detail(sequelize, DataTypes);
  var measure_old_relation = _measure_old_relation(sequelize, DataTypes);
  var measure_setting = _measure_setting(sequelize, DataTypes);


  return {
    callback_registry,
    measure,
    measure_detail,
    measure_old_relation,
    measure_setting,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
