import React, { useState, Fragment } from "react";
import AddQuestionModal from "../../components/UI/AddQuestionModal";
import PreviewQuestions from "../../components/UI/PreviewQuestions";
import QuizOptionsModal from "../../components/UI/QuizOptionsModal";
import ShareModal from "../../components/UI/ShareModal";
import * as quizActions from "../../store/actions/quizActions";
import * as userActions from "../../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button, Box, Typography, Grid } from "@material-ui/core";
import clsx from "clsx";
import Modal from "react-modal";

const useStyles = makeStyles((theme) => ({
  makeNewQuizContainer: {
    width: "100%",
    height: "100%",
    padding: "30px",
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  flexItem: {
    margin: "10px",
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  buttonContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  button: {
    marginTop: "30px",
    marginRight: "5px",
    marginLeft: "5px",
    width: "75%",
  },
  gridItem: {
    padding: "10px",
  },
}));

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "70%",
    width: "80%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "20px",
  },
  overlay: { zIndex: 2000 },
};

export default function CreateQuiz(props) {
  const dispatch = useDispatch();
  const [displayedComponent, setDisplayedComponent] = useState(); //only for testing purposes
  const quiz = useSelector((state) => state.quiz);
  const [quizName, setQuizName] = useState("");
  const [quizSubject, setQuizSubject] = useState("");
  // const [quizTime, setQuizTime] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [qId, setQId] = useState("xyz");

  //HANDLERS
  const showModal = (screen) => {
    switch (screen) {
      case "addNewQuestion":
        setDisplayedComponent(
          <AddQuestionModal
            closeModal={closeModal}
            quiz={quiz}
            questionId={qId}
          />
        );
        break;
      case "quizOptions":
        setDisplayedComponent(
          <QuizOptionsModal quizId={quiz._id} closeModal={closeModal} />
        );
        break;
      case "invite":
        setDisplayedComponent(<ShareModal />);
        break;
      default:
        return;
    }
    setIsOpen(true);
    return;
  };

  // const setTime = (time) => {
  // 	setQuizTime(time);
  // };
  const editQuestion = (id) => {
    setQId(id); //THIS IS UNABLE TO SET THE STATE. IDK WHY
    showModal("addNewQuestion");
  };

  const handleCreate = () => {
    if (quizName.length !== 0 && quizSubject.length !== 0) {
      dispatch(quizActions.createQuiz(quizName, quizSubject));
      dispatch(userActions.addQuiz(quizName, quizSubject, false));
      setQuizName(quiz.quizName);
      setQuizSubject(quiz.quizSubject);
    } else console.log("plz fill the fields");
  };

  const publishQuiz = () => {
    dispatch(quizActions.updateQuiz(quiz._id, { quizPublished: true }));
    dispatch(quizActions.clearCurrentQuiz());
  };

  //UI FUNCTIONS
  const classes = useStyles();

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className={classes.makeNewQuizContainer}>
      {quiz._id.length <= 0 && (
        <Paper
          elevation={3}
          style={{
            flex: "1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid container spacing={3} justify="center">
            <Grid item xs={12} md={6} className={classes.gridItem}>
              <Typography variant="h4" align="right">
                Quiz name:{" "}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} className={classes.gridItem}>
              <input
                type="text"
                name="name"
                onChange={(event) => {
                  setQuizName(event.target.value);
                }}
                value={quizName}
              />
            </Grid>
            <Grid item xs={12} md={6} className={classes.gridItem}>
              <Typography variant="h4" align="right">
                Quiz Subject
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} className={classes.gridItem}>
              <input
                type="text"
                name="subject"
                onChange={(event) => {
                  setQuizSubject(event.target.value);
                }}
                value={quizSubject}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                onClick={handleCreate}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}
      {quiz._id.length > 0 && (
        <Fragment>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            {displayedComponent}{" "}
            {/* can be either addquestion/ setQuizOptions /invite */}
          </Modal>
          <Paper className={clsx(classes.flexItem, classes.buttonContainer)}>
            <Box className={classes.button}>
              <Typography variant="h5">Quiz Name: {quiz.quizName}</Typography>
            </Box>
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={() => showModal("quizOptions")}
            >
              Quiz Options
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => showModal("addNewQuestion")}
            >
              Add Question
            </Button>

            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={() => showModal("invite")}
            >
              Invite
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={publishQuiz}
            >
              Publish
            </Button>
          </Paper>
          <Paper className={classes.flexItem} style={{ flex: 3 }}>
            <PreviewQuestions editQuestion={editQuestion} />
          </Paper>
        </Fragment>
      )}
    </div>
  );
}
