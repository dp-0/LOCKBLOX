const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");

// User Registration Route
router.post("/register", UserController.register);

// User Login Route
router.post("/login", UserController.login);

// Password Reset Route
router.post("/reset-password", UserController.forgotPassword);

module.exports = router;
