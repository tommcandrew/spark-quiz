const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const checkAuth = require("../middleware");
const Quiz = require("../models/Quiz.model");
const { update } = require("../models/Quiz.model");

router.get("/quizReload", checkAuth, async (req, res) => {
	const studentCode = req.user.code;
	try {
		const quizzes = await Quiz.find();
		let found;
		quizzes.forEach((quiz) => {
			quiz.quizInvites.contacts.forEach((contact) => {
				if (contact.code === studentCode) {
					found = contact.code;
					const token = jwt.sign({ code: contact.code, role: "student" }, "secretkey");
					res.status(200).send({
						quiz: {
							_id: quiz._id,
							quizName: quiz.quizName,
							quizAuthor: quiz.quizAuthor,
							quizSubject: quiz.quizSubject,
							quizQuestions: quiz.quizQuestions,
							points: quiz.points,
							quizTimeLimit: quiz.quizTimeLimit,
							quizPointsSystem: quiz.quizPointsSystem,
							quizOverallPoints: quiz.quizOverallPoints,
							overallScore: quiz.overallScore
						},
						token,
						user: {
							code: contact.code,
							contactId: contact.id
						}
					});
					return;
				}
			});
		});
		if (!found) {
			res.status(403).send({ msg: "invalid code" });
			return;
		}
	} catch (err) {
		console.log(err);
	}
});

router.post("/saveAnswer", checkAuth, async (req, res) => {
	let { quizId, studentId, question, answer } = req.body;
	try {
		const quiz = await Quiz.findById(quizId);
		const student = quiz.quizScores.find((std) => std.studentId === studentId);
		student.results.push({ question: question, correct: answer });
		await quiz.save();
		res.status(200);
	} catch (err) {
		res.status(400).send({ msg: "unable to add scores" });
	}
});

router.post("/saveScore", checkAuth, async (req, res) => {
	let { quizId, studentId, newScore } = req.body;

	try {
		const quiz = await Quiz.findById(quizId);
		const updatedRecord = quiz.quizScores.find((score) => score.studentId === studentId);
		updatedRecord.overallScore = newScore;
		await Quiz.findOneAndUpdate(
			{ _id: quizId, "quizScores.studentId": studentId },
			{ $set: { quizScores: updatedRecord } },
			{ upsert: true }
		);
		res.status(200).send({ msg: "updated the Score" });
	} catch (err) {
		res.status(400).send({ err });
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
			results
		};
		quiz.quizScores.push(scoreObject);
		res.status(200).send({ msg: "Quiz submitted", results });
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
