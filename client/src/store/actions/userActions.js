import axios from "axios";
import { tokenConfig, loadUser } from "./authActions";
import { loading, loaded, returnErrors } from "./errorActions";
export const FETCH_QUIZZES = "FETCH_QUIZZES";
export const ADD_QUIZ = "ADD_QUIZ";
export const DELETE_QUIZ = "DELETE_QUIZ";
export const ADD_CONTACT = "ADD_CONTACT";
export const ADD_GROUP = "ADD_GROUP";

export const fetchQuizzes = () => {
	return (dispatch, getState) => {
		const token = getState().auth.token;
		dispatch(loading("Fetching quizzes"));
		axios
			.get("https://sparkquiz-backend.herokuapp.com/quiz/fetchQuizzes", tokenConfig(token))
			.then((res) => {
				console.log(res);
				dispatch(loaded());
				dispatch({
					type: FETCH_QUIZZES,
					payload: res.data.quizzes
				});
			})
			.catch((err) => {
				dispatch(loaded());
				if (!err.response) {
					dispatch(returnErrors({ msg: "Server is down. Please try again later" }, 500, "SERVER_ERROR"));
				} else {
					dispatch(returnErrors(err.response.data, err.response.status, "FETCHING_QUIZZES_FAIL"));
				}
			});
	};
};

export const addQuiz = (_id, quizName, quizSubject, quizPublished) => {
	return {
		type: ADD_QUIZ,
		payload: {
			_id,
			quizName,
			quizSubject,
			quizPublished
		}
	};
};

export const addContact = (contact) => {
	return (dispatch, getState) => {
		dispatch(loading("Adding Student"));
		const token = getState().auth.token;
		return axios
			.post("https://sparkquiz-backend.herokuapp.com/user/addContact", { contact }, tokenConfig(token))
			.then(() => {
				dispatch({
					type: ADD_CONTACT,
					payload: contact
				});
				dispatch(loadUser());
				dispatch(loaded());
			})
			.catch((err) => {
				dispatch(loaded());
				if (!err.response) {
					dispatch(returnErrors({ msg: "Server is down. Please try again later" }, 500, "SERVER_ERROR"));
				} else {
					dispatch(returnErrors(err.response.data, err.response.status, "CONTACT_UPLOAD_FAIL"));
				}
			});
	};
};

export const deleteContact = (contactId) => {
	return (dispatch, getState) => {
		const token = getState().auth.token;
		dispatch(loading("Deleting contact"));
		return axios
			.post("https://sparkquiz-backend.herokuapp.com/user/deleteContact", { contactId }, tokenConfig(token))
			.then(() => {
				dispatch(loadUser());
				dispatch(loaded());
			})
			.catch((err) => {
				dispatch(loaded());
				if (!err.response) {
					dispatch(returnErrors({ msg: "Server is down. Please try again later" }, 500, "SERVER_ERROR"));
				} else {
					dispatch(returnErrors(err.response.data, err.response.status, "DELETE_CONTACT_FAIL"));
				}
			});
	};
};

export const deleteGroup = (groupId) => {
	return (dispatch, getState) => {
		const token = getState().auth.token;
		dispatch(loading("Deleting group"));
		return axios
			.post("https://sparkquiz-backend.herokuapp.com/user/deleteGroup", { groupId }, tokenConfig(token))
			.then(() => {
				dispatch(loadUser());
				dispatch(loaded());
			})
			.catch((err) => {
				dispatch(loaded());
				if (!err.response) {
					dispatch(returnErrors({ msg: "Server is down. Please try again later" }, 500, "SERVER_ERROR"));
				} else {
					dispatch(returnErrors(err.response.data, err.response.status, "DELETE_GROUP_FAIL"));
				}
			});
	};
};

export const updateContact = (contactId, updatedContact) => {
	return (dispatch, getState) => {
		dispatch(loading("Updating contact"));
		const token = getState().auth.token;
		return axios
			.post(
				"https://sparkquiz-backend.herokuapp.com/user/updateContact",
				{ contactId, updatedContact },
				tokenConfig(token)
			)
			.then(() => {
				dispatch(loadUser());
				dispatch(loaded());
			})
			.catch((err) => {
				dispatch(loaded());
				if (!err.response) {
					dispatch(returnErrors({ msg: "Server is down. Please try again later" }, 500, "SERVER_ERROR"));
				} else {
					dispatch(returnErrors(err.response.data, err.response.status, "UDPDATE_CONTACT_FAIL"));
				}
			});
	};
};

export const addGroup = (group) => {
	return (dispatch, getState) => {
		const token = getState().auth.token;
		return axios
			.post("https://sparkquiz-backend.herokuapp.com/user/addGroup", { group }, tokenConfig(token))
			.then(() => {
				dispatch({
					type: ADD_GROUP,
					payload: group
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
				"https://sparkquiz-backend.herokuapp.com/user/deleteMember",
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

export const updateGroup = (groupId, groupName, members) => {
	return (dispatch, getState) => {
		dispatch(loading("Updating group"));
		const token = getState().auth.token;
		return axios
			.post(
				"https://sparkquiz-backend.herokuapp.com/user/updateGroup",
				{ groupId, groupName, members },
				tokenConfig(token)
			)
			.then(() => {
				dispatch(loadUser());
				dispatch(loaded());
			})
			.catch((err) => {
				dispatch(loaded());
				if (!err.response) {
					dispatch(returnErrors({ msg: "Server is down. Please try again later" }, 500, "SERVER_ERROR"));
				} else {
					dispatch(returnErrors(err.response.data, err.response.status, "UPDATE_GROUP_FAIL"));
				}
			});
	};
};

export const deleteQuiz = (id) => {
	return (dispatch, getState) => {
		dispatch(loading("Deleting quiz"));
		const token = getState().auth.token;

		return axios
			.post("https://sparkquiz-backend.herokuapp.com/quiz/deleteQuiz", { _id: id }, tokenConfig(token))
			.then(() => {
				dispatch({
					type: DELETE_QUIZ,
					payload: id
				});
				dispatch(loaded());
			})
			.catch((err) => {
				dispatch(loaded());
				if (!err.response) {
					dispatch(returnErrors({ msg: "Server is down. Please try again later" }, 500, "SERVER_ERROR"));
				} else {
					dispatch(returnErrors(err.response.data, err.response.status, "DELETE_FAILED"));
				}
			});
	};
};
