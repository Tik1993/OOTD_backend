const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
const checkJWT = require("../middleware/checkJWT");

router
  .get("/", userController.getAllUsers)
  .post("/", userController.createUser)
  .patch("/:id", checkJWT, userController.updateUser)
  .get("/detail", checkJWT, userController.getUserDetail);

module.exports = router;
