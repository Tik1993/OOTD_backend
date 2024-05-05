const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/itemsController");

router
  .get("/", itemsController.getAllItems)
  .post("/", itemsController.createItem);

module.exports = router;
