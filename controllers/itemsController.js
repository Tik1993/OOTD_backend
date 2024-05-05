const asyncHandler = require("express-async-handler");
const Item = require("../models/Item");
const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");

// @desc Get all Items
// @route GET /items
// @access Private
const getAllItems = asyncHandler(async (req, res) => {
  console.log(req.user);
  const items = await Item.find().lean();
  if (!items.length) {
    return res.status(400).json({ message: "No items found" });
  }
  res.json(items);
});

// @desc Create a new Item
// @route POST /items
// @access Private
const createItem = asyncHandler(async (req, res) => {
  const {
    name,
    categoryName,
    subcategoryName,
    size_available,
    length_available,
    color_available,
    price,
  } = req.body;

  if (
    !name ||
    !price ||
    !categoryName ||
    !subcategoryName ||
    !size_available ||
    !color_available
  ) {
    return res.status(400).json({
      message:
        "Please provide a name, price, category, subcategory, size_available, color_available",
    });
  }

  const category = await Category.findOne({ name: categoryName });
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  const subcategory = await Category.findOne({ name: subcategoryName });
  if (!subcategory) {
    return res.status(404).json({ message: "Subategory not found" });
  }
  const item = new Item({
    name,
    price,
    category,
    subcategory,
    size_available,
    length_available,
    color_available,
  });
  try {
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = { getAllItems, createItem };
