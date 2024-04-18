require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const connectDB = require("./config/dbConnect");
connectDB();
const PORT = 3000;

mongoose.connection.once("open", () => {
  console.log("Connected to Mongodb");
  app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
