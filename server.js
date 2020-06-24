const express = require("express");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv").config();
const cors = require("cors");
const PORT = 5000;
const MONGO_URI = process.env.DB_CONNECT;
const app = express();
const User = require("./models/User.model");
const Quiz = require("./models/Quiz.model");
const nodemailer = require("nodemailer");
const Str = require("@supercharge/strings");
const auth = require("./middleware");

//CONFIG FUNCTIONS
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "thomasdarragh88@gmail.com",
		pass: process.env.EMAIL_PASSWORD
	}
});

app.listen(PORT, () => console.log("listening on port " + PORT));

mongoose.connect(MONGO_URI, {
	useFindAndModify: false,
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", () => {
	console.log("There was a problem connecting to the db");
});
db.once("open", () => {
	console.log("Connected to db");
});

app.use(express.json());
app.use(cors());
app.use(fileUpload());

//AUTH FUNCTIONS
app.post("/register", (req, res) => {
	const { name, email, password, password2 } = req.body;
	if (password.length < 8) {
		res.status(500).send({ msg: "Password must have at least 8 characters" });
		return;
	}
	if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$/.test(email) === false) {
		res.status(400).send({ msg: "Please enter a valid email address" });
		return;
	}
	if (password !== password2) {
		res.status(400).send({ msg: "Passwords must match" });
		return;
	}

	User.findOne({ email }).then((user) => {
		if (user) {
			res.status(403).send({ msg: "That email is already registered" });
			return;
		} else {
			const user = new User({ name, email, password });
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(user.password, salt, (err, hash) => {
					user.password = hash;
					user.save().then((user) => {
						jwt.sign({ id: user._id, role: "teacher" }, "secretkey", (err, token) => {
							res.send({
								token,
								user: {
									id: user._id,
									name: user.name,
									email: user.email,
									role: "teacher"
								}
							});
						});
					});
				});
			});
		}
	});
});
app.post("/login", (req, res) => {
	const { email, password } = req.body;
	User.findOne({ email }).then((user) => {
		if (!user) {
			res.status(403).send({ msg: "That email is not registered" });
		} else {
			bcrypt.compare(password, user.password, (err, isSame) => {
				if (err) {
					res.status(403).send({ msg: "Problem comparing the passwords" });
				} else {
					if (!isSame) {
						res.status(403).send({ msg: "Wrong password" });
					} else {
						jwt.sign({ id: user._id, role: "teacher" }, "secretkey", (err, token) => {
							res.status(200).send({
								token,
								user: {
									id: user._id,
									name: user.name,
									email: user.email,
									role: "teacher"
								}
							});
						});
					}
				}
			});
		}
	});
});

//logging in with contact id for now - will return most recent quiz if there's more than one
//we should have an "invite id" later which is unique to the student AND the quiz
app.post("/studentLogin", (req, res) => {
	const { id } = req.body;
	Quiz.find().then((quizzes) => {
		let found = "";
		quizzes.forEach((quiz) => {
			quiz.codes.forEach((c) => {
				if (c.code === id) {
					found = c;
					jwt.sign({ c, role: "student" }, "secretkey", (err, token) => {
						res.status(200).send({
							quiz: quiz,
							token,
							user: {
								code: c.code,
								contactId: c.contactId,
								role: "student",
							}
						})
					})
					return;
				}
				if (found !== "") return;
			});
		});
		if (found === "") {
			res.status(403).send({ msg: "invalid code" });
			return;
		}
	}).catch(err=> res.status(500).send({msg: err}))
});

