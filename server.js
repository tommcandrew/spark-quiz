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
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "thomasdarragh88@gmail.com",
    pass: "Trafalgar_1805",
  },
});

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

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user) {
      res.status(403).send({ msg: "That email is not registered" });
    } else {
      bcrypt.compare(password, user.password, (err, isSame) => {
        if (err) {
          res.status(403).send({ msg: "Problem comparing the passwords" });
        } else {
          if (!isSame) {
            res.status(403).send({ msg: "Wrong password" });
          } else {
            jwt.sign({ user }, "secretkey", (err, token) => {
              res.status(200).send({
                token: token,
                userName: user.name,
              });
            });
          }
        }
      });
    }
  });
});

app.post("/publish", (req, res) => {
  const { name, subject, questions, timeLimit, scores, invites } = req.body;
  new Quiz({ name, subject, questions, timeLimit, scores })
    .save()
    .then(() => {
      console.log("quiz saved");
      //get name from jwt
      emailInvites(invites, name, "Mr. Jones", subject);
      res.status(200).send({ msg: "Quiz saved" });
    })
    .catch((err) => {
      console.log("Unable to save quiz");
      console.log(err);
      res.status(500).send({ msg: "Unable to save quiz" });
    });
});

app.post("/deleteQuiz", (req, res) => {
  const { id } = req.body;
  Quiz.findByIdAndDelete(id)
    .then(() => {
      console.log("Quiz deleted");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/fetchQuizzes", (req, res) => {
  //get email from jwt
  let userQuizzes = [];
  User.findOne({ email: "tommcandrew@hotmail.com" })
    .then((user) => {
      Quiz.find().then((quizzes) => {
        quizzes.forEach((quiz) => {
          if (user.quizzes.includes(quiz.id)) {
            userQuizzes.push(quiz);
          }
        });
        res.status(200).send({ quizzes: userQuizzes });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

const emailInvites = (invites, quizName, quizAuthor, quizSubject) => {
  let emailList = [];
  //get email from jwt
  User.findOne({ email: "tommcandrew@hotmail.com" })
    .then((user) => {
      user.contacts.forEach((contact) => {
        if (invites.includes(contact.id)) {
          emailList.push(contact.email);
        }
      });
      const mailOptions = {
        from: "Quiz Master",
        to: emailList,
        subject: "Quiz Master Invitation",
        html: `<h1>You've been invited to take a quiz!</h1><br><p><strong>Name: ${quizName}</strong></p><br><p><strong>Subject: ${quizSubject}</strong></p><br><p><strong>Author: ${quizAuthor}</strong></p><br><a href="#">Go to Quiz Master</a>`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email(s) sent");
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ msg: "Unable to find user" });
    });
};
