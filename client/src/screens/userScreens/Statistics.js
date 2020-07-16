import React from "react";
import { useSelector } from "react-redux";
import getAverageScore from "../../utils/getAverageScore";
import getAverageTimeTaken from "../../utils/getAverageTimeTaken";
import { Typography } from "@material-ui/core";

const Statistics = () => {
  const quiz = useSelector((state) => state.quiz);
  const averageScoreObj = getAverageScore(quiz);
  const averageTimeTaken = getAverageTimeTaken(quiz);

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
            Average score (fraction): {averageScoreObj.averageCorrectAnswers}/
            {averageScoreObj.averageNumQuestions}
          </div>
          <div>
            Average score (percentage): {averageScoreObj.averageScorePercentage}
            %
          </div>
          <div>Average time to complete: {averageTimeTaken}</div>
        </>
      )}
    </div>
  );
};

export default Statistics;
