//this function can definitely be refactored
//getting average number of questions because number could change (e.g. teacher could add one)
const getAverageScore = (quiz) => {
  if (quiz) {
    let averageNumQuestions = 0;
    quiz.quizScores.forEach((scoreObj) => {
      averageNumQuestions += scoreObj.results.length;
    });
    averageNumQuestions = (
      averageNumQuestions / quiz.quizScores.length
    ).toFixed(2);
    let averageCorrectAnswers = 0;
    quiz.quizScores.forEach((scoreObj) => {
      scoreObj.results.forEach((result) => {
        if (result.correct) {
          averageCorrectAnswers++;
        }
      });
    });
    averageCorrectAnswers = (
      averageCorrectAnswers / quiz.quizScores.length
    ).toFixed(2);
    return { averageCorrectAnswers, averageNumQuestions };
  }
};

export default getAverageScore;
