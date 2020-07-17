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
    const token = jwt.sign(
      { id: user._id, role: "teacher", name: user.name },
      "secretkey"
    );
    res.send({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: "teacher",
        quizzes: [],
        contacts: [],
        groups: [],
      },
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
        const token = jwt.sign(
          { id: user._id, role: "teacher", name: user.name },
          "secretkey"
        );
        res.status(200).send({
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: "teacher",
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
});

router.post("/studentLogin", async (req, res) => {
  const { studentCode } = req.body;
  console.log(studentCode);
  try {
    const quizzes = await Quiz.find();
    let found;
    quizzes.forEach((quiz) => {
      quiz.quizInvites.contacts.forEach((contact) => {
        if (contact.code === studentCode) {
          found = contact.code;
          const token = jwt.sign(
            { code: contact.code, role: "student" },
            "secretkey"
          );
          res.status(200).send({
            quiz,
            token,
            user: {
              code: contact.code,
              contactId: contact.id,
              role: "student",
            },
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
