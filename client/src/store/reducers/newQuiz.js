import { ADD_NEW_QUESTION, DELETE_QUESTION } from '../actions/newQuiz'


const initalState = {
    quizQuestions: []
}

export default (state = initalState, action) => {
    switch (action.type) {
        case ADD_NEW_QUESTION: 
            return {
               ...state, 
                quizQuestions : state.quizQuestions.concat(action.question)
            }
        case DELETE_QUESTION: 
            return {
                ...state,
                quizQuestions: state.quizQuestions.filter(
                    question => question.id !== action.id
                )
            }
<<<<<<< Updated upstream
        
=======
        default: 
            return state
>>>>>>> Stashed changes
            
    }
     return state;
}

