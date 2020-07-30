const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const checkAuth = require("../middleware");
const Quiz = require("../models/Quiz.model");
const { update } = require("../models/Quiz.model");

router.get("/quizReload", checkAuth, async(req, res) => {
	const studentCode = req.user.code;
	try {
		const quizzes = await Quiz.find();
		let found;
		let lastQuestionSubmitted = 0;
		let quizScores = 0;
		let quizStartTime
		quizzes.forEach((quiz) => {
			quiz.quizInvites.contacts.forEach((contact) => {
				if (contact.code === studentCode) {
					//quiz exists
					const scoreFromDb = quiz.quizScores.find(score => score.studentId === contact.id)
					if (scoreFromDb) {
						//quiz was in progress
						if (scoreFromDb.quizCompleted) {
							res.status(403).send({ msg: "invalid code" })
							return
						}
						var d = new Date();
						var date = new Date(scoreFromDb.quizStarted.toString())
						if (d.getTime() - date.getTime() >= parseInt(quiz.quizTimeLimit)*60000 ) {
							res.status(403).send({ msg: "Time limit for this quiz is up" })
							return;
						}
						else { //quiz is not completed
							lastQuestionSubmitted = scoreFromDb.results.length;
							quizScores = scoreFromDb.overallScore;
							quizStartTime = scoreFromDb.quizStarted
						}
					}
					else {
						quiz.quizScores.push({
							studentId: contact.id,
							results: [],
							overallScore: 0,
							quizCompleted: false
						});
						quiz.save()
					}
					
					found = contact.code;
					res.status(200).send({
						quiz: {
							_id: quiz._id,
							quizName: quiz.quizName,
							quizAuthor: quiz.quizAuthor,
							quizSubject: quiz.quizSubject,
							quizQuestions: quiz.quizQuestions.slice(lastQuestionSubmitted, quiz.quizQuestions.length),
							quizTotalQuestions: quiz.quizQuestions.length,
							quizLastQuestionNumber: lastQuestionSubmitted,
							points: quiz.points,
							quizTimeLimit: quiz.quizTimeLimit,
							quizPointsSystem: quiz.quizPointsSystem,
							quizOverallPoints: quiz.quizOverallPoints,
							overallScore: quiz.overallScore,
							quizStarted: quizStartTime,
						},
						
						quizQuestionNumber: lastQuestionSubmitted,
						pointsScored: quizScores,
						user: {
							code: contact.code,
							contactId: contact.id
						}
					});
				}
			
			})
		
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
	let {quizId, studentId, questionNumber, answer } = req.body;
	try {
		const quiz = await Quiz.findById(quizId);
		const student = quiz.quizScores.find((std) => std.studentId === studentId);
		student.results.push({ question: questionNumber, correct: answer });
		await quiz.save().then(r => {
			res.status(200).send({ msg: "data saved to db" })
			return;
		}).catch(e => {
			res.status(400).send({ msg: "unable to add answers" });
			return;
		})
	} catch (err) {
		res.status(400).send({ msg: "unable to add answers" });
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

router.post("/finishQuiz", async (req, res) => {
	const{quizId, studentId} =req.body

try {
	const quiz = await Quiz.findById(quizId);
	const scoreObjects = quiz.quizScores
	scoreObjects.map(score => {
		if (score.studentId === studentId) {
			score.quizCompleted = true;
		}
	})
	
	await quiz.save().then(() =>res.status(200).send({msg: "quiz submitted"})
	).catch(err=> res.status(400).send({msg: err}))
	
}catch (err) {
	console.log(err);
	res.status(400).send({msg: err})
	}})

module.exports = router;
