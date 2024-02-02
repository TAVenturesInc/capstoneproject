const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

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
  const ans = await dbConnection
    .collection("users")
    .insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
  res.send(true);
});

// Need to add login functionality below

module.exports = authRoutes