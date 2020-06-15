import axios from "axios";
import { tokenConfig } from "./authActions";
import { store } from "../../App";

export const ADD_NEW_QUESTION = "ADD_NEW_QUESTION";
export const DELETE_QUESTION = "DELETE_QUESTION";
export const CREATE_QUIZ = "CREATE_QUIZ";

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
            quizId: res.data.quizId,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
