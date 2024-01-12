const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Folder = require("./Folder");

const File = sequelize.define("File", {
  folderId: {
    type: DataTypes.INTEGER,
    references: {
      model: Folder,
      key: "id",
    },
    allowNull: false,
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
File.belongsTo(Folder, {
  foreignKey: "folderId",
  as: "folder",
});
module.exports = File;
