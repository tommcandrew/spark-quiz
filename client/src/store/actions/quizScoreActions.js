import axios from "axios";
import { tokenConfig } from "./authActions";
export const SET_STUDENT = "SET_STUDENT";
export const SET_QUESTION_ANSWER = "SET_QUESTION_ANSWER";
export const SET_OVERALLSCORE = "SET_OVERALLSCORE";
export const FINISH_QUIZ = "FINISH_QUIZ";
export const SET_OVERALL_SCORE = "SET_OVERALL_SCORE";

export const setStudent = (contactId) => {
  return (dispatch) => {
    dispatch({
      type: SET_STUDENT,
      id: contactId,
    });
  };
};

export const finishQuiz = () => {
  return (dispatch, getState) => {
    const token = getState().auth.studentToken;
    let scoreObject = getState().score;
    const quizId = getState().quiz._id;
    axios
      .post(
        "http://localhost:5000/student/saveScores",
        { quizId, scoreObject },
        tokenConfig(token)
      )
      .then((res) => {
        dispatch({
          type: FINISH_QUIZ,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setQuestionAnswer = (question, answer) => {
  return (dispatch) => {
    dispatch({
      type: SET_QUESTION_ANSWER,
      payload: {
        question: question,
        correct: answer,
      },
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
