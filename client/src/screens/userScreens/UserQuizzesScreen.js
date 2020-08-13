import React, { useEffect, useState } from "react";
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
  DialogContentText,
} from "@material-ui/core";
import "../../app.css";
const UserQuizzesScreen = (props) => {
  const dispatch = useDispatch();
  const classes = userQuizzesScreenStyle();
  const root = screenLayoutStyles();
  const quizzes = useSelector((state) => state.quizzesList.quizzes);
  const [displayedQuizzes, setDisplayedQuizzes] = useState([]);

  useEffect(() => {
    if (quizzes) {
      setDisplayedQuizzes(quizzes);
    }
  }, [quizzes]);

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
    <Grid container spacing={2} className={root.root}>
      <Grid item xs={12} xl={12} style={{ flex: "0 0 10%" }}>
        <Typography variant="h4" align="center">
          My Quizzes
        </Typography>
        <Divider variant="middle" />
      </Grid>
      <Grid item container spacing={3} xs={12} xl={12} className={classes.list}>
        {quizzes.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="body1" align="center">
              You have no quizzes
            </Typography>
          </Grid>
        )}
        {displayedQuizzes &&
          displayedQuizzes.map((quiz, index) => (
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              key={index}
              className={classes.cardGridItem}
            >
              <Card className={classes.card} key={quiz._id}>
                <CardContent>
                  <div className={classes.quizName}>
                    <Typography variant="h6">Quiz Name:&nbsp;</Typography>
                    <Typography variant="h6" color="secondary">
                      {quiz.quizName}
                    </Typography>
                  </div>
                  <div className={classes.quizName}>
                    <Typography variant="h6" component="p">
                      Subject:&nbsp;
                    </Typography>
                    <Typography variant="h6">{quiz.quizSubject}</Typography>
                    <br />
                  </div>
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => handleDeleteQuiz(quiz._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => handleOpenStatistics(quiz)}
                  >
                    Statistics
                  </Button>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => handleOpenCreateQuiz(quiz)}
                  >
                    {quiz.quizPublished ? <>Update</> : <>Continue editing</>}
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
