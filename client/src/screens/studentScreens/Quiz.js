import React, { useState, useEffect, useRef } from "react";
import QuizOption from "../../components/student/QuizOption";
import "./Quiz.css";
import QuizTimer from "../../components/student/QuizTimer";
import { useDispatch, useSelector } from "react-redux";
import QuizMedia from "../../components/student/QuizMedia";
import * as quizActions from "../../store/actions/quizActions";
import QuizStart from "./QuizStart";
import { animateNextQuestion } from "./QuizAnimations";

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
  const [quizStarted, setQuizStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  //make a nicer notification
  useEffect(() => {
    if (timeUp) {
      alert("Time's up!");
      return;
    }
  }, [timeUp]);

  const prepareNext = () => {
    if (currentQuestionIndex === quiz.quizQuestions.length - 1) {
      setFinished(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    }
  };

  const handleClick = (optionIndex, isCorrect) => {
    if (timeUp) return;
    setSelectedOption(optionIndex);
    if (isCorrect) {
      setScore(score + 1);
    }
    animateNextQuestion(prepareNext);
  };

  return (
    <div className="quiz__wrapper">
      {quiz.quizQuestions && quiz.quizQuestions.length === 0 && (
        <h1>No quiz in state.</h1>
      )}
      {!quizStarted && (
        <QuizStart quiz={quiz} setQuizStarted={setQuizStarted} />
      )}

      {quizStarted && quiz.quizQuestions && quiz.quizQuestions.length > 0 && (
        <>
          <div className="quiz__info">
            <div className="quiz__progress">
              Question {currentQuestionIndex + 1}/{quiz.quizQuestions.length}
            </div>
            {!finished && (
              <QuizTimer seconds={timeLimit} setTimeUp={setTimeUp} />
            )}
          </div>
          <div className="quiz__content">
            <div className="quiz__question">
              {!finished &&
                quiz.quizQuestions[currentQuestionIndex].media.length > 0 &&
                quiz.quizQuestions[currentQuestionIndex].media.map(
                  (media, index) => (
                    <div className="quiz__medias" key={index}>
                      <QuizMedia media={media} />
                    </div>
                  )
                )}
              {!finished ? (
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
              {!finished &&
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
              {!finished &&
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
