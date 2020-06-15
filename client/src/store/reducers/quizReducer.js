import {
  ADD_NEW_QUESTION,
  DELETE_QUESTION,
  CREATE_QUIZ,
} from "../actions/quizActions";

const initalState = {
  quizId: "",
  quizName: "",
  quizSubject: "",
  quizQuestions: [],
};

//changing cases to strings because of strange error
export default (state = initalState, action) => {
  switch (action.type) {
    case "ADD_NEW_QUESTION":
      //update entire state with updated version of quiz
      return { ...state, ...action.payload };
    case "DELETE_QUESTION":
      return {
        ...state,
        quizQuestions: state.quizQuestions.filter(
          (question) => question.id !== action.id
        ),
      };
    case "CREATE_QUIZ":
      return {
        ...state,
        quizId: action.payload.quizId,
        quizName: action.payload.quizName,
        quizSubject: action.payload.quizSubject,
      };
    default:
      return state;
  }
};
