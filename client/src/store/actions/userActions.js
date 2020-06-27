import axios from "axios";
import { tokenConfig } from "./authActions";
import { loadUser } from "./authActions";
export const FETCH_QUIZZES = "FETCH_QUIZZES";
export const ADD_QUIZ = "ADD_QUIZ";
export const DELETE_QUIZ = "DELETE_QUIZ";
export const ADD_CONTACT = "ADD_CONTACT";
export const ADD_GROUP = "ADD_GROUP";

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

export const addContact = (contact) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    return axios
      .post("http://localhost:5000/addContact", { contact }, tokenConfig(token))
      .then(() => {
        dispatch({
          type: ADD_CONTACT,
          payload: contact,
        });
        dispatch(loadUser());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteContact = (contactId) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    return axios
      .post(
        "http://localhost:5000/deleteContact",
        { contactId },
        tokenConfig(token)
      )
      .then(() => {
        dispatch(loadUser());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteGroup = (groupId) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    return axios
      .post(
        "http://localhost:5000/deleteGroup",
        { groupId },
        tokenConfig(token)
      )
      .then(() => {
        dispatch(loadUser());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateContact = (contactId, updatedContact) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    return axios
      .post(
        "http://localhost:5000/updateContact",
        { contactId, updatedContact },
        tokenConfig(token)
      )
      .then(() => {
        dispatch(loadUser());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addGroup = (group) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    return axios
      .post("http://localhost:5000/addGroup", { group }, tokenConfig(token))
      .then(() => {
        dispatch({
          type: ADD_GROUP,
          payload: group,
        });
        dispatch(loadUser());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteMember = (groupId, memberId) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    return axios
      .post(
        "http://localhost:5000/deleteMember",
        { groupId, memberId },
        tokenConfig(token)
      )
      .then(() => {
        dispatch(loadUser());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateGroup = (groupId, membersToAdd) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    return axios
      .post(
        "http://localhost:5000/updateGroup",
        { groupId, membersToAdd },
        tokenConfig(token)
      )
      .then(() => {
        dispatch(loadUser());
      })
      .catch((err) => {
        console.log(err);
      });
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
