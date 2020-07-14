import { SET_STUDENT, SET_QUESTION_ANSWER, FINISH_QUIZ, SET_OVERALL_SCORE } from "../actions/quizScoreActions";

const initalState = {
		studentId: "",
	results: [],
		questionNumber: 0,
		overallScore: 0,
		
};

export default (state = initalState, action) => {
	switch (action.type) {
		case SET_STUDENT:
            return {
                ...state,
				studentId: action.payload.id,
				questionNumber: action.payload.questionNumber
			};
		case SET_QUESTION_ANSWER:
			return {
				...state,
				results: [...state.results, action.payload]
			}
		case SET_OVERALL_SCORE: 
			return {
				...state,
				overallScore: action.score
			}
		case FINISH_QUIZ: 
			return initalState
		default:
			return state;
	}
};
