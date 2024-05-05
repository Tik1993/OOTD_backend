const express = require("express");
const router = express.Router();
const subcategoryController = require("../controllers/subcategoriesController");

router
  .get("/", subcategoryController.getAllSubcategories)
  .post("/", subcategoryController.createSubcategory)
  .get("/byname/:name", subcategoryController.getSubcategoryByName);

module.exports = router;
