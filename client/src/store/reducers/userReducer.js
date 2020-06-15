const initalState = {
  name: "Nildeniz",
  quizzes: [],
};

//changing cases to strings because of strange error
export default (state = initalState, action) => {
  switch (action.type) {
    case "ADD_QUIZ":
      return { ...state, quizzes: [...state.quizzes, action.payload] };
    case "FETCH_QUIZZES":
      return { ...state, quizzes: [...action.payload] };
    case "DELETE_QUIZ":
      return {
        ...state,
        quizzes: state.quizzes.filter((quiz) => quiz._id !== action.payload),
      };
    default:
      return state;
  }
};