app.post("/addQuestion", (req, res) => {
	const { _id, questionObject } = req.body;
	//parse question as it was stringified in order to send
	const questionParsed = JSON.parse(questionObject);
	//since FormData separated the media from the rest of the question, loop over media and insert back into question object
	const mediaFiles = req.files;
	if (mediaFiles) {
		const keys = Object.keys(mediaFiles);
		for (key of keys) {
			//probably a good idea to check that the media prop exists and add if not
			questionParsed.media.push({
				mediaType: mediaFiles[key].mimetype,
				data: mediaFiles[key].data
			});
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

app.post("/createQuiz", auth, (req, res) => {
	const { quizName, quizSubject } = req.body;
	new Quiz({
		quizName: quizName,
		quizSubject: quizSubject,
		quizQuestions: [],
		quizTimeLimit: null,
		quizScores: [],
		quizPublished: false,
		quizPointsSystem: null,
		quizOverallPoints: null
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

app.post("/deleteQuiz", (req, res) => {
	const { _id } = req.body;
	Quiz.findByIdAndDelete(_id)
		.then(() => {
			res.status(200).send();
		})
		.catch((err) => {
			console.log(err);
		});
});

app.get("/fetchQuizzes", auth, (req, res) => {
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
app.get("/fetchQuiz", auth, (req, res) => {
	const id = req.user.id;
	Quiz.find().then((quizzes) => {
		const matchingQuizArray = [];
		quizzes.forEach((quiz) => {
			if (quiz.quizInvites.includes(id)) {
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

app.post("/updateQuiz", (req, res) => {
	console.log("update request received");
	const { _id, update } = req.body;
	//should insert field if doesn't exist but not working
	Quiz.findOneAndUpdate({ _id: _id }, { $set: update }, { new: true, upsert: true, useFindAndmodify: false })
		.then(() => {
			res.status(200).send();
		})
		.catch((err) => {
			console.log(err);
		});
});

app.post("/submit", (req, res) => {
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
		})
		.catch((err) => {
			console.log(err);
		});
});

app.post("/forgotPassword", auth, (req, res) => {
	User.findById(req.user.id).then((user) => {
		if (user) {
			const randomString = Str.random();
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(randomString, salt, (err, hash) => {
					user.password = hash;
					user.save().then((user) => {
						emailNewPassword(user.email, randomString);
						res.status(200).send({ msg: "New password emailed" });
					});
				});
			});
		}
	});
});

app.post("/quizscores", (req, res) => {
	let { _id, scoreObject } = req.body;
	 scoreObject = JSON.parse(scoreObject);
	Quiz.findById(_id)
		.then((quiz) => {
			quiz.quizScores.push(scoreObject);
			quiz.save().then(quiz => {
				res.status(200).send({ quiz });
			}).catch((err) => {
				console.log(err);
				res.status(400).send({ msg: "unable to add scores" })
			});
		}).catch((err) => {
			console.log(err)
		});
})




//to identify the user session
app.get("/user", auth, (req, res) => {
	User.findById(req.user.id).select("-password").then((user) => res.json(user));
});

const emailInvites = (quizInvites, quizName, quizAuthor, quizSubject) => {
	let emailList = [];
	User.findById(req.user.id)
		.then((user) => {
			user.contacts.forEach((contact) => {
				if (quizInvites.includes(contact.id)) {
					emailList.push(contact.email);
				}
			});
			const mailOptions = {
				from: "Quiz Master",
				to: emailList,
				subject: "Quiz Master Invitation",
				html: `<h1>You've been invited to take a quiz!</h1><br><p><strong>Name: ${quizName}</strong></p><br><p><strong>Subject: ${quizSubject}</strong></p><br><p><strong>Author: ${quizAuthor}</strong></p><br><a href="#">Go to Quiz Master</a>`
			};
			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					console.log(error);
				} else {
					console.log("Email(s) sent");
				}
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(400).send({ msg: "Unable to find user" });
		});
};

const emailNewPassword = (email, newPassword) => {
	const mailOptions = {
		from: "Quiz Master",
		to: email,
		subject: "Password reset",
		text: "Your password has been reset. You're new temporary password is " + newPassword + "."
	};
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
		} else {
			console.log("Email(s) sent");
		}
	});
};

app.post("/addContact", auth, (req, res) => {
  const id = req.user.id;
  const { contact } = req.body;
  User.findById(id)
    .then((user) => {
      user.contacts.push(contact);
      user.save().then(() => {
        res.status(200).send();
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
