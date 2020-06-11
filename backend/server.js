const express = require("express");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv").config();
const PORT = 5000;
const MONGO_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0-hjn2u.gcp.mongodb.net/quiz-master?retryWrites=true&w=majority`;
const app = express();
app.listen(PORT, () => console.log("listening on port " + PORT));

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("There was a problem connecting to the db");
});

db.once("open", () => {
  console.log("Connected to db");
});
