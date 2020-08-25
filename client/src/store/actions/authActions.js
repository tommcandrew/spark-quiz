import axios from "axios";
import { returnErrors, clearErrors } from "./errorActions";
import { CLEAR_ERRORS } from "./errorActions";
import { loading, loaded } from "./errorActions";
import { setStudent, resetStudent } from "./quizScoreActions";
export const STUDENT_RELOAD_SUCCESS = "STUDENT_RELOAD_SUCCESS";
export const USER_LOADED = "USER_LOADED";
export const USER_LOADING = "USER_LOADING";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const STUDENT_LOGIN_SUCCESS = "STUDENT_LOGIN_SUCCESS";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const CLEAR_STUDENT = "CLEAR_STUDENT";
export const QUIZZES_LOADED = "QUIZZES_LOADED";
export const CLEAR_USER_REDUCER = "CLEAR_USER_REDUCER";

export const tokenConfig = (token) => {
	const config = {
		headers: {
			"Content-type": "application/json"
		}
	};
	if (token) {
		config.headers["x-auth-token"] = token;
	}
	return config;
};

// EROR AND LOADING MANAGED

export const loadUser = () => {
	return async (dispatch, getState) => {
		dispatch({ type: USER_LOADING }); //user is loading to true
		const token = getState().auth.token;
		return axios
			.get("http://localhost:5000/user/fetchUser", tokenConfig(token))
			.then((res) => {
				dispatch({
					type: USER_LOADED,
					payload: res.data.user
				});
				dispatch({
					type: QUIZZES_LOADED,
					payload: res.data.userQuizzes
				});
				

			})
			.catch((err) => {
				if (!err.response) {
					dispatch(returnErrors({ msg: "Server is down. Please try again later" }, 500, "REGISTER_FAIL"));
				} else {
					dispatch({
						type: AUTH_ERROR
					});
					dispatch(returnErrors({ msg: "Something went wrong. Please login Again" }, err.response.status));
				}
			});
	};
};

export const register = ({ name, email, password, password2 }) => {
	return (dispatch, getState) => {
		const config = { headers: { "Content-Type": "application/json" } };
		const body = JSON.stringify({ name, email, password, password2 });
		dispatch(loading("Registering User. Please Wait"));
		return axios
			.post("http://localhost:5000/auth/register", body, config)
			.then((res) => {
				dispatch({
					type: REGISTER_SUCCESS,
					payload: res.data
				});
				dispatch(clearErrors());
				dispatch(loaded());
			})
			.catch((err) => {
				dispatch(loaded());
				if (!err.response) {
					dispatch(returnErrors({ msg: "Server is down. Please try again later" }, 500, "SERVER_ERROR"));
				} else {
					dispatch(returnErrors(err.response.data, err.response.status, "REGISTER_FAIL"));
				}
				dispatch({
					type: REGISTER_FAIL
				});
			});
	};
};

export const login = ({ email, password }) => {
	return (dispatch, getState) => {
		dispatch(loading("Logging In. Please Wait"));
		const config = { headers: { "Content-Type": "application/json" } };
		const body = JSON.stringify({ email, password });
		return axios
			.post("http://localhost:5000/auth/login", body, config)
			.then((res) => {
				dispatch({
					type: LOGIN_SUCCESS,
					payload: res.data
				});
				dispatch(loadUser());
				dispatch({
					type: CLEAR_ERRORS
				});
				dispatch(loaded());
			})
			.catch((err) => {
				dispatch(loaded());
				if (!err.response) {
					dispatch(returnErrors({ msg: "Server is down. Please try again later" }, 500, "LOGIN_FAIL"));
				} else {
					dispatch(returnErrors(err.response.data, err.response.status, "LOGIN_FAIL"));
					dispatch({
						type: LOGIN_FAIL
					});
				}
			});
	};
};

// NOT ERROR MANAGED
export const studentLogin = (studentCode) => {
	return (dispatch, getState) => {
		const config = { headers: { "Content-Type": "application/json" } };
		dispatch(loading("Verifing code"));
		return axios
			.post("http://localhost:5000/auth/studentLogin", { studentCode }, config)
			.then((res) => {
				dispatch(
					setStudent({
						quiz: res.data.quiz,
						token: res.data.token,
						user: res.data.user,
						questionNumber: res.data.quizQuestionNumber,
						pointsScored: res.data.pointsScored
					})
				);
				dispatch(loaded());
			})
			.catch((err) => {
				dispatch(loaded());
				if (!err.response) {
					dispatch(returnErrors({ msg: "Server is down. Please try again later" }, 500, "SERVER_ERROR"));
				} else {
					dispatch(returnErrors(err.response.data, err.response.status, "INVALID_CODE"));
				}
			});
	};
};

export const studentReload = () => {
	return async (dispatch, getState) => {
		if (getState().quiz._id !== "") return;
		else {
			const token = getState().auth.token;
			dispatch(loading("Reloading"));
			return axios
				.get("http://localhost:5000/student/quizReload", tokenConfig(token))
				.then((res) => {
					dispatch(
						resetStudent({
							quiz: res.data.quiz,
							user: res.data.user,
							questionNumber: res.data.quizQuestionNumber,
							pointsScored: res.data.pointsScored
						})
					);
					dispatch(loaded());
				})
				.catch((err) => {
					dispatch(loaded());
					if (!err.response) {
						dispatch(returnErrors({ msg: "Server is down. Please try again later" }, 500, "SERVER_ERROR"));
					} else {
						dispatch(returnErrors(err.response.data, err.response.status, "INVALID_CODE"));
					}
				});
		}
	};
};

export const deleteAccount = () => {
	return (dispatch, getState) => {
		const token = getState().auth.token;
		return axios
			.get("http://localhost:5000/user/deleteAccount", tokenConfig(token))
			.then(() => {
				//is it ok to not return an action object for reducer? It seems unnecessary here.
				dispatch(logout());
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const changePassword = (currentPassword, newPassword) => {
	return (dispatch, getState) => {
		const token = getState().auth.token;
		return axios
			.post("http://localhost:5000/auth/changePassword", { currentPassword, newPassword }, tokenConfig(token))
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const clearStudent = () => {
	return async (dispatch) => {
		dispatch({ type: CLEAR_STUDENT });
	};
};

export const resetPassword = (email) => {
	return (dispatch, getState) => {
		return axios
			.post("http://localhost:5000/auth/resetPassword", { email })
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const logout = () => {
	return (dispatch) => {
		dispatch({ type: LOGOUT_SUCCESS });
		dispatch({ type: CLEAR_USER_REDUCER });
	};
};
