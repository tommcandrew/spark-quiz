const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware");
const Quiz = require("../models/Quiz.model");

router.post("/saveScores", checkAuth, async (req, res) => {
  let { quizId, scoreObject, timeTaken } = req.body;
  try {
    const quiz = await Quiz.findById(quizId);
    scoreObject.timeTaken = timeTaken;
    quiz.quizScores.push(scoreObject);
    await quiz.save();
    res.status(200).send({ quiz });
  } catch (err) {
    res.status(400).send({ msg: "unable to add scores" });
  }
});

router.post("/submit", async (req, res) => {
  const { studentId, _id, submittedAnswers } = req.body;
  try {
    const quiz = await Quiz.findById(_id);
    let results = [];
    quiz.questions.forEach((question, index) => {
      if (question.questionType === "trueFalse") {
        if (question.answers.trueFalseAnswer === submittedAnswers[index]) {
          results.push({ question: index, correct: true });
        } else {
          results.push({ question: index, correct: false });
        }
      } else if (question.questionType === "multipleChoice") {
        if (question.answers.multipleChoiceAnswer === submittedAnswers[index]) {
          results.push({ question: index, correct: true });
        } else {
          results.push({ question: index, correct: false });
        }
      }
    });
    const scoreObject = {
      studentId,
      results,
    };
    quiz.quizScores.push(scoreObject);
    res.status(200).send({ msg: "Quiz submitted", results });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
