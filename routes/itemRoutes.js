const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/itemsController");

router
  .get("/", itemsController.getAllItems)
  .get("/latest", itemsController.getLatestItems)
  .get("/:id", itemsController.getItemById)
  .post("/", itemsController.createItem);

module.exports = router;
