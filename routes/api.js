import express from "express";
import multer from "multer";
import * as UserController from "../controller/UserController.js";
import { authenticateToken } from "../middleware/tokenVerify.js";
import * as FileUploadController from "../controller/FileUploadController.js";
import storage from "../helpers/storage.js";

const router = express.Router();

// User Registration Route
router.post("/register", UserController.register);

// User Login Route
router.post("/login", UserController.login);

// Password Reset Route
router.post("/reset-password", UserController.forgotPassword);

// Dashboard Route
router.get("/dashboard", authenticateToken, (req, res) => {
  res.send("Dashboard accessed!");
});

// Create folder
router.post(
  "/folder/create",
  authenticateToken,
  FileUploadController.createFolder
);

// Upload file
const upload = multer({ storage });
router.post(
  "/file/upload",
  upload.single("file"),
  authenticateToken,
  FileUploadController.fileUpload
);

export default router;
