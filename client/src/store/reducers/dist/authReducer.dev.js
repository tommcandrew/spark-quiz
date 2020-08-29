"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _authActions = require("../actions/authActions");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  token: localStorage.getItem("token"),
  code: localStorage.getItem("code"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  role: "",
  studentToken: ""
};

function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _authActions.USER_LOADING:
      return _objectSpread({}, state, {
        isLoading: true
      });

    case _authActions.USER_LOADED:
      return _objectSpread({}, state, {
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      });

    case _authActions.LOGIN_SUCCESS:
    case _authActions.REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", "teacher");
      return _objectSpread({}, state, {}, action.payload, {
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user
      });

    case _authActions.STUDENT_LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", "student");
      return _objectSpread({}, state, {
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
        studentToken: action.payload.token
      });

    case _authActions.STUDENT_RELOAD_SUCCESS:
      return _objectSpread({}, state, {
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
        studentToken: localStorage.getItem("token")
      });

    case _authActions.CLEAR_STUDENT:
    case _authActions.AUTH_ERROR:
    case _authActions.LOGIN_FAIL:
    case _authActions.LOGOUT_SUCCESS:
    case _authActions.REGISTER_FAIL:
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("quizId");
      return _objectSpread({}, state, {
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        studentToken: ""
      });

    default:
      return state;
  }
}