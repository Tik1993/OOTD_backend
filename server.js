require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const PORT = 3000;

async function main() {
  await mongoose.connect(process.env.DATABASE_URL);
}

main()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
