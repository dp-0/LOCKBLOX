import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Folder from "./Folder.js";

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
  cid: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

File.belongsTo(Folder, {
  foreignKey: "folderId",
  as: "folder",
});

export default File;
