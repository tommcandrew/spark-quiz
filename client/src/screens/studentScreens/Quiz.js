import React, { useState, useEffect, useRef } from "react";
import QuizOption from "../../components/student/QuizOption";
import gsap from "gsap";
import "./Quiz.css";
import QuizTimer from "../../components/student/QuizTimer";
import { useDispatch, useSelector } from "react-redux";
import QuizMedia from "../../components/student/QuizMedia";
import * as quizActions from "../../store/actions/quizActions";

const Quiz = () => {
  const dispatch = useDispatch();

  //fetch quiz again from DB if page is refreshed
  useEffect(() => {
    if (quiz.quizQuestions.length === 0) {
      dispatch(quizActions.fetchQuiz());
    }
  });

  const quiz = useSelector((state) => state.quiz);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeUp, setTimeUp] = useState(false);
  const timeLimit = 0.5 * 60;

  useEffect(() => {
    if (timeUp) {
      alert("Time's up!");
      return;
    }
  }, [timeUp]);

  const prepareNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedOption(null);
  };

  const tl = gsap.timeline();

  const handleClick = (optionIndex, isCorrect) => {
    if (timeUp) return;
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
      {quiz.quizQuestions && quiz.quizQuestions.length === 0 && (
        <h1>No quiz in state.</h1>
      )}
      {quiz.quizQuestions && quiz.quizQuestions.length > 0 && (
        <>
          <div className="quiz__info">
            <div className="quiz__progress">
              Question {currentQuestionIndex + 1}/{quiz.quizQuestions.length}
            </div>
            {/* <QuizTimer seconds={timeLimit} setTimeUp={setTimeUp} /> */}
          </div>
          <div className="quiz__content">
            <div className="quiz__question">
              {quiz.quizQuestions[currentQuestionIndex].media.length > 0 &&
                quiz.quizQuestions[
                  currentQuestionIndex
                ].media.map((media, index) => (
                  <QuizMedia media={media} index={index} />
                ))}
              {quiz.quizQuestions[currentQuestionIndex] ? (
                quiz.quizQuestions[currentQuestionIndex].question
              ) : (
                <>
                  <h2>End of Quiz</h2>
                  <p>
                    Score: {score}/{quiz.quizQuestions.length}
                  </p>
                </>
              )}
            </div>
            <div className="quiz__options">
              {quiz.quizQuestions[currentQuestionIndex] &&
                quiz.quizQuestions[currentQuestionIndex].questionType ===
                  "multipleChoice" &&
                quiz.quizQuestions[
                  currentQuestionIndex
                ].answers.multipleChoiceOptions.map((option, index) => (
                  <QuizOption
                    option={option}
                    handleClick={handleClick}
                    key={option}
                    optionIndex={index}
                    selectedOption={selectedOption}
                  />
                ))}
              {quiz.quizQuestions[currentQuestionIndex] &&
                quiz.quizQuestions[currentQuestionIndex].questionType ===
                  "trueFalse" && (
                  <>
                    <button>True</button>
                    <button>False</button>
                  </>
                )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
