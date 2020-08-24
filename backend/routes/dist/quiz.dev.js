"use strict";

var express = require("express");

var router = express.Router();

var checkAuth = require("../middleware");

var Quiz = require("../models/Quiz.model");

var User = require("../models/User.model");

var _require = require("../email"),
    emailInvites = _require.emailInvites;

var fileUpload = require("express-fileupload");

router.use(fileUpload());

var parseNewQuestion = function parseNewQuestion(questionObject, mediaFiles) {
  var parsedQuestion = JSON.parse(questionObject);

  if (mediaFiles) {
    if (Array.isArray(mediaFiles.file)) {
      mediaFiles.file.map(function (file) {
        parsedQuestion.media.push({
          mediaType: file.mimetype,
          data: file.data,
          name: file.name
        });
      });
    } else {
      var keys = Object.keys(mediaFiles);

      for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
        key = _keys[_i];
        parsedQuestion.media.push({
          mediaType: mediaFiles[key].mimetype,
          data: mediaFiles[key].data
        });
      }
    }
  }

  return parsedQuestion;
};

router.post("/addQuestion", function _callee(req, res) {
  var _req$body, _id, questionObject, parsedQuestion, quiz;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, _id = _req$body._id, questionObject = _req$body.questionObject;
          parsedQuestion = parseNewQuestion(questionObject, req.files);
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(Quiz.findById(_id));

        case 5:
          quiz = _context.sent;
          quiz.quizQuestions.push(parsedQuestion);
          _context.next = 9;
          return regeneratorRuntime.awrap(quiz.save());

        case 9:
          res.status(200).send({
            quiz: quiz
          });
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](2);
          res.status(400).send({
            msg: "Unable to add question to quiz"
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 12]]);
});
router.post("/deleteQuestion", checkAuth, function _callee2(req, res) {
  var _req$body2, quizId, questionId, quiz, updatedQuestions;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, quizId = _req$body2.quizId, questionId = _req$body2.questionId;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Quiz.findById(quizId));

        case 4:
          quiz = _context2.sent;
          updatedQuestions = quiz.quizQuestions.filter(function (question) {
            return question._id.toString() !== questionId;
          });
          quiz.quizQuestions = updatedQuestions;
          _context2.next = 9;
          return regeneratorRuntime.awrap(quiz.save());

        case 9:
          res.status(200).send({
            msg: "question deleted"
          });
          _context2.next = 15;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](1);
          res.status(400).send({
            msg: "quiz not found"
          });

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 12]]);
});
router.post("/createQuiz", checkAuth, function _callee3(req, res) {
  var _req$body3, quizName, quizSubject, quizAuthor, quiz, user;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body3 = req.body, quizName = _req$body3.quizName, quizSubject = _req$body3.quizSubject;
          quizAuthor = req.user.name;
          _context3.prev = 2;
          _context3.next = 5;
          return regeneratorRuntime.awrap(new Quiz({
            quizName: quizName,
            quizAuthor: quizAuthor,
            quizSubject: quizSubject,
            quizQuestions: [],
            quizTimeLimit: null,
            quizScores: [],
            quizPublished: false,
            quizPointsSystem: null,
            quizOverallPoints: null
          }).save());

        case 5:
          quiz = _context3.sent;
          _context3.next = 8;
          return regeneratorRuntime.awrap(User.findById(req.user.id));

        case 8:
          user = _context3.sent;
          user.quizzes.push(quiz._id);
          _context3.next = 12;
          return regeneratorRuntime.awrap(user.save());

        case 12:
          res.status(200).send({
            _id: quiz._id
          });
          _context3.next = 18;
          break;

        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](2);
          res.status(500).send({
            msg: "Unable to save quiz"
          });

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 15]]);
});
router.post("/deleteQuiz", checkAuth, function _callee4(req, res) {
  var _id, user, updatedQuizArray;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _id = req.body._id;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(Quiz.findByIdAndDelete(_id));

        case 4:
          _context4.next = 6;
          return regeneratorRuntime.awrap(User.findById(req.user.id));

        case 6:
          user = _context4.sent;
          updatedQuizArray = user.quizzes.filter(function (quizId) {
            return quizId !== _id;
          });
          user.quizzes = updatedQuizArray;
          _context4.next = 11;
          return regeneratorRuntime.awrap(user.save());

        case 11:
          res.status(200).send({
            msg: "Quiz deleted"
          });
          _context4.next = 17;
          break;

        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](1);
          console.log(_context4.t0);

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 14]]);
});
router.get("/fetchQuizzes", checkAuth, function _callee5(req, res) {
  var userQuizzes, user, quizzes;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          userQuizzes = [];
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(User.findById(req.user.id));

        case 4:
          user = _context5.sent;
          _context5.next = 7;
          return regeneratorRuntime.awrap(Quiz.find());

        case 7:
          quizzes = _context5.sent;
          quizzes.forEach(function (quiz) {
            if (user.quizzes.includes(quiz._id)) {
              userQuizzes.push(quiz);
            }
          });
          console.log(userQuizzes);
          res.status(200).send({
            quizzes: userQuizzes
          });
          _context5.next = 16;
          break;

        case 13:
          _context5.prev = 13;
          _context5.t0 = _context5["catch"](1);
          console.log(_context5.t0);

        case 16:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 13]]);
});
router.post("/editQuestion", function _callee6(req, res) {
  var _req$body4, _id, questionObject, parsedQuestion, quiz, updatedQuizQuestions;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _req$body4 = req.body, _id = _req$body4._id, questionObject = _req$body4.questionObject;
          parsedQuestion = parseNewQuestion(questionObject, req.files);
          _context6.prev = 2;
          _context6.next = 5;
          return regeneratorRuntime.awrap(Quiz.findById(_id));

        case 5:
          quiz = _context6.sent;
          updatedQuizQuestions = quiz.quizQuestions.map(function (question) {
            if (question._id.toString() === parsedQuestion.id) {
              question = parsedQuestion;
            }

            return question;
          });
          quiz.quizQuestions = updatedQuizQuestions;
          _context6.next = 10;
          return regeneratorRuntime.awrap(quiz.save());

        case 10:
          res.status(200).send({
            quiz: quiz
          });
          _context6.next = 16;
          break;

        case 13:
          _context6.prev = 13;
          _context6.t0 = _context6["catch"](2);
          res.status(400).send({
            msg: "Unable to add question to quiz"
          });

        case 16:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[2, 13]]);
});
router.post("/updateQuiz", function _callee7(req, res) {
  var _req$body5, _id, update;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _req$body5 = req.body, _id = _req$body5._id, update = _req$body5.update;
          _context7.prev = 1;
          _context7.next = 4;
          return regeneratorRuntime.awrap(Quiz.findOneAndUpdate({
            _id: _id
          }, {
            $set: update
          }, {
            "new": true,
            upsert: true,
            useFindAndmodify: false
          }));

        case 4:
          res.status(200).send();
          _context7.next = 12;
          break;

        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](1);
          _context7.next = 11;
          return regeneratorRuntime.awrap(Quiz.findOneAndUpdate({
            _id: _id
          }, {
            $set: update
          }, {
            "new": true,
            upsert: true,
            useFindAndmodify: false
          }));

        case 11:
          res.status(200).send();

        case 12:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[1, 7]]);
}); //to identify the quiz

