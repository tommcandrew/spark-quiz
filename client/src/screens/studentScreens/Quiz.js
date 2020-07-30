import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as quizActions from "../../store/actions/quizActions";
import * as authActions from "../../store/actions/authActions"
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
	var timeLimit;
	if (quiz.quizStarted) {
		var d = new Date(); //todays date
		var date = new Date(quiz.quizStarted.toString()) //when the quiz was created
		var timeTaken = d.getTime() - date.getTime() //how much time has passed since the quiz started
		timeLimit = parseInt(quiz.quizTimeLimit * 60 - timeTaken/1000) 
	} else timeLimit = parseInt(quiz.quizTimeLimit) * 60;
	
	
	const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0);
	const [ selectedOption, setSelectedOption ] = useState(null);
	const [ timeUp, setTimeUp ] = useState(false);
	
	const [ quizStarted, setQuizStarted ] = useState(false);
	const [finished, setFinished] = useState(false);

	
	const getQuiz = async () => {
		if (quiz._id === "" && !finished){
		console.log("function in use effect running")
    await dispatch(authActions.studentReload());}
  };
	useEffect(() => {
     getQuiz();
  }, [finished]);

	//make a nicer notification
	useEffect(
		() => {
			if (timeUp) {
				alert("Time's up!");
				setFinished(true);
				return;
			}
		},
		[ timeUp ]
	);

	useEffect(
		() => {
			 async function fetchData() {
				 if (finished) {
					console.log("in finished")
					 await dispatch(quizScoreActions.finishQuiz());
					 await dispatch(quizActions.clearCurrentQuiz());
					 await await dispatch(authActions.clearStudent());
				}
			}
			fetchData();
		},
		[finished ]
	); // Or [] if effect doesn't need props or state

	const goToNextQuestion = () => {
		if (currentQuestionIndex === quiz.quizQuestions.length - 1) {
			setFinished(true);
		} else {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
			setSelectedOption(null);
		}
	};

	const handleClick = async (optionIndex, isCorrect) => {
		if (timeUp) return;
		setSelectedOption(optionIndex);

		await dispatch(quizScoreActions.setQuestionAnswer(isCorrect));
		if (isCorrect) {
			if (quizPointsSystem === "overall") {
				await dispatch(quizScoreActions.setOverallScore(quiz.quizOverallPoints));
			}
			if (quizPointsSystem === "eachQuestion") {
				await dispatch(quizScoreActions.setOverallScore(quiz.quizQuestions[currentQuestionIndex].points));
			}
		}
		animateNextQuestion(goToNextQuestion);
	};

	return (
		<div className="quiz__wrapper">
			{quiz.quizQuestions.length === 0 && <h1>No quiz in state.</h1>}

			{!quizStarted && <QuizStart quiz={quiz} setQuizStarted={setQuizStarted} />}

			{quizStarted && (
				<Fragment>
					{finished && <Finish history={history} quiz={quiz} />}
					{!finished &&
						<div className="quiz__content">
							<div className="quiz__info">
								<div className="quiz__progress">
									Question {currentQuestionIndex + 1 + quiz.quizLastQuestionNumber}/
									{quiz.quizTotalQuestions}
								</div>
								{quiz.quizTimeLimit !=="false" &&
								<QuizTimer seconds={timeLimit} setTimeUp={setTimeUp} />
								}
							</div>

							<div className="quiz__questionContent">
								{quiz.quizQuestions[currentQuestionIndex].media.length > 0 &&
									quiz.quizQuestions[currentQuestionIndex].media.map((media, index) => (
										<div className="quiz__medias" key={index}>
											<QuizMedia media={media} />
										</div>
									))}

								<div className="quiz__question">
									{quiz.quizQuestions[currentQuestionIndex].question}
								</div>

								<div className="quiz__options">
									{quiz.quizQuestions[currentQuestionIndex].questionType === "multipleChoice" &&
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

									{quiz.quizQuestions[currentQuestionIndex].questionType === "trueFalse" && (
										<div className="quiz__buttons">
											<button
												onClick={() =>
													handleClick(
														null,
														quiz.quizQuestions[currentQuestionIndex].answers
															.trueFalseAnswer === "true"
													)}>
												True
											</button>
											<button
												onClick={() =>
													handleClick(
														null,
														quiz.quizQuestions[currentQuestionIndex].answers
															.trueFalseAnswer === "false"
													)}>
												False
											</button>
										</div>
									)}
									{quizPointsSystem === "overall" && <h5>points: {quiz.quizOverallPoints}</h5>}
									{quizPointsSystem === "eachQuestion" && (
										<h5>points: {quiz.quizQuestions[currentQuestionIndex].points} </h5>
									)}
								</div>
							</div>
						</div>
					}
				</Fragment>
			)}
		</div>
	);
};

export default Quiz;