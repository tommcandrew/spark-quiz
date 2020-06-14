import axios from "axios";
import { tokenConfig } from "./authActions";
import { store } from "../../App";

export const ADD_NEW_QUESTION = "ADD_NEW_QUESTION";
export const DELETE_QUESTION = "DELETE_QUESTION";
export const CREATE_QUIZ = "CREATE_QUIZ";

export const addNewQuestion = (questionData) => {
  axios
    .post("/addQuestion", {})
    .then(() => {
      return {
        type: ADD_NEW_QUESTION,
        question: questionData,
      };
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteQuestion = (id) => {
  return {
    type: DELETE_QUESTION,
    id: id,
  };
};

export const createQuiz = (quizName, quizSubject) => {
  console.log("create quiz action");
  console.log(quizName, quizSubject);
  return async (dispatch, getState) => {
    console.log("making axios call");
    console.log(store.getState());
    return;
    axios
      .post(
        "http://localhost:5000/createQuiz",
        { quizName, quizSubject }
        // tokenConfig(getState)
      )
      .then(() => {
        console.log(
          "got response from server - now dispatching action to reducer"
        );
        return {
          type: CREATE_QUIZ,
          payload: {
            quizName,
            quizSubject,
          },
        };
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
