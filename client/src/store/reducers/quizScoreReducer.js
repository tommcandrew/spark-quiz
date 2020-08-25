import { SET_STUDENT, SET_NEW_QUESTION_NUMBER, FINISH_QUIZ, SET_OVERALL_SCORE, CLEAR_SCORE } from "../actions/quizScoreActions";

const initalState = {
		studentId: "",
		questionNumber: 0,
		overallScore: null,
		
};

export default (state = initalState, action) => {
	switch (action.type) {
		case SET_STUDENT:
            return {
                ...state,
				studentId: action.payload.id,
				questionNumber: action.payload.questionNumber,
				overallScore: action.payload.pointsScored
			};
		case SET_NEW_QUESTION_NUMBER:
			console.log(action.questionNumber)
			return {
				...state,
				questionNumber: parseInt(action.questionNumber)
			};
		case SET_OVERALL_SCORE:
			console.log(action.score)
			return {
				...state,
				overallScore: parseInt(action.score)
			};
		case CLEAR_SCORE:
			return {
				...state,
				overallScore: null
			};
		case FINISH_QUIZ:
			return {
				...state,
				studentId: "",
				questionNumber: 0,
			}
		default:
			return state;
	}
};
