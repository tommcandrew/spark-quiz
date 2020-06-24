import { SET_STUDENT, SET_QUESTION_ANSWER, FINISH_QUIZ } from "../actions/quizScoreActions";

const initalState = {
		studentId: "",
		results: [],
		overallScore: 0,
		
};

export default (state = initalState, action) => {
	switch (action.type) {
		case SET_STUDENT:
            return {
                ...state,
				studentId: action.id,
			};
		case SET_QUESTION_ANSWER:
			return {
				...state,
				results: [...state.results, action.payload]
			}
		case FINISH_QUIZ: 
			return initalState
		default:
			return state;
	}
};
