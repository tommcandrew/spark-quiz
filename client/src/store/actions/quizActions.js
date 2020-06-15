import axios from "axios";
import { tokenConfig } from "./authActions";
import { store } from "../../App";

export const ADD_NEW_QUESTION = "ADD_NEW_QUESTION";
export const DELETE_QUESTION = "DELETE_QUESTION";
export const CREATE_QUIZ = "CREATE_QUIZ";
export const FETCH_QUIZZES = "FETCH_QUIZZES";
export const ADD_QUIZ = "ADD_QUIZ";
export const SET_CURRENT_QUIZ = "SET_CURRENT_QUIZ";
export const CLEAR_CURRENT_QUIZ = "CLEAR_CURRENT_QUIZ";
export const ADD_TIME_LIMIT = "ADD_TIME_LIMIT";
export const UPDATE_QUIZ = "UPDATE_QUIZ";

export const addNewQuestion = (formData) => {
  return (dispatch) => {
    axios
      .post("http://localhost:5000/addQuestion", formData)
      .then((res) => {
        dispatch({
          type: ADD_NEW_QUESTION,
          payload: res.data.quiz,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteQuestion = (id) => {
  return {
    type: DELETE_QUESTION,
    id: id,
  };
};

export const setCurrentQuiz = (quiz) => {
  return (dispatch) => {
    dispatch({
      type: SET_CURRENT_QUIZ,
      payload: quiz,
    });
  };
};

export const clearCurrentQuiz = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_CURRENT_QUIZ,
    });
  };
};

export const updateQuiz = (_id, update) => {
  console.log("update quiz action");
  console.log(update);
  return (dispatch) => {
    console.log("making axios call");
    axios
      .post("http://localhost:5000/updateQuiz", { _id, update })
      .then(() => {
        console.log("got response from server - now sending dispatch");
        dispatch({
          type: UPDATE_QUIZ,
          payload: update,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const createQuiz = (quizName, quizSubject) => {
  return (dispatch) => {
    const token = store.getState().auth.token;
    axios
      .post(
        "http://localhost:5000/createQuiz",
        { quizName, quizSubject },
        tokenConfig(token)
      )
      .then((res) => {
        dispatch({
          type: CREATE_QUIZ,
          payload: {
            quizName,
            quizSubject,
            _id: res.data._id,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
