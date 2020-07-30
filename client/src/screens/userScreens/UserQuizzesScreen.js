import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  screenLayoutStyles,
  userQuizzesScreenStyle,
} from "../../style/screenStyles";
import * as userActions from "../../store/actions/userActions";
import * as quizActions from "../../store/actions/quizActions";
import {
  Card,
  CardContent,
  CardActions,
  Grid,
  Typography,
  Button,
  Divider,
} from "@material-ui/core";
import "../../app.css";
const UserQuizzesScreen = (props) => {
  const dispatch = useDispatch();
  const classes = userQuizzesScreenStyle();
  const root = screenLayoutStyles();
  const quizzes = useSelector((state) => state.quizzesList.quizzes);


 useEffect(
   () => {
     if(quizzes.length===0){
			dispatch(userActions.fetchQuizzes());}
		},
		[ dispatch ]
	);
  //HANDLERS
  const handleOpenCreateQuiz = (quiz) => {
    dispatch(quizActions.setCurrentQuiz(quiz));
    props.history.push({
      pathname: "/dashboard/updatequiz",
    });
  };

  const handleDeleteQuiz = (id) => {
    dispatch(userActions.deleteQuiz(id));
  };

  const handleOpenStatistics = (quiz) => {
    dispatch(quizActions.setCurrentQuiz(quiz));
    props.history.push({
      pathname: "/dashboard/statistics",
    });
  };

  return (
    <Grid
      container
      spacing={1}
      className={root.root}
      justify="center"
      style={{ overflow: "visible" }}
    >
      <Grid item xs={12} xl={12}>
        <Typography variant="h6" align="center">
          Your Quizzes
        </Typography>
        <Divider variant="middle" />
      </Grid>
      <Grid
        item
        container
        spacing={2}
        xs={12}
        xl={12}
        justify="flex-start"
        className={classes.list}
      >
        {quizzes.length === 0 && (
          <Grid item xl={12}>
            <Typography>You have no quizzes</Typography>
          </Grid>
        )}
        {quizzes &&
          quizzes.map((quiz, index) => (
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              key={index}
              className="zoom"
            >
              <Card className={classes.card} key={quiz._id}>
                <CardContent>
                  <div className={classes.quizName}>
                    <Typography variant="body1">Quiz Name:&nbsp;</Typography>
                    <Typography variant="h4" color="primary">
                      {quiz.quizName}
                    </Typography>
                  </div>
                  <Typography variant="body1" component="p">
                    Subject: {quiz.quizSubject}
                  </Typography>
                  <br />
                </CardContent>
                <CardActions>
                  <Button
                    size="medium"
                    className={classes.button}
                    onClick={() => handleOpenCreateQuiz(quiz)}
                  >
                    {quiz.quizPublished ? <>Update</> : <>Continue editing</>}
                  </Button>
                  <Button
                    size="small"
                    className={classes.button}
                    onClick={() => handleDeleteQuiz(quiz._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    size="small"
                    className={classes.button}
                    onClick={() => handleOpenStatistics(quiz)}
                  >
                    Statistics
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
