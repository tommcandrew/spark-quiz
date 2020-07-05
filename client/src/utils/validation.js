export const registerValidation = {
  name: "required|string|min:2|max:30",
  email: "required|email|max:50",
  password: "required|string|min:2|max:30",
  password2: `required|string|min:2|max:30`,
};

export const loginValidation = {
  email: "required|email|max:50",
  password: "required|string|min:2|max:30",
};

export const studentLoginValidation = {
  code: "required|string|min:1",
};

export const createQuizValidation = {
  quizName: "required|string|min:2|max:15",
  quizSubject: "required|string|min:2|max:15",
};

export const quizOptionsValidation = {
  points: "required|number|between:1,10",
};
