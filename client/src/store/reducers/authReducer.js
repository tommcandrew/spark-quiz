import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  STUDENT_LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_STUDENT,
  SET_CURRENT_QUIZ_IN_LS,
  CLEAR_QUIZ_FROM_LS,
} from "../actions/authActions";

const initialState = {
  token: localStorage.getItem("token"),
  quizId: localStorage.getItem("quizId"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  role: "",
  studentToken: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", "teacher");
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
      };
    case STUDENT_LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
        studentToken: action.payload.token,
      };
    case CLEAR_STUDENT:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("quizId");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        studentToken: "",
      };
    case SET_CURRENT_QUIZ_IN_LS:
      localStorage.setItem("quizId", action.quizId);
      return state;
    case CLEAR_QUIZ_FROM_LS:
      localStorage.removeItem("quizId");
      return state;
    default:
      return state;
  }
}
