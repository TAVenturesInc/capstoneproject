const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This helps convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
recordRoutes.route("/games").get(async (req, res) => {
  const dbConnection = dbo.getDb();
  const ans = await dbConnection
    .collection("game_data")
    .find({})
    .limit(10)
    .toArray();
  res.send(ans);
});

// This section will help you get a single record by id
recordRoutes.route("/games/:id").get(async (req, res) => {
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
recordRoutes.route("/games/add").post(async (req, res) => {
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
recordRoutes.route("/games/:id").post(async (req, res) => {
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
recordRoutes.route("/:id").delete(async (req, res) => {
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

module.exports = recordRoutes;
