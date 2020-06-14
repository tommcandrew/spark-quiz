import {
  ADD_NEW_QUESTION,
  DELETE_QUESTION,
  CREATE_QUIZ,
} from "../actions/newQuiz";

const initalState = {
  quizId: "",
  quizName: "",
  quizSubject: "",
  quizQuestions: [],
};

export default (state = initalState, action) => {
  switch (action.type) {
    case ADD_NEW_QUESTION:
      return {
        ...state,
        quizQuestions: state.quizQuestions.concat(action.question),
      };
    case DELETE_QUESTION:
      return {
        ...state,
        quizQuestions: state.quizQuestions.filter(
          (question) => question.id !== action.id
        ),
      };
    case CREATE_QUIZ:
      return {
        ...state,
        quizQuestions: state.quizQuestions.filter(
          (question) => question.id !== action.id
        ),
      };
    default:
      return state;
  }
};
