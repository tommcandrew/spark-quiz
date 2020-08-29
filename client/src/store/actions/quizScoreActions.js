import axios from "axios";
import { tokenConfig, STUDENT_LOGIN_SUCCESS, STUDENT_RELOAD_SUCCESS } from "./authActions";
import { loading, loaded } from "./errorActions";
import { SET_CURRENT_QUIZ, RESET_CURRENT_QUIZ } from "./quizActions";
export const SET_STUDENT = "SET_STUDENT";
export const SET_NEW_QUESTION_NUMBER = "SET_NEW_QUESTION_NUMBER";
export const SET_OVERALLSCORE = "SET_OVERALLSCORE";
export const FINISH_QUIZ = "FINISH_QUIZ";
export const SET_OVERALL_SCORE = "SET_OVERALL_SCORE";
export const RESET_STUDENT = "RESET_STUDENT";
export const CLEAR_SCORE = "CLEAR_SCORE";

export const resetStudent = ({ quiz, user, questionNumber, pointsScored }) => {
	return async (dispatch) => {
		await dispatch({
			type: STUDENT_RELOAD_SUCCESS,
			payload: {
				user: user
			}
		});
		await dispatch({
			type: RESET_CURRENT_QUIZ,
			payload: quiz
		});
		await dispatch({
			type: SET_STUDENT,
			payload: {
				id: user.contactId,
				questionNumber: parseInt(questionNumber),
				pointsScored: pointsScored
			}
		});
	};
};

export const setStudent = ({ quiz, token, user, questionNumber, pointsScored }) => {
	return async (dispatch) => {
		await dispatch({
			type: STUDENT_LOGIN_SUCCESS,
			payload: {
				token: token,
				user: user
			}
		});
		await dispatch({
			type: SET_CURRENT_QUIZ,
			payload: quiz
		});
		await dispatch({
			type: SET_STUDENT,
			payload: {
				id: user.contactId,
				questionNumber: parseInt(questionNumber),
				pointsScored: pointsScored
			}
		});
	};
};

export const setDemoQuiz = ({ quiz }) => {
	return async (dispatch) => {
		await dispatch({
			type: STUDENT_LOGIN_SUCCESS,
			payload: {
				token: "demo_token",
				user: "demo_user"
			}
		});
		await dispatch({
			type: SET_CURRENT_QUIZ,
			payload: quiz
		});
		await dispatch({
			type: SET_STUDENT,
			payload: {
				id: "demo_id",
				questionNumber: 0,
				pointsScored: 0
			}
		});
	}
}

export const clearScore = () => {
	return (dispatch) => {
		dispatch({
			type: CLEAR_SCORE
		});
	};
};

export const finishQuiz = () => {
	return (dispatch, getState) => {
		const token = getState().auth.studentToken;
		const studentId = getState().auth.user.contactId;
		const quizId = getState().quiz._id;
		return axios
			.post("http://localhost:5000/student/finishQuiz", { quizId, studentId }, tokenConfig(token))
			.then((res) => {
				return;
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const setQuestionAnswer = (answer) => {
	return (dispatch, getState) => {
		const token = getState().auth.studentToken;
		const studentId = getState().auth.user.contactId;
		const quizId = getState().quiz._id;
		const questionNumber = parseInt(getState().score.questionNumber + 1);
		const isDemo = localStorage.getItem("token") === "demo_token"
		if (!isDemo) {
			return axios
			.post(
				"http://localhost:5000/student/saveAnswer",
				{ quizId, studentId, questionNumber, answer },
				tokenConfig(token)
			)
			.then((res) => {
				dispatch({
					type: SET_NEW_QUESTION_NUMBER,
					questionNumber: questionNumber
				});
			})
			.catch((err) => {
				console.log(err);
			});
			return;
		}
		else {
			dispatch({
					type: SET_NEW_QUESTION_NUMBER,
					questionNumber: questionNumber
			});
			return;
		}
		
	};
};

export const setOverallScore = (score) => {
	return (dispatch, getState) => {
		const token = getState().auth.studentToken;
		const studentId = getState().auth.user.contactId;
		const quizId = getState().quiz._id;
		const newScore = parseInt(getState().score.overallScore) + parseInt(score);
		const isDemo = localStorage.getItem("token") === "demo_token"
		if (!isDemo) {
			return axios
			.post("http://localhost:5000/student/saveScore", { quizId, studentId, newScore }, tokenConfig(token))
			.then((res) => {
				dispatch({
					type: SET_OVERALL_SCORE,
					score: newScore
				});
			})
			.catch((err) => {
				console.log(err);
			});
			return;
		}
		else {
			dispatch({
					type: SET_OVERALL_SCORE,
					score: newScore
			});
			return;
		}
		
	};
};
