const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Folder = require("./Folder");

const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mnemonic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
User.hasMany(Folder, {
  foreignKey: "userId",
  as: "folders",
});
module.exports = User;
