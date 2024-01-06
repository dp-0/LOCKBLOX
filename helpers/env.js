require("dotenv").config();

module.exports = function (key) {
  return process.env[key];
};
