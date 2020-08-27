"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteQuiz = exports.updateGroup = exports.deleteMember = exports.addGroup = exports.updateContact = exports.deleteGroup = exports.deleteContact = exports.addContact = exports.addQuiz = exports.fetchQuizzes = exports.ADD_GROUP = exports.ADD_CONTACT = exports.DELETE_QUIZ = exports.ADD_QUIZ = exports.FETCH_QUIZZES = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _authActions = require("./authActions");

var _errorActions = require("./errorActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FETCH_QUIZZES = "FETCH_QUIZZES";
exports.FETCH_QUIZZES = FETCH_QUIZZES;
var ADD_QUIZ = "ADD_QUIZ";
exports.ADD_QUIZ = ADD_QUIZ;
var DELETE_QUIZ = "DELETE_QUIZ";
exports.DELETE_QUIZ = DELETE_QUIZ;
var ADD_CONTACT = "ADD_CONTACT";
exports.ADD_CONTACT = ADD_CONTACT;
var ADD_GROUP = "ADD_GROUP";
exports.ADD_GROUP = ADD_GROUP;

var fetchQuizzes = function fetchQuizzes() {
  return function (dispatch, getState) {
    var token = getState().auth.token;
    dispatch((0, _errorActions.loading)("Fetching quizzes"));

    _axios["default"].get("http://localhost:5000/quiz/fetchQuizzes", (0, _authActions.tokenConfig)(token)).then(function (res) {
      console.log(res);
      dispatch((0, _errorActions.loaded)());
      dispatch({
        type: FETCH_QUIZZES,
        payload: res.data.quizzes
      });
    })["catch"](function (err) {
      dispatch((0, _errorActions.loaded)());

      if (!err.response) {
        dispatch((0, _errorActions.returnErrors)({
          msg: "Server is down. Please try again later"
        }, 500, "SERVER_ERROR"));
      } else {
        dispatch((0, _errorActions.returnErrors)(err.response.data, err.response.status, "FETCHING_QUIZZES_FAIL"));
      }
    });
  };
};

exports.fetchQuizzes = fetchQuizzes;

var addQuiz = function addQuiz(quizName, quizSubject, quizPublished) {
  return {
    type: ADD_QUIZ,
    payload: {
      quizName: quizName,
      quizSubject: quizSubject,
      quizPublished: quizPublished
    }
  };
};

exports.addQuiz = addQuiz;

var addContact = function addContact(contact) {
  return function (dispatch, getState) {
    dispatch((0, _errorActions.loading)("Adding Student"));
    var token = getState().auth.token;
    return _axios["default"].post("http://localhost:5000/user/addContact", {
      contact: contact
    }, (0, _authActions.tokenConfig)(token)).then(function () {
      dispatch({
        type: ADD_CONTACT,
        payload: contact
      });
      dispatch((0, _authActions.loadUser)());
      dispatch((0, _errorActions.loaded)());
    })["catch"](function (err) {
      dispatch((0, _errorActions.loaded)());

      if (!err.response) {
        dispatch((0, _errorActions.returnErrors)({
          msg: "Server is down. Please try again later"
        }, 500, "SERVER_ERROR"));
      } else {
        dispatch((0, _errorActions.returnErrors)(err.response.data, err.response.status, "CONTACT_UPLOAD_FAIL"));
      }
    });
  };
};

exports.addContact = addContact;

var deleteContact = function deleteContact(contactId) {
  return function (dispatch, getState) {
    var token = getState().auth.token;
    dispatch((0, _errorActions.loading)("Deleting contact"));
    return _axios["default"].post("http://localhost:5000/user/deleteContact", {
      contactId: contactId
    }, (0, _authActions.tokenConfig)(token)).then(function () {
      dispatch((0, _authActions.loadUser)());
      dispatch((0, _errorActions.loaded)());
    })["catch"](function (err) {
      dispatch((0, _errorActions.loaded)());

      if (!err.response) {
        dispatch((0, _errorActions.returnErrors)({
          msg: "Server is down. Please try again later"
        }, 500, "SERVER_ERROR"));
      } else {
        dispatch((0, _errorActions.returnErrors)(err.response.data, err.response.status, "DELETE_CONTACT_FAIL"));
      }
    });
  };
};

exports.deleteContact = deleteContact;

var deleteGroup = function deleteGroup(groupId) {
  return function (dispatch, getState) {
    var token = getState().auth.token;
    dispatch((0, _errorActions.loading)("Deleting group"));
    return _axios["default"].post("http://localhost:5000/user/deleteGroup", {
      groupId: groupId
    }, (0, _authActions.tokenConfig)(token)).then(function () {
      dispatch((0, _authActions.loadUser)());
      dispatch((0, _errorActions.loaded)());
    })["catch"](function (err) {
      dispatch((0, _errorActions.loaded)());

      if (!err.response) {
        dispatch((0, _errorActions.returnErrors)({
          msg: "Server is down. Please try again later"
        }, 500, "SERVER_ERROR"));
      } else {
        dispatch((0, _errorActions.returnErrors)(err.response.data, err.response.status, "DELETE_GROUP_FAIL"));
      }
    });
  };
};

exports.deleteGroup = deleteGroup;

var updateContact = function updateContact(contactId, updatedContact) {
  return function (dispatch, getState) {
    dispatch((0, _errorActions.loading)("Updating contact"));
    var token = getState().auth.token;
    return _axios["default"].post("http://localhost:5000/user/updateContact", {
      contactId: contactId,
      updatedContact: updatedContact
    }, (0, _authActions.tokenConfig)(token)).then(function () {
      dispatch((0, _authActions.loadUser)());
      dispatch((0, _errorActions.loaded)());
    })["catch"](function (err) {
      dispatch((0, _errorActions.loaded)());

      if (!err.response) {
        dispatch((0, _errorActions.returnErrors)({
          msg: "Server is down. Please try again later"
        }, 500, "SERVER_ERROR"));
      } else {
        dispatch((0, _errorActions.returnErrors)(err.response.data, err.response.status, "UDPDATE_CONTACT_FAIL"));
      }
    });
  };
};

exports.updateContact = updateContact;

var addGroup = function addGroup(group) {
  return function (dispatch, getState) {
    var token = getState().auth.token;
    return _axios["default"].post("http://localhost:5000/user/addGroup", {
      group: group
    }, (0, _authActions.tokenConfig)(token)).then(function () {
      dispatch({
        type: ADD_GROUP,
        payload: group
      });
      dispatch((0, _authActions.loadUser)());
    })["catch"](function (err) {
      console.log(err);
    });
  };
};

exports.addGroup = addGroup;

var deleteMember = function deleteMember(groupId, memberId) {
  return function (dispatch, getState) {
    var token = getState().auth.token;
    return _axios["default"].post("http://localhost:5000/user/deleteMember", {
      groupId: groupId,
      memberId: memberId
    }, (0, _authActions.tokenConfig)(token)).then(function () {
      dispatch((0, _authActions.loadUser)());
    })["catch"](function (err) {
      console.log(err);
    });
  };
};

exports.deleteMember = deleteMember;

var updateGroup = function updateGroup(groupId, groupName, members) {
  return function (dispatch, getState) {
    dispatch((0, _errorActions.loading)("Updating group"));
    var token = getState().auth.token;
    return _axios["default"].post("http://localhost:5000/user/updateGroup", {
      groupId: groupId,
      groupName: groupName,
      members: members
    }, (0, _authActions.tokenConfig)(token)).then(function () {
      dispatch((0, _authActions.loadUser)());
      dispatch((0, _errorActions.loaded)());
    })["catch"](function (err) {
      dispatch((0, _errorActions.loaded)());

      if (!err.response) {
        dispatch((0, _errorActions.returnErrors)({
          msg: "Server is down. Please try again later"
        }, 500, "SERVER_ERROR"));
      } else {
        dispatch((0, _errorActions.returnErrors)(err.response.data, err.response.status, "UPDATE_GROUP_FAIL"));
      }
    });
  };
};

exports.updateGroup = updateGroup;

var deleteQuiz = function deleteQuiz(id) {
  return function (dispatch, getState) {
    dispatch((0, _errorActions.loading)("Deleting quiz"));
    var token = getState().auth.token;
    return _axios["default"].post("http://localhost:5000/quiz/deleteQuiz", {
      _id: id
    }, (0, _authActions.tokenConfig)(token)).then(function () {
      dispatch({
        type: DELETE_QUIZ,
        payload: id
      });
      dispatch((0, _errorActions.loaded)());
    })["catch"](function (err) {
      dispatch((0, _errorActions.loaded)());

      if (!err.response) {
        dispatch((0, _errorActions.returnErrors)({
          msg: "Server is down. Please try again later"
        }, 500, "SERVER_ERROR"));
      } else {
        dispatch((0, _errorActions.returnErrors)(err.response.data, err.response.status, "DELETE_FAILED"));
      }
    });
  };
};

exports.deleteQuiz = deleteQuiz;