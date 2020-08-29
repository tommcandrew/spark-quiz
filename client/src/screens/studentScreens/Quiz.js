import React, { useState, useEffect, Fragment } from "react";
import studentScreensStyles from "../../style/studentScreensStyles";
import ProgressBar from "../../components/UI/ProgressBar";
import { Typography, RadioGroup, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import * as quizActions from "../../store/actions/quizActions";
import * as authActions from "../../store/actions/authActions";
import * as quizScoreActions from "../../store/actions/quizScoreActions";
import QuizStart from "./QuizStart";
import QuizOption from "../../components/student/QuizOption";
import QuizTimer from "../../components/student/QuizTimer";
import QuizMedia from "../../components/student/QuizMedia";
import { animateNextQuestion } from "./QuizAnimations";
import CustomSnackbar from "../../components/mui/Snackbar";
import Finish from "./Finish";
import clsx from "clsx";

const Quiz = ({ history }) => {
	const classes = studentScreensStyles();
	const isQuizDemo = localStorage.getItem("token") === "demo_token";
	const [ selectedOption, setSelectedOption ] = useState(null);
	const [ finished, setFinished ] = useState(false);
	const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0);
	const [ timeUp, setTimeUp ] = useState(false);
	const [ quizStarted, setQuizStarted ] = useState(false);
  const [validationError, setValidationError] = useState("");
  
 
	const dispatch = useDispatch();
	const quiz = useSelector((state) => state.quiz);
	const quizPointsSystem = quiz.quizPointsSystem;
	var timeLimit;
	if (quiz.quizStarted) {
		var d = new Date(); //todays date
		var date = new Date(quiz.quizStarted.toString()); //when the quiz was created
		var timeTaken = d.getTime() - date.getTime(); //how much time has passed since the quiz started
		if (quiz.quizTimeLimit !== "false" && quiz.quizTimeLimit !== "" && quiz.quizTimeLimit !== null) {
			timeLimit = parseInt(quiz.quizTimeLimit * 60 - timeTaken / 1000);
		} else timeLimit = parseInt(quiz.quizTimeLimit) * 60;
  }
  else timeLimit = parseInt(quiz.quizTimeLimit) * 60;
  
	const leaveQuiz = () => {
		setFinished(true);
	};

	const getQuiz = async () => {
		if (isQuizDemo && quiz._id === "") {
			await dispatch(authActions.quizDemo());
			return;
		}
		if (quiz._id === "" && currentQuestionIndex >= quiz.quizQuestions.length - 1) {
			await dispatch(authActions.studentReload());
		}
	};

	useEffect(
		() => {
			getQuiz();
		},
		[ finished ]
	);

	// 	//make a nicer notification
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
					await dispatch(quizScoreActions.finishQuiz());
					history.push({ pathname: "/finishQuiz" });
					await dispatch(authActions.clearStudent());
					await dispatch(quizActions.clearCurrentQuiz());
				}
			}
			fetchData();
		},
		[ finished ]
	); // Or [] if effect doesn't need props or state

	const goToNextQuestion = () => {
		if (currentQuestionIndex === quiz.quizQuestions.length - 1) {
			setFinished(true);
		} else {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		}
	};

	const handleClick = async () => {
		if (selectedOption === null) {
			setValidationError("Please select an option");
			return;
		}
		if (timeUp) return;

		let isCorrect;
		quiz.quizQuestions[currentQuestionIndex].questionType === "multipleChoice"
			? (isCorrect = quiz.quizQuestions[currentQuestionIndex].answers.multipleChoiceAnswer === selectedOption)
			: (isCorrect = quiz.quizQuestions[currentQuestionIndex].answers.trueFalseAnswer === selectedOption);
		setSelectedOption(null);
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
		<div className={classes.root}>
			<div className={classes.paperBackground}>
				{validationError !== "" && (
					<CustomSnackbar
						severity="error"
						message={validationError}
						handleClose={() => setValidationError("")}
					/>
				)}
				<div className={classes.content}>
					{!quizStarted && (
						<QuizStart
							quiz={quiz}
							setQuizStarted={setQuizStarted}
							leaveQuiz={leaveQuiz}
							isQuizDemo={isQuizDemo}
						/>
					)}
					{quizStarted && (
						<Fragment>
							{!finished && (
								<div className={classes.quiz__content}>
									<div className={classes.quiz__info}>
										<Typography variant="h6" color="primary">
											{quiz.quizName}
										</Typography>
										{quiz.quizTimeLimit !== "false" &&
										quiz.quizTimeLimit !== "" &&
										quiz.quizTimeLimit !== null && (
											<QuizTimer seconds={timeLimit} setTimeUp={setTimeUp} />
										)}
									</div>

									<div className={clsx(classes.quiz__questionContent, "quiz__questionContent")}>
										<div className={classes.quiz__question}>
											<Typography variant="h6">
												Q. {quiz.quizQuestions[currentQuestionIndex].question}
											</Typography>
											{quizPointsSystem === "eachQuestion" && (
												<h5 style={{ textAlign: "right", paddingRight: "10px" }}>
													points: {quiz.quizQuestions[currentQuestionIndex].points}{" "}
												</h5>
											)}
										</div>

										{quiz.quizQuestions[currentQuestionIndex].media.length > 0 && (
											<div className={classes.quiz__medias}>
												<Typography variant="body" />
												{quiz.quizQuestions[currentQuestionIndex].media.map((media, index) => (
													<div key={index} className={classes.quiz__media}>
														<QuizMedia media={media} />
													</div>
												))}
											</div>
										)}

										<div className={classes.quiz__options}>
											{quiz.quizQuestions[currentQuestionIndex].questionType ===
												"multipleChoice" && (
												<RadioGroup
													value={selectedOption}
													onChange={(e) => {
														setSelectedOption(e.target.value);
													}}>
													{quiz.quizQuestions[
														currentQuestionIndex
													].answers.multipleChoiceOptions.map((option, index) => (
														<QuizOption key={index} option={option} optionIndex={index} />
													))}
												</RadioGroup>
											)}

											{quiz.quizQuestions[currentQuestionIndex].questionType === "trueFalse" && (
												<RadioGroup
													value={selectedOption}
													onChange={(e) => {
														setSelectedOption(e.target.value);
													}}>
													<QuizOption option={"true"} optionIndex={"true"} />
													<QuizOption option={"false"} optionIndex={"false"} />
												</RadioGroup>
											)}
										</div>
									</div>
									<div className={classes.quiz__progress}>
                    <ProgressBar
                      quizLastQuestionNumber={quiz.quizLastQuestionNumber}
											currentQuestion={currentQuestionIndex}
											totalQuestions={quiz.quizTotalQuestions}
										/>

										<div className={classes.quiz__progressDetails}>
                      <div>
                        {quiz.quizLastQuestionNumber ? (
                         <> Question {currentQuestionIndex + 1 + quiz.quizLastQuestionNumber}
												/{quiz.quizTotalQuestions}</>
                        ): (
                              <> Question {currentQuestionIndex + 1}
												/{quiz.quizQuestions.length}</>
                        )
                        }
												
												{quizPointsSystem === "overall" && (
													<div style={{ textAlign: "right", paddingRight: "10px" }}>
														Quiz points: {quiz.quizOverallPoints}
													</div>
												)}
											</div>
											<Button variant="contained" color="primary" onClick={handleClick}>
												Submit
											</Button>
										</div>
									</div>
								</div>
							)}
						</Fragment>
					)}
				</div>
			</div>
		</div>
	);
};

