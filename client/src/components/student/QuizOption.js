import React from "react";

const QuizOption = ({
  option,
  handleClick,
  optionIndex,
  selectedOption,
  isCorrect,
}) => {
  return (
    <div
      className={`quizOption ${
        selectedOption === optionIndex ? "quizOption__selected" : ""
      }`}
      onClick={() => handleClick(optionIndex, isCorrect)}
    >
      {option}
    </div>
  );
};

export default QuizOption;
