const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Quiz = new Schema(
  {
    quizName: String,
    quizAuthor: String,
    quizSubject: String,
    quizInvites: {
      contacts: [{ email: String, name: String, id: String, code: String }],
      groups: [String],
    },
    quizPublished: Boolean,
    quizCodes: [{ code: String, contactId: String }],
    quizQuestions: [
      {
        questionType: String,
        question: String,
        media: [
          {
            //can't use just "type" because it's a special word and it's causing me some problems in front end!!!
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
