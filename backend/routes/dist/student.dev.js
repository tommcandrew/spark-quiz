"use strict";

var express = require("express");

var router = express.Router();

var jwt = require("jsonwebtoken");

var checkAuth = require("../middleware");

var Quiz = require("../models/Quiz.model");

var _require = require("../models/Quiz.model"),
    update = _require.update;

router.get("/quizReload", checkAuth, function _callee(req, res) {
  var studentCode, quizzes, found, lastQuestionSubmitted, quizScores, quizStartTime;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          studentCode = req.user.code;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(Quiz.find());

        case 4:
          quizzes = _context.sent;
          lastQuestionSubmitted = 0;
          quizScores = 0;
          quizzes.forEach(function (quiz) {
            quiz.quizInvites.contacts.forEach(function (contact) {
              if (contact.code === studentCode) {
                //quiz exists
                var scoreFromDb = quiz.quizScores.find(function (score) {
                  return score.studentId === contact.id;
                });

                if (scoreFromDb) {
                  //quiz was in progress
                  if (scoreFromDb.quizCompleted) {
                    res.status(403).send({
                      msg: "invalid code"
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
                    //quiz is not completed
                    lastQuestionSubmitted = scoreFromDb.results.length;
                    quizScores = scoreFromDb.overallScore;
                    quizStartTime = scoreFromDb.quizStarted;
                  }
                } else {
                  quiz.quizScores.push({
                    studentId: contact.id,
                    results: [],
                    overallScore: 0,
                    quizCompleted: false
                  });
                  quiz.save();
                }

                found = contact.code;
                res.status(200).send({
                  quiz: {
                    _id: quiz._id,
                    quizName: quiz.quizName,
                    quizAuthor: quiz.quizAuthor,
                    quizSubject: quiz.quizSubject,
                    quizQuestions: quiz.quizQuestions.slice(lastQuestionSubmitted, quiz.quizQuestions.length),
                    quizTotalQuestions: quiz.quizQuestions.length,
                    quizLastQuestionNumber: lastQuestionSubmitted,
                    points: quiz.points,
                    quizTimeLimit: quiz.quizTimeLimit,
                    quizPointsSystem: quiz.quizPointsSystem,
                    quizOverallPoints: quiz.quizOverallPoints,
                    overallScore: quiz.overallScore,
                    quizStarted: quizStartTime
                  },
                  quizQuestionNumber: lastQuestionSubmitted,
                  pointsScored: quizScores,
                  user: {
                    code: contact.code,
                    contactId: contact.id
                  }
                });
              }
            });
          });

          if (found) {
            _context.next = 11;
            break;
          }

          res.status(403).send({
            msg: "invalid code"
          });
          return _context.abrupt("return");

        case 11:
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 13]]);
});
router.post("/saveAnswer", checkAuth, function _callee2(req, res) {
  var _req$body, quizId, studentId, questionNumber, answer, quiz, student;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, quizId = _req$body.quizId, studentId = _req$body.studentId, questionNumber = _req$body.questionNumber, answer = _req$body.answer;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Quiz.findById(quizId));

        case 4:
          quiz = _context2.sent;
          student = quiz.quizScores.find(function (std) {
            return std.studentId === studentId;
          });
          student.results.push({
            question: questionNumber,
            correct: answer
          });
          _context2.next = 9;
          return regeneratorRuntime.awrap(quiz.save().then(function (r) {
            res.status(200).send({
              msg: "data saved to db"
            });
            return;
          })["catch"](function (e) {
            res.status(400).send({
              msg: "unable to add answers"
            });
            return;
          }));

        case 9:
          _context2.next = 14;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](1);
          res.status(400).send({
            msg: "unable to add answers"
          });

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 11]]);
});
router.post("/saveScore", checkAuth, function _callee3(req, res) {
  var _req$body2, quizId, studentId, newScore, quiz, updatedRecord;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body2 = req.body, quizId = _req$body2.quizId, studentId = _req$body2.studentId, newScore = _req$body2.newScore;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Quiz.findById(quizId));

        case 4:
          quiz = _context3.sent;
          updatedRecord = quiz.quizScores.find(function (score) {
            return score.studentId === studentId;
          });
          updatedRecord.overallScore = newScore;
          _context3.next = 9;
          return regeneratorRuntime.awrap(Quiz.findOneAndUpdate({
            _id: quizId,
            "quizScores.studentId": studentId
          }, {
            $set: {
              quizScores: updatedRecord
            }
          }, {
            upsert: true
          }));

        case 9:
          res.status(200).send({
            msg: "updated the Score"
          });
          _context3.next = 15;
          break;

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](1);
          res.status(400).send({
            err: _context3.t0
          });

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 12]]);
});
router.post("/finishQuiz", function _callee4(req, res) {
  var _req$body3, quizId, studentId, quiz, scoreObjects;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body3 = req.body, quizId = _req$body3.quizId, studentId = _req$body3.studentId;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(Quiz.findById(quizId));

        case 4:
          quiz = _context4.sent;
          scoreObjects = quiz.quizScores;
          scoreObjects.map(function (score) {
            if (score.studentId === studentId) {
              score.quizCompleted = true;
            }
          });
          _context4.next = 9;
          return regeneratorRuntime.awrap(quiz.save().then(function () {
            return res.status(200).send({
              msg: "quiz submitted"
            });
          })["catch"](function (err) {
            return res.status(400).send({
              msg: err
            });
          }));

        case 9:
          _context4.next = 15;
          break;

        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](1);
          console.log(_context4.t0);
          res.status(400).send({
            msg: _context4.t0
          });

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 11]]);
});
router.get("/quizDemo", function _callee5(req, res) {
  var quiz;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Quiz.findById("5f48b285a0813300047f4788"));

        case 3:
          quiz = _context5.sent;
          res.status(200).send({
            quiz: quiz
          });
          _context5.next = 11;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          res.status(400).send({
            msg: _context5.t0
          });

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
module.exports = router;