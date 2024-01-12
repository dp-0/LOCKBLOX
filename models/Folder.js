const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Folder = sequelize.define("Folder", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  folderName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Folder;
