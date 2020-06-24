import axios from "axios";
import { returnErrors } from "./errorActions";
import { CLEAR_ERRORS } from "./errorActions";
import { SET_CURRENT_QUIZ } from "./quizActions";
import { setStudent } from "./quizScoreActions";
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

//check token and load user. This function will be called all the time
export const loadUser = () => {
	return async (dispatch, getState) => {
		//user loading
		dispatch({ type: USER_LOADING }); //ser is loading to true
		axios
			.get("http:localhost:5000/user", tokenConfig(getState))
			.then((res) =>
				dispatch({
					type: USER_LOADED,
					payload: res.data
				})
			)
			.catch((err) => {
				dispatch(returnErrors(err.response.data, err.response.status));
				dispatch({
					type: AUTH_ERROR
				});
			});
	};
};

export const register = ({ name, email, password, password2 }) => {
	return (dispatch, getState) => {
		const config = { headers: { "Content-Type": "application/json" } };
		const body = JSON.stringify({ name, email, password, password2 });
		return axios
			.post("http://localhost:5000/register", body, config)
			.then((res) => {
				dispatch({
					type: REGISTER_SUCCESS,
					payload: res.data
				});
				dispatch({
					type: CLEAR_ERRORS
				});
			})
			.catch((err) => {
				dispatch(returnErrors(err.response.data, err.response.status, "REGISTER_FAIL"));
				dispatch({
					type: REGISTER_FAIL
				});
				console.log(getState().error.msg.msg);
			});
	};
};

export const login = ({ email, password }) => {
	return (dispatch, getState) => {
		const config = { headers: { "Content-Type": "application/json" } };
		const body = JSON.stringify({ email, password });
		return axios
			.post("http://localhost:5000/login", body, config)
			.then((res) => {
				dispatch({
					type: LOGIN_SUCCESS,
					payload: res.data
				});
				dispatch({
					type: CLEAR_ERRORS
				});
			})
			.catch((err) => {
				// dispatch(
				//   returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
				// );
				dispatch({
					type: LOGIN_FAIL
				});
				console.log(getState().error.msg.msg);
			});
	};
};

export const logout = () => {
	return (dispatch) => {
		dispatch({ type: LOGOUT_SUCCESS });
	};
};

//set up config/headers and token
export const tokenConfig = (token) => {
	const config = {
		headers: {
			"Content-type": "application/json"
		}
	};

	//if token, add to headers
	if (token) {
		config.headers["x-auth-token"] = token;
	}
	return config;
};

export const studentLogin = (id) => {
	return (dispatch, getState) => {
		const config = { headers: { "Content-Type": "application/json" } };

		return axios
			.post("http://localhost:5000/studentLogin", { id }, config)
			.then((res) => {
				dispatch({
					type: STUDENT_LOGIN_SUCCESS,
					payload: { token: res.data.token }
				});
				//not sure if we should use same state to store quiz for student as for teacher when creating
				dispatch({
					type: SET_CURRENT_QUIZ,
					payload: res.data.quiz
				});
				dispatch(setStudent(res.data.user.contactId));
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
