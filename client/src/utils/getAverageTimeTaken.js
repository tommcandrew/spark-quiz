export const getAverageTimeTaken = (quiz) => {
  const averageSecs = Math.floor(
    quiz.quizScores.reduce(
      (total, nextScoreObj, index, arr) =>
        total + nextScoreObj.timeTaken / arr.length,
      0
    ) / 1000
  );
  let formattedMins;
  averageSecs < 60
    ? (formattedMins = "00")
    : (formattedMins = (averageSecs / 60).toFixed(2));
  const formattedSecs = averageSecs % 60;
  return `${formattedMins}:${formattedSecs}`;
};
