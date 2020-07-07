import React, { useState } from "react";
import { modalRootStyles } from "../../style/modalStyles";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography, Divider, Button, TextField } from "@material-ui/core";
import CustomSnackbar from "../mui/Snackbar";
import * as quizActions from "../../store/actions/quizActions";

const CreateQuizConfirmationModal = ({ closeModal }) => {
	const dispatch = useDispatch();
	const rootClasses = modalRootStyles();
	const [validationError, setValidationError] = useState("")
	const quiz = useSelector((state) => state.quiz);

	const handleSubmit = async (e) => {
		setValidationError("")
		e.preventDefault();
		if (!quiz.quizTimeLimit) {
			setValidationError("Quiz time limit is not specified")
			return;
		}
		if (quiz.quizQuestions.length <= 0 ) {
			setValidationError("Add some questions first")
			return;
		}
		if (!quiz.quizPointsSystem==="") {
			setValidationError("Points system not selected")
			return
		}
		if (!quiz.quizInvites.contacts) {
			setValidationError("No students invited")
			return
		}
		if(quiz.quizInvites.contacts.length<= 0){
			setValidationError("No students invited")
			return;
		}
		await dispatch(quizActions.publishQuiz(quiz._id));
		closeModal()

	};

	return (
		<div className={rootClasses.root}>
			{validationError !== "" && (
				<CustomSnackbar severity="error" message={validationError} handleClose={() => setValidationError("")} />
			)}

			<form onSubmit={handleSubmit}>
				<Grid container spacing={3} justify="center" alignItems="flex-start">
					<Grid item xs={12}>
						<Typography variant="h5" color="secondary" style={{ textAlign: "center" }}>
							Quiz Overview
						</Typography>
						<Divider variant="middle" />
					</Grid>
					<Grid item xs={12} md={12}>
						<Typography variant="h5" color="secondary">
							Group name: {quiz.quizName? <>{quiz.quizName}</>: <>Unnamed</>}
						</Typography>
					</Grid>
					<Grid item xs={12} md={12}>
						<Typography>
							Subject: {quiz.quizSubject ? <>{quiz.quizSubject}</> : <>Not specified</>}
						</Typography>
					</Grid>
					<Grid item xs={12} md={12}>
						<Typography>
							Timelimit: {quiz.quizTimeLimit?
							  ((quiz.quizTimeLimit === "false") ? <>No limit</> : quiz.quizTimeLimit)
						 : (
								<>Not specified</>
							  )}
						</Typography>
					</Grid>
					<Grid item xs={12} md={12}>
						<Typography>
							Quiz points system: {quiz.quizPointsSystem ? <>{quiz.quizPointsSystem}</> : <>Not specified</>}
						</Typography>
					</Grid>
					{quiz.quizPointsSystem === "overall" && (
						<Grid item xs={12} md={12}>
							<Typography>
								Points for each question: {quiz.quizOverallPoints ? <>{quiz.quizOverallPoints}</> : <>Not specified</>}
							</Typography>
						</Grid>
					)}
					{quiz.quizPointsSystem === "eachQuestion" && (
						<Grid item xs={12} md={12}>
							<Typography>
								Points are set for each question:
								{quiz.quizQuestions.find(q => q.points === "") ? <> no</> : <> yes</>}
							</Typography>
						</Grid>
					)}
					<Grid item xs={12} md={12}>
						<Typography>
							Number of questions: {quiz.quizQuestions.length > 0 ? <> {quiz.quizQuestions.length} </> : <>No questions Added</>}
						</Typography>
					</Grid>
					<Grid item xs={12} md={12}>
						<Typography>
							Number of students Invited: {quiz.quizInvites.contacts ?
								(quiz.quizInvites.contacts.length >= 0 ?
									<> {quiz.quizInvites.contacts.length}</>
									:
									<> None invited </>)
								:
								<>None invited </>}
						</Typography>
					</Grid>
					<Grid item xl={12} container spacing={2}>
							<Grid item xs={12} sm={6}>
							<Button variant="outlined" color = "secondary" onClick={closeModal}>Continue Editing</Button>
							</Grid>
							<Grid item xs={12} sm={6}>
							<Button variant="contained" color = "secondary" type="submit">Upload Quiz</Button>
						</Grid>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default CreateQuizConfirmationModal;

//   const publishQuiz = () => {
//     if (
//       //probably easier to just create empty contacts and groups arrays on initial state object in quizReducer
//       !quiz.quizInvites.contacts ||
//       quiz.quizInvites.contacts.length === 0
//     ) {
//       if (
//         window.confirm(
//           "You are publishing a quiz without any invites. Continue?"
//         )
//       ) {
//         dispatch(quizActions.publishQuiz(quiz._id));
//         //maybe redirect to My Quizzes here?
//       } else {
//         return;
//       }
//     }
//     //repetition!
//     dispatch(quizActions.publishQuiz(quiz._id));
//   };
