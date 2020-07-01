import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useStyles } from "../../style/userQuizzesScreenStyles";
import * as userActions from "../../store/actions/userActions";
import * as quizActions from "../../store/actions/quizActions";
import { Card, CardContent, CardActions, Grid, Typography, Button } from "@material-ui/core";

const UserQuizzesScreen = (props) => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const quizzes = useSelector((state) => state.quizzesList.quizzes);

	//on page reload
	useEffect(
		() => {
			dispatch(userActions.fetchQuizzes());
		},
		[ dispatch ]
	);

	//HANDLERS
	const handleOpenCreateQuiz = (quiz) => {
		dispatch(quizActions.setCurrentQuiz(quiz));
		props.history.push({
			pathname: "/dashboard/updatequiz"
		});
	};

	const handleDeleteQuiz = (id) => {
		dispatch(userActions.deleteQuiz(id));
	};

	return (
		<Grid container spacing={2} className={classes.root}>
			<Grid item xs={12} xl={12}>
				<Typography variant="h5" align="center">
					My Quizzes
				</Typography>
			</Grid>
			<Grid item container spacing={2} xs={12} xl={12} className={classes.list}>
				{quizzes.length === 0 && (
					<Grid item xl={12}>
						<Typography>You have no quizzes</Typography>
					</Grid>
				)}
				{quizzes &&
					quizzes.map((quiz, index) => (
						<Grid item xs={12} sm={6} md={6} key={index}>
							<Card className={classes.card} key={quiz._id}>
								<CardContent>
									<Typography variant="h5" component="h2">
										Quiz Name: {quiz.quizName}
									</Typography>
									<Typography variant="body2" component="p">
										Subject: {quiz.quizSubject}
									</Typography>
									<br />
								</CardContent>
								<CardActions>
									<Button size="small" onClick={() => handleOpenCreateQuiz(quiz)}>
										{quiz.quizPublished? (<>Update</>): (<>Continue editing</>)}
									</Button>
									<Button size="small" onClick={() => handleDeleteQuiz(quiz._id)}>
										Delete
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
			</Grid>
		</Grid>
	);
};

export default UserQuizzesScreen;
