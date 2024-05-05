const asyncHandler = require("express-async-handler");
const Category = require("../models/Category");
const { get } = require("mongoose");

// @desc Get all Categories
// @route GET /categories
// @access Private
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().lean();
  if (!categories.length) {
    return res.status(400).json({ message: "No categories found" });
  }
  res.json(categories);
});

// @desc Create a new Category
// @route POST /categories
// @access Private
const createCategory = asyncHandler(async (req, res) => {
  const { name, gender } = req.body;

  if (!name || !gender) {
    return res
      .status(400)
      .json({ message: "Please provide a name and gender" });
  }

  const validGenders = ["Men", "Women", "Unisex"];
  if (!validGenders.includes(gender)) {
    return res.status(400).json({
      message: "Invalid gender. Must be 'Men', 'Women', or 'Unisex'.",
    });
  }

  const category = new Category({ name, gender });
  try {
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @desc Get a Category by name
// @route GET /categories/byname/:name
// @access Private
const getCategoryByName = asyncHandler(async (req, res) => {
  const category = await Category.findOne({ name: req.params.name });
  if (category) {
    return res.json(category);
  } else {
    return res.status(404).json({ message: "Category not found" });
  }
});

module.exports = { getAllCategories, createCategory, getCategoryByName };
