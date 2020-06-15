const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Quiz = new Schema(
  {
    quizName: String,
    quizSubject: String,
    quizInvites: [String],
    quizPublished: Boolean,
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
      },
    ],
    quizTimeLimit: Number,
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
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Quiz", Quiz);
