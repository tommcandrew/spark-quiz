import axios from "axios";
import { tokenConfig, STUDENT_LOGIN_SUCCESS } from "./authActions";
import { loading, loaded } from "./errorActions";
import { SET_CURRENT_QUIZ } from "./quizActions";
export const SET_STUDENT = "SET_STUDENT";
export const SET_QUESTION_ANSWER = "SET_QUESTION_ANSWER";
export const SET_OVERALLSCORE = "SET_OVERALLSCORE";
export const FINISH_QUIZ = "FINISH_QUIZ";
export const SET_OVERALL_SCORE = "SET_OVERALL_SCORE";

export const setStudent = ({ quiz, token, user }) => {
	return async (dispatch) => {
		await dispatch({
			type: STUDENT_LOGIN_SUCCESS,
			payload: {
				token: token,
				user: user
			}
		});
		//not sure if we should use same state to store quiz for student as for teacher when creating
		await dispatch({
			type: SET_CURRENT_QUIZ,
			payload: quiz
		});
		await dispatch({
			type: SET_STUDENT,
			id: user.contactId
		});
	};
};

export const finishQuiz = () => {
	return (dispatch, getState) => {
		const token = getState().auth.studentToken;
		let scoreObject = JSON.stringify(getState().score);
		const quizId = getState().quiz._id;
		const formData = new FormData();
		formData.append("_id", quizId);
		formData.append("scoreObject", scoreObject);
		axios
			.post("http://localhost:5000/student/saveScores", formData, tokenConfig(token))
			.then((res) => {
				dispatch({
					type: FINISH_QUIZ
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const setQuestionAnswer = (question, answer) => {
	return (dispatch, getState) => {
		const token = getState().auth.studentToken;
		const studentId = getState().auth.user.contactId
		const quizId = getState().quiz._id
		axios
			.post("http://localhost:5000/student/saveAnswer", {quizId, studentId, question, answer}, tokenConfig(token))
			.then(res => {
				dispatch({
					type: SET_QUESTION_ANSWER,
					payload: {
						question: question,
						correct: answer
					}
				})
			})
			.catch((err) => {
				console.log(err)
			});
	};
};

export const setOverallScore = (score) => {
	console.log("in setting score")
	return (dispatch, getState) => {
			const token = getState().auth.studentToken;
		const studentId = getState().auth.user.contactId
		const quizId = getState().quiz._id
		const newScore = getState().score.overallScore + parseInt(score)
		return axios
			.post("http://localhost:5000/student/saveScore", {quizId, studentId, newScore}, tokenConfig(token))
			.then((res) => {
				console.log(res.data.msg)
				console.log("okay")
				dispatch({
					type: SET_OVERALL_SCORE,
					score: newScore
				})
			})
			.catch(err => {
				console.log(err)
			})

	};
};
