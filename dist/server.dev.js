"use strict";

//dependencies
var express = require("express");

var mongoose = require("mongoose");

var cors = require("cors");

var dotenv = require("dotenv").config();

var app = express(); //environment variables

var MONGO_URI = process.env.MONGO_URI; //middleware

app.use(cors());
app.use(express.json()); //connect to DB

mongoose.connect(MONGO_URI, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log("Connected to db");
})["catch"](function (err) {
  return console.log("There was a problem connecting to the db");
}); //use routes

app.use("/user", require("./routes/user"));
app.use("/quiz", require("./routes/quiz"));
app.use("/auth", require("./routes/auth"));
app.use("/student", require("./routes/student")); //set up server

var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  return console.log("listening on port " + PORT);
});