require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const PORT = 3000;

async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
  } catch (err) {
    console.log(err);
  }
}
connectDB();

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDb");
  app.listen(PORT, () => {
    console.log(`listening in port ${PORT}`);
  });
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});
