"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.publishQuiz = exports.updateQuiz = exports.deleteQuestion = exports.editQuestion = exports.addNewQuestion = exports.clearCurrentQuiz = exports.setCurrentQuiz = exports.loadQuiz = exports.createQuiz = exports.RESET_CURRENT_QUIZ = exports.PUBLISH_QUIZ = exports.FETCH_QUIZ = exports.UPDATE_QUIZ = exports.ADD_TIME_LIMIT = exports.CLEAR_CURRENT_QUIZ = exports.SET_CURRENT_QUIZ = exports.ADD_QUIZ = exports.FETCH_QUIZZES = exports.CREATE_QUIZ = exports.DELETE_QUESTION = exports.EDIT_QUESTION = exports.ADD_NEW_QUESTION = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _authActions = require("./authActions");

var _errorActions = require("./errorActions");

var _userActions = require("./userActions");

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var ADD_NEW_QUESTION = "ADD_NEW_QUESTION";
exports.ADD_NEW_QUESTION = ADD_NEW_QUESTION;
var EDIT_QUESTION = "EDIT_QUESTION";
exports.EDIT_QUESTION = EDIT_QUESTION;
var DELETE_QUESTION = "DELETE_QUESTION";
exports.DELETE_QUESTION = DELETE_QUESTION;
var CREATE_QUIZ = "CREATE_QUIZ";
exports.CREATE_QUIZ = CREATE_QUIZ;
var FETCH_QUIZZES = "FETCH_QUIZZES";
exports.FETCH_QUIZZES = FETCH_QUIZZES;
var ADD_QUIZ = "ADD_QUIZ";
exports.ADD_QUIZ = ADD_QUIZ;
var SET_CURRENT_QUIZ = "SET_CURRENT_QUIZ";
exports.SET_CURRENT_QUIZ = SET_CURRENT_QUIZ;
var CLEAR_CURRENT_QUIZ = "CLEAR_CURRENT_QUIZ";
exports.CLEAR_CURRENT_QUIZ = CLEAR_CURRENT_QUIZ;
var ADD_TIME_LIMIT = "ADD_TIME_LIMIT";
exports.ADD_TIME_LIMIT = ADD_TIME_LIMIT;
var UPDATE_QUIZ = "UPDATE_QUIZ";
exports.UPDATE_QUIZ = UPDATE_QUIZ;
var FETCH_QUIZ = "FETCH_QUIZ";
exports.FETCH_QUIZ = FETCH_QUIZ;
var PUBLISH_QUIZ = "PUBLISH_QUIZ";
exports.PUBLISH_QUIZ = PUBLISH_QUIZ;
var RESET_CURRENT_QUIZ = "RESET_CURRENT_QUIZ";
exports.RESET_CURRENT_QUIZ = RESET_CURRENT_QUIZ;

var createQuiz = function createQuiz(quizName, quizSubject) {
	return function _callee(dispatch, getState) {
		var token;
		return regeneratorRuntime.async(function _callee$(_context) {
			while (1) {
				switch ((_context.prev = _context.next)) {
					case 0:
						token = getState().auth.token;
						dispatch((0, _errorActions.loading)("Creating new quiz"));
						return _context.abrupt(
							"return",
							_axios["default"]
								.post(
									"https://sparkquiz-backend.herokuapp.com/quiz/createQuiz",
									{
										quizName: quizName,
										quizSubject: quizSubject
									},
									(0, _authActions.tokenConfig)(token)
								)
								.then(function(res) {
									dispatch({
										type: CREATE_QUIZ,
										payload: {
											quizName: quizName,
											quizSubject: quizSubject,
											_id: res.data._id
										}
									});
									dispatch((0, _userActions.addQuiz)(res.data._id, quizName, quizSubject, false));
									dispatch({
										type: SET_CURRENT_QUIZ,
										payload: res.data
									});
									dispatch((0, _errorActions.loaded)());
								})["catch"](function(err) {
									dispatch((0, _errorActions.loaded)());

									if (!err.response) {
										dispatch(
											(0, _errorActions.returnErrors)(
												{
													msg: "Server is down. Please try again later"
												},
												500,
												"SERVER_ERROR"
											)
										);
									} else {
										dispatch(
											(0, _errorActions.returnErrors)(
												err.response.data,
												err.response.status,
												"CREATE_QUIZ_FAIL"
											)
										);
									}
								})
						);

					case 3:
					case "end":
						return _context.stop();
				}
			}
		});
	};
};

