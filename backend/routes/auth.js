const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { emailNewPassword } = require("../email");
const Quiz = require("../models/Quiz.model");
const User = require("../models/User.model");
const validator = require("validator");

router.post("/register", async (req, res) => {
	const { name, email, password, password2 } = req.body;
	if (password.length < 8) {
		res.status(500).send({ msg: "Password must have at least 8 characters" });
		return;
	}
	if (!validator.isEmail(email)) {
		res.status(400).send({ msg: "Please enter a valid email address" });
		return;
	}
	if (password !== password2) {
		res.status(400).send({ msg: "Passwords must match" });
		return;
	}
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		res.status(403).send({ msg: "That email is already registered" });
		return;
	} else {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		const user = await new User({ name, email, password: hash }).save();
		const token = jwt.sign({ id: user._id, role: "teacher", name: user.name }, "secretkey");
		res.send({
			token,
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: "teacher",
				quizzes: [],
				contacts: [],
				groups: []
			}
		});
	}
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		res.status(403).send({ msg: "That email is not registered" });
	} else {
		try {
			const isSame = await bcrypt.compare(password, user.password);
			if (!isSame) {
				res.status(403).send({ msg: "Wrong password" });
			} else {
				const token = jwt.sign({ id: user._id, role: "teacher", name: user.name }, "secretkey");
				res.status(200).send({
					token,
					user: {
						id: user._id,
						name: user.name,
						email: user.email,
						role: "teacher"
					}
				});
			}
		} catch (err) {
			console.log(err);
		}
	}
});

router.post("/studentLogin", async(req, res) => {
	const { studentCode } = req.body;
	try {
		const quizzes = await Quiz.find();
		let found;
		let lastQuestionSubmitted = 0;
		let quizScores = 0;
		let quizStartTime
		quizzes.forEach((quiz) => {
			quiz.quizInvites.contacts.forEach((contact) => {
				if (contact.code === studentCode) {
					found = contact.code;
					//this is a valid request
					const scoreFromDb = quiz.quizScores.find(score => score.studentId === contact.id)
					if (scoreFromDb) {
						//student has opened the quiz before
						if (scoreFromDb.quizCompleted) {
							//student already completed the quiz
							res.status(403).send({ msg: "This quiz has already been submitted" })
							return;
						}
						var d = new Date();
						var date = new Date(scoreFromDb.quizStarted.toString())
						if (d.getTime() - date.getTime() >= parseInt(quiz.quizTimeLimit)*60000 ) {
							res.status(403).send({ msg: "Time limit for this quiz is up" })
							return;
						}
						else {
							//quiz is not completed. was opened
							lastQuestionSubmitted = scoreFromDb.results.length;
							quizScores = scoreFromDb.overallScore;
							quizStartTime = scoreFromDb.quizStarted
						}
					}
					//student never opened the quiz. quizScore does for this instance does not exist
					else {
						quiz.quizScores.push({
							studentId: contact.id,
							results: [],
							overallScore: 0,
							quizCompleted: false
						});
						quiz.save()
					}
					//sending a response
					const token = jwt.sign({ code: contact.code, role: "student" }, "secretkey");
					res.status(200).send({
						quiz: {
							_id: quiz._id,
							quizName: quiz.quizName,
							quizAuthor: quiz.quizAuthor,
							quizSubject: quiz.quizSubject,
							quizQuestions: quiz.quizQuestions.slice(lastQuestionSubmitted, quiz.quizQuestions.length),
							quizTotalQuestions: quiz.quizQuestions.length,
							points: quiz.points,
							quizTimeLimit: quiz.quizTimeLimit,
							quizPointsSystem: quiz.quizPointsSystem,
							quizOverallPoints: quiz.quizOverallPoints,
							overallScore: quiz.overallScore,
							quizStarted: quizStartTime,
							quizLastQuestionNumber: lastQuestionSubmitted,
						},
						//values we set based on the last quiz interaction
						
						pointsScored: quizScores,
						token,
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

router.post("/resetPassword", async (req, res) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });
		if (user) {
			//need to generate random password
			const tempPassword = "bananas";
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(tempPassword, salt);
			user.password = hash;
			await user.save();
			emailNewPassword(user.email);
			res.status(200).send({ msg: "New password emailed" });
		} else {
			res.status(400).send({ msg: "User not found" });
		}
	} catch (err) {
		console.log(err);
	}
});

router.post("/changepassword", checkAuth, async (req, res) => {
	const { currentPassword, newPassword } = req.body;
	const id = req.user.id;
	try {
		const user = await User.findById(id);
		const isSame = await bcrypt.compare(currentPassword, user.password);
		if (!isSame) {
			res.status(403).send({ msg: "Passwords don't match" });
		} else {
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(newPassword, salt);
			user.password = hash;
			await user.save();
			res.status(200).send({ msg: "Password changed" });
		}
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
