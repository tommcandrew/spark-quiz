const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Quiz = new Schema(
  {
    quizName: String,
    quizSubject: String,
    quizInvites: [{email: String, name: String }],
    quizPublished: Boolean,
    codes: [{code: String, contactId: String}],
    quizQuestions: [
      {
        questionType: String,
        question: String,
        media: [
          {
            mediaType: String,
            data: Schema.Types.Mixed,
          },
        ],
        answers: {
          trueFalseAnswer: String,
          multipleChoiceOptions: [String],
          multipleChoiceAnswer: String,
        },
        points: String,
      },
    ],
    quizTimeLimit: String,
    quizPointsSystem: String,
    quizOverallPoints: String,
    quizScores: [
      {
        studentId: String,
        results: [
          {
            question: Number,
            correct: Boolean,
          },
        ],
        overallScore: Number,
        //HOW TO DO THE DATE? DB IS NOT ABLE TO ACCPET DATE: {}
        // date: {
        //   type: Date,
        //   default: Date.now,
        // },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Quiz", Quiz);