export default Quiz;

//FOR TESTING
// const timeLimit = 3000;
// const quizPointsSystem = "overall";

// const quiz = {
// 		quizName: "Biology quiz 1",
// 		quizLastQuestionNumber: 0,
// 		quizTotalQuestions: 2,
// 		quizTimeLimit: false,

// 		quizQuestions: [
// 			{
// 				media: [
// 					{
// 						_id: "5f32e05f79d64741ac356068",
// 						mediaType: "text/plain",
// 						data: "Hello this is a test data"
// 					},
// 					{
// 						_id: "5f32e05f79d64741ac356068",
// 						mediaType: "image/jpeg",
// 						data:
// 							"/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAKIAogMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAAAQMEAgUGB//EADMQAAICAQMCBQEIAgMAAwAAAAECAAMRBBIhMUEFEyJRYQYycYGRobHB8BQjQlLxBzPh/8QAGgEBAAIDAQAAAAAAAAAAAAAAAAECAwQFBv/EACIRAAICAgMBAAIDAAAAAAAAAAABAgMRIQQSMUEFIhOhsf/aAAwDAQACEQMRAD8A8SxDEcJQyYDbDbHCCRbYbRHHGRgx2iPbGIRkYFtENojjjJODAgQxGYQRgW2G2OEAxxDEcIAsQ2iOEAW2G2OEEYFthHCMjAGAhmGYJCMRRwAhHGAT2glGMczCGSJQzEADJlW0i6hKWkQTIAzaV+Ealhk1FR7t6f3lpfp+7aGeypcnABbrMbugvptw4F8vImgZfiYzoX8AtAyLKyR8mVL/AAbV1jJpJGcZXmI3Qf0ifAvh7E1MJO+ndDhlIPtiYGsiZco1HCS00RxTIgiKSUaFCEIAZhFiAMAcIZhAFARRySBx4iElrTMq9FksjRMy1Tpy5GBJdJpmtYBZ3X0z4BVUV1WrX7IylRHX5mpfyY1rLOtxeC5/tLw0/gv0nbrQtl58qk/8yOT9w7zoF8A0Oi09vkoWs42Mx5+Zurb1dCGq3ueBjOVAMhNQU7KbCdhxlsAt/H4fPaciXJsm8t4R2q6YQ8RptZpX8ld4UH2+1jiQnThilZrUuy4Ar429+SeDkd/04nQAaiqgua1Xapbe3QDvj8veUNqpr2Wx/Q3BwGxnPOPmTGwz5NGUJwzDFxbC1LXx0HaX/C9JXrrn/wAmxq3qABQthj92ZsvMV79libmIO4KOfjn8OkKhVbqlav7AQ4YblZenWWla2vMAp6n6cq1Nuaijo4JUnkj8ZofFfpDVUVm/TjzKxyQo5Wdiltu0KAHYenrjJPXPc+8k3alTlWRtx3Mg7fGPxlIcm2D9MNlMbF+yPIr9IUYgjmVLKyvWen+OfTY1mlbV6WvFo5dMbc++BOG1mhspJDr+k61HKjYjjcrgY3A0sUmtrKmQ9JuJ5OPKLTwxZhGYpYqEIQgCjAhGIA1HMuULmVF6zYaJN9ij3MxWPCNrjR7WJHZ/SHhFeqsa64YqoUM5/ad1W9YrcqCWbhVUfZ4zx+UoeD6ZdF4FQu1UtcB3yfyk1lpq/wB9rVLkAquM88Tzl83ZY2enS1gh1J3aizzKgLGXhg20Lz3PHt+8ri9wyO7FLdu7ywcDp3/GSNtDK9zWZD+vL4AwDwf73mDbfLWxURrW6vtAA4647nkd5C8Mq0Lz/wDVsOp8skh23H34OMdent9/SIixXyd296wDtBCtn9Okz0+krrvUlVS3qBjIX7xnHeFdaoGJKvsGf/sLBenQn8eJOvhOiDU76rAfLx6sb6x9rI5HPUzIVGlv9Q3YXFlnAwuPiTb12pW29x53o24I5BxnHT94GpzelloZh14OdueD8H8faM6GTLzLHT/Y+1mByeTj2xnjp74kK13HUMw54B4wobpgkdzJnPl7i9NpZ1J3sAu0D4H4+8jo864hU9BwAAeGPbIPIxnPWRgGy8M1qVNWxGKjjKlh0I5/man618J02opHiGjXFbAZHzLRoNIVFGRuPHtk/mOknvQa3wzUaEgjcu5CD+R/vvIhLpJNGJxxLsjx3xCsJawmtcczceJ1lL3U9QZqbBzPSVPKPN82OLWRCEZimY0RRxRwAjEUYgGSdZ0H05pTqdfRWBnc6j8zNBX1nY/Qq58Z0zH/AItn8hNXlS61tnT/AB0c2no2uVUSupFGzlGXGf7iUblRQ4fHbgN1/wD3nGZd1YqdrGbKpnLMBweB19pUqG1P9gRlUYBzxg/+5nnI+HoY+EOoJrIXgorg9F9JPIHPXpkxppyunXLqysSzZcMQpHbb07H3jWxNKWsL5ZSWdGGFOF4z7cjMgUX7kspNQLgvX6iA/POM9enxMy8Leli5/wDGY4rxU6FyjdGXOOvbOP7iS21VG60NYH28FRhTkYyMjPOSZRbZXZ6FO7DZXb6wOhOM9evWPR2GzVXCkvXXUnpNqjliO/IGe8ddaHXGyzvpoRk2PeHX0lT8dOnJGZBprC1KrWLNwqLJWzBVI6c+5znHvxBjilbd3JDYZxypPTafb9JDp03W0oMVNWNzWWNz8gDpnjv7yUk0TjRZtU1VKpCglypqYZxnkHj8cj4i9T1hGaw5zgLxg47c57frMatgv8xtRucEkiznGN3t/A4hUpve+yh8MmE+z6WGOPUe+CfaQ0PPSaqrN25HNhQMWJyW+Cc9eksae1VtUAuAQWHpHeR6RdReFBFu5l2E7uT8D8iOZmj7b1ssIFj8jI7HuZjkVZ579Z6Qabxa4JwrHcB7Z5nJ29TO+/8AkNQ2vRx0apT+84K77Rne4cu1SPP/AJOOLCI9Ioz0im6cthCEIIARxRyASVfa/Gdh9DWIvjOm39C4B/Hj+ZxydZvPAbjTrKnXqrA/kZrcmPaDR0vx0sW4PWtY3luSqsxwACOcj5/veVdPWrapQbiQyFwrYUqfbGPYGW9RYfKrenJ34KsM8Z5lSwXWMLNyjpuyCxYY68/fPOR8PRJaJmspceXd5eDwCrDknjLD+85msrR9RpbQCwQkqSQACOOFxjn75Yo8hWcJbhlUDazAFz/1A5Eb1MibSiFEAa1RncPc47dc5mRaJWiQAas0W2KjMhx6QvT/ALH+95r3qDahiFTUIrkuyqQ3XIx2/TiXb7KqLP8AForrdTn1VoRngYOe2OPwlTW+Zp6LMh2qYqBuG5GGckHr88+8vHJMSUOvkBtNcnnOfUr+pwwHA9vf74GtSzM+2zUuvoVQMEdhz0hoAL8mipRVYAWwm0rtOOg7n7pNeqqqGsKXJzYyf9d3Kn2B4kP3A8eCVPMr27qq12Jl+oBOO3Hv/Mh0pvpqWqtwDWHfDWbgT/xOMc9ZZuuayuutagSowgVtudrE9scD9ZhpKW1usrVr0qUMd7OevGMjH7H3lclc6zIiozYa1qYKckZHJXcegH3gSbTU3stoDKxQAHjPfrz/AHMVKKtjJUSCpDrtOc9eQevP8y3paWV8G0Nu6Z6f+iUkxJ6OD/8AkBh/nBc8qgGPacJb9ozpfq3WNq/FNQ5xjcQMew4E5myeg4ketaRwPyU82EZijMU3DlChHiOAKMTGEAkBxLmkuKMrA9JRHSSVtgiUksozVWOEk0ew/SniX+b4StQANlHGM/aB6S6r2LZYz4yBghuRz1GPnmeb/THir6LWI+fSeGX3HcT1BLEuQXaawvWwGwrkgcTzvJpdVmfjPUU2qyHZEF4FO17HQsqk5A5brgew6j8pVruD2Z5e5BnFj84PB4/XEuaqrUalnFFe0AlzjrWPnPJ9+JQFKtSRqkJx1YA5AHz26/txMcfNmeLTRgdI67P8itbQ21QU+zX789CchesnFTaUvQUKXgjPo6j544H5yL1q+bbfMzk4HAB55x37dpe1Lrq6RYXDhqgzeUNoGO2OMcg88yzbDbykyDw+wVVW11eVUPV5bsxbnjkDP6SJwbQnr819xwTwwxweR2POOnaRaes2XLZXcGtIGzKlVwCOB2Jz78cTaeEaY2eK51FflmxglgIwAPfj7pD0xJqOWQ6PwzUaj0v5bvnaCiElm9yff3A9pcv0dnhWnR722pVlSLAMksP46/E6/wAJ8W8JoqbRmph5JJXj7Rznicr43UdZrmuewqHJK+oEH7xLWRjGKfbOf6NOu+y2xxlHC/0qaQJZZaCS7NgkquGPsfxMw8b1I8L8Lvd8h39NQPbI5MnooFIVhwv2mbGBx+w6Tz76v8bbXahq1yKqzhVP3ytFX8tmvDPZNRXZvRzevtFlrNNY/Jli98mVTPR1xwjzHJs7zbAxQhMprBCKOAKMQhADMyHExgIJRa09u1s952f0t9THw5vKvy9LEZHXHyJwinBk1VxBmtfRG1YZvcXlup4+HuH+XRqKkv0lgs0+3GQvTPYnqOfy5keoqXD2c+WWGzDltx+OnE8r8K8c1fh7k6ezAYbWU8qw+ROl0v1dTfs86sUsCM91J/cTkT4VkH+u0dujlVWePDOj1VVllSItW1wcjnA7jnHbj39oDSWLp9uLGKAAeYoII7cH5H3yjpfF0vrYal2dMYRuGwPj5luvxTbqk2BVrB9Vi5OT90wOM1rBvYljRNp3u0upFN+0hn9TBSCvfrLl+o040wNN584sMEEEgH/2a9fF6luays8K2fUSCxI+1zzINdqErBFpoxn1FTzj2z7yOjk/CrjvLNtQrMlbOxYgBcgcYPz3P3Se23ayWWAUJXk+tsKonL6n6u8O0qba/MutU+lQ2FGOnM5bxj6m1fibk3PtQfZRegmSvh2Te1hGtbfXB7ZuPqb6ma0PptIxWnPqboXP8TitReWJJOST3mN2oLEktmVWfM7VHHjWsI4nL5js0vAY5MxzDMRmyjnMIo4SSBRwhACEIQAhCEAAYwYoQCQORJUuI7ytmMGVcS6m0X69U6nKuR9xxLCeLatGDLqLAR0O6akEx7pR1xfw2I8qyPkjcv41rXOW1Dn8ZTu1ltpzZY7H5bMpFpiTCqivgly7ZessNcTImsMjyYS6ijXc2xliYs8QhLYKhCEIICEIQAhCEAUIQgBCAjgCjHWEIA4QEJBIQhCAIxRwkkChHCAKEcUAIZhCAEcUIA+IRQgBCEIAQhCAEIQggBHCEEhCOEAUUIQAj7QhAFCEIAQhCAEIQgBCEIB//9k="
// 					},
// 					{
// 						_id: "5f32e05f79d64741ac356068",
// 						mediaType: "image/jpeg",
// 						data:
// 							"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"
// 					}
// 				],
// 				question: "This is a question 1?",
// 				questionType: "trueFalse",
// 				answers: {
// 					multipleChoiceOptions: [
// 						"anser1qerrterttttertetrtrtrtrtrttertertrtggdfgdgdgdgdgdgdgdgdgdfgdfganser1qerrterttttertetrtrtrtrtrttertertrtggdfgdgdgdgdgdgdgdgdgdfgdfganser1qerrterttttertetrtrtrtrtrttertertrtggdfgdgdgdgdgdgdgdgdgdfgdfganser1qerrterttttertetrtrtrtrtrttertertrtggdfgdgdgdgdgdgdgdgdgdfgdfg",
// 						"answer2"
// 					],
// 					multipleChoiceAnswer: "1",
// 					trueFalseAnswer:"false"
// 				},
// 				quizOverallPoints: 5
// 			},
// 			{
// 				media: [
// 					{
// 						_id: "5f32e05f79d64741ac356068",
// 						mediaType: "text/plain",
// 						data: "Hello this is a test data"
// 					},
// 					{
// 						_id: "5f32e05f79d64741ac356068",
// 						mediaType: "image/jpeg",
// 						data:
// 							"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"
// 					},
// 					{
// 						_id: "5f32e05f79d64741ac356068",
// 						mediaType: "image/jpeg",
// 						data:
// 							"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"
// 					}
// 				],
// 				question: "222222?",
// 				questionType: "trueFalse",
// 				answers: {
// 					multipleChoiceOptions: [
// 						"anser1qerrterttttertetrtrtrtrtrttertertrtggdfgdgdgdgdgdgdgdgdgdfgdfganser1qerrterttttertetrtrtrtrtrttertertrtggdfgdgdgdgdgdgdgdgdgdfgdfganser1qerrterttttertetrtrtrtrtrttertertrtggdfgdgdgdgdgdgdgdgdgdfgdfganser1qerrterttttertetrtrtrtrtrttertertrtggdfgdgdgdgdgdgdgdgdgdfgdfg",
// 						"answer2"
// 					],
// 					multipleChoiceAnswer:"1"
// 				},
// 				quizOverallPoints: 5
// 			}
// 		]
// 	};