exports.createQuiz = createQuiz;

var loadQuiz = function loadQuiz() {
	return function _callee2(dispatch, getState) {
		var quizId, token;
		return regeneratorRuntime.async(function _callee2$(_context2) {
			while (1) {
				switch ((_context2.prev = _context2.next)) {
					case 0:
						quizId = localStorage.getItem("quizId");

						if (!quizId) {
							_context2.next = 8;
							break;
						}

						token = getState().auth.token;

						if (!quizId) {
							_context2.next = 7;
							break;
						}

						return _context2.abrupt(
							"return",
							_axios["default"]
								.post(
									"https://sparkquiz-backend.herokuapp.com/quiz/fetchQuiz",
									{
										quizId: quizId
									},
									(0, _authActions.tokenConfig)(token)
								)
								.then(function(res) {
									dispatch({
										type: CREATE_QUIZ,
										payload: res.data.quiz
									});
									dispatch({
										type: SET_CURRENT_QUIZ,
										payload: res.data.quiz
									});
								})["catch"](function(err) {
									console.log(err);
								})
						);

					case 7:
						console.log("no quiz id in local storage");

					case 8:
					case "end":
						return _context2.stop();
				}
			}
		});
	};
};

exports.loadQuiz = loadQuiz;

var setCurrentQuiz = function setCurrentQuiz(quiz) {
	return function _callee3(dispatch) {
		return regeneratorRuntime.async(function _callee3$(_context3) {
			while (1) {
				switch ((_context3.prev = _context3.next)) {
					case 0:
						dispatch((0, _errorActions.loading)("Loading the quiz"));
						dispatch({
							type: SET_CURRENT_QUIZ,
							payload: quiz
						});
						dispatch((0, _errorActions.loaded)());

					case 3:
					case "end":
						return _context3.stop();
				}
			}
		});
	};
};

exports.setCurrentQuiz = setCurrentQuiz;

var clearCurrentQuiz = function clearCurrentQuiz() {
	return function _callee4(dispatch) {
		return regeneratorRuntime.async(function _callee4$(_context4) {
			while (1) {
				switch ((_context4.prev = _context4.next)) {
					case 0:
						dispatch((0, _errorActions.loading)("Clearing the quiz"));
						_context4.next = 3;
						return regeneratorRuntime.awrap(
							dispatch({
								type: CLEAR_CURRENT_QUIZ
							})
						);

					case 3:
						dispatch((0, _errorActions.loaded)());

					case 4:
					case "end":
						return _context4.stop();
				}
			}
		});
	};
};

exports.clearCurrentQuiz = clearCurrentQuiz;

var addNewQuestion = function addNewQuestion(formData) {
	return function(dispatch) {
		dispatch((0, _errorActions.loading)("Adding question"));

		_axios["default"]
			.post("https://sparkquiz-backend.herokuapp.com/quiz/addQuestion", formData)
			.then(function(res) {
				dispatch({
					type: ADD_NEW_QUESTION,
					payload: res.data.quiz
				});
				dispatch((0, _errorActions.loaded)());
			})["catch"](function(err) {
				dispatch((0, _errorActions.loaded)());

				if (!err.response) {
					dispatch(
						(0, _errorActions.returnErrors)(
							{
								msg: "Server is down. Please try again later"
							},
							500,
							"SERVER_ERROR"
						)
					);
				} else {
					dispatch(
						(0, _errorActions.returnErrors)(err.response.data, err.response.status, "EDIT_QUESTION_FAIL")
					);
				}
			});
	};
};

exports.addNewQuestion = addNewQuestion;

