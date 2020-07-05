const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware");
const Quiz = require("../models/Quiz.model");
const User = require("../models/User.model");
const { emailInvites } = require("../email");
const fileUpload = require("express-fileupload");
router.use(fileUpload());

const parseNewQuestion = (questionObject, mediaFiles) => {
  const parsedQuestion = JSON.parse(questionObject);
  if (mediaFiles) {
    if (Array.isArray(mediaFiles.file)) {
      mediaFiles.file.map((file) => {
        parsedQuestion.media.push({
          mediaType: file.mimetype,
          data: file.data,
          name: file.name,
        });
      });
    } else {
      const keys = Object.keys(mediaFiles);
      for (key of keys) {
        parsedQuestion.media.push({
          mediaType: mediaFiles[key].mimetype,
          data: mediaFiles[key].data,
        });
      }
    }
  }
  return parsedQuestion;
};

router.post("/addQuestion", async (req, res) => {
  const { _id, questionObject } = req.body;
  const parsedQuestion = parseNewQuestion(questionObject, req.files);
  try {
    const quiz = await Quiz.findById(_id);
    quiz.quizQuestions.push(parsedQuestion);
    await quiz.save();
    res.status(200).send({ quiz });
  } catch (err) {
    res.status(400).send({ msg: "Unable to add question to quiz" });
  }
});

router.post("/editQuestion", async (req, res) => {
  const { _id, questionObject } = req.body;
  const parsedQuestion = parseNewQuestion(questionObject, req.files);
  try {
    const quiz = await Quiz.findById(_id);
    const updatedQuizQuestions = quiz.quizQuestions.map((question) => {
      if ((question._id = parsedQuestion.id)) {
        question = parsedQuestion;
      }
      return question;
    });
    quiz.quizQuestions = updatedQuizQuestions;
    await quiz.save();
    res.status(200).send({ quiz });
  } catch (err) {
    res.status(400).send({ msg: "Unable to add question to quiz" });
  }
});

router.post("/deleteQuestion", checkAuth, async (req, res) => {
  const { quizId, questionId } = req.body;
  try {
    const quiz = await Quiz.findById(quizId);
    const updatedQuestions = quiz.quizQuestions.filter(
      (question) => question._id.toString() !== questionId
    );
    quiz.quizQuestions = updatedQuestions;
    await quiz.save();
    res.status(200).send({ msg: "question deleted" });
  } catch (err) {
    res.status(400).send({ msg: "quiz not found" });
  }
});

router.post("/createQuiz", checkAuth, async (req, res) => {
  const { quizName, quizSubject } = req.body;
  const quizAuthor = req.user.name;
  try {
    const quiz = await new Quiz({
      quizName,
      quizAuthor,
      quizSubject,
      quizQuestions: [],
      quizTimeLimit: null,
      quizScores: [],
      quizPublished: false,
      quizPointsSystem: null,
      quizOverallPoints: null,
    }).save();
    const user = await User.findById(req.user.id);
    user.quizzes.push(quiz._id);
    await user.save();
    res.status(200).send({ _id: quiz._id });
  } catch (err) {
    res.status(500).send({ msg: "Unable to save quiz" });
  }
});

router.post("/deleteQuiz", async (req, res) => {
  const { _id } = req.body;
  await Quiz.findByIdAndDelete(_id);
  try {
    res.status(200).send();
  } catch (err) {
    console.log(err);
  }
});

router.get("/fetchQuizzes", checkAuth, async (req, res) => {
  let userQuizzes = [];
  try {
    const user = await User.findById(req.user.id);
    const quizzes = await Quiz.find();
    quizzes.forEach((quiz) => {
      if (user.quizzes.includes(quiz._id)) {
        userQuizzes.push(quiz);
      }
    });
    res.status(200).send({ quizzes: userQuizzes });
  } catch (err) {
    console.log(err);
  }
});

router.post("/updateQuiz", (req, res) => {
  const { _id, update } = req.body;
  //should insert field if doesn't exist but not working
  Quiz.findOneAndUpdate(
    { _id: _id },
    { $set: update },
    { new: true, upsert: true, useFindAndmodify: false }
  )
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/submit", (req, res) => {
  const { studentId, _id, submittedAnswers } = req.body;
  Quiz.findById(_id)
    .then((quiz) => {
      let results = [];
      quiz.questions.forEach((question, index) => {
        if (question.questionType === "trueFalse") {
          if (question.answers.trueFalseAnswer === submittedAnswers[index]) {
            results.push({ question: index, correct: true });
          } else {
            results.push({ question: index, correct: false });
          }
        } else if (question.questionType === "multipleChoice") {
          if (
            question.answers.multipleChoiceAnswer === submittedAnswers[index]
          ) {
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
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/quizscores", checkAuth, (req, res) => {
  let { _id, scoreObject } = req.body;
  scoreObject = JSON.parse(scoreObject);
  Quiz.findById(_id)
    .then((quiz) => {
      quiz.quizScores.push(scoreObject);
      quiz
        .save()
        .then((quiz) => {
          res.status(200).send({ quiz });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send({ msg: "unable to add scores" });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

//to identify the quiz
router.post("/quiz", (req, res) => {
  const { quizId } = req.body;
  Quiz.findById(quizId)
    .then((quiz) => {
      res.status(200).send({ quiz });
    })
    .catch((err) => res.status(404).send({ msg: "quiz not found" }));
});

router.post("/publishQuiz", checkAuth, (req, res) => {
  const { quizId } = req.body;
  Quiz.findOneAndUpdate(
    { _id: quizId },
    { $set: { quizPublished: true } },
    { new: true, upsert: true, useFindAndmodify: false }
  )
    .then((quiz) => {
      emailInvites(
        quiz.quizInvites,
        quiz.quizName,
        quiz.quizAuthor,
        quiz.quizSubject
      );
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
