import React from "react";
import { Typography, Button } from "@material-ui/core";
import studentScreensStyles from "../../style/studentScreensStyles";
import QuizRules from "../../components/UI/quizRules";

//this component is rendered as a child of Quiz
const QuizStart = ({ quiz, setQuizStarted, leaveQuiz, isQuizDemo }) => {
	const classes = studentScreensStyles();

	return (
		<div className={classes.quizStartContainer}>
			<div className={classes.quizInfo}>
				<Typography variant="h4" color="primary" style={{ marginBottom: "10px", padding: "0" }}>
					Quiz Name: {quiz.quizName}
				</Typography>
				<Typography variant="h6" style={{ marginBottom: "10px" }}>
					Subject: {quiz.quizSubject}
				</Typography>
				<Typography variant="h6" style={{ marginBottom: "10px" }}>
					Author: {quiz.quizAuthor}
				</Typography>
				<Typography variant="h6" style={{ marginBottom: "10px" }}>
					Time limit: {quiz.quizTimeLimit || "none"}
				</Typography>
				{quiz.quizPointsSystem === null && (
					<Typography variant="h6" style={{ marginBottom: "10px" }}>
						Points: none
					</Typography>
				)}
				{quiz.quizPointsSystem === "overall" && (
					<Typography variant="h6" style={{ marginBottom: "10px" }}>
						Total points: {quiz.quizOverallPoints}
					</Typography>
				)}
			</div>
			<div className={classes.quizRules}>
				<QuizRules />
			</div>
			<div className={classes.buttons}>
				<Button  variant="contained" color="primary" className={classes.button} onClick={() => setQuizStarted(true)}>
					Start Quiz
				</Button>
				{isQuizDemo && (
						<Button  variant="contained" color="primary" className={classes.button} onClick={leaveQuiz}>
							Exit
						</Button>
				)}
			</div>
		</div>
	);
};

export default QuizStart;
