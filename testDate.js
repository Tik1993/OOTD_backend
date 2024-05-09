require("dotenv").config();
const mongoose = require("mongoose");

const dateSchema = new mongoose.Schema({
  date: String,
  date2: { type: Date, default: Date.now.tolocaleString },
});

const MyDate = mongoose.model("Date", dateSchema);

async function testDate() {
  //   await mongoose.connect(process.env.DATABASE_URL);
  const date = new MyDate({
    date: "2024-05-08",
  });

  console.log(date);
  console.log(date.date instanceof Date); //false
  console.log(date.date2 instanceof Date); //true
}

testDate();
