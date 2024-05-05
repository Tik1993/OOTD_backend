const express = require("express");
const router = express.Router();
const subcategoryController = require("../controllers/subcategoriesController");

router
  .get("/", subcategoryController.getAllSubcategories)
  .post("/", subcategoryController.createSubcategory)
  .get(
    "/byname/:name/:category/:gender",
    subcategoryController.getSubcategoryByNameCatGen
  );

module.exports = router;
