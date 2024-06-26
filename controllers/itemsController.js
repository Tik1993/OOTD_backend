const asyncHandler = require("express-async-handler");
const Item = require("../models/Item");
const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");

// @desc Get all Items
// @route GET /items
// @access Private
const getAllItems = asyncHandler(async (req, res) => {
  const items = await Item.find()
    .sort({ name: 1 })
    .lean()
    .populate("category", "name gender _id")
    .populate("subcategory", "name _id");
  if (!items.length) {
    return res.status(400).json({ message: "No items found" });
  }
  res.json(items);
});

// @desc Get an item by ID
// @route GET /items/:id
// @access Private
const getItemById = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id)
    .lean()
    .populate("category", "name gender _id")
    .populate("subcategory", "name _id");
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
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
    gender,
  } = req.body;

  if (
    !name ||
    !price ||
    !categoryName ||
    !size_available ||
    !color_available ||
    !gender
  ) {
    return res.status(400).json({
      message:
        "Please provide a name, price, category, subcategory, gender, size_available, and color_available",
    });
  }

  //Check if item already exists
  const checkItem = await Item.findOne({ name });
  if (checkItem) {
    return res
      .status(400)
      .json({ message: "Item already exists, please update the item instead" });
  }
  // Check if category exists
  const category = await Category.findOne({ name: categoryName, gender });
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  //Check if subcategory exists
  let subcategory;
  if (subcategoryName) {
    subcategory = await Subcategory.findOne({
      name: subcategoryName,
      category: category._id,
    });
    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }
  }

  let subcategoryId = subcategoryName ? subcategory._id : null;

  const item = new Item({
    name,
    price,
    category: category._id,
    subcategory: subcategoryId,
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

// @desc get latest items
// @route GET /items/latest
// @access Private
const getLatestItems = asyncHandler(async (req, res) => {
  const items = await Item.find()
    .sort({ updated_date: -1 })
    .limit(5)
    .lean()
    .populate("category", "name gender _id")
    .populate("subcategory", "name _id");
  res.json(items);
});

module.exports = { getAllItems, getItemById, createItem, getLatestItems };
