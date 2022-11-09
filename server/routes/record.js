const express = require("express");
const recordRoutes = express.Router();

const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

//  Get all data within database
recordRoutes.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb("boxersDB");
  db_connect
    .collection("boxers")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// Get all data from search input
recordRoutes.route("/record/:name").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { name: req.params.name };
  db_connect
    .collection("boxers")
    .find({ name: new RegExp(myquery.name, "i") })
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
      console.log(result);
    });
});

// Get info data when card is clicked
recordRoutes.route("/getInfo/:id").get(function (req, res) {
  console.log(req.params);
  if (req.params.id !== "undefined") {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("boxers").findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  }
});

// Add new info to boxer's info list
recordRoutes.route("/update/:id").post(function (req, response) {
  console.log(req.params);
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      info: req.body.info,
    },
  };
  db_connect
    .collection("boxers")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// Add New Boxer to List
recordRoutes.route("/record/add").post(function (req, response) {
  let db_connect = dbo.getDb("boxers");
  let myobj = {
    name: req.body.name,
    debut: req.body.debut,
    retire: req.body.retire,
    wins: req.body.wins,
    losses: req.body.losses,
    draws: req.body.draws,
    primaryImageName: req.body.primaryImageName,
    backgroundImageName: req.body.backgroundImageName,
    info: req.body.info,
  };
  db_connect.collection("boxers").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

module.exports = recordRoutes;
