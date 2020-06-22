import React, { useState, useEffect, Fragment } from "react";
import * as quizActions from "../../store/actions/quizActions";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography, Button, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		flex: 1
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary
	}
}));

//maybe this can be passed down via props
const timeLimitOptions = {
	max: 60,
	step: 5
};

//MAIN
const QuizOptionsModal = ({ quizId, closeModal }) => {
	const classes = useStyles();
	const [ showOverallPointsInput, setShowOverallPointsInput ] = useState(false);
	const [ selectOptions, setSelectOptions ] = useState([]);
	const dispatch = useDispatch();

	//generate options for dropdown menu based on timeLimitOptions object
	useEffect(() => {
		let selectOptions = [];
		selectOptions.push(
			<option key="No limit" value="false">
				No limit
			</option>
		);
		for (let i = 1; i <= timeLimitOptions.max; i++) {
			if (i % timeLimitOptions.step === 0) {
				selectOptions.push(
					<option key={i} value={i}>
						{i}
					</option>
				);
			}
		}
		setSelectOptions(selectOptions);
	}, []);

	const handleSelectPoints = (e) => {
		if (e.target.value === "overall") {
			setShowOverallPointsInput(true);
		} else {
			if (showOverallPointsInput) {
				setShowOverallPointsInput(false);
			}
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const selectedTimeLimit = e.target.timeLimit.value;
		const points = e.target.points.value;
		let overallPoints;

		if (showOverallPointsInput) {
			overallPoints = e.target.overallPoints.value;
		}
		if (selectedTimeLimit) {
			dispatch(quizActions.updateQuiz(quizId, { quizTimeLimit: selectedTimeLimit }));
		}
		if (points) {
			dispatch(quizActions.updateQuiz(quizId, { quizPointsSystem: points }));
		}
		if (overallPoints) {
			dispatch(quizActions.updateQuiz(quizId, { quizOverallPoints: overallPoints }));
		}
		closeModal();
	};

	return (
		<div className={classes.root}>
			<form onSubmit={handleSubmit}>
				<Grid container spacing={2} justify="center" alignItems="flex-start">
					<Grid item xs={12}>
						<Typography variant="h5" style={{ textAlign: "center" }}>
							Quiz Options
						</Typography>
					</Grid>
					<Grid item xs={6} style={{ textAlign: "right" }}>
						<Typography variant="body">Time limit (minutes):</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography variant="body">
							<select id="timeLimit" name="timeLimit" defaultValue="No limit">
								{selectOptions}
							</select>
						</Typography>
					</Grid>
					<Grid item xs={6} style={{ textAlign: "right" }}>
						<Typography variant="body">Assign points:</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography variant="body">
							<select id="points" name="points" defaultValue="no points" onChange={handleSelectPoints}>
								<option value="noPoints">No points</option>
								<option value="overall">Overall</option>
								<option value="eachQuestion">Each question</option>
							</select>
							{showOverallPointsInput && (
								<div>
									<label htmlFor="overallPoints">Overall points: </label>
									<input type="number" id="overallPoints" name="overallPoints" required />
								</div>
							)}
						</Typography>
					</Grid>
					<Grid item xs={6} style={{ textAlign: "right" }}>
						<button type="submit">
							Done
						</button>
					</Grid>
					<Grid item xs={6}>
						<button>Cancel</button>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default QuizOptionsModal;
