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
  const { name, categoryName, gender } = req.body;
  // console.log(name);
  // console.log(categoryName);
  // console.log(gender);
  if (!name || !categoryName || !gender) {
    return res
      .status(400)
      .json({ message: "Please provide a name, category name and gender" });
  }

  const category = await Category.findOne({ name: categoryName, gender });
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
// @route GET /subcategories/byname/:name/:category/:gender
// @access Private
const getSubcategoryByNameCatGen = asyncHandler(async (req, res) => {
  const { name, category: categoryName, gender } = req.params;
  const category = await Category.findOne({ name: categoryName, gender });
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  const subcategory = await Subcategory.findOne({
    name,
    category: category._id,
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
  getSubcategoryByNameCatGen,
};
