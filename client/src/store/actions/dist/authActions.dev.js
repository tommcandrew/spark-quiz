"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.logout = exports.resetPassword = exports.clearStudent = exports.changePassword = exports.deleteAccount = exports.studentReload = exports.studentLogin = exports.login = exports.register = exports.loadUser = exports.tokenConfig = exports.CLEAR_USER_REDUCER = exports.QUIZZES_LOADED = exports.CLEAR_STUDENT = exports.REGISTER_FAIL = exports.REGISTER_SUCCESS = exports.STUDENT_LOGIN_SUCCESS = exports.LOGOUT_SUCCESS = exports.LOGIN_FAIL = exports.LOGIN_SUCCESS = exports.AUTH_ERROR = exports.USER_LOADING = exports.USER_LOADED = exports.STUDENT_RELOAD_SUCCESS = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _errorActions = require("./errorActions");

var _quizScoreActions = require("./quizScoreActions");

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var STUDENT_RELOAD_SUCCESS = "STUDENT_RELOAD_SUCCESS";
exports.STUDENT_RELOAD_SUCCESS = STUDENT_RELOAD_SUCCESS;
var USER_LOADED = "USER_LOADED";
exports.USER_LOADED = USER_LOADED;
var USER_LOADING = "USER_LOADING";
exports.USER_LOADING = USER_LOADING;
var AUTH_ERROR = "AUTH_ERROR";
exports.AUTH_ERROR = AUTH_ERROR;
var LOGIN_SUCCESS = "LOGIN_SUCCESS";
exports.LOGIN_SUCCESS = LOGIN_SUCCESS;
var LOGIN_FAIL = "LOGIN_FAIL";
exports.LOGIN_FAIL = LOGIN_FAIL;
var LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
exports.LOGOUT_SUCCESS = LOGOUT_SUCCESS;
var STUDENT_LOGIN_SUCCESS = "STUDENT_LOGIN_SUCCESS";
exports.STUDENT_LOGIN_SUCCESS = STUDENT_LOGIN_SUCCESS;
var REGISTER_SUCCESS = "REGISTER_SUCCESS";
exports.REGISTER_SUCCESS = REGISTER_SUCCESS;
var REGISTER_FAIL = "REGISTER_FAIL";
exports.REGISTER_FAIL = REGISTER_FAIL;
var CLEAR_STUDENT = "CLEAR_STUDENT";
exports.CLEAR_STUDENT = CLEAR_STUDENT;
var QUIZZES_LOADED = "QUIZZES_LOADED";
exports.QUIZZES_LOADED = QUIZZES_LOADED;
var CLEAR_USER_REDUCER = "CLEAR_USER_REDUCER";
exports.CLEAR_USER_REDUCER = CLEAR_USER_REDUCER;

var tokenConfig = function tokenConfig(token) {
	var config = {
		headers: {
			"Content-type": "application/json"
		}
	};

	if (token) {
		config.headers["x-auth-token"] = token;
	}

	return config;
}; // EROR AND LOADING MANAGED

exports.tokenConfig = tokenConfig;

