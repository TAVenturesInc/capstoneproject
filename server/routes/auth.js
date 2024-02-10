const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This section will help you create a new user
// Still need to add username/email check against the db to ensure no duplicates are found
authRoutes.route("/auth/register").post(async (req, res) => {
  const dbConnection = dbo.getDb();

  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  const myobj = {
    username: req.body.username,
    password: hashedPassword,
    email: req.body.email,
  };

  // Check if username exists
  const existingUser = await dbConnection
    .collection("users")
    .findOne({ username: myobj.username });

  if (existingUser) {
    // Username is taken
    res
      .status(409)
      .send({ success: false, message: "Username already exists" });
  } else {
    // Check if email exists
    const emailCount = await dbConnection
      .collection("users")
      .count({ email: myobj.email });

    if (emailCount > 0) {
      // Email is taken
      res.status(409).send({ success: false, message: "Email already exists" });
    } else {
      // Username and email are available
      const ans = await dbConnection
        .collection("users")
        .insertOne(myobj, function (err, res) {
          if (err) throw err;
          response.json(res);
        });
      res.send(true);
    }
  }
});

// Login authentication
authRoutes.route("/auth/login").post(async (req, res) => {
  const dbConnection = dbo.getDb();

  const myobj = {
    username: req.body.username,
    password: req.body.password,
  };

  // Find user
  const user = await dbConnection
    .collection("users")
    .findOne({ username: myobj.username });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
  
  // Compare passwords
  const isValidPassword = await bcrypt.compare(myobj.password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  // Valid user and password, generate JWT token
  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { 
    expiresIn: "1h",
  });

  // Send token as response
  res.status(200).json({ success: true, token: token });
})


module.exports = authRoutes;
