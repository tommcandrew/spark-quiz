import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as quizActions from "../../store/actions/quizActions";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../../assets/images/logo.png";

const useStyles = makeStyles((theme) => ({
  list: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    margin: "0px 8px",
    padding: "3px 10px",
    [theme.breakpoints.down("sm")]: {
      margin: "0",
    },
  },
  inline: {
    display: "block",
  },
  buttonContainer: {
    textAlign: "right",
  },
  button: {
    marginRight: "10px",
    padding: "5px",
    color: theme.palette.secondary.main,
    [theme.breakpoints.down("sm")]: {
      marginRight: "5px",
      padding: "2px",
    },
  },
}));

const PreviewQuestions = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const quiz = useSelector((state) => state.quiz);

  const editQuestionHandler = (id) => {
    props.editQuestion(id);
  };

  const deleteQuestionHandler = (id) => {
    dispatch(quizActions.deleteQuestion(id));
  };

  let questionT;
  return (
    <Fragment>
      {(!quiz.quizQuestions || quiz.quizQuestions.length === 0) && (
        <Typography align="center">Add a question</Typography>
      )}
      {quiz.quizQuestions.length > 0 && (
        <List className={classes.list}>
          {quiz.quizQuestions.map((question, index) => {
            question.questionType === "trueFalse"
              ? (questionT = "True/False")
              : (questionT = "Multiple Choice");

            return (
              <ListItem key={index} disableGutters={true}>
                <Paper className={classes.listItem}>
                  <ListItemIcon
                    style={{ margin: "auto auto", marginRight: "8px" }}
                  >
                    <Typography color="primary" variant="h4">
                      Q.{index + 1}
                    </Typography>
                  </ListItemIcon>

                  <ListItemText
                    primary={
                      <Typography color="primary" variant="h6">
                        Type: {questionT}{" "}
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          Question:{" "}
                          {question.question.length > 300
                            ? question.question.slice(0, 295) + "..."
                            : question.question}
                        </Typography>
                        <div className={classes.buttonContainer}>
                          <button
                            className={classes.button}
                            onClick={() => deleteQuestionHandler(question._id)}
                          >
                            delete
                          </button>
                          <button
                            className={classes.button}
                            size="medium"
                            onClick={() => editQuestionHandler(question._id)}
                          >
                            edit
                          </button>
                        </div>
                      </React.Fragment>
                    }
                  />
                </Paper>
              </ListItem>
            );
          })}
        </List>
      )}
    </Fragment>
  );
};
export default PreviewQuestions;
