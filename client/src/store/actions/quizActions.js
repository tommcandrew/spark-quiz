import axios from "axios";
// import { returnErrors, clearErrors } from "../actions/errorActions";
import { tokenConfig } from "./authActions";
export const ADD_NEW_QUESTION = "ADD_NEW_QUESTION";
export const DELETE_QUESTION = "DELETE_QUESTION";
export const CREATE_QUIZ = "CREATE_QUIZ";
export const FETCH_QUIZZES = "FETCH_QUIZZES";
export const ADD_QUIZ = "ADD_QUIZ";
export const SET_CURRENT_QUIZ = "SET_CURRENT_QUIZ";
export const CLEAR_CURRENT_QUIZ = "CLEAR_CURRENT_QUIZ";
export const ADD_TIME_LIMIT = "ADD_TIME_LIMIT";
export const UPDATE_QUIZ = "UPDATE_QUIZ";
export const FETCH_QUIZ = "FETCH_QUIZ";
export const PUBLISH_QUIZ = "PUBLISH_QUIZ";

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
  //no back end call made
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
  return (dispatch) => {
    axios
      .post("http://localhost:5000/updateQuiz", { _id, update })
      .then(() => {
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
  return (dispatch, getState) => {
    const token = getState().auth.token;
    return axios
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
        setCurrentQuiz(res.data._id, quizName, quizSubject, []);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchQuiz = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    return axios
      .get("http://localhost:5000/fetchQuiz", tokenConfig(token))
      .then((res) => {
        dispatch({
          type: SET_CURRENT_QUIZ,
          payload: res.data.quiz,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const publishQuiz = (quizId) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    return axios
      .post("http://localhost:5000/publishQuiz", { quizId }, tokenConfig(token))
      .then((res) => {
        clearCurrentQuiz();
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
