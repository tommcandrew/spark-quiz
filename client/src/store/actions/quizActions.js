import axios from "axios";
import { tokenConfig } from "./authActions";
import { loading, loaded, returnErrors } from "./errorActions";
import { fetchQuizzes, addQuiz } from "./userActions";
export const ADD_NEW_QUESTION = "ADD_NEW_QUESTION";
export const EDIT_QUESTION = "EDIT_QUESTION";
export const DELETE_QUESTION = "DELETE_QUESTION";
export const CREATE_QUIZ = "CREATE_QUIZ";
export const FETCH_QUIZZES = "FETCH_QUIZZES";
export const ADD_QUIZ = "ADD_QUIZ";
export const SET_CURRENT_QUIZ = "SET_CURRENT_QUIZ";
export const CLEAR_CURRENT_QUIZ = "CLEAR_CURRENT_QUIZ";
export const ADD_TIME_LIMIT = "ADD_TIME_LIMIT";
export const UPDATE_QUIZ = "UPDATE_QUIZ";
export const FETCH_QUIZ = "FETCH_QUIZ";
export const PUBLISH_QUIZ = "PUBLISH_QUIZ";
export const RESET_CURRENT_QUIZ = "RESET_CURRENT_QUIZ";

export const createQuiz = (quizName, quizSubject) => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;
		dispatch(loading("Creating new quiz"));
		return axios
			.post("http://localhost:5000/quiz/createQuiz", { quizName, quizSubject }, tokenConfig(token))
			.then((res) => {
				dispatch({
					type: CREATE_QUIZ,
					payload: {
						quizName,
						quizSubject,
						_id: res.data._id
					}
				});
				dispatch(addQuiz(res.data._id, quizName, quizSubject, false));
				dispatch({
					type: SET_CURRENT_QUIZ,
					payload: res.data
				});
				dispatch(loaded());
			})
			.catch((err) => {
				dispatch(loaded());
				if (!err.response) {
					dispatch(returnErrors({ msg: "Server is down. Please try again later" }, 500, "SERVER_ERROR"));
				} else {
					dispatch(returnErrors(err.response.data, err.response.status, "CREATE_QUIZ_FAIL"));
				}
			});
	};
};

export const loadQuiz = () => {
	return async (dispatch, getState) => {
		const quizId = localStorage.getItem("quizId");
		if (quizId) {
			const token = getState().auth.token;
			if (quizId) {
				return axios
					.post("http://localhost:5000/quiz/fetchQuiz", { quizId }, tokenConfig(token))
					.then((res) => {
						dispatch({
							type: CREATE_QUIZ,
							payload: res.data.quiz
						});
						dispatch({
							type: SET_CURRENT_QUIZ,
							payload: res.data.quiz
						});
					})
					.catch((err) => {
						console.log(err);
					});
			} else {
				console.log("no quiz id in local storage");
			}
		}
	};
};

export const setCurrentQuiz = (quiz) => {
	return async (dispatch) => {
		dispatch(loading("Loading the quiz"));
		dispatch({
			type: SET_CURRENT_QUIZ,
			payload: quiz
		});
		dispatch(loaded());
	};
};

export const clearCurrentQuiz = () => {
	return async (dispatch) => {
		dispatch(loading("Clearing the quiz"));
		await dispatch({
			type: CLEAR_CURRENT_QUIZ
		});
		dispatch(loaded());
	};
};

export const addNewQuestion = (formData) => {
	return (dispatch) => {
		dispatch(loading("Adding question"));
		axios
			.post("http://localhost:5000/quiz/addQuestion", formData)
			.then((res) => {
				dispatch({
					type: ADD_NEW_QUESTION,
					payload: res.data.quiz
				});
				dispatch(loaded());
			})
			.catch((err) => {
				dispatch(loaded());
				if (!err.response) {
					dispatch(returnErrors({ msg: "Server is down. Please try again later" }, 500, "SERVER_ERROR"));
				} else {
					dispatch(returnErrors(err.response.data, err.response.status, "EDIT_QUESTION_FAIL"));
				}
			});
	};
};

export const editQuestion = (formData) => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;
		dispatch(loading("Updating question"));
		return await axios
			.post("http://localhost:5000/quiz/editQuestion", formData, tokenConfig(token))
			.then((res) => {
				dispatch({
					type: EDIT_QUESTION,
					payload: res.data.quiz
				});
				dispatch(loaded());
			})
			.catch((err) => {
				dispatch(loaded());
				if (!err.response) {
					dispatch(returnErrors({ msg: "Server is down. Please try again later" }, 500, "SERVER_ERROR"));
				} else {
					dispatch(returnErrors(err.response.data, err.response.status, "EDIT_QUESTION_FAIL"));
				}
			});
	};
};

export const deleteQuestion = (id) => {
	return async (dispatch, getState) => {
		const quizId = getState().quiz._id;
		const token = getState().auth.token;
		return await axios
			.post("http://localhost:5000/quiz/deleteQuestion", { quizId: quizId, questionId: id }, tokenConfig(token))
			.then(() => {
				dispatch({
					type: DELETE_QUESTION,
					id: id
				});
			});
	};
};

export const updateQuiz = (_id, update) => {
	return (dispatch) => {
		dispatch(loading("Updating quiz"));
		axios
			.post("http://localhost:5000/quiz/updateQuiz", { _id, update })
			.then(() => {
				dispatch({
					type: UPDATE_QUIZ,
					payload: update
				});
				dispatch(loaded());
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const publishQuiz = (quizId) => {
	return (dispatch, getState) => {
		const token = getState().auth.token;
		dispatch(loading("Uploading quiz"));
		return axios
			.post("http://localhost:5000/quiz/publishQuiz", { quizId }, tokenConfig(token))
			.then((res) => {
				dispatch(clearCurrentQuiz());
				dispatch(loaded());
				dispatch(fetchQuizzes());
			})
			.catch((err) => {
				dispatch(loaded());
				if (!err.response) {
					dispatch(returnErrors({ msg: "Server is down. Please try again later" }, 500, "SERVER_ERROR"));
				} else {
					dispatch(returnErrors(err.response.data, err.response.status, "QUIZ_PUBLISH_FAIL"));
				}
			});
	};
};
