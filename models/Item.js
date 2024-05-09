const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
  },
  size_available: {
    type: [String],
  },
  length_available: {
    type: [String],
  },
  color_available: {
    type: [String],
  },
  price: {
    type: Number,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
});

itemSchema.virtual("imageUrl").get(function () {
  return `/${this.subcategory.category.name}/${this.subcategory.name}/${this.name}`;
});

module.exports = mongoose.model("Item", itemSchema);
