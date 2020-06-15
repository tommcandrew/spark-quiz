import axios from "axios";
import { tokenConfig } from "./authActions";
import { store } from "../../App";

export const FETCH_QUIZZES = "FETCH_QUIZZES";
export const ADD_QUIZ = "ADD_QUIZ";
export const DELETE_QUIZ = "DELETE_QUIZ";

export const fetchQuizzes = () => {
  return (dispatch) => {
    const token = store.getState().auth.token;
    axios
      .get("http://localhost:5000/fetchQuizzes", tokenConfig(token))
      .then((res) => {
        console.log("fetched quizzes");
        console.log(res.data);
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
  console.log("delete quiz action - outer");
  return (dispatch) => {
    console.log("delete quiz action - inner");
    console.log("making axios call for delete");
    axios
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