router.post("/fetchQuiz", function _callee8(req, res) {
  var quizId, quiz;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          quizId = req.body.quizId;
          _context8.prev = 1;
          _context8.next = 4;
          return regeneratorRuntime.awrap(Quiz.findById(quizId));

        case 4:
          quiz = _context8.sent;
          res.status(200).send({
            quiz: quiz
          });
          _context8.next = 11;
          break;

        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](1);
          res.status(404).send({
            msg: "quiz not found"
          });

        case 11:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
router.post("/publishQuiz", checkAuth, function _callee9(req, res) {
  var quizId, quiz;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          quizId = req.body.quizId;
          _context9.prev = 1;
          _context9.next = 4;
          return regeneratorRuntime.awrap(Quiz.findOneAndUpdate({
            _id: quizId
          }, {
            $set: {
              quizPublished: true
            }
          }, {
            "new": true,
            upsert: true,
            useFindAndmodify: false
          }));

        case 4:
          quiz = _context9.sent;
          emailInvites(quiz.quizInvites, quiz.quizName, quiz.quizAuthor, quiz.quizSubject);
          _context9.next = 8;
          return regeneratorRuntime.awrap(Quiz.findOneAndUpdate({
            _id: quizId
          }, {
            $set: {
              "quizInvites.new": []
            }
          }, {
            "new": true,
            upsert: true,
            useFindAndmodify: false
          }));

        case 8:
          res.status(200).send();
          _context9.next = 14;
          break;

        case 11:
          _context9.prev = 11;
          _context9.t0 = _context9["catch"](1);
          console.log(_context9.t0);

        case 14:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[1, 11]]);
});
module.exports = router;