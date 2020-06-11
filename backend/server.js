const express = require("express");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv").config();
const cors = require("cors");
const PORT = 5000;
const MONGO_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0-hjn2u.gcp.mongodb.net/quiz-master?retryWrites=true&w=majority`;
const app = express();
const User = require("./models/User.model");
const Quiz = require("./models/Quiz.model");

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

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  if (password.length < 8) {
    res.status(500).send({ msg: "Password must have at least 8 characters" });
    return;
  }
  if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$/.test(email) === false) {
    res.status(400).send({ msg: "Please enter a valid email address" });
    return;
  }
  if (password !== password2) {
    res.status(400).send({ msg: "Passwords must match" });
    return;
  }
  User.findOne({ email }).then((user) => {
    if (user) {
      res.status(403).send({ msg: "That email is already registered" });
      return;
    }
  });
  const user = new User({ name, email, password });
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      user.save().then((user) => {
        jwt.sign({ user }, "secretkey", (err, token) => {
          res.send({ token });
        });
      });
    });
  });
});
