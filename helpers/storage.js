import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the destination directory based on user or other criteria

    const dynamicFolder = `uploads/`;

    // Create the folder if it doesn't exist
    if (!fs.existsSync(dynamicFolder)) {
      fs.mkdirSync(dynamicFolder, { recursive: true });
    }

    cb(null, dynamicFolder);
  },
  filename: function (req, file, cb) {
    // Generate a random filename with the original extension
    const randomFileName = uuidv4();
    const fileExtension = file.originalname.split(".").pop();
    const fullFileName = `${randomFileName}.${fileExtension}`;
    cb(null, fullFileName);
  },
});

export default storage;
