import React, { useEffect, useState } from "react";
import gsap from "gsap";
import questions from "./questions";
import "./Quiz.css";
import QuizOption from "../../components/UI/QuizOption";

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const tl = gsap.timeline();

  const handleClick = () => {
    tl.to([".quiz__question", ".quiz__options"], 0.5, {
      x: "-100vw",
      opacity: 0,
      ease: "Power4.easeIn",
      onComplete: () => setCurrentQuestionIndex(currentQuestionIndex + 1),
    });
    tl.to([".quiz__question", ".quiz__options"], 0, {
      x: 0,
    });
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
          {questions[currentQuestionIndex].question}
        </div>
        <div className="quiz__options">
          {questions[currentQuestionIndex].options.map((option) => (
            <QuizOption option={option} />
          ))}
        </div>
      </div>
      <button onClick={handleClick}>Next</button>
    </div>
  );
};

export default Quiz;
