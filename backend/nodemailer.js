const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "thomasdarragh88@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports = transporter;
