import dotenv from "dotenv";

dotenv.config();

export default function (key) {
  return process.env[key];
}
