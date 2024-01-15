import Validator from "validatorjs";
import Folder from "../models/Folder.js";
import Files from "../models/Files.js";
import addFileToIpfs from "../helpers/AddFileToIpfs.js";
import placeStorageOrder from "../helpers/PinCidToCrustNetwork.js";
import fs from "fs";
export const createFolder = async (req, res) => {
  try {
    const { path, name } = req.body;

    const userId = req.user.id;

    // Define validation rules
    let rules = {
      path: "required",
      name: "required",
    };

    // Validate the request data
    let validation = new Validator({ path, name }, rules);

    if (validation.fails()) {
      return res.status(400).json({ errors: validation.errors.all() });
    }

    // Prepend the userId to the filePath
    const updatedFilePath = "uploads/" + userId + path + "/" + name;

    //check folder exits or not in the folder model
    const existingFolder = await Folder.findOne({
      where: { userId, folderName: name, filePath: updatedFilePath },
    });
    if (existingFolder) {
      return res.status(400).json({
        message: "Folder already exists.",
        path: existingFolder.filePath,
      });
    }

    // Insert the folder in the Folder model
    const folder = await Folder.create({
      userId,
      folderName: name,
      filePath: updatedFilePath,
    });

    res.status(201).json(folder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fileUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No files were uploaded." });
  }

  const file = req.file;
  const path = req.body.path;

  const userId = req.user.id;
  const fullPath = `uploads/${userId}${path}`;

  let folder = await Folder.findOne({
    where: { userId: userId, filePath: fullPath },
  });

  if (!folder) {
    return res.status(200).json({ message: "Path does not exist" });
  }
  try {
    if (!fs.existsSync(file.path)) {
      return res.status(400).json({ message: "File does not exist." });
    }
    const fileContent = fs.readFileSync(file.path);
    const { cid, size } = await addFileToIpfs(fileContent);
    await placeStorageOrder(cid, size);
    const fileModel = await Files.create({
      folderId: folder.id,
      fileName: file.originalname,
      filePath: `uploads/${file.filename}`,
    });

    res.status(200).json({ message: "File Uploaded", File: fileModel });
  } catch (error) {
    res.status(500).json(error);
  }
};
