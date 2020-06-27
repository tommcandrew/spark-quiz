import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as userActions from "../../store/actions/quizzesListActions";
import * as quizActions from "../../store/actions/quizActions";
import {
  Card,
  CardContent,
  CardActions,
  Grid,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "30px",
    overflowY: "scroll",
    overflowX: "hidden",
  },
  card: {
    minWidth: 275,
    margin: "5px",
  },
}));

const UserQuizzes = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const quizzes = useSelector((state) => state.quizzesList.quizzes);

  useEffect(() => {
    dispatch(userActions.fetchQuizzes());
  }, [dispatch]);

	const handleOpenCreateQuiz = (quiz) => {
    dispatch(quizActions.setCurrentQuiz(quiz));
    props.history.push({
      pathname: "/dashboard/updatequiz",
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
	);
};

export default UserQuizzes;
