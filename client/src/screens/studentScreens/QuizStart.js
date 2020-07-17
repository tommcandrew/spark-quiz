import React from "react";
import "./QuizStart.css";
import { Button } from "@material-ui/core";
import * as authActions from "../../store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";

//this component is rendered as a child of Quiz
const QuizStart = ({ setQuizStarted, quizTaken, history }) => {
  const quiz = useSelector((state) => state.quiz);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.push("/");
  };

  return (
    <div className="quizStart__wrapper">
      <div className="quizStart__header">
        <h1>Quiz Name: {quiz.quizName}</h1>
        <Button color="inherit" onClick={logoutHandler}>
          Logout
        </Button>
      </div>
      <div className="quizStart__content">
        <div className="quizStart__info">
          <ul>
            <li>Author: {quiz.quizAuthor}</li>
            <li>Subject: {quiz.quizSubject}</li>
            <li>Time limit: {quiz.quizTimeLimit || "none"}</li>
            {!quizTaken && (
              <button onClick={() => setQuizStarted(true)}>Start Quiz</button>
            )}
          </ul>
        </div>
        <div className="quizStart__scores">
          {quizTaken && <h5>You have already taken this quiz.</h5>}
          {quiz.quizPointsSystem && (
            <div className="quizStart__table-wrapper">
              <h1>Scores</h1>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Score</th>
                    <th>Completed</th>
                  </tr>
                </thead>
                <tbody>
                  {quiz.quizScores.map((scoreObj, index) => (
                    <tr key={index}>
                      <td>
                        {scoreObj.studentName
                          ? scoreObj.studentName
                          : "Anonymous"}
                      </td>
                      <td>{scoreObj.overallScore}</td>
                      <td>{new Date(scoreObj.completedAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizStart;
