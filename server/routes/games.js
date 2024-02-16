const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;
const gamesRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

gamesRoutes.route("/api/games").get(async (req, res) => {
  const dbConnection = dbo.getDb();
  const ans = await dbConnection
    .collection("game_data")
    .find({})
    .project({ title: 1, userId: 1, userName: 1, genre: 1, description: 1 })
    .toArray();
  return res.send(ans);
});

// This section will help you get a single record by id
gamesRoutes.route("/api/games/:id").get(async (req, res) => {
  const dbConnection = dbo.getDb();
  const ans = await dbConnection
    .collection("game_data")
    .findOne({ _id: new ObjectId(req.params.id) })
    .catch((err) => {
      console.error(err);
    });

  return res.send(ans);
});

// This section will help you create a new record.
gamesRoutes.route("/api/games/add").post(async (req, res) => {
  const dbConnection = dbo.getDb();
  const myobj = {
    userName: req.body.userName,
    userId: new ObjectId(req.body.userId),
    content: req.body.content,
    description: req.body.description,
    genre: req.body.genre,
    title: req.body.title,
  };
  const ans = await dbConnection
    .collection("game_data")
    .insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });

  return res.send({
    success: true,
    message: "Game added successfully!",
    id: ans.insertedId.toString(),
  });
});

// This section will help you update a record by id.
gamesRoutes.route("/api/games/:id").post(async (req, res) => {
  const dbConnection = dbo.getDb();
  const myquery = { _id: new ObjectId(req.params.id) };
  const newvalues = {
    $set: {
      userName: req.body.userName,
      userId: new ObjectId(req.body.userId),
      content: req.body.content,
      description: req.body.description,
      genre: req.body.genre,
      title: req.body.title,
    },
  };
  const ans = await dbConnection
    .collection("game_data")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });

  return res.send(ans);
});

// This section will help you delete a record
gamesRoutes.route("/api/games/:id").delete(async (req, res) => {
  const dbConnection = dbo.getDb();
  const myquery = { _id: new ObjectId(req.params.id) };
  await dbConnection
    .collection("game_data")
    .deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      response.json(obj);
    });

  return res.send(true);
});

module.exports = gamesRoutes;
