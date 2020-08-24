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

router.post("/deleteQuiz", checkAuth, async (req, res) => {
  const { _id } = req.body;
  try {
    await Quiz.findByIdAndDelete(_id);
    const user = await User.findById(req.user.id);
    const updatedQuizArray = user.quizzes.filter((quizId) => quizId !== _id);
    user.quizzes = updatedQuizArray;
    await user.save();
    res.status(200).send({ msg: "Quiz deleted" });
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
    console.log(userQuizzes)
    res.status(200).send({ quizzes: userQuizzes });
  } catch (err) {
    console.log(err);
  }
});

router.post("/editQuestion", async (req, res) => {
  const { _id, questionObject } = req.body;
  const parsedQuestion = parseNewQuestion(questionObject, req.files);
  try {
    const quiz = await Quiz.findById(_id);
    const updatedQuizQuestions = quiz.quizQuestions.map((question) => {
      if (question._id.toString() === parsedQuestion.id) {
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

router.post("/updateQuiz", async (req, res) => {
  const { _id, update } = req.body;
  try {
    await Quiz.findOneAndUpdate(
      { _id: _id },
      { $set: update },
      { new: true, upsert: true, useFindAndmodify: false }
    );
    res.status(200).send();
  } catch {
    await Quiz.findOneAndUpdate(
      { _id: _id },
      { $set: update },
      { new: true, upsert: true, useFindAndmodify: false }
    );
    res.status(200).send();
  }
});

//to identify the quiz
router.post("/fetchQuiz", async (req, res) => {
  const { quizId } = req.body;
  try {
    const quiz = await Quiz.findById(quizId);
    res.status(200).send({ quiz });
  } catch (err) {
    res.status(404).send({ msg: "quiz not found" });
  }
});

router.post("/publishQuiz", checkAuth, async (req, res) => {
  const { quizId } = req.body;
  try {
    const quiz = await Quiz.findOneAndUpdate(
      { _id: quizId },
      { $set: { quizPublished: true } },
      { new: true, upsert: true, useFindAndmodify: false }
    );
    emailInvites(
      quiz.quizInvites,
      quiz.quizName,
      quiz.quizAuthor,
      quiz.quizSubject
    );
    await Quiz.findOneAndUpdate(
      { _id: quizId },
      { $set: { "quizInvites.new": [] } },
      { new: true, upsert: true, useFindAndmodify: false }
    );
    res.status(200).send();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
