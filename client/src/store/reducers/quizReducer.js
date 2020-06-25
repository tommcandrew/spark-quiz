import {
  ADD_NEW_QUESTION,
  DELETE_QUESTION,
  CREATE_QUIZ,
  SET_CURRENT_QUIZ,
  CLEAR_CURRENT_QUIZ,
  UPDATE_QUIZ,
} from "../actions/quizActions";

const initalState = {
  _id: "",
  quizName: "",
  quizSubject: "",
  quizQuestions: [],
  quizTimeLimit: "",
  quizPointsSystem: "",
  quizInvites: [],
};

//changing cases to strings because of strange error
export default (state = initalState, action) => {
  switch (action.type) {
    case ADD_NEW_QUESTION:
      //update entire state with updated version of quiz
      return { ...state,
        _id: action.payload._id,
        quizName: action.payload.quizName,
        quizSubject: action.payload.quizSubject,
        quizQuestions: action.payload.quizQuestions,
      };
    case DELETE_QUESTION:
      const updatedState = {
        ...state,
        quizQuestions: state.quizQuestions.filter(
          (question) => question._id !== action.id
        ),
      };
      return updatedState;
    case CREATE_QUIZ:
      return {
        ...state,
        _id: action.payload._id,
        quizName: action.payload.quizName,
        quizSubject: action.payload.quizSubject,
      };
    case SET_CURRENT_QUIZ:
      localStorage.setItem("quiz", action.payload._id)
      return {
        ...state,
        ...action.payload,
      };
    case CLEAR_CURRENT_QUIZ:
      return {
        ...initalState,
      };
    case UPDATE_QUIZ:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
