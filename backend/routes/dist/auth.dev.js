"use strict";

var express = require("express");

var router = express.Router();

var checkAuth = require("../middleware");

var bcrypt = require("bcryptjs");

var jwt = require("jsonwebtoken");

var _require = require("../email"),
    emailNewPassword = _require.emailNewPassword;

var Quiz = require("../models/Quiz.model");

var User = require("../models/User.model");

var validator = require("validator");

router.post("/register", function _callee(req, res) {
  var _req$body, name, email, password, password2, existingUser, salt, hash, user, token;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, password2 = _req$body.password2;
          email = email.toLowerCase();

          if (!(password.length < 8)) {
            _context.next = 5;
            break;
          }

          res.status(500).send({
            msg: "Password must have at least 8 characters"
          });
          return _context.abrupt("return");

        case 5:
          if (validator.isEmail(email)) {
            _context.next = 8;
            break;
          }

          res.status(400).send({
            msg: "Please enter a valid email address"
          });
          return _context.abrupt("return");

        case 8:
          if (!(password !== password2)) {
            _context.next = 11;
            break;
          }

          res.status(400).send({
            msg: "Passwords must match"
          });
          return _context.abrupt("return");

        case 11:
          _context.next = 13;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 13:
          existingUser = _context.sent;

          if (!existingUser) {
            _context.next = 19;
            break;
          }

          res.status(403).send({
            msg: "That email is already registered"
          });
          return _context.abrupt("return");

        case 19:
          _context.next = 21;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 21:
          salt = _context.sent;
          _context.next = 24;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 24:
          hash = _context.sent;
          _context.next = 27;
          return regeneratorRuntime.awrap(new User({
            name: name,
            email: email,
            password: hash
          }).save());

        case 27:
          user = _context.sent;
          token = jwt.sign({
            id: user._id,
            role: "teacher",
            name: user.name
          }, "secretkey");
          res.send({
            token: token,
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              role: "teacher",
              quizzes: user.quizzes,
              contacts: user.contacts,
              groups: user.groups
            }
          });

        case 30:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post("/login", function _callee2(req, res) {
  var _req$body2, email, password, user, isSame, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          email = email.toLowerCase();
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 9;
            break;
          }

          res.status(403).send({
            msg: "That email is not registered"
          });
          _context2.next = 19;
          break;

        case 9:
          _context2.prev = 9;
          _context2.next = 12;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 12:
          isSame = _context2.sent;

          if (!isSame) {
            res.status(403).send({
              msg: "Wrong password"
            });
          } else {
            token = jwt.sign({
              id: user._id,
              role: "teacher",
              name: user.name
            }, "secretkey");
            res.status(200).send({
              token: token,
              user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: "teacher"
              }
            });
          }

          _context2.next = 19;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](9);
          console.log(_context2.t0);

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[9, 16]]);
});
router.post("/studentLogin", function _callee3(req, res) {
  var studentCode, quizzes, found, lastQuestionSubmitted, quizScores, quizStartTime;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          studentCode = req.body.studentCode;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Quiz.find());

        case 4:
          quizzes = _context3.sent;
          lastQuestionSubmitted = 0;
          quizScores = 0;
          quizzes.forEach(function (quiz) {
            quiz.quizInvites.contacts.forEach(function (contact) {
              if (contact.code === studentCode) {
                found = contact.code; //this is a valid request

                var scoreFromDb = quiz.quizScores.find(function (score) {
                  return score.studentId === contact.id;
                });

                if (scoreFromDb) {
                  //student has opened the quiz before
                  if (scoreFromDb.quizCompleted) {
                    //student already completed the quiz
                    res.status(403).send({
                      msg: "This quiz has already been submitted"
                    });
                    return;
                  }

                  var d = new Date();
                  var date = new Date(scoreFromDb.quizStarted.toString());

                  if (d.getTime() - date.getTime() >= parseInt(quiz.quizTimeLimit) * 60000) {
                    res.status(403).send({
                      msg: "Time limit for this quiz is up"
                    });
                    return;
                  } else {
                    //quiz is not completed. was opened
                    lastQuestionSubmitted = scoreFromDb.results.length;
                    quizScores = scoreFromDb.overallScore;
                    quizStartTime = scoreFromDb.quizStarted;
                  }
                } else {
                  //student never opened the quiz. quizScore does for this instance does not exist
                  quiz.quizScores.push({
                    studentId: contact.id,
                    results: [],
                    overallScore: 0,
                    quizCompleted: false
                  });
                  quiz.save();
                } //sending a response


                var token = jwt.sign({
                  code: contact.code,
                  role: "student"
                }, "secretkey");
                res.status(200).send({
                  quiz: {
                    _id: quiz._id,
                    quizName: quiz.quizName,
                    quizAuthor: quiz.quizAuthor,
                    quizSubject: quiz.quizSubject,
                    quizQuestions: quiz.quizQuestions.slice(lastQuestionSubmitted, quiz.quizQuestions.length),
                    quizTotalQuestions: quiz.quizQuestions.length,
                    points: quiz.points,
                    quizTimeLimit: quiz.quizTimeLimit,
                    quizPointsSystem: quiz.quizPointsSystem,
                    quizOverallPoints: quiz.quizOverallPoints,
                    overallScore: quiz.overallScore,
                    quizStarted: quizStartTime,
                    quizLastQuestionNumber: lastQuestionSubmitted
                  },
                  //values we set based on the last quiz interaction
                  pointsScored: quizScores,
                  token: token,
                  user: {
                    code: contact.code,
                    contactId: contact.id
                  }
                });
              }
            });
          });

          if (found) {
            _context3.next = 11;
            break;
          }

          res.status(403).send({
            msg: "invalid code"
          });
          return _context3.abrupt("return");

        case 11:
          _context3.next = 16;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](1);
          console.log(_context3.t0);

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 13]]);
});
router.post("/resetPassword", function _callee4(req, res) {
  var email, user, tempPassword, salt, hash;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          email = req.body.email;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          user = _context4.sent;

          if (!user) {
            _context4.next = 20;
            break;
          }

          //need to generate random password
          tempPassword = "bananas";
          _context4.next = 9;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 9:
          salt = _context4.sent;
          _context4.next = 12;
          return regeneratorRuntime.awrap(bcrypt.hash(tempPassword, salt));

        case 12:
          hash = _context4.sent;
          user.password = hash;
          _context4.next = 16;
          return regeneratorRuntime.awrap(user.save());

        case 16:
          emailNewPassword(user.email);
          res.status(200).send({
            msg: "New password emailed"
          });
          _context4.next = 21;
          break;

        case 20:
          res.status(400).send({
            msg: "User not found"
          });

        case 21:
          _context4.next = 26;
          break;

        case 23:
          _context4.prev = 23;
          _context4.t0 = _context4["catch"](1);
          console.log(_context4.t0);

        case 26:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 23]]);
});
router.post("/changepassword", checkAuth, function _callee5(req, res) {
  var _req$body3, currentPassword, newPassword, id, user, isSame, salt, hash;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$body3 = req.body, currentPassword = _req$body3.currentPassword, newPassword = _req$body3.newPassword;
          id = req.user.id;
          _context5.prev = 2;
          _context5.next = 5;
          return regeneratorRuntime.awrap(User.findById(id));

        case 5:
          user = _context5.sent;
          _context5.next = 8;
          return regeneratorRuntime.awrap(bcrypt.compare(currentPassword, user.password));

        case 8:
          isSame = _context5.sent;

          if (isSame) {
            _context5.next = 13;
            break;
          }

          res.status(403).send({
            msg: "Passwords don't match"
          });
          _context5.next = 23;
          break;

        case 13:
          _context5.next = 15;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 15:
          salt = _context5.sent;
          _context5.next = 18;
          return regeneratorRuntime.awrap(bcrypt.hash(newPassword, salt));

        case 18:
          hash = _context5.sent;
          user.password = hash;
          _context5.next = 22;
          return regeneratorRuntime.awrap(user.save());

        case 22:
          res.status(200).send({
            msg: "Password changed"
          });

        case 23:
          _context5.next = 28;
          break;

        case 25:
          _context5.prev = 25;
          _context5.t0 = _context5["catch"](2);
          console.log(_context5.t0);

        case 28:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[2, 25]]);
});
module.exports = router;