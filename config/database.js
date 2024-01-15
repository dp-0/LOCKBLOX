import dotenv from "dotenv";
import Sequelize from "sequelize";
import env from "../helpers/env.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawConfig = fs.readFileSync(path.join(__dirname, "./config.json"));
const config = JSON.parse(rawConfig);

const sequelize = new Sequelize(
 config[env("APP_ENV")].database,
 config[env("APP_ENV")].username,
 config[env("APP_ENV")].password,
 {
  host: config[env("APP_ENV")].host,
  dialect: config[env("APP_ENV")].dialect,
 }
);

export default sequelize;