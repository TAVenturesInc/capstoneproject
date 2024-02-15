const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authRegister = express.Router();

// This will help us connect to the database
const dbo = require("../../db/conn");

// This section will help you create a new user
// Still need to add username/email check against the db to ensure no duplicates are found
authRegister.route("/auth/register").post(async (req, res) => {
  try {
    const dbConnection = dbo.getDb();

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const newUser = {
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    };

    // Check if username exists
    const existingUser = await dbConnection
      .collection("users")
      .findOne({ username: newUser.username });

    if (existingUser) {
      // Username is taken
      return res.status(409).json({ success: false, message: "Username already exists" });
    }

    // Check if email exists
    const emailCount = await dbConnection
      .collection("users")
      .count({ email: newUser.email });

    if (emailCount > 0) {
      // Email is taken
      return res.status(409).json({ success: false, message: "Email already exists" });
    }
    // Username and email are available
    await dbConnection.collection("users").insertOne(newUser);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error in registration", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = authRegister;

