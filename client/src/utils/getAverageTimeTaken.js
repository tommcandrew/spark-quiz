const getAverageTimeTaken = (quiz) => {
  const averageSecs =
    quiz.quizScores.reduce(
      (total, nextScoreObj, index, arr) =>
        total + nextScoreObj.timeTaken / arr.length,
      0
    ) / 1000;
  let formattedMins;
  averageSecs < 60
    ? (formattedMins = "00")
    : (formattedMins = Math.floor(averageSecs / 60));
  const formattedSecs = averageSecs % 60;
  return `${formattedMins}:${formattedSecs}`;
};

export default getAverageTimeTaken;
