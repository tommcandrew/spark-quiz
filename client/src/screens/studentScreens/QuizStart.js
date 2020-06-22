import React from "react";
import "./QuizStart.css";

//this component is rendered as a child of Quiz
const QuizStart = ({ quiz, setInProgress }) => {
  return (
    <div className="quizStart__wrapper">
      <div className="quizStart__header">
        <h1>{quiz.quizName}</h1>
      </div>
      <div className="quizStart__content">
        <div className="quizStart__info">
          <ul>
            <li>Author: Mr. Pearce</li>
            <li>Subject: {quiz.quizSubject}</li>
            <li>Time limit: {quiz.quizTimeLimit}</li>
            <button onClick={() => setInProgress(true)}>Start Quiz</button>
          </ul>
        </div>
        <div className="quizStart__scores">
          <div className="quizStart__table-wrapper">
            <h1>Scores</h1>
            <table>
              <thead>
                <th>Name</th>
                <th>Score</th>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizStart;
