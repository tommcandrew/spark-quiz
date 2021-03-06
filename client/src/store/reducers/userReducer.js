import { FETCH_QUIZZES, DELETE_QUIZ, ADD_CONTACT, ADD_GROUP, ADD_QUIZ } from "../actions/userActions";

import { QUIZZES_LOADED, CLEAR_USER_REDUCER } from "../actions/authActions";

const initalState = {
	quizzes: [],
	contacts: [],
	groups: []
};

//changing cases to strings because of strange error
export default (state = initalState, action) => {
	switch (action.type) {
		case FETCH_QUIZZES:
			return { ...state, quizzes: [ ...action.payload ] };
		case QUIZZES_LOADED:
			return {
				...state,
				quizzes: action.payload
			};
		case DELETE_QUIZ:
			return {
				...state,
				quizzes: state.quizzes.filter((quiz) => quiz._id !== action.payload)
			};
		case ADD_QUIZ:
			return {
				...state,
				quizzes: [ ...state.quizzes, action.payload ]
			};
		case ADD_CONTACT:
			return { ...state, contacts: [ ...state.contacts, action.payload ] };
		case ADD_GROUP:
			return { ...state, groups: [ ...state.groups, action.payload ] };
		case CLEAR_USER_REDUCER:
			return {
				...state,
				quizzes: [],
				contacts: [],
				groups: []
			};
		default:
			return state;
	}
};
