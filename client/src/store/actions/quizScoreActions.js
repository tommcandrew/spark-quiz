import Axios from "axios";
import { tokenConfig } from "./authActions";
export const SET_STUDENT = "SET_STUDENT";
export const SET_QUESTION_ANSWER = "SET_QUESTION_ANSWER";
export const SET_OVERALLSCORE = "SET_OVERALLSCORE";
export const FINISH_QUIZ = "FINISH_QUIZ";
export const SET_OVERALL_SCORE = "SET_OVERALL_SCORE"

export const setStudent = (contactId) => {
	return (dispatch) => {
		dispatch({
			type: SET_STUDENT,
			id: contactId
		});
	};
};

export const finishQuiz = () => {
	
	return (dispatch, getState) => {
		const token = getState().auth.studentToken;
		let scoreObject = JSON.stringify(getState().score)
		const quizId = getState().quiz._id
		const formData = new FormData();
		formData.append("_id", quizId);
		formData.append("scoreObject", scoreObject)
		Axios.post("http://localhost:5000/quizscores", formData, tokenConfig(token) )
			.then((res) => {
				dispatch({
					type: FINISH_QUIZ
				});
			})
			.catch((err) => {console.log(err)});
	};
};

export const setQuestionAnswer = (question, answer) => {
	return (dispatch) => {
		dispatch({
			type: SET_QUESTION_ANSWER,
			payload: {
				question: question,
				correct: answer
			}
		});
	};
};

export const setOverallScore = (score) => {
return (dispatch) => {
    dispatch({
      type: SET_OVERALL_SCORE,
      score: parseInt(score),
    });
  };
};



// export const setStudent = (contactId) => {
//     return (dispatch) => {
//         axios.post("http://localhost:5000/", formData)
//             .then((res) => {
//           dispatch({
//               type: SET_STUDENT,
//               id: contactId
//           })
//             }).catch((err) => {
//                 console.log(err)
//             })
// }}
