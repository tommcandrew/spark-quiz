import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as quizActions from "../../store/actions/quizActions";

const PreviewQuestions = (props) => {
  const dispatch = useDispatch();
  const quiz = useSelector((state) => state.quiz);

  const editQuestionHandler = (id) => {
    props.editQuestion(id);
  };

  const deleteQuestionHandler = (id) => {
    dispatch(quizActions.deleteQuestion(id));
  };

  return (
    <div>
      <h1>
        {quiz.quizName} ({quiz.quizSubject})
      </h1>
      {!quiz.quizQuestions ||
        (quiz.quizQuestions.length === 0 && <p>Add some question</p>)}
      {quiz.quizQuestions.length > 0 && (
        <ul className="question-list">
          {quiz.quizQuestions &&
            quiz.quizQuestions.length > 0 &&
            quiz.quizQuestions.map((question, index) => {
              //do we want to display attached media here?
              return (
                <li key={index} className="list-item">
                  <p>Question Type: {question.questionType}</p>
                  <p>Question: {question.question}</p>
                  {question.questionType === "trueFalse" ? (
                    <p>correct answer is {question.answers.trueFalseAnswer}</p>
                  ) : (
                    <div>
                      Options:
                      {question.answers.multipleChoiceOptions.map(
                        (option, i) => (
                          <p key={i}>-{option}</p>
                        )
                      )}
                      <p>
                        correct answer: {question.answers.multipleChoiceAnswer}
                      </p>
                    </div>
                  )}

                  <button onClick={() => deleteQuestionHandler(question.id)}>
                    delete
                  </button>
                  <button onClick={() => editQuestionHandler(question.id)}>
                    edit
                  </button>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};
export default PreviewQuestions;
