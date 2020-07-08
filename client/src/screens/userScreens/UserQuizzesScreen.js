import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {screenLayoutStyles, userQuizzesScreenStyle } from "../../style/screenStyles"
import * as userActions from "../../store/actions/userActions";
import * as quizActions from "../../store/actions/quizActions";
import { Card, CardContent, CardActions, Grid, Typography, Button, Divider } from "@material-ui/core";

const UserQuizzesScreen = (props) => {
	
	const dispatch = useDispatch();
	const classes = userQuizzesScreenStyle();
	const root = screenLayoutStyles();
	const quizzes = useSelector((state) => state.quizzesList.quizzes);


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
		<Grid container spacing={2} className={root.root}>
			<Grid item xs={12} xl={12}>
				<Typography variant="h4" align="center">
					Your Quizzes
				</Typography>
				      <Divider variant="middle"  />
			</Grid>
			<Grid item container spacing={0} xs={12} xl={12} justify="space-evenly" className={classes.list}>
				{quizzes.length === 0 && (
					<Grid item xl={12}>
						<Typography>You have no quizzes</Typography>
					</Grid>
				)}
				{quizzes &&
					quizzes.map((quiz, index) => (
						<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
							<Card className={classes.card} key={quiz._id}>
								<CardContent>
									<div className={classes.quizName}>
										<Typography variant="body1">Quiz Name:&nbsp;</Typography>
										<Typography variant="h5" color="secondary">{quiz.quizName}</Typography>
									</div>
									<Typography variant="body1" component="p">
										Subject: {quiz.quizSubject}
									</Typography>
									<br />
								</CardContent>
								<CardActions>
									<Button size="small" color="primary" onClick={() => handleOpenCreateQuiz(quiz)}>
										{quiz.quizPublished? (<>Update</>): (<>Continue editing</>)}
									</Button>
									<Button size="small" color="primary" onClick={() => handleDeleteQuiz(quiz._id)}>
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
