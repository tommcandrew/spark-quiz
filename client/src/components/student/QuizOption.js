import React from "react";

const QuizOption = ({ option, handleClick, optionIndex, selectedOption }) => {
  return (
    <div
      className={`quizOption ${
        selectedOption === optionIndex ? "quizOption__selected" : ""
      }`}
      onClick={() => handleClick(optionIndex, option.isCorrect)}
    >
      {option}
    </div>
  );
};

export default QuizOption;
