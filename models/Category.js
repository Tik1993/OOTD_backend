const mongoose = require("mongoose");
const Subcategory = require("./Subcategory");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Men", "Women", "Unisex"],
  },
});

module.exports = mongoose.model("Category", categorySchema);
