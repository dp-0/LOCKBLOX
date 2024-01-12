const express = require("express");
const multer = require("multer");
const router = express.Router();
const UserController = require("../controller/UserController");
const authenticateToken = require("../middleware/tokenVerify");
const FileUploadController = require("../controller/FileUploadController");
const storage = require("../helpers/storage");

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
//create folder
router.post(
  "/folder/create",
  authenticateToken,
  FileUploadController.createFolder
);

//upload file
const upload = multer({ storage: storage });
router.post(
  "/file/upload",
  upload.single("file"),
  authenticateToken,
  FileUploadController.fileUpload
);

module.exports = router;
