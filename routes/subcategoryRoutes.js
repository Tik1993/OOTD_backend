const express = require("express");
const router = express.Router();
const subcategoryController = require("../controllers/subcategoriesController");

router.get("/", subcategoryController.getAllSubcategories);

module.exports = router;
