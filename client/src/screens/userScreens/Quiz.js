import React, { useState } from "react";
import QuizOption from "../../components/UI/QuizOption";
import gsap from "gsap";
import "./Quiz.css";

//real questions will come from props
import questions from "./questions";

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const prepareNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedOption(null);
  };

  const tl = gsap.timeline();

  const handleClick = (optionIndex, isCorrect) => {
    setSelectedOption(optionIndex);
    if (isCorrect) {
      setScore(score + 1);
    }
    //do nothing is animation is playing
    if (tl.isActive()) {
      return;
    }
    //slide both question and options out of view to left
    tl.to(
      [".quiz__question", ".quiz__options"],
      0.5,
      {
        x: "-100vw",
        opacity: 0,
        ease: "Power4.easeIn",
        onComplete: prepareNext,
      },
      "+=0.8"
    );
    //return question and options elements to original position (not visible)
    tl.to([".quiz__question", ".quiz__options"], 0, {
      x: 0,
    });
    //and fade them in
    tl.to(
      [".quiz__question", ".quiz__options"],
      1,
      {
        opacity: 1,
        ease: "Power1.easeOut",
      },
      ">+0.3"
    );
  };

  return (
    <div className="quiz__wrapper">
      <div className="quiz__content">
        <div className="quiz__question">
          {questions[currentQuestionIndex] ? (
            questions[currentQuestionIndex].question
          ) : (
            <>
              <h2>End of Quiz</h2>
              <p>
                Score: {score}/{questions.length}
              </p>
            </>
          )}
        </div>
        <div className="quiz__options">
          {questions[currentQuestionIndex] &&
            questions[currentQuestionIndex].options.map((option, index) => (
              <QuizOption
                option={option}
                handleClick={handleClick}
                key={option.text}
                optionIndex={index}
                selectedOption={selectedOption}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
