import { ADD_NEW_QUESTION } from '../actions/newQuiz'

const initalState = {
    quizQuestions: []
}

export default (state = initalState, action) => {
    switch (action.type) {
        case ADD_NEW_QUESTION: 
            return {
               ...state, 
                ququizQuestions : state.quizQuestions.push(action.question)
            }
            
    }
     return state;
}

