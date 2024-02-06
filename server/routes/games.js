const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const gamesRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This section will help you create a new user
// Still need to add username/email check against the db to ensure no duplicates are found
// gamesRoutes.route("/games").get((req, res) => {
//   res.sendFile(__dirname + '/public/index.html');
// });
// gamesRoutes.route("/games/edit/:id").get((req, res) => {
//   res.sendFile(__dirname + '/public/index.html');
// });
// gamesRoutes.route("/games/new").get((req, res) => {
//   res.sendFile(__dirname + '/public/index.html');
// });
gamesRoutes.route("/api/games").get(async (req, res) => {
  const dbConnection = dbo.getDb();
  const ans = await dbConnection
    .collection("game_data")
    .find({})
    .limit(10)
    .toArray();
  res.send(ans);
});
// This section will help you get a single record by id
gamesRoutes.route("/api/games/:id").get(async (req, res) => {
  const dbConnection = dbo.getDb();

  const ans = await dbConnection
    .collection("game_data")
    .findOne({ _id: new ObjectId(req.params.id) })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
    });

  res.send(ans);
});

// This section will help you create a new record.
gamesRoutes.route("/api/games/add").post(async (req, res) => {
  const dbConnection = dbo.getDb();
  const myobj = {
    name: req.body.name,
    rating: req.body.rating,
    field: req.body.field,
    author: req.body.author,
  };
  const ans = await dbConnection
    .collection("game_data")
    .insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
  res.send(true);
});

// This section will help you update a record by id.
gamesRoutes.route("/api/games/:id").post(async (req, res) => {
  const dbConnection = dbo.getDb();
  const myquery = { _id: new ObjectId(req.params.id) };
  const newvalues = {
    $set: {
      name: req.body.name,
      rating: req.body.rating,
      field: req.body.field,
      author: req.body.author,
    },
  };
  const ans = await dbConnection
    .collection("game_data")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });

  res.send(ans);
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

  res.send(true);
});

module.exports = gamesRoutes;
