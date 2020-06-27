import {
  FETCH_QUIZZES,
  DELETE_QUIZ,
  ADD_CONTACT,
  ADD_GROUP,
} from "../actions/quizzesListActions";

const initalState = {
  quizzes: [],
  contacts: [],
  groups: [],
};

//changing cases to strings because of strange error
export default (state = initalState, action) => {
  switch (action.type) {
    case FETCH_QUIZZES:
      return { ...state, quizzes: [...action.payload] };
    case DELETE_QUIZ:
      return {
        ...state,
        quizzes: state.quizzes.filter((quiz) => quiz._id !== action.payload),
      };
    case ADD_CONTACT:
      return { ...state, contacts: [...state.contacts, action.payload] };
    case ADD_GROUP:
      return { ...state, groups: [...state.groups, action.payload] };
    default:
      return state;
  }
};
