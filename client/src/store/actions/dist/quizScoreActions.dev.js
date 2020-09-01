"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setOverallScore = exports.setQuestionAnswer = exports.finishQuiz = exports.clearScore = exports.setDemoQuiz = exports.setStudent = exports.resetStudent = exports.CLEAR_SCORE = exports.RESET_STUDENT = exports.SET_OVERALL_SCORE = exports.FINISH_QUIZ = exports.SET_OVERALLSCORE = exports.SET_NEW_QUESTION_NUMBER = exports.SET_STUDENT = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _authActions = require("./authActions");

var _errorActions = require("./errorActions");

var _quizActions = require("./quizActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SET_STUDENT = "SET_STUDENT";
exports.SET_STUDENT = SET_STUDENT;
var SET_NEW_QUESTION_NUMBER = "SET_NEW_QUESTION_NUMBER";
exports.SET_NEW_QUESTION_NUMBER = SET_NEW_QUESTION_NUMBER;
var SET_OVERALLSCORE = "SET_OVERALLSCORE";
exports.SET_OVERALLSCORE = SET_OVERALLSCORE;
var FINISH_QUIZ = "FINISH_QUIZ";
exports.FINISH_QUIZ = FINISH_QUIZ;
var SET_OVERALL_SCORE = "SET_OVERALL_SCORE";
exports.SET_OVERALL_SCORE = SET_OVERALL_SCORE;
var RESET_STUDENT = "RESET_STUDENT";
exports.RESET_STUDENT = RESET_STUDENT;
var CLEAR_SCORE = "CLEAR_SCORE";
exports.CLEAR_SCORE = CLEAR_SCORE;

var resetStudent = function resetStudent(_ref) {
  var quiz = _ref.quiz,
      user = _ref.user,
      questionNumber = _ref.questionNumber,
      pointsScored = _ref.pointsScored;
  return function _callee(dispatch) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(dispatch({
              type: _authActions.STUDENT_RELOAD_SUCCESS,
              payload: {
                user: user
              }
            }));

          case 2:
            _context.next = 4;
            return regeneratorRuntime.awrap(dispatch({
              type: _quizActions.RESET_CURRENT_QUIZ,
              payload: quiz
            }));

          case 4:
            _context.next = 6;
            return regeneratorRuntime.awrap(dispatch({
              type: SET_STUDENT,
              payload: {
                id: user.contactId,
                questionNumber: parseInt(questionNumber),
                pointsScored: pointsScored
              }
            }));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    });
  };
};

exports.resetStudent = resetStudent;

var setStudent = function setStudent(_ref2) {
  var quiz = _ref2.quiz,
      token = _ref2.token,
      user = _ref2.user,
      questionNumber = _ref2.questionNumber,
      pointsScored = _ref2.pointsScored;
  return function _callee2(dispatch) {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(dispatch({
              type: _authActions.STUDENT_LOGIN_SUCCESS,
              payload: {
                token: token,
                user: user
              }
            }));

          case 2:
            _context2.next = 4;
            return regeneratorRuntime.awrap(dispatch({
              type: _quizActions.SET_CURRENT_QUIZ,
              payload: quiz
            }));

          case 4:
            _context2.next = 6;
            return regeneratorRuntime.awrap(dispatch({
              type: SET_STUDENT,
              payload: {
                id: user.contactId,
                questionNumber: parseInt(questionNumber),
                pointsScored: pointsScored
              }
            }));

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
};

exports.setStudent = setStudent;

var setDemoQuiz = function setDemoQuiz(_ref3) {
  var quiz = _ref3.quiz;
  return function _callee3(dispatch) {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(dispatch({
              type: _authActions.STUDENT_LOGIN_SUCCESS,
              payload: {
                token: "demo_token",
                user: "demo_user"
              }
            }));

          case 2:
            _context3.next = 4;
            return regeneratorRuntime.awrap(dispatch({
              type: _quizActions.SET_CURRENT_QUIZ,
              payload: quiz
            }));

          case 4:
            _context3.next = 6;
            return regeneratorRuntime.awrap(dispatch({
              type: SET_STUDENT,
              payload: {
                id: "demo_id",
                questionNumber: 0,
                pointsScored: 0
              }
            }));

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    });
  };
};

exports.setDemoQuiz = setDemoQuiz;

var clearScore = function clearScore() {
  return function (dispatch) {
    dispatch({
      type: CLEAR_SCORE
    });
  };
};

exports.clearScore = clearScore;

var finishQuiz = function finishQuiz() {
  return function (dispatch, getState) {
    var token = getState().auth.studentToken;
    var studentId = getState().auth.user.contactId;

    var quizId = getState().quiz._id;

    return _axios["default"].post("https://sparkquiz-backend.herokuapp.com/student/finishQuiz", {
      quizId: quizId,
      studentId: studentId
    }, (0, _authActions.tokenConfig)(token)).then(function (res) {
      return;
    })["catch"](function (err) {
      console.log(err);
    });
  };
};

exports.finishQuiz = finishQuiz;

var setQuestionAnswer = function setQuestionAnswer(answer) {
  return function (dispatch, getState) {
    var token = getState().auth.studentToken;
    var studentId = getState().auth.user.contactId;

    var quizId = getState().quiz._id;

    var questionNumber = parseInt(getState().score.questionNumber + 1);
    var isDemo = localStorage.getItem("token") === "demo_token";

    if (!isDemo) {
      return _axios["default"].post("https://sparkquiz-backend.herokuapp.com/student/saveAnswer", {
        quizId: quizId,
        studentId: studentId,
        questionNumber: questionNumber,
        answer: answer
      }, (0, _authActions.tokenConfig)(token)).then(function (res) {
        dispatch({
          type: SET_NEW_QUESTION_NUMBER,
          questionNumber: questionNumber
        });
      })["catch"](function (err) {
        console.log(err);
      });
      return;
    } else {
      dispatch({
        type: SET_NEW_QUESTION_NUMBER,
        questionNumber: questionNumber
      });
      return;
    }
  };
};

exports.setQuestionAnswer = setQuestionAnswer;

var setOverallScore = function setOverallScore(score) {
  return function (dispatch, getState) {
    var token = getState().auth.studentToken;
    var studentId = getState().auth.user.contactId;

    var quizId = getState().quiz._id;

    var newScore = parseInt(getState().score.overallScore) + parseInt(score);
    var isDemo = localStorage.getItem("token") === "demo_token";

    if (!isDemo) {
      return _axios["default"].post("https://sparkquiz-backend.herokuapp.com/student/saveScore", {
        quizId: quizId,
        studentId: studentId,
        newScore: newScore
      }, (0, _authActions.tokenConfig)(token)).then(function (res) {
        dispatch({
          type: SET_OVERALL_SCORE,
          score: newScore
        });
      })["catch"](function (err) {
        console.log(err);
      });
      return;
    } else {
      dispatch({
        type: SET_OVERALL_SCORE,
        score: newScore
      });
      return;
    }
  };
};

exports.setOverallScore = setOverallScore;