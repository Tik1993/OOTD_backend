require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { logger } = require("./middleware/logger");

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

app.use(express.json());

app.use(logger);
app.use("/items", require("./routes/itemRoutes"));
app.use("/categories", require("./routes/categoryRoutes"));
app.use("/subcategories", require("./routes/subcategoryRoutes"));
