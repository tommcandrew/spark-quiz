import React from "react";
import { useSelector } from "react-redux";
import getAverageScore from "../../utils/getAverageScore";
import { Typography } from "@material-ui/core";

const Statistics = () => {
  const quiz = useSelector((state) => state.quiz);

  const averageScoreObj = getAverageScore(quiz);

  return (
    <div>
      <Typography variant="h4" align="center">
        Statistics
      </Typography>
      {quiz && quiz.quizScores.length > 0 && (
        <>
          <div>Name: {quiz.quizName}</div>
          <div>Subject: {quiz.quizSubject}</div>
          <div>Invites: {quiz.quizInvites.contacts.length}</div>
          <div>Quiz completed: {quiz.quizScores.length} times</div>
          <div>
            Average score: {averageScoreObj.averageCorrectAnswers}/
            {averageScoreObj.averageNumQuestions}
          </div>
        </>
      )}
    </div>
  );
};

export default Statistics;
