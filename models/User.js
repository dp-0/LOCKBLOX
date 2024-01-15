import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Folder from "./Folder.js";

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

export default User;
