const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
const dotenv = require("dotenv").config();
app.use(cors());
const fileUpload = require("express-fileupload");
app.use(fileUpload());
const PORT = 5000;
app.listen(PORT, () => console.log("listening on port " + PORT));
const Str = require("@supercharge/strings");
const db = require("./db");
const user = require("./userRoutes");
const auth = require("./authRoutes.js");
const quiz = require("./quizRoutes");
app.use("/user", user);
app.use("/auth", auth);
app.use("/quiz", quiz);
