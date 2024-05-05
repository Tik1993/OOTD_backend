const asyncHandler = require("express-async-handler");
const Subcategory = require("../models/Subcategory");
const Category = require("../models/Category");

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

// @desc Create a new Subcategory
// @route POST /subcategories
// @access Private
const createSubcategory = asyncHandler(async (req, res) => {
  const { name, categoryName } = req.body;

  if (!name || !categoryName) {
    return res
      .status(400)
      .json({ message: "Please provide a name and category name" });
  }

  const category = await Category.findOne({ name: categoryName });
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  const subcategory = new Subcategory({ name, category: category._id });
  try {
    await subcategory.save();
    res.status(201).json(subcategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @desc Get a Subcategory by name
// @route GET /subcategories/byname/:name
// @access Private
const getSubcategoryByName = asyncHandler(async (req, res) => {
  const subcategory = await Subcategory.findOne({
    name: req.params.name,
  }).populate("category", "name gender -_id");
  if (subcategory) {
    return res.json(subcategory);
  } else {
    return res.status(404).json({ message: "Subcategory not found" });
  }
});

module.exports = {
  getAllSubcategories,
  createSubcategory,
  getSubcategoryByName,
};
