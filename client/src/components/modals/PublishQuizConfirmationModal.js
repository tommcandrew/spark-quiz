import React, { useState } from "react";
import { modalRootStyles } from "../../style/modalStyles";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography, Divider, Button } from "@material-ui/core";
import CustomSnackbar from "../mui/Snackbar";
import * as quizActions from "../../store/actions/quizActions";

const CreateQuizConfirmationModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const rootClasses = modalRootStyles();
  const [validationError, setValidationError] = useState("");
  const quiz = useSelector((state) => state.quiz);

  const handleSubmit = async (e) => {
    setValidationError("");
    e.preventDefault();
    if (quiz.quizQuestions.length <= 0) {
      setValidationError("Add some questions first");
      return;
    }
    if (!quiz.quizInvites.contacts) {
      setValidationError("No students invited");
      return;
    }
    if (quiz.quizInvites.contacts.length <= 0) {
      setValidationError("No students invited");
      return;
    }
    await dispatch(quizActions.publishQuiz(quiz._id));
    closeModal();
  };

  return (
    <div className={rootClasses.root}>
      {validationError !== "" && (
        <CustomSnackbar
          severity="error"
          message={validationError}
          handleClose={() => setValidationError("")}
        />
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} justify="center" alignItems="flex-start">
          <Grid item xs={12}>
            <Typography
              variant="h5"
              color="primary"
              style={{ textAlign: "center" }}
            >
              Quiz Overview
            </Typography>
            <Divider variant="middle" />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h5" color="secondary">
              Quiz name: {quiz.quizName ? <>{quiz.quizName}</> : <>Unnamed</>}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography>
              Subject:{" "}
              {quiz.quizSubject ? <>{quiz.quizSubject}</> : <>Not specified</>}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography>
              Timelimit:{" "}
              {quiz.quizTimeLimit ? (
                quiz.quizTimeLimit === "false" ? (
                  <>No limit</>
                ) : (
                  quiz.quizTimeLimit
                )
              ) : (
                <>Not specified</>
              )}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography>
              Quiz points system:{" "}
              {quiz.quizPointsSystem ? (
                <>{quiz.quizPointsSystem}</>
              ) : (
                <>Not specified</>
              )}
            </Typography>
          </Grid>
          {quiz.quizPointsSystem === "overall" && (
            <Grid item xs={12} md={12}>
              <Typography>
                Points for each question:{" "}
                {quiz.quizOverallPoints ? (
                  <>{quiz.quizOverallPoints}</>
                ) : (
                  <>Not specified</>
                )}
              </Typography>
            </Grid>
          )}
          {quiz.quizPointsSystem === "eachQuestion" && (
            <Grid item xs={12} md={12}>
              <Typography>
                Points are set for each question:
                {quiz.quizQuestions.find((q) => q.points === "") ? (
                  <> no</>
                ) : (
                  <> yes</>
                )}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12} md={12}>
            <Typography>
              Number of questions:{" "}
              {quiz.quizQuestions.length > 0 ? (
                <> {quiz.quizQuestions.length} </>
              ) : (
                <>No questions Added</>
              )}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography>
              Number of students Invited:{" "}
              {quiz.quizInvites.contacts ? (
                quiz.quizInvites.contacts.length >= 0 ? (
                  <> {quiz.quizInvites.contacts.length}</>
                ) : (
                  <> None invited </>
                )
              ) : (
                <>None invited </>
              )}
            </Typography>
          </Grid>
          <Grid
            item
            xl={12}
            container
            spacing={2}
            style={{ textAlign: "right" }}
          >
            <Grid item xs={12} sm={6}>
              <Button variant="contained" color="primary" onClick={closeModal}>
                Continue Editing
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" color="primary" type="submit">
                Upload Quiz
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateQuizConfirmationModal;
