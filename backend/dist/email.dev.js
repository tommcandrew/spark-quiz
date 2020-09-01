"use strict";

var nodemailer = require("nodemailer");

var _process$env = process.env,
    EMAIL_ADDRESS = _process$env.EMAIL_ADDRESS,
    EMAIL_PASSWORD = _process$env.EMAIL_PASSWORD;
var transporter = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_PASSWORD
  }
});

var emailNewPassword = function emailNewPassword(email) {
  var tempPassword = "bananas";
  var mailOptions = {
    from: "Quiz Master",
    //email goes here
    to: email,
    subject: "Password reset",
    text: "Your password has been reset. You're new temporary password is " + tempPassword + "."
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("New password emailed");
    }
  });
};

var emailInvites = function emailInvites(quizInvites, quizName, quizAuthor, quizSubject) {
  console.log("email array");
  quizInvites["new"].forEach(function (contact) {
    var mailOptions = {
      from: "Quiz Master",
      //email array goes here
      to: contact.email,
      subject: "Quiz Master Invitation",
      html: "<h1>You've been invited to take a quiz!</h1><br><p><strong>Name: </strong>".concat(quizName, "</p><br><p><strong>Subject: </strong>").concat(quizSubject, "</p><br><p><strong>Author: </strong>").concat(quizAuthor, "</p><br><p>Log in with code: ").concat(contact.code, "</p><br><a href=\"#\">Go to Quiz Master</a>")
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email(s) sent");
      }
    });
  });
};

module.exports = {
  emailNewPassword: emailNewPassword,
  emailInvites: emailInvites
};