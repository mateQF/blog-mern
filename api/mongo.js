const mongoose = require("mongoose");

const { MONGO_DB_URI } = process.env;

mongoose
  .connect(MONGO_DB_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to database " + err);
  });

mongoose.connection.on("disconnected", () => {
  console.warn("Disconnected from database");
});

mongoose.connection.on("error", (err) => {
  console.error("Database error: " + err);
});

process.on("uncaughtException", (err) => {
  console.error(err);
  mongoose.connection.close();
});