var loadUser = function loadUser() {
	return function _callee(dispatch, getState) {
		var token;
		return regeneratorRuntime.async(function _callee$(_context) {
			while (1) {
				switch ((_context.prev = _context.next)) {
					case 0:
						dispatch({
							type: USER_LOADING
						}); //user is loading to true

						token = getState().auth.token;
						return _context.abrupt(
							"return",
							_axios["default"]
								.get("http://localhost:5000/user/fetchUser", tokenConfig(token))
								.then(function(res) {
									dispatch({
										type: USER_LOADED,
										payload: res.data.user
									});
									dispatch({
										type: QUIZZES_LOADED,
										payload: res.data.userQuizzes
									});
								})["catch"](function(err) {
									if (!err.response) {
										dispatch(
											(0, _errorActions.returnErrors)(
												{
													msg: "Server is down. Please try again later"
												},
												500,
												"REGISTER_FAIL"
											)
										);
									} else {
										dispatch({
											type: AUTH_ERROR
										});
										dispatch(
											(0, _errorActions.returnErrors)(
												{
													msg: "Something went wrong. Please login Again"
												},
												err.response.status
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

exports.loadUser = loadUser;

var register = function register(_ref) {
	var name = _ref.name,
		email = _ref.email,
		password = _ref.password,
		password2 = _ref.password2;
	return function(dispatch, getState) {
		var config = {
			headers: {
				"Content-Type": "application/json"
			}
		};
		var body = JSON.stringify({
			name: name,
			email: email,
			password: password,
			password2: password2
		});
		dispatch((0, _errorActions.loading)("Registering User. Please Wait"));
		return _axios["default"].post("http://localhost:5000/auth/register", body, config).then(function(res) {
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data
			});
			dispatch((0, _errorActions.clearErrors)());
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
				dispatch((0, _errorActions.returnErrors)(err.response.data, err.response.status, "REGISTER_FAIL"));
			}

			dispatch({
				type: REGISTER_FAIL
			});
		});
	};
};

exports.register = register;

var login = function login(_ref2) {
	var email = _ref2.email,
		password = _ref2.password;
	return function(dispatch, getState) {
		dispatch((0, _errorActions.loading)("Logging In. Please Wait"));
		var config = {
			headers: {
				"Content-Type": "application/json"
			}
		};
		var body = JSON.stringify({
			email: email,
			password: password
		});
		return _axios["default"].post("http://localhost:5000/auth/login", body, config).then(function(res) {
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data
			});
			dispatch(loadUser());
			dispatch({
				type: _errorActions.CLEAR_ERRORS
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
						"LOGIN_FAIL"
					)
				);
			} else {
				dispatch((0, _errorActions.returnErrors)(err.response.data, err.response.status, "LOGIN_FAIL"));
				dispatch({
					type: LOGIN_FAIL
				});
			}
		});
	};
}; // NOT ERROR MANAGED

exports.login = login;

var studentLogin = function studentLogin(studentCode) {
	return function(dispatch, getState) {
		var config = {
			headers: {
				"Content-Type": "application/json"
			}
		};
		dispatch((0, _errorActions.loading)("Verifing code"));
		return _axios["default"]
			.post(
				"http://localhost:5000/auth/studentLogin",
				{
					studentCode: studentCode
				},
				config
			)
			.then(function(res) {
				dispatch(
					(0, _quizScoreActions.setStudent)({
						quiz: res.data.quiz,
						token: res.data.token,
						user: res.data.user,
						questionNumber: res.data.quizQuestionNumber,
						pointsScored: res.data.pointsScored
					})
				);
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
					dispatch((0, _errorActions.returnErrors)(err.response.data, err.response.status, "INVALID_CODE"));
				}
			});
	};
};

exports.studentLogin = studentLogin;

var studentReload = function studentReload() {
	return function _callee2(dispatch, getState) {
		var token;
		return regeneratorRuntime.async(function _callee2$(_context2) {
			while (1) {
				switch ((_context2.prev = _context2.next)) {
					case 0:
						if (!(getState().quiz._id !== "")) {
							_context2.next = 4;
							break;
						}

						return _context2.abrupt("return");

					case 4:
						token = getState().auth.token;
						dispatch((0, _errorActions.loading)("Reloading"));
						return _context2.abrupt(
							"return",
							_axios["default"]
								.get("http://localhost:5000/student/quizReload", tokenConfig(token))
								.then(function(res) {
									dispatch(
										(0, _quizScoreActions.resetStudent)({
											quiz: res.data.quiz,
											user: res.data.user,
											questionNumber: res.data.quizQuestionNumber,
											pointsScored: res.data.pointsScored
										})
									);
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
												"INVALID_CODE"
											)
										);
									}
								})
						);

					case 7:
					case "end":
						return _context2.stop();
				}
			}
		});
	};
};

exports.studentReload = studentReload;

var deleteAccount = function deleteAccount() {
	return function(dispatch, getState) {
		var token = getState().auth.token;
		return _axios["default"].get("http://localhost:5000/user/deleteAccount", tokenConfig(token)).then(function() {
			//is it ok to not return an action object for reducer? It seems unnecessary here.
			dispatch(logout());
		})["catch"](function(err) {
			console.log(err);
		});
	};
};

exports.deleteAccount = deleteAccount;

var changePassword = function changePassword(currentPassword, newPassword) {
	return function(dispatch, getState) {
		var token = getState().auth.token;
		return _axios["default"]
			.post(
				"http://localhost:5000/auth/changePassword",
				{
					currentPassword: currentPassword,
					newPassword: newPassword
				},
				tokenConfig(token)
			)
			.then(function(res) {
				console.log(res);
			})["catch"](function(err) {
				console.log(err);
			});
	};
};

exports.changePassword = changePassword;

var clearStudent = function clearStudent() {
	return function _callee3(dispatch) {
		return regeneratorRuntime.async(function _callee3$(_context3) {
			while (1) {
				switch ((_context3.prev = _context3.next)) {
					case 0:
						dispatch({
							type: CLEAR_STUDENT
						});

					case 1:
					case "end":
						return _context3.stop();
				}
			}
		});
	};
};

exports.clearStudent = clearStudent;

var resetPassword = function resetPassword(email) {
	return function(dispatch, getState) {
		return _axios["default"]
			.post("http://localhost:5000/auth/resetPassword", {
				email: email
			})
			.then(function(res) {
				console.log(res);
			})["catch"](function(err) {
				console.log(err);
			});
	};
};

exports.resetPassword = resetPassword;

var logout = function logout() {
	return function(dispatch) {
		dispatch({
			type: LOGOUT_SUCCESS
		});
		dispatch({
			type: CLEAR_USER_REDUCER
		});
	};
};

exports.logout = logout;
