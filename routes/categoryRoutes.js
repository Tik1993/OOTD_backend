const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoriesController");

router
  .get("/", categoryController.getAllCategories)
  .post("/", categoryController.createCategory)
  .get("/byname/:name", categoryController.getCategoryByName);

module.exports = router;
