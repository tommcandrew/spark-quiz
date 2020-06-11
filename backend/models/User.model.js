const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
  name: String,
  email: String,
  password: String,
  quizzes: [String],
  contacts: [
    {
      name: String,
      email: String,
      groups: [String],
      id: String,
    },
  ],
});

module.exports = mongoose.model("User", User);
