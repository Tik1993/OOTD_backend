const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");

router
  .get("/", userController.getAllUsers)
  .post("/", userController.createUser)
  .patch("/:id", userController.updateUser);

module.exports = router;
