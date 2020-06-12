export const ADD_NEW_QUESTION = 'ADD_NEW_QUESTION';
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const MAKE_QUIZ = 'MAKE_QUIZ'

export const addNewQuestion = (questionData) => {
  return {
    type: ADD_NEW_QUESTION,
    question: questionData
    
  };
};

export const deleteQuestion = (id) => {
  return {
    type: DELETE_QUESTION,
    id: id
  }
}

export const makeQuiz = (quizData) => {
  return {
    type: MAKE_QUIZ,
    quiz: quizData
  }
}


 
