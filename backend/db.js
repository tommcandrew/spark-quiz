const mongoose = require("mongoose");

const MONGO_URI = process.env.DB_CONNECT;

mongoose.connect(MONGO_URI, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", () => {
  console.log("There was a problem connecting to the db");
});
db.once("open", () => {
  console.log("Connected to db");
});
