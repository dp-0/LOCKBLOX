const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Validator = require("validatorjs");
const bip39 = require("bip39");
const env = require("../helpers/env");
require("../validator/mnemonic");
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check if username already exists
    const userExists = await User.findOne({ where: { username } });
    if (userExists) {
      return res
        .status(400)
        .json({ errors: [{ username: "Username already exists." }] });
    }
    let rules = {
      username: "required|alpha_dash|min:3|max:16",
      password: "required|min:6",
    };
    let validation = new Validator({ username, password }, rules);

    if (validation.fails()) {
      return res.status(400).json({ errors: validation.errors.all() });
    }
    const mnemonic = bip39.generateMnemonic();
    const hashedPassword = await bcrypt.hash(password, 10);
    const hasedmnemonic = await bcrypt.hash(mnemonic, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      mnemonic: hasedmnemonic,
    });
    res
      .status(201)
      .send({ message: "User registered successfully!", user, mnemonic });
  } catch (error) {
    res.status(500).send({
      message: "Error occurred while registering user.",
      error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    let rules = {
      username: "required|alpha_dash|min:3|max:16",
      password: "required|min:6",
    };
    let validation = new Validator({ username, password }, rules);

    if (validation.fails()) {
      return res.status(400).json({ errors: validation.errors.all() });
    }
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).send({ message: "Invalid username or password." });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send({ message: "Invalid username or password." });
    }
    const token = jwt.sign({ id: user.id }, env("JWT_SECRET"), {
      expiresIn: "1h",
    });
    res.send({ message: "User logged in successfully!", _token: token });
  } catch (error) {
    res.status(500).send({ message: "Error occurred while logging in." });
  }
};
exports.forgotPassword = async (req, res) => {
  try {
    const { username, password, mnemonic } = req.body;
    let rules = {
      username: "required|alpha_dash|min:3|max:16",
      password: "required|min:6",
      mnemonic: "required|mnemonic:12",
    };
    let validation = new Validator({ username, password, mnemonic }, rules);

    if (validation.fails()) {
      return res.status(400).json({ errors: validation.errors.all() });
    }
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).send({ message: "Invalid username." });
    }
    await bcrypt
      .compare(mnemonic, user.mnemonic)
      .then(async () => {
        const newPassword = await bcrypt.hash(password, 10);
        await User.update({ password: newPassword }, { where: { username } });
        res.send({ message: "Password reset successful!" });
      })
      .catch((err) => {
        return res
          .status(400)
          .send({ message: "Invalid mnemonic phrase.", error: err });
      });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error occurred while resetting password." });
  }
};
