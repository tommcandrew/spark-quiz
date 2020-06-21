import axios from "axios";
import { tokenConfig } from "./authActions";
export const FETCH_QUIZZES = "FETCH_QUIZZES";
export const ADD_QUIZ = "ADD_QUIZ";
export const DELETE_QUIZ = "DELETE_QUIZ";

export const fetchQuizzes = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    axios
      .get("http://localhost:5000/fetchQuizzes", tokenConfig(token))
      .then((res) => {
        dispatch({
          type: FETCH_QUIZZES,
          payload: res.data.quizzes,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addQuiz = (quizName, quizSubject, quizPublished) => {
  return {
    type: ADD_QUIZ,
    payload: {
      quizName,
      quizSubject,
      quizPublished,
    },
  };
};

export const deleteQuiz = (id) => {
  return (dispatch) => {
    return axios
      .post("http://localhost:5000/deleteQuiz", { _id: id })
      .then(() => {
        dispatch({
          type: DELETE_QUIZ,
          payload: id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
