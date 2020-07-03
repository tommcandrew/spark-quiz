const express = require("express");
const router = express.Router();
const checkAuth = require("./middleware");
const User = require("./models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("./nodemailer");
const Quiz = require("./models/Quiz.model");

router.post("/register", (req, res) => {
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
    } else {
      const user = new User({ name, email, password });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          user.password = hash;
          user.save().then((user) => {
            jwt.sign(
              { id: user._id, role: "teacher", name: user.name },
              "secretkey",
              (err, token) => {
                res.send({
                  token,
                  user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: "teacher",
                    quizzes: [],
                    contacts: [],
                    groups: [],
                  },
                });
              }
            );
          });
        });
      });
    }
  });
});
router.post("/login", (req, res) => {
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
            jwt.sign(
              { id: user._id, role: "teacher", name: user.name },
              "secretkey",
              (err, token) => {
                res.status(200).send({
                  token,
                  user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: "teacher",
                  },
                });
              }
            );
          }
        }
      });
    }
  });
});

router.post("/studentLogin", (req, res) => {
  const { studentCode } = req.body;
  Quiz.find()
    .then((quizzes) => {
      let found = "";
      quizzes.forEach((quiz) => {
        quiz.quizInvites.contacts.forEach((contact) => {
          if (contact.code === studentCode) {
            found = contact.code;
            jwt.sign(
              { code: contact.code, role: "student" },
              "secretkey",
              (err, token) => {
                res.status(200).send({
                  quiz: quiz, //here we do not need to send the entire quiz
                  token,
                  user: {
                    code: contact.code,
                    contactId: contact.id,
                    role: "student",
                  },
                });
              }
            );
            return;
          }
          if (found !== "") return;
        });
      });
      if (found === "") {
        console.log("quiz not found");
        res.status(403).send({ msg: "invalid code" });
        return;
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ msg: err });
    });
});

router.post("/resetPassword", (req, res) => {
  const { email } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        //will need to generate a random code
        const tempPassword = "bananas";
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(tempPassword, salt, (err, hash) => {
            user.password = hash;
            user.save().then((user) => {
              emailNewPassword(user.email, tempPassword);
              res.status(200).send({ msg: "New password emailed" });
            });
          });
        });
      }
    })
    .catch((err) => {
      res.status(400).send({ msg: "User not found" });
    });
});

const emailNewPassword = (email, tempPassword) => {
  const mailOptions = {
    from: "Quiz Master",
    //email goes here
    to: "thomasdarragh88@gmail.com",
    subject: "Password reset",
    text:
      "Your password has been reset. You're new temporary password is " +
      tempPassword +
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

router.post("/changepassword", checkAuth, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const id = req.user.id;
  User.findById(id)
    .then((user) => {
      bcrypt.compare(currentPassword, user.password, (err, isSame) => {
        if (err) {
          res.status(403).send({ msg: "Problem comparing the passwords" });
        } else {
          if (!isSame) {
            res.status(403).send({ msg: "Passwords don't match" });
          } else {
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newPassword, salt, (err, hash) => {
                user.password = hash;
                user.save().then(() => {
                  res.status(200).send({ msg: "Password changed" });
                });
              });
            });
          }
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
