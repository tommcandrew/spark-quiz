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
    to: email,
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
  quizInvites.new.forEach((contact) => {
    const mailOptions = {
      from: "Spark Quiz",
      //email array goes here
      to: contact.email,
      subject: "Spark Quiz Invitation",
      html: `<h2>You've been invited to take a quiz by ${quizAuthor}!</h2>
      <br>
      <p><strong>Quiz Name: </strong>${quizName}</p>
      <p><strong>Subject: </strong>${quizSubject}</p>
      ><p>Log in with code: ${contact.code}</p><br><a href="https://spark-quiz.vercel.app/">Go to Quiz Master</a>`,
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
