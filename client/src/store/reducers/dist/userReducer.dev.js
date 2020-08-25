"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _userActions = require("../actions/userActions");

var _authActions = require("../actions/authActions");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initalState = {
  quizzes: [],
  contacts: [],
  groups: []
}; //changing cases to strings because of strange error

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initalState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _userActions.FETCH_QUIZZES:
      return _objectSpread({}, state, {
        quizzes: _toConsumableArray(action.payload)
      });

    case _authActions.QUIZZES_LOADED:
      return _objectSpread({}, state, {
        quizzes: action.payload
      });

    case _userActions.DELETE_QUIZ:
      return _objectSpread({}, state, {
        quizzes: state.quizzes.filter(function (quiz) {
          return quiz._id !== action.payload;
        })
      });

    case _userActions.ADD_QUIZ:
      return _objectSpread({}, state, {
        quizzes: [].concat(_toConsumableArray(state.quizzes), [action.payload])
      });

    case _userActions.ADD_CONTACT:
      return _objectSpread({}, state, {
        contacts: [].concat(_toConsumableArray(state.contacts), [action.payload])
      });

    case _userActions.ADD_GROUP:
      return _objectSpread({}, state, {
        groups: [].concat(_toConsumableArray(state.groups), [action.payload])
      });

    case _authActions.CLEAR_USER_REDUCER:
      return _objectSpread({}, state, {
        quizzes: [],
        contacts: [],
        groups: []
      });

    default:
      return state;
  }
};

exports["default"] = _default;