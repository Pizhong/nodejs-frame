'use strict';

const SequelizeAuto = require('sequelize-auto');
const config = require('../config/config.local.js')({ name: '' });

const db = {
  database: config.sequelize.database,
  host: config.sequelize.host,
  port: config.sequelize.port,
  username: config.sequelize.username,
  password: config.sequelize.password,
  dialect: config.sequelize.dialect,
};
const auto = new SequelizeAuto(db.database, db.username, db.password, {
  host: db.host,
  dialect: db.dialect,
  directory: './database/model/', // prevents the program from writing to disk
  port: db.port,
  additional: {
    timestamps: false,
  },
  // tables: []  // 指定表格
  // ...
});

auto.run(function(err) {
  if (err) throw err;
});
