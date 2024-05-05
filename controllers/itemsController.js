const asyncHandler = require("express-async-handler");
const Item = require("../models/Item");

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

module.exports = { getAllItems };