var editQuestion = function editQuestion(formData) {
	return function _callee5(dispatch, getState) {
		var token;
		return regeneratorRuntime.async(function _callee5$(_context5) {
			while (1) {
				switch ((_context5.prev = _context5.next)) {
					case 0:
						token = getState().auth.token;
						dispatch((0, _errorActions.loading)("Updating question"));
						_context5.next = 4;
						return regeneratorRuntime.awrap(
							_axios["default"]
								.post(
									"https://sparkquiz-backend.herokuapp.com/quiz/editQuestion",
									formData,
									(0, _authActions.tokenConfig)(token)
								)
								.then(function(res) {
									dispatch({
										type: EDIT_QUESTION,
										payload: res.data.quiz
									});
									dispatch((0, _errorActions.loaded)());
								})["catch"](function(err) {
									dispatch((0, _errorActions.loaded)());

									if (!err.response) {
										dispatch(
											(0, _errorActions.returnErrors)(
												{
													msg: "Server is down. Please try again later"
												},
												500,
												"SERVER_ERROR"
											)
										);
									} else {
										dispatch(
											(0, _errorActions.returnErrors)(
												err.response.data,
												err.response.status,
												"EDIT_QUESTION_FAIL"
											)
										);
									}
								})
						);

					case 4:
						return _context5.abrupt("return", _context5.sent);

					case 5:
					case "end":
						return _context5.stop();
				}
			}
		});
	};
};

exports.editQuestion = editQuestion;

var deleteQuestion = function deleteQuestion(id) {
	return function _callee6(dispatch, getState) {
		var quizId, token;
		return regeneratorRuntime.async(function _callee6$(_context6) {
			while (1) {
				switch ((_context6.prev = _context6.next)) {
					case 0:
						quizId = getState().quiz._id;
						token = getState().auth.token;
						_context6.next = 4;
						return regeneratorRuntime.awrap(
							_axios["default"]
								.post(
									"https://sparkquiz-backend.herokuapp.com/quiz/deleteQuestion",
									{
										quizId: quizId,
										questionId: id
									},
									(0, _authActions.tokenConfig)(token)
								)
								.then(function() {
									dispatch({
										type: DELETE_QUESTION,
										id: id
									});
								})
						);

					case 4:
						return _context6.abrupt("return", _context6.sent);

					case 5:
					case "end":
						return _context6.stop();
				}
			}
		});
	};
};

exports.deleteQuestion = deleteQuestion;

var updateQuiz = function updateQuiz(_id, update) {
	return function(dispatch) {
		dispatch((0, _errorActions.loading)("Updating quiz"));

		_axios["default"]
			.post("https://sparkquiz-backend.herokuapp.com/quiz/updateQuiz", {
				_id: _id,
				update: update
			})
			.then(function() {
				dispatch({
					type: UPDATE_QUIZ,
					payload: update
				});
				dispatch((0, _errorActions.loaded)());
			})["catch"](function(err) {
				console.log(err);
			});
	};
};

exports.updateQuiz = updateQuiz;

var publishQuiz = function publishQuiz(quizId) {
	return function(dispatch, getState) {
		var token = getState().auth.token;
		dispatch((0, _errorActions.loading)("Uploading quiz"));
		return _axios["default"]
			.post(
				"https://sparkquiz-backend.herokuapp.com/quiz/publishQuiz",
				{
					quizId: quizId
				},
				(0, _authActions.tokenConfig)(token)
			)
			.then(function(res) {
				dispatch(clearCurrentQuiz());
				dispatch((0, _errorActions.loaded)());
				dispatch((0, _userActions.fetchQuizzes)());
			})["catch"](function(err) {
				dispatch((0, _errorActions.loaded)());

				if (!err.response) {
					dispatch(
						(0, _errorActions.returnErrors)(
							{
								msg: "Server is down. Please try again later"
							},
							500,
							"SERVER_ERROR"
						)
					);
				} else {
					dispatch(
						(0, _errorActions.returnErrors)(err.response.data, err.response.status, "QUIZ_PUBLISH_FAIL")
					);
				}
			});
	};
};

exports.publishQuiz = publishQuiz;
