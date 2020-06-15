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
const Str = require("@supercharge/strings");
const auth = require("./middleware");
const {
  default: QuizOptions,
} = require("../client/src/components/UI/QuizOptions");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "thomasdarragh88@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
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
app.use(fileUpload());

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
        jwt.sign({ id: user._id }, "secretkey", (err, token) => {
          res.send({
            token,
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
            },
          });
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
            jwt.sign({ id: user._id }, "secretkey", (err, token) => {
              res.status(200).send({
                token,
                user: {
                  id: user._id,
                  name: user.name,
                  email: user.email,
                },
              });
            });
          }
        }
      });
    }
  });
});

app.post("/studentLogin", (req, res) => {
  const { id } = req.body;
  Quiz.find().then((quizzes) => {
    const matchingQuizArray = [];
    quizzes.forEach((quiz) => {
      if (quiz.quizInvites.includes(id)) {
        matchingQuizArray.push(quiz);
      }
    });
    if (matchingQuizArray.length > 0) {
      const matchingQuiz = matchingQuizArray[0];
      res.status(200).send();
      //send jwt token?
    }
  });
});

app.post("/addQuestion", (req, res) => {
  console.log(req.body);
  const { _id, questionObject } = req.body;
  //parse question as it was stringified in order to send
  const questionParsed = JSON.parse(questionObject);
  //since FormData separated the media from the rest of the question, loop over media and insert back into question object
  const mediaFiles = req.files;
  if (mediaFiles) {
    const keys = Object.keys(mediaFiles);
    for (key of keys) {
      //probably a good idea to check that the media prop exists and add if not
      questionParsed.media.push({
        mediaType: mediaFiles[key].mimetype,
        data: mediaFiles[key].data,
      });
    }
  }

  //then find quiz that was previously saved and push the new question onto the questions array
  Quiz.findById(_id)
    .then((quiz) => {
      quiz.quizQuestions.push(questionParsed);
      quiz
        .save()
        .then((quiz) => {
          res.status(200).send({ quiz });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send({ msg: "Unable to add question to quiz" });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/createQuiz", auth, (req, res) => {
  // const { name, subject, invites, questions, timeLimit, scores } = req.body;
  const { quizName, quizSubject } = req.body;
  new Quiz({
    quizName: quizName,
    quizSubject: quizSubject,
    quizQuestions: [],
    quizTimeLimit: null,
    quizScores: [],
    quizPublished: false,
  })
    .save()
    .then((quiz) => {
      //add the quiz id to the User's quizzes array here (get email from jwt)
      User.findOne({ email: "nildeniz@gmail.com" }).then((user) => {
        user.quizzes.push(quiz._id);
        user.save().then(() => {
          console.log("quiz added to user's quizzes array");
          res.status(200).send({ _id: quiz._id });
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ msg: "Unable to save quiz" });
    });
});

app.post("/deleteQuiz", (req, res) => {
  console.log("received delete request");
  const { _id } = req.body;
  Quiz.findByIdAndDelete(_id)
    .then(() => {
      console.log("Quiz deleted");
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/fetchQuizzes", auth, (req, res) => {
  let userQuizzes = [];
  //get email from jwt
  User.findOne({ email: "nildeniz@gmail.com" })
    .then((user) => {
      Quiz.find().then((quizzes) => {
        quizzes.forEach((quiz) => {
          if (user.quizzes.includes(quiz._id)) {
            userQuizzes.push(quiz);
          }
        });
        console.log("sending back quizzes");
        res.status(200).send({ quizzes: userQuizzes });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/updateQuiz", (req, res) => {
  //update can be an object (as this is the format it need to be in for mongoose anyway) e.g. {name: "The Renaissance and its Importance", timeLimit: "40" }
  const { _id, update } = req.body;
  Quiz.update({ _id: _id }, { $set: update })
    .then(() => {
      console.log("Quiz updated successfully");
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/submit", (req, res) => {
  const { studentId, _id, submittedAnswers } = req.body;
  Quiz.findById(_id)
    .then((quiz) => {
      let results = [];
      quiz.questions.forEach((question, index) => {
        if (question.questionType === "trueFalse") {
          if (question.answers.trueFalseAnswer === submittedAnswers[index]) {
            results.push({ question: index, correct: true });
          } else {
            results.push({ question: index, correct: false });
          }
        } else if (question.questionType === "multipleChoice") {
          if (
            question.answers.multipleChoiceAnswer === submittedAnswers[index]
          ) {
            results.push({ question: index, correct: true });
          } else {
            results.push({ question: index, correct: false });
          }
        }
      });
      const scoreObject = {
        studentId,
        results,
      };
      quiz.quizScores.push(scoreObject);
      res.status(200).send({ msg: "Quiz submitted", results });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/forgotPassword", (req, res) => {
  //email will probably come from jwt
  const { email } = req.body;
  User.findOne({ email }).then((user) => {
    if (user) {
      const randomString = Str.random();
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(randomString, salt, (err, hash) => {
          user.password = hash;
          user.save().then((user) => {
            console.log("password reset");
            emailNewPassword(email, randomString);
            res.status(200).send({ msg: "New password emailed" });
          });
        });
      });
      s;
    }
  });
});

//to identify the user session
app.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

const emailInvites = (quizInvites, quizName, quizAuthor, quizSubject) => {
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

const emailNewPassword = (email, newPassword) => {
  const mailOptions = {
    from: "Quiz Master",
    to: email,
    subject: "Password reset",
    text:
      "Your password has been reset. You're new temporary password is " +
      newPassword +
      ".",
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email(s) sent");
    }
  });
};
