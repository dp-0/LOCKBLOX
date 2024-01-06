require("dotenv").config();
const Sequelize = require("sequelize");
const env = require("../helpers/env");
const config = require("./config.json")[env("APP_ENV")];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

module.exports = sequelize;
