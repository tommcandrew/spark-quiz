const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware");
const Quiz = require("../models/Quiz.model");
const User = require("../models/User.model");
const { emailInvites } = require("../email");
const fileUpload = require("express-fileupload");
router.use(fileUpload());

router.post("/addQuestion", (req, res) => {
  const { _id, questionObject } = req.body;
  //parse question as it was stringified in order to send
  const questionParsed = JSON.parse(questionObject);
  //since FormData separated the media from the rest of the question, loop over media and insert back into question object

  const mediaFiles = req.files;
  if (mediaFiles) {
    if (Array.isArray(mediaFiles.file)) {
      mediaFiles.file.map((f) => {
        questionParsed.media.push({
          mediaType: f.mimetype,
          data: f.data,
          name: f.name,
        });
      });
    } else {
      const keys = Object.keys(mediaFiles);
      for (key of keys) {
        //probably a good idea to check that the media prop exists and add if not
        questionParsed.media.push({
          mediaType: mediaFiles[key].mimetype,
          data: mediaFiles[key].data,
        });
      }
    }
  }
  //then find quiz that was previously saved and push the new question onto the questions array
  Quiz.findById(_id)
    .then((quiz) => {
      quiz.quizQuestions.push(questionParsed);
      quiz
        .save()
        .then((quiz) => {
          res.status(200).send({ quiz });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send({ msg: "Unable to add question to quiz" });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/editQuestion", (req, res) => {
  const { _id, questionObject } = req.body;
  const questionParsed = JSON.parse(questionObject);
  const mediaFiles = req.files;
  if (mediaFiles) {
    if (Array.isArray(mediaFiles.file)) {
      mediaFiles.file.map((f) => {
        questionParsed.media.push({
          mediaType: f.mimetype,
          data: f.data,
          name: f.name,
        });
      });
    } else {
      const keys = Object.keys(mediaFiles);
      for (key of keys) {
        //probably a good idea to check that the media prop exists and add if not
        questionParsed.media.push({
          mediaType: mediaFiles[key].mimetype,
          data: mediaFiles[key].data,
        });
      }
    }
  }
  Quiz.findById(_id)
    .then((quiz) => {
      const updatedQuizQuestions = quiz.quizQuestions.map((question) => {
        if ((question._id = questionParsed.id)) {
          question = questionParsed;
        }
        return question;
      });
      quiz.quizQuestions = updatedQuizQuestions;
      quiz
        .save()
        .then((quiz) => {
          res.status(200).send({ quiz });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send({ msg: "Unable to add question to quiz" });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/deleteQuestion", checkAuth, (req, res) => {
  const { quizId, questionId } = req.body;
  Quiz.findById(quizId)
    .then((quiz) => {
      const updatedQuestions = quiz.quizQuestions.filter(
        (question) => question._id.toString() !== questionId
      );
      quiz.quizQuestions = updatedQuestions;
      quiz.save().then(() => {
        res.status(200).send({ msg: "question deleted" });
      });
    })
    .catch((err) => res.status(400).send({ msg: "quiz not found" }));
});

router.post("/createQuiz", checkAuth, (req, res) => {
  const { quizName, quizSubject } = req.body;
  const quizAuthor = req.user.name;
  new Quiz({
    quizName,
    quizAuthor,
    quizSubject,
    quizQuestions: [],
    quizTimeLimit: null,
    quizScores: [],
    quizPublished: false,
    quizPointsSystem: null,
    quizOverallPoints: null,
  })
    .save()
    .then((quiz) => {
      User.findById(req.user.id).then((user) => {
        user.quizzes.push(quiz._id);
        user.save().then(() => {
          res.status(200).send({ _id: quiz._id });
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ msg: "Unable to save quiz" });
    });
});

router.post("/deleteQuiz", (req, res) => {
  const { _id } = req.body;
  Quiz.findByIdAndDelete(_id)
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/fetchQuizzes", checkAuth, (req, res) => {
  let userQuizzes = [];
  User.findById(req.user.id)
    .then((user) => {
      Quiz.find().then((quizzes) => {
        quizzes.forEach((quiz) => {
          if (user.quizzes.includes(quiz._id)) {
            userQuizzes.push(quiz);
          }
        });
        res.status(200).send({ quizzes: userQuizzes });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//get quiz for student that is logged in (same as /studentLogin function but without jwt)
router.get("/fetchQuiz", checkAuth, (req, res) => {
  const id = req.user.id;
  Quiz.find().then((quizzes) => {
    const matchingQuizArray = [];
    quizzes.forEach((quiz) => {
      if (quiz.quizInvites.contacts.includes(id)) {
        matchingQuizArray.push(quiz);
      }
    });
    if (matchingQuizArray.length > 0) {
      const matchingQuiz = matchingQuizArray[0];
      res.status(200).send({ quiz: matchingQuiz });
    } else {
      console.log("no quiz found");
    }
  }).catch = (err) => {
    console.log(err);
  };
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
