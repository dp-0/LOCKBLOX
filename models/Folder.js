import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

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

export default Folder;
