//dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();

const app = express();

//environment variables
const { MONGO_URI } = process.env;

//middleware
app.use(cors());
app.use(express.json());

//connect to DB
mongoose
  .connect(MONGO_URI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to db"))
  .catch((err) => console.log("There was a problem connecting to the db"));

//use routes
app.use("/user", require("./routes/user"));
app.use("/quiz", require("./routes/quiz"));
app.use("/auth", require("./routes/auth"));
app.use("/student", require("./routes/student"));

//set up server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("listening on port " + PORT));
