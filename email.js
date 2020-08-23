const nodemailer = require("nodemailer");
const { EMAIL_ADDRESS, EMAIL_PASSWORD } = process.env;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_PASSWORD,
  },
});

const emailNewPassword = (email) => {
  const tempPassword = "bananas";
  const mailOptions = {
    from: "Quiz Master",
    //email goes here
    to: "thomasdarragh88@gmail.com",
    subject: "Password reset",
    text:
      "Your password has been reset. You're new temporary password is " +
      tempPassword +
      ".",
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("New password emailed");
    }
  });
};

const emailInvites = (quizInvites, quizName, quizAuthor, quizSubject) => {
  console.log("email array");
  quizInvites.new.forEach((contact) => {
    const mailOptions = {
      from: "Quiz Master",
      //email array goes here
      to: "thomasdarragh88@gmail.com",
      subject: "Quiz Master Invitation",
      html: `<h1>You've been invited to take a quiz!</h1><br><p><strong>Name: </strong>${quizName}</p><br><p><strong>Subject: </strong>${quizSubject}</p><br><p><strong>Author: </strong>${quizAuthor}</p><br><p>Log in with code: ${contact.code}</p><br><a href="#">Go to Quiz Master</a>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email(s) sent");
      }
    });
  });
};

module.exports = {
  emailNewPassword,
  emailInvites,
};
