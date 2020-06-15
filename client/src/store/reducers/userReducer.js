const initalState = {
  name: "Nildeniz",
  quizzes: [],
};

//changing cases to strings because of strange error
export default (state = initalState, action) => {
  switch (action.type) {
    case "ADD_QUIZ":
      console.log("adding quiz to user's state");
      return { ...state, quizzes: [...state.quizzes, action.payload] };
    case "FETCH_QUIZZES":
      return { ...state, quizzes: [...action.payload] };
    default:
      return state;
  }
};
