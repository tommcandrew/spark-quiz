import React, { useState, useEffect } from "react";
import * as quizActions from "../../store/actions/quizActions";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography, Divider, NativeSelect, TextField } from "@material-ui/core";
import { modalRootStyles, quizOptionsModalStyles } from "../../style/modalStyles";
import CustomSnackbar from "../../components/mui/Snackbar"
import V from 'max-validator';
import { quizOptionsValidation } from "../../utils/validation"



const timeLimitOptions = {
	max: 60,
	step: 5
};
//MAIN
const QuizOptionsModal = ({ quizId, closeModal }) => {
	const rootClasses = modalRootStyles();
	const classes = quizOptionsModalStyles();
	const [ showOverallPointsInput, setShowOverallPointsInput ] = useState(false);
	const [ selectOptions, setSelectOptions ] = useState([]);
	const dispatch = useDispatch();
	const prevState = useSelector((state) => state.quiz);
	const [validationError, setValidationError] = useState("")

	//HOOKS
	useEffect(
		() => {
			let selectOptions = [];
			selectOptions.push(
				<option key="No limit" value="false">
					No limit
				</option>
			);
			for (let i = 1; i <= timeLimitOptions.max; i++) {
				if (i % timeLimitOptions.step === 0) {
					if (prevState.quizTimeLimit === i.toString()) {
						selectOptions.push(
							<option key={i} value={i} selected>
								{i}
							</option>
						);
					} else {
						selectOptions.push(
							<option key={i} value={i}>
								{i}
							</option>
						);
					}
				}
			}
			setSelectOptions(selectOptions);
		},
		[ prevState ]
	);

	//HANDLERS
	const handleSelectPoints = (e) => {
		console.log(showOverallPointsInput)
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
		let overallPoints = e.target.overallPoints.value;
		console.log(overallPoints)
		if (showOverallPointsInput) {
			console.log("we are in")
			const result = V.validate({ overallPoints }, quizOptionsValidation);
			if (result.hasError()) {
				console.log(result.hasError)
				console.log(result.getError("overallPoints"))
				setValidationError(result.getError("overallPoints"));
			}else {console.log("no error")}
		}

		// if (selectedTimeLimit) {
		// 	dispatch(quizActions.updateQuiz(quizId, { quizTimeLimit: selectedTimeLimit }));
		// }
		// if (points) {
		// 	dispatch(quizActions.updateQuiz(quizId, { quizPointsSystem: points }));
		// }
		// if (overallPoints) {
		// 	dispatch(quizActions.updateQuiz(quizId, { quizOverallPoints: overallPoints }));
		// }
		// closeModal();
	};

	//RETURN
	return (
		<div className={rootClasses.root}>
				{validationError !== "" &&
				<CustomSnackbar
				severity="error"
				message={validationError}
				handleClose={() => setValidationError("")}/>
			}
			<form onSubmit={handleSubmit}>
				<Grid container spacing={3} justify="center" alignItems="flex-start">
					<Grid item xs={12}>
						<Typography variant="h5" color="secondary" style={{ textAlign: "center" }}>
							Quiz Options
						</Typography>
						<Divider variant="middle" />
					</Grid>
					<Grid item xs={6} style={{ textAlign: "right" }}>
						<Typography>Time limit (minutes):</Typography>
					</Grid>
					<Grid item xs={6}>
						<NativeSelect id="timeLimit" name="timeLimit" defaultValue={prevState.quizTimeLimit}>
							{selectOptions}
						</NativeSelect>
					</Grid>
					<Grid item xs={6} style={{ textAlign: "right" }}>
						<Typography>Assign points:</Typography>
					</Grid>
					<Grid item xs={6}>
						<NativeSelect id="points"
							name="points"
							onChange={handleSelectPoints}
							defaultValue={prevState.quizPointsSystem}
						>
							<option value="noPoints">No points</option>
							<option value="overall">Overall</option>
							<option value="eachQuestion">Each question</option>
						</NativeSelect>
						<Grid item xs={12} xl={12}>
						{(showOverallPointsInput) && (
							<div>
									<TextField
									id="overallPoints"
										label="score"
										defaultValue={prevState.quizOverallPoints}
									/>
							</div>
						)}</Grid>
					</Grid>
					<Grid item xs={6} style={{ textAlign: "right" }}>
						<button type="submit">Done</button>
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
