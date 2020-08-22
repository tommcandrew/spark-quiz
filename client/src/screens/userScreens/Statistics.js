import React from "react";
import { useSelector } from "react-redux";
import { getAverageScore } from "../../utils/getAverageScore";
import { getAverageTimeTaken } from "../../utils/getAverageTimeTaken";
import { getAverageQuestionScore } from "../../utils/getAverageQuestionScore";
import { Typography, Grid, Divider } from "@material-ui/core";
import BarChart from "../../components/UI/BarChart";
import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  container: {
    padding: "5px",
    justifyContent: "flex-start",
    [theme.breakpoints.down("md")]: {
      height: "100%",
      padding: "20px",
      paddingTop: "20px",
    },
  },
  statsContainer: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    width: "100%",
    marginTop: "10px",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "flex-start",
      flexDirection: "column",
      alignItems: "center",
    },
  },
  description: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: "40px",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      alignItems: "center",
      marginBottom: "40px",
      textAlign: "left",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "20px",
    },
  },
}));

const Statistics = () => {
  const quiz = useSelector((state) => state.quiz);
  const averageScoreObj = getAverageScore(quiz);
  const averageTimeTaken = getAverageTimeTaken(quiz);
  const questionPassRatesArr = getAverageQuestionScore(quiz);
  const classes = style();

  console.log(quiz);

  const chartData = {
    labels: quiz.quizQuestions.map(
      (question, index) => `Question ${index + 1}`
    ),

    datasets: [
      {
        label: "Pass rate",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: questionPassRatesArr,
      },
    ],
  };

  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid item xs={12} xl={12}>
        <Typography variant="h4" align="center">
          Statistics
        </Typography>
        <Divider variant="middle" />
      </Grid>

      <div className={classes.statsContainer}>
        {quiz.quizScores.length <= 0 && (
          <div>The quiz has not been attempted by any student yet</div>
        )}
        {quiz && quiz.quizScores.length > 0 && (
          <>
            <div className={classes.description}>
              <Typography variant="h6" color="primary">
                Quiz details:
              </Typography>
              <div>Name: {quiz.quizName}</div>
              <div>Subject: {quiz.quizSubject}</div>
              <div>Invites: {quiz.quizInvites.contacts.length}</div>
              <div>Quiz completed: {quiz.quizScores.length} times</div>
              <div>
                Average score (fraction):{" "}
                {averageScoreObj.averageCorrectAnswers}/
                {averageScoreObj.averageNumQuestions}
              </div>
              <div>
                Average score (percentage):{" "}
                {averageScoreObj.averageScorePercentage}%
              </div>
              {(quiz.quizTimeLimit === "" || null) && (
                <div>Average time to complete: {averageTimeTaken}</div>
              )}
            </div>

            <div className="stats__chart">
              <BarChart chartData={chartData} style={{ height: "100%" }} />
            </div>
          </>
        )}
      </div>
    </Grid>
  );
};

export default Statistics;
