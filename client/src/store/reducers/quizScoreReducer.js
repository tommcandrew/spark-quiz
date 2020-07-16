import {
  SET_STUDENT,
  SET_QUESTION_ANSWER,
  FINISH_QUIZ,
  SET_OVERALL_SCORE,
} from "../actions/quizScoreActions";

const initalState = {
  studentId: "",
  results: [],
  overallScore: 0,
  timeTaken: null,
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
        results: [...state.results, action.payload],
      };
    case SET_OVERALL_SCORE:
      return {
        ...state,
        overallScore: state.overallScore + action.score,
      };
    case FINISH_QUIZ:
      return initalState;
    default:
      return state;
  }
};
