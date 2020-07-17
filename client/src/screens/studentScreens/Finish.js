import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as quizScoreActions from "../../store/actions/quizScoreActions";

const Finish = ({ quiz, history, timeTaken, setQuizStarted }) => {
  const dispatch = useDispatch();
  const score = useSelector((state) => state.score.overallScore);
  const [name, setName] = useState("");

  const doneHandler = async () => {
    dispatch(quizScoreActions.finishQuiz(timeTaken, name));
    //to redirect to QuizStart (not an ideal method)
    setQuizStarted(false);
  };
  return (
    <>
      <h2>End of Quiz</h2>
      <p>Score: {score}</p>
      <div>
        <h3>
          Enter your name if you would like it to appear on the scoreboard:
        </h3>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button onClick={doneHandler}>Done</button>
    </>
  );
};

export default Finish;
