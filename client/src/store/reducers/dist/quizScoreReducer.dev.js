"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _quizScoreActions = require("../actions/quizScoreActions");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initalState = {
  studentId: "",
  questionNumber: 0,
  overallScore: null
};

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initalState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _quizScoreActions.SET_STUDENT:
      return _objectSpread({}, state, {
        studentId: action.payload.id,
        questionNumber: action.payload.questionNumber,
        overallScore: action.payload.pointsScored
      });

    case _quizScoreActions.SET_NEW_QUESTION_NUMBER:
      console.log(action.questionNumber);
      return _objectSpread({}, state, {
        questionNumber: parseInt(action.questionNumber)
      });

    case _quizScoreActions.SET_OVERALL_SCORE:
      console.log(action.score);
      return _objectSpread({}, state, {
        overallScore: parseInt(action.score)
      });

    case _quizScoreActions.CLEAR_SCORE:
      return _objectSpread({}, state, {
        overallScore: null
      });

    case _quizScoreActions.FINISH_QUIZ:
      return _objectSpread({}, state, {
        studentId: "",
        questionNumber: 0
      });

    default:
      return state;
  }
};

exports["default"] = _default;