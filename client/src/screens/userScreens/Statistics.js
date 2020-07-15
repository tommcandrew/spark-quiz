import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Statistics = () => {
  const quiz = useSelector((state) => state.quiz);

  return (
    <div>
      <h1>Statistics</h1>
      <h2>{quiz.quizName}</h2>
    </div>
  );
};

export default Statistics;
