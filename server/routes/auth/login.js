const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authLogin = express.Router();

const dbo = require("../../db/conn");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

authLogin.route("/auth/login").post(async (req, res) => {
  try {
    const dbConnection = dbo.getDb();

    const myobj = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    };

    // Find user
    const user = await dbConnection
      .collection("users")
      .findOne({ username: myobj.username });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Compare passwords
    const isValidPassword = await bcrypt.compare(myobj.password, user.password);

    if (!isValidPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Valid user and password, generate JWT token
    const token = createToken(myobj.username._id);

    // Set session and send the token as a cookie
    req.session.user = user;
    res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

    res.status(200).json({
      userId: user._id,
      userName: user.username,
      email: user.email,
      success: true,
      token: token,
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = authLogin;
