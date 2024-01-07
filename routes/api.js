const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");
const authenticateToken = require("../middleware/tokenVerify");

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

module.exports = router;
