import React from "react";

const QuizOption = ({ option, handleClick }) => {
  return (
    <div
      className="quizOption__wrapper"
      onClick={() => handleClick(option.isCorrect)}
    >
      {option.text}
    </div>
  );
};

export default QuizOption;
