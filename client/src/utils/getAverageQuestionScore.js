export const getAverageQuestionScore = (quiz) => {
  const scoresObj = quiz.quizQuestions.map((question) => ({
    students: 0,
    totalScore: 0,
  }));
  scoresObj.forEach((scoreObj, i) => {
    scoresObj[i].totalScore = quiz.quizScores.reduce((total, next) => {
      //get number of students who attempted each question (to calculate average later)
      next.results[i] && scoresObj[i].students++;
      //increment total by 1 for each correct answer
      return next.results[i] && next.results[i].correct ? total + 1 : total + 0;
    }, 0);
  });
  const averageScoresArr = scoresObj.map((obj) =>
    ((obj.totalScore / obj.students) * 100).toFixed(2)
  );
  return averageScoresArr;
};
