const asyncHandler = require("express-async-handler");
const Subcategory = require("../models/Subcategory");

// @desc Get all Subcategories
// @route GET /subcategories
// @access Private
const getAllSubcategories = asyncHandler(async (req, res) => {
  const subcategories = await Subcategory.find().lean();
  if (!subcategories.length) {
    return res.status(400).json({ message: "No subcategories found" });
  }
  res.json(subcategories);
});

module.exports = { getAllSubcategories };
