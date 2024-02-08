const express = require("express");
//const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");
const ObjectId = require('mongodb').ObjectId;

const stateRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");


// Get the current game_state.
// There should only be one game state doc per session
stateRoutes.route("/api/state/:id").get(async (req, res) => {
  const dbConnection = dbo.getDb();
  const ans = await dbConnection
    .collection("game_state")
    .findOne({ _id: new ObjectId(req.params.id) })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
    });
  res.send(ans);
});

// Get all current game_states.
stateRoutes.route("/api/state/").get(async (req, res) => {
  const dbConnection = dbo.getDb();
  const ans = await dbConnection
    .collection("game_state")
    .find({})
    //.limit(10)
    .toArray()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
    });
  res.send(ans);
});


// Create a game_state document (there should only be one per session)
stateRoutes.route("/api/state/add").post(async (req, res) => {
  const dbConnection = dbo.getDb();
  const myobj = {
    name: req.body.name,
    room: req.body.room, // put in route to retrieve first room here
    actions_visible: [{}], // TODO: put in route to retrieve all room_1 actions, filter for visible
    actions_enabled: [{}], // TODO: put in route to retrieve all room_1 actions, filter for visible
    inventory: [{}]
  };
  const ans = await dbConnection
    .collection("game_state")
    .insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
  res.send(true)
});


// Delete a game_state document (there should only be one per session)
stateRoutes.route("/api/state/:id").delete(async (req, res) => {
  const dbConnection = dbo.getDb();
  const myquery = { _id: new ObjectId(req.params.id) };
  await dbConnection
    .collection("game_state")
    .deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      response.json(obj);
    });

  res.send(true);
});


// Get Current Room

// Get Current Actions

// Get Current Visible actions

// Get Current Enabled actions

// Update Current Room

// Update Curremt actions (actions associated with the current room)


module.exports = stateRoutes;