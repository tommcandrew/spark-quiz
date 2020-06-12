import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as questionActions from '../../store/actions/newQuiz'

const PreviewQuestions = (props) => {
    const dispatch = useDispatch()
    const questions = useSelector(state => state.newQuiz.quizQuestions);
    
    if (questions.length < 1) return <p>Add some question</p>;
    
     const editQuestionHandler = (id) => {
        props.editQuestion(id)
     }

    const deleteQuestionHandler = (id) => {
         dispatch(questionActions.deleteQuestion(id))
    }

  return (
    <div>
      below items are to be made clickable
      <ul className="question-list">
        {questions.map(q => {
          return (
              <li key={q.id} className="list-item">
              <p>Question Type: {q.questionType}</p>
              <p>Question: {q.question}</p>
              {q.questionType === 'trueFalse'
                ? <p>correct answer is {q.answers.trueFalseAnswer}</p>
                : <div>
                    Options:
                    {q.answers.multipleChoiceOptions.map ((option, i) => (
                      <p key ={i}>-{option}</p>
                    ))}
                  <p>correct answer: {q.answers.multipleChoiceAnswer}</p>
                  </div>
              }
                 
              <button onClick={() => deleteQuestionHandler(q.id)}>delete</button>
              <button onClick= {()=> editQuestionHandler(q.id)}>edit</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default PreviewQuestions;
