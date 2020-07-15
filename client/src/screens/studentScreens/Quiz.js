import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as quizActions from "../../store/actions/quizActions";
import * as quizScoreActions from "../../store/actions/quizScoreActions";
import QuizStart from "./QuizStart";
import QuizOption from "../../components/student/QuizOption";
import QuizTimer from "../../components/student/QuizTimer";
import QuizMedia from "../../components/student/QuizMedia";
import { animateNextQuestion } from "./QuizAnimations";
import Finish from "./Finish";
import "./Quiz.css";

const Quiz = ({ history }) => {
  const dispatch = useDispatch();

  const quiz = useSelector((state) => state.quiz);
  const quizPointsSystem = quiz.quizPointsSystem;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeUp, setTimeUp] = useState(false);
  const [timeLimit, setTimeLimit] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (quiz.timeLimit) {
      setTimeLimit(parseInt(quiz.timeLimit) * 60);
    }
  });

  //make a nicer notification
  useEffect(() => {
    if (timeUp) {
      alert("Time's up!");
      setFinished(true);
      return;
    }
  }, [timeUp]);

  useEffect(() => {
    async function fetchData() {
      if (finished) {
        await dispatch(quizScoreActions.finishQuiz());
        await dispatch(quizActions.clearCurrentQuiz());
      }
    }
    fetchData();
  }, [finished, dispatch]); // Or [] if effect doesn't need props or state

  const goToNextQuestion = () => {
    if (currentQuestionIndex === quiz.quizQuestions.length - 1) {
      console.log("finished");
      setFinished(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    }
  };

  const handleClick = async (optionIndex, isCorrect) => {
    if (timeUp) return;
    setSelectedOption(optionIndex);

    await dispatch(
      quizScoreActions.setQuestionAnswer(currentQuestionIndex + 1, isCorrect)
    );
    if (isCorrect) {
      if (quizPointsSystem === "overall") {
        dispatch(quizScoreActions.setOverallScore(quiz.quizOverallPoints));
      }
      if (quizPointsSystem === "eachQuestion") {
        dispatch(
          quizScoreActions.setOverallScore(
            quiz.quizQuestions[currentQuestionIndex].points
          )
        );
      }
    }
    animateNextQuestion(goToNextQuestion);
  };

  return (
    <div className="quiz__wrapper">
      {!quizStarted && (
        <QuizStart quiz={quiz} setQuizStarted={setQuizStarted} />
      )}

      {quizStarted && (
        <Fragment>
          {finished && <Finish history={history} quiz={quiz} />}
          {!finished && quiz.quizQuestions.length > 0 && (
            <div className="quiz__content">
              <div className="quiz__info">
                <div className="quiz__progress">
                  Question {currentQuestionIndex + 1}/
                  {quiz.quizQuestions.length}
                </div>
                {timeLimit && (
                  <QuizTimer seconds={timeLimit} setTimeUp={setTimeUp} />
                )}
              </div>

              <div className="quiz__questionContent">
                {quiz.quizQuestions[currentQuestionIndex].media.length > 0 &&
                  quiz.quizQuestions[currentQuestionIndex].media.map(
                    (media, index) => (
                      <div className="quiz__medias" key={index}>
                        <QuizMedia media={media} />
                      </div>
                    )
                  )}

                <div className="quiz__question">
                  {quiz.quizQuestions[currentQuestionIndex].question}
                </div>

                <div className="quiz__options">
                  {quiz.quizQuestions[currentQuestionIndex].questionType ===
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
                        isCorrect={
                          index.toString() ===
                          quiz.quizQuestions[currentQuestionIndex].answers
                            .multipleChoiceAnswer
                        }
                      />
                    ))}

                  {quiz.quizQuestions[currentQuestionIndex].questionType ===
                    "trueFalse" && (
                    <div className="quiz__buttons">
                      <button
                        onClick={() =>
                          handleClick(
                            null,
                            quiz.quizQuestions[currentQuestionIndex].answers
                              .trueFalseAnswer === "true"
                          )
                        }
                      >
                        True
                      </button>
                      <button
                        onClick={() =>
                          handleClick(
                            null,
                            quiz.quizQuestions[currentQuestionIndex].answers
                              .trueFalseAnswer === "false"
                          )
                        }
                      >
                        False
                      </button>
                    </div>
                  )}
                  {quizPointsSystem === "overall" && (
                    <h5>points: {quiz.quizOverallPoints}</h5>
                  )}
                  {quizPointsSystem === "eachQuestion" && (
                    <h5>
                      points: {quiz.quizQuestions[currentQuestionIndex].points}{" "}
                    </h5>
                  )}
                </div>
              </div>
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Quiz;
